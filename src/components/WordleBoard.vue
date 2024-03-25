<script setup>


import {DEFEAT_MESSAGE, VICTORY_MESSAGE} from "../../__tests__/wordleBoard.spec.js";
import {computed, ref} from "vue";
import english from '../enlishwordsWith5Letters.json';
import GuessInput from "./GuessInput.vue";

const props = defineProps({
  wordOfTheDay: {
    type: String,
    required: true,
    default: '',
    validator(value, props) {
      return english.includes(value)
    }
  }
})
const guessesSubmitted = ref([])

const isGameOver = computed(() => {
  return guessesSubmitted.value.length === 6
      || guessesSubmitted.value.includes(props.wordOfTheDay)
})
</script>

<template>
  <ul>
    <li v-for="(guess, index) in guessesSubmitted" :key="index">
      {{guess}}
    </li>
  </ul>
  <guess-input @guess-submitted="guess => guessesSubmitted.push(guess)" />
  <p v-if="isGameOver"
     v-text="guessesSubmitted.includes(props.wordOfTheDay) ? VICTORY_MESSAGE : DEFEAT_MESSAGE"/>


</template>

<style scoped lang="scss">

</style>