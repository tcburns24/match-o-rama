<script>
export default {
  name: "timer",
  props: {
    time: Number
  },
  data: function() {
    return {
      active: false,
      timeRemaining: this.time * 6
    };
  },
  watch: {
    time() {
      this.timeRemaining = this.time > 0 ? this.time * 6 : 0;
    }
  },
  methods: {
    pad(num) {
      return num < 10 ? "0" + num : num;
    },

    start() {
      if (this.timeRemaining > 0) {
        setTimeout(() => {
          this.timeRemaining -= 1;
          this.start();
        }, this.active ? 1000 : 999999);
      } else {
        this.$parent.gameHasEnded = true;
      }
    }
  }
};
</script>

<style scoped>
.container {
  border: dotted 4px grey;
  vertical-align: center;
  text-align: center;
  width: 50%;
  padding: 1% 0;
}
.number {
  font-size: 24px;
  font-family: avenir;
}
</style>

<template>
  <div class="container">
    <div class="number">{{ parseInt(timeRemaining / 60) }}:{{ this.pad(timeRemaining % 60) }}</div>
  </div>
</template>

