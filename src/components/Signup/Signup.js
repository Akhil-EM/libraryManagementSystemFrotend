import React from 'react';                      
import './Signup.css';                 
import {withRouter} from "react-router-dom";                                                 
import ErrorImage from '../../images/error.svg'; 

import HandleLibrary from '../../service/library.service'
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
            spinnerDisplay:'none',
            signupButtondisplay:'',
            accountCreationSuccessDisplay:'none',
            accountCreationErrorDisplay:'none'

            
     }
  }


navigate=()=>{
   this.props.history.push(`/login`);
}

onFormInputChange=(e)=>{
//   console.log(e.target.value);
  this.setState({[e.target.name]:e.target.value});

}

createAccount=()=>{
   let validationError=false;
   if(this.state.name.length < 3 || this.state.name.length >20){
      this.setState({nameErrorShow:''});
      
      validationError=true;
   }else{
    this.setState({nameErrorShow:'none'});
   }
   
   if(!this.emailValidator(this.state.email)){
      this.setState({emailErrorShow:''});

      validationError=true;
     
   }else{
      this.setState({emailErrorShow:'none'});
   }
   
   if(this.state.registrationNo.length !== 8 ){
    this.setState({registrationErrorShow:''});

    validationError=true;
    
    }else{
    this.setState({registrationErrorShow:'none'});
    }

   //  console.log('date',this.state.EstablishedDate);
    if(this.state.EstablishedDate ==='' ){
      this.setState({estdErrorShow:''});

      validationError=true;
      
      }else{
      this.setState({estdErrorShow:'none'});
      }
  
      // console.log(this.state.pincode);
      if(this.state.pincode.length !==6){
         this.setState({pincodeErrorShow:''});

         validationError=true;
        
      }else{
         this.setState({pincodeErrorShow:'none'});
      }
      
      // console.log('password length',this.state.password.length);
      if(this.state.password.length < 6){
         this.setState({passwordErrorShow:''});

         validationError=true;
        
      }else{
         this.setState({passwordErrorShow:'none'});
      }
      if(this.state.password !== this.state.confirmPassword || this.state.confirmPassword===''){
         this.setState({confirmPasswordErrorShow:''});

         validationError=true;
        
      }else{
         this.setState({confirmPasswordErrorShow:'none'});
      }
      if(this.state.place ==='' ){
         this.setState({placeErrorShow:''});

         validationError=true;
         
         }else{
         this.setState({placeErrorShow:'none'});
         }

      if(!validationError){
         this.communicateServer()
      }else{
         return;
      }
         

}


communicateServer=()=>{
    this.setState({accountCreationErrorDisplay:'none'});
    this.showSpinner();

    HandleLibrary.createLibrary({
      name:this.state.name,
      email:this.state.email,
      password:this.state.password,
      registrationNo:this.state.registrationNo,
      EstablishedDate:this.state.EstablishedDate,
      place:this.state.place,
      pincode:this.state.pincode})
     .then( (response)=>{
         this.hideSpinner();          
         let feedback=response.data;

         //  console.log(feedback);
         if(feedback.status==='error'){
            this.setState({accountCreationErrorDisplay:''});
         }
         if(feedback.status==='success'){
            this.setState({accountCreationSuccessDisplay:''});
         }
         
         
     })
     .catch((error)=>{
         // console.log(error);
        this.hideSpinner();
     });


}
showToolTip=()=>{
   // console.log('show tool');
   this.setState({displayToolTip:''})
}
hideToolTip=()=>{
   this.setState({displayToolTip:'none'})
}
emailValidator=(email)=>{
   let regex=/\S+@\S+\.\S+/
     if (regex.test(email))
     {
       return (true)
     }
       return (false)
 
}
 
showSpinner=()=>{
  this.setState({spinnerDisplay:'',signupButtondisplay:'none'});
}
hideSpinner=()=>{
   this.setState({spinnerDisplay:'none',signupButtondisplay:''});
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
                        <div className="alert alert-primary" style={{display:this.state.displayToolTip}} role="alert">
                           <h5><b>provide established date</b></h5>
                        </div>
                          <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                    <div  className="input-with-error d-flex">
                                       <input className="input-inner" onChange={this.onFormInputChange} name="name" type="text" placeholder="libary name "></input>
                                       <img style={{display:this.state.nameErrorShow}} src={ErrorImage} alt="error" />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div  className="input-with-error d-flex">
                                       <input className="input-inner" onChange={this.onFormInputChange} name="email" type="text" placeholder="email id "></input>
                                       <img style={{display:this.state.emailErrorShow}} src={ErrorImage} alt="error" />
                                    </div>
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                    <div  className="input-with-error d-flex">
                                       <input className="input-inner" onChange={this.onFormInputChange} name="password" type="password" placeholder="password"></input>
                                       <img style={{display:this.state.passwordErrorShow}} src={ErrorImage} alt="error" />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div  className="input-with-error d-flex">
                                       <input className="input-inner" onChange={this.onFormInputChange} name="confirmPassword" type="password" placeholder="confirm password"></input>
                                       <img style={{display:this.state.confirmPasswordErrorShow}} src={ErrorImage} alt="error" />
                                    </div>
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                    <div  className="input-with-error d-flex">
                                       <input className="input-inner" onChange={this.onFormInputChange} name="registrationNo" type="text" placeholder="registration number "></input>
                                       <img style={{display:this.state.registrationErrorShow}} src={ErrorImage} alt="error" />
                                    </div>
                                </div>
                                <div className="col-sm">
                                    <div  className="input-with-error d-flex">
                                       <input className="input-inner" onChange={this.onFormInputChange} name="EstablishedDate" type="date"  onFocus={this.showToolTip} onBlur={this.hideToolTip}></input>
                                       <img style={{display:this.state.estdErrorShow}} src={ErrorImage} alt="error" />
                                    </div>
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                    <div  className="input-with-error d-flex">
                                       <input className="input-inner" onChange={this.onFormInputChange} name="place" type="text" placeholder="place"></input>
                                       <img style={{display:this.state.placeErrorShow}} src={ErrorImage} alt="error" />
                                    </div>     
                                </div>
                                <div className="col-sm">
                                    <div  className="input-with-error d-flex">
                                       <input className="input-inner" onChange={this.onFormInputChange} name="pincode" type="number" placeholder="pincode"></input>
                                       <img style={{display:this.state.pincodeErrorShow}} src={ErrorImage} alt="error" />
                                    </div>  
                                </div>
                                
                              </div>
                           </div>    
                              

                              <button className="button-common" style={{display:this.state.signupButtondisplay}} onClick={this.createAccount}>Login</button>
                              <div style={{display:this.state.spinnerDisplay}}>
                                  <div className="spinner-border  spinner"  role="status" > </div>
                              </div>
                              <br></br>
                              <br></br>
                              <div className="alert alert-success" role="alert" style={{display:this.state.accountCreationSuccessDisplay}}>
                                Account created successfully <b onClick={this.navigate} className="signup-bold">Click here</b> to login .
                              </div>
                              <div className="alert alert-warning" role="alert" style={{display:this.state.accountCreationErrorDisplay}}>
                                 Something went wrong try again .!!
                              </div>
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
