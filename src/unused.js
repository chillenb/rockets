function drawCoordinates(pos, width, height, color){
    var pointSize = 3; // Change according to the size of the point.
    var scale = 60;
  
    ctx.fillStyle = color; 
  
    ctx.beginPath(); //Start path
    ctx.arc(width/2 + pos[0]*scale, height/2 - pos[1]*scale, pointSize, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
  }
  ctx.beginPath();
  ctx.arc(width/2,height/2,30,0,2*Math.PI,true);
  ctx.fill()

  function draw() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,width,height);
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(width/2,height/2,30,0,2*Math.PI,true);
    ctx.fill();
    ctx.beginPath(); //Start path
    const scale = 60;
    ctx.arc(width/2 + demo_movingbody.pos[0]*scale, height/2 - demo_movingbody.pos[1]*scale, 3, 0, Math.PI * 2, true); // Draw a point using the arc function of the canvas with a point structure.
    ctx.fill(); // Close the path and fill.
  }