<template>
<div id="app">

    <div id="content">
      <app-header/>
      <router-view/>
    </div>
  <app-footer/>
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

html {
  height: 100%;
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  position: relative;
  margin: 0;
  padding-bottom: 1rem;
  min-height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
