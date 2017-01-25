//https://www.spriters-resource.com/resources/sheets/27/29490.png
//https://www.spriters-resource.com/resources/sheets/27/29501.png
//http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

// TODO
// snapToGrid();
// .draw number
// showGrid();

var canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 400;
var ctx = canvas.getContext("2d");

// fill(sprite(obj)(tile.w tile.h), dataTable)
// snapToGrid(click)
//OLD
var sprImg = new Image();
sprImg.src = "http://oi67.tinypic.com/210hnox.jpg";
//NEW
function Sprite2 (image,imgWidth,imgHeight,columns,rows,borderBetween,borderOutside){
  this.image = image;
  this.width = imgWidth;
  this.height = imgHeight;
  this.columns = columns || 1;
  this.rows = rows || 1;
  this.borderBetween = borderBetween || 0;
  this.borderOutside = borderOutside || 0;
  //this.totalBorderX = (borderBetween*(columns-1))+(borderOutside*2);
  
  this.tileX = (this.width-(((this.columns-1)*this.borderBetween)+this.borderOutside*2))/this.columns;
  this.tileY = (this.height-(((this.rows-1)*this.borderBetween)+this.borderOutside*2))/this.rows;
  //TODO: MOVE TO PROTOTYPE
  
  var convertNumber = function(number){
    return {
      col: 25,
      row: 6
    };
  };
  
  this.draw = function(col,row,locX,locY,number){
    if((!col || !row) && number){
      var converted = convertNumber(number);
      col = converted.col;
      row = converted.row;
    }
    locX = locX || 0;
    locY = locY || 0;
    
  ///(col*((this.width-(((col-1)*borderBetween)+borderOutside))/this.columns))-((this.width-(((col-1)*borderBetween)+borderOutside))/this.columns)
    
    ctx.drawImage(
      image,
      this.borderOutside+(this.tileX*col)+((col-1)*this.borderBetween)+1,
      this.borderOutside+(this.tileY*row)+((row-1)*this.borderBetween)+1,
      this.tileX,
      this.tileY,
      locX,
      locY,
      this.tileX,
      this.tileY
    );
  };
  
  this.animate = function(colStart,rowStart,colEnd,rowEnd,direction){
    var currentCol = colStart;
    var currentRow = rowStart;
    //loop
    this.draw(currentCol,currentRow);
    if ((currentCol === colEnd)&&(currentRow === rowEnd)){
      //end loop
    }
    
  };
  
  
}
var footmanSprite = new Image();
footmanSprite.src = "http://oi67.tinypic.com/210hnox.jpg";
var footman = new Sprite2(footmanSprite,1440,480,15,5,0,0);
//renderMap();
//renderUnits();




function s (image, spriteWidth, spriteHeight, spriteColumns, spriteRows){
  
}
var mapData = [
  ['247',246,'247',248,'247','247',246,'247',248,'247','247',246,'247',248,'247','247',246,'247',248,'247'],
  ['247',247,247,247,247,'247',247,247,247,247,'247',247,247,247,247,'247',247,247,247,247,'247',247,247,247,247],
  [247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247],
  [247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247],
  [247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247,247]
];
var mapSprite = new Image();
mapSprite.src = "http://oi64.tinypic.com/11hyotl.jpg";
var map = new Sprite2(mapSprite,1024,826,31,25,1,1);

/*function xxxsprite (options) {
  /*  var that = {},
        frameIndex = 0,
        tickCount = 0,
        ticksPerFrame = options.ticksPerFrame || 0,
        numberOfFrames = options.numberOfFrames || 1;
					
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
  
    that.render = function () {
      // Clear the canvas
      ctx.clearRect(0, 0, that.width, that.height);

        // Draw the animation
        that.context.drawImage(
           that.image,
           frameIndex * that.width / numberOfFrames,
           0,
           that.width / numberOfFrames,
           96,
           0,
           0,
           that.width / numberOfFrames,
           96);
    }; 
    that.loop = options.loop;
    that.update = function () {

        tickCount += 1;
			
        if (tickCount > ticksPerFrame) {
        
        	tickCount = 0;
          // If the current frame index is in range
          if (frameIndex < numberOfFrames - 1) {	
            // Go to the next frame
            frameIndex += 1;
          } else if (that.loop) {
                frameIndex = 0;
            }
        	
            // Go to the next frame
            //frameIndex += 1; 
        }
    }; 

    return that;
}

/*var spr = sprite({
  context: canvas.getContext("2d"),
  width: 1440,
  height: 480,
  image: sprImg,
  numberOfFrames: 15,
  ticksPerFrame: 10,
  loop: true
});*/

//spr.render();

/*function gameLoop () {

  window.requestAnimationFrame(gameLoop);
  
  //spr.update();
  //spr.render();
}

// Start the game loop as soon as the sprite sheet is loaded
sprImg.addEventListener("load", gameLoop);*/

var aaaa = 0;
///////////////////
function draw222 (sprite, dataTable){
  var tw = canvas.width/sprite.columns;
  var th = canvas.height/sprite.rows;
  
  for(var x=0; x<sprite.columns; x++){
    for(var y=0; y<sprite.rows; y++){
      if(aaaa%2 === 0){
        sprite.draw(11, 17, x*32, y*32, null);
        aaaa++;
        //sprite.draw(x*tw, y*th, tw, th, null);
      } else {
        sprite.draw(11, 18, x*32, y*32, null);
        aaaa++;
      }
    }
  }
}

draw222(map, mapData);


map.draw(3,1,-10,248);
map.draw(2,1,24,248);
map.draw(3,1,56,248);
map.draw(2,1,88,248);
map.draw(4,4,120,248);
map.draw(1,2,120,216);
map.draw(1,3,120,184);
map.draw(1,2,120,152);
map.draw(1,1,120,120);
map.draw(2,1,152,120);
map.draw(3,1,184,120);
map.draw(2,1,216,120);
map.draw(4,4,248,120);
map.draw(1,3,248,88);
map.draw(1,2,248,56);
map.draw(1,3,248,24);
map.draw(1,2,248,-10);

map.draw(17,12,64,0);
map.draw(17,13,64,32);
map.draw(16,12,32,0);
map.draw(16,12,32,32);
map.draw(17,13,32,64);
map.draw(16,12,0,0);
map.draw(16,12,0,32);
map.draw(16,13,0,64);

map.draw(1,17,288,0);
map.draw(1,17,288,32);
map.draw(1,20,288,64);
map.draw(2,20,320,64);
map.draw(2,20,352,64);
map.draw(2,20,384,64);

footman.draw(0,1,250,250);
footman.draw(4,2,50,250);
footman.draw(12,2,32*6,64);
footman.draw(10,2,32*2,0);