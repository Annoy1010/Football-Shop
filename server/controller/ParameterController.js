import ParameterService from '../models/ParameterService';

class ParameterController {
    getParameter(req, res) {
        ParameterService.getParameterInfo(req, res);
    }
}
export default new ParameterController();
