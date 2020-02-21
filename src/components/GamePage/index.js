import React from 'react';
import HomePage from '../HomePage';
import './GamePage.css';

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
                <div className={"game-page"}>
                    <button className="App-button" onClick={ () => this.setState({ isGamePage: false }) }> Back to start </button>
                    <p>game</p>
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