const host = 'http://127.0.0.1:8000';
const prefix = `${host}/api/v1`;
const urls = {
    getProfile: `${prefix}/get_profile/`,
    getProfiles: `${prefix}/get_profiles/`,
}

export default urls;