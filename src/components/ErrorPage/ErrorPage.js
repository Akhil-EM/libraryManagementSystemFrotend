import React from 'react';                      
import './ErrorPage.css';                 
import {withRouter} from "react-router-dom";                                               
                                                
class ErrorPage extends React.Component { 
  backToHome=()=>{
    this.props.history.push('/');
  }
render() {                                      
  return (                                      
          <div className="ErrorPage" > 
              <div className="error-inner">
              <h1>Oops page not found.</h1>    
              <br></br>
              <br></br>
              <button className="button-common m-2"  onClick={this.backToHome}>click here to go home</button>
              </div>
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default withRouter(ErrorPage);                 
