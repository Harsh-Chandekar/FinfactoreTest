import React from 'react'


export default function MovieCard({ movie, onOpen }){
return (
<div className="card">
<img src={movie.Poster === 'N/A' ? '/no-poster.png' : movie.Poster} alt={movie.Title} />
<div className="meta">
<h3>{movie.Title}</h3>
<p>{movie.Year}</p>
<button onClick={()=>onOpen(movie.imdbID)}>View Details</button>
</div>
</div>
)
}