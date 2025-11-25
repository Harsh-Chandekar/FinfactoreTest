OMDB Movie Explorer 🎬

A simple web app to search and view movie details using the OMDB API.
Frontend built with React + Vite, backend with Spring Boot.

🖥️ Live Flow

Type a movie name in the search bar.

Backend fetches matching movies from OMDB.

Results show in a grid with poster, title, and year.

Click View Details → see full movie info.

📂 Project Structure
Backend (omdb-backend)

Handles /api/search and /api/movie/{imdbID} requests.

Fetches data from OMDB API and returns JSON.

Runs on http://localhost:8080.

Frontend (omdb-frontend)

React app communicates with backend at /api/*.

Displays search results and movie details.

Runs on http://localhost:5173 via Vite dev server.

⚙️ How to Run
Backend

Open in IDE (IntelliJ/Eclipse).

Make sure Java 17+ is installed.

Run OmdbApplication.java.

API available at http://localhost:8080/api.

Frontend

Open terminal in omdb-frontend.

Run npm install

Run npm run dev

Visit http://localhost:5173

Note: Keep backend running while using frontend.

🛠️ Tech Stack

Backend: Java, Spring Boot, REST API

Frontend: React, Vite, JavaScript, CSS

API: OMDB API

🔄 Project Flow

User searches a movie → frontend calls /api/search.

Backend fetches JSON from OMDB → returns to frontend.

Frontend displays grid results → user clicks a movie.

Frontend calls /api/movie/{imdbID} → backend returns detailed JSON.

Frontend shows movie details page.

📌 Notes

If a movie has no poster, a placeholder is shown.

Keep backend running on port 8080.

Frontend automatically proxies /api/* to backend via Vite.

✨ Future Improvements

Pagination for search results.

Better UI/UX with animations.

More error handling for API failures.