import { TokyoContext } from '@/src/Context';
import { client } from '@/src/sanity';
import { useContext, useEffect, useState } from 'react';
import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';
import ServiceItemsTwo from './service/ServiceItemsTwo';

const Retreats = () => {
  const [retreats, setRetreats] = useState([]);
  const [selectedRetreat, setSelectedRetreat] = useState(null);
  const { setServiceModal, modalToggle, navChange, nav } =
    useContext(TokyoContext);

  useEffect(() => {
    // Reset selectedRetreat when navigating to retreats page
    if (nav === 'retreats') {
      setSelectedRetreat(null);
    }
  }, [nav]);

  useEffect(() => {
    // Fetch initial data
    fetchData();

    // Listen for changes in the data
    const subscription = client
      .listen('*[_type == "retreat"]')
      .subscribe((update) => {
        if (
          update.mutationType === 'create' ||
          update.mutationType === 'patch'
        ) {
          fetchData();
        }
      });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchData = () => {
    const query = '*[_type == "retreat"]{..., "cardImageUrl": cardImage.asset->url}';
    client
      .fetch(query)
      .then((data) => {
        console.log('Fetched retreat data:', data);
        data.forEach(retreat => {
          console.log('Image path will be:', `/assets/img/retreats/${retreat.location.toLowerCase().replace(/\s+/g, '-')}.jpg`);
        });
        setRetreats(data);
      })
      .catch((error) => {
        console.error('Error fetching retreats:', error);
      });
  };

  const handleRetreatClick = (retreat) => {
    setSelectedRetreat(retreat);
    const sectionName =
      retreat.type === 'womens' ? 'womens-retreat' : 'mens-retreat';
    navChange(sectionName);
  };

  const handleBackClick = () => {
    setSelectedRetreat(null);
    navChange('retreats');
  };

  if (selectedRetreat) {
    return (
      <SectionContainer
        name={
          selectedRetreat.type === 'womens' ? 'womens-retreat' : 'mens-retreat'
        }
      >
        <div className="container">
          <div className="tokyo_tm_services w-full h-auto clear-both float-left py-[100px] px-0">
            <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
              <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
                <SectionTitle
                  pageName={selectedRetreat.name || ''}
                  title={`${selectedRetreat.location || ''} | ${
                    selectedRetreat.range || selectedRetreat.range || ''
                  }`}
                />
              </div>
            </div>
            <ServiceItemsTwo retreat={selectedRetreat} />
          </div>
        </div>
      </SectionContainer>
    );
  }

  return (
    <SectionContainer name="retreats">
      <div className="container">
        <div className="tokyo_tm_services w-full h-auto clear-both float-left py-[100px] px-0">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle pageName={'Retreats'} title={'Upcoming Retreats'} />
            </div>
          </div>
          <div className="list w-full h-auto clear-both float-left">
            <ul className="ml-[-40px] list-none flex flex-wrap">
              {retreats && retreats.length > 0 ? (
                retreats.map((retreat, index) => (
                  <li
                    className="mb-[40px] w-1/2 pl-[40px] cursor-pointer"
                    key={index}
                    onClick={() => handleRetreatClick(retreat)}
                  >
                    <div className="list_inner w-full h-auto clear-both float-left relative border-solid border-[rgba(0,0,0,.1)] border bg-white transition-all duration-300 hover:bg-chefchaouen_blue overflow-hidden">
                      <div className="relative h-[200px] w-full overflow-hidden">
                        <img
                          src={retreat.cardImageUrl || (retreat.location.toLowerCase().includes('santa paula') 
                            ? '/assets/img/retreats/santa-paula-ca.png'
                            : '/assets/img/retreats/temecula-ca.png')}
                          alt={`${retreat.location} Retreat`}
                          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                          onError={(e) => {
                            console.log('Failed to load:', e.target.src);
                            console.log('Retreat details:', retreat);
                          }}
                          onLoad={() => console.log('Successfully loaded:', retreat.location)}
                        />
                      </div>
                      <div className="content p-[30px]">
                        {index % 6 === 0 && (
                          <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-chefchaouen_blue font-bold text-black transition-all duration-300">
                            {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                          </span>
                        )}
                        {index % 6 === 1 && (
                          <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-sf_yellow font-bold text-black transition-all duration-300">
                            {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                          </span>
                        )}
                        {index % 6 === 2 && (
                          <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-dark_goldenrod font-bold text-black transition-all duration-300">
                            {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                          </span>
                        )}
                        {index % 6 === 3 && (
                          <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-desert_sand-400 font-bold text-black transition-all duration-300">
                            {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                          </span>
                        )}
                        {index % 6 === 4 && (
                          <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-chefchaouen_blue font-bold text-black transition-all duration-300">
                            {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                          </span>
                        )}
                        {index % 6 === 5 && (
                          <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-sf_yellow font-bold text-black transition-all duration-300">
                            {index + 1 <= 9 ? `0${index + 1}` : index + 1}
                          </span>
                        )}
                        <h3 className="title font-psych text-[20px] mb-[15px]">
                          {retreat.name || 'Untitled Retreat'}
                        </h3>
                        <p className="text font-bagnard text-[15px] leading-[2rem]">
                          {retreat.location} | {retreat.range || ''}
                        </p>
                      </div>
                    </div>
                  </li>
                ))
              ) : (
                <li className="w-full text-center py-8">
                  <p className="font-bagnard text-[18px]">
                    No retreats available at the moment.
                  </p>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default Retreats;
