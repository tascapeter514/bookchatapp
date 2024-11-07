
import React from 'react'
import './App.css';

function App() {

  const [myauthors, setmyAuthors] = React.useState()



  React.useEffect(() => {
    fetch('http://localhost:8000/frontend/')
    .then(res => res.json())
    .then(data => setmyAuthors(JSON.stringify(data)))
  })

  console.log(myauthors)

  // const authorElements = myauthors.map(author => {
  //   return(
  //     <div>{author}</div>
  //   )
  // })
  return (

    <div className="App">
      <header className="App-header">

        {/* {JSON.stringify(myauthors)} */}
        {myauthors}

      </header>
    </div>
  );
}

export default App;
