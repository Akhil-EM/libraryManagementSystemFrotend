import React from 'react';                      
import './ListMembers.css';                 
                                                
                                                
class ListMembers extends React.Component { 
render() {                                      
  return (                                      
          <div class="ListMembers" >   
             <h3 className="m-5 text-center">Members</h3>  
             <div className="p-3">
               {/* <div className="text-center no-member">
               <div class="alert alert-warning m-5" role="alert">
                   <b>No members found !</b>
               </div>
               </div> */}
                <div class="table-responsive">
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
                      <tr className="table-row">
                        <th scope="row">1</th>
                        <td className="no-word-wrap">MEM001</td>
                        <td className="no-word-wrap">Rohith tn</td>
                        <td className="no-word-wrap">rohith@gmail.com</td>
                        <td className="no-word-wrap">27/02/2010</td>
                      </tr>
                      <tr className="table-row">
                        <th scope="row">1</th>
                        <td className="no-word-wrap">MEM001</td>
                        <td className="no-word-wrap">Rohith tn</td>
                        <td className="no-word-wrap">rohith@gmail.com</td>
                        <td className="no-word-wrap">27/02/2010</td>
                      </tr>
                      <tr className="table-row">
                        <th scope="row">1</th>
                        <td className="no-word-wrap">MEM001</td>
                        <td className="no-word-wrap">Rohith tn</td>
                        <td className="no-word-wrap">rohith@gmail.com</td>
                        <td className="no-word-wrap">27/02/2010</td>
                      </tr>
                      <tr className="table-row">
                        <th scope="row">1</th>
                        <td className="no-word-wrap">MEM001</td>
                        <td className="no-word-wrap">Rohith tn</td>
                        <td className="no-word-wrap">rohith@gmail.com</td>
                        <td className="no-word-wrap">27/02/2010</td>
                      </tr>
                      <tr className="table-row">
                        <th scope="row">1</th>
                        <td className="no-word-wrap">MEM001</td>
                        <td className="no-word-wrap">Rohith tn</td>
                        <td className="no-word-wrap">rohith@gmail.com</td>
                        <td className="no-word-wrap">27/02/2010</td>
                      </tr>
                      
                     
                    </tbody>
                  </table>
                </div>
             </div>
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default ListMembers;                 
