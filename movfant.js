

/**
 * 
 * Purpose: realiza el movimiento de los fantasmas bloque por bloque
 * 
 */

function ghost(world){
  if( world.ghosthr.y ==  20 && world.ghosthr.x == 16){
   /* MAPA[world.ghosthr.y][world.ghosthr.x-1]=6
    MAPA[world.ghosthr.y][world.ghosthr.x]=0
    make(world, {
      ghosthr:{
        x:world.ghosthr.x-1,
        y:world.ghosthr.y
      }
    })*/
    world.direRojo.x = -1,
    world.direRojo.y = 0,
  }
}


// fantasma morao
      if(MAPA[world.ghosthp.y - 1][world.ghosthp.x] !== 2){
       if(MAPA[world.ghosthp.y - 1][world.ghosthp.x] == 0){
        MAPA[world.ghosthp.y - 1][world.ghosthp.x] = 8 
        MAPA[world.ghosthp.y][world.ghosthp.x] = 0 
        }else{
      return make(world, {
        ghosthp:{
          x: world.ghosthp.x,
          y: world.ghosthp.y = world.ghosthp.y - 1 
        }
      })
    }   

      }

      //function moveGhostP(world){
   if(MAPA[world.ghosthp.y - 1][world.ghosthp.x] !== 2){
       if(MAPA[world.ghosthp.y - 1][world.ghosthp.x] == 0){
        MAPA[world.ghosthp.y - 1][world.ghosthp.x] = 8 
        MAPA[world.ghosthp.y][world.ghosthp.x] = 0 
        }else{
      return make(world, {
        ghosthp:{
          x: world.ghosthp.x,
          y: world.ghosthp.y = world.ghosthp.y - 1 
        }
      })
    }

  }else if(MAPA[world.ghosthp.y ][world.ghosthp.x +1] !== 2){
    if(MAPA[world.ghosthp.y ][world.ghosthp.x + 1] == 0){
        MAPA[world.ghosthp.y ][world.ghosthp.x + 1] = 8 
        MAPA[world.ghosthp.y][world.ghosthp.x] = 0 
        
     }else{
      return make(world, {
        ghosthp:{
          x: world.ghosthp.x + 1,
          y: world.ghosthp.y 
        }
      })
  }

  }
  else if(MAPA[world.ghosthp.y + 1][world.ghosthp.x] !== 2){
    if(MAPA[world.ghosthp.y + 1][world.ghosthp.x ] == 0){
       MAPA[world.ghosthp.y + 1][world.ghosthp.x ] = 8 

  }else{
    return make(world, {
        ghosthp:{
          x: world.ghosthp.x,
          y: world.ghosthp.y + 1 
        }
      })
      
  }
  }
}



