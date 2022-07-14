import {React,useState,useEffect} from "react";
import StockContainer from "./StockContainer";
import PortfolioContainer from "./PortfolioContainer";
import SearchBar from "./SearchBar";
import arraySort from 'array-sort';

function MainContainer() {
  //stocks could be a non state array but if more data is added to the database it makes sense to keep it this way
  const [stocks,setStocks] = useState([]);
  const [portfolioStocks,setPortfolioStocks]=useState([]);
  const [sortBy,setSortBy]= useState('');
  const [filterBy,setFilterBy]=useState('tech');
  const [filterArray,setFilterArray]=useState(stocks);
  const [displayAll,setDisplayAll]= useState(true);
  

  useEffect(() => {
   fetch(`http://localhost:3001/stocks`)
   .then(r=>r.json())
   .then(data=>{
    setStocks(data);
    setFilterArray(data)
   })
   
  },[])
  const stockData = stocks;
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
//sell function
function sellStock(stockToRemove){
  const filterOutStock = portfolioStocks.filter(e=>{
    return e.id !==stockToRemove.id;
  })
  //console.log()
  setPortfolioStocks([...filterOutStock])
}

//sort 
function handleSortRadio(e){
  setSortBy(e.target.value)
  setDisplayAll(false);
}

useEffect(() => {
  if(sortBy === "Alphabetically"){
   // console.log("AHHHHHHHH")
   const aplhSortedArray= arraySort(filterArray,"name");
   setFilterArray([...aplhSortedArray]);
  }
  else if(sortBy ==="Price"){
    console.log("hi:)")
    const priceSortedArray= arraySort(filterArray,"price");
    setFilterArray([...priceSortedArray]);
  }
 // setStocks([...filterArray]);
}, [sortBy])

//filter
// do  stocks.filter() and set the array to only those also set up a state in the same way as the sort
function handleFilterChange(e){
  setFilterBy(e.target.value);
  setDisplayAll(false);
}

useEffect(()=>{
  const fArray = stocks.filter((e)=>{
    return e.type === filterBy;
  });
  if(displayAll===false){
    console.log(filterArray)
  setFilterArray([...fArray]);
  }
  else if(displayAll===true){
    setFilterArray([...stockData])
  }
  
},[filterBy]);

  return (
    <div>
      <SearchBar handleFilterChange={handleFilterChange} handleSortRadio={handleSortRadio} setSortBy={setSortBy} sortBy={sortBy} />
      <div className="row">
        <div className="col-8">
          <StockContainer handleBuy={buyStock} stocks={stocks} filterStocks={filterArray} displayAll={displayAll} />
        </div>
        <div className="col-4">
          <PortfolioContainer handleSell={sellStock} portfolioStocks={portfolioStocks} />
        </div>
      </div>
    </div>
  );
}

export default MainContainer;
