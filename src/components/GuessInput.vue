<script setup>


import {computed, ref} from "vue";
import english from '../enlishwordsWith5Letters.json';

const WORD_SIZE = 5

const emit = defineEmits(['guess-submitted'])
const guessInProgress = ref(null)

const formattedGuessInProgress = computed({
  get(){
    return guessInProgress.value ?? ""
  },
  set(rawValue){
    guessInProgress.value = null

    guessInProgress.value = rawValue
        .slice(0, WORD_SIZE)
        .toUpperCase()
        .replace(/[^A-Z]+/gi, "")
  }
})

function onSubmit() {
  if (!english.includes(formattedGuessInProgress.value)) {
    return;
  }

  emit('guess-submitted', formattedGuessInProgress.value)
  guessInProgress.value = null
}

</script>

<template>
  <input type="text"
         v-model="formattedGuessInProgress"
         @keydown.enter="onSubmit"
  >


</template>

<style scoped lang="scss">

</style>