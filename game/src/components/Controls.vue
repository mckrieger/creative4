<template>
  <div class="controls">
  <h3>Controls</h3>
  <div id="buttons">
  <img id="up" v-on:click="makeMove('up')" src="../assets/arrow3.png"/>
  <div id="center">
    <img id="left" v-on:click="makeMove('left')" src="../assets/arrow3.png"/>
    <span id="space"></span>
    <img id="right" v-on:click="makeMove('right')" src="../assets/arrow3.png"/>
  </div>
  <img id="down" v-on:click="makeMove('down')" src="../assets/arrow3.png"/>
  </div>
  </div>
</template>



<script>
import store from '../store';



  export default {
    name: 'Controls',
    components: {

    },
    data() {
      return {
        move: '',
      }
    },
    computed: {
      status: function() {
        return store.getters.status;
      }
    },
     methods: {
       makeMove: function(direction) {
          if (store.getters.status === 'won' || store.getters.status === 'lost'){
          console.log("Don't push buttons when you aren't playing");
          } else {
          store.dispatch('makeMove', direction);
          }

       },
    },
  }
</script>

<style scoped>
 .controls {
    background-color:gray;
    vertical-align: center;
    text-align:center;

 }
 #buttons {
    height: 40%;
    padding-top:18%;
 }

 #up {
    transform: rotate(270deg);
 }

 #left {
    transform: rotate(180deg);
    margin-right: 30%;
 }

 #right {

 }

 #down {
 transform: rotate(90deg);

 }
 #space {
  width: 40%;
 }

 img {
    width: 7vw;
    opacity: 0.5;
    filter: alpha(opacity=50);
    transition:opacity .7s;
 }

 img:hover{
    opacity: 1;
    filter: alpha(opacity=100);
    transition: opacity .7s;
 }
</style>
