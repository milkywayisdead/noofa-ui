import urls from './urls.js';
import axios from 'axios';

const api = {
    getProfile(profileId){
        return axios.get(urls.getProfile + profileId);
    },
    profilesDetails(){
        return axios.get(urls.profilesDetails);
    },
}

export default api;