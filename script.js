//
//
//
//http://acko.net/blog/mouse-handling-and-absolute-positions-in-javascript/
//http://creativejs.com/resources/requestanimationframe/
//http://stackoverflow.com/questions/3690748/identify-which-object-on-screen-clicked-in-html5-canvas-javascript
//http://simonsarris.com/canvas-moving-selectable-shapes/
//http://www.giantflyingsaucer.com/blog/?p=1935
//http://neimke.blogspot.com/2011/03/detect-when-object-is-clicked-on-html.html
//http://gamedev.stackexchange.com/questions/58454/is-using-multiple-canvas-objects-a-good-practice
//http://stackoverflow.com/questions/5014851/get-click-event-of-each-rectangle-inside-canvas
//http://stackoverflow.com/questions/12625766/javascript-canvas-detect-click-on-shape
//http://gamedev.stackexchange.com/questions/25505/html5-clicking-objects-in-canvas




//////////////////////////////
//http://gamedev.stackexchange.com/questions/132521/camera-movement-draw-grid/132751#132751
//http://gameprogrammingpatterns.com/
//http://www.dreamincode.net/forums/topic/110536-game-development-toolsresources/page__st__165
//http://www.dreamincode.net/forums/topic/120237-request-a-tutorial/page__st__60
//http://www.dreamincode.net/forums/topic/148044-game-programming-faq/
//http://www.dreamincode.net/forums/topic/395264-layered-tile-maps/
//http://www.dreamincode.net/forums/topic/393675-collisionhtml5trigonometrymathbeginner/
//http://stackoverflow.com/questions/9981097/multiplayer-rts-in-the-browser
//http://stackoverflow.com/questions/6846622/html5-game-without-canvas/6847185#6847185
//http://gamedev.stackexchange.com/questions/tagged/architecture
//http://gamedev.stackexchange.com/questions/tagged/sprites
//http://gamedev.stackexchange.com/questions/tagged/javascript?sort=frequent&pageSize=15
//https://github.com/Kitanga/Tile-world
//http://jsperf.com/layered-canvases/3
//http://blog.sklambert.com/html5-canvas-game-panning-a-background/#understanding-the-html-canvas
//https://www.html5rocks.com/en/tutorials/canvas/performance/#toc-mul-canvas
//http://stackoverflow.com/questions/23658660/how-can-canvas-coordinates-be-converted-into-tile-coordinates
//http://jsfiddle.net/gamealchemist/zF2w8/
//http://stackoverflow.com/questions/10041494/canvas-tile-grid-with-hover-effects-tilesheet-etc
//http://stackoverflow.com/questions/10289718/drawing-a-simple-grid-in-canvas



//https://www.spriters-resource.com/resources/sheets/27/29490.png
//https://www.spriters-resource.com/resources/sheets/27/29501.png
//http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/
//http://codensuch.com/trap-labs-series

// TODO
// snapToGrid();
// .draw number
// showGrid();

/*
Initialize() // Initializes the game
LoadAssets() // Loads game assets
LOOP
Update() // Update game world
Render() // Render game world
Synch()  // Synchronize time
Loop Until Done
CleanUp()  // Release system resouces
*/
var info = document.getElementById("info");
var CANVAS_WIDTH = 400;
var CANVAS_HEIGHT = 400;
var canvas = document.getElementById("canvas");
var canvasSelection = document.createElement("canvas");
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
canvasSelection.width = CANVAS_WIDTH;
canvasSelection.height = CANVAS_HEIGHT;
var ctx = canvas.getContext("2d");
var ctxSelection = canvasSelection.getContext("2d");

var TILE_SIZE = 32;
var cursorPos = {};
//var cursorTilePos = {};

canvas.addEventListener('mousemove',function(e){
  cursorPos.x = (e.pageX-canvas.offsetLeft);
  cursorPos.y = (e.pageY-canvas.offsetTop);
});
canvas.addEventListener('mouseout',function(e){
  cursorPos.x = undefined;
  cursorPos.y = undefined;
});
canvas.addEventListener('click',function(e){
  info.innerHTML = cursorPos.x +" "+ cursorPos.y +"<br/>"+ 
    snapToGrid().x +" "+ snapToGrid().y +"<br/>"+
    snapToGrid().c +" "+ snapToGrid().r;
});


function createTable(x,y,v){
  
  
  return [
    [v,v,v,v,v],
    [v,v,v,v,v],
    [v,v,v,v,v],
    [v,v,v,v,v],
    [v,v,v,v,v]
  ];
}

