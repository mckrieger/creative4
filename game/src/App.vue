<template>
<div id="app">

  <div id="fullBody">
    <div id="content">
      <app-header/>
      <router-view/>
    </div>
  <app-footer/>
  </div>
</div>
</template>

<script>
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppFooter
  }
}
</script>

<style>
#fullBody {
    min-height: 100%;
    width:100%;
    position:relative;
}

#content {
  padding: 0px 0px 50px 0px;
  font-family: 'Arvo';
  font-size: 16px;
  position: relative;
}
html {
  height:100%
}

body {
  padding: 0px;
  margin:0px;
  height:100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
