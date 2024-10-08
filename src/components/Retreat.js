import SectionContainer from './SectionContainer';
import SectionTitle from './SectionTitle';
import FunFact from './service/FunFact';
import Partners from './service/Partners';
import Pricing from './service/Pricing';
import ServiceItems from './service/ServiceItems';

const Retreat = () => {
  return (
    <SectionContainer name={'retreat'}>
      <div className="container">
        <div className="tokyo_tm_services w-full h-auto clear-both float-left py-[100px] px-0">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle
                pageName={'Retreats'}
                title={'Abbotsford, CA | Nov 1-3 '}
              />
            </div>
          </div>
          <ServiceItems />
        </div>
      </div>
    </SectionContainer>
  );
};
export default Retreat;
