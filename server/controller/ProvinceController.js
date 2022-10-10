import ProvinceService from '../models/ProvinceService';

class ProvinceRouter {
    getProvince(req, res) {
        ProvinceService.getProvinceList(req, res);
    }
}
export default new ProvinceRouter();
