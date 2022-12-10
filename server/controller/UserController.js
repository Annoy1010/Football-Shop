import UserService from '../models/UserService';

class UserRouter {
    getUserById(req, res) {
        UserService.getUserInfoById(req, res);
    }

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

    removeProductInCart(req, res) {
        UserService.removeProductInCartDetail(req, res);
    }

    updateCart(req, res) {
        UserService.updateCartDetail(req, res);
    }

    getEmployeeList(req, res) {
        UserService.getEmployeeListDetail(req, res);
    }

    updateEmployee(req, res) {
        UserService.updateEmployeeInfo(req, res);
    }

    postNewEmployee(req, res) {
        UserService.postNewEmployeeInfo(req, res);
    }

    getAddress(req, res) {
        UserService.getAddressInfo(req, res);
    }
}
export default new UserRouter();
