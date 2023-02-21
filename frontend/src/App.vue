<template>
    <router-view></router-view>
</template>

<script>

export default {
  name: 'App',
  components: {
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
}
body {
  margin: 0;
  padding: 0;
}

* {
  scrollbar-width: thin;
  scrollbar-color: #c5c5c5 #f6f6f6;
}

/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 4px;
  height: 1px;
}

*::-webkit-scrollbar-track {
  background: #f6f6f6;
}

*::-webkit-scrollbar-thumb {
  background-color: #c5c5c5;
  border-radius: 12px;
  border: 1px solid #f6f6f6;
}
</style>
