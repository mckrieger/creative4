<template>
  <div class="game">
    <controls/>
    <board v-if=" status==='playing' "/>
    <results v-else/>
    <score/>

  </div>
</template>



<script>
import store from '../store';
import Board from './Board';
import Controls from './Controls';
import Score from './Score';
import Results from './Results';


  export default {
    name: 'Game',
    computed: {
      status: function() {
        return store.getters.status;
      }
    },
    components: {
      Board,
      Controls,
      Score,
      Results,
    },
    created: function() {
      store.dispatch('setupItems');
      store.dispatch('getItems');
   },
  }
</script>

<style scoped>
 .game {
    background-color:#333;
    width:100vw;
    height: 80vh;
    padding:2px;
    display: grid;
    grid-gap: 2px;
    grid-template-columns: 1fr 2fr 1fr;
 }
</style>
