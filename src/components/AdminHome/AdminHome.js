import React from 'react';                      
import './AdminHome.css';                 
import Check from "../LibraryTableCheck/LibraryTableCheck";
import AdminService from '../../service/admin.service'


class AdminHome extends React.Component { 
  constructor(){
    super();
    this.state={
       libaryList:[],
       libarysNotFoundShow:'none',
       tableShow:'none',
       spinnerShow:''
    }
   
    
    
  }

  componentWillMount=()=>{
    this.loadPreData();
  }

 
 loadPreData(){
  
   AdminService.fetchLibraries()
   .then( (response)=>{
          this.setState({spinnerShow:'none',tableShow:''});
          let feedback=response.data;
          
          // console.log(feedback);
          
          if((feedback.info).length===0){
            this.setState({libarysNotFoundShow:''});
          }
          if((feedback.info).length>0){
            this.setState({libaryList:feedback.info});
          }
          
       
   })
   .catch((error)=>{ 
    
   });
}
render() {
                                        
  return (                                      
          <div className="AdminHome" >    
             <h1 className="text-center m-5 font-weight-bold"> REGISTERED LIBRARIES</h1> 
             
             <br></br>
            
                <div className="alert alert-primary   alert-custom" style={{display:this.state.libarysNotFoundShow}}  role="alert">
                      No libary's Found..!
                </div>
               <div className="text-center">
                   <div className="spinner-border  spinner" style={{display:this.state.spinnerShow}}  role="status" > </div>
               </div>
               {/* style={{display:this.state.tableShow}} */}
              <div className="m-5">
                    <div className="table-responsive" >
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Place</th>
                        <th scope="col">Pincode</th>
                        <th scope="col">email</th>
                        <th scope="col">Registration number</th>
                        <th scope="col">Active</th>
                      </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.libaryList.map((item,key)=>(
                          
                          <tr key={key}>
                              <th scope="row">{key+1}</th>
                              <td>{item.name}</td>
                              <td>{item.place}</td>
                              <td>{item.pincode}</td>
                              <td>{item.email}</td>
                              <td>{item.registrationNo}</td>
                              <td className="text-center">
                                  <Check isActive={item.isActive} libraryName={item.name} libraryId={item._id}></Check>
                              </td>
                         </tr>
                        ))
                     }
                      
                    </tbody>
                  </table>
                  </div>
              </div>
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default AdminHome;                 
