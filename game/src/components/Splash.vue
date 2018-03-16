<template>
  <div class="hello">
  <img src="./../assets/logo.png">

    <button class="btn btn-1 btn-1e"><router-link to="/game">Get Wrecked</router-link></button>
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

a {
  font-family: 'Exo', serif;
  text-decoration: none;
  color: #0CB30C;
  padding: 5px 60px;
  transition: color 2s;

}
a:visited {
  color: #0CB30C;
}
a:visited:hover, a:hover {
  color:#CC0D0D;
}
img {
  margin-top: 10vw;
  padding-right:10px;
}

.btn-1 {
  display: block;
  margin-left: 42%;
  font-size:20px;
  border-radius:8px;
  margin-top:20px;
  border: 2px solid #0CB30C;
  background-color:#fff;
  transition: border 2s;

}

.btn-1:hover {
  color:#CC0D0D;
  border: 2px solid #CC0D0D;
  transition: border 2s;

}

.btn-1e {
	overflow: hidden;
}

.btn-1e::after {
	width: 100%;
	height: 0;
	top: 50%;
	left: 50%;
	opacity: 0;
	-webkit-transform: translateX(-50%) translateY(-50%) rotate(45deg);
	-moz-transform: translateX(-50%) translateY(-50%) rotate(45deg);
	-ms-transform: translateX(-50%) translateY(-50%) rotate(45deg);
	transform: translateX(-50%) translateY(-50%) rotate(45deg);
}

.btn-1e:hover{
	color: #0e83cd;
  cursor: pointer;
}

.btn-1e:hover::after {
	height: 260%;
	opacity: 1;
  font-size:20px;
}

.btn-1e:active::after {
	height: 400%;
	opacity: 1;
}


</style>
