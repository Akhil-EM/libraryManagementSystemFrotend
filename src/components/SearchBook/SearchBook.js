import React from 'react';                      
import './SearchBook.css';  
import ErrorImage from '../../images/error.svg';              
import BookCard from "../BookCard/BookCard";                                               
import Handlebook from "../../service/book.service"                                               
class SearchBook extends React.Component { 
  constructor(){
    super();

    this.state={
        buttonDisplay:'inline',
        spinnerDisplay:'none',
        selectKeyError:'none',
        selectValueError:'none',
        searchBy:'',
        searchKey:'',
        bookNotFoundError:'none',
        bookResultArray:[],
        error_message:'',
        booksContainerDisplay:'none',
        resultsDisplay:'none'

      }
  }

showSpinner=()=>{
  this.setState({spinnerDisplay:"",buttonDisplay:'none'});
}
hideSpinner=()=>{
  this.setState({spinnerDisplay:"none",buttonDisplay:''});
}

onInputItemChange=(e)=>{
  // console.log(e.target.value);
  this.setState({[e.target.name]:e.target.value});
}

validateOnFocusOut=(e)=>{
     
  let inputName=e.target.name;
  switch (inputName) {
    case 'searchBy':
                  if(this.state.searchBy===''){
                         this.setState({selectKeyError:''});
                    }else{ this.setState({selectKeyError:'none'}); }
        break;
    case 'searchKey':
                if(this.state.searchKey===''){
                      this.setState({selectValueError:''});
                  }else{ this.setState({selectValueError:'none'}); }
        break; 
       
     default:
      break;
  }
    


  

 
}
submitForm=()=>{
      let error=true;
      if(this.state.searchBy===''){
         error=false;
        this.setState({selectKeyError:''});
      }else{ this.setState({selectKeyError:'none'}); }
      if(this.state.searchKey===''){
         error=false;
        this.setState({selectValueError:''});
      }else{ this.setState({selectValueError:'none'}); }
    
       
      if(error){
        this.communicateServer()
      }
     
         
}



communicateServer=()=>{
   this.showSpinner();
   this.setState({bookNotFoundError:'none',bookResultArray:[]})
   let library_id=localStorage.getItem('userid');
   let book_search_credentials={
    libraryId:library_id,
    searchBy:this.state.searchBy,
    searchKey:this.state.searchKey}

      Handlebook.searchBookByAnything(book_search_credentials)
            .then(response => {
                this.hideSpinner()        ;
                let feedback=response.data;
                this.setState({resultsDisplay:''});
                // console.log(feedback);
                if(feedback.status==='error'){
                  this.setState({bookNotFoundError:'',error_message:'something went wrong try again.!!'});
                }
                if(feedback.status==='success'){
                    if((feedback.books).length===0){
                      this.setState({bookNotFoundError:'',error_message:'no book found !!'});
                    }else{
                        
                        this.setState({bookResultArray:feedback.books,booksContainerDisplay:''})
                    }
                }
            })
            .catch(e => {
                // console.error(e);
                this.hideSpinner();
                this.setState({resultsDisplay:''})
            });
   




}

render() {                                      
  return (                                      
          <div className="SearchBook" >  
             <div className="container mb-5">
              <div className="row">
                <div className="col-sm-1">
                
                </div>
                <div className="col-sm-10 d-flex justify-content-center ">
                  
                    <div className="login-container mt-5">
                        <div className="login-header">
                            <h3 className="sign-in">Search Book</h3>
                        </div>
                       
                        <div className="login-body">
                           
                           <div className="container ">
                              <div className="row ">
                                <div className="col-sm d-flex justify-content-center ">
                                      <div  className="input-with-error">
                                        <select className="input-inner" name="searchBy" onChange={this.onInputItemChange} onBlur={this.validateOnFocusOut}>
                                             {/* TALES,Novel,Philosophy,Poems,Science,Spiritual,Sports,Translation,Travelogue,Yoga, */}
                                          <option value="Choose genre">Search book by</option>
                                          <option value="name">Book name</option>
                                          <option value="genre">genre</option>
                                          <option value="author">author</option>
                                          <option value="publisher">publisher</option>
                                        </select>
                                        <img style={{display:this.state.selectKeyError}} src={ErrorImage} alt="error" />
                                      </div> 
                                    
                                
                                </div>
                                <div className="col-sm d-flex justify-content-center">
                                      <div  className="input-with-error">
                                            <input className="input-inner" type="text" placeholder="value" name="searchKey"  onBlur={this.validateOnFocusOut} onChange={this.onInputItemChange}></input>
                                            <img style={{display:this.state.selectValueError}} src={ErrorImage} alt="error" />
                                      </div>   
                                </div>
                                
                              </div>
                           </div>
                           
      
                              <button className="button-common" style={{display:this.state.buttonDisplay}} onClick={this.submitForm}>search</button><br></br>
                              <div className="spinner-border  spinner" style={{display:this.state.spinnerDisplay}} role="status" ></div>
                        </div>
                        
                     </div> 
                     
                </div>
                <div className="col-sm-1">
                  
                </div>
              </div>
            </div> 
            <br></br>
            <br></br>  
            <br></br>
           
            <hr></hr>
             <h3 className="results" style={{display:this.state.resultsDisplay}}>Results</h3>
             <div className="container">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10 ">
                {/* style={{display:this.state.bookNotFoundError}} */}
                    <div className="alert alert-warning text-center" role="alert" style={{display:this.state.bookNotFoundError}}>
                      <b>{this.state.error_message}</b>
                    </div>
                    
                    <div style={{display:this.state.booksContainerDisplay}}>
                          {
                              this.state.bookResultArray.map((item,key)=>(
                                 <div key={key}>
                                   
                                      
                                     <BookCard bookRentersId={item.bookIssueDetails[0].bookInHandId} bookIssueId={item.bookIssueDetails[1].bookIssueId} bookRentersname={item.bookIssueDetails[2].rentersName}  name={item.name} author={item.author} genre={item.genre} publisher={item.publisher} price={item.price} noOfPages={item.noOfPages} bookAvailable={item.isAvilable} bookId={item._id} bookInHand={item.bookInhand} ></BookCard>
                                 </div>
                                 
                              ))
                          }
                          



                    </div>
                   



                                       
                   

                </div>
                <div className="col-sm-1"></div>
              </div>
            </div>
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default SearchBook;                 
