import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react';
import Card from './Card';

const AllTask = () => {
    const { data: tasks = [], isLoading, refetch } = useQuery({
        queryKey: ['alltask'],
        queryFn: async () => {
            const res = await axios.get(`https://task-server-ruddy.vercel.app/api/tasks`);
            return res.data;
        }
    })
    
    if ( isLoading) {
        return <div className='flex items-center justify-center w-full pt-2 h-screen'>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    console.log(tasks)
    return (
        <div className='bg-color2 w-full min-h-screen'>
            <div className='grid grid-cols-4 gap-4 p-5 '>
                {
                    tasks.map(task=><Card key={task._id} task={task} refetch={refetch}></Card>)
                }
            </div>
        </div>
    );
};

export default AllTask;