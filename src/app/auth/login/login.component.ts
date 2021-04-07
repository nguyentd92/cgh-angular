import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }

  login() {
    if(this.formLogin.invalid) {
      alert('Thông tin không hợp lệ');
      return;
    }

    const { email, password } = this.formLogin.value;

    this.authService.login(email, password).subscribe(
      res => this.router.navigateByUrl('/list'),
      error => alert(error.message)
    )
  }
}
