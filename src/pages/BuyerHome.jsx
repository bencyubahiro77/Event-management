import React from 'react';
import NavBar from '../navbar/nav';

const eventsData = [
  {
    id: 1,
    title: 'Tech Conference 2024',
    date: 'April 30, 2024',
    location: 'San Francisco, CA',
    ticketsAvailable: 150,
  },
  {
    id: 2,
    title: 'Startup Summit',
    date: 'May 15, 2024',
    location: 'New York City, NY',
    ticketsAvailable: 100,
  },
  {
    id: 3,
    title: 'Digital Marketing Expo',
    date: 'June 5, 2024',
    location: 'Los Angeles, CA',
    ticketsAvailable: 200,
  },
  {
    id: 3,
    title: 'Digital Marketing Expo',
    date: 'June 5, 2024',
    location: 'Los Angeles, CA',
    ticketsAvailable: 200,
  },
  {
    id: 3,
    title: 'Digital Marketing Expo',
    date: 'June 5, 2024',
    location: 'Los Angeles, CA',
    ticketsAvailable: 200,
  },
  {
    id: 3,
    title: 'Digital Marketing Expo',
    date: 'June 5, 2024',
    location: 'Los Angeles, CA',
    ticketsAvailable: 200,
  },
];

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md mx-2 mb-4 w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
      <div className="p-4 ">
        <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
        <p className="text-gray-600 mb-2">{event.date}</p>
        <p className="text-gray-600 mb-2">{event.location}</p>
        <p className="text-gray-600">{event.ticketsAvailable} tickets available</p>
      </div>
    </div>
  );
};

const EventList = () => {
  return (
    <div>
        <NavBar />
        <div className="container mx-auto py-8 px-4">
        <h2 className="text-2xl font-semibold mb-4">Upcoming Events</h2>
        <div className="flex flex-wrap -mx-2">
            {eventsData.map((event) => (
            <EventCard key={event.id} event={event} />
            ))}
        </div>
        </div>
    </div>
  );
};

export default EventList;
