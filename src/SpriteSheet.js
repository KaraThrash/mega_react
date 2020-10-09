import stand1 from "./sprites/scoutspritesheet/stand1.png";
import walk1 from "./sprites/scoutspritesheet/walk1.png";
import walk2 from "./sprites/scoutspritesheet/walk2.png";
import walk3 from "./sprites/scoutspritesheet/walk3.png";
import stand1flip from "./sprites/scoutspritesheet/stand1flip.png";
import walk1flip from "./sprites/scoutspritesheet/walk1flip.png";
import walk2flip from "./sprites/scoutspritesheet/walk2flip.png";
import walk3flip from "./sprites/scoutspritesheet/walk3flip.png";
import jump1 from "./sprites/scoutspritesheet/jump.png";
import jump1flip from "./sprites/scoutspritesheet/jumpflip.png";

import bullet from "./sprites/bullet.png";
import bullet1 from "./sprites/bullet1.png";
import blacksquare from './sprites/scoutspritesheet/blackcube.png';

var runAnimationflip = [walk2flip, walk3flip, walk2flip, walk1flip];
var runAnimation = [walk2, walk3, walk2, walk1];
var activeAnimation = runAnimationflip;

var currentAnimation = 0,
  animationBuffer = 7,
  frameCount = 0;

function NextSprite(jumpVelocity, direction) {
  if (jumpVelocity != 0) {
    if (activeAnimation == runAnimationflip) {
      frameCount = 0;
      currentAnimation = 0;
      return jump1flip;
    } else {
      return jump1;
    }
  }

  if (direction == 0) {
    frameCount = 1;
    currentAnimation = 0;
    if (activeAnimation == runAnimationflip) {
      return stand1flip;
    } else {
      return stand1;
    }
  } else {
    frameCount++;

    if (frameCount > animationBuffer) {
      frameCount = 0;
      currentAnimation++;
      if (currentAnimation >= runAnimation.length) {
        currentAnimation = 0;
      }
    }

    return activeAnimation[currentAnimation]; // The function returns the product of p1 and p2
  }
}

function ChangeDirection(direction) {
  if (direction == -1) {
    if (activeAnimation != runAnimation) {
      frameCount = 0;
      currentAnimation = 0;
    }
    activeAnimation = runAnimation;
  } else if (direction == 1) {
    if (activeAnimation != runAnimationflip) {
      frameCount = 0;
      currentAnimation = 0;
    }
    activeAnimation = runAnimationflip;
  }
}


function GetBulletSprite (spritevalue)
{
  if(spritevalue === 0)
  {return blacksquare;}
  if(spritevalue === 1)
  {return bullet;}
  if(spritevalue === 2)
  {return bullet;}
  if(spritevalue === 3)
  {return bullet;}
  return bullet;
}

export default {
  NextSprite,
  ChangeDirection,
  GetBulletSprite
};
