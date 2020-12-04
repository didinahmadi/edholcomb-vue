<template>
  <v-card tile outlined v-if="auth">
    <v-toolbar flat>
      <v-toolbar-title> Team </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined color="primary" class="mr-5" @click="open(1)"
        >New Team</v-btn
      >
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="items"
      disable-sort
      class="border-top"
    >
      <template v-slot:item.name="{ item }">
        <router-link :to="`/team/${item.id}`">{{ item.name }}</router-link>
      </template>

      <template v-slot:item.player_count="{ item }">
        {{ item.player_count }}
      </template>

      <template v-slot:item.action="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              class="mr-2"
              color="yellow darken-3"
              v-on="on"
              @click="open(2, item)"
              >mdi-pencil-outline</v-icon
            >
          </template>
          <span>Update</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon color="red" v-on="on" @click="remove(item.id)"
              >mdi-delete-outline</v-icon
            >
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>
    </v-data-table>

    <v-dialog v-model="dialog" max-width="50%" persistent>
      <v-card>
        <v-card-title>{{ title }}</v-card-title>

        <v-container>
          <v-row no-gutters justify="space-around">
            <v-col cols="12">
              <v-text-field
                v-model="form.name"
                class="b-tile"
                label="name"
                color="teal darken-4"
                outlined
                dense
                clearable
                :error-messages="optional(errorMessage, `errors.name.0`, ``)"
              ></v-text-field>
            </v-col>
          </v-row>
        </v-container>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text @click="dialog = false">cancel</v-btn>
          <v-btn color="teal darken-4" dark width="90" @click="save"
            >save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import Team from "../../models/Team";

export default {
  name: "TeamIndex",
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Name", value: "name" },
      { text: "Total Player", value: "player_count" },
      { text: "Actions", value: "action" },
    ],
    form: {
      id: "",
      name: "",
    },
    items: [],
    mode: 0,
    dialog: false,
    errorMessage: "",
  }),

  computed: {
    title() {
      return this.mode === 1 ? "New Team" : "Update Team";
    },
    auth() {
        return this.$store.state.auth.user;
    },
    
  },

  watch: {
      auth(n) {
          if (!n) {
              this.$router.push('/');
          }
      }
  },

  methods: {
    getItems() {
      Team.get()
        .then((res) => (this.items = res.data.data))
    },

    resetForm() {
      this.errorMessage = "";
      this.form = {
        id: "",
        name: "",
      };
    },

    open(mode, item) {
      this.resetForm();
      if (item) {
        this.form = { ...item };
      }
      this.mode = mode;
      this.dialog = true;
    },

    save() {
      if (this.mode === 1) {
        Team.post(this.form)
          .then(() => {
            this.getItems();
            this.dialog = false;
          })
          .catch((err) => {
            this.errorMessage = err.response.data;
          });
      } else {
        Team.put(this.form.id, this.form)
          .then(() => {
            this.getItems();
            this.dialog = false;
          })
          .catch((err) => {
            this.errorMessage = err.response.data;
          });
      }
    },

    remove(id) {
      this.dialog = false;
      Team.delete(id)
        .then(() => this.getItems())
        .catch((err) => {
          this.errorMessage = err.response.data;
        });
    },
  },

  created() {
    this.getItems();
  },
};
</script>
