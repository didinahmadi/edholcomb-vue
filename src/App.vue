<template>
  <v-app>
    <router-view name="header"></router-view>

    <v-main>
      <router-view></router-view>
    </v-main>

    <router-view name="footer"></router-view>
  </v-app>
</template>

<script>
import { mapMutations } from "vuex";
import Auth from "././models/Auth";

export default {
  name: "App",
  data: () => ({}),

  methods: {
    ...mapMutations(["setToken", "setUser"]),

    getUser() {        
        Auth.get()
          .then((res) => this.setUser(res.data))      
    },

    initialize() {
      this.getUser();
    },
  },

  created() {
    this.initialize();
  },
};
</script>
