import React from "react";
import Stock from "./Stock";
import { v4 as uuidv4 } from 'uuid';

function PortfolioContainer({portfolioStocks,handleSell}) {
  
  return (
    <div>
      <h2>My Portfolio</h2>
      {
        //render your portfolio stocks here
        portfolioStocks.map(e=>{
          function handleClick(){
            handleSell(e);
          }
          return <Stock key={uuidv4()} handleClick={handleClick} name={e.name} price={e.price}></Stock>
        })
      }
    </div>
  );
}

export default PortfolioContainer;
