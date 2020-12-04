import axios from "axios";
const url = `${process.env.VUE_APP_API_URL}/api`;

export default class Auth {
  static get = () => axios.get(`${url}/me`);

  static login(payload) {
    return axios.post(`${url}/login`, payload);
  }

  static logout() {
    return axios.post(`${url}/logout`);
  }
}
