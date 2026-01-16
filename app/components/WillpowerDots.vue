<template>
  <table>
    <tbody>
      <tr>
        <td style="line-height: 0.8">
          <div class="perm-willpower">
            <input
              type="radio"
              value="10"
              id="perm-willpower10"
              v-model="ratingDots"
            />
            <label for="perm-willpower10"></label>
            <input
              type="radio"
              value="9"
              id="perm-willpower9"
              v-model="ratingDots"
            />
            <label for="perm-willpower9"></label>
            <input
              type="radio"
              value="8"
              id="perm-willpower8"
              v-model="ratingDots"
            />
            <label for="perm-willpower8"></label>
            <input
              type="radio"
              value="7"
              id="perm-willpower7"
              v-model="ratingDots"
            />
            <label for="perm-willpower7"></label>
            <input
              type="radio"
              value="6"
              id="perm-willpower6"
              v-model="ratingDots"
            />
            <label for="perm-willpower6"></label>
            <input
              type="radio"
              value="5"
              id="perm-willpower5"
              v-model="ratingDots"
            />
            <label for="perm-willpower5"></label>
            <input
              type="radio"
              value="4"
              id="perm-willpower4"
              v-model="ratingDots"
            />
            <label for="perm-willpower4"></label>
            <input
              type="radio"
              value="3"
              id="perm-willpower3"
              v-model="ratingDots"
            />
            <label for="perm-willpower3"></label>
            <input
              type="radio"
              value="2"
              id="perm-willpower2"
              v-model="ratingDots"
            />
            <label for="perm-willpower2"></label>
            <input
              type="radio"
              value="1"
              id="perm-willpower1"
              v-model="ratingDots"
            />
            <label
              for="perm-willpower1"
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
        <td style="line-height: 0.8">
          <div class="temp-willpower">
            <input
              type="radio"
              value="10"
              id="temp-willpower10"
              v-model="ratingBoxes"
            />
            <label for="temp-willpower10"></label>
            <input
              type="radio"
              value="9"
              id="temp-willpower9"
              v-model="ratingBoxes"
            />
            <label for="temp-willpower9"></label>
            <input
              type="radio"
              value="8"
              id="temp-willpower8"
              v-model="ratingBoxes"
            />
            <label for="temp-willpower8"></label>
            <input
              type="radio"
              value="7"
              id="temp-willpower7"
              v-model="ratingBoxes"
            />
            <label for="temp-willpower7"></label>
            <input
              type="radio"
              value="6"
              id="temp-willpower6"
              v-model="ratingBoxes"
            />
            <label for="temp-willpower6"></label>
            <input
              type="radio"
              value="5"
              id="temp-willpower5"
              v-model="ratingBoxes"
            />
            <label for="temp-willpower5"></label>
            <input
              type="radio"
              value="4"
              id="temp-willpower4"
              v-model="ratingBoxes"
            />
            <label for="temp-willpower4"></label>
            <input
              type="radio"
              value="3"
              id="temp-willpower3"
              v-model="ratingBoxes"
            />
            <label for="temp-willpower3"></label>
            <input
              type="radio"
              value="2"
              id="temp-willpower2"
              v-model="ratingBoxes"
            />
            <label for="temp-willpower2"></label>
            <input
              type="radio"
              value="1"
              id="temp-willpower1"
              v-model="ratingBoxes"
            />
            <label
              for="temp-willpower1"
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
const props = defineProps(["initialValue", "onUpdate"]);

const ratingDots = ref(props.initialValue);
const ratingBoxes = ref(0);

watch([ratingDots], (newRatingDots) => {
  props.onUpdate(parseInt(newRatingDots));
});
</script>

<style scoped>
.perm-willpower {
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.15rem;
}

.perm-willpower input {
  display: none;
}

.perm-willpower label {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid black;
  cursor: pointer;
  background-color: transparent;
}

/* Fill stars on hover */
.perm-willpower label:hover,
.perm-willpower label:hover ~ label {
  background-color: black;
}

/* Fill stars on selection */
.perm-willpower input:checked ~ label {
  background-color: black;
}

.temp-willpower {
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.15rem;
}

.temp-willpower input {
  display: none;
}

.temp-willpower label {
  width: 1rem;
  height: 1rem;
  border: 2px solid black;
  cursor: pointer;
  background-color: transparent;
}

/* Fill stars on hover */
.temp-willpower label:hover,
.temp-willpower label:hover ~ label {
  background-color: black;
}

/* Fill stars on selection */
.temp-willpower input:checked ~ label {
  background-color: black;
}
</style>
