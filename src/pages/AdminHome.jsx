/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import API from '../utils/axios';
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import { formatDate } from '../utils/formatDate';
import { Link } from 'react-router-dom';
import LogoutButton from '../utils/Logout';

const AdminHome = () => {
  const [eventsData, setEventsData] = useState([]);

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
      toast.error('Failed to fetch events');
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleEdit = async (event) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Event',
      showCancelButton: true,
      html:
      '<input id="swal-input1" type="text" class="swal2-input" style="width: 70%;" value="' + event.title + '">' +
      '<input id="swal-input2" class="swal2-input" type="date" style="width: 70%;" value="' + event.date + '">' +
      '<input id="swal-input3" class="swal2-input" type="text" style="width: 70%;" value="' + event.location + '">' +
      '<input id="swal-input4" class="swal2-input" type="text" style="width: 70%;" value="' + event.ticketAvailability + '">',
    
      focusConfirm: false,
      preConfirm: () => {
        return [
          document.getElementById('swal-input1').value,
          document.getElementById('swal-input2').value,
          document.getElementById('swal-input3').value,
          document.getElementById('swal-input4').value
        ]
      }
    })

    if (formValues) {
      const token = localStorage.getItem('token');
      const response = await API.put(`/services/${event.id}`, {
        title: formValues[0],
        date: formValues[1],
        location: formValues[2],
        ticketAvailability: formValues[3]
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        toast.success("Event updated successfully");
        fetchEvents();
      } else {
        toast.error('Failed to update event:', response.data.message);
      }
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await API.delete(`/services/${eventId}`,{
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
      if (response.status === 200) {
        toast.success("deleted successfully")
        fetchEvents();
      } else {
        toast.error('Failed to delete event:', response.data.message);
      }
    } catch (error) {
      toast.error('Failed to delete event:', eventId, error);
    }
  };
  
  return (
    <div>
      <div className="container mx-auto py-8 px-4">
        <div className='flex justify-between'>
         <h2 className="text-2xl font-semibold mb-2">Upcoming Events</h2>
         <div className='flex gap-2 mb-2'>
          <Link to="/admin/create" >
          <h3 className="text-white cursor-pointer border border-green-800 px-2 py-2 rounded-lg bg-green-800">
            Create Event
          </h3>
          </Link>
          <LogoutButton />
         </div>
        </div>
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
                  <FontAwesomeIcon icon={faEdit} className="mx-2 cursor-pointer" onClick={() => handleEdit(event)} />
                  <FontAwesomeIcon icon={faTrashAlt} className="cursor-pointer" onClick={() => handleDelete(event.id)} />
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
