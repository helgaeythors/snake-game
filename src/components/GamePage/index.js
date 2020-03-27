import React from 'react';
import HomePage from '../HomePage';
import './GamePage.css';
import Game from '../Game';

class GamePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isGamePage: true
        }
    }
    render() {
        const { isGamePage } = this.state;
        return(
            <>
            {
                isGamePage && 
                <div className="game-page">
                    <button className="App-button back-button" onClick={ () => this.setState({ isGamePage: false }) }> Back to start </button>
                    <Game />
                </div>
            }
            {
                !isGamePage && <HomePage />

            }
            </>
        );
    }
}

export default GamePage;