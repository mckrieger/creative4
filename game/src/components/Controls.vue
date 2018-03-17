<template>
  <div class="controls">
  <h3>Controls</h3>
  <div id="buttons">
  <img id="up" v-on:click="makeMove('up')" src="../assets/arrow2.png"/>
  <div id="center">
    <img id="left" v-on:click="makeMove('left')" src="../assets/arrow2.png"/>
    <span id="space"></span>
    <img id="right" v-on:click="makeMove('right')" src="../assets/arrow2.png"/>
  </div>
  <img id="down" v-on:click="makeMove('down')" src="../assets/arrow2.png"/>
  </div>
  </div>
</template>



<script>
//import Board from './Board';



  export default {
    name: 'Controls',
    components: {

    },
    data() {
      return {
        move: '',
      }
    },
     methods: {
       makeMove: function(direction) {
          console.log(direction);
       },
       getItems: function() {
         this.$store.dispatch('getItems');
       },
       addItem: function() {
         this.$store.dispatch('addItem', {
  	      text: this.text,
  	       completed: false
         });
       },
       completeItem: function(item) {
         this.$store.dispatch('updateItem', {
           id: item.id,
  	       text: item.text,
  	       completed: !item.completed,
  	       orderChange: false,
         });
       },
       deleteItem: function(item) {
         this.$store.dispatch('deleteItem',{
          id: item.id
         });
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
 }
 img:hover{
    opacity: 1;
    filter: alpha(opacity=100);
 }
</style>
