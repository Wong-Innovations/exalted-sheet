<template>
  <table style="border-collapse: collapse">
    <tbody>
      <tr>
        <td style="line-height: 0.65">
          <div class="perm-virtue">
            <input
              type="radio"
              value="5"
              :id="`perm-${props.source}5`"
              v-model="ratingDots"
            />
            <label :for="`perm-${props.source}5`"></label>
            <input
              type="radio"
              value="4"
              :id="`perm-${props.source}4`"
              v-model="ratingDots"
            />
            <label :for="`perm-${props.source}4`"></label>
            <input
              type="radio"
              value="3"
              :id="`perm-${props.source}3`"
              v-model="ratingDots"
            />
            <label :for="`perm-${props.source}3`"></label>
            <input
              type="radio"
              value="2"
              :id="`perm-${props.source}2`"
              v-model="ratingDots"
            />
            <label :for="`perm-${props.source}2`"></label>
            <input
              type="radio"
              value="1"
              :id="`perm-${props.source}1`"
              v-model="ratingDots"
            />
            <label
              :for="`perm-${props.source}1`"
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
        </td>
      </tr>
      <tr>
        <td style="line-height: 0.65">
          <div class="temp-virtue">
            <input
              type="radio"
              value="5"
              :id="`temp-${props.source}5`"
              v-model="ratingBoxes"
            />
            <label :for="`temp-${props.source}5`"></label>
            <input
              type="radio"
              value="4"
              :id="`temp-${props.source}4`"
              v-model="ratingBoxes"
            />
            <label :for="`temp-${props.source}4`"></label>
            <input
              type="radio"
              value="3"
              :id="`temp-${props.source}3`"
              v-model="ratingBoxes"
            />
            <label :for="`temp-${props.source}3`"></label>
            <input
              type="radio"
              value="2"
              :id="`temp-${props.source}2`"
              v-model="ratingBoxes"
            />
            <label :for="`temp-${props.source}2`"></label>
            <input
              type="radio"
              value="1"
              :id="`temp-${props.source}1`"
              v-model="ratingBoxes"
            />
            <label
              :for="`temp-${props.source}1`"
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
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { ref, watch } from "vue";
const props = defineProps(["initialValue", "onUpdate", "source"]);

const ratingDots = ref(props.initialValue);
const ratingBoxes = ref(0);

watch([ratingDots], (newRatingDots) => {
  props.onUpdate(parseInt(newRatingDots));
});
</script>

<style scoped>
.perm-virtue {
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.1rem;
}

.perm-virtue input {
  display: none;
}

.perm-virtue label {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  border: 2px solid black;
  cursor: pointer;
  background-color: transparent;
}

/* Fill stars on hover */
.perm-virtue label:hover,
.perm-virtue label:hover ~ label {
  background-color: black;
}

/* Fill stars on selection */
.perm-virtue input:checked ~ label {
  background-color: black;
}

.temp-virtue {
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.1rem;
}

.temp-virtue input {
  display: none;
}

.temp-virtue label {
  width: 0.5rem;
  height: 0.5rem;
  border: 2px solid black;
  cursor: pointer;
  background-color: transparent;
}

/* Fill stars on hover */
.temp-virtue label:hover,
.temp-virtue label:hover ~ label {
  background-color: black;
}

/* Fill stars on selection */
.temp-virtue input:checked ~ label {
  background-color: black;
}
</style>
