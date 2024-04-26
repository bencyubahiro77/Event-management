/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import API from '../utils/axios';
import { formatDate } from '../utils/formatDate';
import NavBar from '../navbar/nav';
import Swal from 'sweetalert2';
import { toast } from "react-toastify";


const BuyerHome = () => {
  const [eventsData, setEventsData] = useState([]);

    const fetchEvents = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await API.get('/services', {
          headers: {
              Authorization: `Bearer ${token}`
          }
        });
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

    useEffect(()=>{
      fetchEvents();
    },[])

  const handleBookEvent = async (serviceId) => {
    const { value: numberOfTicket } = await Swal.fire({
      title: 'Enter number of tickets',
      input: 'text',
      inputLabel: 'Number of Tickets',
      inputPlaceholder: 'Enter the number of tickets',
      showCancelButton: true,
    });
  
    if (numberOfTicket) {
      const userId = localStorage.getItem('userId');
      const response = await API.post('/services/bookservice', {
        userId,
        serviceId,
        numberOfTicket
      });
  
      if (response.status === 200) {
        toast.success('The event has been booked successfully');
        fetchEvents();
      } else {
        toast.error('There was an error booking the event');
      }
    }
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

export default BuyerHome;
