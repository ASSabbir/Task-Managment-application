import { useContext, useState } from 'react';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link, useNavigate } from 'react-router-dom';
import { MainContext } from '../../AuthContext';

const Nav = () => {
    const [show, setShow] = useState(true)
    const nvg = useNavigate()
    const {logout}=useContext(MainContext)
    const handelLogout=()=>{
        logout()
        .then(() => {
            
            nvg('/login')

        })
        .catch(error => {
            console.log(error)

        })
    }
    return (
        <div className="h-screen w-1/6 p-5 items-center sticky top-0 bg-color1 text-white  flex flex-col justify-between py-5 ">
                <h1 className='text-2xl font-primary font-semibold'>Task Management</h1>
                <div className='w-full flex flex-col items-center justify-center '>
                    <Link className='hover:bg-color2 text-center p-5 w-full' to={'create_task'}>Create Task</Link>
                    <Link className='hover:bg-color2 text-center p-5 w-full' to={'alltask'}>All Task</Link>
                    <Link className='hover:bg-color2 text-center p-5 w-full' to={'complatetask'}>Completed Task</Link>
                    <Link className='hover:bg-color2 text-center p-5 w-full' to={'incompletetask'}>Incomplete Task</Link>
                   
                </div>
                <div>
                    <button onClick={handelLogout}>logOut</button>
                   
                </div>
            </div>
    );
};

export default Nav;