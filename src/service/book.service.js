import http from '../@axios';

class Handlebook{
    
    fetchByCatogory(_data){
        return http.post("books/category-fetch",_data);
    }
    addBook(_data){
        return http.post("books/add",_data);
    }
    searchBookByAnything(_data){
        return http.post("books/search",_data)
    }

    issueBook(_data){
        return http.post("books/issue",_data)
    }
    
    returnBook(_data){
        return http.post("books/return",_data)
    }

    deleteBook(_data){
        return http.post("books/delete",_data)
    }
}


export default new Handlebook();