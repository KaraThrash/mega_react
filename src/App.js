import React from "react";
import logo from "./logo.svg";
import "./App.css";
import playerSprite from "./sprites/scoutspritesheet/stand1.png";
import player from "./player.js";
import SpriteSheet from "./SpriteSheet.js";
import Map from "./map.js";
let map = new Map();

var spritewidth = 20,
  spriteheight = 70;

var timeBuffer = 1; //for controlling game speed
let xpos = 0;
let ypos = 0;
var playerState = {
  direction: 1,
  xpos: 0,
  ypos: 0,
  sprite: "./sprites/scoutspritesheet/stand1.png",
};

// ('./sprites/scoutspritesheet/stand1.png',0,0);
class Player extends React.Component {
  intervalID;
  state = {
    xpos: 1,
    ypos: 1,
    direction: 1,
  };
  componentDidMount() {
    this.movePlayer();
  }
  componentWillUnmount() {
    /*
      stop getData() from continuing to run even
      after unmounting this component. Notice we are calling
      'clearTimeout()` here rather than `clearInterval()` as
      in the previous example.
    */
    clearTimeout(this.intervalID);
  }

  movePlayer = () => {
    var newdir = this.state.direction;
    // if (this.state.xpos > window.innerWidth * 0.9){newdir = -1;player.ChangeDirection(newdir);}
    // if (this.state.xpos < window.innerWidth * 0.1){newdir = 1;player.ChangeDirection(newdir);}
    playerState = player.NextState(map);
    if (playerState[2] > 10 || map.CheckIfSpaceOpen(1, 1) == true) {
      //map.MoveMap();
    }
    this.setState({
      direction: newdir,
      xpos: playerState[1],
      ypos: playerState[2],
      sprite: playerState[0],
    });
    // call getData() again in 5 seconds
    this.intervalID = setTimeout(this.movePlayer.bind(this), 10);
  };

  render() {
    // xpos = xpos + 10;
    const divStyle = {
      color: "blue",
      position: "absolute",
      left: this.state.xpos.toString() + "px",
      top: (438 - this.state.ypos).toString() + "px",
      width: "3%",
      height: "5%",
    };

    return (
      <div>
        <img style={divStyle} src={playerState[0]} onClick={this.jump}></img>
      </div>
    );
  }
}

class MapRender extends React.Component {
  intervalID;
  state = { currentmap: [], bullets: [] };

  componentDidMount() {
    this.moveMap();
  }
  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  moveMap = () => {
    let newmap = map.GetMap(this.state.currentmap);
    let newbullets = map.UpdateProjectiles();
    this.setState({
      currentmap: newmap,
      bullets: newbullets,
    });
    this.intervalID = setTimeout(this.moveMap.bind(this), 10);
  };
  render() {
    // var currentmap = this.state.currentmap;

    var rows = [];

    let divStyle = {
      position: "absolute",
      left: "1%",
      top: "1%",
    };

    for (var j = 0; j < this.state.currentmap.length; j += 1) {
      for (var i = 0; i < this.state.currentmap[j].length; i++) {
        divStyle = {
          position: "absolute",
          left: (i * 50).toString() + "px",
          top: (j * 50).toString() + "px",
          width: "50px",
          height: "50px",
        };
        //dont need to render the black spaces
        if (this.state.currentmap[j][i] != 0) {
          rows.push(
            <img
              style={divStyle}
              src={map.SpriteSwitch(this.state.currentmap[j][i])}
            />
          );
        }
      }
    }

    return <div>{rows}</div>;
  }
}

class BulletRender extends React.Component {
  intervalID;
  state = { currentmap: [], bullets: [] };

  componentDidMount() {
    this.UpdateBullets();
  }
  componentWillUnmount() {
    clearTimeout(this.intervalID);
  }

  UpdateBullets = () => {
    let newbullets = map.UpdateProjectiles();
    this.setState({
      bullets: newbullets,
    });
    this.intervalID = setTimeout(this.UpdateBullets.bind(this), 10);
  };
  render() {
    // var currentmap = this.state.currentmap;

    var rows = [];

    let divStyle = {};

    for (var j = 0; j < this.state.bullets.length; j += 1) {
      divStyle = {
        position: "absolute",
        left: this.state.bullets[j][0].toString() + "px",
        top: (435 - this.state.bullets[j][2]).toString() + "px",
        width: "5px",
        height: "5px",
      };
      rows.push(
        <img
          style={divStyle}
          src={SpriteSheet.GetBulletSprite(this.state.bullets[j][5])}
        />
      );
    }
    return <div>{rows}</div>;
  }
}

class Controls extends React.Component {
  state = {
    xpos: "0%",
    ypos: "1%",
    width: 100,
    height: 100,
    direction: 0,
  };

  jump = (event) => {
    player.Jump();
    console.log("jump");
    console.log(event);
  };
  //
  // moveleft = (event) => {
  //   player.SetLeftSpeed(1);
  //
  // }
  //
  // moveright = (event) => {
  //   player.SetRightSpeed(1);
  //
  // }

  handleKeyPress = (event) => {
    console.log("enter press here! ", event.which);
    if (event.which == 32) {
      player.Jump();
    }
    if (event.which == 97) {
      player.SetLeftSpeed(1);
    }
    if (event.which == 100) {
      player.SetRightSpeed(1);
    }
    if (event.which == 119) {
      player.Shoot(map);
    } //w
  };
  handleKeyUp = (event) => {
    if (event.which == 65) {
      player.SetLeftSpeed(0);
    }
    if (event.which == 68) {
      player.SetRightSpeed(0);
    }
  };

  render() {
    xpos = xpos + 10;
    const divStyle = {
      position: "absolute",
      left: this.state.xpos.toString(),
      top: this.state.ypos.toString(),
      width: "99%",
      height: "90%",
      "background-color": "black",
      color: "black",
      "border-color": "black",
    };
    const leftbutton = {
      position: "absolute",
      left: "20%",
      top: "60%",
      width: "5%",
      height: "5%",
      "text-style": "bold",
      "font-size": "50%",
      "font-weight": "bold",
    };
    const rightbutton = {
      position: "absolute",
      left: "25%",
      top: "60%",
      width: "5%",
      height: "5%",
      "text-style": "bold",
      "font-size": "50%",
      "font-weight": "bold",
    };
    return (
      <div>
        <input
          style={divStyle}
          type="text"
          id="one"
          maxlength="1"
          onKeyPress={this.handleKeyPress}
          onKeyUp={this.handleKeyUp}
        />
        <button style={leftbutton} onKeyPress={this.moveright}>
          {" "}
          LEFT
        </button>
        <button style={rightbutton} onKeyPress={this.moveright}>
          {" "}
          RIGHT
        </button>
      </div>
    );
  }
}

class Dashboard extends React.Component {
  intervalID;

  state = {
    data: 1,
  };

  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    /*
         stop getData() from continuing to run even
         after unmounting this component. Notice we are calling
         'clearTimeout()` here rather than `clearInterval()` as
         in the previous example.
       */
    clearTimeout(this.intervalID);
  }

  getData = () => {
    this.setState({ data: 1 + this.state.data });
    // call getData() again in 5 seconds
    this.intervalID = setTimeout(this.getData.bind(this), 1000);
  };

  render() {
    return (
      <div>
        Our fancy dashboard lives here.
        {this.state.data}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>
          <Controls />
          <MapRender />
          <BulletRender />
          <Player />
        </div>
      </header>
    </div>
  );
}

export default App;
