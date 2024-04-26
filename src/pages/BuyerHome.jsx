/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import API from '../utils/axios';
import { formatDate } from '../utils/formatDate';
import NavBar from '../navbar/nav';



const AdminHome = () => {
  const [eventsData, setEventsData] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await API.get('/services');
        if (response.status === 200) {
          const formattedEvents = response.data.data.map(event => ({
            ...event,
            date: formatDate(event.date) 
          }));
          setEventsData(formattedEvents);
        }
      } catch (error) {
        console.error('Failed to fetch events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleBookEvent = (event) => {
    console.log('Editing event:', event.id);
  };

  const handleCancelEvent = (eventId) => {
    console.log('Deleting event:', eventId);
  };

  return (
    <div>
      <NavBar />
      <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3">Title</th>
              <th className="px-6 py-3">Date</th>
              <th className="px-6 py-3">Location</th>
              <th className="px-6 py-3">Tickets Available</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {eventsData.map((event, index) => (
              <tr key={`event-${index}`}>
                <td className="px-6 py-4">{event.title}</td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.location}</td>
                <td className="px-6 py-4">{event.ticketAvailability}</td>
                <td className="px-6 py-4">
                  <div className='flex gap-2'>
                  <h3 className="text-white cursor-pointer border border-green-800 px-2 py-2 rounded-lg bg-green-800" onClick={() => handleBookEvent(event.id)}>Book</h3>
                  <h3 className="text-white cursor-pointer border border-red-800 px-2 py-2 rounded-lg bg-red-800" onClick={() => handleCancelEvent(event.id)}>Cancel</h3>
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

export default AdminHome;
