import PropTypes from 'prop-types';

import Dashboard from './Dashboard';
import Bank from './Bank';
import Address from './Address';
import ChangePassword from './ChangePassword';

function PersonalDetail({ index }) {
    switch (index) {
        case 0:
            return <Dashboard />;
        case 1:
            return <Bank />;
        case 2:
            return <Address />;
        case 3:
            return <ChangePassword />;
        default:
            break;
    }
}

PersonalDetail.prototype = {
    index: PropTypes.number.isRequired,
};

export default PersonalDetail;
