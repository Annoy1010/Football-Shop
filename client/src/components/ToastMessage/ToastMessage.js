import { toast } from 'react-toastify';

const notify = (message, type) => {
    const config = {
        position: 'bottom-left',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
    };
    switch (type) {
        case 'success':
            toast.success(`${message}`, config);
            break;
        case 'warn':
            toast.warn(`${message}`, config);
            break;
        case 'error':
            toast.error(`${message}`, config);
            break;
        default:
            break;
    }
};

export default notify;
