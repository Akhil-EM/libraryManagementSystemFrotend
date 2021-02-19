import React from 'react';                      
import './ValidateError.css';                 
                                                
                                                
class ValidateError extends React.Component { 
  
render() {                                      
  return (                                      
          <div className="ValidateError" style={{display:this.props.display}}>  
               {this.props.msg}  
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default ValidateError;                 
