import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  status=false;
  constructor(private us:UserService,private router:Router) { }

  ngOnInit(): void {
  }


onSubmit(formRef){
  let obj=formRef.value;

  if(obj.password1==obj.password2){
this.us.changePassword(obj).subscribe(
  res=>{
    if(res["message"]=="success"){
      this.router.navigateByUrl("/userDashboard")
    }
  }
)
  }
  else{
    this.status=true
  }
}


}
