//+------------------------------------------------------------------+
//|              BBMA ENTRY M1 KAPTECH VERSION                       |
//+------------------------------------------------------------------+
#property strict
#include <Trade/Trade.mqh>
CTrade trade;

//================ INPUT =================//
input double LotSize = 0.01;
input int LayerPerSignal = 10;
input int TakeProfitPips = 100;
input int StopLossPips = 0;
input double MaxOpenPercent = 40.0;
input double EquityProtectPercent = 20.0;

//================ HANDLE =================//
int hBB;
double pip;

//================ GLOBAL =================//
bool buyTriggered=false;
bool sellTriggered=false;

//+------------------------------------------------------------------+
int OnInit()
{
   pip = (_Digits==3 || _Digits==5) ? _Point*10 : _Point;
   hBB = iBands(_Symbol,_Period,20,0,2.0,PRICE_CLOSE);
   return(INIT_SUCCEEDED);
}
//+------------------------------------------------------------------+
void OnTick()
{
   CheckSignal();
   ApplyGlobalTP();
   CheckEquityProtection();
}
//+------------------------------------------------------------------+
void CheckSignal()
{
   double bbU[],bbL[];
   CopyBuffer(hBB,0,0,1,bbU);
   CopyBuffer(hBB,2,0,1,bbL);

   double bid = SymbolInfoDouble(_Symbol,SYMBOL_BID);
   double ask = SymbolInfoDouble(_Symbol,SYMBOL_ASK);

   // ===== BUY =====
   if(bid <= bbL[0])
   {
      if(!buyTriggered)
      {
         Print("BUY SIGNAL DETECTED");
         OpenLayer(ORDER_TYPE_BUY);
         buyTriggered=true;
         sellTriggered=false;
      }
   }
   else buyTriggered=false;

   // ===== SELL =====
   if(ask >= bbU[0])
   {
      if(!sellTriggered)
      {
         Print("SELL SIGNAL DETECTED");
         OpenLayer(ORDER_TYPE_SELL);
         sellTriggered=true;
         buyTriggered=false;
      }
   }
   else sellTriggered=false;
}
//+------------------------------------------------------------------+
void OpenLayer(ENUM_ORDER_TYPE type)
{
   if(GetMarginPercent() >= MaxOpenPercent)
   {
      Print("Margin limit reached");
      return;
   }

   for(int i=0;i<LayerPerSignal;i++)
   {
      double sl=0;

      if(type==ORDER_TYPE_BUY)
      {
         if(StopLossPips>0)
            sl = NormalizeDouble(SymbolInfoDouble(_Symbol,SYMBOL_BID) - StopLossPips*pip,_Digits);

         trade.Buy(LotSize,_Symbol,0,sl,0);
      }
      else
      {
         if(StopLossPips>0)
            sl = NormalizeDouble(SymbolInfoDouble(_Symbol,SYMBOL_ASK) + StopLossPips*pip,_Digits);

         trade.Sell(LotSize,_Symbol,0,sl,0);
      }
   }
}
//+------------------------------------------------------------------+
double GetMarginPercent()
{
   double margin = AccountInfoDouble(ACCOUNT_MARGIN);
   double bal    = AccountInfoDouble(ACCOUNT_BALANCE);
   if(bal==0) return 0;
   return (margin/bal)*100.0;
}
//+------------------------------------------------------------------+
void ApplyGlobalTP()
{
   if(TakeProfitPips<=0) return;

   for(int i=PositionsTotal()-1;i>=0;i--)
   {
      if(PositionGetTicket(i))
      {
         if(PositionGetString(POSITION_SYMBOL)!=_Symbol) continue;

         double open = PositionGetDouble(POSITION_PRICE_OPEN);
         double tp;

         if(PositionGetInteger(POSITION_TYPE)==POSITION_TYPE_BUY)
            tp = open + TakeProfitPips*pip;
         else
            tp = open - TakeProfitPips*pip;

         trade.PositionModify(PositionGetTicket(i),
                              PositionGetDouble(POSITION_SL),
                              NormalizeDouble(tp,_Digits));
      }
   }
}
//+------------------------------------------------------------------+
void CheckEquityProtection()
{
   if(StopLossPips>0) return;

   double bal = AccountInfoDouble(ACCOUNT_BALANCE);
   double eq  = AccountInfoDouble(ACCOUNT_EQUITY);

   if(eq <= bal*(EquityProtectPercent/100.0))
   {
      Print("Equity protection triggered");
      CloseAll();
   }
}
//+------------------------------------------------------------------+
void CloseAll()
{
   for(int i=PositionsTotal()-1;i>=0;i--)
   {
      if(PositionGetTicket(i))
         trade.PositionClose(PositionGetTicket(i));
   }
}
//+------------------------------------------------------------------+
