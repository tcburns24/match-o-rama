<script>
import Board from "./Board.vue";
import SelectionScreen from "./SelectionScreen.vue";

export default {
  name: "card",
  props: {
    image: String,
    size: Number,
    text: String
  },
  data: function() {
    return {
      revealed: false,
      correct: false,
      incorrect: false,
      cardText: this.text,
      cardSize: this.size
    };
  },
  watch: {
    size() {
      this.cardSize = this.size;
    }
  },
  components: { Board, SelectionScreen },
  methods: {
    handleClick(e) {
      this.revealed = true;
      this.$parent.addToSelected(this);
      this.$parent.handleClick(this);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/themes.scss";
.card {
  border: 2px solid black;
  border-radius: 8px;
  opacity: 0.7;
  transition: all 0.3s;
  margin: 3px;
  display: table-cell;
  text-align: center;
  font-size: 1.7rem;
  font-family: avenir;
  font-weight: 800;
}
.card:hover {
  opacity: 1;
  border: 2px solid grey;
  cursor: grab;
}

.regular {
  background: linear-gradient(to bottom right, $blue-mid-dark, $blue-dark);
}

.revealed {
  opacity: 1;
  border: 2px solid $blue-mid;
}

.stud {
  background-color: #222222;
  border-radius: 50%;
  display: table-cell;
  margin: 3px;
}
</style>

<template>
  <td
    v-if="this.revealed"
    class="card revealed"
    v-bind:style="{width: ((260/this.cardSize).toString() + 'px'), height: (260/this.cardSize).toString() + 'px'}"
  >
    <span>{{ this.cardText }}</span>
  </td>
  <td
    v-else-if="this.cardText === '•'"
    class="stud"
    v-bind:style="{width: ((260/this.cardSize).toString() + 'px'), height: (260/this.cardSize).toString() + 'px'}"
  ></td>
  <td
    v-else
    class="card regular"
    v-bind:style="{width: (260/this.cardSize).toString() + 'px', height: (260/this.cardSize).toString() + 'px'}"
    @click="this.handleClick"
  ></td>
</template>
