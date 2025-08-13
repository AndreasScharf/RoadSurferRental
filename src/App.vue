<template>
  <div id="app" class="px-2">
    <router-view/>
  </div>
</template>

<script>

import { mapActions } from 'vuex';

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      
    };
  },
  methods: {
    ...mapActions(['fetchStations'])
  },
  mounted(){
    
    // make data call should in real application happen constantly 
    this.fetchStations()
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 10px;
}
</style>
