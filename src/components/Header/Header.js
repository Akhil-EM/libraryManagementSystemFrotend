import React from 'react';                      
import './Header.css';                 
import { withRouter} from "react-router-dom";
import HandleBook from "../../service/book.service"                                      

var fullUrl=window.location.href;


class Header extends React.Component { 

  constructor(props){
    super(props);
    
    this.state={
      searchDisplay:"none",
      logoutMessageDisplay:'none',
      searchKey:'',
      bookResultArray:[],
      searchSpinnerDisplay:'none',
      searchButtonDisplay:'',
      searchBookNotFoundErrorDisplay:'none',
      somethingWentWrongErrorDisplay:'none',
      searchScrollerDisplay:'none',
    
    }
   
    this.checkLoginStatus();
  }


  checkLoginStatus(){
    let is_logined=localStorage.getItem('islogined');
    
    // Redirect un authorized user if url path not matching login or signup or admin

    if(!(fullUrl.indexOf('/login')>0 || fullUrl.indexOf('/signup')>0 || fullUrl.indexOf('/admin')>0)){
        if(!is_logined){
          this.props.history.push(`/login`);
        
        }
       
    }
    
 }
 
  closeSeachBox=()=>{
    this.setState({searchDisplay:'none'})
  }

  navigteTo=(navigateTo)=>{
      // console.log(navigateTo);
        this.props.history.push(`/${navigateTo}`);
  }
  logoutBoxShow=()=>{
    this.setState({logoutMessageDisplay:'inline'});
 }
 logoutBoxHide=()=>{
   this.setState({logoutMessageDisplay:'none'});
 }
 logOutUser=(e)=>{
   console.info(localStorage.getItem('username'))
   if(localStorage.getItem('username')=='admin@gmail.com'){
     console.log('inside if')
      localStorage.removeItem("islogined");
      localStorage.removeItem("username");
      localStorage.removeItem("userid");
      this.props.history.push(`/admin`);
   }else{
    localStorage.removeItem("islogined");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    this.props.history.push(`/login`);
   }
    
    this.setState({logoutMessageDisplay:'none'});
 }

 onInputChange=(e)=>{
  // console.log(e.target.value);
  this.setState({[e.target.name]:e.target.value});
 }

 searchBook=()=>{
     if(this.state.searchKey===''){
       alert('please enter book name !!');
     }else{
       this.communicateServer();
     }
 }

 communicateServer=()=>{
  this.showSerachSpinner();
  this.setState({searchBookNotFoundErrorDisplay:'none',somethingWentWrongErrorDisplay:'none',searchScrollerDisplay:'none'})
  let library_id=localStorage.getItem('userid');
  let search_book_by_name_credentials={
   libraryId:library_id,
   searchBy:"name",
   searchKey:this.state.searchKey
  }

  HandleBook.searchBookByAnything(search_book_by_name_credentials)
  .then( (response)=>{
      this.hideSerachSpinner();
      let feedback=response.data;
       this.setState({searchDisplay:'inline'});
      //  console.log(feedback);
       
      if(feedback.status==='error'){
          this.setState({somethingWentWrongErrorDisplay:''});
      }
      if(feedback.status==='success'){
           if((feedback.books).length===0){
             this.setState({searchBookNotFoundErrorDisplay:''});
           }else{
               
               this.setState({bookResultArray:feedback.books,searchScrollerDisplay:''});
           }
      }
      
      
  })
  .catch((error)=>{
      // console.log(error);
      this.hideSerachSpinner();
      this.setState({searchDisplay:'inline',somethingWentWrongErrorDisplay:''});
  });




}

