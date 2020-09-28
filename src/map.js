import bluesquare from './sprites/scoutspritesheet/bluesquare.png';
import blacksquare from './sprites/scoutspritesheet/blackcube.png';
import bluewall from './sprites/scoutspritesheet/bluewall0.png';
import bluewall1 from './sprites/scoutspritesheet/bluewall1.png';
import bluefloor from './sprites/scoutspritesheet/bluefloor.png';
import bluewallfloor from './sprites/scoutspritesheet/bluewallfloor.png';
import bluewallfloor1 from './sprites/scoutspritesheet/bluewallfloor1.png';


import walk3 from './sprites/scoutspritesheet/walk3.png';
import stand1flip from './sprites/scoutspritesheet/stand1flip.png';
import walk1flip from './sprites/scoutspritesheet/walk1flip.png';
import walk2flip from './sprites/scoutspritesheet/walk2flip.png';
import walk3flip from './sprites/scoutspritesheet/walk3flip.png';
 var currentmap0 = [bluefloor,bluefloor,bluefloor,bluefloor,bluesquare,bluefloor,bluefloor,bluefloor,bluesquare,bluefloor,bluefloor,bluefloor,bluesquare,bluefloor,bluefloor,bluesquare];
var currentmap1 = [bluefloor,bluesquare,bluesquare];
var currentmap2 = [bluefloor,bluefloor,bluefloor];
var currentmap3 = [bluesquare,bluefloor,bluesquare];
var currentmap4 = [bluewallfloor,bluewallfloor,bluewall1,bluewall1];
var currentmap5 = [bluefloor,bluefloor,bluefloor,bluewallfloor,bluefloor];

var level0walls = [bluefloor,bluesquare,bluefloor,bluefloor,bluesquare,bluefloor,bluefloor,bluesquare,bluefloor]
var level1walls = [bluefloor,blacksquare,bluefloor,blacksquare,blacksquare,bluefloor,bluefloor,bluesquare,bluefloor]
var level0floors = [bluefloor,bluesquare,bluefloor,bluefloor,bluesquare,bluefloor,bluefloor,bluesquare,bluefloor]
var level1floors = [bluefloor,blacksquare,bluefloor,blacksquare,blacksquare,bluefloor,bluefloor,bluesquare,bluefloor]

export default class Map
{


  constructor() {
      this.currentmap0 = currentmap0;
    }

      MoveMap = function()
    {
          if(this.currentmap0.length == 0){this.currentmap0 = currentmap0;}
         var newmap = [];

        for (var i = 1; i < this.currentmap0.length ; i++)
        {
          // currentmap0[i] = currentmap0[i + 1];
          newmap.push(this.currentmap0[i ])
          // newmap[i] = currentmap0[i - 1]
        }
        newmap.push(this.currentmap0[0 ])
          this.currentmap0 = newmap;
    }


     GetMap = function(oldmap)
    {
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
      return   this.currentmap0;


    }

    CheckIfSpaceOpen = function()
   {
     if(this.currentmap0[1] == bluesquare){return false;}
     else{return true;}


   }

}


// export default {
// Map
// };
