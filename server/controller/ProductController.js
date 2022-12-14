import ProductService from '../models/ProductService';

class ProductRouter {
    getTrademark(req, res) {
        ProductService.getTrademarkInfo(req, res);
    }

    getAvailableQuantityWithTrademark(req, res) {
        ProductService.getAvailableQuantityDetailWithTrademark(req, res);
    }

    getImportQuantityTotalWithTrademark(req, res) {
        ProductService.getImportQuantityTotalDetailWithTrademark(req, res);
    }

    getImportHistory(req, res) {
        ProductService.getImportHistoryDetail(req, res);
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

    getTrendProducts(req, res) {
        ProductService.getTrendProductsList(req, res);
    }

    getProductList(req, res) {
        ProductService.getProductListDetail(req, res);
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

    getSaleProduct(req, res) {
        ProductService.getSaleProductDetail(req, res);
    }

    getProductsListShoesNameAsc(req, res) {
        ProductService.getProductsListShoesNameAsc(req, res);
    }

    getProductsListShoesNameDesc(req, res) {
        ProductService.getProductsListShoesNameDesc(req, res);
    }

    getProductsListPriceAsc(req, res) {
        ProductService.getProductsListPriceAsc(req, res);
    }

    getProductsListPriceDesc(req, res) {
        ProductService.getProductsListPriceDesc(req, res);
    }

    getProductByTradeMark(req, res) {
        ProductService.getProductByTradeMark(req, res);
    }

    getProductByPositionName(req, res) {
        ProductService.getProductByPositionName(req, res);
    }

    getProductByGrassId(req, res) {
        ProductService.getProductByGrassId(req, res);
    }

    searchProductByShoesName(req, res) {
        ProductService.searchProductByShoesName(req, res);
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

    getAllImage(req, res) {
        ProductService.getAllImageList(req, res);
    }

    updateAvailableQuantityAfterOrder(req, res) {
        ProductService.updateAvailableQuantityDetailAfterOrder(req, res);
    }
}
export default new ProductRouter();
