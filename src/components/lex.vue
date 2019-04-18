<template>
    <div>
    <img
      v-on:click="clicked"
      src="https://github.com/awslabs/aws-lex-browser-audio-capture/blob/master/example/lex.png?raw=true"
    >
    <canvas class="visualizer"></canvas>
    </div>
</template>

<script>
export default {
  name: "lex",
  methods: {
    clicked() {
      alert("lex bot button has been clicked");
    }
  }
};
</script>