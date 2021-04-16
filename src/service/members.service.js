import http from '../@axios';

class MembersService{
    url=""
    fetchAllMembers(_data){
        return http.post(this.url+"fetch-all",_data);
    }
    createMember(_data){
        return http.post(this.url+'create',_data);
    }
   
    
}


export default new MembersService();