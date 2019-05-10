/*----- constants -----*/ 
const COLOR ={
  '0':'#FF997A',
  '2':'#EF7AFF',
  '4':'rgb(254, 7, 245)',
  '8':'#E85D99',
  '16':'#EB3360',
  '32':'red',
  '64':'#EB5608',
  '128':'#EB8A1D',
  '256':'#EBE37E',
  '512':'#EBEA08',
  '1024':'#EBEA08',
  '2048':'#EBEA08'

}

/*----- app's state (variables) -----*/ 
//TODO update newTileX, newTileY;
var board, highScore, newTileX, newTileY;


/*----- cached element references -----*/ 
//TODO check looser logic
 let lose = document.getElementById('lose');


/*----- event listeners -----*/  

document.onkeydown = function(evt) {
  switch (evt.keyCode){
    case 37:
      board = left(board);
      board = addTwo(board);
      losing(board);
      render();
        break;
    case 39:
      board = right(board);
      board = addTwo(board);
      losing(board);
      render()
        break;  
    case 38:
      board = up(board);
      board = addTwo(board);
      losing(board);
      render();
        break;
    case 40:
      board = down(board);
      board = addTwo(board);
      losing(board);
      render(); 
  }
}

function randomNum(max){
  return Math.floor(Math.random()* Math.floor(max));
}

function fullBoard(fboard){
  count=0;
  for(i = 0; i < fboard.length; i++){
    for(j = 0; j < fboard.length; j++){
      if (fboard[i][j]){
        count++;
      }
    }
  }

return count===16;
}

function addTwo(a2board){

  while(!fullBoard(a2board)){
    let ranRowIx = randomNum(4);
    let ranColIx = randomNum(4);
    if (!a2board[ranRowIx][ranColIx]){
        a2board[ranRowIx][ranColIx]= 2;
        break;
    } 
  }
  return a2board;
}

function losing(board){
  for(i = 0; i < board.length; i++){
    if (board[i].includes(0)) {
      return false;
    }
  }

  for(i = 0; i < board.length; i++){
    for(j = 0; j < board.length-1; j++){
        if(board[i][j] === board[i][j+1]){
        return false;
      } else if(board[j][i]===board[j+1][i]){
        return false;
      }
    }
  }
  lose.innerText = 'Try again!';
  return true;
}

/*----- functions -----*/
init();

function render(){
  board.forEach(function(colArr,rowIdx){
    colArr.forEach(function(tile,colIdx){
      const htmlCell = document.getElementById(`c${colIdx}r${rowIdx}`);
      arrayCell =  board[rowIdx][colIdx];
      htmlCell.textContent = arrayCell;
      htmlCell.style.background = COLOR[arrayCell];
      if(arrayCell===0){
        htmlCell.style.color = "#FF997A";
      } else {
        htmlCell.style.color = "white";
      }
    })
  })
}
render();

function init(){

  board = [
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0],
  ]; 

  function randomNum(max){
    return Math.floor(Math.random()* max);
  }

  let ranRowIx1 = randomNum(4);
  let ranColIx1 = randomNum(4);
  let ranRowIx2 = randomNum(4);
  let ranColIx2 = randomNum(4);

  //TODO add check for 1st two tiles being placed at the same spot
  for(let rowIx = 0; rowIx <= board.length-1; rowIx++){
    for(let colIx = 0; colIx <= board.length-1; colIx++){
      if (rowIx === ranRowIx1 && colIx === ranColIx1){
        board[rowIx][colIx]= 2;
      } 
      if (rowIx === ranRowIx2 && colIx === ranColIx2){
        board[rowIx][colIx]= 2;
      }
    }
  }
  return board;  
};

//LEFT//

function left(lBoard){  
  while(!endLeft(lBoard)) {
      roundLeft(lBoard);
  } 
  addLeft(lBoard);
  return lBoard;
} 

function endLeft(elboard) {
  for(let idx = 0; idx < elboard.length; idx++) {
    array = elboard[idx];
    for (let i = 0; i < array.length; i++) { 
      let a = array[i];
      let b = array[i+1];
      if (a==false && b) {
        //round is still going
        return false;
      } 
    }  
  }
  //round is over
  return true;  
}

function roundLeft(rlboard) {
  rlboard.forEach(function(array) {
    for (let i = 0; i < 3; i++) {
      let a = array[i];
      let b = array[i+1];
      if (a && b) {
        array[i] = array[i];
        array[i+1] = array[i+1];
      } else if (b) {
        array[i] = array[i+1];
        array[i+1] = a;
      }
    }
  })
  return rlboard;
}

function addLeft(newLBoard) {
  for(let idx = 0; idx <= newLBoard.length-1; idx++) {
    array = newLBoard[idx];
    for (let i = 0; i <= newLBoard.length-1; i++) {
      let a = array[i];
      let b = array[i+1];
      if (a===b) {
        array[i] = array[i] + array[i+1];
        array.splice([i+1],1);
        array.push(0);
      }
    } 
  }
  return newLBoard;
}

