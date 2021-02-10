import React from 'react';                      
import './NewMembership.css';                 
                                                
                                                
class NewMembership extends React.Component { 
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
          <div className="NewMembership" >
            <br></br> 
                  <div className="container mb-5">
              <div className="row">
                <div className="col-sm-1">
                
                </div>
                <div className="col-sm-10 d-flex justify-content-center ">
                  
                    <div className="login-container mt-5">
                        <div className="login-header">
                            <h3 className="sign-in">New Membership</h3>
                        </div>
                       
                        <div className="login-body">
                           
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                <input className="input" type="text" placeholder="member id"></input>
                                
                                </div>
                                <div className="col-sm">
                                      <input className="input" type="text" placeholder="name"></input>
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                <input className="input" type="text" placeholder="email"></input>
                                
                                </div>
                                <div className="col-sm">
                                      <input className="input" type="text" placeholder="password"></input>
                                </div>
                                
                              </div>
                           </div>
                           
      
                              <button className="button-common" style={{display:this.state.buttonDisplay}} onClick={this.submitForm}>create</button><br></br>
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
            
              <br></br> 
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default NewMembership;                 
