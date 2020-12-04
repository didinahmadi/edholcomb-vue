import axios from "axios";
const url = `${process.env.VUE_APP_API_URL}/api/player`;

export default class Player {    
    
    static get = (teamId) => {
        let _url = url;
        if (teamId) {
            _url += `?team_id=${teamId}`
        }
        return axios.get(_url);
    }

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
