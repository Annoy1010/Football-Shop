import UserService from '../models/UserService';

class UserRouter {
    postUserLogin(req, res) {
        UserService.postUserLoginInfo(req, res);
    }

    getUser(req, res) {
        UserService.getUserInfo(req, res);
    }
}
export default new UserRouter();
