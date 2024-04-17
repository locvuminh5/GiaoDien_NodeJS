import axios from 'axios';


export const loginApi = async (username, password) => {
    let data = JSON.stringify({
        "username": username,
        "password": password
      });
      
      let config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3030/api/v1/auth/login',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      await axios.request(config)
      .then((response) => {
        // console.log("first")
        return response;
      })
      .catch((error) => {
        console.log(error);
        // onLogin({ token, role });
      });
  };