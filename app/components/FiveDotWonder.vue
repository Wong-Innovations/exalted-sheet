<template>
  <div class="rating">
    <input
      type="radio"
      value="5"
      :id="props.source + '-rating5'"
      :checked="props.value === 5"
    />
    <label
      :for="props.source + '-rating5'"
      @click.prevent="() => props.onUpdate(5)"
    ></label>
    <input
      type="radio"
      value="4"
      :id="props.source + '-rating4'"
      :checked="props.value === 4"
    />
    <label
      :for="props.source + '-rating4'"
      @click.prevent="() => props.onUpdate(4)"
    ></label>
    <input
      type="radio"
      value="3"
      :id="props.source + '-rating3'"
      :checked="props.value === 3"
    />
    <label
      :for="props.source + '-rating3'"
      @click.prevent="() => props.onUpdate(3)"
    ></label>
    <input
      type="radio"
      value="2"
      :id="props.source + '-rating2'"
      :checked="props.value === 2"
    />
    <label
      :for="props.source + '-rating2'"
      @click.prevent="() => props.onUpdate(2)"
    ></label>
    <input
      type="radio"
      value="1"
      :id="props.source + '-rating1'"
      :checked="props.value === 1"
    />
    <label
      :for="props.source + '-rating1'"
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
const props = defineProps(["value", "onUpdate", "source"]);
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
