import React from 'react';
import GamePage from '../GamePage';
import './HomePage.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isHomePage: true
        }
    }
    render() {
      const { isHomePage } = this.state;
      return (
        <>
          {
            isHomePage && 
            <div className="App-header">
              <p className="App-title"> Snake </p>
              <div class="line"></div>
              <button className="App-button" onClick={ () => this.setState({ isHomePage: false }) }> Play! </button>
            </div>
          }
          {
            !isHomePage && <GamePage />
          }
          
        </>
      );
    }
}

export default HomePage;