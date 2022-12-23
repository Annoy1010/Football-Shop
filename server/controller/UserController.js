import UserService from '../models/UserService';

class UserRouter {
    postNewUser(req, res) {
        UserService.postNewUserDetail(req, res);
    }

    postNewUserAddress(req, res) {
        UserService.postNewUserAddressDetail(req, res);
    }

    postNewUserCart(req, res) {
        UserService.postNewUserCartDetail(req, res);
    }

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

    getFullName(req, res) {
        UserService.getFullNameInfo(req, res);
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

    getCustomerList(req, res) {
        UserService.getCustomerListDetail(req, res);
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

    getProvince(req, res) {
        UserService.getProvinceInfo(req, res);
    }

    postNewAddress(req, res) {
        UserService.postNewAddressInfo(req, res);
    }

    updateDefaultAddress(req, res) {
        UserService.updateDefaultAddressDetail(req, res);
    }

    postNewOrder(req, res) {
        UserService.postNewOrderInfo(req, res);
    }

    postNewOrderDetail(req, res) {
        UserService.postNewOrderDetailInfo(req, res);
    }

    getOrderId(req, res) {
        UserService.getOrderIdInfo(req, res);
    }

    getOrderListOfUser(req, res) {
        UserService.getOrderDetailListOfUser(req, res);
    }

    getShoesListOfOrder(req, res) {
        UserService.getShoesDetailListOfOrder(req, res);
    }

    removeOrder(req, res) {
        UserService.removeOrderDetail(req, res);
    }

    updateCartAfterOrder(req, res) {
        UserService.updateCartDetailAfterOrder(req, res);
    }

    updateDefaultBank(req, res) {
        UserService.updateDefaultBankDetail(req, res);
    }
}
export default new UserRouter();
