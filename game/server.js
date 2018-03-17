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
function moveUp(index){
  if (index - 10 < 0) {
    target = index + 90;
  } else {
    target = index -10;
  }
}
function moveDown(index){
  if (index + 10 > 99) {
    target = index - 90;
  } else {
    target = index +10;
  }
}
function moveLeft(index){
  if (index % 10 == 0) {
    target = index + 9;
  } else {
    target = index -1;
  }
}
function moveRight(index){
  if (index % 10 == 9) {
    target = index - 9;
  } else {
    target = index + 1;
  }
}

function swap(index, target){
  let object = items[index];
  let check = items[target];
  if (object == 'you'){
    if (check == 'empty'){
      items[index] = 'empty';
      items[target] = object;
      theyMove(target);
    } else if (check == 'power'){
      items[index] = 'empty';
      items[target] = object;
      power = true;
      theyMove(target);
    } else if (check == 'them'){
      items[index] = 'empty';
      currentGameStatus = 'lost';
      endGame();
    } else if (check == 'goal'){
      items[index] = 'empty';
      items[target] = object;
      currentGameStatus = 'won';
      endGame();
    } else {
      console.log("unidentified tile");
      return;
    }
  } else if (object == 'them'){
    if (check == 'empty'){
      items[index] = 'empty';
      items[target] = object;

    } else if (check == 'power'){
      items[index] = 'empty';
      items[target] = object;

    } else if (check == 'them'){
      //they don't move if they would run into eachother

    } else if (check=='you'){
      items[index] == 'empty';
      items[target] == object;
      currentGameStatus = 'lost';
      endGame();
    } else if (check == 'goal'){
      //they can't stand on goal
    } else {
      console.log("unidentified tile");
      return;
    }
  }
}
moveItems = function(move){
  let index = items.indexOf('you');
  let target;
  if (index < 0 || index > 99){
    console.log("You are out of bounds");
    return;
  }
  if (move === 'left'){
    moveLeft(index);
  } else if (move  === 'right') {
    moveRight(index);
  } else if (move === 'up'){
    moveUp(index);
  }else if (move === 'down'){
    moveDown(index);
  }else {
    console.log("move direction not recognized");
    console.log(move);
    return;
  }

  score += 10;
  moves ++;
}

endGame = function() {
  if (currentGameStatus == 'won'){
    console.log("You won!");
  } else if (currentGameStatus == 'lost'){
    console.log("You died :(");
  } else {
    console.log("End of game, but not sure why");
  }
}

theyMove = function(you) {
  indices = [];
  for (var i=0; i<100; i++){
    if (items[i]== 'them'){
      indices.push(i);
    }
  }

  for (var i=0; i<indices.length; i++){
    let distance = indices[i] -target;
    let targetx = target % 10;
    let themx = indices[i] % 10;
    let targety = parseInt(target / 10);
    let themy = parseInt(indices[i] / 10);

    let distancex = Math.abs(themx - targetx);
    let distancey = Math.abs(themy - targety);
    //TODO add wrap-around world logic.
    if (distancex > distancey){
      if (themx - targetx > 0){
        moveLeft(indices[i]);
      } else {
        moveRight(indices[i]);
      }
    } else {
      if (themy - targety > 0){
        moveUp(indices[i]);
      } else {
        moveDown(indices[i]);
      }
    }
  }
}

function moveDown(index){
  object = items[index];
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
  res.send(items);
});

app.get('/api/items', (req, res) => {
  res.send(items);
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
  moveItems(move);
  res.send(items);
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
