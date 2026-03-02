<template>
  <div class="clarity-container">
    <input
      type="radio"
      value="10"
      id="clarity-point10"
      :checked="props.value === 10"
    />
    <label
      for="clarity-point10"
      @click.prevent="() => props.onUpdate(10)"
    ></label>
    <input
      type="radio"
      value="9"
      id="clarity-point9"
      :checked="props.value === 9"
    />
    <label
      for="clarity-point9"
      @click.prevent="() => props.onUpdate(9)"
    ></label>
    <input
      type="radio"
      value="8"
      id="clarity-point8"
      :checked="props.value === 8"
    />
    <label
      for="clarity-point8"
      @click.prevent="() => props.onUpdate(8)"
    ></label>
    <input
      type="radio"
      value="7"
      id="clarity-point7"
      :checked="props.value === 7"
    />
    <label
      for="clarity-point7"
      @click.prevent="() => props.onUpdate(7)"
    ></label>
    <input
      type="radio"
      value="6"
      id="clarity-point6"
      :checked="props.value === 6"
    />
    <label
      for="clarity-point6"
      @click.prevent="() => props.onUpdate(6)"
    ></label>
    <input
      type="radio"
      value="5"
      id="clarity-point5"
      :checked="props.value === 5"
    />
    <label
      for="clarity-point5"
      @click.prevent="() => props.onUpdate(5)"
    ></label>
    <input
      type="radio"
      value="4"
      id="clarity-point4"
      :checked="props.value === 4"
    />
    <label
      for="clarity-point4"
      @click.prevent="() => props.onUpdate(4)"
    ></label>
    <input
      type="radio"
      value="3"
      id="clarity-point3"
      :checked="props.value === 3"
    />
    <label
      for="clarity-point3"
      @click.prevent="() => props.onUpdate(3)"
    ></label>
    <input
      type="radio"
      value="2"
      id="clarity-point2"
      :checked="props.value === 2"
    />
    <label
      for="clarity-point2"
      @click.prevent="() => props.onUpdate(2)"
    ></label>
    <input
      type="radio"
      value="1"
      id="clarity-point1"
      :checked="props.value === 1"
    />
    <label
      for="clarity-point1"
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
.clarity-container {
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.25rem;
}

.clarity-container input {
  display: none;
}

.clarity-container label {
  width: 0.7rem;
  height: 0.7rem;
  border: 2px solid black;
  cursor: pointer;
  background-color: transparent;
}

/* Fill stars on hover */
.clarity-container label:hover,
.clarity-container label:hover ~ label {
  background-color: black;
}

/* Fill stars on selection */
.clarity-container input:checked ~ label {
  background-color: black;
}
</style>
