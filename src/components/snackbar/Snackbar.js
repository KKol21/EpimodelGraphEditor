import React, { useEffect, useState } from 'react';
import './Snackbar.css';

const Snackbar = ({ message, visible, setVisible}) => {

    useEffect(() => {
        if (visible) {
            const timer = setTimeout(() => {
                setVisible(false);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [visible]);

    return (
        <div id="snackbar" className={visible ? 'show' : ''}>
            {message}
        </div>
    );
};

export default Snackbar;
