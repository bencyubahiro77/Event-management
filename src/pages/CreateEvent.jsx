import { useState, useEffect } from 'react';
import API from '../utils/axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        categoryId: '',
        title: '',
        date: '',
        location: '',
        ticketAvailability: ''
    });
    const navigate = useNavigate();  // For React Router v6

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await API.get('/categories');
            if (response.data.status === 200) {
                setCategories(response.data.data);
            }
        } catch (error) {
          toast.error('Error fetching categories:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); 
        try {
            await API.post('/services', formData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            toast.success('Event created successfully!');
        } catch (error) {
            toast.error('Failed to create event');
        }
    };
    
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">
            <button
                type="button"
                onClick={() => navigate(-1)}
                className="m-4 text-blue-500 hover:text-blue-700 font-semibold"
            >
                Back
            </button>
            <div className="flex flex-1 items-center justify-center">
                <form onSubmit={handleSubmit} className="p-8 bg-white rounded-lg shadow-lg space-y-4 max-w-md w-full">
                    {/* Form fields and submission button */}
                    <div>
                        <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700">Category:</label>
                        <select
                            name="categoryId"
                            value={formData.categoryId}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        >
                            <option value="">Select a category</option>
                            {categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.CategoryName}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location:</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="ticketAvailability" className="block text-sm font-medium text-gray-700">Ticket Availability:</label>
                        <input
                            type="number"
                            name="ticketAvailability"
                            value={formData.ticketAvailability}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Create Event
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateEvent;
