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
          "
          v-for="(value, col_index) in row"
          :key="`hl-${row_index}-${col_index}`"
          :disabled="value == 'locked'"
          :checked="value == 'locked'"
        />
      </tr>
    </tbody>
  </table>
</template>

<script setup>
const props = defineProps(["levels"]);
</script>

<style scoped>
.levels {
}
</style>