function moveGhostO(world){
  
   //Mover Abajo
   if(MAPA[world.ghostho.y + 1][world.ghostho.x] !== 2){ //Verifica si no es un bloque    

    if(MAPA[world.ghostho.y + 1][world.ghostho.x] == 0){//Verifica si hay un vacío
      MAPA[world.ghostho.y + 1][world.ghostho.x] = 7 //mueve el fantasma 
      MAPA[world.ghostho.y][world.ghostho.x] = 0 //Deja el vacío 
    }
    else if(MAPA[world.ghostho.y + 1][world.ghostho.x] == 3){ //Verifica si hay una galleta 
      
      MAPA[world.ghostho.y + 1][world.ghostho.x] = 7 //Mueve el fantasma 
      MAPA[world.ghostho.y][world.ghostho.x] = 3  //Deja galleta intacta

    }
    else if(MAPA[world.ghostho.y + 1][world.ghostho.x] == 4){ //Verifica si hay una galleta grande
      MAPA[world.ghostho.y + 1][world.ghostho.x] = 7//Mueve el fantasma 
      MAPA[world.ghostho.y][world.ghostho.x] = 4 //Deja galleta intacta

    }
    else if(MAPA[world.ghostho.y + 1][world.ghostho.x] == 9){ //Verifica si hay una galleta grande
      MAPA[world.ghostho.y + 1][world.ghostho.x] = 7//Mueve el fantasma 
      MAPA[world.ghostho.y][world.ghostho.x] = 9 //Deja galleta intacta

    }
    
    else{
      return make(world, {
        ghostho:{
          x: world.ghostho.x,
          y: world.ghostho.y = world.ghostho.y - 1 
        }
      })
    }
    
  
    return make(world, {
      ghostho:{
        x: world.ghostho.x,
        y: world.ghostho.y = world.ghostho.y + 1 
      }
    })
  }
  //Mover derecha
  else if(MAPA[world.ghostho.y][world.ghostho.x + 1] !== 2 && world.seconds < 5 || world.seconds>13){

    if(MAPA[world.ghostho.y][world.ghostho.x + 1] == 0){//Verifica si hay un vacío
      MAPA[world.ghostho.y][world.ghostho.x + 1] = 7 //mueve el fantasma 
      MAPA[world.ghostho.y][world.ghostho.x] = 0 //Deja el vacío 
    }
    else if(MAPA[world.ghostho.y][world.ghostho.x + 1] == 3){ //Verifica si hay una galleta 
      
      MAPA[world.ghostho.y][world.ghostho.x + 1] = 7 //Mueve el fantasma 
      MAPA[world.ghostho.y][world.ghostho.x] = 3  //Deja galleta intacta

    }
    else if(MAPA[world.ghostho.y][world.ghostho.x + 1] == 4){ //Verifica si hay una galleta grande
      MAPA[world.ghostho.y][world.ghostho.x + 1] = 7//Mueve el fantasma 
      MAPA[world.ghostho.y][world.ghostho.x] = 4 //Deja galleta intacta

    }
    else if(MAPA[world.ghostho.y][world.ghostho.x + 1] == 9){ //Verifica si hay una galleta grande
      MAPA[world.ghostho.y][world.ghostho.x + 1] = 7//Mueve el fantasma 
      MAPA[world.ghostho.y][world.ghostho.x] = 9 //Deja galleta intacta

    }

    else if(MAPA[world.ghostho.y][world.ghostho.x + 1] == 2){ //Verifica si hay un bloque
      return make(world, {
        ghostho:{
          x: world.ghostho.x,
          y: world.ghostho.y
        }
      })
    }
    
    
        return make(world, {
          ghostho:{
            x: world.ghostho.x = world.ghostho.x + 1,
            y: world.ghostho.y 
          }
        })
      }

      //Mover Izquierda  
      else if(MAPA[world.ghostho.y + 1][world.ghostho.x] == 2 && world.seconds > 5){

        
        if(MAPA[world.ghostho.y][world.ghostho.x - 1] == 0){//Verifica si hay un vacío
          MAPA[world.ghostho.y][world.ghostho.x - 1] = 7 //mueve el fantasma 
          MAPA[world.ghostho.y][world.ghostho.x] = 0 //Deja el vacío 
        }
        else if(MAPA[world.ghostho.y][world.ghostho.x - 1] == 3){ //Verifica si hay una galleta 
          
          MAPA[world.ghostho.y][world.ghostho.x - 1] = 7 //Mueve el fantasma 
          MAPA[world.ghostho.y][world.ghostho.x] = 3  //Deja galleta intacta

        }
        else if(MAPA[world.ghostho.y][world.ghostho.x - 1] == 4){ //Verifica si hay una galleta grande
          MAPA[world.ghostho.y][world.ghostho.x - 1] = 7//Mueve el fantasma 
          MAPA[world.ghostho.y][world.ghostho.x] = 4 //Deja galleta intacta

        }
        else if(MAPA[world.ghostho.y][world.ghostho.x - 1]== 9){ //Verifica si hay una galleta grande
          MAPA[world.ghostho.y][world.ghostho.x - 1] = 7//Mueve el fantasma 
          MAPA[world.ghostho.y][world.ghostho.x] = 9 //Deja galleta intacta

        }
        else if(MAPA[world.ghostho.y][world.ghostho.x - 1]== 2){ //Verifica si hay una galleta grande
          return make(world, {
            ghostho:{ 
              x: world.ghostho.x,
              y: world.ghostho.y
            }
          })
        }
        
        return make(world, {
          ghostho:{
            x: world.ghostho.x = world.ghostho.x - 1,
            y: world.ghostho.y
          }
        })
      }    
      
}




function moveGhostP(world){// fantasma purpura
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
      MAPA[world.ghosthp.r + 1 ][world.ghosthr.x ] = 6 
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


  }else{
    return make(world, {
        ghosthr:{
          x: world.ghosthr.x ,
          y: world.ghosthr.y = world.ghosthr.y + 1
        }
      })

  }
  }else if(MAPA[world.ghosthr.y ][world.ghosthr.x - 1] !== 2){
    if(MAPA[world.ghosthr.y ][world.ghosthr.x - 1] == 3){
      MAPA[world.ghosthr.y ][world.ghosthr.x - 1] = 6 
      MAPA[world.ghosthr.y][world.ghosthr.x] = 3
     }else if(MAPA[world.ghosthr.y ][world.ghosthr.x - 1] == 0){
      MAPA[world.ghosthr.y ][world.ghosthr.x - 1] = 6 
      MAPA[world.ghosthr.y][world.ghosthr.x] = 0
        
     

    
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
