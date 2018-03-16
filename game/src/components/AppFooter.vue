<template>
  <div id="footer" >
    <p class="footer">Feel free to take a look at my <a  class="footer" href='https://github.com/mckrieger/creative4'>Github Repository</a></p>
  </div>
</template>

<script>
 export default {
   name: 'AppFooter'
 }
</script>

<style scoped>

 #footer {
  list-style-type: none;
  height: 50px;
  width: 100vw;
  bottom:0;
  margin-top:5px;
  position:absolute;
  overflow:hidden;
  background-color: #333;
  text-align: center;
  color: #FFF;
  text-decoration: none;
}

p.footer {
  padding-bottom:15px;
}

</style>
