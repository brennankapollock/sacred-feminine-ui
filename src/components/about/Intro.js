import { Fragment } from 'react';
const Intro = () => {
  return (
    <Fragment>
      <div className="top_author_image w-full h-auto clear-both float-left relative mb-[35px] rounded-lg">
        <img
          className="min-w-full"
          src="assets/img/portfolio/lisa.jpeg"
          alt="image"
        />
      </div>
      <div className="about_title w-full h-auto clear-both float-left border-solid border-[#DFDFDF] border-b pb-[20px] mb-[30px]">
        <h3 className="text-[22px] font-bold font-psych">Lisa Gungor</h3>
      </div>
      <div className="text w-full h-auto clear-both text-center border-solid border-[#DFDFDF] border-b pb-[31px] mb-[30px]">
        <p className="text-center">
          A Grammy-nominated music artist and author. Lisa produces music with
          Gungor and Isa Ma. She is the author of The Most Beautiful Thing I've
          Seen. Lisa holds a Bachelor’s from Kendall College of Art and Design
          and a 200hr YTT certificate from Aura Wellness Center .
        </p>
      </div>
      <div className="tokyo_tm_button flex items-center justify-evenly">
        <a href="https://www.instagram.com/lisagungor/?hl=en" download>
          Instagram
        </a>
        <a
          href="https://open.spotify.com/artist/0pWvGTyszb31m9wq2cLlJ0"
          download
        >
          Spotify
        </a>
      </div>
    </Fragment>
  );
};
export default Intro;
