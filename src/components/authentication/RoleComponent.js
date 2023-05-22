import React, { useContext } from 'react';
import { LibraryContext } from '../../App';

function RoleComponent(props) {
    const { user } = useContext(LibraryContext);

    if (user?._id === props?.userId) {
        return <>
            {props.children}
        </>
    }
}

export default RoleComponent
