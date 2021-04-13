import React from 'react';                      
import './NewMembership.css';                 
import ErrorImage from '../../images/error.svg';                                              
import MembersService from '../../service/members.service'    

                                                
class NewMembership extends React.Component { 
  constructor(){
    super();

    this.state={
      buttonDisplay:'',
      spinnerDisplay:'none',
      memberId:'',
      libraryId:'',
      name:'',
      email:'',
      password:'',
      memberIdErrorDisplay:'none',
      nameErrorDisplay:'none',
      emailErrorDisplay:'none',
      passwordErrorDisplay:'none',
      memberCreationSuccessDisplay:'none',
      memberCreationErrorDisplay:'none'
      
      
    }
  }

showSpinner=()=>{
  this.setState({spinnerDisplay:'',buttonDisplay:'none'});
}
hideSpinner=()=>{
  this.setState({spinnerDisplay:'none',buttonDisplay:''});
}

inputItemChagned=(e)=>{
    this.setState({[e.target.name]:e.target.value});
    // console.log(e.target.value);
}


emailValidator=(email)=>{
  let regex=/\S+@\S+\.\S+/
    if (regex.test(email))
    {
      return (true)
    }
      return (false)

}

validateOnFocusOut=(e)=>{
     
  let input_name=e.target.name;
  //  console.log(input_name);

  switch (input_name) {
    case 'name':
                  if(this.state.name===''){
                    // console.log(this.state.name);
                         this.setState({nameErrorDisplay:''});
                    }else{ this.setState({nameErrorDisplay:'none'}); }
        break;
    case 'email':
                if(! this.emailValidator(this.state.email)){
                      this.setState({emailErrorDisplay:''});
                  }else{ this.setState({emailErrorDisplay:'none'}); }
        break; 
        case 'memberId':
                if(this.state.memberId===''){
                      this.setState({memberIdErrorDisplay:''});
                  }else{ this.setState({memberIdErrorDisplay:'none'}); }
           break;
        case 'password':
                    if(this.state.password==='' || (this.state.password).length <5){
                          this.setState({passwordErrorDisplay:''});
                      }else{ this.setState({passwordErrorDisplay:'none'}); }
            break; 
        
  
     default:
      break;
  }
}

formSubmited=()=>{
     let validationError=false;

     if(this.state.name===''){
           validationError=true;
           this.setState({nameErrorDisplay:''});
      }else{ this.setState({nameErrorDisplay:'none'}); }

     if(! this.emailValidator(this.state.email)){
        validationError=true;
        this.setState({emailErrorDisplay:''});
      }else{ this.setState({emailErrorDisplay:'none'}); }

     if(this.state.memberId===''){
        validationError=true;
        this.setState({memberIdErrorDisplay:''});
      }else{ this.setState({memberIdErrorDisplay:'none'}); }
    
     if(this.state.password==='' || (this.state.password).length <5){
        validationError=true;
        this.setState({passwordErrorDisplay:''});
      }else{ this.setState({passwordErrorDisplay:'none'}); }


      if(!validationError){
        this.communicateWithServer();
      }

}

communicateWithServer=()=>{
    this.showSpinner();

    let library_id=localStorage.getItem('userid');
    let member_create_credentials={memberId:this.state.memberId,
                                    libraryId:library_id,
                                    name:this.state.name,
                                    email:this.state.email,
                                    password:this.state.password}
    
    MembersService.createMember(member_create_credentials)
            .then(response => {
                this.hideSpinner();          
                let feedback=response.data;
        
                  //console.log(feedback);
                if(feedback.status==='error'){
                    this.setState({memberCreationErrorDisplay:''});
                }
                if(feedback.status==='success'){
                    this.setState({memberCreationSuccessDisplay:'',name:'',memberId:'',email:'',password:''});
        
                }

            })
            .catch(e => {
               this.hideSpinner();
            });
  
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
                          
                            <div className="alert alert-success" role="alert" style={{display:this.state.memberCreationSuccessDisplay}}>
                              New Member added successfully.!!
                            </div>
                            <div className="alert alert-danger" role="alert" style={{display:this.state.memberCreationErrorDisplay}}>
                              Something went wrong try again.!!
                            </div>
                            
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                    
                                    <div  className="input-with-error">
                                            <input className="input-inner" value={this.state.memberId}   onChange={this.inputItemChagned} type="text" placeholder="member id" name="memberId"  onBlur={this.validateOnFocusOut} ></input>
                                            <img  src={ErrorImage} alt="error" style={{display:this.state.memberIdErrorDisplay}} />
                                    </div> 
                                
                                </div>
                                <div className="col-sm">
                                    <div  className="input-with-error">
                                            <input className="input-inner" value={this.state.name}   onChange={this.inputItemChagned} type="text" placeholder="name" name="name"  onBlur={this.validateOnFocusOut} ></input>
                                            <img  src={ErrorImage} alt="error" style={{display:this.state.nameErrorDisplay}} />
                                    </div> 
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                  <div  className="input-with-error">
                                            <input className="input-inner" value={this.state.email}  onChange={this.inputItemChagned} type="text" placeholder="email" name="email"  onBlur={this.validateOnFocusOut} ></input>
                                            <img  src={ErrorImage} alt="error" style={{display:this.state.emailErrorDisplay}} />
                                  </div> 
                                
                                </div>
                                <div className="col-sm">
                                    <div  className="input-with-error">
                                            <input className="input-inner" value={this.state.password}   onChange={this.inputItemChagned} type="text" placeholder="password" name="password"  onBlur={this.validateOnFocusOut} ></input>
                                            <img  src={ErrorImage} alt="error" style={{display:this.state.passwordErrorDisplay}} />
                                    </div> 
                                </div>
                                
                              </div>
                           </div>
                           
      
                              <button className="button-common" style={{display:this.state.buttonDisplay}} onClick={this.formSubmited}>create</button><br></br>
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
