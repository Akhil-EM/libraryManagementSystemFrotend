import React from 'react';                      
import './Footer.css';                 
                                                
                                                
class Footer extends React.Component { 
render() { 
  let fullUrl=window.location.href;
  if(fullUrl.indexOf('/login')>0 || fullUrl.indexOf('/signup')>0 || fullUrl.indexOf('/admin')>0){
    // console.log('yes');
     return(<div></div>);
   }else{
          return (                                      
            <div className="Footer bg-dark text-light text-center p-3" > 
              
              <p className="mt-5">© Copyright @2020 Library Manager .</p>
            </div>)
   }                                     
 ;                                          
 }                                              
 }                                              
                                                
                                                
export default Footer;                 
