const host = 'http://127.0.0.1:8000';
const prefix = `${host}/api/v1`;

const urls = {
    getProfile: `${prefix}/get_profile/`,
    profilesDetails: `${prefix}/profiles_details/`,
    createProfile: `${prefix}/create_profile/`,
    updateProfile: `${prefix}/update_profile/`,
}

export default urls;