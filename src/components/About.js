import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';

import { TokyoContext } from '../Context';

import Summary from './about/Summary';
import { useContext } from 'react';

const news = [
  {
    id: 1,
    title: 'Lisa Gungor',
    image: '/assets/img/portfolio/lisa.jpeg',
    description:
      "A Grammy-nominated music artist and author. Lisa produces music with Gungor and Isa Ma. She is the author of The Most Beautiful Thing I've Seen. Lisa holds a Bachelor’s from Kendall College of Art and Design and a 200 Hour YTT certificate from Aura Wellness Center.",
    buttonOne: 'Spotify',
    buttonTwo: 'Instagram',
    linkOne: 'https://open.spotify.com/artist/0pWvGTyszb31m9wq2cLlJ0',
    linkTwo: 'https://www.instagram.com/lisagungor/?hl=en',
  },
  {
    id: 2,
    title: 'Hilary McBride',
    image: '/assets/img/portfolio/hilary.jpg',
    description:
      'A therapist, researcher, speaker, and author. Hillary holds a PhD in Counseling Psychology from the University of British Columbia, and a Masters of Arts in Counseling Psychology. She is a registered clinical counsellor (RCC). She is the author of Mothers, Daughters & Body Image.',
    buttonOne: 'Instagram',
    buttonTwo: 'Portfolio',
    linkOne:
      'https://www.instagram.com/hillaryliannamcbride?igsh=MzRlODBiNWFlZA==',
    linkTwo: 'https://hillarylmcbride.com/',
  },
];

const About = () => {
  const { setNewsModal, modalToggle } = useContext(TokyoContext);

  return (
    <SectionContainer name={'about'}>
      <div className="container">
        <div className="tokyo_tm_news w-full clear-both float-left h-auto pt-[100px] px-0 pb-[45px]">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end font-psych">
              <SectionTitle pageName={'About'} title={'Who We Are'} />
            </div>
          </div>
          <Summary />

          <ul className="ml-[-50px] list-none shadow-lg">
            {news.map((item) => (
              <li
                className="mb-[50px] float-left w-1/2 pl-[50px]"
                key={item.id}
              >
                <div className="list_inner w-full clear-both float-left h-auto relative">
                  <div className="relative image overflow-hidden">
                    <div className="mb-[120px]">
                      <img
                        className="min-w-full"
                        src="assets/img/thumbs/40-25.jpg"
                        alt="image"
                      />
                    </div>

                    <div
                      className="main absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                      data-img-url={item.image}
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <a className="tokyo_tm_full_link" href="#" />
                  </div>
                  <div className="details w-full float-left px-[40px] pt-[30px] pb-[25px] bg-white transition-all duration-300">
                    <h3 className="title mb-[10px] leading-[1.4] font-psych">
                      <a
                        className="text-black text-[18px] font-semibold inline-block transition-all duration-300 hover:text-black"
                        href="#"
                      >
                        {item.title}
                      </a>
                    </h3>
                    <div className="text w-full h-auto clear-both text-center font-bagnard text-black pb-[31px]">
                      {item.description}
                    </div>
                    <div className="tokyo_tm_button font-psych flex items-center justify-evenly">
                      <a href={item.linkOne} download>
                        {item.buttonOne}
                      </a>
                      <a href={item.linkTwo} download>
                        {item.buttonTwo}
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
};
export default About;
