import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  userObj;
  s = true;
  myrefid;
  status = false;
  searchTerm:string;
  username; 
  dummyActivity = {ToDo:"",date:""};

  constructor(private us:UserService,private r:Router) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.view();

  }
  view(){
    let username = localStorage.getItem("username");
    this.us.getUser(username).subscribe(
      res=>{
        
          this.userObj=res["message"]
          console.log(this.userObj)
       
        
      },
      err=>{
        alert("Something went wrong in show")
        console.log(err)
      }
    )

  }
  Todelete(id)
  {
    console.log(id)
    this.us.todelete(id).subscribe(
      res=>{
        if(res["message"]=="success"){
          alert("deleted")
        }
        else{
          alert(res["message"])
        }
      },
      err=>{
        alert("Something went wrong in show")
        console.log(err)
      }
      
    )
    this.view();
  }
  edit(id)
  {
    this.s=!this.s;
    this.myrefid=id;
  }
  save(id,ToDo,date)
  {
    this.s=!this.s;
    
    this.dummyActivity.ToDo = ToDo;
    this.dummyActivity.date = date;
    this.us.updateActivity(this.dummyActivity,id).subscribe(
      res => {
        alert("Activity updated successfully");
      },
      err => {
        alert("something went wrong..")
      }

    )
    this.view();
  }
  logout(){

    //clear localstorege
    localStorage.clear();

    //Navigate to Home Component
    this.r.navigateByUrl("/home");
  }
  onSubmit(formRef:any){
    this.status = !this.status;
    let userObj=formRef.value;
    userObj.username=this.username
    userObj.id=Date.now().toString();
    console.log(userObj.id)
    this.us.AddList(userObj).subscribe(
      res=>{
        if(res["message"]=="list added"){
          
          alert("list added")
          
          
        }
        else{
          alert(res["message"])
        }
      },
      err=>{
        alert("Something went wrong in user login")
        console.log(err)
      }
    )
    this.view();
  }
  addtask()
  {
    this.status = !this.status;
  }


}
