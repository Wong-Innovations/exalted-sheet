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
              :checked="props.valuePerm === 5"
            />
            <label
              :for="`perm-${props.source}5`"
              @click.prevent="() => props.onUpdatePerm(5)"
            ></label>
            <input
              type="radio"
              value="4"
              :id="`perm-${props.source}4`"
              :checked="props.valuePerm === 4"
            />
            <label
              :for="`perm-${props.source}4`"
              @click.prevent="() => props.onUpdatePerm(4)"
            ></label>
            <input
              type="radio"
              value="3"
              :id="`perm-${props.source}3`"
              :checked="props.valuePerm === 3"
            />
            <label
              :for="`perm-${props.source}3`"
              @click.prevent="() => props.onUpdatePerm(3)"
            ></label>
            <input
              type="radio"
              value="2"
              :id="`perm-${props.source}2`"
              :checked="props.valuePerm === 2"
            />
            <label
              :for="`perm-${props.source}2`"
              @click.prevent="() => props.onUpdatePerm(2)"
            ></label>
            <input
              type="radio"
              value="1"
              :id="`perm-${props.source}1`"
              :checked="props.valuePerm === 1"
            />
            <label
              :for="`perm-${props.source}1`"
              @click.prevent="
                () => {
                  if (props.valuePerm === 1) {
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
        <td style="line-height: 0.65">
          <div class="temp-virtue">
            <input
              type="radio"
              value="5"
              :id="`temp-${props.source}5`"
              :checked="props.valueTemp === 5"
            />
            <label
              :for="`temp-${props.source}5`"
              @click.prevent="() => props.onUpdateTemp(5)"
            ></label>
            <input
              type="radio"
              value="4"
              :id="`temp-${props.source}4`"
              :checked="props.valueTemp === 4"
            />
            <label
              :for="`temp-${props.source}4`"
              @click.prevent="() => props.onUpdateTemp(4)"
            ></label>
            <input
              type="radio"
              value="3"
              :id="`temp-${props.source}3`"
              :checked="props.valueTemp === 3"
            />
            <label
              :for="`temp-${props.source}3`"
              @click.prevent="() => props.onUpdateTemp(3)"
            ></label>
            <input
              type="radio"
              value="2"
              :id="`temp-${props.source}2`"
              :checked="props.valueTemp === 2"
            />
            <label
              :for="`temp-${props.source}2`"
              @click.prevent="() => props.onUpdateTemp(2)"
            ></label>
            <input
              type="radio"
              value="1"
              :id="`temp-${props.source}1`"
              :checked="props.valueTemp === 1"
            />
            <label
              :for="`temp-${props.source}1`"
              @click.prevent="
                () => {
                  if (props.valueTemp === 1) {
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
  "source",
]);
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
