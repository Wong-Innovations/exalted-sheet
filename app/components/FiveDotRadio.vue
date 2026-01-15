<template>
  <div class="rating">
    <input
      type="radio"
      value="5"
      :id="props.source + '-rating5'"
      v-model="ratingDots"
    />
    <label :for="props.source + '-rating5'">
      <div v-if="plusFive"></div>
    </label>
    <input
      type="radio"
      value="4"
      :id="props.source + '-rating4'"
      v-model="ratingDots"
    />
    <label :for="props.source + '-rating4'">
      <div v-if="plusFive"></div>
    </label>
    <input
      type="radio"
      value="3"
      :id="props.source + '-rating3'"
      v-model="ratingDots"
    />
    <label :for="props.source + '-rating3'">
      <div v-if="plusFive"></div>
    </label>
    <input
      type="radio"
      value="2"
      :id="props.source + '-rating2'"
      v-model="ratingDots"
    />
    <label :for="props.source + '-rating2'">
      <div v-if="plusFive"></div>
    </label>
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
          if (ratingDots == 1 && !plusFive) {
            ratingDots = 0;
          } else {
            ratingDots = 1;
          }
        }
      "
    >
      <div v-if="plusFive"></div>
    </label>
    <button @click="plusFive = !plusFive">+5</button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["initialValue", "onUpdate", "source"]);

const ratingDots = ref(props.initialValue);
const plusFive = ref(false);

watch([ratingDots, plusFive], ([newRatingDots, newPlusFive]) => {
  props.onUpdate(parseInt(newRatingDots) + (newPlusFive ? 5 : 0));
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

.rating label div::before {
  background: none;
  border: 2px solid white;
  content: "";
  display: block;
  position: relative;
  left: 1px;
  top: 1px;
  pointer-events: none;
  width: 10px;
  height: 10px;
  border-radius: 50%;
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
