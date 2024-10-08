import { Fragment } from 'react';
import Image from 'next/image';

const Lisa = () => {
  return (
    <Fragment>
      <div className="top_author_image min-w-[300px] min-h-[300px] relative rounded-full">
        <Image
          className="rounded-full min-w-full"
          src="/assets/img/portfolio/lisa.jpeg"
          alt="Lisa Gungor"
          width={100}
          height={100}
        />
      </div>

      <div className="about_title w-full h-auto clear-both float-left border-solid border-[#DFDFDF] border-b pb-5 mb-7.5">
        <h3 className="text-[22px] font-bold font-psych">Lisa Gungor</h3>
      </div>
      <div className="text w-full h-auto clear-both text-center border-solid border-[#DFDFDF] border-b pb-[31px] mb-7.5">
        <p className="font-bagnard text-black">
          A Grammy-nominated music artist and author. Lisa produces music with
          Gungor and Isa Ma. She is the author of{' '}
          <span className="italic font-bold">
            The Most Beautiful Thing I've Seen
          </span>
          . Lisa holds a Bachelor’s from Kendall College of Art and Design and a
          200 Hour YTT certificate from Aura Wellness Center.
        </p>
      </div>
      <div className="tokyo_tm_button font-psych flex items-center justify-evenly">
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

export default Lisa;
