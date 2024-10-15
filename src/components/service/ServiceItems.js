import { TokyoContext } from '@/src/Context';
import { useContext } from 'react';

const services = [
  {
    id: 1,
    name: 'Details',
    text: [
      'Our retreat will begin around 5pm the 1st, but you are welcome to arrive anytime after 4pm. The retreat will end at 11am on the 3rd, and we ask that all participants be there until that time.',
      'Every activity - group or solo - is not about adherence to aschedule or pleasing others, but we want to create an opportunity for you to listen to yourself, learning from your own heart and others around you.',
    ],
  },
  {
    id: 2,
    name: 'Communication',
    text: [
      'For each retreat, a private facebook group is created - this can help retreat participants to get to knoweach other before the weekend and collaborate on transportation.',
    ],
  },
  {
    id: 3,
    name: 'Cancellation Policy',
    text: [
      ' Due to the vendor charges for processing payments plus all of the backend work we do to prepare, we are unable to offer refunds.',
      'However,should you need to cancel for some reason, you are welcome to either gift your spot to someone, or exchange your spot with someone else.',
    ],
  },
  {
    id: 4,
    name: 'Retreat Prep',
    text: [
      ' A brief questionnaire will be sent to you upon registration, regarding how you can best prepare for the retreat and how we can get to know you better.',
      'This email will also provide a very basic outline of what will happen over the course of the retreat.',
    ],
    image: 'assets/img/news/4.jpg',
  },
  {
    id: 5,
    name: 'Cost',
    text: [
      'Please let us know if making a single payment is an obstacle for you as we also have scholarships available.',
      'The cost of the retreat is $1100.00',
    ],
  },
  {
    id: 6,
    name: 'Want to Join?',
    text: [
      'Space is limited to 27 participants, if you would like to come, please send an email to team@sacredfeminine.co with your first and last name.',
      'These e-mails will be answered on a first come first serve basis. If you decide to join, we will provide a link for you to make an online payment for the retreat.',
    ],
  },
];
const ServiceItems = () => {
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
                <span className="number inline-block mb-[25px] relative w-[60px] h-[60px] leading-[60px] text-center rounded-full bg-sf_yellow font-bold text-black transition-all duration-300">
                  {service.id <= 9 ? `0${service.id}` : service.id}
                </span>
              )}
              {service.id == 6 && (
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
