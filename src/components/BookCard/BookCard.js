import React from 'react';                      
import './BookCard.css';                                                               
import ErrorImage from '../../images/error.svg';  
import HandleBook from '../../service/book.service'
import membersService from '../../service/members.service';

class BookCard extends React.Component { 

  constructor(props){
    super(props);
    this.state={
      deleteDialogueDisplay:'none',
      deleteSpinnerDisplay:'none',
      deleteDialogueItemsDisplay:'',
      deleteDialogueSpinnerDisplay:'none',
      bookDeletionSuccessDisplay:'none',
      bookDeletionErrorDisplay:'none',
      bookname:this.props.name,
      membersList:[],
      memberName:'',
      memberId:'',
      bookId:'',
      renters_name:'',
      book_issue_id:'',
      book_renters_id:'',
      issuBookDialogueDisplay:'none',
      memebrNotSelectedErrorDisplay:'none',
      issuebookDialogueItemsDisplay:'',
      issuBookDialogueSpinnerDisplay:'none',
      issueBookSuccessDisplay:'none',
      issueBookErrorDisplay:'none',
      issueBookLimitReachedErrorDisplay:'none',
      returnBookDialogueButtonDisplay:'',
      returnBookDialogueSpinnerDisplay:'none',
      returnBookDialogueDisplay:'none',
      returnBookErrorDisplay:'none',
      returnBookSuccessDisplay:'none' 
    }
    
  }
  
  componentWillMount(){
    this.loadPreData();
  }
  loadPreData=()=>{
      let library_id=localStorage.getItem('userid');
      
      membersService.fetchAllMembers({libraryId:library_id})
      .then( (response)=>{

          let feedback=response.data;
          this.setState({membersList:feedback.info});
          // console.log(feedback);  
      })
      .catch((error)=>{
          //console.log(error);
      });
  }
  clickHandler=(item)=>{
      switch (item) {
        case 'delete-dialogue':
               if(this.state.deleteDialogueDisplay==='none'){
                 this.setState({deleteDialogueDisplay:''});
               }else{
                 this.setState({deleteDialogueDisplay:'none'});
               }
            break;
        case 'delete-book':
            if(this.state.deleteDialogueSpinnerDisplay==='none'){
              this.setState({deleteDialogueSpinnerDisplay:'',deleteDialogueItemsDisplay:'none'});
            }else{
              this.setState({deleteDialogueSpinnerDisplay:'none',deleteDialogueItemsDisplay:''});
            }
         break;
        case 'return-book-dialogue':
               
          break;

        
      
        default:
          break;
      }
  }
  showDeleteDialogue=()=>{
    this.setState({deleteDialogueDisplay:''});
  }
  hideDeleteDialogue=()=>{
    this.setState({deleteDialogueDisplay:'none'});
  }
  deleteBook=(bookId)=>{
      //  console.log(bookId);
      
      this.setState({deleteDialogueItemsDisplay:'none',deleteSpinnerDisplay:''});
      let library_id=localStorage.getItem('userid');
    
      HandleBook.deleteBook({
        libraryId:library_id,
        bookId:bookId})
      .then( (response)=>{
          this.setState({deleteSpinnerDisplay:'none'});
          let feedback=response.data;
          //console.log(feedback);
          if(feedback.status==='success'){
             this.setState({bookDeletionSuccessDisplay:''});
             setTimeout(function(){ 
              window.location.reload();
              }, 500);
          }
          if(feedback.status==='error'){
            this.setState({bookDeletionErrorDisplay:''});
            setTimeout(function(){ 
              window.location.reload();
              }, 500);
          }

      })
      .catch((error)=>{
          //console.log(error);
          this.setState({deleteSpinnerDisplay:'none',bookDeletionErrorDisplay:''});

      });

  }
  selectChanged=(e)=>{
     this.setState({memberId:e.target.value});
    //  console.log(e.target.value);
    this.setState({memebrNotSelectedErrorDisplay:'none'});
  }

