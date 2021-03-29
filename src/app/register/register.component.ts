import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor( private us: UserService , private router: Router) { }

  ngOnInit(): void {
  }

  
  onSubmit(ref)
  {
    let userObj= ref.value;
    
    this.us.createUser(userObj).subscribe(
      res=>{
        if(res["message"]=="user already exists"){
          alert("username already exists take another username");
        }
        if(res["message"]=="user created"){
          alert("user created");
          this.router.navigateByUrl("/login");
        }
      },
      err=>{
        alert("something went wrong");
        console.log(err);
      }
    )
  }

}

