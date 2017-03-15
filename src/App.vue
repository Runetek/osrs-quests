<style src="bulma/css/bulma.css" lang="css"></style>
<style src="font-awesome/css/font-awesome.min.css" lang="css"></style>
<style src="select2/dist/css/select2.min.css" lang="css"></style>

<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import { Quests } from './api/quests'

window.$quests = Quests

export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
