import { client } from '@/src/sanity';
import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapPinIcon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { TokyoContext } from '../Context';
import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';

const Events = () => {
  const [data, setData] = useState([]);
  const { nav } = useContext(TokyoContext);
  const router = useRouter();

  const excerpt = (s, n = 220) => (!s ? '' : s.length > n ? s.slice(0, n).trim() + '…' : s);

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const fetchData = () => {
    const query = `
      *[_type == "event" && !(_id in path("drafts.**"))] | order(startDate asc) {
        _id,
        name,
        startDate,
        endDate,
        startTime,
        endTime,
        location,
        price,
        details,
        costOne,
        spots,
        enableTicketButton,
        ticketUrl
      }
    `;
    client.fetch(query).then(setData).catch(console.error);
  };

  useEffect(() => {
    fetchData();

    const subscription = client
      .listen('*[_type == "event"]')
      .subscribe((update) => {
        if (
          update.mutationType === 'create' ||
          update.mutationType === 'patch'
        ) {
          fetchData();
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  // Ticket navigation is now handled by an optional external URL per event.

  return (
    <SectionContainer name={'events'}>
      <div className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="flex justify-between items-end">
            <SectionTitle pageName={'Events'} title={'Upcoming Events'} />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.isArray(data) && data.length > 0 ? (
            data.map((event) => (
              <div
                key={event._id}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {event.spots ? `${event.spots} spots left` : ''}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold font-psych text-black group-hover:text-desert_sand transition-colors duration-300">
                    {event.name}
                  </h3>

                  <div className="space-y-4 font-bagnard text-gray-600">
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-5 w-5 text-desert_sand" />
                      <span>{formatDate(event.startDate)}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <ClockIcon className="h-5 w-5 text-desert_sand" />
                      <span>
                        {event.startTime} - {event.endTime}
                      </span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPinIcon className="h-5 w-5 text-desert_sand flex-shrink-0 mt-1.5" />
                      <span className="whitespace-pre-line">
                        {event.location?.split(',').join('\n')}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <CurrencyDollarIcon className="h-5 w-5 text-desert_sand" />
                      <span>{event.price}</span>
                    </div>

                    {event.details && (
                      <p className="text-gray-600">
                        {excerpt(event.details)}
                      </p>
                    )}

                    {event.costOne && (
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wide">Cost</p>
                        <p className="text-gray-700 whitespace-pre-line">{event.costOne}</p>
                      </div>
                    )}
                  </div>

                  {event.enableTicketButton && event.ticketUrl ? (
                    <a
                      href={event.ticketUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex justify-center bg-desert_sand text-black font-psych py-4 px-6 rounded-xl hover:bg-opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-desert_sand group-hover:transform group-hover:scale-105"
                      aria-label={`Get tickets for ${event.name}`}
                    >
                      <span>Get Tickets</span>
                    </a>
                  ) : null}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-16">
              <div className="max-w-md mx-auto">
                <p className="text-xl font-bagnard text-gray-500 mb-4">
                  No upcoming events at this time.
                </p>
                <p className="text-gray-400">
                  Check back soon for new events or subscribe to our newsletter
                  to stay updated.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Events;
