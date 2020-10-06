import stand1 from './sprites/scoutspritesheet/stand1.png';
import walk1 from './sprites/scoutspritesheet/walk1.png';
import walk2 from './sprites/scoutspritesheet/walk2.png';
import walk3 from './sprites/scoutspritesheet/walk3.png';
import stand1flip from './sprites/scoutspritesheet/stand1flip.png';
import walk1flip from './sprites/scoutspritesheet/walk1flip.png';
import walk2flip from './sprites/scoutspritesheet/walk2flip.png';
import walk3flip from './sprites/scoutspritesheet/walk3flip.png';
import jump1 from './sprites/scoutspritesheet/jump.png';
import jump1flip from './sprites/scoutspritesheet/jumpflip.png';

var runAnimationflip = [walk2flip,walk3flip,walk2flip,walk1flip];
var runAnimation = [walk2,walk3,walk2,walk1];
var activeAnimation = runAnimationflip;
var currentAnimation = 0;
var animationBuffer = 1;
var frameCount = 0;

var walkspeed = 4;
var jumpHeight = 15;
var jumpVelocity = 0;

var direction = 0;

var xpos = 5;
var ypos = 100;
var squarewidth = 50;
var squareheight = 50;
var gravity = 0, gravitystrength = 4;
var gravitycycle = 4;

var leftspeed = 0;
var rightspeed = 0;

var totalJumps = 2;
var canjump = totalJumps;
var spriteheight = 10;
var spritewidth = 10;
function NextState(map)
{

      VerticalMovement(map);
      Gravity(map);

      ForwardMovement(map);

      var newsprite = NextSprite()


      return [newsprite,xpos,ypos]
}

 function NextSprite() {

   if(jumpVelocity != 0)
   {
      if(activeAnimation == runAnimationflip)
      {
        frameCount = 0;
        currentAnimation = 0;
        return jump1flip;
      }else{return jump1;}

   }


   if(direction == 0)
   {
     frameCount = 1;
     currentAnimation = 0;
      if(activeAnimation == runAnimationflip)
      {
        return stand1flip;
      }else{return stand1;}

   }
   else
   {
         frameCount++;

         if(frameCount > animationBuffer)
         {

           frameCount = 0;
           currentAnimation++;
           if(currentAnimation >= runAnimation.length)
           {currentAnimation = 0;}
         }

        return activeAnimation[currentAnimation];   // The function returns the product of p1 and p2
   }

}

 function ChangeDirection(direction)
 {
      if(direction == -1){activeAnimation = runAnimation;}
      else   if(direction == 1){activeAnimation = runAnimationflip;}

 }

 function ForwardMovement(map)
 {
        ChangeDirection(direction);
        console.log("direction: ",direction);
         if( map.CheckIfSpaceOpen(GetRow(),GetColumn(xpos + (direction * walkspeed))))
         {
           xpos += (walkspeed * direction);
         }else{}


         // direction = 0;

 }

 function VerticalMovement(map)
 {

          if(jumpVelocity > 0)
         {
           //check if their is a ceiling to block the verticle movement
           if(3 <= map.GetSquareValue(GetRow(ypos + jumpVelocity),GetColumn()))
           {
             if(GetRow(ypos + jumpVelocity) * map.GetSquareHeight() - ypos > 2)
             {
             }else{   }
             ypos =  GetRow(ypos + jumpVelocity) * map.GetSquareHeight() - 1;

             jumpVelocity = -1;
           }
           else
           {
             // if(jumpVelocity > 1)
             // {ypos += 5; }
             // else{ ypos += 3;}
             ypos += jumpVelocity;
             jumpVelocity--;
             if(jumpVelocity == 0){jumpVelocity = -1;}
           }

        }
         else   if(jumpVelocity < 0)
         {
           //do player logic from a zero start state for easier visible math

           // if( map.CheckIfSpaceOpen(GetRow(ypos - 4),GetColumn()) == true)
           // {jumpVelocity -= gravity;}
           //
           // if(jumpVelocity < -1)
           // {ypos -= 5; }
           // else if(jumpVelocity < -1){ ypos -= 3;}
           if(2 <= map.GetSquareValue(GetRow(ypos + jumpVelocity),GetColumn()))
           {
             if(GetRow(ypos) * map.GetSquareHeight() - ypos > 2)
             {

             }else{   }
             ypos =  GetRow(ypos) * map.GetSquareHeight();

             jumpVelocity = 0;
           }
           else
           {
             // if(jumpVelocity > 1)
             // {ypos += 5; }
             // else{ ypos += 3;}
             ypos += jumpVelocity;
             jumpVelocity--;
           }

           // if(map.GetSquareValue(GetRow(ypos),GetColumn()) != map.GetSquareValue(GetRow(ypos - gravity),GetColumn()))
           // {
           //
           //   if(1 < map.GetSquareValue(GetRow(ypos - gravity),GetColumn()))
           //   {
           //
           //     if(jumpVelocity < -1)
           //     {ypos -= 5; }
           //     else if(jumpVelocity < -1){ ypos -= 3;}
           //     else{}
           //   }
           //
           // }
           // else
           // {
           //   if(2 < map.GetSquareValue(GetRow(ypos - gravity),GetColumn()))
           //   {
           //     if(jumpVelocity < -1)
           //     {ypos -= 5; }
           //     else if(jumpVelocity < -1){ ypos -= 3;}
           //     else{}
           //   }
           //
           // }






           // if(ypos < 0){ypos = 0;}
           console.log(GetRow(),GetColumn());
           // console.log(GetColumn());

         }else
         {
           if(2 > map.GetSquareValue(GetRow(ypos - 1),GetColumn()))
           {

             jumpVelocity = -5;
           }else{canjump = totalJumps;}

         }


 }


 function Gravity(map)
 {

   // gravity++;
   // if(gravity >= gravitycycle)
   // {
   //   gravity = 0;
   //   if(jumpVelocity > 0)
   //   {
   //     jumpVelocity -= gravitystrength;
   //
   //   }
   //   else
   //   {
   //     if(map.GetSquareValue(GetRow(ypos - 5),GetColumn()) < 2)
   //     {
   //       jumpVelocity -= gravitystrength;
   //
   //     }else{canjump = totalJumps;}
   //
   //   }
   //
   //
   // }

   // if(jumpVelocity > 0)
   // {
   //       //hitting a ceiling that you cant jump through
   //       if(GetRow(ypos) != GetRow(ypos - jumpVelocity))
   //       {
   //           if(2 < map.GetSquareValue(GetRow(ypos + jumpVelocity),GetColumn()))
   //           {
   //             jumpVelocity = 0;
   //           }
   //
   //       }
   //       else{jumpVelocity --;}
   //
   //
   //
   //
   // }
   // else if (jumpVelocity < 0)
   // {
   //
   //    if(GetRow(ypos) != GetRow(ypos - jumpVelocity))
   //    {
   //      if(3 == map.GetSquareValue(GetRow(ypos + jumpVelocity),GetColumn()) || 1 == map.GetSquareValue(GetRow(ypos),GetColumn()))
   //      {
   //        jumpVelocity = (GetRow(ypos + jumpVelocity) * map.GetSquareHeight()) - ypos;
   //      }
   //    }
   //
   // }
   //
   // //check if the player is crossing two rows, and if so check if there is a floor
   // if(GetRow(ypos) != GetRow(ypos - gravity))
   // {
   //   if(map.GetSquareValue(GetRow(ypos - gravity),GetColumn()) > 1)
   //   {
   //     //get the distance left to the floor
   //     jumpVelocity = ypos - (GetRow(ypos) * map.GetSquareHeight() ) + 1;
   //   }
   //   else
   //   {
   //
   //     jumpVelocity -= gravity;
   //   }
   // }
   // else
   // {
   //
   //   if(map.CheckIfSpaceOpen(GetRow(ypos ),GetColumn()) == true)
   //   {jumpVelocity -= gravity;}
   //   else{jumpVelocity = 0;}
   //
   // }
   //
   // if(jumpVelocity == 0){canjump = totalJumps;}

 }







