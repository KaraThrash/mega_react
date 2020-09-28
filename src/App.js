import React from 'react';
import logo from './logo.svg';
import './App.css';
import playerSprite from './sprites/scoutspritesheet/stand1.png';
import player from "./player.js";
import Map from  "./map.js";
let map = new Map();
var timeBuffer = 1; //for controlling game speed
let xpos = 0;
let ypos = 0;
var playerState =   {
    direction: 1,
    xpos: 0,
    ypos: 0,
    sprite: './sprites/scoutspritesheet/stand1.png'
   }

// ('./sprites/scoutspritesheet/stand1.png',0,0);
class Player extends React.Component {
  intervalID;
  state = {
    xpos: 1,
    ypos: 1,
    direction : 1
  }
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

  jump = (event) => {
    player.Jump();
    console.log("jump");
    console.log(event);
}

handleKeyPress = (event) => {

    console.log('enter press here! ')

}
  movePlayer = () => {

    var newdir = this.state.direction;
    if (this.state.xpos > window.innerWidth * 0.9){newdir = -1;player.ChangeDirection(newdir);}
    if (this.state.xpos < window.innerWidth * 0.1){newdir = 1;player.ChangeDirection(newdir);}
     playerState =  player.NextState();
     if(playerState[2] < -10 || map.CheckIfSpaceOpen() == true )
     {
       map.MoveMap();

     }
        this.setState(
          {
            direction: newdir,
            xpos: this.state.xpos ,
            ypos: playerState[2] + 100,
            sprite: playerState[0]
           }
        );
        // call getData() again in 5 seconds
        this.intervalID = setTimeout(this.movePlayer.bind(this), 100);
  }

  render() {


    var orange = "position:absolute"
    xpos = xpos + 10;
    const divStyle = {
      color: 'blue',
      position: 'absolute',
      left: (this.state.xpos).toString() + "px",
      top:  (this.state.ypos + 135).toString() + "px",
      width:"3%",
      height:"5%"
    };

    return (

      <div >
    <img style={divStyle} src={playerState[0]} onClick={this.jump} >

    </img>
      </div>
    );
  }

}

class MapRender extends React.Component {

  intervalID;
  state = {currentmap:[]}

  componentDidMount() {
    this.moveMap();
  }
  componentWillUnmount() {

    clearTimeout(this.intervalID);
  }



  moveMap = () => {
    let newmap  = map.GetMap(this.state.currentmap);
      this.setState(
        {
          currentmap:newmap

         }
      );
        this.intervalID = setTimeout(this.moveMap.bind(this), 100);
  }
  render() {
    // var currentmap = this.state.currentmap;

    var rows = []

    let divStyle = {
      position: 'absolute',
      left: "1%",
      top:  "1%"

    };

    for (var j = 0; j < 6; j+=2)
    {
      for (var i = 0; i < this.state.currentmap.length; i++)
      {
            divStyle = {
              position: 'absolute',
              left:((i * 3.5)  ).toString() + "%",
              top:((j * 4.5) + 10  ).toString() + "%",
              width:"3%",
              height:"3%"

            };

        rows.push(<img  style={divStyle} src={this.state.currentmap[i]} /> )
      }

    }
    return (
      <div>
    {  rows}
      </div>
    );
  }



}

class Controls extends React.Component {

  state = {
    xpos: '0%',
    ypos: '1%',
    width:100,
    height:100,
    direction : 1
  }


  jump = (event) => {
    player.Jump();
    console.log("jump");
    console.log(event);
}

  handleKeyPress = (event) => {

      console.log('enter press here! ')

  }

  render() {


    var orange = "position:absolute"
    xpos = xpos + 10;
    const divStyle = {
      position: 'absolute',
      left: (this.state.xpos).toString() ,
      top:  (this.state.ypos ).toString(),
      width:'99%',
      height:'90%',
      "background-color": 'black',
      "color": 'black',
      "border-color":"black"

    };

    return (

      <div >
        <input style={divStyle} type="text" id="one" maxlength="1" onKeyPress={this.jump} />

      </div>
    );
  }

}

class Dashboard extends React.Component {
     intervalID;

     state = {
       data: 1
     }

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
     }

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
        <div >

          <Controls  />
          <MapRender  />
          <Player  />
        </div>
      </header>
    </div>
  );
}

export default App;
