//+------------------------------------------------------------------+
//|   EA XAUUSD AUTO RUN - PROFIT USD + LOCK + AUTO TP             |
//|   FINAL FIX - NO ERROR VERSION                                   |
//+------------------------------------------------------------------+
#property strict

#include <Trade/Trade.mqh>
CTrade trade;

//========================= INPUT ==================================//

input bool isOpenPosisiBuy = false;
input int OrdersPerCycle = 4;
input double LotSize = 0.01;
input double MaxBalanceUsagePercent = 40.0;

input double TakeProfitUSD = 2.0;
input int LockProfitPoints = 60;

// ===== NEW FEATURE =====
input bool IsAutoTPon = true; // Auto TP aktif/tidak
input int AutoTPPoints = 350; // TP dalam points

input int MagicNumber = 12345;

//+------------------------------------------------------------------+
int OnInit() {
  trade.SetExpertMagicNumber(MagicNumber);
  trade.SetDeviationInPoints(20);
  trade.SetAsyncMode(false);

  EventSetTimer(5);

  Print("EA AUTO RUN ACTIVE - WITH AUTO TP FEATURE");
  return (INIT_SUCCEEDED);
}
//+------------------------------------------------------------------+
void OnDeinit(const int reason) { EventKillTimer(); }
//+------------------------------------------------------------------+
void OnTick() {
  KelolaLockProfit();
  CekTakeProfitUSD();
}
//+------------------------------------------------------------------+
void OnTimer() {
  if (!TerminalInfoInteger(TERMINAL_TRADE_ALLOWED)) {
    Print("AutoTrading OFF");
    return;
  }

  if (!BolehOpenBerdasarkanBalance())
    return;

  for (int i = 0; i < OrdersPerCycle; i++) {
    if (isOpenPosisiBuy)
      trade.Buy(LotSize, _Symbol);
    else
      trade.Sell(LotSize, _Symbol);
  }
}
//+------------------------------------------------------------------+
bool BolehOpenBerdasarkanBalance() {
  double balance = AccountInfoDouble(ACCOUNT_BALANCE);
  double margin = AccountInfoDouble(ACCOUNT_MARGIN);

  if (balance <= 0)
    return false;

  double usagePercent = (margin / balance) * 100.0;

  if (usagePercent >= MaxBalanceUsagePercent)
    return false;

  return true;
}
//+------------------------------------------------------------------+
void CekTakeProfitUSD() {
  int total = PositionsTotal();

  for (int i = total - 1; i >= 0; i--) {
    ulong ticket = PositionGetTicket(i);
    if (ticket == 0)
      continue;

    if (!PositionSelectByTicket(ticket))
      continue;

    if (PositionGetString(POSITION_SYMBOL) != _Symbol)
      continue;
    if (PositionGetInteger(POSITION_MAGIC) != MagicNumber)
      continue;

    double profit = PositionGetDouble(POSITION_PROFIT);

    if (profit >= TakeProfitUSD) {
      trade.PositionClose(ticket);
      Print("Closed by USD Target: ", profit);
    }
  }
}
//+------------------------------------------------------------------+
void KelolaLockProfit() {
  double point = SymbolInfoDouble(_Symbol, SYMBOL_POINT);
  int total = PositionsTotal();

  for (int i = total - 1; i >= 0; i--) {
    ulong ticket = PositionGetTicket(i);
    if (ticket == 0)
      continue;

    if (!PositionSelectByTicket(ticket))
      continue;

    if (PositionGetString(POSITION_SYMBOL) != _Symbol)
      continue;
    if (PositionGetInteger(POSITION_MAGIC) != MagicNumber)
      continue;

    double entry = PositionGetDouble(POSITION_PRICE_OPEN);
    double sl = PositionGetDouble(POSITION_SL);
    long type = PositionGetInteger(POSITION_TYPE);

    double price = (type == POSITION_TYPE_BUY)
                       ? SymbolInfoDouble(_Symbol, SYMBOL_BID)
                       : SymbolInfoDouble(_Symbol, SYMBOL_ASK);

    double profitPoints;

    if (type == POSITION_TYPE_BUY)
      profitPoints = (price - entry) / point;
    else
      profitPoints = (entry - price) / point;

    if (profitPoints >= LockProfitPoints) {
      double newSL;

      if (type == POSITION_TYPE_BUY)
        newSL = NormalizeDouble(entry + (LockProfitPoints * point), _Digits);
      else
        newSL = NormalizeDouble(entry - (LockProfitPoints * point), _Digits);

      if (sl == 0 || (type == POSITION_TYPE_BUY && newSL > sl) ||
          (type == POSITION_TYPE_SELL && newSL < sl)) {
        trade.PositionModify(ticket, newSL, 0);
      }
    }

    // ===== AUTO TP FEATURE =====
    if (IsAutoTPon) {
      double currentTP = PositionGetDouble(POSITION_TP);

      if (currentTP == 0) // hanya jika belum ada TP
      {
        double newTP;

        if (type == POSITION_TYPE_BUY)
          newTP = NormalizeDouble(entry + (AutoTPPoints * point), _Digits);
        else
          newTP = NormalizeDouble(entry - (AutoTPPoints * point), _Digits);

        trade.PositionModify(ticket, sl, newTP);
      }
    }
  }
}
//+------------------------------------------------------------------+
