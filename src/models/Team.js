import axios from "axios";
const url = `${process.env.VUE_APP_API_URL}/api/team`;

export default class Team {    
    
    static get = () => axios.get(url);

    static post(payload) {
        return axios.post(url, payload);
    }

    static put(id, payload) {
        return axios.put(`${url}/${id}`, payload);
    }

    static delete(id) {
        return (
            confirm("Are you sure you want to delete this?") &&
            axios.delete(`${url}/${id}`)
        );
    }
}
