<template>
  <v-card tile outlined  v-if="auth">
    <v-toolbar flat>
      <v-toolbar-title> Player </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn outlined color="primary" class="mr-5" @click="open(1)"
        >New Player</v-btn
      >
    </v-toolbar>

    <v-data-table
      :headers="headers"
      :items="items"
      disable-sort
      class="border-top"
    >
      <template v-slot:item.name="{ item }">
        {{ item.first_name }} {{ item.last_name }}
      </template>

      <template v-slot:item.team="{ item }">
        {{ optional(item, "team.name", "") }}
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
              <team-dropdown
                v-model="form.team_id"
                :error-messages="optional(errorMessage, `errors.team_id.0`, ``)"
              ></team-dropdown>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="form.email"
                class="b-tile"
                label="email"
                color="teal darken-4"
                outlined
                dense
                clearable
                :error-messages="optional(errorMessage, `errors.email.0`, ``)"
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="form.first_name"
                class="b-tile"
                label="first_name"
                color="teal darken-4"
                outlined
                dense
                clearable
                :error-messages="
                  optional(errorMessage, `errors.first_name.0`, ``)
                "
              ></v-text-field>
            </v-col>

            <v-col cols="12">
              <v-text-field
                v-model="form.last_name"
                class="b-tile"
                label="last_name"
                color="teal darken-4"
                outlined
                dense
                clearable
                :error-messages="
                  optional(errorMessage, `errors.last_name.0`, ``)
                "
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
import Player from "../../models/Player";
import TeamDropdown from "../../components/form/TeamDropdown";

export default {
  components: {
    TeamDropdown,
  },
  name: "PlayerIndex",
  data: () => ({
    headers: [
      { text: "ID", value: "id" },
      { text: "Name", value: "name" },
      { text: "Team", value: "team" },
      { text: "Actions", value: "action" },
    ],
    form: {
      id: "",
      team_id: "",
      email: "",
      first_name: "",
      last_name: "",
    },
    items: [],
    mode: 0,
    dialog: false,
    errorMessage: "",
  }),

  computed: {
    title() {
      return this.mode === 1 ? "New Player" : "Update Player";
    },

    teamId() {
      let { id } = this.$route.params;
      return id;
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
      Player.get(this.teamId)
        .then((res) => (this.items = res.data.data))
    },

    resetForm() {
      this.errorMessage = "";
      this.form = {
        id: "",
        team_id: "",
        email: "",
        first_name: "",
        last_name: "",
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
        Player.post(this.form)
          .then(() => {
            this.getItems();
            this.dialog = false;
          })
          .catch((err) => {
            this.errorMessage = err.response.data;
          });
      } else {
        Player.put(this.form.id, this.form)
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
      Player.delete(id)
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
