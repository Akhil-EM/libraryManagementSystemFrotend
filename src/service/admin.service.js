import http from '../@axios';

class AdminService{
    login(_data){
        return http.post("admin/login",_data);
    }
    
    fetchLibraries(_data){
        return http.post('/',_data);
    }
   
    
}


export default new AdminService();