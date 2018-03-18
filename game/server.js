const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('dist'))


let items = [];
let highscore = 0;
let currentGameStatus= '';
let score = 0;
let power = false;
let moves = 0;
let powerCounter = 0;


function moveUp(index){
  if (index < 10) {
    let target = index + 90;
    console.log('target is ' + target);
    return target;
  } else {
    let target = index -10;
    console.log('target is ' + target);
    return target;
  }
}
function moveDown(index){
  if (index > 89) {
    let target =  index - 90;
    console.log('target is ' + target);
    return target;
  } else {
    let target = index +10;
    console.log('target is ' + target);
    return target;
  }
}
function moveLeft(index){
  if (index % 10 == 0) {
    let target = index + 9;
    console.log('target is ' + target);
    return target;
  } else {
    let target = index -1;
    console.log('target is ' + target);
    return target;

  }
}
function moveRight(index){
  if (index % 10 == 9) {
    let target = index - 9;
    console.log('target is ' + target);
    return target;
  } else {
    let target =  index + 1;
    console.log('target is ' + target);
    return target;
  }
}

function swap(index, target){
  if (target === undefined || target === -1){
    console.log("target of swap is undefined or -1");
    return;
  }
  if (index === undefined || index === -1){
    console.log("index in swap is undefined or -1");
    return;
  }
  console.log('target is defined in swap as ' + target);
  let object = items[index];
  let check = items[target];
  if (object === 'you'){
    if (check === 'empty'){
      items[index] = 'empty';
      items[target] = object;
      score += 10;
      theyMove(target);
    } else if (check === 'power'){
      items[index] = 'empty';
      items[target] = object;
      power = true;
      score += 10;
      powerStart();
      theyMove(target);
    } else if (check === 'them'){
      if (!power){
        items[index] = 'empty';
        currentGameStatus = 'lost';
        score += 10;
        endGame();
      } else {
        items[index] = 'empty';
        items[target] = object;
        score += 30;
        theyMove(target);
      }
    } else if (check === 'goal'){
      items[index] = 'empty';
      items[target] = object;
      currentGameStatus = 'won';
      score += 50;
      endGame();
    } else {
      console.log("unidentified tile " + check + " at " + target);
      console.log(items);
      return;
    }
  } else if (object === 'them'){
    if (check === 'empty'){
      items[index] = 'empty';
      items[target] = object;

    } else if (check === 'power'){
      items[index] = 'empty';
      items[target] = object;

    } else if (check === 'them'){
      //they don't move if they would run into eachother

    } else if (check==='you'){
      if (power === false){
        items[index] = 'empty';
        items[target] = object;
        currentGameStatus = 'lost';
        endGame();
      } else {
        items[index] = 'empty'
        score += 20;
      }
    } else if (check == 'goal'){
      //they can't stand on goal
    } else {
      console.log("unidentified tile " + check + " at " + target);
      console.log(items);
      return;
    }
  }
}

function powerStart(){
  powerCounter = 5;
  power = true;
}

function moveItems(move){
  if (currentGameStatus != 'playing'){
    console.log("don't move when you aren't playing.");
    return false;
  }
  console.log('moving item');
  let index = items.indexOf('you');
  console.log('you are at index ' + index);
  if (index < 0 || index > 99){
    console.log("You are out of bounds");
    return;
  }
  if (move === 'left'){
    swap(index, moveLeft(index));
  } else if (move  === 'right') {
    swap(index, moveRight(index));
  } else if (move === 'up'){
    swap(index, moveUp(index));
  }else if (move === 'down'){
    swap(index, moveDown(index));
  }else {
    console.log("move direction not recognized");
    console.log(move);
    return;
  }

  moves ++;

  powerCounter--;
  if (powerCounter < 0) power = false;

  if (moves === 10){
    addRandom('goal');
  }
  if (moves %7 == 0){
    let themCount = 0;
    let powerCubes = 0;
    for (let i=0; i<items.length; i++){
      if (items[i] === 'power') powerCubes +=1;
      if (items[i] === 'them') themCount +=1;
    }

    addThem();
    if (themCount < moves/10){
      addThem();
    }
    if (themCount === 0){
      addThem();
    }


    if (powerCubes < 1){
      addRandom('power');
    }
  }

  return true;
}

