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

app.get('/api/setup', (req, res) => {
  items = [];
  for (var i=0; i<100; i++){
    items.push('empty');
  }
  console.log(items);

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
