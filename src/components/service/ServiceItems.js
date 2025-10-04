import { TokyoContext } from '@/src/Context';
import { useContext, useState, useEffect } from 'react';
import { client } from '@/src/sanity';

const ServiceItems = () => {
  const [data, setData] = useState([]);
  const services = [
    {
      id: 1,
      name: 'Details',
      text: data[0]?.details
        ? data[0].details.split('\n').filter(line => line.trim() !== '')
        : [],
    },
    {
      id: 2,
      name: 'Retreat Prep',
      text: data[0]?.prep
        ? data[0].prep.split('\n').filter(line => line.trim() !== '')
        : [],
      image: 'assets/img/news/4.jpg',
    },
    {
      id: 3,
      name: 'Accommodations',
      text: data[0]?.accommodations 
        ? data[0].accommodations.split('\n').filter(line => line.trim() !== '')
        : [],
    },
    {
      id: 4,
      name: 'Cost',
      text: data[0]?.cost
        ? data[0].cost.split('\n').filter(line => line.trim() !== '')
        : [],
    },
    {
      id: 5,
      name: 'Cancellation Policy',
      text: data[0]?.cancellation
        ? data[0].cancellation.split('\n').filter(line => line.trim() !== '')
        : [],
    },
    {
      id: 6,
      name: 'Want to Join?',
      text: [
        `${data[0]?.joinOne}`,
        `${data[0]?.joinTwo}`,
        `${data[0]?.joinThree}`,
      ],
    },
  ];
  const fetchData = () => {
    const query = '*[_type == "retreat"]';
    client.fetch(query).then(setData).catch(console.error);
  };

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
          fetchData(); // Refetch data on update
        }
      });

    // Clean up the subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const { setServiceModal, modalToggle, modal } = useContext(TokyoContext);
  return (
    <div className="list w-full h-auto clear-both float-left">
      <ul className="ml-[-40px] list-none flex flex-wrap">
        {services.map((service) => (
          <li className="mb-[40px] w-1/3 pl-[40px]" key={service.id}>
            <div className="list_inner w-full h-auto clear-both float-left relative border-solid border-[rgba(0,0,0,.1)] border bg-white pt-[45px] pr-[30px] pb-[40px] pl-[30px] transition-all duration-300">
              {service.id == 1 && (
                <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-chefchaouen_blue font-bold text-black transition-all duration-300">
                  {service.id <= 9 ? `0${service.id}` : service.id}
                </span>
              )}
              {service.id == 2 && (
                <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-sf_yellow font-bold text-black transition-all duration-300">
                  {service.id <= 9 ? `0${service.id}` : service.id}
                </span>
              )}
              {service.id == 3 && (
                <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-dark_goldenrod font-bold text-black transition-all duration-300">
                  {service.id <= 9 ? `0${service.id}` : service.id}
                </span>
              )}
              {service.id == 4 && (
                <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-desert_sand-400 font-bold text-black transition-all duration-300">
                  {service.id <= 9 ? `0${service.id}` : service.id}
                </span>
              )}
              {service.id == 5 && (
                <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full  bg-chefchaouen_blue font-bold text-black transition-all duration-300">
                  {service.id <= 9 ? `0${service.id}` : service.id}
                </span>
              )}
              {service.id == 6 && (
                <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-sf_yellow font-bold text-black transition-all duration-300">
                  {service.id <= 9 ? `0${service.id}` : service.id}
                </span>
              )}
              {service.id == 7 && (
                <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-chefchaouen_blue font-bold text-black transition-all duration-300">
                  {service.id <= 9 ? `0${service.id}` : service.id}
                </span>
              )}

              <h3 className=" font-bold font-psych text-black text-[18px] mb-[15px]">
                {service.name}
              </h3>
              <p className=" font-bagnard">{service.text[0].slice(0, 70)}...</p>
              <div className="tokyo_tm_read_more">
                <a
                  href="#"
                  onClick={() => {
                    modalToggle(true);
                    setServiceModal(service);
                  }}
                >
                  <span>Read More</span>
                </a>
              </div>
              <a
                className="tokyo_tm_full_link"
                href="#"
                onClick={() => {
                  modalToggle(true);
                  setServiceModal(service);
                }}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ServiceItems;
