import React from 'react';                      
import './Signup.css';                 
import {withRouter} from "react-router-dom";                                                 
import ValidationError from '../ValidateError/ValidateError';


class Signup extends React.Component { 
  constructor(props){
     super(props);
     this.state={
      
            name:'',
            email:'',
            password:'',
            confirmPassword:'',
            registrationNo:'',
            EstablishedDate:'',
            place:'',
            pincode:'',
            displayToolTip:'none',
            nameErrorShow:'none',
            emailErrorShow:'none',
            passwordErrorShow:'none',
            confirmPasswordErrorShow:'none',
            registrationErrorShow:'none',
            estdErrorShow:'none',
            placeErrorShow:'none',
            pincodeErrorShow:'none',
           

            
     }
  }


navigate=()=>{
   this.props.history.push(`/login`);
}

onFormInputChange=(e)=>{
  console.log(e.target.value);
  this.setState({[e.target.name]:e.target.value})
  if(this.state.name.length < 3 || this.state.name.length >20){
     this.setState({nameErrorShow:''});
  }else{
   this.setState({nameErrorShow:'none'});
  }
  
  if(!this.emailVlidator(this.state.email)){
     this.setState({emailErrorShow:''});
  }else{
     this.setState({emailErrorShow:'none'});
  }
 
  let today = new Date();
  let to = today.getDay();
   
  var date = new Date('27-02-1997');
  var day = date.getDate();
  
console.log('sate',this.state.EstablishedDate,'opt',day);


}
emailVlidator=(email)=>{
   let regex=/\S+@\S+\.\S+/
     if (regex.test(email))
     {
       return (true)
     }
       return (false)
 
 }
showToolTip=()=>{
   // console.log('show tool');
   this.setState({displayToolTip:''})
}
hideToolTip=()=>{
   this.setState({displayToolTip:'none'})
}
render() {                                      
  return (                                      
          <div className="Signup" >  
                         
             <div className="container">
              <div className="row">
                <div className="col-sm-1">
                
                </div>
                <div className="col-sm-10 d-flex justify-content-center ">
                  
                    <div className="login-container mt-5">
                        <div className="login-header">
                            <h3 className="sign-in">Create an account</h3>
                        </div>
                       
                        <div className="login-body">
                        <div class="alert alert-primary" style={{display:this.state.displayToolTip}} role="alert">
                           <h5><b>provide established date</b></h5>
                        </div>
                          <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                <input className="input" onChange={this.onFormInputChange} name="name" type="text" placeholder="libary name "></input>
                                <br></br>
                                <ValidationError display={this.state.nameErrorShow} msg="invalid name "></ValidationError>
                                </div>
                                <div className="col-sm">
                                <input className="input" onChange={this.onFormInputChange} name="email" type="text" placeholder="email id "></input>
                                <br></br>
                                 <ValidationError display={this.state.emailErrorShow} msg="email required"></ValidationError>
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                   <input className="input" onChange={this.onFormInputChange} name="registrationNo "type="text" placeholder="registration number "></input><br></br>
                                   <ValidationError display='' msg="reg no required"></ValidationError>
                                   <br></br>
                                   
                                
                                </div>
                                <div className="col-sm">
                                   
                                   
                                   <input className="input" onChange={this.onFormInputChange} name="EstablishedDate" type="date"  onFocus={this.showToolTip} onBlur={this.hideToolTip}></input>
                                   
                                   <br></br>
                                   <ValidationError display='' msg="required"></ValidationError>
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                <input className="input" onChange={this.onFormInputChange} name="place" type="text" placeholder="place"></input>
                                <br></br>
                                <ValidationError display='' msg="required"></ValidationError>
                                
                                </div>
                                <div className="col-sm">
                                <input className="input" onChange={this.onFormInputChange} name="pincode" type="number" placeholder="pincode"></input>
                                <br></br>
                                <ValidationError display='' msg="required"></ValidationError>
                                </div>
                                
                              </div>
                           </div>    
                              
                              
                              
                              
                              
                              
                              <button className="button-common">Login</button>
                        </div>
                        <div className="login-footer">
                            <p className="account-creation">Have an account ?</p>
                            <button className="sign-up" onClick={this.navigate}>Login now </button>
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
                                                
                                                
export default withRouter(Signup);                 