function addThem() {
  if (items[0] === 'empty'){
    items[0] = 'them';
  } else if (items[9] === 'empty'){
    items[9] = 'them';
  } else if (items[99] === 'empty'){
    items[99] = 'them';
  }
}

function addRandom(text) {
  let found = false;
  let spot = -1;
  while (!found){
    spot = Math.floor(Math.random() * 100);
    if (items[spot] === 'empty'){
      found = true;
    }
  }
  items[spot] = text;
}

function endGame() {
  if (currentGameStatus == 'won'){
    console.log("You won!");
  } else if (currentGameStatus == 'lost'){
    console.log("You died :(");
  } else {
    console.log("End of game, but not sure why");
  }

  if (score > highscore){
    highscore = score;
  }

  return true;
}

theyMove = function(you) {
  indices = [];
  for (var i=0; i<100; i++){
    if (items[i]== 'them'){
      indices.push(i);
    }
  }

  for (var i=0; i<indices.length; i++){
    let distance = indices[i] - you;
    let targetx = you % 10;
    let themx = indices[i] % 10;
    let targety = parseInt(you / 10);
    let themy = parseInt(indices[i] / 10);

    let distancex = Math.abs(themx - targetx);
    let distancey = Math.abs(themy - targety);
    //TODO add wrap-around world logic.
    console.log('index of them is ' + indices[i]);
    if (distancex > distancey){
      if (themx - targetx > 0){
        swap(indices[i], moveLeft(indices[i]));
      } else {
        swap(indices[i], moveRight(indices[i]));
      }
    } else {
      if (themy - targety > 0){
        swap(indices[i], moveUp(indices[i]));
      } else {
        swap(indices[i], moveDown(indices[i]));
      }
    }
  }
}

app.get('/api/setup', (req, res) => {
  items = [];
  score = 0;
  moves = 0;
  for (var i=0; i<100; i++){
    items.push('empty');
  }
  items[44] = 'you';
  items[0] = 'them';
  items[9] = 'them';
  items[90] = 'power';
  console.log('finished setting up.')
  currentGameStatus = 'playing';
  res.send({
    items: items,
    highscore:highscore,
    status: currentGameStatus,
    score: score,
    power: power,
    moves: moves
  });
});

app.get('/api/items', (req, res) => {
  res.send({
    items: items,
    highscore:highscore,
    status: currentGameStatus,
    score: score,
    power: power,
    moves: moves
  });
});

app.put('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let itemsMap = items.map(item => { return item.id; });
  let index = itemsMap.indexOf(id);
  let item = items[index];
  item.text = req.body.text;
  // handle drag and drop re-ordering
  // if (req.body.orderChange) {
  //   let indexTarget = itemsMap.indexOf(req.body.orderTarget);
  //   items.splice(index,1);
  //   items.splice(indexTarget,0,item);
  // }
  res.send(item);
});

app.post('/api/items', (req, res) => {
  id = id + 1;
  let item = {id:id, text:req.body.text};
  items.push(item);
  res.send(item);
});

app.post('/api/move', (req, res) => {
  let move = req.body.direction;
  console.log('moving' + move);
  if (currentGameStatus === 'playing' && moveItems(move)) {
    res.send({
      items: items,
      highscore:highscore,
      status: currentGameStatus,
      score: score,
      power: power,
      moves: moves
    });
  } else {
    res.sendStatus(400);
  }
});

app.delete('/api/items/:id', (req, res) => {
  let id = parseInt(req.params.id);
  let removeIndex = items.map(item => { return item.id; }).indexOf(id);
  if (removeIndex === -1) {
    res.status(404).send("Sorry, that item doesn't exist");
    return;
  }
  items.splice(removeIndex, 1);
  res.sendStatus(200);
});

app.listen(3003, () => console.log('Server listening on port 3003!'))
