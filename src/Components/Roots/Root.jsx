import { Outlet } from 'react-router-dom';
import Nav from './Nav';

const Root = () => {
    return (
        <div className='flex'>
            <Nav></Nav>
            <Outlet></Outlet>
        </div>
    );
};

export default Root;