  issueBookButtonClick=(book_name,book_id)=>{
        // console.log('book id',book_id);
         this.setState({issuBookDialogueDisplay:'',bookname:book_name,bookId:book_id});
  }
  HideBookIssueDialogue=()=>{
     this.setState({issuBookDialogueDisplay:'none'});
  }
  issueBook=()=>{
     if(this.state.memberId===''){
       this.setState({memebrNotSelectedErrorDisplay:''});
     }else{
        this.communicateServer();
     }
  }
  showBookReturnDialogue=()=>{
      this.setState({returnBookDialogueDisplay:'',
                 bookId:this.props.bookId,
                 book_issue_id:this.props.bookIssueId,
                renters_name:this.props.bookRentersname,
                book_renters_id:this.props.bookRentersId});
  }
  hideBookReturnDialogue=()=>{

     this.setState({returnBookDialogueDisplay:'none'});
  }
  communicateServer=()=>{
      this.setState({issuebookDialogueItemsDisplay:'none',issuBookDialogueSpinnerDisplay:'',});
      let library_id=localStorage.getItem('userid');
    
      HandleBook.issueBook({
        libraryId:library_id,
        memberId:this.state.memberId,
        bookId:this.state.bookId
      }).then( (response)=>{
        this.setState({issuBookDialogueSpinnerDisplay:'none',issuebookDialogueItemsDisplay:'none'});
          let feedback=response.data;
          //  console.log(feedback);
          if(feedback.status==='success'){
            this.setState({issueBookSuccessDisplay:'',issuebookDialogueItemsDisplay:'none'});
              setTimeout(function(){ 
                   window.location.reload();
              }, 500);
             
              
          }
          if(feedback.status==='error' && feedback.message===''){
            this.setState({issueBookErrorDisplay:''});
          }
          if(feedback.status==='error' && feedback.message==='limit reached'){
            this.setState({issueBookLimitReachedErrorDisplay:''});
                setTimeout(function(){ 
                  window.location.reload();
            }, 500);
          }

      })
      .catch((error)=>{
          //console.log(error);
          this.setState({issueBookErrorDisplay:'',issuebookDialogueItemsDisplay:'',issuBookDialogueSpinnerDisplay:'none',});

      });


  }

