import { client } from '@/src/sanity';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { TokyoContext } from '../Context';
import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';

const Events = () => {
  const [data, setData] = useState([]);
  const { nav } = useContext(TokyoContext);
  const router = useRouter();

  const formatDate = (dateString) => {
    const [year, month, day] = dateString.split('-');
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const fetchData = () => {
    const query = '*[_type == "event"]';
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
          handleFetchData();
        }
      });

    return () => subscription.unsubscribe();
  }, []);

  const handleNavigate = () => {
    router.push('/ecstatic-dance');
  };

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
            data.map((event, index) => (
              <div
                key={event._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="p-8">
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-bold mb-6 ${
                      index % 3 === 0
                        ? 'bg-chefchaouen_blue'
                        : index % 3 === 1
                        ? 'bg-sf_yellow'
                        : 'bg-dark_goldenrod'
                    }`}
                  >
                    {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                  </div>

                  <h3 className="text-2xl font-bold font-psych text-black mb-4">
                    {event.name}
                  </h3>

                  <div className="space-y-3 font-bagnard text-gray-600 mb-6">
                    <p className="flex items-center">
                      <span className="font-semibold mr-2">Date:</span>
                      {formatDate(event.startDate)}
                    </p>
                    <p className="flex items-center">
                      <span className="font-semibold mr-2">Time:</span>
                      {event.startTime} - {event.endTime}
                    </p>
                    <p className="flex items-center">
                      <span className="font-semibold mr-2">Location:</span>
                      {event.location}
                    </p>
                    <p className="flex items-center">
                      <span className="font-semibold mr-2">Price:</span>
                      {event.price}
                    </p>
                  </div>

                  <button
                    onClick={handleNavigate}
                    className="w-full bg-desert_sand text-black font-psych py-3 px-6 rounded-xl border-2 border-black hover:bg-opacity-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-desert_sand"
                    aria-label="Purchase ticket for event"
                  >
                    Purchase Ticket
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-xl font-bagnard text-gray-500">
                No upcoming events at this time.
              </p>
            </div>
          )}
        </div>
      </div>
    </SectionContainer>
  );
};

export default Events;
