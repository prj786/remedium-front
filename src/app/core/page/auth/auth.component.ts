import { Component } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, Validators} from "@angular/forms";
import {NotifyService} from "../../../shared/services/notify.service";
import {UserService} from "../../../features/users/services/user.service";
import {Router} from "@angular/router";
import {AuthStore} from "../../store/auth.store";

@Component({
  selector: 'rm-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  authForm: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
  })

  constructor(private notify: NotifyService, private userService: UserService, private router: Router, private authStore: AuthStore) {
  }
  login(formGroup: FormGroupDirective): void {
    const {value, valid} = formGroup.form;
    if (valid) {
      this.authStore.auth(value).subscribe(_ => {
        this.router.navigate(['/users']).then();
      })
    } else {
      this.notify.sendError('failed-login', 'wrong-login');
    }
  }
}
