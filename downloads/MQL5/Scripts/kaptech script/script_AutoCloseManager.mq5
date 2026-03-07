//+------------------------------------------------------------------+
//|                    AutoCloseManager_MT5                          |
//|      Close Positions & Delete Pending Orders - KAPTECH           |
//+------------------------------------------------------------------+
#property strict
#property script_show_inputs

#include <Trade/Trade.mqh>
CTrade trade;

//================ INPUT =================//

enum CloseMode
{
   CLOSE_ALL = 0,
   CLOSE_PROFIT,
   CLOSE_LOSS,
   NO_CLOSE
};

enum DeleteMode
{
   DELETE_NONE = 0,

   // Delete All Pending
   DELETE_ALL_PENDING,

   // Delete Pending Specific
   DELETE_BUY_LIMIT,
   DELETE_SELL_LIMIT,
   DELETE_BUY_STOP,
   DELETE_SELL_STOP,

   // NEW - Delete Pending Group
   DELETE_PENDING_BUY,     // Buy Limit + Buy Stop
   DELETE_PENDING_SELL,    // Sell Limit + Sell Stop

   // NEW - Close Open Positions by Type
   DELETE_POSITION_BUY,
   DELETE_POSITION_SELL
};

input CloseMode  ClosePositionsMode = CLOSE_ALL;
input DeleteMode DeleteOrdersMode   = DELETE_NONE;


//+------------------------------------------------------------------+
void OnStart()
{
   ClosePositions();
   DeleteByMode();
   Print("=== DONE ===");
}
//+------------------------------------------------------------------+

//================ CLOSE POSITIONS (GLOBAL MODE) =================//
void ClosePositions()
{
   if(ClosePositionsMode == NO_CLOSE)
      return;

   for(int i = PositionsTotal() - 1; i >= 0; i--)
   {
      ulong ticket = PositionGetTicket(i);

      if(PositionSelectByTicket(ticket))
      {
         double profit = PositionGetDouble(POSITION_PROFIT);
         bool close_it = false;

         if(ClosePositionsMode == CLOSE_ALL)
            close_it = true;

         if(ClosePositionsMode == CLOSE_PROFIT && profit > 0)
            close_it = true;

         if(ClosePositionsMode == CLOSE_LOSS && profit < 0)
            close_it = true;

         if(close_it)
         {
            if(trade.PositionClose(ticket))
               Print("Closed Position #", ticket);
            else
               Print("Failed Close #", ticket, " | Error: ", GetLastError());
         }
      }
   }
}
//+------------------------------------------------------------------+

//================ DELETE / CLOSE BY MODE =================//
void DeleteByMode()
{
   if(DeleteOrdersMode == DELETE_NONE)
      return;

   //=======================================
   // 1️⃣ HANDLE OPEN POSITIONS BY TYPE
   //=======================================
   if(DeleteOrdersMode == DELETE_POSITION_BUY ||
      DeleteOrdersMode == DELETE_POSITION_SELL)
   {
      for(int i = PositionsTotal() - 1; i >= 0; i--)
      {
         ulong ticket = PositionGetTicket(i);

         if(PositionSelectByTicket(ticket))
         {
            ENUM_POSITION_TYPE type =
               (ENUM_POSITION_TYPE)PositionGetInteger(POSITION_TYPE);

            bool close_it = false;

            if(DeleteOrdersMode == DELETE_POSITION_BUY &&
               type == POSITION_TYPE_BUY)
               close_it = true;

            if(DeleteOrdersMode == DELETE_POSITION_SELL &&
               type == POSITION_TYPE_SELL)
               close_it = true;

            if(close_it)
            {
               if(trade.PositionClose(ticket))
                  Print("Closed Position #", ticket);
               else
                  Print("Failed Close #", ticket, " | Error: ", GetLastError());
            }
         }
      }
   }

   //=======================================
   // 2️⃣ HANDLE PENDING ORDERS
   //=======================================
   for(int i = OrdersTotal() - 1; i >= 0; i--)
   {
      ulong ticket = OrderGetTicket(i);

      if(OrderSelect(ticket))
      {
         ENUM_ORDER_TYPE type =
            (ENUM_ORDER_TYPE)OrderGetInteger(ORDER_TYPE);

         bool delete_it = false;

         if(DeleteOrdersMode == DELETE_ALL_PENDING)
            delete_it = true;

         if(DeleteOrdersMode == DELETE_BUY_LIMIT &&
            type == ORDER_TYPE_BUY_LIMIT)
            delete_it = true;

         if(DeleteOrdersMode == DELETE_SELL_LIMIT &&
            type == ORDER_TYPE_SELL_LIMIT)
            delete_it = true;

         if(DeleteOrdersMode == DELETE_BUY_STOP &&
            type == ORDER_TYPE_BUY_STOP)
            delete_it = true;

         if(DeleteOrdersMode == DELETE_SELL_STOP &&
            type == ORDER_TYPE_SELL_STOP)
            delete_it = true;

         // NEW GROUP BUY
         if(DeleteOrdersMode == DELETE_PENDING_BUY &&
            (type == ORDER_TYPE_BUY_LIMIT ||
             type == ORDER_TYPE_BUY_STOP))
            delete_it = true;

         // NEW GROUP SELL
         if(DeleteOrdersMode == DELETE_PENDING_SELL &&
            (type == ORDER_TYPE_SELL_LIMIT ||
             type == ORDER_TYPE_SELL_STOP))
            delete_it = true;

         if(delete_it)
         {
            if(trade.OrderDelete(ticket))
               Print("Deleted Order #", ticket);
            else
               Print("Failed Delete #", ticket, " | Error: ", GetLastError());
         }
      }
   }
}
//+------------------------------------------------------------------+
