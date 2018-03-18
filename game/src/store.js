import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const store= new Vuex.Store({
  state: {
    items: [],
    score: 0,
    power: false,
    highscore: 0,
    status: 'playing',
    moves: 0,
  },
  getters: {
    items: state => state.items,
    score: state => state.score,
    power: state => state.power,
    highscore: state => state.highscore,
    status: state => state.status,
    moves: state => state.moves,
  },
  mutations: {
    setItems: (state, data) => {
      state.items = data.items;
      state.score = data.score;
      state.power = data.power;
      state.highscore = data.highscore;
      state.moves = data.moves;
      state.status = data.status;

      console.log('items have been set');
    },
  },
  actions: {
    setupItems: function(){
      console.log("setting up");
      axios.get("/api/setup").then(response => {
        console.log("got Response");
        console.log(response.data);
        context.commit('setItems', response.data);
        console.log('pickMe');
      }).catch(err => {
      });
    },
    getItems: function(context) {
      console.log("getting items");
      axios.get("/api/items").then(response => {
        console.log('have items');
	       context.commit('setItems', response.data);
         console.log('no, me');
      }).catch(err => {
      });
    },
    addItem: function(context, item) {
      axios.post("/api/items", item).then(response => {
	       dispatch('getItems');
      }).catch(err => {
      });
    },
    updateItem: function(context, item) {
      axios.put("/api/items/" + item.id, item).then(response => {
	       dispatch('getItems');
      }).catch(err => {
      });
    },
    deleteItem: function(context, item) {
      axios.delete("/api/items/" + item.id).then(response => {
	       dispatch('getItems');
      }).catch(err => {
      });
    },
    makeMove: function(context, move) {
      axios.post("/api/move", {direction:move}).then(response => {
        context.dispatch('getItems');
      }).catch(err=> {
        console.log(err);
      });
    }
  }
});
export default store;
