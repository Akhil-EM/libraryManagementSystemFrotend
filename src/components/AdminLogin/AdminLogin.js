import React from 'react';                      
import './AdminLogin.css';                                                           
import ErrorImage from '../../images/error.svg';                                                  
import AdminService from '../../service/admin.service'
import {withRouter} from "react-router-dom"; 


class AdminLogin extends React.Component { 
   constructor(props){
     super(props);
     this.state={
        email:'',
        password:'',
        loginErrorShow:'none',
        emailErrorShow:'none',
        passwordErrorShow:'none',
        spinnerShow:'none',
        loginButtonShow:''
     }
   }

inputItemChanged=(e)=>{
  // console.log(e.target.value);
  this.setState({[e.target.name]:e.target.value});
}
validateOnFocusOut=(e)=>{
  //  console.log(e.target.name);
  if(e.target.name==='email'){
        if(!this.emailValidator(this.state.email)){
          this.setState({emailErrorShow:''});
      }else{
          this.setState({emailErrorShow:'none'});
      }
  }
  
   if(e.target.name==="password"){
      if(this.state.password===''){
        this.setState({passwordErrorShow:''});
        }else{
            this.setState({passwordErrorShow:'none'});
        }
   }
   
}

submitForm=()=>{
  let validation_error=false;

  if(!this.emailValidator(this.state.email)){
    validation_error=true;
    this.setState({emailErrorShow:''});
  }else{
      
      this.setState({emailErrorShow:'none'});
  }


  if(this.state.password===''){
      validation_error=true;
      
      this.setState({passwordErrorShow:''});
    }else{
        this.setState({passwordErrorShow:'none'});
    }

    if(!validation_error){
      this.communicateWithServer()
    }

            
  
}
saveUSerInformations(is_logined,userid,user_name){
   
   localStorage.setItem('islogined',is_logined);
   localStorage.setItem('username',user_name);
   localStorage.setItem('userid',userid);
   this.props.history.push('/home-admin');
   
}

communicateWithServer=()=>{
     this.setState({spinnerShow:'',loginButtonShow:'none',loginErrorShow:'none'});
       
      AdminService.login({
        email:this.state.email,
        password:this.state.password})
        .then( (response)=>{
        this.setState({spinnerShow:'none',loginButtonShow:''});
         console.log(response.data);
         let feedback=response.data;
         if(feedback.status==='error'){
           this.setState({loginErrorShow:''});
         }
         if(feedback.status==='success'){
            this.saveUSerInformations(true,feedback.info._id,feedback.info.email);
            
             
         }
         
     })
     .catch((error)=>{
         // console.log(error);
         this.setState({spinnerShow:'none',loginButtonShow:''});
     });
}



emailValidator=(email)=>{
  let regex=/\S+@\S+\.\S+/
    if (regex.test(email))
    {
      return (true)
    }
      return (false)

}
render() {                                      
  return (                                      
          <div className="AdminLogin" > 
              <div className="container">
              <div className="row">
                <div className="col-sm">
                
                </div>
                <div className="col-sm d-flex justify-content-center text-center pt-5 ">
                  
                    <div className="login-container mt-5">
                        <div className="login-header">
                            <h3 className="sign-in">Admin Login</h3>
                        </div>
                        <div className="login-body">
                            <div  className="alert alert-danger" style={{display:this.state.loginErrorShow}} role="alert">
                              <b >Sorry we can't find that user.!!</b>
                            </div>
                            
                            <div  className="input-with-error d-flex">
                                <input className="input-inner" onChange={this.inputItemChanged} onBlur={this.validateOnFocusOut} name='email' type="text" placeholder="email id"></input>
                                <img  src={ErrorImage} style={{display:this.state.emailErrorShow}} alt="error" />
                            </div>
                            <div  className="input-with-error d-flex">
                                <input className="input-inner" onChange={this.inputItemChanged} onBlur={this.validateOnFocusOut} name='password' type="password" placeholder="password"></input>
                                <img  src={ErrorImage} style={{display:this.state.passwordErrorShow}} alt="error" />
                            </div>   
                              <div >
                                <button className="button-common" style={{display:this.state.loginButtonShow}} onClick={this.submitForm}>Login</button>
                                <br></br>
                                  <div className="spinner-border  spinner" style={{display:this.state.spinnerShow}} role="status" > </div>
                              </div>
                              
                             
                        </div>
                        
                     </div> 
                    
                     
                </div>
                <div className="col-sm">
                  
                </div>
              </div>
            </div>    
          </div>                              
    );                                          
 }                                              
 }                                              
                                                

export default withRouter(AdminLogin);   
