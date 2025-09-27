import React, { useState, useEffect } from 'react';
import './Project.css';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(null);

  // Fetch movies from API - strict backend dependency
  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setBackendError(null);

      // Try multiple backend ports
      const backendPorts = ['8081', '8080'];

      for (const port of backendPorts) {
        try {
          const response = await fetch(`http://localhost:${port}/movies`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const apiMovies = await response.json();
            if (apiMovies && apiMovies.length > 0) {
              setMovies(apiMovies);
              setLoading(false);
              return; // Success, exit the function
            }
          }
        } catch (error) {
          console.warn(`API fetch failed on port ${port}:`, error);
        }
      }

      // All attempts failed - show error, no content available
      setBackendError('Backend server is not running. Please start the backend to access movies.');
      setMovies([]);
      setLoading(false);
    };

    fetchMovies();
  }, []);

  return (
    <div className="content">
      <h1>Movies</h1>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading movies from backend...</p>
        </div>
      )}

      {backendError && (
        <div style={{
          backgroundColor: '#f8d7da',
          color: '#721c24',
          padding: '20px',
          borderRadius: '5px',
          marginBottom: '20px',
          border: '1px solid #f5c6cb',
          textAlign: 'center'
        }}>
          <h3>🚫 Backend Connection Required</h3>
          <p>{backendError}</p>
          <p>Please ensure the Spring Boot backend is running on port 8080 or 8081.</p>
          <button
            className="login-btn"
            onClick={() => window.location.reload()}
            style={{ marginTop: '10px' }}
          >
            Retry Connection
          </button>
        </div>
      )}

      {!loading && !backendError && movies.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>No movies available from the backend.</p>
        </div>
      )}

      {!selectedMovie && movies.length > 0 ? (
        <div className="movie-list">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="movie-card"
              onClick={() => setSelectedMovie(movie)}
            >
              <img src={`http://localhost:8081/api/media/thumbnails/${movie.thumbnail.split('/').pop()}`} alt={movie.title} />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      ) : selectedMovie ? (
        <div className="player">
          <h2>{selectedMovie.title}</h2>
          <video controls autoPlay>
            <source src={`http://localhost:8081/api/media/videos/${selectedMovie.videoUrl.split('/').pop()}`} type="video/mp4" />
          </video>
          <br />
          <button className="login-btn" onClick={() => setSelectedMovie(null)}>
            Back to Movies
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Movies;
