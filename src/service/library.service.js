import http from '../@axios';

class HandleLibrary{
    url="library/";
    login(_data){
        
        return http.post(this.url+"login",_data);
    }
    
    createLibrary(_data){
        return http.post(this.url+"register",_data);
    }
}


export default new HandleLibrary();