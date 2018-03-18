<template>
  <div class="results">
    <div class="result" v-bind:class= "{won: results === 'won', lost: results ==='lost'}"><p>You {{results}}!</p>
    </div>

    <button class="btn" v-on:click="newGame()">Play Again?</button>
  </div>
</template>



<script>
import store from '../store';
  export default {
    name: 'Results',
    data() {
      return {

      }
    },
    computed: {
      results: function() {
        return store.getters.status;
      }

    },
     methods: {
      newGame: function() {
        store.dispatch('setupItems');
        store.dispatch('getItems');
      }
     }

  }
</script>

<style scoped>
 .results {
     background-color:darkGray;
     height:100%;
     vertical-align: center;
     }
  .result {
    padding-top: 20%;
  }
  .won {

    color: green;
    }
  .lost {

    color: red;
  }


</style>
