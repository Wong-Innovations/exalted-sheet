<template>
  <div class="rating">
    <input
      type="radio"
      value="3"
      :id="props.source + '-rating3'"
      v-model="ratingDots"
    />
    <label :for="props.source + '-rating3'"></label>
    <input
      type="radio"
      value="2"
      :id="props.source + '-rating2'"
      v-model="ratingDots"
    />
    <label :for="props.source + '-rating2'"></label>
    <input
      type="radio"
      value="1"
      :id="props.source + '-rating1'"
      v-model="ratingDots"
    />
    <label
      :for="props.source + '-rating1'"
      @click.prevent="
        () => {
          if (ratingDots == 1) {
            ratingDots = 0;
          } else {
            ratingDots = 1;
          }
        }
      "
    ></label>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["source"]);

const ratingDots = ref(0);
</script>

<style scoped>
.rating {
  float: right;
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.15rem;
}

.rating input {
  display: none;
}

.rating button {
  width: 16px;
  height: 16px;
  font-size: x-small;
  padding-left: 0px;
  padding-top: 0px;
}

.rating label {
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  border: 2px solid black;
  cursor: pointer;
  background-color: transparent;
}

/* Fill stars on hover */
.rating label:hover,
.rating label:hover ~ label {
  background-color: black;
}

/* Fill stars on selection */
.rating input:checked ~ label {
  background-color: black;
}
</style>
