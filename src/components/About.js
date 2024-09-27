import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';
import Intro from './about/Intro';
import IntroTwo from './about/IntroTwo';
import Summary from './about/Summary';

const About = () => {
  return (
    <SectionContainer name={'about'}>
      <div className="container">
        <div className="tokyo_tm_about w-full h-auto clear-both float-left py-[100px] px-0">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle title={'Who We Are'} />
            </div>
          </div>
          <Summary />
          <Intro />
          <IntroTwo />
        </div>
      </div>
    </SectionContainer>
  );
};
export default About;
