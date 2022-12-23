import StoreService from '../models/StoreService';

class StoreRouter {
    updateStore(req, res) {
        StoreService.updateStoreDetail(req, res);
    }

    getStore(req, res) {
        StoreService.getStoreInfo(req, res);
    }
}
export default new StoreRouter();
