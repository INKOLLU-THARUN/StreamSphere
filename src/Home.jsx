 // Home.jsx
import React from 'react';
import MoviesList from './MoviesList';

const Home = ({ searchQuery }) => {
  return <MoviesList searchQuery={searchQuery} />;
};

export default Home;