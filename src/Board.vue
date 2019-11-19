<script>
import { data } from "./boardData.js";
import SelectionScreen from "./SelectionScreen.vue";
import Card from "./Card.vue";
import Timer from "./Timer.vue";
import Modal from "./Modal.vue";

export default {
  name: "board",
  props: {
    size: Number,
    theme: Number,
    timeRemain: Number
  },
  data: function() {
    return {
      boardArr: [],
      boardSize: this.size,
      boardTheme: this.theme,
      timeRemaining: this.timeRemain,
      cards: [],
      selectedCards: [],
      pairsToWin:
        this.size % 2 === 0 ? this.size ** 2 / 2 : (this.size ** 2 - 1) / 2,
      didWin: false,
      gameHasEnded: false
    };
  },

  watch: {
    size() {
      this.boardSize = this.size;
      this.pairsToWin =
      this.size % 2 === 0 ? this.size ** 2 / 2 : (this.size ** 2 - 1) / 2;
    },
    theme() {
      this.boardTheme = this.theme;
    },
    timeRemain() {
      this.timeRemaining = this.timeRemain;
    }
  },
  components: {
    card: Card,
    selectionScreen: SelectionScreen,
    timer: Timer,
    modal: Modal
  },
  methods: {
    handleClick() {
      if (this.selectedCards.length > 1) {
        if (this.selectedCards[0].text === this.selectedCards[1].text) {
          // you've correctly matched this pair
          this.correctMatch(this.selectedCards[0], this.selectedCards[1]);
        } else {
          // you haven't correctly matched this pair
          this.incorrectMatch(this.selectedCards[0], this.selectedCards[1]);
        }
      }
    },

    addToSelected(card) {
      this.selectedCards.push(card);
    },

    correctMatch(card1, card2) {
      card1.$el.style.backgroundColor = "#91e99b";
      card2.$el.style.backgroundColor = "#91e99b";
      this.pairsToWin -= 1;
      if (this.pairsToWin === 0) {
        this.didWin = true;
        this.gameHasEnded = true;
        this.$children[0].active = false;
        this.$children[0].start();
      }
      this.selectedCards = [];
    },

    incorrectMatch(card1, card2) {
      card1.$el.style.backgroundColor = "#ea5b37";
      card2.$el.style.backgroundColor = "#ea5b37";
      setTimeout(function() {
        card1.revealed = false;
        card2.revealed = false;
        card1.$el.style.backgroundColor = "white";
        card2.$el.style.backgroundColor = "white";
      }, 950);
      this.selectedCards = [];
    },

    shuffle(a) {
      for (var i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    },

    loadBoard() {
      var arr1 = [];
      var qty =
        this.boardSize % 2 === 0
          ? this.boardSize ** 2 / 2
          : (this.boardSize ** 2 - 1) / 2;
      var arr2 = this.shuffle(data[this.boardTheme]).splice(0, qty);
      for (var i = 0; i < arr2.length; i++) {
        arr1.push(arr2[i]);
        arr1.push(arr2[i]);
      }
      this.boardArr = this.shuffle(arr1);
      if (this.boardArr.length === 24 || this.boardArr.length === 48) {
        let studPoint = this.boardArr.length / 2;
        this.boardArr.splice(studPoint, 0, "•");
      }
      this.$children[0].active = true;
      this.$children[0].start();
    },

    displayCards() {
      this.cards = [];
      for (var i = 0; i < this.boardSize; i++) {
        let rowArr = [];
        for (var j = this.boardSize * i; j < this.boardSize * (i + 1); j++) {
          rowArr.push({
            size: this.boardSize,
            text: this.boardArr[j]
          });
        }
        this.cards.push(rowArr);
      }
    },

    cancelGame() {
      this.boardArr = [];
      this.cards = [];
      this.selectedCards = [];
      this.gameHasEnded = false;
      this.didWin = false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/themes.scss";

.main-board {
  height: 100%;
  padding: 1% 1%;
}
</style>

<template>
  <div class="main-board">
    <timer :time="this.timeRemaining"/>
    <modal v-show="this.gameHasEnded && !this.didWin" :won="false"/>
    <modal v-show="this.gameHasEnded && this.didWin" :won="true"/>
    <table>
      <tbody
        v-bind:style="{
        backgroundColor: this.gameHasEnded ? darkgrey : transparent,
        opacity: this.gameHasEnded ? 0.4 : 1.0
        }"
      >
        <tr class="row" v-for="(row, index) in this.cards" :key="index">
          <card v-for="(card, index) in row" :size="card.size" :text="card.text" :key="index"/>
        </tr>
      </tbody>
    </table>
  </div>
</template>