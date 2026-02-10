<template>
  <div class="ability-container">
    <input
      type="checkbox"
      style="height: 14px; width: 14px; margin-block: 0px"
      v-if="props.checkbox"
      :checked="props.checked"
      :disabled="props.disabled"
    />
    <div style="font-size: small">{{ props.label }}</div>
    <div class="rating">
      <input
        type="radio"
        :value="5"
        :id="props.source + '-rating5'"
        :checked="props.value === 5 || props.value === 10"
      />
      <label
        :for="props.source + '-rating5'"
        @click.prevent="() => handleUpdate(5)"
      >
        <div v-if="props.value > 5"></div>
      </label>
      <input
        type="radio"
        :value="4"
        :id="props.source + '-rating4'"
        :checked="props.value === 4 || props.value === 9"
      />
      <label
        :for="props.source + '-rating4'"
        @click.prevent="() => handleUpdate(4)"
      >
        <div v-if="props.value > 5"></div>
      </label>
      <input
        type="radio"
        :value="3"
        :id="props.source + '-rating3'"
        :checked="props.value === 3 || props.value === 8"
      />
      <label
        :for="props.source + '-rating3'"
        @click.prevent="() => handleUpdate(3)"
      >
        <div v-if="props.value > 5"></div>
      </label>
      <input
        type="radio"
        :value="2"
        :id="props.source + '-rating2'"
        :checked="props.value === 2 || props.value === 7"
      />
      <label
        :for="props.source + '-rating2'"
        @click.prevent="() => handleUpdate(2)"
      >
        <div v-if="props.value > 5"></div>
      </label>
      <input
        type="radio"
        :value="1"
        :id="props.source + '-rating1'"
        :checked="props.value === 1 || props.value === 6"
      />
      <label
        :for="props.source + '-rating1'"
        @click.prevent="
          () => {
            if (props.value === 1 && !(props.value > 5)) {
              props.onUpdate(0);
            } else {
              handleUpdate(1);
            }
          }
        "
      >
        <div v-if="props.value > 5"></div>
      </label>
      <button
        @click="() => props.onUpdate(props.value + (props.value > 5 ? -5 : 5))"
      >
        +5
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps([
  "label",
  "source",
  "checkbox",
  "checked",
  "disabled",
  "onUpdate",
  "value",
]);

const handleUpdate = (newVal) =>
  props.onUpdate(newVal + (props.value > 5 ? 5 : 0));
</script>

<style scoped>
.ability-container {
  display: flex;
  height: 14px;
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
  width: 14px;
  height: 14px;
  font-size: xx-small;
  padding-left: 0px;
  padding-top: 0px;
}

.rating label {
  width: 0.6rem;
  height: 0.6rem;
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
