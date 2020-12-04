<template>
  <v-container style="height: 100%">
    <v-row class="fill-height" justify="center" align="center">
      <v-card outlined width="500" tile>
        <v-col class="py-5 text-center">
          <h1>You have logged out</h1>
          <router-link to="/">relogin</router-link>
        </v-col>        
      </v-card>
    </v-row>
  </v-container>
</template>

<script>

export default {
  
};
</script>
