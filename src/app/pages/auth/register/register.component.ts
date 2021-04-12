import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
// import { TokenService } from '../services/token.service';
// import { UserService } from '../../shared/services/user.service';
// import { delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { ConfigService } from '../../shared/services/config.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'ngx-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  showPass = 0;
  isCodeUnique = false;
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    storeName: '',
    code: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    state: ''
  }
  countries: Array<any> = [];
  provinces: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    // private tokenService: TokenService,
    // private userService: UserService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private configService: ConfigService,
  ) {
    this.configService.getListOfCountries()
      .subscribe(data => {
        this.countries = data;
      }, error => {

      });
  }
  countryIsSelected(code) {
    this.provinces = [];
    // this.stateProvince.disable();
    this.configService.getListOfZonesProvincesByCountry(code)
      .subscribe(provinces => {
        this.provinces = [...provinces];
      }, error1 => {
        this.toastr.success(this.translate.instant('STORE_FORM.ERROR_STATE_PROVINCE'));
      });
  }
  ngOnInit() {


  }
  checkCode(event) {
    const code = event.target.value;
    this.authService.checkIfStoreExist(code)
      .subscribe(res => {
        console.log(res);
        this.isCodeUnique = res.exists;
      });
  }
  passwordType() {
    return this.showPass;
  }

  showPassword() {
    if (this.showPass == 0) {
      this.showPass = 1;
    }
    else {
      this.showPass = 0;
    }
  }


  onClickLogin() {
    this.router.navigate(['auth']);
  }

}