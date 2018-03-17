import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const store= new Vuex.Store({
  state: {
    items: ['empty','empty','you'],
    score: 0,
    power: '',
  },
  getters: {
    items: state => state.items,
  },
  mutations: {
    setItems: (state, {items}) => {
      state.items = items;
      console.log('items have been set');
    },
  },
  actions: {
    setupItems: function(){
      console.log("setting up");
      axios.get("/api/setup").then(response => {
        console.log("got Response");
        console.log(response.data);
        commit('setItems', {items:response.data});
      	return true;
      }).then(console.log(this.getters.items)).catch(err => {
      });
    },
    getItems: function(context) {
      console.log("getting items");
      axios.get("/api/items").then(response => {
        console.log('have items');
	       context.commit('setItems', {items: response.data});
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
