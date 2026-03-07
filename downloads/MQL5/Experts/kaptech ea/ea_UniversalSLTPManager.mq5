//+------------------------------------------------------------------+
//|   UNIVERSAL TP SL MANAGER - FIXED VERSION (MQL5)               |
//+------------------------------------------------------------------+
#property strict

#include <Trade/Trade.mqh>
CTrade trade;

//====================== INPUT PARAMETER ============================//

input bool   isEaTpSlBuy = true;        // true = manage BUY, false = manage SELL
input double SetTakeProfitPrice = 0;    // TP price (0 = ignore)
input double SetStopLossPrice  = 0;     // SL price (0 = ignore)
input bool   ManagePendingOrders = true;

//===================================================================//

// Modify Open Position
void ModifyPosition(ulong ticket)
{
   if(!PositionSelectByTicket(ticket))
      return;

   long type = PositionGetInteger(POSITION_TYPE);

   if(isEaTpSlBuy && type != POSITION_TYPE_BUY)
      return;

   if(!isEaTpSlBuy && type != POSITION_TYPE_SELL)
      return;

   double currentSL = PositionGetDouble(POSITION_SL);
   double currentTP = PositionGetDouble(POSITION_TP);

   double newSL = currentSL;
   double newTP = currentTP;

   if(SetStopLossPrice > 0)
      newSL = NormalizeDouble(SetStopLossPrice,_Digits);

   if(SetTakeProfitPrice > 0)
      newTP = NormalizeDouble(SetTakeProfitPrice,_Digits);

   if(currentSL != newSL || currentTP != newTP)
      trade.PositionModify(ticket,newSL,newTP);
}

// Modify Pending Order (FIXED 7 PARAMETERS)
void ModifyOrder(ulong ticket)
{
   if(!OrderSelect(ticket))
      return;

   long type = OrderGetInteger(ORDER_TYPE);

   if(isEaTpSlBuy)
   {
      if(type!=ORDER_TYPE_BUY_LIMIT &&
         type!=ORDER_TYPE_BUY_STOP &&
         type!=ORDER_TYPE_BUY_STOP_LIMIT)
         return;
   }
   else
   {
      if(type!=ORDER_TYPE_SELL_LIMIT &&
         type!=ORDER_TYPE_SELL_STOP &&
         type!=ORDER_TYPE_SELL_STOP_LIMIT)
         return;
   }

   double price       = OrderGetDouble(ORDER_PRICE_OPEN);
   double stoplimit   = OrderGetDouble(ORDER_PRICE_STOPLIMIT);
   double currentSL   = OrderGetDouble(ORDER_SL);
   double currentTP   = OrderGetDouble(ORDER_TP);
   datetime expiration= (datetime)OrderGetInteger(ORDER_TIME_EXPIRATION);
   ENUM_ORDER_TYPE_TIME type_time = (ENUM_ORDER_TYPE_TIME)OrderGetInteger(ORDER_TYPE_TIME);

   double newSL = currentSL;
   double newTP = currentTP;

   if(SetStopLossPrice > 0)
      newSL = NormalizeDouble(SetStopLossPrice,_Digits);

   if(SetTakeProfitPrice > 0)
      newTP = NormalizeDouble(SetTakeProfitPrice,_Digits);

   if(currentSL != newSL || currentTP != newTP)
   {
      trade.OrderModify(
         ticket,
         price,
         newSL,
         newTP,
         type_time,
         expiration,
         stoplimit
      );
   }
}

//========================= MAIN ====================================//

int OnInit()
{
   Print("Universal TP SL Manager Running...");
   return(INIT_SUCCEEDED);
}

void OnDeinit(const int reason)
{
   Print("EA Removed");
}

void OnTick()
{
   // Modify Positions
   for(int i=PositionsTotal()-1; i>=0; i--)
   {
      ulong ticket = PositionGetTicket(i);
      ModifyPosition(ticket);
   }

   // Modify Pending Orders
   if(ManagePendingOrders)
   {
      for(int i=OrdersTotal()-1; i>=0; i--)
      {
         ulong ticket = OrderGetTicket(i);
         ModifyOrder(ticket);
      }
   }
}
