<template>
  <v-container style="height: 100%">
    <v-row class="fill-height" justify="center" align="center">
      <v-card outlined width="500" tile>

        <v-card-title>
          <v-col class="text-center"> Log In </v-col>
        </v-card-title>

        <v-form v-model="valid" class="px-5" @submit.prevent="SignIn">
          <v-text-field
            v-model="email"
            type="email"
            label="Email"
            outlined
            clearable
            :error-messages="optional(errorMessage, `errors.title.0`, ``)"
          ></v-text-field>

          <v-text-field
            v-model="password"
            ref="password"
            :type="showPassword ? 'text' : 'password'"
            class="mt-1"
            label="Password"
            outlined
            clearable
            append-icon="mdi-eye"
            @click:append="showPassword = !showPassword"
            :error-messages="optional(errorMessage, `errors.title.0`, ``)"
          >
          </v-text-field>

          <v-alert v-if="serverError" type="error">{{ optional(serverError, "error") }}</v-alert>

          <v-card-actions class="px-0">
            <v-spacer></v-spacer>
            <v-btn type="submit" color="primary" tile :disabled="disabled"
              >sign in</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapMutations } from "vuex";

export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      setTimeout(() => {
        if (vm.$store.state.auth.user.id) {
          vm.$router.push("/team");
        }
      }, 300);
    });
  },

  data() {
    return {
      serverError: "",
      valid: false,
      disabled: true,
      showPassword: false,
      email: "",
      password: "",
      errorMessage: [], 
    };
  },

  methods: {
    ...mapMutations(["setToken", "setUser"]),

    SignIn() {
      this.disabled = true;
      this.$axios
        .post(`${process.env.VUE_APP_API_URL}/api/login`, {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          localStorage.setItem("token", res.data.access_token);
          this.setToken(res.data.access_token);
          this.setUser(res.data.user);
          this.$router.replace("/team");
        })
        .catch((err) => {
          this.serverError = err.response.data;
          this.disabled = false;
        });
    },
  },

  watch: {
    valid(val) {
      if (val) {
        this.disabled = false;
      } else {
        this.disabled = true;
      }
    },
  },
};
</script>
