import React from 'react';
import './App.css';
import GamePage from './components/GamePage';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHomePage: true
    }
  }

  render() {
    const { isHomePage } = this.state;
    return (
      <div className="App">
        {
          isHomePage && 
          <header className="App-header">
            <p className="App-title"> Snake </p>
            <div class="line"></div>
            <button className="App-button" onClick={ () => this.setState({ isHomePage: false }) }> Play! </button>
          </header>
        }
        {
          !isHomePage &&
          <GamePage />
        }
        
      </div>
    );
  }
}

export default App;
