<script>
import Board from "./Board.vue";
import Card from "./Card.vue";

export default {
  name: "SelectionScreen",
  data: function() {
    return {
      boardSize: "--Board Size--",
      boardTheme: "--Board Theme--",
      timeLimit: null,
      gameInSession: false
    };
  },
  components: {
    Board,
    Card
  },
  methods: {
    callLoadBoard() {
      if (
        parseInt(this.boardSize, 0) > -1 &&
        parseInt(this.boardTheme, 0) > -1
      ) {
        this.$children[0].loadBoard();
        this.$children[0].displayCards();
      }
      this.gameInSession = true;
    },
    toggleGameInSession() {
      this.gameInSession
        ? (this.gameInSession = false)
        : (this.gameInSession = true);
    },
    cancelGame() {
      this.gameInSession = false;
      document.getElementsByClassName("board-size-value")[0].selectedIndex = 0;
      document.getElementsByClassName("board-theme-value")[0].selectedIndex = 0;
    }
  },
  computed: {
    canLoadGame: function() {
      return (
        parseInt(this.boardSize, 0) > -1 &&
        parseInt(this.boardTheme, 0) > -1 &&
        !this.gameInSession
      );
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/themes.scss";
body {
  margin: 2%;
  width: 600px;
}
.outer-table {
  border: 3px solid black;
  border-radius: 14px;
  overflow: hidden;
  width: 100%;
  font-family: Avenir;
}

.banner-wrap {
  width: 100%;
  margin: 3%;
}

.banner-row {
  background: linear-gradient(to left, $green-mid, $green-light);
}

.selection-row {
  background: Linear-gradient(to left, #e8e8e8, grey);
}

.selection-wrap {
  color: white;
  margin: 2% 0 1% 5%;
}

.game {
  width: 580px;
}

.selection {
  display: inline-block;
  padding: 2% 1%;
}

.start-btn {
  width: 125px;
}

.board {
  border: 2px solid black;
  border-radius: 10px;
  width: 100%;
}

.load {
  border-radius: 22px;
  background: linear-gradient(to right, $blue-light, $blue-mid);
  color: white;
  font-family: avenir;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  padding: 10%;
}

.load:disabled {
  border-radius: 22px;
  background: linear-gradient(to right, lightGrey, grey);
  color: black;
  font-family: avenir;
  font-weight: 600;
  font-size: 14px;
  text-align: center;
  padding: 10%;
}

.footer {
  background: linear-gradient(to left, $green-mid, $green-light);
  color: white;
}
</style>

<template>
  <table class="outer-table" border-collapse:collapse>
    <tbody>
      <tr align="center" class="banner-row">
        <td>
          <div class="banner-wrap">
            <h1>Match-O-Rama!</h1>
          </div>
        </td>
      </tr>

      <tr class="selection-row">
        <td>
          <div class="selection-wrap">
            <div>Choose your board:</div>
            <div>
              <div class="selection board-size">
                <select class="board-size-value" v-model="boardSize">
                  <option>--Board Size--</option>
                  <option value="4">4 x 4</option>
                  <option value="5">5 x 5</option>
                  <option value="6">6 x 6</option>
                  <option value="7">7 x 7</option>
                  <option value="8">8 x 8</option>
                </select>
              </div>
              <div class="selection board-images">
                <select class="board-theme-value" v-model="boardTheme">
                  <option>--Board Theme--</option>
                  <option value="0">Emoji</option>
                  <option value="1">Numbers</option>
                  <option value="2">US States</option>
                </select>
              </div>
              <div class="selection timer">
                <input type="text" placeholder="⏱Enter Time Limit" v-model="timeLimit">
              </div>
              <div class="selection start-btn">
                <input
                  type="button"
                  value="Load Game"
                  :class="this.disabled ? 'disabled' : 'load'"
                  :disabled="canLoadGame ? false : true"
                  @click="this.callLoadBoard"
                >
              </div>
            </div>
          </div>
        </td>
      </tr>

      <tr class="game-row" align="center">
        <td>
          <div class="game">
            <table class="board">
              <tbody>
                <tr align="center">
                  <td class="board-body">
                    <board
                      :size="parseInt(this.boardSize)"
                      :theme="parseInt(this.boardTheme)"
                      :timeRemain="parseInt(this.timeLimit)"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </td>
      </tr>

      <tr class="footer" align="right">2019</tr>
    </tbody>
  </table>
</template>