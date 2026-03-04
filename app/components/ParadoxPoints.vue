<template>
  <div class="paradox-container">
    <input
      type="radio"
      value="10"
      id="paradox-point10"
      :checked="props.value === 10"
    />
    <label
      for="paradox-point10"
      @click.prevent="() => props.onUpdate(10)"
    ></label>
    <input
      type="radio"
      value="9"
      id="paradox-point9"
      :checked="props.value === 9"
    />
    <label
      for="paradox-point9"
      @click.prevent="() => props.onUpdate(9)"
    ></label>
    <input
      type="radio"
      value="8"
      id="paradox-point8"
      :checked="props.value === 8"
    />
    <label
      for="paradox-point8"
      @click.prevent="() => props.onUpdate(8)"
    ></label>
    <input
      type="radio"
      value="7"
      id="paradox-point7"
      :checked="props.value === 7"
    />
    <label
      for="paradox-point7"
      @click.prevent="() => props.onUpdate(7)"
    ></label>
    <input
      type="radio"
      value="6"
      id="paradox-point6"
      :checked="props.value === 6"
    />
    <label
      for="paradox-point6"
      @click.prevent="() => props.onUpdate(6)"
    ></label>
    <input
      type="radio"
      value="5"
      id="paradox-point5"
      :checked="props.value === 5"
    />
    <label
      for="paradox-point5"
      @click.prevent="() => props.onUpdate(5)"
    ></label>
    <input
      type="radio"
      value="4"
      id="paradox-point4"
      :checked="props.value === 4"
    />
    <label
      for="paradox-point4"
      @click.prevent="() => props.onUpdate(4)"
    ></label>
    <input
      type="radio"
      value="3"
      id="paradox-point3"
      :checked="props.value === 3"
    />
    <label
      for="paradox-point3"
      @click.prevent="() => props.onUpdate(3)"
    ></label>
    <input
      type="radio"
      value="2"
      id="paradox-point2"
      :checked="props.value === 2"
    />
    <label
      for="paradox-point2"
      @click.prevent="() => props.onUpdate(2)"
    ></label>
    <input
      type="radio"
      value="1"
      id="paradox-point1"
      :checked="props.value === 1"
    />
    <label
      for="paradox-point1"
      @click.prevent="
        () => {
          if (props.value === 1) {
            props.onUpdate(0);
          } else {
            props.onUpdate(1);
          }
        }
      "
    ></label>
  </div>
</template>

<script setup>
const props = defineProps(["value", "onUpdate"]);
</script>

<style scoped>
.paradox-container {
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.25rem;
}

.paradox-container input {
  display: none;
}

.paradox-container label {
  width: 0.7rem;
  height: 0.7rem;
  border: 2px solid black;
  cursor: pointer;
  background-color: transparent;
}

/* Fill stars on hover */
.paradox-container label:hover,
.paradox-container label:hover ~ label {
  background-color: black;
}

/* Fill stars on selection */
.paradox-container input:checked ~ label {
  background-color: black;
}
</style>
