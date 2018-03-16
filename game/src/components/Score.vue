<template>
  <div class="scoreboard">

  </div>
</template>

<script>

  export default {
    name: 'Score',
    components: {
    },
    data() {
      return {
        move: '',
      }
    },
    computed: {
      /*items: function() {
        return this.$store.getters.items;
      },*/
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

<style scoped>
 .scoreboard {

    background-color:gray;
 }
</style>
