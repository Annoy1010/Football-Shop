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

    removeProductInCart(req, res) {
        UserService.removeProductInCartDetail(req, res);
    }

    updateCart(req, res) {
        UserService.updateCartDetail(req, res);
    }
    getDeliveryAddress(req, res){
        UserService.getDeliveryAddressByUserId(req, res);
    }
    updateStatusProductInCart(req, res){
        UserService.updateStatusProductInCart(req, res);
    }
    updateDashBoard(req, res){
        UserService.updateDashBoard(req, res);
    }
    getUserInfoByUserName(req, res){
        UserService.getUserInfoByUserName(req, res);
    }
    getAddressByUserId(req, res){
        UserService.getAddressByUserId(req, res);
    }
    chooseDeliveryAddress(req, res){
        UserService.chooseDeliveryAddress(req, res);
    }
    postUserAddressAdd(req, res){
        UserService.postUserAddressAdd(req, res);
    }
    postUserSignUpInfo(req, res){
        UserService.postUserSignUpInfo(req, res);
    }
    postUserNameSignUp(req, res){
        UserService.postUserNameSignUp(req, res);
    }
    postUserCartSignUp(req, res){
        UserService.postUserCartSignUp(req, res);
    }
    postUserAddressSignUp(req, res){
        UserService.postUserAddressSignUp(req, res);
    }
    getCartDetailInfoByCartIdToOrder(req, res){
        UserService.getCartDetailInfoByCartIdToOrder(req, res);
    }
    createOrder(req, res){
        UserService.createOrder(req, res);
    }
    orderDetailAdd(req, res){
        UserService.orderDetailAdd(req, res);
    }
    deleteProductInCartByDetailId(req, res){
        UserService.deleteProductInCartByDetailId(req, res);
    }
}
export default new UserRouter();
