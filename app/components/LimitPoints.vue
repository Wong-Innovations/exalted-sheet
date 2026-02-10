<template>
  <div class="limit-container">
    <input
      type="radio"
      value="10"
      id="limit-point10"
      :checked="props.value === 10"
    />
    <label
      for="limit-point10"
      @click.prevent="() => props.onUpdate(10)"
    ></label>
    <input
      type="radio"
      value="9"
      id="limit-point9"
      :checked="props.value === 9"
    />
    <label for="limit-point9" @click.prevent="() => props.onUpdate(9)"></label>
    <input
      type="radio"
      value="8"
      id="limit-point8"
      :checked="props.value === 8"
    />
    <label for="limit-point8" @click.prevent="() => props.onUpdate(8)"></label>
    <input
      type="radio"
      value="7"
      id="limit-point7"
      :checked="props.value === 7"
    />
    <label for="limit-point7" @click.prevent="() => props.onUpdate(7)"></label>
    <input
      type="radio"
      value="6"
      id="limit-point6"
      :checked="props.value === 6"
    />
    <label for="limit-point6" @click.prevent="() => props.onUpdate(6)"></label>
    <input
      type="radio"
      value="5"
      id="limit-point5"
      :checked="props.value === 5"
    />
    <label for="limit-point5" @click.prevent="() => props.onUpdate(5)"></label>
    <input
      type="radio"
      value="4"
      id="limit-point4"
      :checked="props.value === 4"
    />
    <label for="limit-point4" @click.prevent="() => props.onUpdate(4)"></label>
    <input
      type="radio"
      value="3"
      id="limit-point3"
      :checked="props.value === 3"
    />
    <label for="limit-point3" @click.prevent="() => props.onUpdate(3)"></label>
    <input
      type="radio"
      value="2"
      id="limit-point2"
      :checked="props.value === 2"
    />
    <label for="limit-point2" @click.prevent="() => props.onUpdate(2)"></label>
    <input
      type="radio"
      value="1"
      id="limit-point1"
      :checked="props.value === 1"
    />
    <label
      for="limit-point1"
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
