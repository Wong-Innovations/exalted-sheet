<template>
  <div class="rating">
    <input type="radio" :id="props.source" :checked="props.value" />
    <label
      :for="props.source"
      @click.prevent="
        () => {
          props.onUpdate(!props.value);
        }
      "
    ></label>
  </div>
</template>

<script setup>
const props = defineProps(["value", "source", "onUpdate"]);
</script>

<style scoped>
.rating {
  float: right;
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.05rem;
}

.rating input {
  display: none;
}

.rating label {
  width: 0.6rem;
  height: 0.6rem;
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
