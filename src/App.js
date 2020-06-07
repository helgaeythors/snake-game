import React from 'react';
import { Switch, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Game from './components/Game';

const App = () => {
    return (
        <>
            <div className="container">
                <Switch>
                    <Route exact path="/" component={ HomePage } />
                    <Route exact path="/game" component={ Game } />
                </Switch>
            </div>
        </>
    )
};

export default App;