function Jump()
{
  if(canjump > 0)
  {
      canjump -= 1;
      jumpVelocity = jumpHeight;

  }

}


function SetLeftSpeed(newlleftspeed)
{
  leftspeed = newlleftspeed;
  SetMoveDirection();
}
function SetRightSpeed(newlrightspeed)
{
  rightspeed = newlrightspeed;
  SetMoveDirection();
}

function SetMoveDirection(newdir)
{

  direction = -leftspeed + rightspeed;

}

function GetRow(newpos)
{
  if (newpos == undefined){newpos = ypos;}
return Math.floor(newpos / squareheight);
}

function GetColumn(newpos)
{
  if (newpos == undefined){newpos = xpos;}
return Math.floor(newpos / squarewidth);
}


console.log(NextSprite());

 export default {
NextSprite,ChangeDirection,Jump,NextState,SetMoveDirection,SetRightSpeed,SetLeftSpeed
};

// import React from 'react';
// import logo from './logo.svg';
// import './App.css';
// import stand1 from './sprites/scoutspritesheet/stand1.png';
// import walk1 from './sprites/scoutspritesheet/walk1.png';
// import walk2 from './sprites/scoutspritesheet/walk2.png';
// import walk3 from './sprites/scoutspritesheet/walk3.png';
// // import player from "./player.js";
// import playerSprite from './sprites/scoutspritesheet/stand1.png';
// var xpos = 0
// var runAnimation = [stand1,walk1,walk2,walk3];
// var currentAnimation = 0;
