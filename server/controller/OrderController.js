import OrderService from '../models/OrderService';

class OrderRouter {
    getOrder(req, res) {
        OrderService.getOrderList(req, res);
    }

    updateSubmitStatus(req, res) {
        OrderService.updateSubmitStatusDetail(req, res);
    }

    updateShipStatus(req, res) {
        OrderService.updateShipStatusDetail(req, res);
    }

    updatePayStatus(req, res) {
        OrderService.updatePayStatusDetail(req, res);
    }
}
export default new OrderRouter();
