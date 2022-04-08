<template>
  <div id="app">
    <header>
      <h1 class="title sr-only">Matching Game</h1>
    </header>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  watch: {
    $route: function () {
      this.$refs["skipLink"].focus();

      this.announceRoute({ message: this.$route.name + " page loaded" });
    },
  },
};
</script>

<style lang="scss">
html {
  box-sizing: border-box;
}

*,
*::before,
*::after {
  box-sizing: inherit;
}

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100%;
}

.sr-only:not(:focus):not(:active) {
  clip: rect(0 0 0 0); 
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap; 
  width: 1px;
}

.home {
  height: 100%;
}
</style>
