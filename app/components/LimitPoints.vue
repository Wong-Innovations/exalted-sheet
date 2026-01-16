<template>
  <div class="limit-container">
    <input type="radio" value="10" id="limit-point10" v-model="ratingBoxes" />
    <label for="limit-point10"></label>
    <input type="radio" value="9" id="limit-point9" v-model="ratingBoxes" />
    <label for="limit-point9"></label>
    <input type="radio" value="8" id="limit-point8" v-model="ratingBoxes" />
    <label for="limit-point8"></label>
    <input type="radio" value="7" id="limit-point7" v-model="ratingBoxes" />
    <label for="limit-point7"></label>
    <input type="radio" value="6" id="limit-point6" v-model="ratingBoxes" />
    <label for="limit-point6"></label>
    <input type="radio" value="5" id="limit-point5" v-model="ratingBoxes" />
    <label for="limit-point5"></label>
    <input type="radio" value="4" id="limit-point4" v-model="ratingBoxes" />
    <label for="limit-point4"></label>
    <input type="radio" value="3" id="limit-point3" v-model="ratingBoxes" />
    <label for="limit-point3"></label>
    <input type="radio" value="2" id="limit-point2" v-model="ratingBoxes" />
    <label for="limit-point2"></label>
    <input type="radio" value="1" id="limit-point1" v-model="ratingBoxes" />
    <label
      for="limit-point1"
      @click.prevent="
        () => {
          if (ratingBoxes == 1) {
            ratingBoxes = 0;
          } else {
            ratingBoxes = 1;
          }
        }
      "
    ></label>
  </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(["initialValue"]);

const ratingBoxes = ref(0);
</script>

<style scoped>
.limit-container {
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.25rem;
}

.limit-container input {
  display: none;
}

.limit-container label {
  width: 0.7rem;
  height: 0.7rem;
  border: 2px solid black;
  cursor: pointer;
  background-color: transparent;
}

/* Fill stars on hover */
.limit-container label:hover,
.limit-container label:hover ~ label {
  background-color: black;
}

/* Fill stars on selection */
.limit-container input:checked ~ label {
  background-color: black;
}
</style>
