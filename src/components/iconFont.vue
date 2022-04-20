<template>
  <svg class="svg-icon" aria-hidden="true" @click="changeAvg">
    <use :xlink:href="iconName"></use>
  </svg>
</template>

<script>
  export default {
    name: 'icon-svg',
    data() {
      return {
        showOrigin: true
      };
    },
    props: {
      // 传输 icon-class=''
      iconClass: {
        type: String,
        required: true
      },
      //点击切换图标
      onchangeAvg: String
    },
    computed: {
      iconName() {
        return `#${this.showOrigin ? this.iconClass : this.onchangeAvg}`;
      }
    },
    methods: {
      changeAvg() {
        if (!this.onchangeAvg) return;
        this.showOrigin = !this.showOrigin;
        // 图标改变触发事件
        if (this.showOrigin) {
          this.$emit('change', 1);
        } else {
          this.$emit('change', 2);
        }
      }
    }
  };
</script>

<style>
  .svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
  }
</style>
