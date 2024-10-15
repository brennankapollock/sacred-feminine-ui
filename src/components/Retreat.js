import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';
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
                title={'Temecula, CA | Nov 13th-15th '}
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
