import store from './../store'
import router from './../router'

const base = "https://cod-warzone-guns-api.pawedrabik.repl.co"

const apiVersion = "v1.0"

const refreshTokenEndpoint = "token/refresh"

export default {
  getEndpoint(name){
    return base + "/" + apiVersion + "/" + name;
  },
  jsonPayloadReplacer(key, value) {
    
    if (value == "false" || value == "true")
    {
      return Boolean(value);
    }

    return value;
  },
  refreshToken () {
    const authData = JSON.parse(localStorage.getItem('auth_data'));

    if (typeof(authData) != "undefined")
    {
      const refreshToken = authData.refresh_token
      const requestOptions = {
        method : "POST",
        headers : {
          "Authorization" : "Bearer " + refreshToken
        }
      }

      fetch(this.getEndpoint(refreshTokenEndpoint), requestOptions)
      .then(response => {
        if (response.ok)
        {
          console.log("Refresh token ok");
          return response.json();
        }
        else {
          console.log("Refresh token not ok");
          localStorage.removeItem("auth_data");
          store.commit('checkIsAuthenticated');
          router.push("/login");
        }
      })
      .then(response => {
        let authData = {
          "access_token" : response.access_token,
          "refresh_token" : refreshToken
        };
        
        // Update auth data
        localStorage.setItem("auth_data", JSON.stringify(authData));
      })
      .catch(err => {
        console.error(err);
      });
    }
    
  } 
}