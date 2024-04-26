/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import API from '../utils/axios';
import { formatDate } from '../utils/formatDate';
import NavBar from '../navbar/nav';


const BuyerBooking = () => {
  const [eventsData, setEventsData] = useState([]);

  const fetchUserEvents = async () => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      const response = await API.get(`/services/user/bookings/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.status === 200) {
        const formattedEvents = response.data.data.map(event => ({
          ...event,
          date: formatDate(event.Service.date)
        }))
        setEventsData(formattedEvents);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    }
  };  
  
  useEffect(() => {
    fetchUserEvents();
  }, []);

  const cancelBookEvent = (event) => {
    console.log('Editing event:', event.id);
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-2">My Events</h2>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
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
      </div>
    </div>
  );
};

export default BuyerBooking;
