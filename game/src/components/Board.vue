<template>
<div class= "surround">
  <div class="board">
    <div v-for="item in items" v-bind:class="{you: item === 'you', them: item=='them', empty: item==='empty', power: item==='power', powerful: powerful && item === 'you', goal: item==='goal'}" >
    </div>
  </div>
</div>
</template>



<script>
import store from '../store';
  export default {
    name: 'Board',
    data() {
      return {

      }
    },
    computed: {
      items: function() {
        return store.getters.items;
      },
      powerful: function() {
        return store.getters.power;
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
      store.dispatch('getItems');
   },

  }
</script>

<style scoped>
.surround{
  width: 100%;
  height: 100%;
}

 .board {
     background-color:darkGray;
     display: grid;
     grid-gap: 2px;
     grid-template-columns: repeat(10, 1fr);
     grid-template-rows: repeat(10, 1fr);
     padding:2px;
     width: 40vw;
     height:100%;
     margin:auto;
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
    background-color: #FFF;
    color: gray;
  }
  .goal {
    background-color: yellow;
    color: yellow;
  }
  .powerful {
    background-color: green;
    animation-name: color;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    }
    @keyframes color {
    0% {
      background-color: green;
    }
    50% {
      background-color: blue;
    }
    100 {
      background-color: green;
    }
    }

</style>
