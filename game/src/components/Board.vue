<template>
  <div class="board">
    <div v-for="item in items" v-bind:class="{you: item == 'you', them: item=='them', empty: item=='empty', power: item=='power'}" >
    </div>
  </div>
</template>



<script>
import store from '../store';
  export default {
    name: 'Board',
    data() {
      return {
        move: '',
      }
    },
    computed: {
      items: function() {
        return store.getters.items;
      }
    },
     methods: {
       getItems: function() {
         store.dispatch('getItems');
       },
       addItem: function(type) {
         store.dispatch('addItem', {
  	      text: type
         });
       },
       completeItem: function(item) {
         store.dispatch('updateItem', {
           id: item.id,
  	       text: item.text,
  	       completed: !item.completed,
  	       orderChange: false,
         });
       },
       deleteItem: function(item) {
         store.dispatch('deleteItem',{
          id: item.id
         });
       },
    },
    created: function() {
      store.dispatch('setupItems');
   },

  }
</script>

<style scoped>
 .board {
     background-color:black;
     display: grid;
     grid-gap: 2px;
     grid-template-columns: repeat(10, 1fr);
     grid-template-rows: repeat(10, 1fr);
     padding:2px;
     }
  .you {
    background-color: green;
    color: green;
    }
  .them {
    background-color: red;
    color: red;
  }
    .power {
    background-color: blue;
    color: blue;
    }
  .empty{
    background-color: white;
    color: white;
  }
  .goal {
    background-color: yellow;
    color: yellow;
  }



</style>
