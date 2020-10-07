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
import SpriteSheet from "./SpriteSheet.js" ;
var runAnimationflip = [walk2flip,walk3flip,walk2flip,walk1flip];
var runAnimation = [walk2,walk3,walk2,walk1];
var activeAnimation = runAnimationflip;

var currentAnimation = 0, animationBuffer = 7, frameCount = 0;

var leftspeed = 0, rightspeed = 0, direction = 0;
var walkspeed = 2, jumpspeed = 4;
var jumpHeight = 5;
var jumpVelocity = 0;

var totalJumps = 2;
var canjump = totalJumps;


var xpos = 5;
var ypos = 100;
var squarewidth = 50;
var squareheight = 50;
var gravity = 0, gravitystrength = 4, gravitycycle = 6;





var spriteheight = 20;
var spritewidth = 10;

function NextState(map)
{

      VerticalMovement(map);

      ForwardMovement(map);

      var newsprite = SpriteSheet.NextSprite(jumpVelocity,direction);


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



 function ForwardMovement(map)
 {
        SpriteSheet.ChangeDirection(direction);
        console.log("direction: ",direction);
         if( map.CheckIfSpaceOpen(GetRow(),GetColumn(xpos + (direction * spritewidth) + (direction * walkspeed))))
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
           if(3 <= map.GetSquareValue(GetRow(ypos + spriteheight + jumpVelocity),GetColumn()))
           {

             ypos =  GetRow(ypos + spriteheight + jumpVelocity) * map.GetSquareHeight() - spriteheight;

             jumpVelocity = -1;
           }
           else
           {
             // if(jumpVelocity > 1)
             // {ypos += 5; }
             // else{ ypos += 3;}
             ypos += jumpVelocity;
             jumpVelocity -= Gravity();
             if(jumpVelocity == 0){jumpVelocity = -1;}
           }

        }
         else   if(jumpVelocity < 0)
         {
           //do player logic from a zero start state for easier visible math

          //if passing to another square, land on platforms, but if already in a platform square, pass through it
           if(GetRow(ypos) != GetRow(ypos + jumpVelocity))
           {

                 if(2 <= map.GetSquareValue(GetRow(ypos + jumpVelocity),GetColumn()))
                 {

                   ypos =  GetRow(ypos) * map.GetSquareHeight();

                   jumpVelocity = 0;
                 }
                 else
                 {
                   ypos += jumpVelocity;
                   //never skip over a square
                   if(jumpVelocity > - map.GetSquareHeight() + 1)
                   {jumpVelocity -= Gravity();}

                 }

           }

           else
           {

             ypos += jumpVelocity;
             //never skip over a square
             if(jumpVelocity > - map.GetSquareHeight() + 1)
             {
               jumpVelocity -= Gravity();

             }

           }



         }else
         {

               if(2 > map.GetSquareValue(GetRow(ypos - 1),GetColumn()))
               {

                 jumpVelocity = -2;
                 //falling takes a jump
                 canjump --;
                 gravity = 0;
               }else{canjump = totalJumps;}

         }


 }


 function Gravity()
 {

   gravity++;
   if(gravity >= gravitycycle)
   {
     gravity = 0;
     return 1;
   }
   else{return 0;}


 }







function Jump()
{
  if(canjump > 0)
  {
      gravity = 0;
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



 export default {
NextSprite,Jump,NextState,SetMoveDirection,SetRightSpeed,SetLeftSpeed
};
