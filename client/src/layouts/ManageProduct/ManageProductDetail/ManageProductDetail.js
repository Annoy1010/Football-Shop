import PropTypes from 'prop-types';

import NewProduct from './NewProduct';
import UpdateProduct from './UpdateProduct';

function ManageProductDetail({ index }) {
    switch (index) {
        case 0:
            return <NewProduct />;
        case 1:
            return <UpdateProduct />;
        default:
            break;
    }
}

ManageProductDetail.prototype = {
    index: PropTypes.number.isRequired,
};

export default ManageProductDetail;
