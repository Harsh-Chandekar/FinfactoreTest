import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SearchBar from './components/SearchBar'
import ResultsGrid from './components/ResultsGrid'
import MovieDetailsPage from './pages/MovieDetailsPage'
import ErrorBoundary from './components/ErrorBoundary'

function App(){
const [results, setResults] = useState([])
const [loading, setLoading] = useState(false)
const [error, setError] = useState(null)
const [selectedId, setSelectedId] = useState(null)


const search = async (title) => {
setError(null)
setLoading(true)
setSelectedId(null)
try{
const res = await fetch(`/api/search?title=${encodeURIComponent(title)}&page=1`)
if(!res.ok) throw new Error('Network response not ok')
const data = await res.json()
if(data && data.Search) setResults(data.Search)
else {
setResults([])
if(data && data.Response === 'False') setError(data.Error || 'No results')
}
}catch(err){
setError(err.message)
setResults([])
}finally{
setLoading(false)
}
}


const openDetails = (imdbId) => {
  console.log("id " , imdbId )
setSelectedId(imdbId)
}


const backToSearch = () => {
setSelectedId(null)
}

  return (
    <>
      <div className="container">
<header>
<h1>OMDB Movie Explorer</h1>
</header>


{!selectedId && (
<main>
<SearchBar onSearch={search} />


{loading && <p className="info">Loading...</p>}
{error && <p className="error">{error}</p>}


<ResultsGrid items={results} onOpen={openDetails} />
</main>
)}


{selectedId && (
 <ErrorBoundary>
    <MovieDetailsPage imdbId={selectedId} onBack={backToSearch} />
  </ErrorBoundary>
)}



</div>
    </>
  )
}

export default App
