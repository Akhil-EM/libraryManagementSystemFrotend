import http from '../@axios';

class AdminService{
    login(_data){
        return http.post("admin/login",_data);
    }
    
    fetchLibraries(_data){
        return http.post('admin/fetch-librarys',_data);
    }
   
    ActivateOrDeactivateLibrary(_data){
        return http.post('admin/approve-libraryout ',_data);
    }
    
}


export default new AdminService();