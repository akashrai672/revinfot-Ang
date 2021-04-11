import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  constructor(
    private userService: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [Validators.required]),
      password: new FormControl("", [Validators.required]),
    });
  }
  loginForm: any;
  ngOnInit() {}
  formAction(data) {
    console.log(data);
    this.userService.login(data).subscribe((data) => {
      console.log(data);
      this.toastr.success("Looged In Succesfully");
      return this.router.navigate(["/dashboard"]);
    });
  }
}
