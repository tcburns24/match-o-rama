import Vue from "vue";
import SelectionScreen from "./SelectionScreen.vue";
import Board from "./Board.vue";
import Card from "./Card.vue";
import Timer from "./Timer.vue";
import Modal from "./Modal.vue";

Vue.config.productionTip = false;

new Vue({
  el: "#app",
  components: {
    SelectionScreen: SelectionScreen,
    Board: Board,
    Card: Card,
    Timer: Timer,
    Modal: Modal
  },
  template: "<SelectionScreen/>"
});
