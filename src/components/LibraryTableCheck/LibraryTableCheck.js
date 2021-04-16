import React from 'react';                      
import './LibraryTableCheck.css';                                                               
import AdminService from '../../service/admin.service'          


class LibraryTableCheck extends React.Component { 
  constructor(props){
    super(props);
    this.state={
      libraryName:'',
      libarayId:'',
      showDialogue:'none',
      message:'',
      spinnerShow:'none',
      buttonShow:'',
      successMessage:'none',
      errorMessage:'none'
    }
  }
  
  
  
  showDialogue=(library_id,library_name,para_message)=>{
    this.setState({showDialogue:'',libraryName:library_name,libarayId:library_id,message:para_message});
  }
  hideDialogue=()=>{
    this.setState({showDialogue:'none',libraryName:'',libarayId:'',message:''});
  }

  communicateWithServer=(action)=>{
    //  console.log(action);
     let activate_or_deactivate;

     if(action==='activate'){
       activate_or_deactivate=true;
     }
     if(action==='deactivate'){
      activate_or_deactivate=false;
     }


     this.setState({spinnerShow:'',buttonShow:'none',successMessage:'none',errorMessage:'none'});
      
      
      AdminService.ActivateOrDeactivateLibrary({
        libraryId:this.state.libarayId,
        isActive:activate_or_deactivate
      })
      .then( (response)=>{
           this.setState({spinnerShow:'none',buttonShow:''});
              let feedback=response.data;
            
              // console.log(feedback);
              
              if(feedback.status==='success'){
                this.setState({successMessage:''});
              }
              if(feedback.status==='error'){
                this.setState({errorMessage:''});
              }

              setTimeout(() => {
                this.reLoadPage();
              },500);
              
              
          
      })
      .catch((error)=>{ 
        this.setState({spinnerShow:'none',buttonShow:''});
      });
  }
  reLoadPage=()=>{window.location.reload();}
render() {                                      
  return (                                      
          <div className="LibraryTableCheck" >  
            {this.props.isActive &&
                 <input onChange={()=>this.showDialogue(this.props.libraryId,this.props.libraryName,'deactivate')} type="checkbox" checked></input> 
             }
             {! this.props.isActive &&
                <input onChange={()=>this.showDialogue(this.props.libraryId,this.props.libraryName,'activate')} type="checkbox" ></input> 

             }
              <div className="issue-book-dialouge" style={{width:'50vh',display:this.state.showDialogue}} >                
                  <div className="login-header">
                    <button type="button" className="close " onClick={this.hideDialogue}>
                       <span aria-hidden="true" className="close-custom">&times;</span>
                    </button>
                    <h3 className="sign-in">{this.state.message} Library</h3>
                  </div>
                  <div className="login-body">
                      <br></br>
                      <div className="alert alert-success" role="alert" style={{display:this.state.successMessage}}>{this.state.libraryName} {this.state.message} successfully.! </div>
                      <div className="alert alert-danger" role="alert" style={{display:this.state.errorMessage}}>Something went wrong try again.! </div>
                      <h4>Do you want to {this.state.message} {this.state.libraryName}</h4>
                      <br></br>
                      <button className="button-common"   style={{display:this.state.buttonShow}} onClick={()=>this.communicateWithServer(this.state.message)} >{this.state.message}</button><br></br>
                      <div className="spinner-border  spinner"  role="status" style={{display:this.state.spinnerShow}} ></div>
                  </div>                                           
                </div> 
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default LibraryTableCheck;                 
