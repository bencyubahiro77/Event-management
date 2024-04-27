import { useState, useEffect, useMemo } from 'react';
import API from '../utils/axios';
import { formatDate } from '../utils/formatDate';
import NavBar from '../navbar/nav';
import { toast } from "react-toastify";


const AdminAllBooking = () => {
  const [eventsData, setEventsData] = useState([]);

  const fetchUserEvents = useMemo(() => async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.get('/services/allBooking', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const formattedEvents = response.data.data.map(event => ({
            ...event,
            date: formatDate(event.Service.date)
        }));
        setEventsData(formattedEvents);
      }
    } catch (error) {
      toast.error('Failed to fetch booking');
    }
  }, []); 
  
  useEffect(() => {
    fetchUserEvents();
  }, [fetchUserEvents]);

  const cancelBookEvent = async (id) => {
    try {
      const userId = parseInt(localStorage.getItem('userId'), 10);
      const token = localStorage.getItem('token');
      const userRole = localStorage.getItem('userRole');
      const response = await API.delete('/services/cancelservice', {
        data: { userId, id, userRole },
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        toast.success('Booking canceled successfully');
        fetchUserEvents();
      }
    } catch (error) {
      toast.error('Failed to cancel booking');
    }
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-2">All Bookings</h2>
        {eventsData.length > 0 ? (
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-6 py-3">UserName</th>
                <th className="px-6 py-3">Title</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Location</th>
                <th className="px-6 py-3">Number of Ticket</th>
                <th className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {eventsData.map((event, index) => (
                <tr key={`event-${index}`}>
                  <td className="px-6 py-4">{event.User.username}</td>
                  <td className="px-6 py-4">{event.Service.title}</td>
                  <td className="px-6 py-4">{event.date}</td>
                  <td className="px-6 py-4">{event.Service.location}</td>
                  <td className="px-6 py-4">{event.numberOfTicket}</td>
                  <td className="px-6 py-4">
                    <div className='flex gap-2'>
                      <h3 className="text-white cursor-pointer border border-red-800 px-2 py-2 rounded-lg bg-red-800" onClick={() => cancelBookEvent(event.id)}>Cancel</h3>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="flex justify-center items-center h-64">
            <p className="text-xl text-gray-500">No booking</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAllBooking;
