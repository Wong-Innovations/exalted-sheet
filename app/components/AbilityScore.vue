<template>
  <div class="ability-container">
    <input
      type="checkbox"
      style="height: 14px; width: 14px"
      v-if="props.checkbox"
      :checked="props.checked"
      :disabled="props.disabled"
    />
    <div style="font-size: small">{{ props.label }}</div>
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
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps([
  "label",
  "source",
  "checkbox",
  "checked",
  "disabled",
]);
const emit = defineEmits(["update"]);

const ratingDots = ref(0);
const plusFive = ref(false);

watch([ratingDots, plusFive], ([newRatingDots, newPlusFive]) => {
  emit("update", parseInt(newRatingDots) + (newPlusFive ? 5 : 0));
});
</script>

<style scoped>
.ability-container {
  display: flex;
  height: 16px;
}

.rating {
  float: right;
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.15rem;
  margin-left: auto;
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

.rating label div::before {
  background: none;
  border: 2px solid white;
  content: "";
  display: block;
  position: relative;
  left: 1px;
  top: 1px;
  pointer-events: none;
  width: 6px;
  height: 6px;
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
