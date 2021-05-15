export default {
  getAuthHeader () {
    let authData = JSON.parse(localStorage.getItem('auth_data'));

    if (authData) {
        return { 'Authorization': 'Bearer ' + authData.access_token };
    } else {
        return {};
    }
  }
}