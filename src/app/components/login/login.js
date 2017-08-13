import './login.scss';

class LoginController {
  /** @ngInject */
  constructor(BaseService) {
    this.user = {
      userId: '',
      password: '',
      token: '',
      email: ''
    };
    this.newUser = {};

    this.BaseService = BaseService;
  }

  login() {
    this.BaseService.doGet('app/components/login/user.json').then(response => {
      this.userId = response.data.userId;
      this.token = response.data.token;
    });
  }

  register() {
    this.BaseService.doPut('app/components/login/user.json', {
      userId: this.newUser.userId,
      password: this.newUser.password
    }).then(response => {
      this.userId = response.data.userId;
      this.password = response.data.password;
    });
  }
}

export const login = {
  template: require('./login.html'),
  controller: LoginController
};
