import WardService from '../models/WardService';

class WardRouter {
    getWard(req, res) {
        WardService.getWardList(req, res);
    }
}
export default new WardRouter();
