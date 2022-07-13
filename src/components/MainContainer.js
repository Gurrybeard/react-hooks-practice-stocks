import {React,useState,useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";

function MainContainer() {
  const [stocks,Setstocks] = useState([]);
  const [portfolioStocks,setPortfolioStocks]=useState([]);

  useEffect(() => {
   fetch(`http://localhost:3001/stocks`)
   .then(r=>r.json())
   .then(data=>{
    Setstocks(data);
   })
   
  },[])

//console.log(stocks)
//when i click on a stock this functiion will take in that stock and add it to the portfolio stock array
function buyStock(stockToAdd){
  const addedStock= stocks.find(e=>{
return stockToAdd.id ===e.id;
  })
  console.log(addedStock)
  console.log(portfolioStocks)
  setPortfolioStocks([...portfolioStocks,addedStock])
}

function sellStock(stockToRemove){
  const filterOutStock = portfolioStocks.filter(e=>{
    return e.id !==stockToRemove.id;
  })
  //console.log
  setPortfolioStocks([...filterOutStock])
}
  return (
    <div>
      <SearchBar />
      <div className="row">
        <div className="col-8">
          <StockContainer handleBuy={buyStock} stocks={stocks} />
        </div>
        <div className="col-4">
          <PortfolioContainer handleSell={sellStock} portfolioStocks={portfolioStocks} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
