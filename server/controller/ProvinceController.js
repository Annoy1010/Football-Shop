import ProvinceService from '../models/ProvinceService';

class ProvinceRouter {
    getProvinceName(req, res){
        ProvinceService.getProvinceName(req, res);
    }
    getProvince(req, res) {
        ProvinceService.getProvinceList(req, res);
    }
}
export default new ProvinceRouter();
