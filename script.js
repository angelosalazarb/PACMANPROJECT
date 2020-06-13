//Librería functional-light
let { append, cons, first, isEmpty, isList, length, rest } = functionalLight;

//Variables globales y  cargar archivos.
const waka = new Audio("sound/waka_waka.mp3");
const music = new Audio("sound/music.mp3");
const ghostD = new Audio("ghost_dead.mp3");
const pacD = new Audio("sound/pacman_death.wav");
const fruit = new Audio("sound/pacman_eatfruit.wav");;
const tada = new Audio("sound/Ta_Da.mp3");


var gblue = null;
var goran = null;
var gpink = null;
var gred = null;

var PACMANL= null;
var PACMANR = null;
var PACMANU = null;
var PACMAND = null;
var PACMANC = null;

/**
 * Contrato: <make><estructura>---><estructura>
 * proposito: Retorna una copia del mundo que puede ser modificada
 */
function make(data, attribute) {
  return Object.assign({}, data, attribute);
}
const WIDTH = 378;
const HEIGHT = 550;
const BSIZE = 22;
const MAPA = [
  /**
   * En el mapa, la siguiente representación para crearlo
   * 0 == Empty, 1 == Pacman, 2 == Rock, 3 == cookie, 
   * 4 == Big Cookie, 5 == BlueGhost, 6 == RedGhost, 
   * 7 == OrangeGhost, 8 == PinkGhost
   * 
   */
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
  [2,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  [2,3,2,2,3,2,2,3,2,3,2,2,3,2,2,3,2,0,0,0,0,0,0],
  [2,4,2,2,3,2,2,3,2,3,2,2,3,2,2,4,2,0,0,0,0,0,0],
  [2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  [2,3,3,3,3,2,3,3,2,3,3,2,3,3,3,3,2,0,0,0,0,0,0],
  [2,2,2,2,3,2,2,0,0,0,2,2,3,2,2,2,2,0,0,0,0,0,0],
  [0,0,0,2,3,2,0,0,2,0,0,2,3,2,0,0,0,0,0,0,0,0,0],
  [2,2,2,2,3,2,0,2,8,2,0,2,3,2,2,2,2,0,0,0,0,0,0],
  [3,3,3,3,3,3,0,2,7,2,0,3,3,3,3,3,3,0,0,0,0,0,0],
  [2,2,2,2,3,2,0,2,2,2,0,2,3,2,2,2,2,0,0,0,0,0,0],
  [0,0,0,2,3,2,0,0,0,0,0,2,3,2,0,0,0,0,0,0,0,0,0],
  [2,2,2,2,3,2,3,2,2,2,3,2,3,2,2,2,2,0,0,0,0,0,0],
  [2,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  [2,3,2,2,3,2,2,3,2,3,2,2,3,2,2,3,2,0,0,0,0,0,0],
  [2,4,3,2,3,6,3,3,1,3,3,3,3,2,3,4,2,0,0,0,0,0,0],
  [2,2,3,2,3,2,3,2,2,2,3,2,3,2,3,2,2,0,0,0,0,0,0],
  [2,3,3,3,3,2,3,3,2,3,3,2,3,3,3,3,2,0,0,0,0,0,0],
  [2,3,2,2,2,2,2,3,2,3,2,2,2,2,2,3,2,0,0,0,0,0,0],
  [2,3,3,3,3,3,3,3,3,3,5,3,3,3,3,3,2,0,0,0,0,0,0],
  [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
  ["life","life","life",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];

/**
 * Contrato:<forEach> <list>(<><num><num> --> ?)<index> -- > <?>
 * proposito: Lee un mapa (lista de la lista) y lo dibuja en el canvas
 */
function forEach(list, fun, index=0){
  if( !isEmpty(list) ){
    fun(first(list), index)
    forEach( rest(list), fun, index+1 )
  }
}

/**
 * <sketchProc><library>----<?>
 * proposito: compila nuestro código y lo presenta en la ventana de visualización. Es lo mismo que pulsar el botón "PLAY".
 */
function sketchProc(processing) {
  /**
   * 
   */
  processing.setup = function () {
    processing.frameRate(6); // FPS
    processing.size(WIDTH, HEIGHT);//Load canvas
    
    gblue = processing.loadImage("images/blue.png");//Load a blue ghost
    goran = processing.loadImage("images/orange.png");//Load a orange ghost
    gpink = processing.loadImage("images/pink.png");//Load a pink ghost
    gred = processing.loadImage("images/red.png");//Load a red ghost
    PACMANL= processing.loadImage("images/pacmanleft.png");
    PACMANR = processing.loadImage("images/pacmanright.png");
    PACMANU = processing.loadImage("images/pacmanup.png");
    PACMAND = processing.loadImage("images/pacmandown.png");
    PACMANC = processing.loadImage("images/pacmanclose.png");
    
    processing.state = {
      time:0,
      
      pacman:{
        x:8,
        y:15
      },

      score:0,

      ghosthb:
        {
          x:1,
          y:1
        },

      ghostho:
        {
          x:5,
          y:16
        },
    
      ghosthp:
        {
          x:12,
          y:1
        },

      ghosthr:
        {
          x:12,
          y:1
        },

      border:
          {x:18,
          y:0},
    }
  }
/**
 * contracto: <drawGame><world>----<world>
 * proposito: Dibuja en el canvas el mundo.
 *  
 */
  processing.drawGame = function (world) {
    //console.log(world.pacman.x, world.pacman.y)
    processing.background(0,0,0)
    

    
    forEach(MAPA, (fila, i) =>{
      forEach(fila, (block, j) =>{

      //Draw Pacman

        if(block == 1){
          processing.fill(255, 255, 0); //Pacman Color
          if(world.time % 2 ==0 ){
            //Open mouth
            processing.arc(world.pacman.x * BSIZE+BSIZE/2, 
            world.pacman.y * BSIZE+BSIZE/2, BSIZE, BSIZE,-Math.PI * 3 / 4, Math.PI * 3/ 4); 
          }else{
            //Close mouth
            processing.arc(world.pacman.x * BSIZE+BSIZE/2, 
            world.pacman.y * BSIZE+BSIZE/2, BSIZE, BSIZE, 0, Math.PI * 2); 
          }
        }
        //Draw block
        if(block == 2){
          processing.fill(0,255,0);
          processing.rect(j*BSIZE, i*BSIZE, BSIZE-2, BSIZE-2,5,5,5);
          
        }
        //Draw Cookie
        if(block == 3){
          if(world.time % 2 == 1){
          processing.fill(250, 200 , 30);
          processing.ellipse(j*BSIZE+BSIZE/2, i*BSIZE+BSIZE/2, BSIZE/3, BSIZE/3)
          }
          else{
          processing.fill(250, 200 , 255);
          processing.ellipse(j*BSIZE+BSIZE/2, i*BSIZE+BSIZE/2, BSIZE/5, BSIZE/5)
          }
        }
        //Draw Big Cookie
        if(block == 4){
          if(world.time % 2 == 1){
          processing.fill(250, 200 , 30);
          processing.ellipse(j*BSIZE+BSIZE/2, i*BSIZE+BSIZE/2, BSIZE/1.5, BSIZE/1.5)
          }
          else{
          processing.fill(250, 200 , 255);
          processing.ellipse(j*BSIZE+BSIZE/2, i*BSIZE+BSIZE/2, BSIZE/2, BSIZE/2)
          }
        }
        //Draw Lifes 
        if(block == "life"){
          processing.fill(255, 255, 0); //Pacman Color
          processing.arc(j * BSIZE+BSIZE/2, 
            i * BSIZE+BSIZE/2, BSIZE, BSIZE,-Math.PI * 3 / 4, Math.PI * 3 / 4);
        }
        
        //Draw ghosts
        if(block == 5){
          processing.image(gblue,j * BSIZE,i * BSIZE,22,22) 
        }
        
        if(block == 6){
          processing.image(gred,j * BSIZE,i * BSIZE,22,22) 
        }

        if(block == 7){
          processing.image(goran,j * BSIZE,i * BSIZE,22,22) 
        }

        if(block == 8){
          processing.image(gpink,j * BSIZE,i * BSIZE,22,22) 
        }
      
      });
    });
    
    /**
     * contrato:<textSize><num>-><?>
     * 	Establece el tamaño de fuente actual. El tamaño de fuente se mide en unidades de píxeles.
     */
    processing.textSize(20);
    //Dibuja texto en la pantalla. Muestra posición especificada por los parámetros adicionales
    
    processing.text("HIGH SCORE",220,500);
    processing.text("0000",220,520);

    const se = processing.second();
    const mi = processing.minute();
    const ho = processing.hour();
    var temp = processing.nf(ho,2) +":"+ processing.nf(mi,2) +":"+ processing.nf(se,2)

    processing.text(temp,110,500)
  }


/**
* Contrato: <.onKeyEvent> <world> <keyCode> ---> <make>
* Propósito: realizar una acción específica cuando se presiona una tecla en el teclado.
 * 
 */
processing.onKeyEvent = function(world, keyCode){
  console.log(keyCode)

  if(keyCode == processing.LEFT  ){

    waka.play()
    waka.volume = 0.03;

    if( MAPA[world.pacman.y][world.pacman.x -  1] == 0){
      MAPA[world.pacman.y][world.pacman.x -  1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
    return make(world, {
      pacman:{
        x: world.pacman.x - 1,
        y: world.pacman.y
      }
    })
    }
    else if(MAPA[world.pacman.y][world.pacman.x - 1 ] == 3){
      MAPA[world.pacman.y][world.pacman.x - 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x - 1,
          y: world.pacman.y
        }
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x - 1 ] == 4){
      MAPA[world.pacman.y][world.pacman.x - 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x - 1,
          y: world.pacman.y
        }
      })
    }
    else{
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y
        }
      })
    }
    } 

  if(keyCode == processing.RIGHT){
    waka.play()
    waka.volume = 0.03;
    
    if( MAPA[world.pacman.y][world.pacman.x +  1] == 0){
      MAPA[world.pacman.y][world.pacman.x +  1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
    return make(world, {
      pacman:{
        x: world.pacman.x + 1,
        y: world.pacman.y
      }
    })
    }
    else if(MAPA[world.pacman.y][world.pacman.x +1 ] == 3){
      MAPA[world.pacman.y][world.pacman.x + 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x + 1,
          y: world.pacman.y
        }
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x +1 ] == 4){
      MAPA[world.pacman.y][world.pacman.x + 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x + 1,
          y: world.pacman.y
        }
      })
    }
    else{
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y
        }
      })
    }
  }
  

  
  
  if(keyCode == processing.UP){
    waka.play()
    waka.volume = 0.03;
    
    if( MAPA[world.pacman.y - 1][world.pacman.x] == 0){
      MAPA[world.pacman.y - 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
    return make(world, {
      pacman:{
        x: world.pacman.x,
        y: world.pacman.y - 1
      }
    })
    }
    else if(MAPA[world.pacman.y - 1][world.pacman.x] == 3){
      MAPA[world.pacman.y - 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y - 1
        }
      })
    }
    else if(MAPA[world.pacman.y - 1][world.pacman.x] == 4){
      MAPA[world.pacman.y - 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y - 1
        }
      })
    }
    else{
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y
        }
      })
    }
  }
  
  if(keyCode == processing.DOWN){
    waka.play()
    waka.volume = 0.03;

    if( MAPA[world.pacman.y + 1][world.pacman.x] == 0){
      MAPA[world.pacman.y + 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
    return make(world, {
      pacman:{
        x: world.pacman.x,
        y: world.pacman.y + 1
      }
    })
    }
    else if(MAPA[world.pacman.y + 1][world.pacman.x] == 3){
      MAPA[world.pacman.y + 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y + 1
        }
      })
    }
    else if(MAPA[world.pacman.y + 1][world.pacman.x] == 4){
      MAPA[world.pacman.y + 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y + 1
        }
      })
    }
    else{
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y
        }
      })
    }
    }
  }
   
  

  /**
   * Cambia la posición del objeto moviendolo 1 unidad a la derecha. 
   */
  processing.onTic = function(world) {
    return make(world, { time: world.time + 1 , 
    pacman: { x: world.pacman.x, y: world.pacman.y  } });
  }

  processing.onMouseEvent = function (world, event) {
    return make(world, {});
  }

  // ******************** De aquí hacia abajo no debe cambiar nada. ********************

  // Esta es la función que pinta todo. Se ejecuta 60 veces por segundo. 
  // No cambie esta función. Su código debe ir en drawGame
  processing.draw = function () {
    processing.drawGame(processing.state);
    processing.state = processing.onTic(processing.state);
  };
  // Esta función se ejecuta cada vez que presionamos una tecla. 
  // No cambie esta función. Su código debe ir en onKeyEvent
  processing.keyPressed = function () {
    processing.state = processing.onKeyEvent(processing.state, processing.keyCode);
  }
  // Esta función se ejecuta cada vez movemos el mouse. 
  // No cambie esta función. Su código debe ir en onKeyEvent
  processing.mouseMoved = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "move", mouseX: processing.mouseX, mouseY: processing.mouseY });
  }

  // Estas funciones controlan los eventos del mouse. 
  // No cambie estas funciones. Su código debe ir en OnMouseEvent
  processing.mouseClicked = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "click", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mouseDragged = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "drag", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mousePressed = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "press", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }

  processing.mouseReleased = function () {
    processing.state = processing.onMouseEvent(processing.state,
      { action: "release", mouseX: processing.mouseX, mouseY: processing.mouseY, mouseButton: processing.mouseButton });
  }
  // Fin de los eventos del mouse
}

var canvas = document.getElementById("canvas");
// Adjuntamos nuestro sketch al framework de processing
var processingInstance = new Processing(canvas, sketchProc);