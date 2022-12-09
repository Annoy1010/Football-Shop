import WardService from '../models/WardService';

class WardRouter {
    getWard(req, res) {
        WardService.getWardList(req, res);
    }
    getWardName(req, res){
        WardService.getWardName(req, res);
    }
}
export default new WardRouter();
