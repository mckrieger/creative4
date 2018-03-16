<template>
  <div class="board">

  </div>
</template>



<script>
  export default {
    name: 'Board',
    data() {
      return {
        move: '',
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

<style scoped>
 .board {

     background-color:black;
 }

</style>
