import React from "react";
import Stock from "./Stock";

function StockContainer({stocks,handleBuy,filterStocks,displayAll}) {
  const stockMap = filterStocks.map(e => {
    function handleClick(){
      handleBuy(e)
    }
    return <Stock name={e.name} price={e.price} key={e.id} handleClick={handleClick}></Stock>
  });
  
  return (
    <div>
      <h2>Stocks</h2>
      {/* render stock list here*/
      
      stockMap
      }
    </div>
  );
}

export default StockContainer;
