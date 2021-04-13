import React from 'react';                      
import './AddBook.css';                 
import ErrorImage from '../../images/error.svg';                                              
import HandleBook from '../../service/book.service'
class AddBook extends React.Component { 
 
  constructor(){
    super();

    this.state={
      buttonDisplay:'inline',
      spinnerDisplay:'none',
      libraryId:'',
      name:'',
      author:'',
      publisher:'',
      genre:'',
      noOfPages:'',
      price:'',
      nameErrorDisplay:'none',
      authorErrorDisplay:'none',
      publisherErrorDisplay:'none',
      genreErrorDisplay:'none',
      noOfPagesErrorDisplay:'none',
      priceErrorDisplay:'none',
      bookCreationErrorDisplay:'none',
      bookCreationSuccessDisplay:'none'

      
    }
  }

onInputItemChange=(e)=>{
  // console.log(e.target.value);
  this.setState({[e.target.name]:e.target.value});
}
showSpinner=()=>{
  this.setState({spinnerDisplay:'',buttonDisplay:'none'});
}
hideSpinner=()=>{
  this.setState({spinnerDisplay:'none',buttonDisplay:''});
}
submitForm=()=>{ 
    let error=false;
    // console.log('name',this.state.genre);
    this.setState({bookCreationErrorDisplay:'none',bookCreationSuccessDisplay:'none'});
    if(this.state.name===''){
       error=true;
       this.setState({nameErrorDisplay:''});
    }else{
       this.setState({nameErrorDisplay:'none'});
    }

    if(this.state.author===''){
      error=true;
      this.setState({authorErrorDisplay:''});
    }else{
        this.setState({authorErrorDisplay:'none'});
    }

    if(this.state.publisher===''){
      error=true;
      this.setState({publisherErrorDisplay:''});
    }else{
        this.setState({publisherErrorDisplay:'none'});
    }

    if(this.state.genre===''){
      error=true;
      this.setState({genreErrorDisplay:''});
    }else{
        this.setState({genreErrorDisplay:'none'});
    }
    
    if(this.state.noOfPages===''){
      error=true;
      this.setState({noOfPagesErrorDisplay:''});
    }else{
        this.setState({noOfPagesErrorDisplay:'none'});
    }
    

    if(this.state.price===''){
      error=true;
      this.setState({priceErrorDisplay:''});
    }else{
        this.setState({priceErrorDisplay:'none'});
    }

    if(!error){
      this.communicateServer();
    }
}
validateOnFocusOut=(e)=>{
     
      let inputName=e.target.name;
      

      switch (inputName) {
        case 'name':
                      if(this.state.name===''){
                             this.setState({nameErrorDisplay:''});
                        }else{ this.setState({nameErrorDisplay:'none'}); }
            break;
        case 'author':
                    if(this.state.author===''){
                          this.setState({authorErrorDisplay:''});
                      }else{ this.setState({authorErrorDisplay:'none'}); }
            break; 
            case 'publisher':
                    if(this.state.publisher===''){
                          this.setState({publisherErrorDisplay:''});
                      }else{ this.setState({publisherErrorDisplay:'none'}); }
               break;
            case 'genre':
                        if(this.state.genre===''){
                              this.setState({genreErrorDisplay:''});
                          }else{ this.setState({genreErrorDisplay:'none'}); }
                break; 
            case 'noOfPages':
                  if(this.state.noOfPages===''){
                        this.setState({noOfPagesErrorDisplay:''});
                    }else{ this.setState({noOfPagesErrorDisplay:'none'}); }
            break;
          case 'price':
                      if(this.state.price===''){
                            this.setState({priceErrorDisplay:''});
                        }else{ this.setState({priceErrorDisplay:'none'}); }
              break; 
      
         default:
          break;
      }
        

    
      

     
}
communicateServer=()=>{
   this.showSpinner();
   let library_id=localStorage.getItem('userid');
   var book_info={
    libraryId:library_id,
    name:this.state.name,
    author:this.state.author,
    publisher:this.state.publisher,
    genre:this.state.genre,
    noOfPages:this.state.noOfPages,
    price:this.state.price}
   HandleBook.addBook(book_info)
            .then(response => {
                this.hideSpinner();          
                let feedback=response.data;
                  //console.log(feedback);
                  if(feedback.status==='error'){
                    this.setState({bookCreationErrorDisplay:''});
                        setTimeout(function(){ 
                          window.location.reload();
                    }, 500);
                }
                if(feedback.status==='success'){
                    this.setState({bookCreationSuccessDisplay:''});
                    setTimeout(function(){ 
                      window.location.reload();
                    }, 500);
                }
            })
            .catch(e => {
              this.hideSpinner();
            });
  
}
render() {                                      
  return (                                      
          <div className="AddBook mb-5" >    
             
             <div className="container">
              <div className="row">
                <div className="col-sm-1">
                
                </div>
                <div className="col-sm-10 d-flex justify-content-center ">
                  
                    <div className="login-container mt-5">
                        <div className="login-header">
                            <h3 className="sign-in">Add a Book</h3>
                        </div>
                       
                        <div className="login-body">
                        <div className="alert alert-danger" role="alert"  style={{display:this.state.bookCreationErrorDisplay}}>
                            <b>Something went wrong try again .!!</b>
                        </div>
                        <div className="alert alert-success" role="alert" style={{display:this.state.bookCreationSuccessDisplay}}>
                          <b>Book added successfully..!!</b>
                        </div>
                          <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                <div   className="input-with-error">
                                   <input onChange={this.onInputItemChange}    onBlur={this.validateOnFocusOut}  className="input-inner" name="name"  type="text" placeholder="book name "></input>
                                   <img style={{display:this.state.nameErrorDisplay}} src={ErrorImage} alt="error" />
                                </div>
                               
                                
                                </div>
                                <div className="col-sm">
                                    <div  className="input-with-error">
                                      <input  onChange={this.onInputItemChange}    onBlur={this.validateOnFocusOut} name="author" className="input-inner" type="text" placeholder="author"></input>
                                      <img style={{display:this.state.authorErrorDisplay}} src={ErrorImage} alt="error" />
                                    </div>
                                    
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                  <div  className="input-with-error">
                                      <select onChange={this.onInputItemChange}    onBlur={this.validateOnFocusOut} className="input-inner" name="genre" >
                                    {/* TALES,Novel,Philosophy,Poems,Science,Spiritual,Sports,Translation,Travelogue,Yoga, */}
                                      <option value="Choose genre">Choose genre</option>
                                      <option value="autobiography">Autobiography</option>
                                      <option value="agriculture">Agriculture</option>
                                      <option value="biography">Biography</option>
                                      <option value="novel">Novel</option>
                                      <option value="philosophy">Philosophy</option>
                                      <option value="poems">Poems</option>
                                      <option value="short-story">Short Story</option>
                                      <option value="travelogue">Travelogue</option>
                                      <option value="others">Others</option>
                                    </select>     
                                       <img style={{display:this.state.genreErrorDisplay}} src={ErrorImage} alt="error" />
                                  </div>
                               
                                
                                </div>
                                <div className="col-sm">
                                     <div  className="input-with-error">
                                            <input onChange={this.onInputItemChange}    onBlur={this.validateOnFocusOut} name="publisher" className="input-inner" type="text" placeholder="publisher"></input>
                                            <img style={{display:this.state.publisherErrorDisplay}} src={ErrorImage} alt="error" />
                                      </div>
                                        
                                </div>
                                
                              </div>
                           </div>
                           <div className="container">
                              <div className="row">
                                <div className="col-sm">
                                
                                  <div  className="input-with-error">
                                        <input onChange={this.onInputItemChange}    onBlur={this.validateOnFocusOut} name="noOfPages" className="input-inner" type="number" placeholder="no of pages"></input>
                                        <img style={{display:this.state.noOfPagesErrorDisplay}} src={ErrorImage} alt="error" />
                                  </div>
                                </div>
                                <div className="col-sm">
                                  <div  className="input-with-error">
                                        <input onChange={this.onInputItemChange}    onBlur={this.validateOnFocusOut} name="price" className="input-inner" type="number" placeholder="price"></input>
                                        <img style={{display:this.state.priceErrorDisplay}} src={ErrorImage} alt="error" />
                                  </div>
                                  
                                </div>
                                
                              </div>
                           </div>    
      
                              <button className="button-common" style={{display:this.state.buttonDisplay}} onClick={this.submitForm}>Add</button><br></br>
                              <div className="spinner-border  spinner" style={{display:this.state.spinnerDisplay}} role="status">
                               
                              </div>
                        </div>
                        
                     </div> 
                     
                </div>
                <div className="col-sm-1">
                  
                </div>
              </div>
            </div>
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default AddBook;                 
