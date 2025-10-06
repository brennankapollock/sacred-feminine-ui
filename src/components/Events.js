import { client } from '@/src/sanity';
import {
  CalendarIcon,
  ClockIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';

const formatPrice = (value) => {
  if (value === null || value === undefined) return '';
  const raw = String(value).trim();
  if (!raw) return '';
  return raw.startsWith('$') ? raw : `$${raw}`;
};

const Events = () => {
  const [data, setData] = useState([]);

  const excerpt = (value, max = 200) => {
    if (!value) return '';
    const trimmed = value.trim();
    if (trimmed.length <= max) return trimmed;
    return `${trimmed.slice(0, max).trim()}…`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatDateRange = (startDate, endDate) => {
    if (!startDate) return '';
    const formattedStart = formatDate(startDate);
    if (!endDate || endDate === startDate) {
      return formattedStart;
    }

    const formattedEnd = formatDate(endDate);
    return `${formattedStart} – ${formattedEnd}`;
  };

  const formatTimeRange = (startTime, endTime) => {
    if (!startTime && !endTime) return '';
    if (startTime && endTime) {
      return `${startTime} – ${endTime}`;
    }
    return startTime || endTime || '';
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
        price,
        cardDescription,
        enableTicketButton,
        "isCheckoutActive": coalesce(isCheckoutActive, true),
        "slug": coalesce(slug.current, slug)
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
                    <span className="text-sm text-gray-500">Upcoming</span>
                  </div>

                  <h3 className="text-2xl font-bold font-psych text-black group-hover:text-desert_sand transition-colors duration-300">
                    {event.name}
                  </h3>

                  <div className="space-y-4 font-bagnard text-gray-600">
                    <div className="flex items-center space-x-3">
                      <CalendarIcon className="h-5 w-5 text-desert_sand" />
                      <span>{formatDateRange(event.startDate, event.endDate)}</span>
                    </div>
                    {formatTimeRange(event.startTime, event.endTime) ? (
                      <div className="flex items-center space-x-3">
                        <ClockIcon className="h-5 w-5 text-desert_sand" />
                        <span>{formatTimeRange(event.startTime, event.endTime)}</span>
                      </div>
                    ) : null}
                    <div className="flex items-center space-x-3">
                      <CurrencyDollarIcon className="h-5 w-5 text-desert_sand" />
                      <span>{formatPrice(event.price)}</span>
                    </div>

                    {event.cardDescription ? (
                      <p className="text-gray-600 whitespace-pre-line">
                        {excerpt(event.cardDescription)}
                      </p>
                    ) : null}
                  </div>

                  {(() => {
                    const ticketPath = event.slug ? `/checkout/${event.slug}` : null;
                    const allowButton =
                      event.enableTicketButton !== false &&
                      event.isCheckoutActive !== false &&
                      !!ticketPath;
                    if (!allowButton) return null;

                    return (
                      <Link
                        href={ticketPath}
                        prefetch={false}
                        className="w-full inline-flex justify-center bg-desert_sand text-black font-psych py-4 px-6 rounded-xl hover:bg-opacity-90 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-desert_sand group-hover:transform group-hover:scale-105"
                        aria-label={`Get tickets for ${event.name}`}
                      >
                        <span>Get Tickets</span>
                      </Link>
                    );
                  })()}
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
