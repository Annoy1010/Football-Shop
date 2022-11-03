import StoreService from '../models/StoreService';

class StoreRouter {
    getStore(req, res) {
        StoreService.getStoreInfo(req, res);
    }
}
export default new StoreRouter();