 showSerachSpinner=()=>{
    this.setState({searchSpinnerDisplay:'',searchButtonDisplay:'none'}) ;
 }
 hideSerachSpinner=()=>{
    this.setState({searchSpinnerDisplay:'none',searchButtonDisplay:''});
 }
render() {     
  
  if(fullUrl.indexOf('/login')>0 || fullUrl.indexOf('/signup')>0 || fullUrl.indexOf('/admin')>0){
    
     return(<div></div>);
   }
  
  return (                                      
          <div  className="Header " >  
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3">
                <a className="navbar-brand" href="#">
                   <h4 className="app-name">Library Manager</h4>
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse ml-5" id="navbarTogglerDemo02">
                 
                
                      <ul className="navbar-nav mr-auto mt-2 mt-lg-0" style={{display:((fullUrl.indexOf('/home-admin')>0)?'none':'flex')}}>
                      <li className="nav-item">
                          <a className="nav-link" ><p className="nav-item-cst" onClick={()=>this.navigteTo('')}>Home</p></a>
                        </li>
                        
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle nav-item-cst" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Books
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                              <a className="dropdown-item" onClick={()=>this.navigteTo('search-book')}>search Book</a>
                              <a className="dropdown-item" onClick={()=>this.navigteTo('add-book')}>Add book</a>
                             
                            </div>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle nav-item-cst" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Members
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                              <a className="dropdown-item" onClick={()=>this.navigteTo('new-membership')}>New Membership</a>
                              <a className="dropdown-item" onClick={()=>this.navigteTo('list-members')}>Show Members</a>
                              
                            </div>
                        </li>
                        <li className="nav-item">
                          <a className="nav-link"onClick={this.logoutBoxShow}><p className="nav-item-cst" >Logout </p></a>
                        </li>
                      </ul>
                 
                  
                  <div style={{display:((fullUrl.indexOf('/home-admin')>0)?'none':'flex')}}>
                    <div className="d-flex" >
                          <input className="input-search"   type="search" name="searchKey" onChange={this.onInputChange} placeholder="Book name"></input>
                      <div>
                          <button className="button-search" style={{display:this.state.searchButtonDisplay}}  onClick={this.searchBook} type="submit">Search</button>
                          <div className="spinner-border   spinner text-light" style={{display:this.state.searchSpinnerDisplay}}  role="status"></div>
                      </div>
                    </div>
                  </div>
                  <div style={{display:((fullUrl.indexOf('/home-admin')>0)?'flex':'none')}}>  
                    <a className="nav-link text-white "onClick={this.logoutBoxShow}><p className="nav-item-cst" >Logout </p></a>   
                  </div>
                </div>
              </nav> 
              
              <div className="search-book" style={{display:this.state.searchDisplay}}>
                 <div className="d-flex ">
                  <button type="button" className="btn btn-primary mt-3" onClick={this.closeSeachBox}>Close</button>
                  
                 </div>
                <h1 className="text-center">Results</h1>
                <div className="alert alert-danger text-center" style={{display:this.state.somethingWentWrongErrorDisplay}} role="alert">
                  <b>Something went wrong try again.!!</b>
                </div>
                <div className="alert alert-danger text-center" style={{display:this.state.searchBookNotFoundErrorDisplay}} role="alert">
                  <b>Sorry no books found.!!</b>
                </div>
                <div className="search-scroler" style={{display:this.state.searchScrollerDisplay}}>
                      {
                         this.state.bookResultArray.map((item,key)=>(
                            <div className="search-book-card" key={key}>
                               <h4 className="text-center">{item.name}</h4>
                                <ul>
                                  <li><h5>Author : {item.author}</h5></li>
                                  <li><h5>Genre  : {item.genre}</h5></li>
                                  <li><h5>Publisher  : {item.publisher}</h5></li>
                                </ul>
                                <div className="alert alert-danger text-center" role="alert" style={{display:!(item.isAvilable)?'':'none'}}>
                                  <b>Book is not avialable</b>
                                </div>
                                <div className="alert alert-success text-center" role="alert" style={{display:(item.isAvilable)?'':'none'}}>
                                  <b>Book is avialable</b>
                                </div>
                            </div>  
                         ))
                      }
                    
                    
                       
                </div>
                    
              </div>
              
             
                <div className="error-message " style={{display:this.state.logoutMessageDisplay}}>
                      <h3 className="mt-3">Do you want to logout ?</h3>
                      <div className="d-flex justify-content-around mt-5">
                        <button className="button-common m-2" style={{display:this.state.buttonDisplay}} onClick={this.logOutUser}>yes</button>
                        <button className="button-common m-2" style={{display:this.state.buttonDisplay}} onClick={this.logoutBoxHide}>cancel</button>
                      </div>
                </div> 
                




           
        </div>                           
    );                                          
 }                                              
 }                                              
                                                
                                                
export default withRouter(Header);                 
