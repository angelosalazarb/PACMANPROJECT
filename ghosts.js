function moveGhostD(world,map,ghost){
  var ghostin = ghost
   //Mover Abajo
   if(map[world.ghostin.y + 1][world.ghostin.x] !== 2){ //Verifica si no hay un bloque    

    if(map[world.ghostin.y + 1][world.ghostin.x] == 0){//Verifica si hay un vacío
      map[world.ghostin.y + 1][world.ghostin.x] = 5 //mueve el fantasma 
      map[world.ghostin.y][world.ghostin.x] = 0 //Deja el vacío 
    }
    else if(map[world.ghostin.y + 1][world.ghostin.x] == 3){ //Verifica si hay una galleta 
      
      map[world.ghostin.y + 1][world.ghostin.x] = 5 //Mueve el fantasma 
      map[world.ghostin.y][world.ghostin.x] = 3  //Deja galleta intacta

    }
    else if(map[world.ghostin.y + 1][world.ghostin.x] == 4){ //Verifica si hay una galleta grande
      map[world.ghostin.y + 1][world.ghostin.x] = 5//Mueve el fantasma 
      map[world.ghostin.y][world.ghostin.x] = 4 //Deja galleta intacta

    }
    else if(map[world.ghostin.y + 1][world.ghostin.x] == 9){ //Verifica si hay una galleta grande
      map[world.ghostin.y + 1][world.ghostin.x] = 5//Mueve el fantasma 
      map[world.ghostin.y][world.ghostin.x] = 9 //Deja galleta intacta

    }
    
    else{
      return make(world, {
        ghostin:{
          x: world.ghostin.x,
          y: world.ghostin.y
        }
      })
    }
    
  
    return make(world, {
      ghostin:{
        x: world.ghostin.x,
        y: world.ghostin.y = world.ghostin.y + 1 
      }
    })
  }
}












function moveGhost (world,mapa) {

  if (isValidFantasmaYellowDown(world,mapa) == true && world.fantasmaYellows.direxYellow != "UP") {

  if (world.pacman.yOne < world.fantasmaYellows.yYellow && isValidFantasmaYellowUp(world,mapa) == true && world.fantasmaYellows.direxYellow != "DOWN") {

  return {xYellow: world.fantasmaYellows.xYellow  , yYellow: world.fantasmaYellows.yYellow  - 1, direxYellow: "UP"};

  }else if (world.pacman.yOne > world.fantasmaYellows.yYellow && isValidFantasmaYellowDown(world,mapa) == true && world.fantasmaYellows.direxYellow != "UP") {

   return {xYellow: world.fantasmaYellows.xYellow  , yYellow: world.fantasmaYellows.yYellow  + 1, direxYellow: "DOWN"};

  }

  return {xYellow: world.fantasmaYellows.xYellow  , yYellow: world.fantasmaYellows.yYellow  + 1, direxYellow: "DOWN"};


  }else if (isValidFantasmaYellowUp(world,mapa) ==  true &&  world.fantasmaYellows.direxYellow != "DOWN") {

  return {xYellow: world.fantasmaYellows.xYellow  , yYellow: world.fantasmaYellows.yYellow  - 1, direxYellow: "UP"};

  }else if (isValidFantasmaYellowRight(world,mapa) == true  && world.fantasmaYellows.direxYellow != "LEFT") {

  if (world.pacman.xOne < world.fantasmaYellows.xYellow && isValidFantasmaYellowLeft(world,mapa) == true  && world.fantasmaYellows.direxYellow != "RIGHT") {

   return {xYellow: world.fantasmaYellows.xYellow  - 1, yYellow: world.fantasmaYellows.yYellow , direxYellow: "LEFT"};


  }else if (world.pacman.xOne > world.fantasmaYellows.xYellow && isValidFantasmaYellowRight(world,mapa) == true  && world.fantasmaYellows.direxYellow != "LEFT") {

    return {xYellow: world.fantasmaYellows.xYellow  + 1, yYellow: world.fantasmaYellows.yYellow , direxYellow: "RIGHT"};

  }
  return {xYellow: world.fantasmaYellows.xYellow  + 1, yYellow: world.fantasmaYellows.yYellow , direxYellow: "RIGHT"};


  }else if (isValidFantasmaYellowLeft(world,mapa) == true && world.fantasmaYellows.direxYellow != "RIGHT") {
   return {xYellow: world.fantasmaYellows.xYellow  - 1, yYellow: world.fantasmaYellows.yYellow , direxYellow: "LEFT"};

  }
  return {xYellow: world.fantasmaYellows.xYellow  -1 , yYellow: world.fantasmaYellows.yYellow  , direxYellow: "LEFT"};

  }