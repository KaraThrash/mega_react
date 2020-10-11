import stand1 from "./sprites/scoutspritesheet/stand1.png";
import stand1flip from "./sprites/scoutspritesheet/stand1flip.png";
import stand1gun from "./sprites/scoutspritesheet/stand1gun.png";
import stand1gunflip from "./sprites/scoutspritesheet/stand1gunflip.png";

import walk1 from "./sprites/scoutspritesheet/walk1.png";
import walk2 from "./sprites/scoutspritesheet/walk2.png";
import walk3 from "./sprites/scoutspritesheet/walk3.png";
import walk1flip from "./sprites/scoutspritesheet/walk1flip.png";
import walk2flip from "./sprites/scoutspritesheet/walk2flip.png";
import walk3flip from "./sprites/scoutspritesheet/walk3flip.png";
import walk1gun from "./sprites/scoutspritesheet/walk1gun.png";
import walk2gun from "./sprites/scoutspritesheet/walk2gun.png";
import walk3gun from "./sprites/scoutspritesheet/walk3gun.png";
import walk1gunflip from "./sprites/scoutspritesheet/walk1gunflip.png";
import walk2gunflip from "./sprites/scoutspritesheet/walk2gunflip.png";
import walk3gunflip from "./sprites/scoutspritesheet/walk3gunflip.png";

import jump1 from "./sprites/scoutspritesheet/jump1.png";
import jump1flip from "./sprites/scoutspritesheet/jump1flip.png";
import jumpgun from "./sprites/scoutspritesheet/jumpgun.png";
import jumpgunflip from "./sprites/scoutspritesheet/jumpgunflip.png";

import bullet from "./sprites/bullet3.png";
import bullet1 from "./sprites/bullet1.png";
import blacksquare from "./sprites/scoutspritesheet/blackcube.png";

var runAnimationflip = [walk2flip, walk3flip, walk2flip, walk1flip];
var runAnimation = [walk2, walk3, walk2, walk1];
var rungunAnimationflip = [
  walk2gunflip,
  walk3gunflip,
  walk2gunflip,
  walk1gunflip,
];

var rungunAnimation = [walk2gun, walk3gun, walk2gun, walk1gun];
var activeAnimation = runAnimationflip;

var currentAnimation = 0,
  animationBuffer = 7,
  frameCount = 0;

var currentshootframes = 0,
  shootframes = 100;

SpriteFrameTime();
function SpriteFrameTime() {
  frameCount++;
  currentshootframes--;
  if (frameCount > animationBuffer) {
    frameCount = 0;
    currentAnimation++;
  }
  setTimeout(SpriteFrameTime, 10);
}

function NextSprite(jumpVelocity, direction) {
  if (jumpVelocity != 0) {
    if (activeAnimation == runAnimationflip) {
      frameCount = 0;
      currentAnimation = 0;
    }
    if (currentshootframes > 0) {
      return activeAnimation != runAnimationflip ? jumpgun : jumpgunflip;
    } else {
      return activeAnimation != runAnimationflip ? jump1 : jump1flip;
    }
  }

  if (direction == 0) {
    frameCount = 1;
    currentAnimation = 0;
    if (activeAnimation != runAnimationflip) {
      return currentshootframes > 0 ? stand1gun : stand1;
    } else {
      return currentshootframes > 0 ? stand1gunflip : stand1flip;
    }
  } else {
    if (currentAnimation >= activeAnimation.length) {
      currentAnimation = 0;
    }
    if (direction == -1) {
      return currentshootframes > 0
        ? rungunAnimation[currentAnimation]
        : runAnimation[currentAnimation];
    } else {
      return currentshootframes > 0
        ? rungunAnimationflip[currentAnimation]
        : runAnimationflip[currentAnimation];
    }
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

function PlayerShoots() {
  //linger on the shoot animation
  currentshootframes = shootframes;
}

function GetBulletSprite(spritevalue) {
  if (spritevalue === 0) {
    return blacksquare;
  }
  if (spritevalue === 1) {
    return bullet;
  }
  if (spritevalue === 2) {
    return bullet;
  }
  if (spritevalue === 3) {
    return bullet;
  }
  return bullet;
}

export default {
  NextSprite,
  ChangeDirection,
  GetBulletSprite,
  PlayerShoots,
};
