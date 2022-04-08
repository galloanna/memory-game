<template>
  <div class="home" aria-label="Memory Game Board">
    <p role="status">{{ gameAnnounce }}</p>
    <main
      class="container"
      id="main"
      tabindex="-1"
      aria-labelledby="gameTitle"
    >
      <h2 id="gameTitle" class="sr-only">Game Board</h2>
      <section aria-label="Memory Game Controller" class="gameController">
        <button @click="newGame" class="restart reset-button">
          <span v-if="win" class="reset">Play Again</span>
          <span v-else class="reset">New Game</span>
        </button>
        <div class="score-wrapper">
          <p class="score">Score: {{ playerScore }}</p>
        </div>
      </section>

      <section aria-label="Memory Game Board" id="cards" class="cards-wrapper">
        <p id="gameUpdate">{{ gameUpdate }}</p>
        <ul class="cards">
          <li
            v-for="(card, index) in this.deck.cards"
            :key="index"
            :aria-label="[card.flipped ? card.name : '']"
            class="cardItem"
          >
            <!-- {{card.name}} -->
            <button
              aria-describedby="gameUpdate"
              :aria-label="[
                card.flipped ? card.name + ' flipped' : 'card ' + (index + 1),
              ]"
              :class="[
                card.match
                  ? 'card match'
                  : card.flipped
                  ? 'card show'
                  : card.close
                  ? 'card close'
                  : 'card',
              ]"
              @click="flipCard(card)"
              :disabled="card.match"
            >
              <span v-if="card.flipped" class="card-value">
                {{ deck.cards[index].value }}
              </span>
            </button>
          </li>
        </ul>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState([
      "gameAnnounce",
      "win",
      "cardsFlipped",
      "numCardsFlipped",
      "playerScore",
      "cardsMatched",
      "types",
    ]),
    ...mapGetters(["gameUpdate", "deck"]),
  },
  created() {
    this.shuffle(this.deck.cards);
  },
  methods: {
    ...mapActions([
      "clearGame",
      "updateDeck",
      "update_Win",
      "clear_CardsFlipped",
      "update_CardsFlipped",
      "update_NumCardsFlipped",
      "update_playerScore",
      "clear_CardsMatched",
      "update_CardsMatched",
      "update_GameAnnounce",
    ]),
    shuffle(cards) {
      this.deck.cards = [];
      var currentIndex = cards.length,
        temporaryValue,
        randomIndex;
      // While there remain elements to shuffle...
      while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
      }

      this.deck.cards = cards;
    },
    newGame() {
      this.shuffle(this.deck.cards);

      for (let i = 0; i < this.deck.cards.length; i++) {
        this.deck.cards[i].flipped = false;
        this.deck.cards[i].close = false;
        this.deck.cards[i].match = false;
      }

      this.clearGame();
    },

    flipCard(card) {
      this.update_GameAnnounce({ message: "" });
      while (card.flipped) {
        this.update_GameAnnounce({
          message: "Card already flipped.",
        });
        return;
      }
      // only allow flips if there are < or = 2 flipped cards
      if (this.numCardsFlipped < 2) {
        if (this.numCardsFlipped < 1) {
          this.update_GameAnnounce({
            message: card.name + " flipped.",
          });
        }
        card.flipped = true;
        this.update_NumCardsFlipped({ num: this.numCardsFlipped + 1 });
        this.update_CardsFlipped({ cards: card });
        // MATCH
        if (
          this.numCardsFlipped === 2 &&
          this.cardsFlipped[0].name == this.cardsFlipped[1].name
        ) {
          this.update_playerScore({ score: this.playerScore + 10 });
          for (let i = 0; i < this.deck.cards.length; i++) {
            if (this.deck.cards[i].name == this.cardsFlipped[0].name) {
              this.deck.cards[i].match = true;
            }
            this.update_GameAnnounce({
              message: card.name + " flipped. Match found!",
            });
          }
          this.update_CardsMatched({ cards: this.cardsFlipped });
          this.clear_CardsFlipped({ cards: [] });
          this.update_NumCardsFlipped({ num: 0 });
          //if number of cards matched = number or cards, then win the game
          if (this.cardsMatched.length === this.deck.cards.length / 2) {
            this.update_Win({ win: true });
          }
        }
        // NO MATCH
        else if (
          this.numCardsFlipped === 2 &&
          this.cardsFlipped[0].name !== this.cardsFlipped[1].name
        ) {
          this.update_playerScore({ score: this.playerScore - 1 });
          // Wait before closing mismatched card
          this.update_GameAnnounce({
            message: card.name + " flipped. No match.",
          });
          setTimeout(() => {
            for (let i = 0; i < this.deck.cards.length; i++) {
              if (this.deck.cards[i].flipped && !this.deck.cards[i].match) {
                this.deck.cards[i].flipped = false;
                this.deck.cards[i].close = true;
              }
            }
            this.clear_CardsFlipped({ cards: [] });
            this.update_NumCardsFlipped({ num: 0 });
            return;
          }, 400);
        }
      }
    },
  },
};
</script>

<style lang="scss">
html,
body {
  margin: 0px;
  height: 100%;
  overflow: hidden;
}

.cards-wrapper {
  width: 100%;
  height: 100%;
}

// Cards
.cards {
margin: 0px auto;
  height: 100%;
  width: calc(100% + 10px);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: stretch;
  // justify-content: space-between;
  padding: 5px;
  gap: 10px;

  .cardItem {
    list-style: none;
    width: calc(25% - 10px);
  }

  .card {
    width: 100%;
    height: 100%;
    font-size: 5vw;
    border: 4px solid #ff8b37;
    color: white;
    background: white;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card-value {
    position: absolute;
  }

  .show {
    background: #ff4d2d;
    border: 4px solid #ff4d2d;
    cursor: default;
  }

  .match {
    cursor: default;
    background: #20b149;
    border: 4px solid #20b149;
  }

  .close {
    cursor: default;
    transition: background 1s linear;
    &:hover,
    &:focus {
      outline: 2px solid black;
    }
  }
}

// Game Controller
.gameController {
  width: 100%;
  display: flex;
  padding: 5px;
}
.score {
  text-align: right;
  font-weight: bold;
}

.score-wrapper {
  width: 50%;
  margin-left: 10px;
}

.restart {
  width: 50%;
  cursor: pointer;
}

// Overall
[role="status"] {
  height: 0;
  margin: 0;
  overflow: hidden;
  color: #960000;
  font-weight: bold;
}

#gameUpdate {
  height: 0;
  margin: 0;
  overflow: hidden;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
}

// Buttons

.reset-button {
  width: 50%;
  border: none;
  background: #ff8b37;
  font-size: 1em;
  color: #ffffff;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  padding: 0.5em;
  text-transform: uppercase;
  font-weight: 700;
  &:hover,
  &:focus {
    outline: 2px solid black;
  }
}
</style>
