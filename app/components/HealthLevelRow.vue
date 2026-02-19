<template>
  <table class="levels" style="border-collapse: collapse">
    <tbody>
      <tr v-for="(row, row_index) in props.levels" style="line-height: 1.1">
        <input
          type="checkbox"
          style="
            height: 14px;
            width: 14px;
            margin-block: 0px;
            margin-inline: 2px;
            position: relative;
          "
          v-for="(value, col_index) in row"
          :key="`hl-${row_index}-${col_index}`"
          :class="value"
          @click.prevent="
            () => {
              switch (value) {
                case '':
                  props.onUpdate(row_index, col_index, 'bashing');
                  break;
                case 'bashing':
                  props.onUpdate(row_index, col_index, 'lethal');
                  break;
                case 'lethal':
                  props.onUpdate(row_index, col_index, 'aggrivated');
                  break;
                case 'locked':
                  break;
                default:
                  props.onUpdate(row_index, col_index, '');
              }
              return false;
            }
          "
          @click.right.prevent="
            () => {
              switch (value) {
                case 'locked':
                  props.onUpdate(row_index, col_index, '');
                  break;
                default:
                  props.onUpdate(row_index, col_index, 'locked');
              }
              return false;
            }
          "
          :title="value === 'locked' ? 'Right Click to Unlock' : ''"
        />
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps(["levels", "onUpdate"]);
</script>

<style scoped>
.locked::before {
  content: "";
  position: absolute;
  inset: 0px;
  background-color: gray;
}

.bashing::before {
  content: "";
  position: absolute;
  inset: 0px;
  background: linear-gradient(
    -45deg,
    transparent 45%,
    black 45%,
    black 55%,
    transparent 55%
  );
}

.lethal::before {
  content: "";
  position: absolute;
  inset: 0px;
  background:
    linear-gradient(
      45deg,
      transparent 45%,
      black 45%,
      black 55%,
      transparent 55%
    ),
    linear-gradient(
      -45deg,
      transparent 45%,
      black 45%,
      black 55%,
      transparent 55%
    );
}

.aggrivated::before {
  content: "";
  position: absolute;
  inset: 0px;
  background:
    linear-gradient(
      35deg,
      transparent 45%,
      black 45%,
      black 55%,
      transparent 55%
    ),
    linear-gradient(
      -35deg,
      transparent 45%,
      black 45%,
      black 55%,
      transparent 55%
    ),
    linear-gradient(
      90deg,
      transparent 43%,
      black 43%,
      black 57%,
      transparent 57%
    );
}
</style>
