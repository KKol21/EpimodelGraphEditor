import React, { useEffect } from 'react';
import './Snackbar.css';

const Snackbar = ({ message, visible, setVisible}) => {

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [visible, setVisible]);

    return (
        <div id="snackbar" className={visible ? 'show' : ''}>
            {message}
        </div>
    );
};

export default Snackbar;
