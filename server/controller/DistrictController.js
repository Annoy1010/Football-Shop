import DistrictService from '../models/DistrictService';

class DistrictRouter {
    getDistrictNameById(req, res) {
        DistrictService.getDistrictNameByIdInfo(req, res);
    }

    getDistrict(req, res) {
        DistrictService.getDistrictList(req, res);
    }
}
export default new DistrictRouter();
