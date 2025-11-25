import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function MovieDetailsPage({imdbId,onBack}) {
  //const { imdbId } = useParams();
  //const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //const onBack = () => navigate(-1);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError(null);
    console.log("id in detials : ",imdbId)
    fetch(`/api/movie/${imdbId}`)
      .then((res) => {
        if (!res.ok) throw new Error("Network response not ok");
        return res.json();
      })
      .then((data) => {
        if (mounted) setMovie(data);
      })
      .catch((err) => {
        if (mounted) setError(err.message);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => (mounted = false);
  }, [imdbId]);

  // -----------------------
  // Conditional returns
  // -----------------------
  if (loading) return <p className="info">Loading details...</p>;
  if (error) return <p className="error">{error}</p>;
  if (!movie) return <p className="info">No details</p>;

  // -----------------------
  // Final UI
  // -----------------------
  return (
    <div className="details">
      <button onClick={onBack} className="back">← Back</button>

      <div className="detailsGrid">
        <img
          src={movie.Poster === "N/A" ? "/no-poster.png" : movie.Poster}
          alt={movie.Title}
        />

        <div className="detailsInfo">
          <h2>
            {movie.Title} ({movie.Year})
          </h2>

          <p><strong>Genre:</strong> {movie.Genre}</p>
          <p><strong>Runtime:</strong> {movie.Runtime}</p>
          <p><strong>Director:</strong> {movie.Director}</p>
          <p><strong>Actors:</strong> {movie.Actors}</p>
          <p><strong>Language:</strong> {movie.Language}</p>
          <p><strong>Plot:</strong> {movie.Plot}</p>
          <p><strong>IMDB Rating:</strong> {movie.imdbRating}</p>

          {movie.Ratings && movie.Ratings.length > 0 && (
            <div className="ratings">
              <h4>Ratings</h4>
              <ul>
                {movie.Ratings.map((r, idx) => (
                  <li key={idx}>
                    {r.Source}: {r.Value}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetailsPage;