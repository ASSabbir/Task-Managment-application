import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Modal from 'react-modal';

const Card = ({ task, refetch }) => {
    const [loading, setLoading] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [updatedTask, setUpdatedTask] = useState({
        title: task.title,
        description: task.description,
        time: task.time,
        status: task.status
    });

    const handleComplete = async (id) => {
        try {
            setLoading(true);
            await axios.patch(`http://localhost:5000/api/tasks/${id}`, { status: "complete" });
            refetch();
        } catch (error) {
            console.error("Error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
                    refetch();
                    Swal.fire("Deleted!", "Your task has been deleted.", "success");
                } catch (error) {
                    console.error("Error deleting task:", error);
                    Swal.fire("Error!", "Failed to delete task.", "error");
                }
            }
        });
    };

    const handleUpdate = async () => {
        try {
            await axios.patch(`http://localhost:5000/api/tasks/update/${task._id}`, updatedTask);
            Swal.fire("Updated!", "Your task has been updated.", "success");
            setModalIsOpen(false);
            refetch();
        } catch (error) {
            console.error("Error updating task:", error);
            Swal.fire("Error!", "Failed to update task.", "error");
        }
    };

    return (
        <div className='border-2 text-white p-5 space-y-4'>
            <h1 className='text-2xl font-secondary border-b-2 pb-2'>{task.title}</h1>
            <h1>{task.description}</h1>
            <h1>Time: {task.time}</h1>
            <div className='flex justify-between'>
                {task.status === 'incomplete' ? (
                    <button 
                        onClick={() => handleComplete(task._id)} 
                        className='bg-red-500 p-2 rounded-md'
                        disabled={loading}
                    >
                        {loading ? "Updating..." : "Incomplete"}
                    </button>
                ) : (
                    <button className='bg-green-500 p-2 rounded-md'>Complete</button>
                )}
                
                <button 
                    onClick={() => setModalIsOpen(true)}
                    className='bg-blue-500 p-2 rounded-md'
                >
                    Edit
                </button>

                <button 
                    onClick={() => handleDelete(task._id)}
                    className='bg-red-500 p-2 rounded-md'
                >
                    Delete
                </button>
            </div>

            {/* Modal for Updating Task */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                className="bg-white p-6 rounded-md shadow-lg max-w-md mx-auto"
                overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            >
                <h2 className="text-xl font-bold mb-4">Edit Task</h2>
                <input 
                    type="text" 
                    value={updatedTask.title} 
                    onChange={(e) => setUpdatedTask({...updatedTask, title: e.target.value})}
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Title"
                />
                <textarea 
                    value={updatedTask.description} 
                    onChange={(e) => setUpdatedTask({...updatedTask, description: e.target.value})}
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Description"
                ></textarea>
                <input 
                    type="text" 
                    value={updatedTask.time} 
                    onChange={(e) => setUpdatedTask({...updatedTask, time: e.target.value})}
                    className="w-full p-2 mb-2 border rounded"
                    placeholder="Time"
                />
                <select
                    value={updatedTask.status}
                    onChange={(e) => setUpdatedTask({...updatedTask, status: e.target.value})}
                    className="w-full p-2 mb-4 border rounded"
                >
                    <option value="incomplete">Incomplete</option>
                    <option value="complete">Complete</option>
                </select>
                <div className="flex justify-between">
                    <button onClick={handleUpdate} className="bg-green-500 p-2 rounded-md">
                        Update
                    </button>
                    <button onClick={() => setModalIsOpen(false)} className="bg-gray-500 p-2 rounded-md">
                        Cancel
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default Card;
