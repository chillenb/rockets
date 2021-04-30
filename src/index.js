import "./styles.css";
import { vec2, glMatrix } from 'gl-matrix';
import { sourceConfiguration, movingBody, backgroundMap} from './physics.js';
import { makeKeyDownHandler, makeKeyUpHandler } from './keys.js';
import RocketIcon from './rocket-opt.svg';



 const gamewindow = document.getElementById('gamewindow');
 const ctx = gamewindow.getContext('2d');

 var width = 800; // gamewindow.clientWidth;
 var height = 600; // gamewindow.clientHeight;

 gamewindow.setAttribute("width", width);
 gamewindow.setAttribute("height", height);
 ctx.fillStyle = 'white';
 ctx.height = height;
 ctx.width = width;
 //ctx.filter = 'blur(4px)';

 glMatrix.setMatrixArrayType(Array);

;
 var demo_source_config = new sourceConfiguration(
   [vec2.fromValues(-1,-1), vec2.fromValues(1,-1), vec2.fromValues(-1,1), vec2.fromValues(1,1), vec2.fromValues(0,0)],
    [2, -1, -1, 2, -0.5]);
 //console.log(demo_source_config.calc_accvec(vec2.fromValues(1,0)));

 var demo_map = new backgroundMap(demo_source_config.points,
    ["yellow", "red", "red", "yellow", "gray"], [10, 10, 10, 10, 30]);
 
 var demo_movingbody = new movingBody(vec2.fromValues(0,3), vec2.fromValues(0,0));
 
 var globalKeyState = {
   w_down: false,
   a_down: false,
   s_down: false,
   d_down: false
 };


class exampleGame {
  constructor(sourceconfig, body, gamewindow) {
    this.sourceconfig = sourceconfig;
    this.body = body;
    this.ctx = gamewindow.getContext('2d');
    this.width = gamewindow.clientWidth;
    this.height = gamewindow.clientHeight;
    this.rocketIcon = new Image();
    this.rocketIcon.src = RocketIcon;
  }
  update() {
    const timestepSize = 0.00001;
    const numTimeSteps = 4000;
    this.body.long_update(this.sourceconfig, globalKeyState, timestepSize, numTimeSteps);
  }

  draw() { // Render current state of the game
    const scale = 60; // Convert distance to pixels
    const posx = this.body.pos[0] * scale; // Current x and y coordinates
    const posy = this.body.pos[1] * scale;

    //console.log(height, width);
    this.ctx.fillStyle = 'black';
    this.ctx.fillRect(0, 0, this.width, this.height);
    
    // Draw fixed map objects
    var numObjects = demo_map.mapObjects.length;
    for(var i = 0; i < numObjects; i++) {
      let mapObject = demo_map.mapObjects[i];
      this.ctx.fillStyle = mapObject.color;
      this.ctx.beginPath();
      this.ctx.arc(width / 2 + mapObject.point[0]*scale - posx, height / 2 -mapObject.point[1]*scale + posy,
        mapObject.radius, 0, 2 * Math.PI, true);
      this.ctx.fill();
    }

    // Draw rocket icon in correct orientation
    this.ctx.save();
    this.ctx.translate(width / 2, height / 2);
    var angle = vec2.angle(vec2.fromValues(0, 1), this.body.vel);
    if (this.body.vel[0] < 0) {
      angle = -angle;
    }
    this.ctx.rotate(angle);
    this.ctx.drawImage(this.rocketIcon, -this.rocketIcon.width / 2, -this.rocketIcon.height / 2);
    this.ctx.restore();
  }



  mainloop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => { this.mainloop() });
  }
}
document.addEventListener('keydown', makeKeyDownHandler(globalKeyState), false);
document.addEventListener('keyup', makeKeyUpHandler(globalKeyState), false);


var game = new exampleGame(demo_source_config, demo_movingbody, gamewindow);
requestAnimationFrame(() => { game.mainloop() });