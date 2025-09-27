// src/TVShows.jsx
import React, { useState, useEffect } from 'react';
import './Project.css';  // Make sure your styles are applied consistently here

const TVShows = () => {
  const [tvShows, setTvShows] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [backendError, setBackendError] = useState(null);

  // Fetch TV shows from API - strict backend dependency
  useEffect(() => {
    const fetchTvShows = async () => {
      setLoading(true);
      setBackendError(null);

      // Try multiple backend ports
      const backendPorts = ['8081', '8080'];

      for (const port of backendPorts) {
        try {
          const response = await fetch(`http://localhost:${port}/tvshows`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            const apiTvShows = await response.json();
            if (apiTvShows && apiTvShows.length > 0) {
              setTvShows(apiTvShows);
              setLoading(false);
              return; // Success, exit the function
            }
          }
        } catch (error) {
          console.warn(`API fetch failed on port ${port}:`, error);
        }
      }

      // All attempts failed - show error, no content available
      setBackendError('Backend server is not running. Please start the backend to access TV shows.');
      setTvShows([]);
      setLoading(false);
    };

    fetchTvShows();
  }, []);

  return (
    <div className="content">
      <h1>TV Shows</h1>

      {loading && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading TV shows from backend...</p>
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

      {!loading && !backendError && tvShows.length === 0 && (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>No TV shows available from the backend.</p>
        </div>
      )}

      {!selectedShow && tvShows.length > 0 ? (
        <div className="movie-list">
          {tvShows.map((show) => (
            <div
              key={show.id}
              className="movie-card"
              onClick={() => setSelectedShow(show)}
            >
              <img src={`http://localhost:8081/api/media/thumbnails/${show.thumbnail.split('/').pop()}`} alt={show.title} />
              <p>{show.title}</p>
            </div>
          ))}
        </div>
      ) : selectedShow ? (
        <div className="player">
          <h2>{selectedShow.title}</h2>
          <video controls autoPlay>
            <source src={`http://localhost:8081/api/media/videos/${selectedShow.videoUrl.split('/').pop()}`} type="video/mp4" />
          </video>
          <br />
          <button className="login-btn" onClick={() => setSelectedShow(null)}>
            Back to TV Shows
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default TVShows;
