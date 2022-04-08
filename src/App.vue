<template>
  <div id="app">
    <header>
      <h1 class="title sr-only">Matching Game</h1>
    </header>
    <p role="status">{{ routeAnnouncement }}</p>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "app",
  computed: {
    ...mapState(["routeAnnouncement"]),
  },
  watch: {
    $route: function () {
      this.$refs["skipLink"].focus();

      this.announceRoute({ message: this.$route.name + " page loaded" });

      this.$nextTick(function () {
        let navLinks = this.$refs.nav;

        navLinks.querySelectorAll("[aria-current]").forEach((current) => {
          current.removeAttribute("aria-current");
        });

        navLinks
          .querySelectorAll(".router-link-exact-active")
          .forEach((current) => {
            current.setAttribute("aria-current", "page");
          });
      });
    },
  },
  methods: {
    ...mapActions(["update_routeAnnouncement"]),
    announceRoute(message) {
      this.update_routeAnnouncement(message);
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
