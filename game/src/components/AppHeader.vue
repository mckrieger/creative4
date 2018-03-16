<template>
  <nav>
    <ul id="menu">
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/game">Game</router-link></li>
    </ul>
  </nav>
</template>

<script>
 export default {
   name: 'AppHeader'
 }
</script>

<style scoped>
 /*Strip the ul of padding and list styling*/
 .clear {
     float: clear;
 }
 nav {
     display: grid;
     background-color: #333;
     margin-bottom:10px;
 }
 ul {
     list-style-type:none;
     margin:0;
     padding-left:10px;
 }

 /*Create a horizontal list with spacing*/
 li {
     display:inline-block;
     float: left;
     margin-right: 1px;
 }
 /*Style for menu links*/
 li a {
     display:block;
     margin-right: 20px;
     height: 50px;
     text-align: center;
     line-height: 50px;
     color: #FFF;
 }
 /*Active color*/
 li a.active {
 }
 /*Hover state for top level links*/
 li:hover a {
 }
</style>
