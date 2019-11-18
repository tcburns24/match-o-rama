<script>
export default {
  name: "timer",
  props: {
    time: Number
  },
  data: function() {
    return {
      active: false,
      timeRemaining: this.time * 5, // originally * 60
    };
  },
  watch: {
    time() {
      this.timeRemaining = this.time * 5; // originally * 60
    }
  },
  methods: {
    pad(num) {
      return num < 10 ? "0" + num : num;
    },

    start() {
      if (this.timeRemaining > 0) {
        this.active = true;
        setTimeout(() => {
          this.timeRemaining -= 1;
          this.start();
        }, 1000);
      } else {
        this.$parent.gameHasEnded = true;
      }
    },
    previewStart() {
      // 3...2...1...GO!
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
  padding: 3% 0;
}
.number {
  size: 20px;
  font-family: "Times New Roman", Times, serif;
}
</style>

<template>
  <div v-show="this.active" class="container">
    <div class="number">{{ parseInt(timeRemaining / 60) }}:{{ this.pad(timeRemaining % 60) }}</div>
  </div>
</template>

