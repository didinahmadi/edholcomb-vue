import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import router from "./router";
import store from "./store";
import axios from "axios";
import Helper from "./helpers/Helper";

axios.interceptors.request.use(
  function(config) {
    let token = localStorage.getItem("token");
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response.status == 401) {
            // document.location.href = "/";
            // localStorage.addItem('stopLogin', true);
        } else {
            return Promise.reject(error);
        }
    }
  );

Vue.prototype.optional = Helper.optional;

Vue.prototype.$axios = axios;

Vue.config.productionTip = false;

new Vue({
    vuetify,
    router,
    store,
    render: h => h(App)
}).$mount("#app");
