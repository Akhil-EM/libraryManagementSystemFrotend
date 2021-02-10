
class Header extends React.Component { 
  
  constructor(){
    super();

    this.state={
      searchDisplay:"none",
      logoutMessageDisplay:'none', 
    }

    this.checkLoginStatus();
    
  }

  checkLoginStatus(){
    let is_logined=localStorage.getItem('islogined');
    if(!is_logined){
       this.props.history.push(`/login`);
    }
 }
  searchBook=()=>{
       this.setState({searchDisplay:'inline'});
  }
  closeSeachBox=()=>{
    this.setState({searchDisplay:'none'})
  }

  navigteTo=(navigateTo)=>{
      console.log(navigateTo);
        this.props.history.push(`/${navigateTo}`);
  }
  logoutBoxShow=()=>{
    this.setState({logoutMessageDisplay:'inline'});
 }
 logoutBoxHide=()=>{
   this.setState({logoutMessageDisplay:'none'});
 }
 logOutUser=(e)=>{
    localStorage.removeItem("islogined");
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    

    this.props.history.push(`/login`);
    this.setState({logoutMessageDisplay:'none'});
 }



render() {     
  let fullUrl=window.location.href;
  if(fullUrl.indexOf('/login')>0 || fullUrl.indexOf('/signup')>0){
    console.log('yes');
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
                
                
                      <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
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
                          <a className="nav-link"onClick={this.logoutBoxShow}><p className="nav-item-cst" onClick={this.logoutBoxShow}>Logout </p></a>
                        </li>
                      </ul>
                 
                  
                  <div className="d-flex">
                    <input className="input-search" type="search" placeholder="Search a book"></input>
                    <button className="button-search" onClick={this.searchBook} type="submit">Search</button>
                  </div>
                </div>
              </nav> 
              <div className="search-book" style={{display:this.state.searchDisplay}}>
                 <div className="d-flex ">
                  <button type="button" className="btn btn-primary mt-3" onClick={this.closeSeachBox}>Close</button>
                  
                 </div>
                <h1 className="text-center">Results</h1>
              </div>
              
               
                <div className="error-message" style={{display:this.state.logoutMessageDisplay}}>
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