import ForgetPasswordService from '../models/ForgetPasswordService';

class ForgetPasswordRouter {
    getEmail(req, res) {
        ForgetPasswordService.getEmailList(req, res);
    }

    setNewPass(req, res) {
        ForgetPasswordService.setNewPassword(req, res);
    }
}
export default new ForgetPasswordRouter();
