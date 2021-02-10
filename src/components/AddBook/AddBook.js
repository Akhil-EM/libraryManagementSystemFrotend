import React from 'react';                      
import './AddBook.css';                 
                                                


class AddBook extends React.Component { 
 
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
    
    //  this.updateButton();
    
     
     
}
render() {                                      
  return (                                      
          <div className="AddBook mb-5" >    
             
             <div className="container">
              <div className="row">
                <div className="col-sm-1">
                
                </div>
                <div className="col-sm-10 d-flex justify-content-center ">
                  
                    <div className="login-container mt-5">
                        <div className="login-header">
                            <h3 className="sign-in">Add a Book</h3>
                        </div>
                       
                        <div className="login-body">
                          <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                <input className="input" type="text" placeholder="book name "></input>
                                
                                </div>
                                <div className="col-sm">
                                <input className="input" type="text" placeholder="author"></input>
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                <select className="input" name="cars" id="cars" >
                                {/* TALES,Novel,Philosophy,Poems,Science,Spiritual,Sports,Translation,Travelogue,Yoga, */}
                                  <option value="Choose genre">Choose genre</option>
                                  <option value="Autobiography">Autobiography</option>
                                  <option value="Agriculture">Agriculture</option>
                                  <option value="Biography">Biography</option>
                                  <option value="Novel">Novel</option>
                                  <option value="Philosophy">Philosophy</option>
                                  <option value="Poems">Poems</option>
                                  <option value="Short Story">Short Story</option>
                                  <option value="Travelogue">Travelogue</option>
                                  <option value="Others">Others</option>
                                </select>
                                
                                </div>
                                <div className="col-sm">
                                        <input className="input" type="text" placeholder="publisher"></input>
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                <input className="input" type="int" placeholder="no of pages"></input>
                                
                                </div>
                                <div className="col-sm">
                                <input className="input" type="number" placeholder="price"></input>
                                </div>
                                
                              </div>
                           </div>    
      
                              <button className="button-common" style={{display:this.state.buttonDisplay}} onClick={this.submitForm}>Add</button><br></br>
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
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default AddBook;                 
