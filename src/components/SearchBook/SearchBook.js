import React from 'react';                      
import './SearchBook.css';                 
                                                
                                                
class SearchBook extends React.Component { 
  constructor(){
    super();

    this.state={
      buttonDisplay:'inline',
      spinnerDisplay:'none'
      
    }
  }

updateButton=()=>{
  this.setState({spinnerDisplay:"",buttonDisplay:'none'});
}
oldButton=()=>{
  this.setState({buttonFontSize:"18px",
  buttonWidth:"40%",
  buttonBorder:"2px solid rgb(0, 0, 0)",
  buttonDisplay:'flex'});
 
}
submitForm=()=>{
    
     this.updateButton();
     
     
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
                           
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                <select className="input" name="cars" id="cars" >
                                {/* TALES,Novel,Philosophy,Poems,Science,Spiritual,Sports,Translation,Travelogue,Yoga, */}
                                  <option value="Choose genre">Search book by</option>
                                  <option value="name">Book name</option>
                                  <option value="genre">genre</option>
                                  <option value="author">author</option>
                                  <option value="publisher">publisher</option>
                                </select>
                                
                                </div>
                                <div className="col-sm">
                                        <input className="input" type="text" placeholder="value"></input>
                                </div>
                                
                              </div>
                           </div>
                           
      
                              <button className="button-common" style={{display:this.state.buttonDisplay}} onClick={this.submitForm}>search</button><br></br>
                              <div className="spinner-border  spinner" style={{display:this.state.spinnerDisplay}} role="status">
                                {/* <span className="sr-only">Loading...</span> */}
                              </div>
                        </div>
                        
                     </div> 
                     
                </div>
                <div className="col-sm-1">
                  
                </div>
              </div>
            </div>   
            <hr></hr>
             <h3 className="results">Results</h3>
             <div className="container">
              <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10 ">
                    <div className="alert alert-warning text-center" role="alert">
                      <b>No books found try again.!</b>
                    </div>

                    <div className="card m-5">
                      <div className="card-header text-center">
                        <h3 className="book-name">Three cups of tea</h3>
                      </div>
                      <div className="card-body">
                         <ul>
                            <li><b>Author : Greg Mortenson, David Oliver Relin</b></li>
                            <li><b>genre : Autobiography</b></li>
                            <li><b>Publisher : H&N</b></li>
                            <li><b>Price : 400 Rs</b></li>
                            <li><b>No of pages : 350</b></li>
                            
                         </ul>
                         <br></br>
                         {/* <div class="alert alert-danger text-center m-3" role="alert">
                              <b>Sorry this book is not available</b>
                         </div> */}
                         <div className="d-flex justify-content-between ">
                             <button type="button " className="btn btn-info ml-5" >Issue book</button>
                             <button type="button" className="btn btn-danger mr-5">Delete book</button>
                         </div>
                      </div>
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
