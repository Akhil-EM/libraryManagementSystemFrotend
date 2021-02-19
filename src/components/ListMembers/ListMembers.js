import React from 'react';                      
import './ListMembers.css';                 
import axios from 'axios';                                              
                                                
class ListMembers extends React.Component { 

  constructor(){
    super();
    this.state={
      memberslist:[],
      preloaderDisplay:'',
      memberNotFoundErrorDisplay:'none',
      
    }
  }
  componentWillMount(){
     this.preloadata();
  }
  preloadata=()=>{
    let library_id=localStorage.getItem('userid');
      axios.post("https://manage-library-backend.herokuapp.com/members/fetch-all",{
      libraryId:library_id,
      })
      .then( (response)=>{
          
          let feedback=response.data;
          // console.log(feedback.info);
          this.setState({memberslist:feedback.info,preloaderDisplay:'none'});

          if(this.state.memberslist.length==0){
            this.setState({memberNotFoundErrorDisplay:''})
          }
          
      })
      .catch((error)=>{
         this.setState({preloaderDisplay:'none'})
          //console.log(error);
      });
  }
render() {  
                                
  return (                                      
          <div class="ListMembers" >   
             <h3 className="m-5 text-center">Members</h3>  
             <div className="p-3">
               <div className="text-center">
                  <div className="spinner-border  spinner"  role="status" style={{display:this.state.preloaderDisplay}} ></div>
                    <div className="alert alert-warning" role="alert" style={{display:this.state.memberNotFoundErrorDisplay}}>
                      No members found..!!
                    </div>
               </div>
                <div class="table-responsive" style={{display:this.state.preloaderDisplay===''?'none':''}}>
                  <table class="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col "  className="no-word-wrap">Member Id</th>
                        <th scope="col" >Name</th>
                        <th scope="col" >Email</th>
                        <th scope="col" className="no-word-wrap">Membership Date</th>
                        
                      </tr>
                    </thead>
                    <tbody>
                      {
                           this.state.memberslist.map((item,key)=>(
                            <tr className="table-row" key={key}>
                            <th scope="row">{key+1}</th>
                            <td className="no-word-wrap">{item.memId}</td>
                            <td className="no-word-wrap">{item.name}</td>
                            <td className="no-word-wrap">{item.email}</td>
                            <td className="no-word-wrap">{item.membershipDate}</td>
                          </tr>                       
                            
                          ))
                      }
                     
                      
                      
                     
                    </tbody>
                  </table>
                     <div  style={{height:'40vh',display:(this.state.memberslist).length=== 0 ? '':'none'}}></div>
                     
                     
                </div>
             </div>
             <div  style={{height:'40vh',display:this.state.preloaderDisplay}}></div>
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default ListMembers;                 
