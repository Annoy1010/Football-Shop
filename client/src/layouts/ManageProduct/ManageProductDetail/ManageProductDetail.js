import PropTypes from 'prop-types';

import AvailableProduct from './AvailableProduct';
import NewProduct from './NewProduct';
import UpdateProduct from './UpdateProduct';
import UpdateSale from './UpdateSale';

function ManageProductDetail({ index }) {
    switch (index) {
        case 0:
            return <NewProduct />;
        case 1:
            return <AvailableProduct />;
        case 2:
            return <UpdateProduct />;
        case 3:
            return <UpdateSale />;
        default:
            break;
    }
}

ManageProductDetail.prototype = {
    index: PropTypes.number.isRequired,
};

export default ManageProductDetail;
