import http from '../@axios';

class HandleLibrary{
    login(_data){
        
        return http.post("library/login",_data);
    }
    
    createLibrary(_data){
        return http.post("library/register",_data);
    }
}


export default new HandleLibrary();