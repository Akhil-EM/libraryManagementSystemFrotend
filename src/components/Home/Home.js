import React from 'react';                      
import './Home.css';                 
import {withRouter} from "react-router-dom";                                                
import bookService from '../../service/book.service';
class Home extends React.Component { 
   constructor(){
      super();
      this.state={
          autobiographyBookError:'grid',
          fictionBookError:'grid',
          novelBookError:'grid',
          autobiographyBooks:[],
          fictionbooks:[],
          novelbooks:[]
      }
      
      

   }
   
   componentWillMount(){
      this.fetchBooks('autobiography');
      this.fetchBooks('fiction');
      this.fetchBooks('novel')
   }
   fetchBooks=(_category)=>{
        let library_id=localStorage.getItem('userid');
        var book_search_credentials={
               category:_category,
               libraryId:library_id}
            
         //  console.log(book_search_credentials)
         bookService.fetchByCatogory(book_search_credentials)
            .then(response => {
              this.setState({buttonDisplay:'inline',spinnerDisplay:'none'});
              let feedback=response.data;
                
            //  console.log(feedback);
              if(_category==='autobiography'){
               // console.log(feedback.info);
               if((feedback.info).length!==0){
                  this.setState({autobiographyBookError:'none',autobiographyBooks:feedback.info});
               }
               
                  }
                  if(_category==='fiction'){
                  if((feedback.info).length !==0){
                     this.setState({fictionBookError:'none',fictionbooks:feedback.info});
                  }
                  
               }
               if(_category==='novel'){
                  if((feedback.info).length!==0){
                     
                     this.setState({novelBookError:'none',novelbooks:feedback.info});
                  }
                  
               }
            })
            .catch(e => {
                // console.error(e);
                this.setState({buttonDisplay:'inline',spinnerDisplay:'none'});
            });
        
   }
   
   

render() {  
     
                                     
  return (                                     
          <div className="Home" >               
              <h3 className="books-avavilable">Books Available</h3>  
              <hr></hr>
              <div className="book-section">
                <h3 className="m-3">Autobiography</h3> 
                  <div style={{display:this.state.autobiographyBookError}} className="alert alert-warning m-5" role="alert" >
                     <h4 className="text-center m-5"><b>No books avilable in this category..!!</b></h4>
                  </div>
                 <div className="book-shelf" >
                     {
                        this.state.autobiographyBooks.map((item,key)=>(
                           <div className="book-card" key={key}>
                           <p className="book-name">{item.name}</p>
                           <p className="book-details">Author:<span>{item.author}</span> </p>
                           <p className="book-details">publisher:<span>{item.publisher}</span> </p>
                           <p className="book-details">price:<span>{item.price}</span> </p>
                           </div>
                        ))
                     }
                     
                  
                 </div>
                  
              </div> 
              <div className="book-section">
                <h3 className="m-3">Fiction</h3> 
                <div style={{display:this.state.fictionBookError}} className="alert alert-warning m-5" role="alert" >
                     <h4 className="text-center m-5"><b>No books avilable in this category..!!</b></h4>
                  </div>
                 <div className="book-shelf" >
                     {
                        this.state.fictionbooks.map((item,key)=>(
                           <div className="book-card" key={key}>
                           <p className="book-name">{item.name}</p>
                           <p className="book-details">Author:<span>{item.author}</span> </p>
                           <p className="book-details">publisher:<span>{item.publisher}</span> </p>
                           <p className="book-details">price:<span>{item.price}</span> </p>
                           </div>
                        ))
                     }
                     
                  
                 </div>
                  
              </div> 
              <div className="book-section">
                <h3 className="m-3">Novel</h3> 
                <div style={{display:this.state.novelBookError}} className="alert alert-warning m-5" role="alert" >
                     <h4 className="text-center m-5"><b>No books avilable in this category..!!</b></h4>
                  </div>
                 <div className="book-shelf" >
                     {
                        this.state.novelbooks.map((item,key)=>(
                           <div className="book-card" key={key}>
                           <p className="book-name">{item.name}</p>
                           <p className="book-details">Author:<span>{item.author}</span> </p>
                           <p className="book-details">publisher:<span>{item.publisher}</span> </p>
                           <p className="book-details">price:<span>{item.price}</span> </p>
                           </div>
                        ))
                     }
                     
                  
                 </div>
                  
              </div> 
              
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default withRouter(Home);                 
