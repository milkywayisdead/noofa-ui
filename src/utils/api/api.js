import urls from './urls.js';
import axios from 'axios';

const api = {
    getProfile(profileId){
        return axios.get(urls.getProfile + profileId);
    },
    profilesDetails(){
        return axios.get(urls.profilesDetails);
    },
    createProfile(payload){
        return axios.post(urls.createProfile, payload);
    },
    updateProfile(profileId, payload){
        return axios.post(urls.updateProfile + profileId, payload);
    },
    deleteProfile(profileId){
        return axios.post(urls.deleteProfile + profileId);
    },
    partialUpdate(profileId, target, targetId, payload){
        return axios.post(
            `${urls.partialUpdate + profileId}/?target=${target}&target_id=${targetId}`, 
            payload
        )
    },
}

export default api;