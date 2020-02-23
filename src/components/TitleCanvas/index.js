import React from 'react';
import Sketch from 'react-p5';

class TitleCanvas extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      points: [], // to store the location of the text
      font: null // to store the font used
    }
  }

  preload = (p5) => {
    // loading a font to be able to convert text to points
    let myfont = p5.loadFont('assets/Roboto-Regular.ttf');
    this.setState({ font: myfont });
  }
  
  setup = (p5, canvasParentRef) => {
    const { font } = this.state;
    p5.createCanvas(600, 400).parent(canvasParentRef);
    // convert the text to points (x, y)
    let txtPoints = font.textToPoints("Snake", 20, 260, 200, {});
    this.setState({ points: txtPoints });
    console.log(this.state);
  }

  draw = (p5) => {
    const { points } = this.state;
    // set background and text color
    p5.background('#C3DAE6');
    p5.fill('#CC845E');
    // drawing circles for each point on the text
    for (let i = 0; i < points.length; i++) {
      let p = points[i];
      p5.circle(p.x, p.y, 7);
    }
  }

  render() {
    return (
      <Sketch setup={this.setup} draw={this.draw} preload={this.preload} />
    );
  }
}

export default TitleCanvas;