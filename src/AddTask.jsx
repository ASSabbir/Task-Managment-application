import React, { useState } from "react";
import Swal from "sweetalert2";

const AddTask = () => {
    const [loading, setLoading] = useState(false);
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        }
      });
    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const title = e.target.title.value.trim();
        const description = e.target.description.value.trim();
        const time = new Date().toISOString(); 
        const status = "incomplete"; 
        
        if (!title || !description) {
            // alert();
            Toast.fire({
                icon: "error",
                title: "Please fill out all fields"
              });
            return;
        }

        const taskData = { title, description, time, status };

        try {
            setLoading(true);
            const response = await fetch("https://task-server-ruddy.vercel.app/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(taskData),
            });

            const result = await response.json();
            if (response.ok) {
                
                Toast.fire({
                    icon: "success",
                    title: "Task added successfully!"
                  });
                e.target.reset(); 
            } else {
                Toast.fire({
                    icon: "error",
                    title: (result.message || "Something went wrong")
                  });
                
            }
        } catch (error) {
            console.error("Error:", error);
            Toast.fire({
                icon: "error",
                title: "Failed to send data"
              });
            
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex justify-center items-center bg-color2">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-color1">
                <h1 className="text-2xl font-bold text-center text-white">Add Task</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1 text-sm">
                        <label htmlFor="title" className="block text-white">Title</label>
                        <input type="text" name="title" id="title" placeholder="Enter task title" className="w-full px-4 py-3 rounded-md bg-gray-200" />
                    </div>
                    <div className="space-y-1 text-sm">
                        <label htmlFor="description" className="block text-white">Description</label>
                        <input type="text" name="description" id="description" placeholder="Enter task description" className="w-full px-4 py-3 rounded-md bg-gray-200" />
                    </div>
                    <button type="submit" className="block w-full p-3 text-center rounded-sm text-gray-50 bg-color4" disabled={loading}>
                        {loading ? "Adding..." : "Add Task"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddTask;
