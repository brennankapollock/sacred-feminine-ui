import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';
import ServiceItemsTwo from './service/ServiceItemsTwo';

const Retreat = () => {
  return (
    <SectionContainer name={'womens-retreat'}>
      <div className="container">
        <div className="tokyo_tm_services w-full h-auto clear-both float-left py-[100px] px-0">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle
                pageName={"Women's Retreat"}
                title={'Santa Paula, CA | April 11th-13th '}
              />
            </div>
          </div>
          <ServiceItemsTwo />
        </div>
      </div>
    </SectionContainer>
  );
};
export default Retreat;
