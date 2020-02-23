import React from 'react';
import Sketch from 'react-p5';

class TitleCanvas extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      // to store the location of the text
      points: [],
      // to store the font used
      font: null
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
  }

  draw = (p5) => {
    const { points } = this.state;
    // set background and text color
    p5.background('#282C35');
    let baseDotColor;
    // drawing circles for each point on the text
    for (let i = 0; i < points.length; i++) {
      // somewhat "randomizing" the colors of the dots
      let date = new Date();
      let seconds = date.getSeconds();
      if (i % seconds === 0) {
        baseDotColor = '#FFFFFF';
      }
      else {
        baseDotColor = '#62AEFC';
      }

      // draw the dots
      let p = points[i];
      p5.fill(baseDotColor);
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