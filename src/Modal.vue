<script>
import { allStrings } from "./strings.js";

export default {
  name: "modal",
  props: {
    won: Boolean
  },
  data: function() {
    return {
      winIcon:
        allStrings["winIcons"][
          Math.floor(Math.random() * allStrings["winIcons"].length)
        ],
      lossIcon:
        allStrings["lossIcons"][
          Math.floor(Math.random() * allStrings["lossIcons"].length)
        ],
      winTitle:
        allStrings["winTitleMssgs"][
          Math.floor(Math.random() * allStrings["winTitleMssgs"].length)
        ],
      lossTitle:
        allStrings["lossTitleMssgs"][
          Math.floor(Math.random() * allStrings["lossTitleMssgs"].length)
        ],
      winText:
        allStrings["winTextMssgs"][
          Math.floor(Math.random() * allStrings["winTextMssgs"].length)
        ],
      lossText:
        allStrings["lossTextMssgs"][
          Math.floor(Math.random() * allStrings["lossTextMssgs"].length)
        ]
    };
  },
  methods: {
    resetBoard() {}
  }
};
</script>

<style lang="scss" scoped>
@import "./assets/themes.scss";

.main {
  position: absolute;
  display: block;
  background-color: #ebebeb;
  width: 60%;
  left: 20%;
  border-style: solid;
  border-width: 4px;
  border-radius: 12px;
  text-align: center;
  z-index: 2;
}
.row {
  width: 100%;
  padding: 3% 0;
  font-family: avenir;
  font-size: 14px;
}
.icon {
  font-size: 28px;
}
.title {
  font-size: 20px;
}
</style>

<template>
  <div class="main" v-bind:style="{
    borderColor: this.won ? '#18db80' : '#db2518',
  }">
    <div class="row icon">{{ this.won ? this.winIcon : this.lossIcon }}</div>
    <span class="row title">{{ this.won ? this.winTitle : this.lossTitle }}</span>
    <div class="row text">{{ this.won ? this.winText : this.lossText }}</div>
    <div class="row button">
      <input type="button" value="Again Again!">
    </div>
  </div>
</template>
