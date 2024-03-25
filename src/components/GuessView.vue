<script setup>



</script>

<template>
  <ul>
    <li v-for="(guess, index) in guessesSubmitted" :key="index">
      {{guess}}
    </li>
  </ul>


</template>

<style scoped lang="scss">

</style>