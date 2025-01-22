
import React from 'react'
import './App.css';

function App() {

  const [books, setBooks] = React.useState([])



  React.useEffect(() => {
    fetch('http://localhost:8000/books/')
    .then(res => res.json())
    .then(data => setBooks(data))
  }, [])

  console.log(books)

  const bookElements = books.map(book => {
    return(
      <div>
        <h1>{book.title}</h1>
        <img src={book.imageLinks['smallThumbnail']} alt="book-img" />
      </div>
    )
  })
  return (
   
    <div className="App">
      <main className="App-header">
        <ol>{bookElements}</ol>

      </main>
    </div>
  );
}

export default App;
