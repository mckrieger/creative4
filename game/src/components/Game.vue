<template>
  <div class="game">
    <controls/>
    <board/>
    <score/>

  </div>
</template>



<script>
import Board from './Board';
import Controls from './Controls';
import Score from './Score';


  export default {
    name: 'Game',
    data() {
      return {
        gameState: '',
      }
    },
    components: {
      Board,
      Controls,
      Score,
    },
  }
</script>

<style scoped>
 .game {
    background-color:lightGray;
    width:100vw;
    height: 80vh;
    padding:2px;
    display: grid;
    grid-gap: 2px;
    grid-template-columns: 1fr 2fr 1fr;
 }
</style>
