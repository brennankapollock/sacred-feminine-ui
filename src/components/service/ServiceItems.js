import { TokyoContext } from '@/src/Context';
import { useContext } from 'react';

const services = [
  {
    id: 1,
    name: 'Details',
    text: [
      'Our retreat will begin around 5PM the 13th, but you are welcome to arrive anytime after 4pm. The retreat will end at 2:30PM on the 15th, and we ask that all participants be there until that time.',
      'Every activity - group or solo - is not about adherence to a schedule or pleasing others, but we want to create an opportunity for you to listen to yourself, learning from your own heart and others around you.',
      'For each retreat, a private facebook group is created - this can help retreat participants to get to knoweach other before the weekend and collaborate on transportation.',
    ],
  },
  {
    id: 2,
    name: 'Retreat Prep',
    text: [
      ' Upon registration, you’ll receive a welcome email that will provide details on how you can best prepare for the retreat. It will also include a very basic outline of what will happen over the course of the retreat.',
      'We’ll also ask you to provide any information about yourself that you feel you want to share so we can get to know you better and serve you well at the retreat.',
      'If you requested an on site accommodations but there is no room left, or you prefer to arrange your own, there will be a facebook group that you can join once you have paid for your ticket or a deposit.',
    ],
    image: 'assets/img/news/4.jpg',
  },
  {
    id: 3,
    name: 'Accommodations',
    text: [
      'We will have limited on site accommodations for those of you who are interested. This will be a "first come first serve” basis, so please let us know as soon as you can if you would like a bed on site. If you request a room in your email and there is space still available we will let you know. Here is the cost breakdown for an on-site room for the entirety of the retreat:',
      '- $300 for a private room (2 beds available)',
      '- $200 for a shared room (4 beds available)',
      '- $50 for barn bed further away from the house (2 beds available)',
    ],
  },
  {
    id: 4,
    name: 'Cost',
    text: [
      'Please let us know if making a single payment is an obstacle for you as we also have scholarships available.',
      'The cost of the retreat is $1000.00',
      'Meals included are dinner the first night, and the breakfasts the following two days. There will be some fridge space for you to bring food for other meals, and also long breaks for you to get or prepare your own meals.',
      'We will have a wide variety of foods for the meals for those who are vegan, gluten free, etc.',
    ],
  },
  {
    id: 5,
    name: 'Cancellation Policy',
    text: [
      ' Due to the vendor charges for processing payments plus all of the backend work we do to prepare, we are unable to offer refunds.',
      'However, should you need to cancel for some reason, you are welcome to either gift your spot to someone, or exchange your spot with someone else.',
    ],
  },
  {
    id: 6,
    name: 'Want to Join?',
    text: [
      'Space is limited to 27 participants, if you would like to come, please send an email to team@sacredfeminine.co with your first and last name.',
      'If you want to request on site accommodation (see accommodation section for details) please include which room type you prefer in your email as well.',
      'These e-mails will be answered on a first come first serve basis. If you decide to join, we will provide a link for you to make an online payment for the retreat (and your room if applicable).',
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
