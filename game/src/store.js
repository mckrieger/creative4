import Vue from 'vue';
import Vuex from 'vuex';

import axios from 'axios';

Vue.use(Vuex);

const store= new Vuex.Store({
  state: {
    items: [],
    score: 0,
    power: '',
  },
  getters: {
    items: state => state.items,
  },
  mutations: {
    setupItems(){
      console.log("setting up");
      axios.get("/api/setup").then(response => {
        console.log("got Response");
        console.log(response.data);
        context.commit('setItems', response.data);
      	state.items= response.data;
        console.log(state.items);
      	return true;
      }).then(console.log(this.getters.items)).catch(err => {
      });
    },
    setItems (state, items) {
      state.items = items;
    },
    getItems(context) {
      console.log("getting items");
      axios.get("/api/items").then(response => {
	context.commit('setItems', response.data);
	return true;
      }).catch(err => {
      });
    },
    addItem(context, item) {
      axios.post("/api/items", item).then(response => {
	return context.dispatch('getItems');
      }).catch(err => {
      });
    },
    updateItem(context, item) {
      axios.put("/api/items/" + item.id, item).then(response => {
	return true;
      }).catch(err => {
      });
    },
    deleteItem(context, item) {
      axios.delete("/api/items/" + item.id).then(response => {
	return context.dispatch('getItems');
      }).catch(err => {
      });
    }
  },
  actions: {
  }
});
export default store;
