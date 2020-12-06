import _ from 'lodash';
import "./styles.css";
 
 function component() {
   const element = document.createElement('div');
  const btn = document.createElement('button');
 
   element.innerHTML = _.join(['Hello', 'webpack'], ' ');
 
  btn.innerHTML = 'Click me and check the console!';

  element.appendChild(btn);

   return element;
 }

 const gamewindow = document.getElementById('gamewindow');
 const ctx = gamewindow.getContext('2d');

 var width = gamewindow.clientWidth;
 var height = gamewindow.clientHeight;

 gamewindow.setAttribute("width", width);
 gamewindow.setAttribute("height", height);
 ctx.fillStyle = 'white';
 //ctx.filter = 'blur(4px)';


 ctx.beginPath();
 ctx.arc(width/2,height/2,30,0,2*Math.PI,true);
 ctx.fill();

