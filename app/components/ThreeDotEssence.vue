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
import { ref, watch } from "vue";
const props = defineProps(["initialValue", "onUpdate", "source"]);

const ratingDots = ref(props.initialValue);

watch([ratingDots], (newRatingDots) => {
  props.onUpdate(parseInt(newRatingDots));
});
</script>

<style scoped>
.rating {
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.15rem;
}

.rating input {
  display: none;
}

.rating button {
  width: 20px;
  height: 20px;
  font-size: x-small;
  padding-left: 2px;
}

.rating label {
  width: 1rem;
  height: 1rem;
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
