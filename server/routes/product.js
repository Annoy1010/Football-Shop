import express from 'express';
const router = express.Router();

import productController from '../controller/ProductController';

router.post('/import/newImport', productController.postImport);
router.post('/import/newProduct', productController.postProduct);
router.post('/import/newImportDetailAndSize', productController.postImportDetailAndSize);
router.post('/import/newDescriptionlId', productController.postDescriptionlId);
router.post('/size/availableQuantity', productController.getAvailableQuantityWithSize);
router.post('/import/newImportDetail', productController.postImportDetail);
router.post('/size/all', productController.getProductsWithSizeAndId);
router.post('/trademark', productController.getProductByTradeMark);
router.post('/import/frontImage', productController.postFrontImage);
router.post('/import/mainImage', productController.postMainImage);
router.post('/import/backImage', productController.postBackImage);
router.post('/import/image', productController.postImage);
router.post('/update/price', productController.updatePrice);
router.post('/update/sale', productController.updateSale);
router.post('/update/desc', productController.updateDesc);
router.post('/comment', productController.postComment);
router.post('/comment/shoes', productController.getComment);
router.post('/comment/remove', productController.removeComment);
// router.post('/all/id', productController.getProductsById);

router.get('/all', productController.getProducts);
router.get('/all/sort/az', productController.getProductsListShoesNameAsc);
router.get('/all/sort/za', productController.getProductsListShoesNameDesc);
router.get('/all/sort/priceincrease', productController.getProductsListPriceAsc);
router.get('/all/sort/pricedecrease', productController.getProductsListPriceDesc);
router.get('/all/sale', productController.getProductById);
router.get('/image/all', productController.getAllImage);
router.get('/import/importID', productController.getImportID);
router.get('/import/productId', productController.getShoesId);
router.get('/import/descriptionId', productController.getDescriptionID);
router.post('/search/name', productController.searchProductByShoesName);

router.get('/trademark', productController.getTrademark);
router.use('/type', productController.getType);
router.use('/type/:slug', productController.getTypeByTrademark);
router.get('/grass', productController.getGrass);
router.get('/position', productController.getPosition);
router.get('/size', productController.getSize);
router.post('/size/available', productController.getAvailableQuantityOfSize);
router.get('/originNational', productController.getNational);
router.get('/desc', productController.getDesc);
router.use('/', productController.getImportID);

export default router;
