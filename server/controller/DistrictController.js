import DistrictService from '../models/DistrictService';

class DistrictRouter {
    getDistrict(req, res) {
        DistrictService.getDistrictList(req, res);
    }
}
export default new DistrictRouter();
