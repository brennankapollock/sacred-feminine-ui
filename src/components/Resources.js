import Isotope from 'isotope-layout';
import { useContext, useEffect, useRef, useState } from 'react';
import { TokyoContext } from '../Context';
import { tokyo } from '../utils';
import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';

const Resources = () => {
  const isotope = useRef();
  const [filterKey, setFilterKey] = useState('*');
  useEffect(() => {
    const data = document.querySelector('.item__');
    if (data.length !== 0) {
      setTimeout(() => {
        isotope.current = new Isotope('.gallery_zoom', {
          itemSelector: '.item__',
        });
      }, 3000);
    }
  }, []);
  useEffect(() => {
    if (isotope.current) {
      filterKey === '*'
        ? isotope.current.arrange({ filter: `*` })
        : isotope.current.arrange({ filter: `.${filterKey}` });
    }
  }, [filterKey]);
  const handleFilterKeyChange = (key) => () => {
    setFilterKey(key);
  };
  useEffect(() => {
    tokyo.portfolioHover();
    tokyo.dataImage();
  });
  const { setPortfolioDetailsModal, modalToggle } = useContext(TokyoContext);
  return (
    <SectionContainer name={'resources'}>
      <div className="container">
        <div className="tokyo_tm_portfolio w-full h-auto clear-both float-left px-0 pt-[100px] pb-[40px]">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle title={'Resources'} />
              <div className="portfolio_filter">
                <ul className="list-none">
                  <li className="mr-[25px] inline-block">
                    <a
                      href="#"
                      className="current text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      onClick={handleFilterKeyChange('*')}
                    >
                      All
                    </a>
                  </li>
                  <li className="mr-[25px] inline-block">
                    <a
                      className="text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      href="#"
                      onClick={handleFilterKeyChange('meditation')}
                    >
                      Meditations
                    </a>
                  </li>
                  <li className="mr-[25px] inline-block">
                    <a
                      className="text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      href="#"
                      onClick={handleFilterKeyChange('film')}
                    >
                      Films
                    </a>
                  </li>
                  <li className="mr-[25px] inline-block">
                    <a
                      className="text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      href="#"
                      onClick={handleFilterKeyChange('music')}
                    >
                      Music
                    </a>
                  </li>

                  <li className="inline-block">
                    <a
                      className="text-[#767676] inline-block font-medium font-montserrat transition-all duration-300 hover:text-black"
                      href="#"
                      onClick={handleFilterKeyChange('book')}
                    >
                      Books
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="list_wrapper w-full h-auto clear-both float-left">
            <ul className="portfolio_list gallery_zoom ml-[-40px] list-none">
              <li className="book mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="The Most Beautiful Thing I've Seen"
                    data-category="Books"
                  >
                    <img
                      className="opacity-0 min-w-full"
                      src="assets/img/thumbs/most-beautiful.jpg"
                      alt="image"
                    />
                    <div
                      className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                      data-img-url="assets/img/thumbs/most-beautiful.jpg"
                    />
                  </div>
                </div>
              </li>
              <li className="film mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="Womanhood"
                    data-category="Films"
                  >
                    <img
                      className="opacity-0 min-w-full"
                      src="assets/img/thumbs/womanhood.png"
                      alt="image"
                    />
                    <div
                      className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                      data-img-url="assets/img/thumbs/womanhood.png"
                    />
                  </div>
                </div>
              </li>
              <li className="book mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="Practices for Embodied Living"
                    data-category="Books"
                  >
                    <a href="https://www.amazon.com/Practices-Embodied-Living-Experiencing-Wisdom/dp/1587436248?dib_tag=se&dib=eyJ2IjoiMSJ9.n7ki-vAMy6Gs88HYKHHNphSTNvguhkhox8tzLzLMlq3NtIZR7ecEp_rGGz8989odbz6aXE3PK9xqlCD0VVVH71VGDN6UHRhHWKE3qw_r_o8.K35Ob4DzryBa-nwrciGkXcoUnGbpbYwzNvtweeYyJcE&qid=1728344513&sr=1-2">
                      <img
                        className="opacity-0 min-w-full"
                        src="assets/img/thumbs/embodied-living.jpg"
                        alt="image"
                      />
                      <div
                        className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                        data-img-url="assets/img/thumbs/embodied-living.jpg"
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li className="music mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="Animal Heart by Isa Ma"
                    data-category="Music"
                  >
                    <a href="https://www.amazon.com/Practices-Embodied-Living-Experiencing-Wisdom/dp/1587436248?dib_tag=se&dib=eyJ2IjoiMSJ9.n7ki-vAMy6Gs88HYKHHNphSTNvguhkhox8tzLzLMlq3NtIZR7ecEp_rGGz8989odbz6aXE3PK9xqlCD0VVVH71VGDN6UHRhHWKE3qw_r_o8.K35Ob4DzryBa-nwrciGkXcoUnGbpbYwzNvtweeYyJcE&qid=1728344513&sr=1-2">
                      <img
                        className="opacity-0 min-w-full"
                        src="assets/img/thumbs/isa.jpg"
                        alt="image"
                      />
                      <div
                        className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                        data-img-url="assets/img/thumbs/isa.jpg"
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li className="book mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="Mothers, Daughters, and Body Image"
                    data-category="Books"
                  >
                    <a href="https://www.amazon.com/Practices-Embodied-Living-Experiencing-Wisdom/dp/1587436248?dib_tag=se&dib=eyJ2IjoiMSJ9.n7ki-vAMy6Gs88HYKHHNphSTNvguhkhox8tzLzLMlq3NtIZR7ecEp_rGGz8989odbz6aXE3PK9xqlCD0VVVH71VGDN6UHRhHWKE3qw_r_o8.K35Ob4DzryBa-nwrciGkXcoUnGbpbYwzNvtweeYyJcE&qid=1728344513&sr=1-2">
                      <img
                        className="opacity-0 min-w-full"
                        src="assets/img/thumbs/mothers.jpg"
                        alt="image"
                      />
                      <div
                        className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                        data-img-url="assets/img/thumbs/mothers.jpg"
                      />
                    </a>
                  </div>
                </div>
              </li>
              <li className="book mb-[40px] float-left w-1/3 pl-[40px] item__">
                <div className="inner w-full h-auto clear-both float-left overflow-hidden relative">
                  <div
                    className="entry tokyo_tm_portfolio_animation_wrap"
                    data-title="The Wisdom of Your Body"
                    data-category="Books"
                  >
                    <a href="https://www.amazon.com/Practices-Embodied-Living-Experiencing-Wisdom/dp/1587436248?dib_tag=se&dib=eyJ2IjoiMSJ9.n7ki-vAMy6Gs88HYKHHNphSTNvguhkhox8tzLzLMlq3NtIZR7ecEp_rGGz8989odbz6aXE3PK9xqlCD0VVVH71VGDN6UHRhHWKE3qw_r_o8.K35Ob4DzryBa-nwrciGkXcoUnGbpbYwzNvtweeYyJcE&qid=1728344513&sr=1-2">
                      <img
                        className="opacity-0 min-w-full"
                        src="assets/img/thumbs/wisdom.jpg"
                        alt="image"
                      />
                      <div
                        className="abs_image absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                        data-img-url="assets/img/thumbs/wisdom.jpg"
                      />
                    </a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};
export default Resources;
