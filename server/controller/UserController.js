import UserService from '../models/UserService';

class UserRouter {
    getUser(req, res) {
        UserService.getUserInfo(req, res);
    }
}
export default new UserRouter();
