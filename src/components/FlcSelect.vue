<script setup>

import {onMounted, ref} from "vue";

const props = defineProps({
  options: {
    type: Array,
    required: true
  },
  tabindex: {
    type: Number,
    required: false,
    default: 0
  }
})

const emit = defineEmits(['input'])
const open = ref(false);
const selectedValue = ref(props.options.length > 0 ? props.options[0] : null)

console.log('100=>', props.options);

const selectOption = (option) => {
  console.log(option);
  selectedValue.value = option;
  open.value = true;
  emit('input', option)
};


</script>

<template>
  <div class="flc-custom-select"
       :tabindex="tabindex"
       @blur="open = false"
  >
    <div class="flc-custom-select--selected"
         :class="{'flc-custom-select--open': open}"
         v-if="selectedValue !== null"
         @click="open=!open"
    >
      {{selectedValue }}
    </div>
    <div class="flc-custom-select__items"
         :class="{'flc-custom-select--selectHide': !open}"
    >
      <div class="flc-custom-select__item"
           v-for="(option, i) of options"
           :key="i"
           @click="selectOption(option)"
      >
        <div>'Please select one'</div>
        {{ option }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.flc-custom-select {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;

  &--selected {
    background-color: #080D0E;
    border-radius: 6px;
    border: 1px solid #858586;
    color: #ffffff;
    padding-left: 8px;
    cursor: pointer;
    user-select: none;

    &::after {
      position: absolute;
      content: "";
      top: 22px;
      right: 10px;
      width: 0;
      height: 0;
      border-color: #fff transparent transparent transparent;
    }
  }

  &--open {
    border: 1px solid #CE9B2C;
    border-radius: 6px 6px 0 0;
  }

  &__items {
    color: #ffffff;
    border-radius: 0 0 6px 6px;
    overflow: hidden;
    border-right: 1px solid #CE9B2C;
    border-left: 1px solid #CE9B2C;
    border-bottom: 1px solid #CE9B2C;
    position: absolute;
    background-color: #080D0E;
    left: 0;
    right: 0;
    display: block;
  }

  &__item {
    color: #ffffff;
    padding-left: 8px;
    cursor: pointer;
    user-select: none;

    &:hover {
      background-color: #B68A28;
    }
  }

  &--selectHide {
    display: none;
  }
}
</style>