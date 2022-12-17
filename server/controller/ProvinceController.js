import ProvinceService from '../models/ProvinceService';

class ProvinceRouter {
    getProvinceNameById(req, res) {
        ProvinceService.getProvinceNameByIdInfo(req, res);
    }

    getProvince(req, res) {
        ProvinceService.getProvinceList(req, res);
    }
}
export default new ProvinceRouter();
