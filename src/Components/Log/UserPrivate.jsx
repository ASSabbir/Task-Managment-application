import React, { useContext } from 'react';

import { Navigate} from 'react-router-dom';
import { MainContext } from '../../AuthContext';

const UserPrivate = ({children}) => {
    const {user,loading}=useContext(MainContext)
    
    
    if (loading) {
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
                <span className="loading loading-bars loading-lg"></span>
            </div>
    }
    if (user) {
        return children
    }
    else {
        return (
            <Navigate state={location.pathname} to={'/login'}></Navigate>
        )
    }
    
};

export default UserPrivate;