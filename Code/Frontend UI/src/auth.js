import jwt from 'jsonwebtoken';

const auth = {
    getToken(){
        //console.log("hellow orld!!!", localStorage.getItem("auth_token"));
        let auth_token = localStorage.getItem("auth_token");
        if (auth_token !== null){
            //let decoded = jwt.decode(auth_token);
            return true;
        }
        else {
            return null;
        }
    },

    removeToken(){
        localStorage.removeItem("auth_token");
    }
};


export default auth;