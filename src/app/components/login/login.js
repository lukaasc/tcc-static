import swal from 'sweetalert2';
import './login.scss';

class LoginController {
  /** @ngInject */
  constructor(UserService, $state) {
    this.user = {
      username: '',
      password: ''
    };
    this.newUser = {};

    this._state = $state;
    this.UserService = UserService;
  }

  register() {
    this.UserService.doPost('/api/login/register', this.newUser).then(response => {
      swal(
        'Sucesso!',
        response.data,
        'success'
      );
      this.newUser = {};
    }, error => {
      swal(
        'Falha!',
        error.data,
        'error'
      );
    });
  }

  login() {
    this.UserService.doLogin(this.user).then(() => {
      this._state.go('app.home');
    }, error => {
      this.user = {};
      swal(
        'Falha!',
        error.data,
        'error'
      );
    });
  }
}

export const login = {
  template: require('./login.html'),
  controller: LoginController
};
