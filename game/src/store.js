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
    setItems: (state, items) => {
      state.items = items;
    },
  },
  actions: {
    setupItems(){
      console.log("setting up");
      axios.get("/api/setup").then(response => {
        console.log("got Response");
        console.log(response.data);
        commit('setItems', response.data);
      	return true;
      }).then(console.log(this.getters.items)).catch(err => {
      });
    },
    getItems(context) {
      console.log("getting items");
      axios.get("/api/items").then(response => {
	       commit('setItems', response.data);
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
  }
});
export default store;
