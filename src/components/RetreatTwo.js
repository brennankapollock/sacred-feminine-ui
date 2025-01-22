import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';
import ServiceItems from './service/ServiceItems';

const RetreatTwo = () => {
  return (
    <SectionContainer name={'mens-retreat'}>
      <div className="container">
        <div className="tokyo_tm_services w-full h-auto clear-both float-left py-[100px] px-0">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle
                pageName={"Men's Retreat"}
                title={'Temecula, CA | June 20th-22nd'}
              />
            </div>
          </div>
          <ServiceItems />
        </div>
      </div>
    </SectionContainer>
  );
};
export default RetreatTwo;
