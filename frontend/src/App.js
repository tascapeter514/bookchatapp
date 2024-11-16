
import React from 'react'
import './App.css';

function App() {

  const [myauthors, setmyAuthors] = React.useState([])



  React.useEffect(() => {
    fetch('http://localhost:8000/frontend/')
    .then(res => res.json())
    .then(data => setmyAuthors(data))
  })

  console.log(myauthors)

  const authorElements = myauthors.map(author => {
    return(
      <h1>{author.name}</h1>
    )
  })
  return (
   

    
    

  

    <div className="App">
      <header className="App-header">

        {/* {myauthors} */}
        <ol>{authorElements}</ol>

      </header>
    </div>
  );
}

export default App;
