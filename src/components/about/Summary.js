import { Fragment } from 'react';
const IntroTwo = () => {
  return (
    <Fragment>
      <div className="text w-full h-auto clear-both text-center border-solid border-[#DFDFDF] border-b pb-[22px] mb-[30px]">
        <p className="text-centet text-black font-bagnard">
          Sacred Feminine was created in 2018 by Lisa Gungor and Dr. Hillary
          McBride. It started as a series of retreats for woman-identifying
          people when Lisa and Hillary both connected over the longing to create
          empowering and enlivening spaces with other women and has now grown to
          include retreats for man-identifying people as well.
        </p>
        <br />
        <p className="text-center text-black font-bagnard ">
          {' '}
          The purpose of this work is to undo the burdens of patriarchal and
          colonial traditions, renegotiate the relationship with our bodies,
          redistribute the power in relationships, all while staying in touch
          with the play of life. The work of Sacred Feminine is currently
          expressed via retreats and embodiment workshops.
        </p>
        <br />
      </div>
    </Fragment>
  );
};
export default IntroTwo;