//RIGHT//

function right(rboard){
  while(!endRight(rboard)) {
      roundRight(rboard);
  } 
  addRight(rboard);
  return rboard;
}

function endRight(erboard) {
  for (let idx = 0; idx < erboard.length-1; idx++) {
    let array = erboard[idx];
    for (let i = 0; i < array.length-1; i++) { 
      let a = array[i];
      let b = array[i+1];
      if (a && b==false) {
        return false;
      } 
    }  
  }
  return true;  
}

function roundRight(rrboard) {
  rrboard.forEach(function(array) {
    for (let i = array.length-1; i > 0; i--) {
      let a = array[i];
      let b = array[i-1];
      if (a && b) {
        array[i] = array[i];
        array[i-1] = array[i-1];
      } else if (b) {
        array[i] = array[i-1];
        array[i-1] = a;
      }
    }
  })
  return rrboard;
}

function addRight(newRBoard) {
  for(idx=0; idx< newRBoard.length; idx++) {
    let array = newRBoard[idx];
    for (i = array.length - 1; i > 0; i--) {
      let a = array[i-1];
      let b = array[i];
      if (a===b) {
        array[i] = array[i] + array[i-1];
        array.splice([i-1],1);
        array.unshift(0);
      }
    } 
  } 
return newRBoard;
}

//DOWN//

function down(dboard) {
  while(!endDown(dboard)) {
    roundDown(dboard);
    } 
    addDown(dboard); 
  while(!endDown(dboard)){
    roundDown(dboard);
  }
  return dboard;     
}

function endDown(edboard) {
  for(let arrIdx = 0; arrIdx < edboard.length; arrIdx++) {
    for(let elIdx = 0; elIdx < edboard.length-1; elIdx++) { 
      let a = edboard[elIdx][arrIdx];
      let b = edboard[elIdx+1][arrIdx];
      if (a && b==false) {
        return false;
      } 
    }  
  }
  return true;  
}

function roundDown(rdboard) {
  for(let arrIdx = 0; arrIdx < rdboard.length; arrIdx++) {
    for (let elIdx = 0; elIdx < rdboard.length-1; elIdx++) {
      let a = rdboard[elIdx][arrIdx];
      let b = rdboard[elIdx+1][arrIdx];
      if (a && !b) {
        rdboard[elIdx][arrIdx] = rdboard[elIdx+1][arrIdx];
        rdboard[elIdx+1][arrIdx] = a;
      }
    }
  }
  return rdboard;
}

function addDown(newDBoard) {
  for(let elIdx = newDBoard.length-1; elIdx >= 0; elIdx--) {
    for(let arrIdx = newDBoard[elIdx].length-1; arrIdx > 0; arrIdx--) {
      let a = newDBoard[arrIdx][elIdx]; 
      let b = newDBoard[arrIdx-1][elIdx];
      if (a==b) {
          newDBoard[arrIdx][elIdx] = newDBoard[arrIdx][elIdx] + board[arrIdx-1][elIdx];
          newDBoard[arrIdx-1][elIdx] = 0;
      }
    } 
  }
  return newDBoard; 
}  

//UP//

function up(uboard) { 
  while(!endUp(uboard)){
      roundUp(uboard);
    }
      addUp(uboard);
    while(!endUp(uboard)){
      roundUp(uboard);
      }
  return uboard;    
  } 

function endUp(euboard) {
  for(let arrIdx = 0; arrIdx < euboard.length; arrIdx++) {
    for (let elIdx = 0; elIdx < euboard.length-1; elIdx++) {
      let a = euboard[elIdx][arrIdx];
      let b = euboard[elIdx+1][arrIdx];
      if (a==false && b) {
          return false;
      }
    }
  }
  return true;
}

function roundUp(ruboard) {
  for(let arrIdx = 0; arrIdx < ruboard.length; arrIdx++) {
    for (let elIdx = 0; elIdx < ruboard.length-1; elIdx++) {
      a = ruboard[elIdx][arrIdx];
      b = ruboard[elIdx+1][arrIdx];
      if (a==false && b) {
          ruboard[elIdx][arrIdx] = ruboard[elIdx+1][arrIdx];
          ruboard[elIdx+1][arrIdx] = a;
      }
    }
  }
  return ruboard;
}

function addUp(newUboard) {
  for(let arrIdx = 0; arrIdx < newUboard.length; arrIdx++) {
    for (let elIdx = 0; elIdx < newUboard.length-1; elIdx++) {
      let a = newUboard[elIdx][arrIdx];
      let b = newUboard[elIdx+1][arrIdx];
      if (a===b) {
        newUboard[elIdx][arrIdx] = newUboard[elIdx][arrIdx] + newUboard[elIdx+1][arrIdx];
        newUboard[elIdx+1][arrIdx] =0;
      }
    } 
  } 
  return newUboard;
}
  