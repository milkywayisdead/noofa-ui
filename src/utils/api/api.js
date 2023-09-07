import urls from './urls.js';
import axios from 'axios';

const api = {
    getProfile(profileId){
        return axios.get(urls.getProfile + profileId);
    },
    getProfiles(){
        return axios.get(urls.getProfiles);
    },
}

export default api;