<template>
  <div class="scoreboard">
    <div class="description"><span class="mainText">It's <p class="you">you</p> vs. <p class="them">them</p>.<br> Actually,
      they're mostly just chasing you, and if they catch you, they'll kill you.
      But they only move when you do. Sometimes
      it takes some time before the <p class="goal">goal</p> shows up, so use the <p class="power">power-ups</p> to fight back.
      <p class="secret">(You can go through walls)</p>
      </span></div>
    <div class="stats">
      <div class="moves"><h3>Moves Taken: {{moves}}</h3></div>
      <div class="score"><h3>Your Score: {{score}}</h3></div>
      <div class="highscore"><h3>Overall HighScore: {{highscore}}</h3></div>
    </div>
  </div>
</template>

<script>
import store from '../store';

  export default {
    name: 'Score',
    components: {
    },
    data() {
      return {

      }
    },
    computed: {
      score: function() {
      return store.getters.score;
      },
      highscore: function() {
        return store.getters.highscore;
      },
      moves: function() {
        return store.getters.moves;
      }

    },
     methods: {
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
//#17B617;
//#CF1919
<style scoped>
 .scoreboard {
    position:relative;
    background-color:gray;
    border: 2px solid lightGray;

 }

 .secret {
  color: #858989;
 }

 .you {
    color: #A1E1A1;
    display: inline;
 }

 .them {
    color:#F0B9B9;
    display: inline;

 }

 .goal{
    color:yellow;
    display: inline;

 }

 .power {
    color: #95C5F4;
    display: inline;

 }
 .mainText {
    color: white;
 }
 .description {
    font-family: 'Exo', sans-serif;
    margin:5px;
    margin-bottom:20%;
    margin-top:5%
 }
 .stats {
    text-align:center;
    padding-left:15px;
    bottom:0;
 }
</style>
