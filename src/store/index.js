import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    gameAnnounce: '',
    win: false,
    cardsFlipped: [],
    numCardsFlipped: 0,
    playerScore: 100,
    cardsMatched: [],
    types: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8"
    ]
  },
  getters: {
    gameUpdate: (state) => {
      let update = 'You have ' + state.playerScore + ' points.'
      return update
    },
    deck: (state) => {
      let deck = {
        cards: []
      };
      for (let index = 0; index < state.types.length; index++) {
        deck.cards.push({
          name: state.types[index],
          value: state.types[index],
          flipped: false,
          match: false,
          close: false
        });
        deck.cards.push({
          name: state.types[index],
          value: state.types[index],
          flipped: false,
          match: false,
          close: false
        });
      }
      return deck;
    },
  },
  mutations: {
    ERROR(state, error) {
      state.announce = error
    },
    UPDATE_ANNOUNCE(state, payload) {
      state.announce = payload
    },
    UPDATE_WIN(state, payload) {
      state.win = payload
    },
    CLEAR_CARDSFLIPPED(state, payload) {
      state.cardsFlipped = payload;
    },
    UPDATE_CARDSFLIPPED(state, payload) {
      state.cardsFlipped.push(payload);
    },
    UPDATE_NUMCARDSFLIPPED(state, payload) {
      state.numCardsFlipped = payload;
    },
    UPDATE_playerScore(state, payload) {
      state.playerScore = payload
    },
    CLEAR_CARDSMATCHED(state, payload) {
      state.cardsMatched = payload;
    },
    UPDATE_CARDSMATCHED(state, payload) {
      state.cardsMatched.push(payload);
    },
    UPDATE_GAMEANNOUNCE(state, payload) {
      state.gameAnnounce = payload
    }
  },
  actions: {
    async clearGame({ commit, dispatch }) {
      try {
        await dispatch('update_Win', ({ win: false }))
        await dispatch('clear_CardsFlipped', ({ cards: [] }))
        await dispatch('update_NumCardsFlipped', ({ num: 0 }))
        await dispatch('update_playerScore', ({ score: 100 }))
        await dispatch('clear_CardsMatched', ({ cards: [] }))
        await dispatch('update_GameAnnounce', ({ message: "" }))
      } catch (error) {
        commit('ERROR', error)
      }
    },
    update_Win({ commit }, { win }) {
      commit('UPDATE_WIN', win)
    },
    clear_CardsFlipped({ commit }, { cards }) {
      commit('CLEAR_CARDSFLIPPED', cards)
    },
    update_CardsFlipped({ commit }, { cards }) {
      commit('UPDATE_CARDSFLIPPED', cards)
    },
    update_NumCardsFlipped({ commit }, { num }) {
      commit('UPDATE_NUMCARDSFLIPPED', num)
    },
    update_playerScore({ commit }, { score }) {
      commit('UPDATE_playerScore', score)
    },
    clear_CardsMatched({ commit }, { cards }) {
      commit('CLEAR_CARDSMATCHED', cards)
    },
    update_CardsMatched({ commit }, { cards }) {
      commit('UPDATE_CARDSMATCHED', cards)
    },
    update_GameAnnounce({ commit }, { message }) {
      commit('UPDATE_GAMEANNOUNCE', message)
    }
  }
})