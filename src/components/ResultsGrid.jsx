import React from 'react'
import MovieCard from './MovieCard'


export default function ResultsGrid({ items = [], onOpen }){
if(!items.length) return <p className="info">No results</p>

return (
<div className="grid">
{items.map(it=> (
   
<MovieCard key={it.imdbID} movie={it} onOpen={onOpen} />
))}
</div>
)
}