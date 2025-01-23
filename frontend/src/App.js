
import React from 'react'
import './App.css';

function App() {

  const [bestsellers, setBestsellers] = React.useState([])



  React.useEffect(() => {
    fetch('http://localhost:8000/books/')
    .then(res => res.json())
    .then(data => setBestsellers(data))
  }, [])



  const bestsellerElements = bestsellers.map(bestseller=> {
    return(
      <div className='bestseller-element'>
        <img src={bestseller.imageLinks['smallThumbnail']} alt="bestseller-img" />
      </div>
    )
  })
  return (
   
    <div className="App">
      <h2>Check out the latest bestsellers</h2>
      <div className="book-container">
        <div className="book-scroller">
          <div className="bestseller-group">
              {bestsellerElements}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
