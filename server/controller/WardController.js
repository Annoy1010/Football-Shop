import WardService from '../models/WardService';

class WardRouter {
    getWardNameById(req, res) {
        WardService.getWardNameById(req, res);
    }

    getWard(req, res) {
        WardService.getWardList(req, res);
    }
}
export default new WardRouter();
