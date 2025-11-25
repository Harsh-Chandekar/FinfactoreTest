import React, { useState } from 'react'


export default function SearchBar({ onSearch }){
const [q, setQ] = useState('')


const submit = (e) => {
e.preventDefault()
if(!q.trim()) return
onSearch(q.trim())
}


return (
<form className="searchBar" onSubmit={submit}>
<input value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search movies, e.g. Batman" />
<button type="submit">Search</button>
</form>
)
}