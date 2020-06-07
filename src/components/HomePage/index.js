import React from 'react';
import './HomePage.css';
import '../TitleCanvas';
import { Link } from 'react-router-dom';
import TitleCanvas from '../TitleCanvas';

const HomePage = () => {
  return (
        <div className="App-header">
          <div className="App-title">
            <TitleCanvas/>
          </div>
          <div className="line"></div>
          <Link to="/game"><button className="App-button">Play!</button></Link>
        </div>
  );
};

export default HomePage;