import React from 'react';
import './Game.css';
import { availableDirections } from './constants';

let ctx = {};

const drawNode = (node) => {
    // fill color
    ctx.fillStyle = 'white';
    // border color
    ctx.strokestyle = 'black';
    // draw
    ctx.fillRect(node.x, node.y, 10, 10);
    ctx.strokeRect(node.x, node.y, 10, 10);
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this._isMounted = false;
        this.state = {
            turnedThisFrame: false,
            playerPoints: 0,
            snake: {
                position: [ {x: 250, y: 250},  {x: 240, y: 250}, {x: 230, y: 250} ],
                gameOver: false,
                direction: availableDirections.RIGHT,
            },
            pellet: {
                position: {},
            }
        }
    }
    componentDidMount(){
        this._isMounted = true;
        this.canvas = this.refs.canvas;
        ctx = this.canvas.getContext('2d');

        // create height and width variables, scale with 0.2
        let width = window.innerWidth - (window.innerWidth * 0.2);
        let height = window.innerHeight - (window.innerHeight * 0.2);

        // make sure the width is divisible by 10 (the node size)
        if (width % 10) {
            // if the width modulo 10 is more then zero, then remove extra digits to make the width divisible by 10
            width = width - (width % 10);
        }

        // make sure the height is divisible by 10 (the node size), the same way as the width
        if (height % 10) {
            height = height - (height % 10);
        }

        // set the width and height of the canvas, according to window size
        ctx.canvas.width  = width;
        ctx.canvas.height = height;

        // set the width and height of board div, according to window size
        document.getElementById("board").style.width = width + "px";
        document.getElementById("board").style.height = height + "px";

        // set event handler for key presses
        document.addEventListener('keydown', this.handleKeyDown);
        
        // initialize pellet position
        this.setNewPelletPosition();

        this.main();
    }
    componentWillUnmount(){
        this._isMounted = false;
    }
    initBoard = () => {
        // define the initial state
        let initState = {
            turnedThisFrame: false,
            playerPoints: 0,
            snake: {
                position: [ {x: 250, y: 250},  {x: 240, y: 250}, {x: 230, y: 250} ],
                gameOver: false,
                direction: availableDirections.RIGHT,
            },
            pellet: {
                position: {},
            }
        }

        // call all necessary function to restart the game
        this.toggleGameOverStyles();
        this.clearCanvas();
        this._isMounted && this.setState(initState);
        this.setNewPelletPosition();
        this.main();
    }
    renderSnake = () => {
        this.state.snake.position.forEach(node => {
            drawNode(node);
        });
        // draw the pellet
        this.renderPellet();
    }
    renderPellet = () => {
        drawNode(this.state.pellet.position);
    }
    setPoints = (number) => {
        this._isMounted && this.setState({ playerPoints: number });
    }
    incrementsPoints = () => {
        this.setPoints(this.state.playerPoints + 1);
    }
    clearCanvas = () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    newPelletPosition = () => {
        let newX = Math.floor((Math.random() * this.canvas.width - 10) + 10);
        let newY = Math.floor((Math.random() * this.canvas.height - 10) + 10);
        newX = this.roundDown(newX);
        newY = this.roundDown(newY);
        return {x: newX, y: newY}
    }
    roundDown = (number) => {
        let n = number % 10;
        return number - n;
    }
    setNewPelletPosition = () => {
        this._isMounted && this.setState({ pellet: { position: this.newPelletPosition() } });
    }
    handleSnakeAtePellet = () => {
        const { snake, pellet } = this.state;
        if (snake.position[0].x === pellet.position.x && snake.position[0].y === pellet.position.y) {
            this.addNodeToSnake();
            // set new pellet position
            this.setNewPelletPosition();
            // set points
            this.incrementsPoints();
        }
    }
    parseXDirection = (direction) => {
        if (direction === availableDirections.RIGHT) { return 10; }
        if (direction === availableDirections.LEFT) { return -10; }
        else { return 0 }
    }
    
    parseYDirection = (direction) => {
        if (direction === availableDirections.UP) { return -10; }
        if (direction === availableDirections.DOWN) { return 10; }
        else { return 0 }
    }
    
    checkIfOffBoard = (position) => {
        if (position.x > this.canvas.width - 10) { return true; }
        if (position.x < 0) { return true; }
        if (position.y > this.canvas.height - 10) { return true; }
        if (position.y < 0) { return true; }
        else { return false; }
    }
    checkIfSnakeMovesIntoItself = (position) => {
        let retVal = false;
        this.state.snake.position.forEach(node => {
            if (position.x === node.x && position.y === node.y) {
                retVal = true;
            }
        });
        return retVal;
    }
    addNodeToSnake = () => {
        const { snake } = this.state;
        // add node to the snake
        let length = snake.position.length;
        if (snake.direction === availableDirections.LEFT || snake.direction === availableDirections.RIGHT) {
            snake.position.push({ x: snake.position[length - 1].x - 10, y: snake.position[length - 1].y });
        } else {
            snake.position.push({ x: snake.position[length - 1].x, y: snake.position[length - 1].y - 10 });
        }
    }
    moveSnakeIfNotGameOver = (direction) => {
        const { snake } = this.state;
        let Xmovement = this.parseXDirection(direction);
        let Ymovement = this.parseYDirection(direction);
    
        // create the new head
        let newHeadPos = {x: snake.position[0].x + Xmovement, y: snake.position[0].y + Ymovement };
    
        // check if game over
        let offBoard = this.checkIfOffBoard(newHeadPos);
        let snakeMovesIntoItself = this.checkIfSnakeMovesIntoItself(newHeadPos);
    
        if (!snakeMovesIntoItself && !offBoard) {
            // add the new head to the start of the array
            snake.position.unshift(newHeadPos);
            // remove the last element from the array
            snake.position.pop();
            // return false that game is over
            return false;
        }
        // return true that game is over
        return true;
    }
    handleKeyDown = (event) => {
        const { snake, turnedThisFrame } = this.state;
        // change direction based on key input, but prevent going in the opposite direction
        var key = event.keyCode;
        // eslint-disable-next-line default-case
        switch(key) {
            // left key
            case 37:
                if (snake.direction !== availableDirections.RIGHT && !turnedThisFrame) {
                    snake.direction = availableDirections.LEFT;
                    this._isMounted && this.setState({ turnedThisFrame: true });
                }
                break;
            // up key
            case 38:
                if (snake.direction !== availableDirections.DOWN && !turnedThisFrame) {
                    snake.direction = availableDirections.UP;
                    this._isMounted && this.setState({ turnedThisFrame: true });
                }
                break;
            // right key
            case 39:
                if (snake.direction !== availableDirections.LEFT && !turnedThisFrame) {
                    snake.direction = availableDirections.RIGHT;
                    this._isMounted && this.setState({ turnedThisFrame: true });
                }
                break;
            // down key
            case 40:
                if (snake.direction !== availableDirections.UP && !turnedThisFrame) {
                    snake.direction = availableDirections.DOWN;
                    this._isMounted && this.setState({ turnedThisFrame: true });
                }
                break;
            }
    }
    toggleGameOverStyles = () => {
        // set classes to elements to show the game over screen
        let canvasElement = document.getElementById('my-canvas');
        canvasElement.classList.toggle('ongoing');
        canvasElement.classList.toggle('game-over');
        document.getElementById('game-over-container').classList.toggle('visible');
    }
    main = () => {
        const { snake } = this.state;
        // create start screen
        this.renderSnake();
        // save the context to use inside the function below
        var that = this;
        setTimeout(function() {
            that._isMounted && that.setState({ turnedThisFrame: false });
            that._isMounted && that.clearCanvas();
            // get the new position of the snake
            let gameOver = that._isMounted && that.moveSnakeIfNotGameOver(snake.direction);
            // handle various conditions before rendering
            that._isMounted && that.handleSnakeAtePellet();
            // render the snake
            that._isMounted && that.renderSnake();
            // check if game over
            if (gameOver) {
                that._isMounted && that.toggleGameOverStyles();
            } else {
                that._isMounted && that.main();
            }
        }, 100);
    }
    render() {
        const { playerPoints } = this.state;
        return(
            <div id="container">
                <div id="board">
                    <span id="heading">
                        Points: <span id="points">{playerPoints}</span>
                    </span>
                    <div id="game-over-container" className="hidden">
                        <h2>Game Over!</h2>
                        <button id="game-over-button" className="App-button" onClick={() => this.initBoard() }>Play again!</button>
                    </div>
                    <canvas ref="canvas" id="my-canvas" className="ongoing">
                        Not supported
                    </canvas>
                </div>
            </div>
        );
    }
}

export default Game;