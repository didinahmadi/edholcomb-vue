<template>
    <header>
        <v-toolbar color="primary" dense flat dark>
            <v-divider vertical class="ml-12"></v-divider>
            <v-divider vertical></v-divider>

            <template v-if="auth.user.id">
                <v-menu
                    offsetY
                    origin="center center"
                    transition="scale-transition"
                >
                    <template v-slot:activator="{ on }">
                        <v-avatar
                            color="white"
                            size="36"
                            class="mx-3 pointer"
                            v-on="on"
                        >
                            <span class="primary--text profile-avatar">{{auth.user.name[0]}}</span>
                        </v-avatar>
                    </template>

                    <v-list>
                        <v-list-item-group color="primary">
                            <v-list-item @click="signOut">
                                <v-list-item-title>
                                    Sign Out
                                </v-list-item-title>
                                <v-list-item-action>
                                    <v-icon>mdi-logout</v-icon>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list-item-group>
                    </v-list>
                </v-menu>
                <v-divider vertical class="mr-3"></v-divider>
                <span class="user-greeting">
                    Hi, {{ auth.user.name }}
                </span>
            </template>

            <template v-else>
                <v-btn text large tile class="text-capitalize" to="/">
                    sign in
                    <v-icon class="ml-1">mdi-login</v-icon>
                </v-btn>
                <v-divider vertical></v-divider>
            </template>

            <v-spacer></v-spacer>

            <v-divider vertical class="ml-12"></v-divider>
           
        </v-toolbar>


        <v-tabs class="mt-12" centered>
            <v-tab
                v-for="link in links"
                :key="link.title"
                v-text="link.title"
                :to="link.to"
                class="navLink"
            ></v-tab>
        </v-tabs>
    </header>
</template>

<script>
import { mapMutations } from "vuex";

export default {
    name: "AppHeader",

    data: () => ({
        links: [
            { title: "team", to: "/team" },
            { title: "player", to: "/player" },
        ]
    }),

    computed: {
        auth() {
            return this.$store.state.auth;
        }
    },

    methods: {
        ...mapMutations(["removeAuth"]),

        search() {
            alert(5);
        },

        signOut() {
            this.removeAuth();
        }
    }
};
</script>

<style scoped>
.navLink {
    font-size: 18px;
    font-weight: 600;
    width: 150px;
    text-transform: capitalize;
}

.favorites-badge {
    font-size: 12px;
    position: absolute;
    top: 10.5px;
    left: 12.5px;
}

.profile-avatar {
    font-size: 1.2rem !important;
    font-weight: 500;
    line-height: 2rem;
}

.user-greeting {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.0892857143em;
}
</style>
