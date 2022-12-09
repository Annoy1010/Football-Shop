import DistrictService from '../models/DistrictService';

class DistrictRouter {
    getDistrictName(req, res) {
        DistrictService.getDistrictName(req, res);
    }
    getDistrict(req, res) {
        DistrictService.getDistrictList(req, res);
    }
}
export default new DistrictRouter();
