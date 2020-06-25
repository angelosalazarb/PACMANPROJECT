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
var cherry = null;

var PACMANL= null;
var PACMANR = null;
var PACMANU = null;
var PACMAND = null;
var PACMANC = null;

var mins = null;
var secs = null;

/**
 * Contrato: <make><estructura>---><estructura>
 * proposito: Retorna una copia del mundo que puede ser modificada
 */
function make(data, attribute) {
  return Object.assign({}, data, attribute);
}
const WIDTH = 420;
const HEIGHT = 550;
const BSIZE = 22;
const MAPA = [
  /**
   * En el mapa, la siguiente representación para crearlo
   * 0 == Empty, 1 == Pacman, 2 == Rock, 3 == cookie, 
   * 4 == Big Cookie, 5 == BlueGhost, 6 == RedGhost, 
   * 7 == OrangeGhost, 8 == PinkGhost , 9 == Cherry
   * 
   */ //0 1 2 3 4 5 6 7 8 9 0 1 2 3 4 5 6 7 8 9 0 1 2 3
  /*0*/[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  /*1*/[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
  /*2*/[0,2,5,3,3,3,3,3,3,2,3,3,3,3,3,3,9,2,0,0,0,0,0,0],
  /*3*/[0,2,3,2,2,3,2,2,3,2,3,2,2,3,2,2,3,2,0,0,0,0,0,0],
  /*4*/[0,2,4,2,2,3,2,2,3,2,3,2,2,3,2,2,4,2,0,0,0,0,0,0],
  /*5*/[0,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  /*6*/[0,2,3,3,3,3,2,3,3,2,3,3,2,3,3,3,3,2,0,0,0,0,0,0],
  /*7*/[0,2,2,2,2,3,2,2,0,0,8,2,2,3,2,2,2,2,0,0,0,0,0,0],
  /*8*/[0,0,0,0,2,3,2,0,0,0,0,0,2,3,2,0,0,0,0,0,0,0,0,0],
  /*9*/[0,2,2,2,2,3,2,0,2,0,2,0,2,3,2,2,2,2,0,0,0,0,0,0],
  /*0*/[11,3,3,3,3,3,3,0,2,7,2,0,3,3,3,3,3,3,12,0,0,0,0,0],
  /*1*/[0,2,2,2,2,3,2,0,2,2,2,0,2,3,2,2,2,2,0,0,0,0,0,0],
  /*2*/[0,0,0,0,2,3,2,0,0,0,0,0,2,3,2,0,0,0,0,0,0,0,0,0],
  /*3*/[0,2,2,2,2,3,2,3,2,2,2,3,2,3,2,2,2,2,0,0,0,0,0,0],
  /*4*/[0,2,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  /*5*/[0,2,3,2,2,3,2,2,3,2,3,2,2,3,2,2,3,2,0,0,0,0,0,0],
  /*6*/[0,2,4,3,2,3,3,3,3,1,3,3,3,3,2,3,4,2,0,0,0,0,0,0],
  /*7*/[0,2,2,3,2,3,2,3,2,2,2,3,2,3,2,3,2,2,0,0,0,0,0,0],
  /*8*/[0,2,3,3,3,3,2,3,3,2,3,3,2,3,3,3,3,2,0,0,0,0,0,0],
  /*9*/[0,2,3,2,2,2,2,2,3,2,3,2,2,2,2,2,3,2,0,0,0,0,0,0],
  /*0*/[0,2,9,3,3,3,3,3,3,3,3,3,3,3,3,3,6,2,0,0,0,0,0,0],
  /*1*/[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
  /*2*/[0,"life","life","life",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
];
const MAPAPODER = [
  /**
   * ESTE ES EL MAPA PARA EL SUPERPODER DEL PACMAN.
   * 
   */
  /*0*/[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  /*1*/[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
  /*2*/[0,2,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  /*3*/[0,2,3,2,2,3,2,2,3,2,3,2,2,3,2,2,3,2,0,0,0,0,0,0],
  /*4*/[0,2,3,2,2,3,2,2,3,2,3,2,2,3,2,2,3,2,0,0,0,0,0,0],
  /*5*/[0,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  /*6*/[0,2,3,3,3,3,2,3,3,2,3,3,2,3,3,3,3,2,0,0,0,0,0,0],
  /*7*/[0,2,2,2,2,3,2,2,0,0,0,2,2,3,2,2,2,2,0,0,0,0,0,0],
  /*8*/[0,0,0,0,2,3,2,3,0,0,0,0,2,3,2,0,0,0,0,0,0,0,0,0],
  /*9*/[0,2,2,2,2,3,2,0,2,3,2,0,2,3,2,2,2,2,0,0,0,0,0,0],
  /*0*/[11,3,3,3,3,3,3,0,2,3,2,0,3,3,3,3,3,3,12,0,0,0,0,0],
  /*1*/[0,2,2,2,2,3,2,0,2,2,2,0,2,3,2,2,2,2,0,0,0,0,0,0],
  /*2*/[0,0,0,0,2,3,2,0,0,0,0,0,2,3,2,0,0,0,0,0,0,0,0,0],
  /*3*/[0,2,2,2,2,3,2,3,2,2,2,3,2,3,2,2,2,2,0,0,0,0,0,0],
  /*4*/[0,2,3,3,3,3,3,3,3,2,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  /*5*/[0,2,3,2,2,3,2,2,3,2,3,2,2,3,2,2,3,2,0,0,0,0,0,0],
  /*6*/[0,2,4,3,2,3,3,3,3,1,3,3,3,3,2,3,3,2,0,0,0,0,0,0],
  /*7*/[0,2,2,3,2,3,2,3,2,2,2,3,2,3,2,3,2,2,0,0,0,0,0,0],
  /*8*/[0,2,3,3,3,3,2,3,3,2,3,3,2,3,3,3,3,2,0,0,0,0,0,0],
  /*9*/[0,2,3,2,2,2,2,2,3,2,3,2,2,2,2,2,3,2,0,0,0,0,0,0],
  /*0*/[0,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,0,0,0,0,0,0],
  /*1*/[0,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,0,0,0,0,0,0],
  /*2*/[0,"life","life","life",0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
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

function random(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

function moveGhostB(world){
  
   //Mover Abajo
   if(MAPA[world.ghosthb.y + 1][world.ghosthb.x] !== 2){
    //Verifica si no es un bloque
    if(MAPA[world.ghosthb.y + 1][world.ghosthb.x] == 0){//Verifica si hay un vacío
      MAPA[world.ghosthb.y + 1][world.ghosthb.x] = 5 //mueve el fantasma 
      MAPA[world.ghosthb.y][world.ghosthb.x] = 0 //Deja el vacío 
    }
    else if(MAPA[world.ghosthb.y + 1][world.ghosthb.x ] == 1){ //Verifica si esta el pacman
          MAPA[world.ghosthb.y + 1][world.ghosthb.x] = 5//Mueve el fantasma 
          MAPA[world.ghosthb.y][world.ghosthb.x] = 0 //Deja vacío

          pacD.play();
          pacD.volume = 0.06;

          MAPA[world.pacman.y][world.pacman.x] = 0



          if(MAPA[22][3] == "life"){
            MAPA[22][3] = 0
          }
          else if(MAPA[22][2] == "life"){
            MAPA[22][2] = 0
          }
          else if(MAPA[22][1] == "life"){
            MAPA[22][1] = 0

          }

          MAPA[16][9] = 1

     
          world.lifes = world.lifes -1

          return make(world, {
            
            pacman:{
              x: world.pacman.x = 9,
              y: world.pacman.y = 16 
            }
            
          })


    }
    else if(MAPA[world.ghosthb.y + 1][world.ghosthb.x] == 3){ //Verifica si hay una galleta 
      
      MAPA[world.ghosthb.y + 1][world.ghosthb.x] = 5 //Mueve el fantasma 
      MAPA[world.ghosthb.y][world.ghosthb.x] = 3  //Deja galleta intacta

    }
    else if(MAPA[world.ghosthb.y + 1][world.ghosthb.x] == 4){ //Verifica si hay una galleta grande
      MAPA[world.ghosthb.y + 1][world.ghosthb.x] = 5//Mueve el fantasma 
      MAPA[world.ghosthb.y][world.ghosthb.x] = 4 //Deja galleta intacta

    }
    else if(MAPA[world.ghosthb.y + 1][world.ghosthb.x] == 9){ //Verifica si hay una galleta grande
      MAPA[world.ghosthb.y + 1][world.ghosthb.x] = 5//Mueve el fantasma 
      MAPA[world.ghosthb.y][world.ghosthb.x] = 9 //Deja galleta intacta

    }
    
    else{
      return make(world, {
        ghosthb:{
          x: world.ghosthb.x,
          y: world.ghosthb.y = world.ghosthb.y - 1 
        }
      })
    }
    
  
    return make(world, {
      ghosthb:{
        x: world.ghosthb.x,
        y: world.ghosthb.y = world.ghosthb.y + 1 
      }
    })
  }
  //Mover derecha
  else if(MAPA[world.ghosthb.y][world.ghosthb.x + 1] !== 2 && world.seconds < 5 || world.seconds>13){

    if(MAPA[world.ghosthb.y][world.ghosthb.x + 1] == 0){//Verifica si hay un vacío
      MAPA[world.ghosthb.y][world.ghosthb.x + 1] = 5 //mueve el fantasma 
      MAPA[world.ghosthb.y][world.ghosthb.x] = 0 //Deja el vacío 
    }
    else if(MAPA[world.ghosthb.y][world.ghosthb.x + 1] == 3){ //Verifica si hay una galleta 
      
      MAPA[world.ghosthb.y][world.ghosthb.x + 1] = 5 //Mueve el fantasma 
      MAPA[world.ghosthb.y][world.ghosthb.x] = 3  //Deja galleta intacta

    }
    else if(MAPA[world.ghosthb.y][world.ghosthb.x + 1] == 4){ //Verifica si hay una galleta grande
      MAPA[world.ghosthb.y][world.ghosthb.x + 1] = 5//Mueve el fantasma 
      MAPA[world.ghosthb.y][world.ghosthb.x] = 4 //Deja galleta intacta

    }
    else if(MAPA[world.ghosthb.y][world.ghosthb.x + 1] == 9){ //Verifica si hay una galleta grande
      MAPA[world.ghosthb.y][world.ghosthb.x + 1] = 5//Mueve el fantasma 
      MAPA[world.ghosthb.y][world.ghosthb.x] = 9 //Deja galleta intacta

    }

    else if(MAPA[world.ghosthb.y][world.ghosthb.x + 1] == 2){ //Verifica si hay un bloque
      return make(world, {
        ghosthb:{
          x: world.ghosthb.x,
          y: world.ghosthb.y
        }
      })
    }  
    else if(MAPA[world.ghosthb.y][world.ghosthb.x + 1 ] == 1){ //Verifica si esta el pacman
      MAPA[world.ghosthb.y][world.ghosthb.x + 1] = 5//Mueve el fantasma 
      MAPA[world.ghosthb.y][world.ghosthb.x] = 0 //Deja vacío

      pacD.play();
      pacD.volume = 0.06;

      MAPA[world.pacman.y][world.pacman.x] = 0



      if(MAPA[22][3] == "life"){
        MAPA[22][3] = 0
      }
      else if(MAPA[22][2] == "life"){
        MAPA[22][2] = 0
      }
      else if(MAPA[22][1] == "life"){
        MAPA[22][1] = 0

      }

      MAPA[16][9] = 1

 
      world.lifes = world.lifes -1

      return make(world, {
        
        pacman:{
          x: world.pacman.x = 9,
          y: world.pacman.y = 16 
        }
        
      })
    }
    
        return make(world, {
          ghosthb:{
            x: world.ghosthb.x = world.ghosthb.x + 1,
            y: world.ghosthb.y 
          }
        })
      }

      //Mover Izquierda  
      else if(MAPA[world.ghosthb.y + 1][world.ghosthb.x] == 2 && world.seconds > 5){

        
        if(MAPA[world.ghosthb.y][world.ghosthb.x - 1] == 0){//Verifica si hay un vacío
          MAPA[world.ghosthb.y][world.ghosthb.x - 1] = 5 //mueve el fantasma 
          MAPA[world.ghosthb.y][world.ghosthb.x] = 0 //Deja el vacío 
        }
        else if(MAPA[world.ghosthb.y][world.ghosthb.x - 1] == 3){ //Verifica si hay una galleta 
          
          MAPA[world.ghosthb.y][world.ghosthb.x - 1] = 5 //Mueve el fantasma 
          MAPA[world.ghosthb.y][world.ghosthb.x] = 3  //Deja galleta intacta

        }
        else if(MAPA[world.ghosthb.y][world.ghosthb.x - 1] == 4){ //Verifica si hay una galleta grande
          MAPA[world.ghosthb.y][world.ghosthb.x - 1] = 5//Mueve el fantasma 
          MAPA[world.ghosthb.y][world.ghosthb.x] = 4 //Deja galleta intacta

        }
        else if(MAPA[world.ghosthb.y][world.ghosthb.x - 1]== 9){ //Verifica si hay una galleta grande
          MAPA[world.ghosthb.y][world.ghosthb.x - 1] = 5//Mueve el fantasma 
          MAPA[world.ghosthb.y][world.ghosthb.x] = 9 //Deja galleta intacta

        }
        else if(MAPA[world.ghosthb.y][world.ghosthb.x - 1]== 2){ //Verifica si hay una galleta grande
          return make(world, {
            ghosthb:{
              x: world.ghosthb.x,
              y: world.ghosthb.y
            }
          })
        }
        else if(MAPA[world.ghosthb.y][world.ghosthb.x - 1 ] == 1){ //Verifica si esta el pacman
          MAPA[world.ghosthb.y][world.ghosthb.x - 1] = 5//Mueve el fantasma 
          MAPA[world.ghosthb.y][world.ghosthb.x] = 0 //Deja vacío
    
          pacD.play();
          pacD.volume = 0.06;
    
          MAPA[world.pacman.y][world.pacman.x] = 0
    
    
    
          if(MAPA[22][3] == "life"){
            MAPA[22][3] = 0
          }
          else if(MAPA[22][2] == "life"){
            MAPA[22][2] = 0
          }
          else if(MAPA[22][1] == "life"){
            MAPA[22][1] = 0
    
          }
    
          MAPA[16][9] = 1
    
     
          world.lifes = world.lifes -1
    
          return make(world, {
            
            pacman:{
              x: world.pacman.x = 9,
              y: world.pacman.y = 16 
            }
            
          })
        }
        
        return make(world, {
          ghosthb:{
            x: world.ghosthb.x = world.ghosthb.x - 1,
            y: world.ghosthb.y
          }
        })
      }    
      
}

function moveGhostP(world){// fantasma purpura
   if(MAPA[world.ghosthp.y - 1][world.ghosthp.x] !== 2 && world.seconds < 5){// movimiento arriba
      if(MAPA[world.ghosthp.y - 1][world.ghosthp.x] == 3){
        MAPA[world.ghosthp.y - 1][world.ghosthp.x] = 8 
        MAPA[world.ghosthp.y][world.ghosthp.x] = 3 
      }else if(MAPA[world.ghosthp.y - 1 ][world.ghosthp.x ] == 4){
      MAPA[world.ghosthp.y - 1 ][world.ghosthp.x ] = 8 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 4
      }else if(MAPA[world.ghosthp.y - 1 ][world.ghosthp.x ] == 0){
      MAPA[world.ghosthp.y - 1 ][world.ghosthp.x ] = 8 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 0
      }
      else if(MAPA[world.ghosthp.y - 1 ][world.ghosthp.x] == 1){ //Verifica si esta el pacman
        MAPA[world.ghosthp.y - 1][world.ghosthp.x] = 5//Mueve el fantasma 
        MAPA[world.ghosthp.y][world.ghosthp.x] = 0 //Deja vacío
        pacD.play();
        pacD.volume = 0.06;
        MAPA[world.pacman.y][world.pacman.x] = 0
        if(MAPA[22][3] == "life"){
          MAPA[22][3] = 0
        }
        else if(MAPA[22][2] == "life"){
          MAPA[22][2] = 0
        }
        else if(MAPA[22][1] == "life"){
          MAPA[22][1] = 0
        }
        MAPA[16][9] = 1
        world.lifes = world.lifes -1
        return make(world, {
          pacman:{
            x: world.pacman.x = 9,
            y: world.pacman.y = 16 
          }
          
        })
      }else{
      return make(world, {
        ghosthp:{
          x: world.ghosthp.x,
          y: world.ghosthp.y = world.ghosthp.y - 1 
        }
      })
    }

  }else if(MAPA[world.ghosthp.y ][world.ghosthp.x +1] !== 2 && world.seconds < 10){//movimiento a la derecha
    if(MAPA[world.ghosthp.y ][world.ghosthp.x + 1] == 3){
        MAPA[world.ghosthp.y ][world.ghosthp.x + 1] = 8 
        MAPA[world.ghosthp.y][world.ghosthp.x] = 3
    }else if(MAPA[world.ghosthp.y ][world.ghosthp.x + 1] == 9){
      MAPA[world.ghosthp.y ][world.ghosthp.x + 1] = 8 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 9
    }else if(MAPA[world.ghosthp.y ][world.ghosthp.x + 1] == 0){
      MAPA[world.ghosthp.y ][world.ghosthp.x + 1] = 8 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 0
        
     }else if(MAPA[world.ghosthp.y][world.ghosthp.x + 1] == 1){ //Verifica si esta el pacman
      MAPA[world.ghosthp.y][world.ghosthp.x + 1] = 5//Mueve el fantasma 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 0 //Deja vacío
      pacD.play();
      pacD.volume = 0.06;
      MAPA[world.pacman.y][world.pacman.x] = 0
      if(MAPA[22][3] == "life"){
        MAPA[22][3] = 0
      }
      else if(MAPA[22][2] == "life"){
        MAPA[22][2] = 0
      }
      else if(MAPA[22][1] == "life"){
        MAPA[22][1] = 0
      }
      MAPA[16][9] = 1
      world.lifes = world.lifes -1
      return make(world, {
        pacman:{
          x: world.pacman.x = 9,
          y: world.pacman.y = 16 
        }
        
      })
    }else{
      return make(world, {
        ghosthp:{
          x: world.ghosthp.x = world.ghosthp.x + 1,
          y: world.ghosthp.y 
        }
      })
  }
  

  }else if(MAPA[world.ghosthp.y + 1 ][world.ghosthp.x ] !== 2 && world.seconds < 20){//Movimiento hacia abajo
    if(MAPA[world.ghosthp.y + 1 ][world.ghosthp.x ] == 4){
      MAPA[world.ghosthp.y + 1 ][world.ghosthp.x ] = 8 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 4
    }else if(MAPA[world.ghosthp.y + 1 ][world.ghosthp.x ] == 3){
      MAPA[world.ghosthp.y + 1][world.ghosthp.x ] = 8 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 3
     }else if(MAPA[world.ghosthp.y + 1 ][world.ghosthp.x ] == 0){
      MAPA[world.ghosthp.y + 1][world.ghosthp.x ] = 8 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 0 
    }else if(MAPA[world.ghosthp.y + 1 ][world.ghosthp.x ] == 9){
      MAPA[world.ghosthp.y + 1][world.ghosthp.x ] = 8 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 9 

  }else if(MAPA[world.ghosthp.y + 1][world.ghosthp.x] == 1){ //Verifica si esta el pacman
    MAPA[world.ghosthp.y + 1][world.ghosthp.x] = 5//Mueve el fantasma 
    MAPA[world.ghosthp.y][world.ghosthp.x] = 0 //Deja vacío
    pacD.play();
    pacD.volume = 0.06;
    MAPA[world.pacman.y][world.pacman.x] = 0
    if(MAPA[22][3] == "life"){
      MAPA[22][3] = 0
    }
    else if(MAPA[22][2] == "life"){
      MAPA[22][2] = 0
    }
    else if(MAPA[22][1] == "life"){
      MAPA[22][1] = 0
    }
    MAPA[16][9] = 1
    world.lifes = world.lifes -1
    return make(world, {
      pacman:{
        x: world.pacman.x = 9,
        y: world.pacman.y = 16 
      }
      
    })
  }else{
    return make(world, {
        ghosthp:{
          x: world.ghosthp.x ,
          y: world.ghosthp.y = world.ghosthp.y + 1
        }
      })

  }
  }else if(MAPA[world.ghosthp.y ][world.ghosthp.x - 1] !== 2){
    if(MAPA[world.ghosthp.y ][world.ghosthp.x - 1] == 3){
      MAPA[world.ghosthp.y ][world.ghosthp.x - 1] = 8 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 3
     }else if(MAPA[world.ghosthp.y ][world.ghosthp.x - 1] == 0){
      MAPA[world.ghosthp.y ][world.ghosthp.x - 1] = 8 
      MAPA[world.ghosthp.y][world.ghosthp.x] = 0
  
  }else if(MAPA[world.ghosthp.y][world.ghosthp.x - 1] == 1){ //Verifica si esta el pacman
    MAPA[world.ghosthp.y][world.ghosthp.x - 1] = 5//Mueve el fantasma 
    MAPA[world.ghosthp.y][world.ghosthp.x] = 0 //Deja vacío
    pacD.play();
    pacD.volume = 0.06;
    MAPA[world.pacman.y][world.pacman.x] = 0
    if(MAPA[22][3] == "life"){
      MAPA[22][3] = 0
    }
    else if(MAPA[22][2] == "life"){
      MAPA[22][2] = 0
    }
    else if(MAPA[22][1] == "life"){
      MAPA[22][1] = 0
    }
    MAPA[16][9] = 1
    world.lifes = world.lifes -1
    return make(world, {
      pacman:{
        x: world.pacman.x = 9,
        y: world.pacman.y = 16 
      }
      
    })
  }else{
    return make(world, {
        ghosthp:{
          x: world.ghosthp.x = world.ghosthp.x - 1,
          y: world.ghosthp.y 
        }
      })

  }
  }else if(MAPA[world.ghosthp.y - 1][world.ghosthp.x] !== 2  ){// movimiento arriba
       if(MAPA[world.ghosthp.y - 1][world.ghosthp.x] == 3){
        MAPA[world.ghosthp.y - 1][world.ghosthp.x] = 8 
        MAPA[world.ghosthp.y][world.ghosthp.x] = 3 
       }else if(MAPA[world.ghosthp.y - 1 ][world.ghosthp.x ] == 4){
        MAPA[world.ghosthp.y - 1 ][world.ghosthp.x ] = 8 
        MAPA[world.ghosthp.y][world.ghosthp.x] = 4
        }
        else if(MAPA[world.ghosthp.y - 1][world.ghosthp.x] == 1){ //Verifica si esta el pacman
          MAPA[world.ghosthp.y - 1][world.ghosthp.x] = 5//Mueve el fantasma 
          MAPA[world.ghosthp.y][world.ghosthp.x] = 0 //Deja vacío
          pacD.play();
          pacD.volume = 0.06;
          MAPA[world.pacman.y][world.pacman.x] = 0
          if(MAPA[22][3] == "life"){
            MAPA[22][3] = 0
          }
          else if(MAPA[22][2] == "life"){
            MAPA[22][2] = 0
          }
          else if(MAPA[22][1] == "life"){
            MAPA[22][1] = 0
          }
          MAPA[16][9] = 1
          world.lifes = world.lifes -1
          return make(world, {
            pacman:{
              x: world.pacman.x = 9,
              y: world.pacman.y = 16 
            }
            
          })
        }else{
        return make(world, {
        ghosthp:{
          x: world.ghosthp.x,
          y: world.ghosthp.y = world.ghosthp.y - 1 
        }
      })
    }

  }
  
 
 
}
function moveGhostO(world){// fantasma naranja
   if(MAPA[world.ghostho.y - 1][world.ghostho.x] !== 2 && world.seconds < 5){// movimiento arriba
      if(MAPA[world.ghostho.y - 1][world.ghostho.x] == 3){
        MAPA[world.ghostho.y - 1][world.ghostho.x] = 7 
        MAPA[world.ghostho.y][world.ghostho.x] = 3 
      }else if(MAPA[world.ghostho.y - 1 ][world.ghostho.x ] == 4){
      MAPA[world.ghostho.y - 1 ][world.ghostho.x ] = 7 
      MAPA[world.ghostho.y][world.ghostho.x] = 4
      }else if(MAPA[world.ghostho.y - 1 ][world.ghostho.x ] == 0){
      MAPA[world.ghostho.y - 1 ][world.ghostho.x ] = 7
      MAPA[world.ghostho.y][world.ghostho.x] = 0
      }else if(MAPA[world.ghostho.y - 1][world.ghostho.x] == 1){ //Verifica si esta el pacman
          MAPA[world.ghostho.y - 1][world.ghostho.x] = 5//Mueve el fantasma 
          MAPA[world.ghostho.y][world.ghostho.x] = 0 //Deja vacío
          pacD.play();
          pacD.volume = 0.06;
          MAPA[world.pacman.y][world.pacman.x] = 0
          if(MAPA[22][3] == "life"){
            MAPA[22][3] = 0
          }
          else if(MAPA[22][2] == "life"){
            MAPA[22][2] = 0
          }
          else if(MAPA[22][1] == "life"){
            MAPA[22][1] = 0
          }
          MAPA[16][9] = 1
          world.lifes = world.lifes -1
          return make(world, {
            pacman:{
              x: world.pacman.x = 9,
              y: world.pacman.y = 16 
            }
            
          })
        }else{
      return make(world, {
        ghostho:{
          x: world.ghostho.x,
          y: world.ghostho.y = world.ghostho.y - 1 
        }
      })
    }

  }else if(MAPA[world.ghostho.y ][world.ghostho.x +1] !== 2 && world.seconds < 5){//movimiento a la derech
    if(MAPA[world.ghostho.y ][world.ghostho.x + 1] == 3){
        MAPA[world.ghostho.y ][world.ghostho.x + 1] = 7 
        MAPA[world.ghostho.y][world.ghostho.x] = 3
    }else if(MAPA[world.ghostho.y ][world.ghostho.x + 1] == 9){
      MAPA[world.ghostho.y ][world.ghostho.x + 1] = 7 
      MAPA[world.ghostho.y][world.ghostho.x] = 9
    }else if(MAPA[world.ghostho.y ][world.ghostho.x + 1] == 0){
      MAPA[world.ghostho.y ][world.ghostho.x + 1] = 7 
      MAPA[world.ghostho.y][world.ghostho.x] = 0
        
     }else if(MAPA[world.ghostho.y][world.ghostho.x + 1] == 1){ //Verifica si esta el pacman
      MAPA[world.ghostho.y][world.ghostho.x + 1] = 5//Mueve el fantasma 
      MAPA[world.ghostho.y][world.ghostho.x] = 0 //Deja vacío
      pacD.play();
      pacD.volume = 0.06;
      MAPA[world.pacman.y][world.pacman.x] = 0
      if(MAPA[22][3] == "life"){
        MAPA[22][3] = 0
      }
      else if(MAPA[22][2] == "life"){
        MAPA[22][2] = 0
      }
      else if(MAPA[22][1] == "life"){
        MAPA[22][1] = 0
      }
      MAPA[16][9] = 1
      world.lifes = world.lifes -1
      return make(world, {
        pacman:{
          x: world.pacman.x = 9,
          y: world.pacman.y = 16 
        }
        
      })
    }else{
      return make(world, {
        ghostho:{
          x: world.ghostho.x = world.ghostho.x + 1,
          y: world.ghostho.y 
        }
      })
  }
  

  }else if(MAPA[world.ghostho.y + 1 ][world.ghostho.x ] !== 2 && world.seconds < 20){//Movimiento hacia abajo
    if(MAPA[world.ghostho.y + 1 ][world.ghostho.x ] == 4){
      MAPA[world.ghostho.y + 1 ][world.ghostho.x ] = 7 
      MAPA[world.ghostho.y][world.ghostho.x] = 4
    }else if(MAPA[world.ghostho.y + 1 ][world.ghostho.x ] == 3){
      MAPA[world.ghostho.y + 1][world.ghostho.x ] = 7 
      MAPA[world.ghostho.y][world.ghostho.x] = 3
     }else if(MAPA[world.ghostho.y + 1 ][world.ghostho.x ] == 0){
      MAPA[world.ghostho.y + 1][world.ghostho.x ] = 7 
      MAPA[world.ghostho.y][world.ghostho.x] = 0 
    }else if(MAPA[world.ghostho.y + 1 ][world.ghostho.x ] == 9){
      MAPA[world.ghostho.y + 1][world.ghostho.x ] = 7 
      MAPA[world.ghostho.y][world.ghostho.x] = 9 


  }else if(MAPA[world.ghostho.y + 1][world.ghostho.x] == 1){ //Verifica si esta el pacman
    MAPA[world.ghostho.y + 1][world.ghostho.x] = 5//Mueve el fantasma 
    MAPA[world.ghostho.y][world.ghostho.x] = 0 //Deja vacío
    pacD.play();
    pacD.volume = 0.06;
    MAPA[world.pacman.y][world.pacman.x] = 0
    if(MAPA[22][3] == "life"){
      MAPA[22][3] = 0
    }
    else if(MAPA[22][2] == "life"){
      MAPA[22][2] = 0
    }
    else if(MAPA[22][1] == "life"){
      MAPA[22][1] = 0
    }
    MAPA[16][9] = 1
    world.lifes = world.lifes -1
    return make(world, {
      pacman:{
        x: world.pacman.x = 9,
        y: world.pacman.y = 16 
      }
      
    })

  }else{
    return make(world, {
        ghostho:{
          x: world.ghostho.x ,
          y: world.ghostho.y = world.ghostho.y + 1
        }
      })

  }
  }else if(MAPA[world.ghostho.y ][world.ghostho.x - 1] !== 2){ //Mover izquierda
    if(MAPA[world.ghostho.y ][world.ghostho.x - 1] == 3){
      MAPA[world.ghostho.y ][world.ghostho.x - 1] = 7 
      MAPA[world.ghostho.y][world.ghostho.x] = 3
     }else if(MAPA[world.ghostho.y ][world.ghostho.x - 1] == 0){
      MAPA[world.ghostho.y ][world.ghostho.x - 1] = 7 
      MAPA[world.ghostho.y][world.ghostho.x] = 0
        
  }else if(MAPA[world.ghostho.y][world.ghostho.x - 1] == 1){ //Verifica si esta el pacman
    MAPA[world.ghostho.y][world.ghostho.x - 1] = 5//Mueve el fantasma 
    MAPA[world.ghostho.y][world.ghostho.x] = 0 //Deja vacío
    pacD.play();
    pacD.volume = 0.06;
    MAPA[world.pacman.y][world.pacman.x] = 0
    if(MAPA[22][3] == "life"){
      MAPA[22][3] = 0
    }
    else if(MAPA[22][2] == "life"){
      MAPA[22][2] = 0
    }
    else if(MAPA[22][1] == "life"){
      MAPA[22][1] = 0
    }
    MAPA[16][9] = 1
    world.lifes = world.lifes -1
    return make(world, {
      pacman:{
        x: world.pacman.x = 9,
        y: world.pacman.y = 16 
      }
      
    })
  }else{
    return make(world, {
        ghostho:{
          x: world.ghostho.x = world.ghostho.x - 1,
          y: world.ghostho.y 
        }
      })

  }
  }else if(MAPA[world.ghostho.y - 1][world.ghostho.x] !== 2  ){// movimiento arriba
       if(MAPA[world.ghostho.y - 1][world.ghostho.x] == 3){
        MAPA[world.ghostho.y - 1][world.ghostho.x] = 7
        MAPA[world.ghostho.y][world.ghostho.x] = 3 
       }else if(MAPA[world.ghostho.y - 1 ][world.ghostho.x ] == 4){
      MAPA[world.ghostho.y - 1 ][world.ghostho.x ] = 7 
      MAPA[world.ghostho.y][world.ghostho.x] = 4
        }
        else if(MAPA[world.ghostho.y + 1][world.ghostho.x] == 1){ //Verifica si esta el pacman
          MAPA[world.ghostho.y + 1][world.ghostho.x] = 5//Mueve el fantasma 
          MAPA[world.ghostho.y][world.ghostho.x] = 0 //Deja vacío
          pacD.play();
          pacD.volume = 0.06;
          MAPA[world.pacman.y][world.pacman.x] = 0
          if(MAPA[22][3] == "life"){
            MAPA[22][3] = 0
          }
          else if(MAPA[22][2] == "life"){
            MAPA[22][2] = 0
          }
          else if(MAPA[22][1] == "life"){
            MAPA[22][1] = 0
          }
          MAPA[16][9] = 1
          world.lifes = world.lifes -1
          return make(world, {
            pacman:{
              x: world.pacman.x = 9,
              y: world.pacman.y = 16 
            }
            
          })
        }else{
      return make(world, {
        ghostho:{
          x: world.ghostho.x,
          y: world.ghostho.y = world.ghostho.y - 1 
        }
      })
    }

  }
  
}


function moveGhostR(world){// fantasma rojo
   if(MAPA[world.ghosthr.y - 1][world.ghosthr.x] !== 2 && world.seconds < 5){// movimiento arriba

      if(MAPA[world.ghosthr.y - 1][world.ghosthr.x] == 3){
        MAPA[world.ghosthr.y - 1][world.ghosthr.x] = 6 
        MAPA[world.ghosthr.y][world.ghosthr.x] = 3 

      }else if(MAPA[world.ghosthr.y - 1 ][world.ghosthr.x ] == 4){
        MAPA[world.ghosthr.y - 1 ][world.ghosthr.x ] = 6
        MAPA[world.ghosthr.y][world.ghosthr.x] = 4
      }else if(MAPA[world.ghosthr.y - 1 ][world.ghosthr.x ] == 0){
        MAPA[world.ghosthr.y - 1 ][world.ghosthr.x ] = 6 
        MAPA[world.ghosthr.y][world.ghosthr.x] = 0
      }
      else if(MAPA[world.ghosthr.y - 1][world.ghosthr.x] == 1){ //Verifica si esta el pacman
        MAPA[world.ghosthr.y - 1][world.ghosthr.x] = 5//Mueve el fantasma 
        MAPA[world.ghosthr.y][world.ghosthr.x] = 0 //Deja vacío
        pacD.play();
        pacD.volume = 0.06;
        MAPA[world.pacman.y][world.pacman.x] = 0
        if(MAPA[22][3] == "life"){
          MAPA[22][3] = 0
        }
        else if(MAPA[22][2] == "life"){
          MAPA[22][2] = 0
        }
        else if(MAPA[22][1] == "life"){
          MAPA[22][1] = 0
        }
        MAPA[16][9] = 1
        world.lifes = world.lifes -1
        return make(world, {
          pacman:{
            x: world.pacman.x = 9,
            y: world.pacman.y = 16 
          }
          
        })
      }else{
        return make(world, {
        ghosthr:{
          x: world.ghosthr.x,
          y: world.ghosthr.y = world.ghosthr.y - 1 
        }
      })
    }

  }else if(MAPA[world.ghosthr.y ][world.ghosthr.x +1] !== 2 && world.seconds < 10){//movimiento a la derech
    if(MAPA[world.ghosthr.y ][world.ghosthr.x + 1] == 3){
        MAPA[world.ghosthr.y ][world.ghosthr.x + 1] = 6 
        MAPA[world.ghosthr.y][world.ghosthr.x] = 3
    }else if(MAPA[world.ghosthr.y ][world.ghosthr.x + 1] == 9){
      MAPA[world.ghosthr.y ][world.ghosthr.x + 1] = 6 
      MAPA[world.ghosthr.y][world.ghosthr.x] = 9
    }else if(MAPA[world.ghosthr.y ][world.ghosthr.x + 1] == 0){
      MAPA[world.ghosthr.y ][world.ghosthr.x + 1] = 6 
      MAPA[world.ghosthr.y][world.ghosthr.x] = 0
        
     }else if(MAPA[world.ghosthr.y][world.ghosthr.x + 1] == 1){ //Verifica si esta el pacman
        MAPA[world.ghosthr.y][world.ghosthr.x + 1] = 5//Mueve el fantasma 
        MAPA[world.ghosthr.y][world.ghosthr.x] = 0 //Deja vacío
        pacD.play();
        pacD.volume = 0.06;
        MAPA[world.pacman.y][world.pacman.x] = 0
        if(MAPA[22][3] == "life"){
          MAPA[22][3] = 0
        }
        else if(MAPA[22][2] == "life"){
          MAPA[22][2] = 0
        }
        else if(MAPA[22][1] == "life"){
          MAPA[22][1] = 0
        }
        MAPA[16][9] = 1
        world.lifes = world.lifes -1
        return make(world, {
          pacman:{
            x: world.pacman.x = 9,
            y: world.pacman.y = 16 
          }
          
        })
      }else{
      return make(world, {
        ghosthr:{
          x: world.ghosthr.x = world.ghosthr.x + 1,
          y: world.ghosthr.y 
        }
      })
  }
  

  }else if(MAPA[world.ghosthr.y + 1 ][world.ghosthr.x ] !== 2 && world.seconds < 20){
    if(MAPA[world.ghosthr.y + 1 ][world.ghosthr.x ] == 4){
      MAPA[world.ghosthr.y + 1 ][world.ghosthr.x ] = 6 
      MAPA[world.ghosthr.y][world.ghosthr.x] = 4
    }else if(MAPA[world.ghosthr.y + 1 ][world.ghosthr.x ] == 3){
      MAPA[world.ghosthr.y + 1][world.ghosthr.x ] = 6 
      MAPA[world.ghosthr.y][world.ghosthr.x] = 3
     }else if(MAPA[world.ghosthr.y + 1 ][world.ghosthr.x ] == 0){
      MAPA[world.ghosthr.y + 1][world.ghosthr.x ] = 6
      MAPA[world.ghosthr.y][world.ghosthr.x] = 0 
    }else if(MAPA[world.ghosthr.y + 1 ][world.ghosthr.x ] == 9){
      MAPA[world.ghosthr.y + 1][world.ghosthr.x ] = 6 
      MAPA[world.ghosthr.y][world.ghosthr.x] = 9 


  }else if(MAPA[world.ghosthr.y + 1][world.ghosthr.x] == 1){ //Verifica si esta el pacman
    MAPA[world.ghosthr.y + 1][world.ghosthr.x] = 5//Mueve el fantasma 
    MAPA[world.ghosthr.y][world.ghosthr.x] = 0 //Deja vacío
    pacD.play();
    pacD.volume = 0.06;
    MAPA[world.pacman.y][world.pacman.x] = 0
    if(MAPA[22][3] == "life"){
      MAPA[22][3] = 0
    }
    else if(MAPA[22][2] == "life"){
      MAPA[22][2] = 0
    }
    else if(MAPA[22][1] == "life"){
      MAPA[22][1] = 0
    }
    MAPA[16][9] = 1
    world.lifes = world.lifes -1
    return make(world, {
      pacman:{
        x: world.pacman.x = 9,
        y: world.pacman.y = 16 
      }
      
    })
  }else{
    return make(world, {
        ghosthr:{
          x: world.ghosthr.x ,
          y: world.ghosthr.y = world.ghosthr.y + 1
        }
      })

  }
  }else if(MAPA[world.ghosthr.y ][world.ghosthr.x - 1] !== 2){ //mover izqq
    if(MAPA[world.ghosthr.y ][world.ghosthr.x - 1] == 3){
      MAPA[world.ghosthr.y ][world.ghosthr.x - 1] = 6 
      MAPA[world.ghosthr.y][world.ghosthr.x] = 3
     }else if(MAPA[world.ghosthr.y ][world.ghosthr.x - 1] == 0){
      MAPA[world.ghosthr.y ][world.ghosthr.x - 1] = 6 
      MAPA[world.ghosthr.y][world.ghosthr.x] = 0
        
     

    
  }else if(MAPA[world.ghosthr.y][world.ghosthr.x - 1] == 1){ //Verifica si esta el pacman
    MAPA[world.ghosthr.y][world.ghosthr.x - 1] = 5//Mueve el fantasma 
    MAPA[world.ghosthr.y][world.ghosthr.x] = 0 //Deja vacío
    pacD.play();
    pacD.volume = 0.06;
    MAPA[world.pacman.y][world.pacman.x] = 0
    if(MAPA[22][3] == "life"){
      MAPA[22][3] = 0
    }
    else if(MAPA[22][2] == "life"){
      MAPA[22][2] = 0
    }
    else if(MAPA[22][1] == "life"){
      MAPA[22][1] = 0
    }
    MAPA[16][9] = 1
    world.lifes = world.lifes -1
    return make(world, {
      pacman:{
        x: world.pacman.x = 9,
        y: world.pacman.y = 16 
      }
      
    })
  }else{
    return make(world, {
        ghosthr:{
          x: world.ghosthr.x = world.ghosthr.x - 1,
          y: world.ghosthr.y 
        }
      })

  }
  }else if(MAPA[world.ghosthr.y - 1][world.ghosthr.x] !== 2  ){// movimiento arriba
       if(MAPA[world.ghosthr.y - 1][world.ghosthr.x] == 3){
        MAPA[world.ghosthr.y - 1][world.ghosthr.x] = 6 
        MAPA[world.ghosthr.y][world.ghosthr.x] = 3 
       }else if(MAPA[world.ghosthr.y - 1 ][world.ghosthr.x ] == 4){
      MAPA[world.ghosthr.y - 1 ][world.ghosthr.x ] = 6
      MAPA[world.ghosthr.y][world.ghosthr.x] = 4
        }else if(MAPA[world.ghosthr.y - 1][world.ghosthr.x] == 1){ //Verifica si esta el pacman
          MAPA[world.ghosthr.y - 1][world.ghosthr.x] = 5//Mueve el fantasma 
          MAPA[world.ghosthr.y][world.ghosthr.x] = 0 //Deja vacío
          pacD.play();
          pacD.volume = 0.06;
          MAPA[world.pacman.y][world.pacman.x] = 0
          if(MAPA[22][3] == "life"){
            MAPA[22][3] = 0
          }
          else if(MAPA[22][2] == "life"){
            MAPA[22][2] = 0
          }
          else if(MAPA[22][1] == "life"){
            MAPA[22][1] = 0
          }
          MAPA[16][9] = 1
          world.lifes = world.lifes -1
          return make(world, {
            pacman:{
              x: world.pacman.x = 9,
              y: world.pacman.y = 16 
            }
            
          })
        }else{
      return make(world, {
        ghosthr:{
          x: world.ghosthr.x,
          y: world.ghosthr.y = world.ghosthr.y - 1 
        }
      })
    }

  }
  
 
 
}



/**
 * <sketchProc><library>----<?>
 * proposito: compila nuestro código y lo presenta en la ventana de visualización. Es lo mismo que pulsar el botón "PLAY".
 */
function sketchProc(processing) {
  
  processing.setup = function () {
    processing.frameRate(4); // FPS
    processing.size(WIDTH, HEIGHT);//Load canvas
    
    gblue = processing.loadImage("images/blue.png");//Carga un fantasma azul
    goran = processing.loadImage("images/orange.png");//Carga un fantasma naranja
    gpink = processing.loadImage("images/pink.png");//Carga un fantasma rosa
    gred = processing.loadImage("images/red.png");//Carga un fantasma rojo
    PACMANL= processing.loadImage("images/pacmanleft2.png");//Carga  imagen PacmanLeft  
    PACMANR = processing.loadImage("images/pacmanright2.png");//Carga  imagen PacmanRight 
    PACMANU = processing.loadImage("images/pacmanup2.png");//Carga  imagen PacmanUp
    PACMAND = processing.loadImage("images/pacmandown2.png");//Carga  imagen PacmanDown
    PACMANC = processing.loadImage("images/pacmanclose2.png");//Carga  imagen PacmanClose
    cherry = processing.loadImage("images/cherry.png"); //Carga imagen cereza 

    //Condiciones iniciales
    processing.state = {
      time:0,
      minutes:0,
      seconds:0,
      score:0,
      lifes:3,
      pacman:{x:9,y:16,dir:"L"},
      ghosthb:{x:2,y:2},
      ghostho:{x:9,y:10},
      ghosthp:{x:10,y:7},
      ghosthr:{x:15,y:20},
      
      
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

      //Dibuja el Pacman
        if(block == 1){
          if(world.pacman.dir == "L" /*&& world.time % 2 == 0*/){
            processing.image(PACMANL,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);
          }
          else if(world.pacman.dir == "R" /*&& world.time % 2 == 0*/){
            processing.image(PACMANR,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);
          }
          else if(world.pacman.dir == "U" /*&& world.time % 2 == 0*/){
            processing.image(PACMANU,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);
          }
          else if(world.pacman.dir == "D" /*&& world.time % 2 == 0*/){
            processing.image(PACMAND,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);
          }
          else{
            processing.image(PACMANC,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);  
          }
      }
    
        //Dibuja los bloques
        if(block == 2){
          processing.fill(0,255,0);
          processing.rect(j*BSIZE, i*BSIZE, BSIZE-2, BSIZE-2,5,5,5);
        }
        //Dibuja una galleta
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
        //Dibuja una galleta grande
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
        //Dibuja Vidas
        if(block == "life"){
          processing.fill(255, 255, 0); //Pacman Color
          processing.arc(j * BSIZE+BSIZE/2, 
            i * BSIZE+BSIZE/2, BSIZE, BSIZE,-Math.PI * 3 / 4, Math.PI * 3 / 4);
        }
        
        //Dibuja Fantasmas
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

        if(block == 9){
          processing.image(cherry,j * BSIZE,i * BSIZE,22,22) 
        }
  

       //ghost(world)
      });
    });
    
  

    /**
     * contrato:<textSize><num>-><?>
     * 	Establece el tamaño de fuente actual. El tamaño de fuente se mide en unidades de píxeles.
     */
    processing.textSize(20);
    //Dibuja texto en la pantalla. Muestra posición especificada por los parámetros adicionales
    
    processing.text("HIGH SCORE",220,500);
    processing.text(world.score,220,520); //Actualiza el puntaje y lo muestra en la interfaz

    const se = processing.second();
    const mi = processing.minute();
    const ho = processing.hour();
    var temp = processing.nf(ho,2) +":"+ processing.nf(mi,2) +":"+ processing.nf(se,2)

    processing.text(temp,110,500)

   if(world.time % 4 == 0){

    world.seconds = world.seconds + 1;

    if (world.seconds == 59){
      world.seconds = 0;
      world.minutes = world.minutes + 1;
    }
    if(world.minutes == 0 ){
      world.minutes = 0;
    }
  }

      if (world.seconds < 10){
      var secs = "0" + world.seconds;
      }
      else{
      var secs = world.seconds;
      }
      if(world.minutes < 10){
      var mins =  "0" + world.minutes;
      }else{
      var mins = world.minutes;
      }
      

      const temp1 = mins + ":" + secs;
      console.log(temp1)
      processing.text(temp1,110,520)
      
if (world.lifes == 0){

      window.location = "/restart.html?time="+temp1+"&score="+world.score;
    }
}

   
  
/**
* Contrato: <.onKeyEvent> <world> <keyCode> ---> <make>
* Propósito: realizar una acción específica cuando se presiona una tecla en el teclado.
 * 
 */
processing.onKeyEvent = function(world, keyCode){
  console.log(keyCode)

  if(keyCode != processing.LEFT && keyCode != processing.RIGHT && keyCode != processing.DOWN && keyCode != processing.UP){
    return  processing.state = {
      time:world.time,
      seconds: world.seconds,
      minutes: world.minutes,
      score:world.score,
      lifes:world.lifes,
      pacman:{x:world.pacman.x,y:world.pacman.y,dir:"R"},
      ghosthb:{x:world.ghosthb.x,y:world.ghosthb.y},
      ghostho:{x:world.ghostho.x,y:world.ghostho.y},
      ghosthp:{x:world.ghosthp.x,y:world.ghosthp.y},
      ghosthr:{x:world.ghosthr.x,y:world.ghosthr.y}
      }
  }


  if(keyCode == processing.LEFT  ){ //Representa hacia donde se dará el movimiento del pacman

    waka.play()
    waka.volume = 0.03;

    if( MAPA[world.pacman.y][world.pacman.x -  1] == 0){ //Mueve el pacman a la izquierda si no hay bloqueo
      MAPA[world.pacman.y][world.pacman.x -  1] = 1 //Reemplaza con 1 para representar la posición del pacman
      MAPA[world.pacman.y][world.pacman.x] = 0 //La posición anterior la deja vacía 
    return make(world, {
      pacman:{
        x: world.pacman.x - 1,
        y: world.pacman.y,
        dir: "L"
      }
    })
    }
    else if(MAPA[world.pacman.y][world.pacman.x - 1 ] == 3){ //Mueve el pacman a la izquierda y se come la galleta
      MAPA[world.pacman.y][world.pacman.x - 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x - 1,
          y: world.pacman.y,
          dir: "L"
        },
        score: world.score = world.score + 1
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x - 1 ] == 4){ //Mueve el pacman a la izquierda y se come la galleta
      MAPA[world.pacman.y][world.pacman.x - 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x - 1,
          y: world.pacman.y,
          dir: "L"
        },
        score: world.score = world.score + 20
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x - 1 ] == 11){ //Teletransporta el pacman del pasillo al izquierdo al  derecho
      MAPA[world.pacman.y][world.pacman.x - 1] = 11
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: 17,
          y: world.pacman.y,
          dir: "L"
        }
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x - 1 ]==5 || MAPA[world.pacman.y][world.pacman.x - 1 ]==6 || MAPA[world.pacman.y][world.pacman.x - 1 ]==7 || MAPA[world.pacman.y][world.pacman.x - 1 ]==8){
      
      pacD.play();
      pacD.volume = 0.06;
      MAPA[world.pacman.y][world.pacman.x] = 0
      MAPA[16][9] = 1
      
      console.log(world.lifes)

      if(MAPA[22][3] == "life"){
        MAPA[22][3] = 0
      }
      else if(MAPA[22][2] == "life"){
        MAPA[22][2] = 0
      }
      else if(MAPA[22][1] == "life"){
        MAPA[22][1] = 0
      }
      

      return  processing.state = {
      time:world.time,
      seconds: world.seconds,
      minutes: world.minutes,
      score:world.score,
      lifes:world.lifes - 1,
      pacman:{x:9,y:16,dir:"L"},
      ghosthb:{x:world.ghosthb.x,y:world.ghosthb.y},
      ghostho:{x:world.ghostho.x,y:world.ghostho.y},
      ghosthp:{x:world.ghosthp.x,y:world.ghosthp.y},
      ghosthr:{x:world.ghosthr.x,y:world.ghosthr.y}
    }
    }
    else{ //Si no ocurre ninguna de las anteriores es porque hay un bloque entonces no deja mover el pacman
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y,
          dir: "L"
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
        y: world.pacman.y,
        dir: "R"
      }
    })
    }
    else if(MAPA[world.pacman.y][world.pacman.x +1 ] == 3){
      MAPA[world.pacman.y][world.pacman.x + 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x + 1,
          y: world.pacman.y,
          dir: "R"
        },
        score: world.score = world.score + 1
      })
    }
    
    else if(MAPA[world.pacman.y][world.pacman.x +1 ] == 4){
      MAPA[world.pacman.y][world.pacman.x + 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x + 1,
          y: world.pacman.y,
          dir: "R"
        },
        score: world.score = world.score + 20
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x + 1 ] == 12){//Teletransporta el pacman del pasillo derecho al  izquierdo
      MAPA[world.pacman.y][world.pacman.x + 1] = 12
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: 1,
          y: world.pacman.y,
          dir: "R"
        }
      })
    }
    else if(MAPA[world.pacman.y][world.pacman.x + 1 ]==5 ||MAPA[world.pacman.y][world.pacman.x + 1 ]==6 || MAPA[world.pacman.y][world.pacman.x + 1 ]==7 || MAPA[world.pacman.y][world.pacman.x + 1 ]==8){
      
      pacD.play();
      pacD.volume = 0.06;
      MAPA[world.pacman.y][world.pacman.x] = 0
      MAPA[16][9] = 1

      if(MAPA[22][3] == "life"){
        MAPA[22][3] = 0
      }
      else if(MAPA[22][2] == "life"){
        MAPA[22][2] = 0
      }
      else if(MAPA[22][1] == "life"){
        MAPA[22][1] = 0
      }
      

      
      return  processing.state = {
        time:world.time,
        seconds: world.seconds,
        minutes: world.minutes,
        score:world.score,
        lifes:world.lifes - 1,
        pacman:{x:9,y:16,dir:"R"},
        ghosthb:{x:world.ghosthb.x,y:world.ghosthb.y},
        ghostho:{x:world.ghostho.x,y:world.ghostho.y},
        ghosthp:{x:world.ghosthp.x,y:world.ghosthp.y},
        ghosthr:{x:world.ghosthr.x,y:world.ghosthr.y}
      }
    }
    else if(MAPA[world.pacman.y][world.pacman.x + 1] == 9){ //Teletransporta el pacman del pasillo al izquierdo al  derecho
      MAPA[world.pacman.y][world.pacman.x + 1] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x + 1,
          y: world.pacman.y,
          dir: "R"
        }
      })
    }
    else{
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y,
          dir: "R"
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
        y: world.pacman.y - 1,
        dir: "U"
      }
    })
    }
    else if(MAPA[world.pacman.y - 1][world.pacman.x] == 3){
      MAPA[world.pacman.y - 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y - 1,
          dir: "U"
        },
        score: world.score = world.score + 1
      })
    }
    else if(MAPA[world.pacman.y - 1][world.pacman.x] == 4){
      MAPA[world.pacman.y - 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y - 1,
          dir: "U"
        },
        score: world.score = world.score + 20
      })
    }
    else if(MAPA[world.pacman.y - 1 ][world.pacman.x]==5 ||MAPA[world.pacman.y - 1 ][world.pacman.x]==6 || MAPA[world.pacman.y - 1 ][world.pacman.x]==7 || MAPA[world.pacman.y - 1 ][world.pacman.x]==8){
      
      pacD.play();
      pacD.volume = 0.06;
      MAPA[world.pacman.y][world.pacman.x] = 0
      MAPA[16][9] = 1

      if(MAPA[22][3] == "life"){
        MAPA[22][3] = 0
      }
      else if(MAPA[22][2] == "life"){
        MAPA[22][2] = 0
      }
      else if(MAPA[22][1] == "life"){
        MAPA[22][1] = 0
      }
    
      return  processing.state = {
        time:world.time,
        seconds: world.seconds,
        minutes: world.minutes,
        score:world.score,
        lifes:world.lifes - 1,
        pacman:{x:9,y:16,dir:"U"},
        ghosthb:{x:world.ghosthb.x,y:world.ghosthb.y},
        ghostho:{x:world.ghostho.x,y:world.ghostho.y},
        ghosthp:{x:world.ghosthp.x,y:world.ghosthp.y},
        ghosthr:{x:world.ghosthr.x,y:world.ghosthr.y}
      }
    }
    else if(MAPA[world.pacman.y - 1][world.pacman.x] == 9){ //Teletransporta el pacman del pasillo al izquierdo al  derecho
      MAPA[world.pacman.y - 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y - 1,
          dir: "U"
        }
      })
    }
    else{
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y,
          dir: "U"
        }
      })
    }
  }
  
  if(keyCode == processing.DOWN){
    waka.play()
    waka.volume = 0.03;

    if(world.time % 4 !== 0 ){
      processing.image(PACMAND,world.pacman.x * BSIZE,world.pacman.y * BSIZE,22,22);
    }


    if( MAPA[world.pacman.y + 1][world.pacman.x] == 0){
      MAPA[world.pacman.y + 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
    return make(world, {
      pacman:{
        x: world.pacman.x,
        y: world.pacman.y + 1,
        dir: "D"
      }
    })
    }
    else if(MAPA[world.pacman.y + 1][world.pacman.x] == 3){
      MAPA[world.pacman.y + 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y + 1,
          dir: "D"
        },
        score: world.score = world.score + 1
      })
    }
    else if(MAPA[world.pacman.y + 1][world.pacman.x] == 4){
      MAPA[world.pacman.y + 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y + 1,
          dir: "D"
        },
        score: world.score = world.score + 20
      })
    }
    else if(MAPA[world.pacman.y + 1 ][world.pacman.x]==5 ||MAPA[world.pacman.y + 1 ][world.pacman.x]==6 || MAPA[world.pacman.y + 1 ][world.pacman.x]==7 || MAPA[world.pacman.y + 1 ][world.pacman.x]==8){
      
      pacD.play();
      pacD.volume = 0.06;
      MAPA[world.pacman.y][world.pacman.x] = 0
      MAPA[16][9] = 1

     
      if(MAPA[22][3] == "life"){
        MAPA[22][3] = 0
      }
      else if(MAPA[22][2] == "life"){
        MAPA[22][2] = 0
      }
      else if(MAPA[22][1] == "life"){
        MAPA[22][1] = 0

      }
      
      
      return  processing.state = {
        time:world.time,
        seconds: world.seconds,
        minutes: world.minutes,
        score:world.score,
        lifes:world.lifes - 1,
        pacman:{x:9,y:16,dir:"D"},
        ghosthb:{x:world.ghosthb.x,y:world.ghosthb.y},
        ghostho:{x:world.ghostho.x,y:world.ghostho.y},
        ghosthp:{x:world.ghosthp.x,y:world.ghosthp.y},
        ghosthr:{x:world.ghosthr.x,y:world.ghosthr.y}
      }
    }
    else if(MAPA[world.pacman.y + 1][world.pacman.x] == 9){ //Teletransporta el pacman del pasillo al izquierdo al  derecho
      MAPA[world.pacman.y + 1][world.pacman.x] = 1
      MAPA[world.pacman.y][world.pacman.x] = 0
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y + 1,
          dir: "D"
        }
      })
    }
    else{
      return make(world, {
        pacman:{
          x: world.pacman.x,
          y: world.pacman.y,
          dir: "D"
        }
      })
    }
    }
  }
   
  

  /**
   * Cambia la posición del objeto moviendolo 1 unidad a la derecha. 
   */
  processing.onTic = function(world){
    console.log(world.time)
    
    
    
    if(world.time % 0.5 == 0 ){
    moveGhostP(world); moveGhostB(world);moveGhostR(world);moveGhostO(world);
    }

   
    return make(world, { time: world.time + 1 , 
    pacman: { x: world.pacman.x, y: world.pacman.y }
    });
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