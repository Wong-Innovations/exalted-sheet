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
              :checked="props.valuePerm === 10"
            />
            <label
              for="perm-willpower10"
              @click.prevent="() => props.onUpdatePerm(10)"
            ></label>
            <input
              type="radio"
              value="9"
              id="perm-willpower9"
              :checked="props.valuePerm === 9"
            />
            <label
              for="perm-willpower9"
              @click.prevent="() => props.onUpdatePerm(9)"
            ></label>
            <input
              type="radio"
              value="8"
              id="perm-willpower8"
              :checked="props.valuePerm === 8"
            />
            <label
              for="perm-willpower8"
              @click.prevent="() => props.onUpdatePerm(8)"
            ></label>
            <input
              type="radio"
              value="7"
              id="perm-willpower7"
              :checked="props.valuePerm === 7"
            />
            <label
              for="perm-willpower7"
              @click.prevent="() => props.onUpdatePerm(7)"
            ></label>
            <input
              type="radio"
              value="6"
              id="perm-willpower6"
              :checked="props.valuePerm === 6"
            />
            <label
              for="perm-willpower6"
              @click.prevent="() => props.onUpdatePerm(6)"
            ></label>
            <input
              type="radio"
              value="5"
              id="perm-willpower5"
              :checked="props.valuePerm === 5"
            />
            <label
              for="perm-willpower5"
              @click.prevent="() => props.onUpdatePerm(5)"
            ></label>
            <input
              type="radio"
              value="4"
              id="perm-willpower4"
              :checked="props.valuePerm === 4"
            />
            <label
              for="perm-willpower4"
              @click.prevent="() => props.onUpdatePerm(4)"
            ></label>
            <input
              type="radio"
              value="3"
              id="perm-willpower3"
              :checked="props.valuePerm === 3"
            />
            <label
              for="perm-willpower3"
              @click.prevent="() => props.onUpdatePerm(3)"
            ></label>
            <input
              type="radio"
              value="2"
              id="perm-willpower2"
              :checked="props.valuePerm === 2"
            />
            <label
              for="perm-willpower2"
              @click.prevent="() => props.onUpdatePerm(2)"
            ></label>
            <input
              type="radio"
              value="1"
              id="perm-willpower1"
              :checked="props.valuePerm === 1"
            />
            <label
              for="perm-willpower1"
              @click.prevent="
                () => {
                  if (props.valuePerm == 1) {
                    props.onUpdatePerm(0);
                  } else {
                    props.onUpdatePerm(1);
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
              :checked="props.valueTemp === 10"
            />
            <label
              for="temp-willpower10"
              @click.prevent="() => props.onUpdateTemp(10)"
            ></label>
            <input
              type="radio"
              value="9"
              id="temp-willpower9"
              :checked="props.valueTemp === 9"
            />
            <label
              for="temp-willpower9"
              @click.prevent="() => props.onUpdateTemp(9)"
            ></label>
            <input
              type="radio"
              value="8"
              id="temp-willpower8"
              :checked="props.valueTemp === 8"
            />
            <label
              for="temp-willpower8"
              @click.prevent="() => props.onUpdateTemp(8)"
            ></label>
            <input
              type="radio"
              value="7"
              id="temp-willpower7"
              :checked="props.valueTemp === 7"
            />
            <label
              for="temp-willpower7"
              @click.prevent="() => props.onUpdateTemp(7)"
            ></label>
            <input
              type="radio"
              value="6"
              id="temp-willpower6"
              :checked="props.valueTemp === 6"
            />
            <label
              for="temp-willpower6"
              @click.prevent="() => props.onUpdateTemp(6)"
            ></label>
            <input
              type="radio"
              value="5"
              id="temp-willpower5"
              :checked="props.valueTemp === 5"
            />
            <label
              for="temp-willpower5"
              @click.prevent="() => props.onUpdateTemp(5)"
            ></label>
            <input
              type="radio"
              value="4"
              id="temp-willpower4"
              :checked="props.valueTemp === 4"
            />
            <label
              for="temp-willpower4"
              @click.prevent="() => props.onUpdateTemp(4)"
            ></label>
            <input
              type="radio"
              value="3"
              id="temp-willpower3"
              :checked="props.valueTemp === 3"
            />
            <label
              for="temp-willpower3"
              @click.prevent="() => props.onUpdateTemp(3)"
            ></label>
            <input
              type="radio"
              value="2"
              id="temp-willpower2"
              :checked="props.valueTemp === 2"
            />
            <label
              for="temp-willpower2"
              @click.prevent="() => props.onUpdateTemp(2)"
            ></label>
            <input
              type="radio"
              value="1"
              id="temp-willpower1"
              :checked="props.valueTemp === 1"
            />
            <label
              for="temp-willpower1"
              @click.prevent="
                () => {
                  if (props.valueTemp == 1) {
                    props.onUpdateTemp(0);
                  } else {
                    props.onUpdateTemp(1);
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
const props = defineProps([
  "valuePerm",
  "onUpdatePerm",
  "valueTemp",
  "onUpdateTemp",
]);
</script>

<style scoped>
.perm-willpower {
  display: inline-flex;
  flex-direction: row-reverse;
  gap: 0.1rem;
}

.perm-willpower input {
  display: none;
}

.perm-willpower label {
  width: 0.75rem;
  height: 0.75rem;
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
  gap: 0.1rem;
}

.temp-willpower input {
  display: none;
}

.temp-willpower label {
  width: 0.75rem;
  height: 0.75rem;
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
