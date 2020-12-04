<template>
  <div>
    <v-select
      v-model="innerValue"
      :value="innerValue"
      :items="items"
      item-value="id"
      item-text="name"
      label="Select Team"
      solo
      outlined
      dense
      clearable
      :error-messages="errorMessages"
    ></v-select>
  </div>
</template>

<script>
import Team from "../../models/Team";

export default {
  name: "TeamDropdown",
  props: ["errorMessages", "value"],
  data() {
    return {
      items: [],
      innerValue: this.value
    };
  },
  watch: {
    value(v) {
      this.innerValue = v;
    },
    innerValue(v) {
      this.$emit("input", v);
    },
  },
  created() {
    Team.get().then((response) => {
      this.items = response.data.data;
    });
  },
};
</script>