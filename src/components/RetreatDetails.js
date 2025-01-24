import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';
import ServiceItemsTwo from './service/ServiceItemsTwo';

const RetreatDetails = ({ retreat }) => {
  return (
    <SectionContainer
      name={retreat?.type === 'womens' ? 'womens-retreat' : 'mens-retreat'}
    >
      <div className="container">
        <div className="tokyo_tm_services w-full h-auto clear-both float-left py-[100px] px-0">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle
                pageName={retreat?.name || ''}
                title={`${retreat?.location || ''} | ${
                  retreat?.range || retreat?.range  || ''
                }`}
              />
            </div>
          </div>
          <ServiceItemsTwo retreat={retreat} />
        </div>
      </div>
    </SectionContainer>
  );
};

export default RetreatDetails;
