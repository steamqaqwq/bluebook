<template>
  <div class="toggle-btn" :class="{ dark: isDark }">
    <input ref="" id="dark-mode theme" class="toggle" type="checkbox" name="Dark mode" role="switch" :value="isDark" @change="toggle" />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed, onMounted, nextTick, watchEffect } from 'vue';
  const isDark = ref(false);
  // const theme = computed(() => {
  //   return isDark.value ? '--theme1' : 'hsl(0, 0%, 90%)';
  // });
  // const theme2 = computed(() => {
  //   return isDark.value ? 'hsl(0, 0%, 90%)' : 'hsl(0, 0%, 10%)';
  // });
  function toggle() {
    isDark.value = !isDark.value;
  }
  const htmlDom = ref();
  onMounted(() => {
    // htmlDom.value = document.getElementsByTagName('html')[0].className = 'dark-theme';
    htmlDom.value = document.getElementsByTagName('html')[0];
    // document.body.removeAttribute("class","body-class");
  });
  watchEffect(() => {
    if (isDark.value) {
      // nextTick(() => {
      document.body.className = 'dark-theme';
      // });
    } else {
      document.body.removeAttribute('class');
    }
  });
</script>

<style lang="less" scoped>
  input {
    color: hsl(0, 0%, 10%);
    font: 1em/1.5 sans-serif;
  }

  .toggle-btn {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .toggle {
    position: relative;
  }
  .toggle:before,
  .toggle:after {
    background: #fff;
  }

  .dark .toggle:before,
  .dark .toggle:after {
    // background: var(--theme1);
    background: #000;
    filter: invert(1);
  }

  .toggle:before,
  .toggle:after {
    transition: transform 0.5s;
  }

  .toggle:before,
  .toggle:checked:after {
    transition-timing-function: ease-out;
  }

  .toggle {
    overflow: hidden;
    background: var(--theme2);
    border-radius: 0.75em;
    cursor: pointer;
    width: 3em;
    height: 1.5em;
    -webkit-appearance: none;
    appearance: none;
    -webkit-tap-highlight-color: transparent;
  }
  .toggle:before,
  .toggle:after {
    position: absolute;
    font-family: 'iconfont';
    border-radius: 50%;
    content: '';
    display: block;
    top: 0.15em;
    left: 0.25em;
    width: 1.2em;
    height: 1.2em;
    line-height: 1.2em;
    text-align: center;
  }
  .toggle:before {
    color: #fff;
    content: '\e690';
  }
  .toggle:after {
    color: #000;
    content: '\e886';
  }
  .toggle:before,
  .toggle:checked:after {
    transition-delay: 0s;
  }
  .toggle:checked:before,
  .toggle:after {
    transition-delay: calc(0.5s * 0.75);
    transition-timing-function: cubic-bezier(0.3, 1.6, 0.5, 0.7);
  }
  .toggle:before {
    transform: translateX(-1.5em);
  }
  .toggle:checked:before {
    transform: translateX(1.5em);
  }
  .toggle:checked:after {
    transform: translateX(3em);
  }
  .toggle:focus {
    outline: transparent;
  }
</style>
