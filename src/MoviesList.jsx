import React, { useState } from 'react';
import './Project.css';

const movies = [
  { id: 1, title: "MARCO", thumbnail: "/thumbnails/1738472442795_MARCO-Gun_2feb_landscape_thumb.jpg", videoUrl: "/movies/MARCO.mp4" },
  { id: 2, title: "MAHAAN", thumbnail: "/thumbnails/mahaan-movie-review-1.jpg", videoUrl: "/movies/MAHAAN.mp4" },
  { id: 3, title: "SARIPODAA SANIVAARAM", thumbnail: "/thumbnails/Saripodhaa-Sanivaaram-first-show.jpg", videoUrl: "/movies/SARIPODHAA SANIVAARAM.mp4" },
  { id: 4, title: "GREATEST OF ALL TIME", thumbnail: "/thumbnails/goat-vijay-1600.avif", videoUrl: "/movies/GOAT.mp4" },
];

const shows = [
  { id: 1, title: "AGENT ANAND SANTOSH", thumbnail: "/thumbnails/AAS.jpg", videoUrl: "/Shows/Agent Anand Santosh Trailer _ Shanmukh Jaswanth _ Infinitum Media _ Arun Pawar _ ahaVideoIN.mp4" },
  { id: 2, title: "SAVE THE TIGERS", thumbnail: "/thumbnails/SAVE THE TIGERS.webp", videoUrl: "/Shows/save the tigers.mp4" },
  { id: 3, title: "#90's A MIDDLE CLASS BIOIC", thumbnail: "/thumbnails/90-s.png", videoUrl: "/Shows/90's middie class biopic.mp4" },
  { id: 4, title: "STUDENT", thumbnail: "/thumbnails/STUDENT.jpg", videoUrl: "/Shows/student.mp4" },
];

const MoviesList = ({ searchQuery = "" }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const allMedia = [...movies, ...shows];

  const filtered = searchQuery
    ? allMedia.filter(item =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : allMedia;

  if (selectedMedia) {
    return (
      <div className="player">
        <h2>{selectedMedia.title}</h2>
        <video width="100%" height="auto" controls autoPlay>
          <source src={selectedMedia.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <br />
        <button className="login-btn" onClick={() => setSelectedMedia(null)}>
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="content">
      {filtered.length === 0 ? (
        <h2 style={{ textAlign: "center", marginTop: "40px" }}>No results found.</h2>
      ) : (
        <>
          <h1>StreamSphere Picks</h1>
          <p>Watch movies and shows in HD, exclusively on StreamSphere</p>

          <div className="movie-list">
            {filtered.map(item => (
              <div key={item.id} className="movie-card" onClick={() => setSelectedMedia(item)}>
                <img src={item.thumbnail} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MoviesList;