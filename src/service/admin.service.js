import http from '../@axios';

class AdminService{
      url="admin/"
    login(_data){
        return http.post(this.url+"login",_data);
    }
    
    fetchLibraries(_data){
        return http.post(this.url+'fetch-librarys',_data);
    }
   
    ActivateOrDeactivateLibrary(_data){
        return http.post(this.url+'approve-libraryout',_data);
    }
    
}


export default new AdminService();