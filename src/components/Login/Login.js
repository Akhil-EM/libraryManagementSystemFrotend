import React from 'react';                      
import './Login.css';                 
import {withRouter} from "react-router-dom";                                             
import ErrorImage from '../../images/error.svg';  
import HandleLibrary from "../../service/library.service";

class Login extends React.Component {
  input_error_class=""
  
  constructor(){
    super();
    this.state={
      buttonDisplay:'inline',
      spinnerDisplay:'none',
      emailErrorDisplay:'none',
      passwordErrorDisplay:'none',
      emailErrorMsg:'',
      email:'',
      password:'',
      userNotFoundError:'none',
      activationNeededError:'none'
    }

  }
navigate=(navigateTo)=>{
     this.props.history.push(`/${navigateTo}`);
} 


onFormSubmit= ()=>{
  this.setState({userNotFoundError:'none'});

  //  console.log(this.state.email,this.state.password);
  let error=false;

  if(! this.emailValidator(this.state.email)){
    //  console.log(e.target.value);
    error=true;
     this.setState({emailErrorDisplay:'block',emailErrorMsg:'invalid email'});
  }else{
     this.setState({emailErrorDisplay:'none'});
  }
   if(this.state.password.length<6){
     error=true;
    this.setState({passwordErrorDisplay:'block',passwordErrorMsg:'invalid password'});
   }else{
     this.setState({passwordErrorDisplay:'none'});
   }
    if(! error){
      this.setState({buttonDisplay:'none',spinnerDisplay:'inline',});
          var user_credentials={
            email:this.state.email,
            password:this.state.password}
      
          HandleLibrary.login(user_credentials)
            .then(response => {
              this.setState({buttonDisplay:'inline',spinnerDisplay:'none'});
              let feedback=response.data;
              //  console.log(feedback);
                if(feedback.status==='error'){
                  this.setState({userNotFoundError:'flex'});
                }
                if(feedback.status==='pending'){
                  this.setState({activationNeededError:'flex'});
                }
                if(feedback.status==='success'){
                   this.saveUSerInformations(true,feedback.info._id,feedback.info.name);
                    this.navigate('');
                }

            })
            .catch(e => {
                console.error(e);
                this.setState({buttonDisplay:'inline',spinnerDisplay:'none'});
            });
      
    }
  
}

saveUSerInformations(is_logined,userid,user_name){
  //console.log("user",is_logined,userid,user_name);
   localStorage.setItem('islogined',is_logined);
   localStorage.setItem('username',user_name);
   localStorage.setItem('userid',userid);
}
onEmailChange=(e)=>{
   this.setState({email:e.target.value})
  if(! this.emailValidator(this.state.email)){
     this.setState({emailErrorDisplay:'block',emailErrorMsg:'invalid email'});
  }else{
     this.setState({emailErrorDisplay:'none'});
  }
  
}
onPasswordChange=(e)=>{
  this.setState({password:e.target.value})
   if(this.state.password.length<6){
    this.setState({passwordErrorDisplay:'block',passwordErrorMsg:'invalid password'});
   }else{
     this.setState({passwordErrorDisplay:'none'});
   }

}


//validators
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
          <div className="Login" >    
            <div className="container">
              <div className="row">
                <div className="col-sm">
                
                </div>
                <div className="col-sm d-flex justify-content-center text-center pt-5 ">
                  
                    <div className="login-container mt-5">
                        <div className="login-header">
                            <h3 className="sign-in">Sign In</h3>
                        </div>
                        <div className="login-body">
                            <div style={{display:this.state.userNotFoundError}} className="alert alert-danger" role="alert">
                              <b>Sorry we can't find that user.!!</b>
                            </div>
                            <div style={{display:this.state.activationNeededError}} className="alert alert-warning" role="alert">
                              <b>Library registartion success,Contact admin to activate this library.</b>
                            </div>
                            
                            <div  className="input-with-error d-flex ">
                                <input className="input-inner" onChange={this.onEmailChange} type="text" placeholder="email id"></input>
                                <img style={{display:this.state.emailErrorDisplay,width:'20px'}} src={ErrorImage} alt="error" />
                            </div>
                             <p className="text-right text-danger font-weight-bold" style={{display:this.state.emailErrorDisplay}}>Invalid email</p>
                            <div  className="input-with-error d-flex">
                                <input className="input-inner" onChange={this.onPasswordChange} type="password" placeholder="password"></input>
                                <img style={{display:this.state.passwordErrorDisplay,width:'20px'}} src={ErrorImage} alt="error" />
                            </div>   
                            <p className="text-right text-danger font-weight-bold" style={{display:this.state.passwordErrorDisplay}}>Invalid password</p>
                              <div >
                                <button className="button-common" onClick={this.onFormSubmit} style={{display:this.state.buttonDisplay}} >Login</button>
                                <br></br>
                                <div style={{display:this.state.spinnerDisplay}}>
                                  <div className="spinner-border  spinner"  role="status" > </div>
                                </div>
                              </div>
                              
                             
                        </div>
                        <div className="login-footer">
                            <p className="account-creation">Don't have an account ?</p>
                          
                              <button className="sign-up" onClick={()=>this.navigate('signup')}>Sign up now </button>
                             
                              
                            
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
                                                
                                                
export default withRouter(Login);                 
