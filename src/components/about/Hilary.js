import { Fragment } from 'react';
import Image from 'next/image';

const Hilary = () => {
  return (
    <Fragment>
      <div className="top_author_image clear-both float-left relative mb-[35px]">
        <Image
          className="rounded-full min-w-full xl:w-[100px] xl:h-[300px]"
          src="/assets/img/portfolio/hilary.jpg"
          alt="Hillary McBride"
          width={300}
          height={300}
        />
      </div>
      <div className="about_title w-full h-auto clear-both float-left border-solid border-[#DFDFDF] border-b pb-[20px] mb-[30px]">
        <h3 className="text-[22px] font-bold font-psych">
          Dr. Hillary McBride
        </h3>
      </div>
      <div className="text w-full h-auto clear-both text-center border-solid border-[#DFDFDF] border-b pb-[31px] mb-[30px]">
        <p className="text-black font-young">
          A therapist, researcher, speaker, and author. Hillary holds a PhD in
          Counseling Psychology from the University of British Columbia and a
          Masters of Arts in Counseling Psychology.
        </p>
        <br />
        <p className="text-black font-young">
          She is the author of{' '}
          <span className="italic font-bold">
            Mothers, Daughters & Body Image
          </span>
          . Hillary lives in Vancouver, British Columbia.
        </p>
      </div>
      <div className="tokyo_tm_button font-psych flex items-center justify-evenly gap-4">
        <a
          href="https://www.instagram.com/hillaryliannamcbride?igsh=MzRlODBiNWFlZA=="
          download
        >
          Instagram
        </a>
        <a href="https://hillarylmcbride.com/" download>
          Portfolio
        </a>
      </div>
    </Fragment>
  );
};
export default Hilary;
