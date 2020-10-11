import bluesquare from "./sprites/scoutspritesheet/bluesquare.png";
import blacksquare from "./sprites/scoutspritesheet/blackcube.png";
import bluewall from "./sprites/scoutspritesheet/bluewall0.png";
import bluewall1 from "./sprites/scoutspritesheet/bluewall1.png";
import bluefloor from "./sprites/scoutspritesheet/bluefloor.png";
import blueceiling from "./sprites/scoutspritesheet/blueceiling.png";
import bluewallfloor from "./sprites/scoutspritesheet/bluewallfloor.png";
import bluewallfloor1 from "./sprites/scoutspritesheet/bluewallfloor1.png";

import walk3 from "./sprites/scoutspritesheet/walk3.png";
import stand1flip from "./sprites/scoutspritesheet/stand1flip.png";
import walk1flip from "./sprites/scoutspritesheet/walk1flip.png";
import walk2flip from "./sprites/scoutspritesheet/walk2flip.png";
import walk3flip from "./sprites/scoutspritesheet/walk3flip.png";

var bullets = [];
//   [59, 3, 41, 0, 1111, 1],
//   [105, 1, 61, 0, 1111, 1],
//   [225, 1, 101, 0, 1115, 1],
//   [225, 1, 121, 0, 1115, 1],
//   [225, 1, 141, 0, 1115, 1],
//   [59, 3, 281, 0, 1111, 1],
//   [105, 1, 241, 0, 1111, 1],
//   [225, 1, 201, 0, 1115, 1],
//   [225, 1, 181, 0, 1115, 1],
//   [225, 1, 161, 0, 1115, 1],
//   [59, 3, 381, 0, 1111, 1],
//   [105, 1, 341, 0, 1111, 1],
//   [225, 1, 301, 0, 1115, 1],
//   [225, 1, 481, 0, 1115, 1],
//   [225, 1, 461, 0, 1115, 1],
// ]; // x,xvel,y,yvel,lifetime,sprite ?

var maparray = [
  [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 2, 2, 0, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 3, 2, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

export default class Map {
  constructor() {
    this.currentmap0 = maparray;
    this.squarewidth = 50;
    this.squareheight = 50;
    this.bullets = bullets;
  }

  UpdateProjectiles = function () {
    var count = this.bullets.length;
    var newlist = [];
    var projectilearray = this.bullets;
    var el;
    while (count > 0) {
      count--;
      el = this.bullets.pop();

      // xpos, xspeed, ypos, yspeed, lifetime,sprite,owner
      el = [el[0] + el[1], el[1], el[2] + el[3], el[3], el[4] - 1, el[5]];

      let row = Math.floor(el[2] / this.GetSquareHeight());
      let col = Math.floor(el[0] / this.GetSquareWidth());
      if (el[4] > 0 && this.GetSquareValue(row + 1, col) < 3) {
        newlist.push(el);
        // el = [el[0] + el[1],el[1], el[2] + el[3] , el[3],el[4] - 1,el[5]]
      } else {
        if (
          this.currentmap0 != undefined &&
          row < this.currentmap0.length - 2 &&
          col < this.currentmap0[this.currentmap0.length - 2 - row].length
        ) {
          this.currentmap0[this.currentmap0.length - 2 - row][col] = 0;
        }
        // console.log(Math.floor(el[2] / this.GetSquareHeight()));
        // console.log(Math.floor(el[0] / this.GetSquareWidth()));
      }
      // else{el = [-10,1,-10,0,0,0];}

      if (el[4] > -1) {
        // console.log(  el);
        // newlist.push(el);
      }
    }
    //set the updated list of projectiles
    this.bullets = newlist;

    return newlist;
  };

  GetProjectiles = function () {
    return this.bullets;
  };

  MoveMap = function () {
    //          if(this.currentmap0.length == 0){this.currentmap0 = maparray;}
    //         var newmap = [];
    // var newmap2 = [];
    //        for (var i = 0; i < this.currentmap0.length ; i++)
    //        {
    //          newmap2 = [];
    //          for (var j = 1; j < this.currentmap0[i].length ; j++)
    //          {
    //            // currentmap0[i] = currentmap0[i + 1];
    //            newmap2.push(this.currentmap0[i][j])
    //            // newmap[i] = currentmap0[i - 1]
    //          }
    //          newmap2.push(this.currentmap0[i][0])
    //          newmap.push(newmap2)
    //        }
    //        // newmap.push(this.currentmap0[0 ])
    //          this.currentmap0 = newmap;
  };

  GetMap = function (oldmap) {
    //   if(oldmap.length == 0){oldmap = currentmap0;}
    //  var newmap = [];
    //
    // for (var i = 1; i < oldmap.length ; i++)
    // {
    //   // currentmap0[i] = currentmap0[i + 1];
    //   newmap.push(oldmap[i ])
    //   // newmap[i] = currentmap0[i - 1]
    // }
    // newmap.push(oldmap[0 ])
    //   // this.currentmap0 = newmap;
    return this.currentmap0;
  };

  //  CheckIfSpaceOpen = function()
  // {
  //   if(this.currentmap0[1] == bluesquare){return false;}
  //   else{return true;}
  // }

  AddProjectile = function (newprojectile) {
    this.bullets.push(newprojectile);
    console.log(this.bullets.length);
  };

  CheckIfSpaceOpen = function (row, col) {
    if (
      row > this.currentmap0.length ||
      col >= this.currentmap0[this.currentmap0.length - row - 1].length ||
      row < 0 ||
      col < 0
    ) {
      return false;
    }
    if (this.currentmap0[this.currentmap0.length - row - 1][col] > 2) {
      return false;
    } else {
      return true;
    }
  };

  GetSquareValue = function (row, col) {
    if (this.currentmap0 == null) {
      this.currentmap0 = maparray;
    }

    if (
      row >= this.currentmap0.length ||
      this.currentmap0[this.currentmap0.length - row] == null ||
      col >= this.currentmap0[this.currentmap0.length - row - 1].length ||
      this.currentmap0[this.currentmap0.length - row][col] == null ||
      row < 0 ||
      col < 0
    ) {
      return 3;
    } else if (this.currentmap0[this.currentmap0.length - row - 1][col] > 2) {
      return 3;
    } else {
      return this.currentmap0[this.currentmap0.length - row - 1][col];
    }
  };

  SpriteSwitch = function (mapsquarevalue) {
    if (mapsquarevalue === 0) {
      return blacksquare;
    }
    if (mapsquarevalue === 1) {
      return bluefloor;
    }
    if (mapsquarevalue === 2) {
      return blueceiling;
    }
    if (mapsquarevalue === 3) {
      return bluesquare;
    }
    return blacksquare;
  };

  GetSquareHeight = function () {
    return this.squareheight;
  };

  GetSquareWidth = function () {
    return this.squarewidth;
  };
}

// export default {
// Map
// };
