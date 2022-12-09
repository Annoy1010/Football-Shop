import ProductService from '../models/ProductService';

class ProductRouter {
    getTrademark(req, res) {
        ProductService.getTrademarkInfo(req, res);
    }

    getGrass(req, res) {
        ProductService.getGrassInfo(req, res);
    }

    getPosition(req, res) {
        ProductService.getPositionInfo(req, res);
    }

    getSize(req, res) {
        ProductService.getSizeInfo(req, res);
    }

    getType(req, res) {
        ProductService.getTypeInfo(req, res);
    }

    getTypeByTrademark(req, res) {
        ProductService.getTypeInfoByTrademark(req, res);
    }

    getNational(req, res) {
        ProductService.getNationalInfo(req, res);
    }

    getDesc(req, res) {
        ProductService.getDescInfo(req, res);
    }

    getProducts(req, res) {
        ProductService.getProductsList(req, res);
    }

    getSaleProducts(req, res) {
        ProductService.getSaleProductsList(req, res);
    }

    getImportID(req, res) {
        ProductService.getImportIDInfo(req, res);
    }

    postImport(req, res) {
        ProductService.postNewImport(req, res);
    }

    postProduct(req, res) {
        ProductService.postNewProduct(req, res);
    }

    getShoesId(req, res) {
        ProductService.getShoesIDInfo(req, res);
    }

    postImportDetail(req, res) {
        ProductService.postImportDetailInfo(req, res);
    }

    postImportDetailAndSize(req, res) {
        ProductService.postNewImportDetailAndSize(req, res);
    }

    postFrontImage(req, res) {
        ProductService.postFrontImageDetail(req, res);
    }

    postMainImage(req, res) {
        ProductService.postMainImageDetail(req, res);
    }

    postBackImage(req, res) {
        ProductService.postBackImageDetail(req, res);
    }

    postImage(req, res) {
        ProductService.postImageDetail(req, res);
    }

    getDescriptionID(req, res) {
        ProductService.getDescriptionIDInfo(req, res);
    }

    postDescriptionlId(req, res) {
        ProductService.postDescriptionlIdInfo(req, res);
    }

    getProductsWithSizeAndId(req, res) {
        ProductService.getProductsWithSizeAndIdInfo(req, res);
    }

    getAvailableQuantityWithSize(req, res) {
        ProductService.getAvailableQuantityWithSizeInfo(req, res);
    }

    getAvailableQuantityOfSize(req, res) {
        ProductService.getAvailableQuantityOfSizeInfo(req, res);
    }

    getProductById(req, res) {
        ProductService.getProductByIdInfo(req, res);
    }

    updatePrice(req, res) {
        ProductService.updatePriceInfo(req, res);
    }

    updateSale(req, res) {
        ProductService.updateSaleInfo(req, res);
    }

    updateDesc(req, res) {
        ProductService.updateDescInfo(req, res);
    }

    postComment(req, res) {
        ProductService.postCommentDetail(req, res);
    }

    getComment(req, res) {
        ProductService.getCommentList(req, res);
    }

    removeComment(req, res) {
        ProductService.removeCommentDetail(req, res);
    }
}
export default new ProductRouter();
