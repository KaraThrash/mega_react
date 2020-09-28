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

var jumpHeight = 5;
var jumpVelocity = 0;

var xpos = 0;
var ypos = 0;

function NextState()
{
VerticalMovement();
  var newsprite = NextSprite()
  return [newsprite,xpos,ypos]
}

 function NextSprite() {


   frameCount++;
   if(frameCount > animationBuffer)
   {

     Gravity();
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

 function VerticalMovement()
 {
   if(jumpVelocity > 1)
   {ypos -= 5; }
   else if(jumpVelocity > 0)
   {ypos -= 3; }
   else
   {
     if(ypos < 0){ypos += 4;}

   }


 }
 function Gravity()
 {
   if(jumpVelocity > 0)
   {jumpVelocity -= 1;}



 }

function Jump()
{
    jumpVelocity = jumpHeight;

}

console.log(NextSprite());
 export default {
NextSprite,ChangeDirection,Jump,NextState
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
