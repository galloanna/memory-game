<template>
  <div class="win">
    <div>
      <h2 id="congratulations" aria-labelledby="congratulations winningMsg" v-focus tabindex="-1">Congratulations</h2>
      <p id="winningMsg">{{winningMessage}}</p>
      <button class="buttonGray" @click="newGame()">Play again</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Winning",
  props: {
    newGame: { type: Function },
    winningMessage: {type: String}
  },
};
</script>

<style lang="scss">
/* if you win */
.win {
  text-align: center;
  padding: auto;
  margin: auto;
}
.win h1 {
  font-weight: bold;
}
.win p {
  padding: 3em;
}
</style>