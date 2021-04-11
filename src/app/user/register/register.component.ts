import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public signUpForm: any;
  public classList: any = [];
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    public router: Router
  ) {
    this.signUpForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required]),
      phone: new FormControl("", [Validators.required]),
      age: new FormControl("", [Validators.required]),
      gender: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
      classId: new FormControl(null, [Validators.required]),
    });
  }
  formAction(data) {
    if (this.signUpForm.valid) {
      this.userService.register(data).subscribe((data: any) => {
        this.toastr.success("Registered Succesfully");
        return this.router.navigate(["/"]);
      });
    } else {
      console.log(this.signUpForm.value);
      this.toastr.error("enter all field", "Form Value", { timeOut: 3000 });
    }
  }
  ngOnInit() {
    this.allClasses();
  }
  allClasses() {
    this.userService.allClasses({}).subscribe((data: any) => {
      this.classList = data.data;
    });
  }
}
