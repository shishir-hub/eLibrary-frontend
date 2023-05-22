import React from 'react';
import './Alert.scss';

function Alert(props) {
    const { alert } = props;
    const { isOpen, message, type } = alert;

    return (
        <>
            <div>
                {isOpen ? <div className={`alert alert-${type} text-center`} role="alert">
                    {message}
                </div> : null}
            </div>
        </>
    )
}

export default Alert

