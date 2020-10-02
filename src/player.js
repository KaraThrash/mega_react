import stand1 from './sprites/scoutspritesheet/stand1.png';
import walk1 from './sprites/scoutspritesheet/walk1.png';
import walk2 from './sprites/scoutspritesheet/walk2.png';
import walk3 from './sprites/scoutspritesheet/walk3.png';
import stand1flip from './sprites/scoutspritesheet/stand1flip.png';
import walk1flip from './sprites/scoutspritesheet/walk1flip.png';
import walk2flip from './sprites/scoutspritesheet/walk2flip.png';
import walk3flip from './sprites/scoutspritesheet/walk3flip.png';
var runAnimationflip = [walk2flip,walk3flip,walk2flip,walk1flip];
var runAnimation = [walk2,walk3,walk2,walk1];
var activeAnimation = runAnimationflip;
var currentAnimation = 0;
var animationBuffer = 1;
var frameCount = 0;

var walkspeed = 5;
var jumpHeight = 50;
var jumpVelocity = 0;

var direction = 1;

var xpos = 5;
var ypos = 100;
var squarewidth = 40;
var squareheight = 40;

function NextState(map)
{

      VerticalMovement(map);
      Gravity();

      ForwardMovement(map);

      var newsprite = NextSprite()


      return [newsprite,xpos,ypos]
}

 function NextSprite() {


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

 function ChangeDirection(direction)
 {
      if(direction == -1){activeAnimation = runAnimation;}else{activeAnimation = runAnimationflip;}

 }

 function ForwardMovement(map)
 {
ChangeDirection(direction);
         if( map.CheckIfSpaceOpen(GetRow(),GetColumn(xpos + (direction * 5))))
         {
           xpos += (walkspeed * direction);
         }else{}




 }

 function VerticalMovement(map)
 {

          if(jumpVelocity > 0)
         {
           //check if their is a ceiling to block the verticle movement
           // if(ypos > map.CheckIfSpaceOpen(GetRow(ypos + 3),GetColumn()))
           // {jumpVelocity = 0;}
           // else
           // {
           //       if(jumpVelocity > 1)
           //       {ypos += 5; }
           //       else{ ypos += 3;}
           // }
           if(jumpVelocity > 1)
           {ypos += 5; }
           else{ ypos += 3;}
        }
         else
         {
           //do player logic from a zero start state for easier visible math

           if( map.CheckIfSpaceOpen(GetRow(ypos - 4),GetColumn()))
           {ypos -= 4;}
           //
           // if(ypos > 0){
           //
           //   ypos -= 4;
           //
           // }
           // if(ypos < 0){ypos = 0;}
           console.log(GetRow(),GetColumn());
           // console.log(GetColumn());

         }


 }


 function Gravity()
 {
       if(jumpVelocity > 0)
       {jumpVelocity -= 5;}



 }

function Jump()
{
      jumpVelocity = jumpHeight;

}


function SetMoveDirection(newdir)
{
    direction = newdir;

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
NextSprite,ChangeDirection,Jump,NextState,SetMoveDirection
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