function obj(x,y,o){
  
  objects[x][y] = o;
  return o;
}

//TO INIT

var objects = createTable(20,30);


































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
//var footman = new Sprite2(footmanSprite,1440,480,15,5,0,0);
var footman = new Sprite2(footmanSprite,1440,480,15,5,18,9);
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


var aaaa = 0;
///////////////////
function draw222 (sprite, dataTable){
  var tw = canvas.width/sprite.columns;
  var th = canvas.height/sprite.rows;
  
  for(var x=0; x<sprite.columns; x++){
    for(var y=0; y<sprite.rows; y++){
      if(aaaa%2 === 0){
        sprite.draw(11, 17, x*TILE_SIZE, y*TILE_SIZE, null);
        aaaa++;
        //sprite.draw(x*tw, y*th, tw, th, null);
      } else {
        sprite.draw(11, 18, x*TILE_SIZE, y*TILE_SIZE, null);
        aaaa++;
      }
    }
  }
  aaaa = 0;
}

function drawMap(){
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
footman.draw(12,2,TILE_SIZE*6,64);
footman.draw(10,2,TILE_SIZE*2,0);
  
}



// footman {state:stop, direction:sw}



function snapToGrid(){
  var _x = Math.floor(cursorPos.x/TILE_SIZE);  
  var _y = Math.floor(cursorPos.y/TILE_SIZE);
  console.log(_x+" <> "+_y);
  //return {x:_x,y:1}
  return {x:_x*TILE_SIZE, y:_y*TILE_SIZE, c:_x+1, r:_y+1};
}






var units = {
  
};

units.footman = {
  name: "Footman",
  maxHp: 50,
  attack: 5,
  def: 1,
  range: 1,
  speed: 4,
  attSpeed: 3,
  size: 1,
  sprite: "spriteFootman",
  spriteAnim: {
    move: {
      n: [10,11,12,13,14],
      ne: [20,21,22,23,24],
      e: [30,31,32,33,34]
    },
    attack: {
      n: [10,11,12,13,14],
      ne: [20,21,22,23,24],
      e: [30,31,32,33,34]
    }
  },
  skill: {
    move: true,
    stop: true,
    attack: true
  }
};

function CreateUnit(u,posX,posY,player){
  this.hp = u.maxHp;
  this.pos = {x: posX,y: posY};  //posX posY calc by snapToGrid();
  this.renderPos = {x: posX,y: posY};
  this.action = 0;
  this.selected = false;
  this.player = player; //{nr:0,ally:true}
}

function init(){
  var userResGold = 300;
  var userResLumber = 400;
  
}

function load(){
  
}

function update(){
  
}

function render(){
  ctxSelection.clearRect(0, 0, 200, 300);
  drawMap();  
  //ctx.clearRect(0, 0, 200, 300);
  
  
  /*
  canvas.addEventListener('mousemove',function(e){
    console.log("x: "+cursorPos.x+" y: "+cursorPos.y+"  \n"+canvas.offsetLeft);
  });*/
}

function sync(){
  
}
var selection = [{c:10,r:10,w:1,h:1},{c:3,r:3,w:2,h:2}];
function drawSelection(){
  //ctxSelection.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  if(selection.length > 0){
    selection.forEach(function(e,i,a){
      ctxSelection.strokeStyle = "#0f0";
      ctxSelection.lineWidth = 2;
      ctxSelection.beginPath();
      ctxSelection.rect(
        (e.c-1)*TILE_SIZE,
        (e.r-1)*TILE_SIZE,
        e.w*TILE_SIZE,
        e.h*TILE_SIZE
      );
      ctxSelection.closePath();
      ctxSelection.stroke();
  
      
    });
  }
}

function showSelection(){
  ctxSelection.beginPath();
  ctxSelection.rect(
      snapToGrid().x,
      snapToGrid().y,
      TILE_SIZE,
      TILE_SIZE
    );
  ctxSelection.strokeStyle = "#0f0";
  ctxSelection.lineWidth = 2;
  ctxSelection.stroke();
  ctxSelection.closePath()
  
  ctx.drawImage(canvasSelection,0,0);
  
}












init();
load();
//ctx.save();
//sprImg.addEventListener("load", loop);
function loop() {
  update();
  render();
  ctxSelection.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  drawSelection();
  showSelection();
  
  //sync();
  window.requestAnimationFrame(loop);
  
}
window.requestAnimationFrame(loop);
