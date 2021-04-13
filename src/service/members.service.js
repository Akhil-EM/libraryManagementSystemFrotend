import http from '../@axios';

class MembersService{
    fetchAllMembers(_data){
        return http.post("members/fetch-all",_data);
    }
    createMember(_data){
        return http.post('members/create',_data);
    }
   
    
}


export default new MembersService();