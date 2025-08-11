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
      searchTerm: '',
      items: [
        { id: 1, name: 'Apple' },
        { id: 2, name: 'Banana' },
        { id: 3, name: 'Cherry' },
        { id: 4, name: 'Date' },
        { id: 5, name: 'Elderberry' }
      ]
    };
  },
  methods: {
    ...mapActions(['fetchStations'])
  },
  mounted(){
   
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
