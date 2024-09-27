import { Fragment } from 'react';
const IntroTwo = () => {
  return (
    <Fragment>
      <div className="top_author_image w-full h-auto clear-both float-left relative mb-[35px]">
        <img
          className="min-w-full"
          src="assets/img/portfolio/hilary.jpg"
          alt="image"
        />
      </div>
      <div className="about_title w-full h-auto clear-both float-left border-solid border-[#DFDFDF] border-b pb-[20px] mb-[30px]">
        <h3 className="text-[22px] font-bold font-psych">
          Dr. Hillary McBride
        </h3>
      </div>
      <div className="text w-full h-auto clear-both text-center border-solid border-[#DFDFDF] border-b pb-[31px] mb-[30px]">
        <p className="">
          A therapist, researcher, speaker, and author. Hillary holds a PhD in
          Counseling Psychology from the University of British Columbia, as well
          as Masters of Arts in Counseling Psychology. She is a registered
          clinical counsellor (RCC).
        </p>
        <br />
        <p>
          She is the author of Mothers, Daughters & Body Image. Hillary lives in
          Vancouver, British Columbia.
        </p>
      </div>
      <div className="tokyo_tm_button flex items-center justify-evenly gap-4">
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
export default IntroTwo;
