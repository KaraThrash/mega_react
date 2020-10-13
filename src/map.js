import bluesquare from "./sprites/scoutspritesheet/bluesquare.png";
import blacksquare from "./sprites/scoutspritesheet/blackcube.png";
import graysquare from "./sprites/scoutspritesheet/blackcube.png";
import brownsquare from "./sprites/scoutspritesheet/brownbox.png";
import redxsquare from "./sprites/scoutspritesheet/redxsquare.png";
import bluewall from "./sprites/scoutspritesheet/bluewall0.png";
import bluewall1 from "./sprites/scoutspritesheet/bluewall1.png";
import bluefloor from "./sprites/scoutspritesheet/bluefloor.png";
import blueceiling from "./sprites/scoutspritesheet/blueceiling.png";
import bluewallfloor from "./sprites/scoutspritesheet/bluewallfloor.png";
import bluewallfloor1 from "./sprites/scoutspritesheet/bluewallfloor1.png";
import alienpurple from "./sprites/AlienPurple0.png";
import alienpurple1 from "./sprites/AlienPurple1.png";
import SpriteSheet from "./SpriteSheet.js";

var bullets = [],
  enemies = [
    [159, 1, 191, 1, 1111, 6, 5],
    [59, 1, 21, 0, 1111, 6, 5],
    [59, 1, 21, -1, 1111, 6, 5],
    [59, 1, 21, 0, 1111, 6, 5],
    [509, 1, 121, 0, 1111, 6, 5],
  ];

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
var solidfloor = [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3];
var randomsquares = [0, 0, 0, 0, 2, 2, 2, 2, 3];
var maparray = [
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
  [0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 5, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 3, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 0, 0, 0, 0, 2, 2, 2, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 2, 0, 0, 0, 0, 3, 0, 0, 0, 0, 2, 0, 0, 0, 0, 2, 0, 0],
  [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
];

export default class Map {
  constructor() {
    this.currentmap0 = [];
    this.currentmap0.push(solidfloor);
    while (this.currentmap0.length - 1 < maparray.length) {
      var templist2 = [];
      while (templist2.length < solidfloor.length) {
        templist2.push(randomsquares[this.getRndInteger(0, 8)]);
      }
      this.currentmap0.push(templist2);
    }
    this.currentmap0.push(solidfloor);
    // this.currentmap0 = templist;
    this.squarewidth = 50;
    this.squareheight = 50;
    this.bullets = bullets;
    this.enemies = enemies;
  }

  UpdateEnemies = function (player) {
    var count = this.enemies.length;
    var newenemylist = [];
    var projectilearray = this.enemies;
    var el;
    var newsprite = 7;
    let animationcount = 0;
    while (count > 0) {
      count--;
      el = this.enemies.pop();

      // xpos, xspeed, ypos, yspeed, lifetime,sprite,owner

      let row = Math.floor((el[2] + el[3]) / this.GetSquareHeight());
      let col = Math.floor((el[0] + el[1]) / this.GetSquareWidth());
      animationcount = el[6] - 1;
      newsprite = el[5];
      if (animationcount <= 0) {
        animationcount = 45;
        if (el[5] == 7) {
          newsprite = 6;
        } else {
          newsprite = 7;
        }
      }

      if (el[4] > 0 && this.GetSquareValue(row + 1, col) < 3) {
        el = [
          el[0] + el[1],
          el[1],
          el[2] + el[3],
          el[3],
          el[4],
          newsprite,
          animationcount,
        ];
      } else {
        var newyvel = 0;
        var newxvel = 0;

        if (player[0] <= el[0]) {
          row = Math.floor((el[2] + el[3]) / this.GetSquareHeight());
          col = Math.floor((el[0] - 1) / this.GetSquareWidth());
          if (this.GetSquareValue(row + 1, col) < 3) {
            newxvel = -1;
          } else {
            if (player[2] <= el[2]) {
              row = Math.floor((el[2] - 1) / this.GetSquareHeight());
              col = Math.floor(el[0] / this.GetSquareWidth());
              if (this.GetSquareValue(row + 1, col) < 3) {
                newyvel = -1;
              }
            } else {
              row = Math.floor((el[2] + 1) / this.GetSquareHeight());
              col = Math.floor(el[0] / this.GetSquareWidth());
              if (this.GetSquareValue(row + 1, col) < 3) {
                newyvel = 1;
              }
            }
          }
        } else {
          row = Math.floor((el[2] + el[3]) / this.GetSquareHeight());
          col = Math.floor((el[0] + 1) / this.GetSquareWidth());
          if (this.GetSquareValue(row + 1, col) < 3) {
            newxvel = 1;
          } else {
            if (player[2] <= el[2]) {
              row = Math.floor((el[2] - 1) / this.GetSquareHeight());
              col = Math.floor(el[0] / this.GetSquareWidth());
              if (this.GetSquareValue(row + 1, col) < 3) {
                newyvel = -1;
              } else {
                newxvel = 1;
              }
            } else {
              row = Math.floor((el[2] + 1) / this.GetSquareHeight());
              col = Math.floor(el[0] / this.GetSquareWidth());
              if (this.GetSquareValue(row + 1, col) < 3) {
                newyvel = 1;
              } else {
                newxvel = 1;
              }
            }
          }
        }
        if (newxvel == 0 && newyvel == 0) {
          newxvel = el[1] * -1;
          newyvel = el[3] * -1;
        }
        // el = [el[0], el[1] * -1, el[2], el[3] * -1, el[4] - 1, 7];
        el = [el[0], newxvel, el[2], newyvel, el[4], newsprite, animationcount];
      }
      var count2 = this.bullets.length - 1;
      while (count2 >= 0) {
        if (
          Math.abs(this.bullets[count2][0] - el[0]) < 15 &&
          Math.abs(this.bullets[count2][2] - el[2]) < 15
        ) {
          el = [el[0], el[1], el[2], el[3], 0, newsprite, animationcount];
        }
        count2--;
      }
      if (el[4] > 0) {
        newenemylist.push(el);
      }
    }

    //set the updated list of projectiles
    this.enemies = newenemylist;
    return newenemylist;
  };

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
          if (this.currentmap0[this.currentmap0.length - 2 - row][col] == 4) {
            this.currentmap0[this.currentmap0.length - 2 - row][col] = 0;
          }
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
  getRndInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
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
