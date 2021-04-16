import React from 'react';                      
import './Router.css';                 

import Header from "../Header/Header";
import Footer from "../Footer/Footer";
        

import Home from "../Home/Home";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import AddBook from "../AddBook/AddBook";
import SearchBook from "../SearchBook/SearchBook";
import NewMembership from "../NewMembership/NewMembership";
import ListMembers from "../ListMembers/ListMembers";
import ErrorPage from "../ErrorPage/ErrorPage";
import AdminLogin from '../AdminLogin/AdminLogin';
import AdminHome from "../AdminHome/AdminHome";

import {BrowserRouter,
  Switch,
  Route,
  } from "react-router-dom";
  // import {Animated} from "react-animated-css";

class Router extends React.Component {
   
  
  constructor(props){
    super(props);
     
    this.state={
 
    }
    
  }
   

  searchBook=()=>{
       this.setState({searchDisplay:'inline'});
  }
  closeSeachBox=()=>{
    this.setState({searchDisplay:'none'})
  }
  
  
  

  

render() {     
   
  
  return (      
                                     
          <div className="Router" >  
             
             <BrowserRouter>
                 <Header ></Header>           
                 <Switch>
                 
                       <Route exact path="/">
                           <Home></Home>
                       </Route>
                       <Route path="/login">
                           <Login></Login>
                        </Route>
                        
                       <Route path="/signup">
                           <Signup></Signup>
                       </Route>
                       <Route path="/add-book">
                           <AddBook></AddBook>
                       </Route>
                       <Route path="/search-book">
                           <SearchBook></SearchBook>
                       </Route>
                       <Route path="/new-membership">
                           <NewMembership></NewMembership>
                       </Route>
                       <Route path="/list-members">
                           <ListMembers></ListMembers>
                       </Route>
                       <Route path="/admin">
                           <AdminLogin></AdminLogin>
                       </Route>
                       <Route path="/home-admin">
                           <AdminHome></AdminHome>
                       </Route>
                       <Route >
                           <ErrorPage></ErrorPage>
                       </Route>
                 </Switch>
              
             <Footer></Footer>
             </BrowserRouter> 
          </div>   
                                    
    );                                          
 }                                              
 }                                              
                                                
                                                
export default Router;                 