  returnBook=()=>{
       this.setState({returnBookDialogueButtonDisplay:'none',returnBookDialogueSpinnerDisplay:''});

       let library_id=localStorage.getItem('userid');
       let returnObj={libraryId:library_id,
                      memberId:this.state.book_renters_id,
                      bookId:this.state.bookId,
                      bookIssueId:this.state.book_issue_id}
       HandleBook.returnBook(returnObj)
       .then( (response)=>{
           this.setState({returnBookDialogueButtonDisplay:'none',returnBookDialogueSpinnerDisplay:'none'});   
           let feedback=response.data;
           this.setState({resultsDisplay:''});
            // console.log(feedback);
           if(feedback.status==='error'){
              this.setState({returnBookErrorDisplay:''});
              setTimeout(function(){ 
                window.location.reload();
                 }, 500);
           }
           if(feedback.status==='success'){
               this.setState({returnBookSuccessDisplay:''});
               setTimeout(function(){ 
                window.location.reload();
               }, 500);
                
           }
           
           
       })
       .catch((error)=>{
            //console.log(error);
    
            this.setState({returnBookDialogueButtonDisplay:'none',returnBookDialogueSpinnerDisplay:'none'});
        
       });

  }
 
render() {                                      
  return (                                      
          <div className="BookCard" >  
                         
                        <div className="card m-5" >
                                  <div className="card-header text-center">
                                    <h3 className="book-name">{this.props.name}</h3>
                                  </div>
                                  <div className="card-body">
                                    <ul>{this.props.isAvilable}
                                        <li><b>Author : {this.props.author}</b></li>
                                        <li><b>genre : {this.props.genre}</b></li>
                                        <li><b>Publisher : {this.props.publisher}</b></li>
                                        <li><b>Price : {this.props.price}</b></li>
                                        <li><b>No of pages : {this.props.noOfPages}</b></li>
                                        
                                    </ul>
                                    <br></br>
                                    <div className="alert alert-danger text-center m-3"  role="alert" style={{display:this.props.bookAvailable===false ?'':'none',}}>
                                          <b>Sorry this book is not available</b>
                                    </div>
                                    <br></br>
                                    <div className="d-flex justify-content-between " >  
                                             <button type="button" style={{display:this.props.bookAvailable===false ?'none':'',}}  className="btn btn-info ml-5" onClick={()=>this.issueBookButtonClick(this.props.name,this.props.bookId)}>Issue book</button>
                                             <button type="button" style={{display:this.props.bookAvailable===false ?'none':'',}} className="btn btn-danger mr-5"  onClick={()=>this.clickHandler('delete-dialogue')}>Delete book</button> 
                                    </div>
                                    <div className="text-center">
                                       <button type="button" style={{display:this.props.bookAvailable===false ?'':'none',}} className="btn btn-primary mr-5"  onClick={this.showBookReturnDialogue}>Return Book</button>
                                    </div>
                                  </div>
                                </div> 
                                {/* delete book */}
                                <div className="error-message" style={{display:this.state.deleteDialogueDisplay}}>
                                      <h3 className="mt-3">Do you want to delete {this.props.name} ?</h3>
                                      <div className="d-flex justify-content-around mt-5">
                                        <button className="button-common m-2" onClick={()=>{this.deleteBook(this.props.bookId)}}  style={{display:this.state.deleteDialogueItemsDisplay}}>yes</button>
                                        <button className="button-common m-2" onClick={()=>this.clickHandler('delete-dialogue')} style={{display:this.state.deleteDialogueItemsDisplay}}>cancel</button>
                                        <div className="spinner-border  spinner"  role="status" style={{display:this.state.deleteSpinnerDisplay}}></div> 
                                      
                                      
                                    </div>
                                    <br></br>
                                      <div className="alert alert-success" role="alert" style={{display:this.state.bookDeletionSuccessDisplay}}>
                                            book deleted .!! Click here to <b className="cursor-pointer" onClick={()=>this.clickHandler('delete-dialogue')}>close</b>
                                      </div>
                                      <div className="alert alert-warning" role="alert" style={{display:this.state.bookDeletionErrorDisplay}}>
                                            something went wrong .!! Click here to <b className="cursor-pointer" onClick={()=>this.clickHandler('delete-dialogue')}>close</b>
                                        </div>
                                    <br></br>
                              </div>

                              <div className="issue-book-dialouge" style={{display:this.state.issuBookDialogueDisplay}}>
                                  
                                  <div className="login-header">
                                     <button type="button" className="close " onClick={this.HideBookIssueDialogue}>
                                        <span aria-hidden="true" className="close-custom">&times;</span>
                                      </button>
                                      <h3 className="sign-in">Issue Book</h3>
                                      
                                  </div>
                                
                                  <div className="login-body">
                                    <br></br>
                                    <div className="alert alert-success" role="alert" style={{display:this.state.issueBookSuccessDisplay}}>Book issued successfully.! </div>
                                    <div className="alert alert-danger" role="alert" style={{display:this.state.issueBookErrorDisplay}}>Something went wrong try again </div>
                                    <div className="alert alert-danger" role="alert" style={{display:this.state.issueBookLimitReachedErrorDisplay}}>This user Reached Book issue Limit.</div>
                                     <h4>Issuing {this.state.bookname} for</h4>
                                    <br></br>
                                    <div className="container ">
                                        <div className="row ">
                                          <div className="col-sm d-flex justify-content-center ">
                                                <div  className="input-with-error">

                                                  <select className="input-inner" name="memberId" onChange={this.selectChanged}>
                                                    <option value="">Select member</option>
                                                    {
                                                      this.state.membersList.map((item,key)=>(
                                                        
                                                        <option value={item._id} key={key}>{item.name} ({item.memId})</option>
                                                      ))

                                                    }
                                                  </select>
                                                  <img  src={ErrorImage} alt="error" style={{display:this.state.memebrNotSelectedErrorDisplay}}/>
                                                </div> 
                                              
                                          
                                          </div>
                                          
                                          
                                        </div>
                                    </div>

                                      
                                        <button className="button-common"  onClick={this.issueBook} style={{display:this.state.issuebookDialogueItemsDisplay}}>Issue</button><br></br>
                                        <div className="spinner-border  spinner"  role="status" style={{display:this.state.issuBookDialogueSpinnerDisplay}} ></div>
                                  </div>
                                  
                                                            
                              </div>  


                              {/* return book */}
                              <div className="issue-book-dialouge" style={{width:'50vh',display:this.state.returnBookDialogueDisplay}} >
                                  
                                  <div className="login-header">
                                     <button type="button" className="close " onClick={this.hideBookReturnDialogue}>
                                        <span aria-hidden="true" className="close-custom">&times;</span>
                                      </button>
                                      <h3 className="sign-in">Return Book</h3>
                                      
                                  </div>
                                
                                  <div className="login-body">
                                    <br></br>
                                    <div className="alert alert-success" role="alert" style={{display:this.state.returnBookSuccessDisplay}}>Book returned successfully.! </div>
                                    <div className="alert alert-danger" role="alert" style={{display:this.state.returnBookErrorDisplay}}>Something went wrong try again.! </div>
                                      <h4>Returning {this.state.bookname} taken by {this.state.renters_name}</h4>
                                       <br></br>
                                  

                                      
                                        <button className="button-common"   style={{display:this.state.returnBookDialogueButtonDisplay}} onClick={this.returnBook}>Return</button><br></br>
                                        <div className="spinner-border  spinner"  role="status" style={{display:this.state.returnBookDialogueSpinnerDisplay}} ></div>
                                  </div>
                                  
                                                            
                              </div>  
                             
                             
          </div>                              
    );                                          
 }                                              
 }                                              
                                                
                                                
export default BookCard;                 
