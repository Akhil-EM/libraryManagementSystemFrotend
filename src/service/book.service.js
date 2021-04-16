import http from '../@axios';

class Handlebook{
    url='books/'
    fetchByCatogory(_data){
        return http.post(this.url+"category-fetch",_data);
    }
    addBook(_data){
        return http.post(this.url+"add",_data);
    }
    searchBookByAnything(_data){
        return http.post(this.url+"search",_data)
    }

    issueBook(_data){
        return http.post(this.url+"issue",_data)
    }
    
    returnBook(_data){
        return http.post(this.url+"return",_data)
    }

    deleteBook(_data){
        return http.post("delete",_data)
    }
}


export default new Handlebook();