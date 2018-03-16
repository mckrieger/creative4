<template>
  <div class="hello">
  <img src="./../assets/logo.png">

    <ul><li><router-link to="/game">Get Played</router-link></li></ul>
     </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
li {
  font-size: 30px;
  list-style-type:none;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  font-family: 'Exo', serif;

}
li {
  display: inline-block;
  margin: 0 10px;
  font-family: 'Exo', serif;

}
a {
  color: black;
  font-family: 'Exo', serif;


}
a:visited {
  color: black;
}
img {
  margin-top: 10vw;
}


</style>
