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
    terminateGame = () => {
        this.setState({ isGamePage: false });
    }
    render() {
        const { isGamePage } = this.state;
        return(
            <>
            {
                isGamePage && 
                <div className="game-page">
                    <Game terminateGame={this.terminateGame} />
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