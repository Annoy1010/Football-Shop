import UserService from '../models/UserService';

class UserRouter {
    postUserLogin(req, res) {
        UserService.postUserLoginInfo(req, res);
    }

    postCurrentPass(req, res) {
        UserService.postCurrentPassword(req, res);
    }

    postNewPass(req, res) {
        UserService.postNewPassword(req, res);
    }

    getUser(req, res) {
        UserService.getUserInfo(req, res);
    }

    postImage(req, res) {
        UserService.postAvatar(req, res);
    }

    getImage(req, res) {
        UserService.getAvatar(req, res);
    }

    getCartId(req, res) {
        UserService.getCartIdInfo(req, res);
    }

    getCartQuantity(req, res) {
        UserService.getCartQuantityInfo(req, res);
    }

    postNewCartDetail(req, res) {
        UserService.postNewCartDetailInfo(req, res);
    }

    getCartDetailByCartId(req, res) {
        UserService.getCartDetailInfoByCartId(req, res);
    }
}
export default new UserRouter();
