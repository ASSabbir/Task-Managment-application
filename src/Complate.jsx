import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Card from './Card';

const Complate = () => {
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['incompleteTasks'],
        queryFn: async () => {
            const res = await axios.get(`http://localhost:5000/api/tasks/complete`);
            return res.data
        }
    });
    
    if (isLoading) {
        return (
            <div className='flex items-center justify-center w-full pt-2 h-screen'>
                <span className="loading loading-bars loading-lg"></span>
            </div>
        );
    }

    return (
        <div className='bg-color2 w-full min-h-screen'>
            <div className='grid grid-cols-4 gap-4 p-5 '>
                {tasks.length > 0 ? (
                    tasks.map(task => <Card key={task._id} task={task} refetch={refetch} />)
                ) : (
                    <p className="text-center text-white col-span-4">No incomplete tasks found.</p>
                )}
            </div>
        </div>
    );
};

export default Complate;
