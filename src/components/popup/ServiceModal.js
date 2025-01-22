import { TokyoContext } from '@/src/Context';
import { useContext } from 'react';
import ModalContainer from './ModalContainer';

const ServiceModal = () => {
  const { serviceModal, setServiceModal } = useContext(TokyoContext);

  return (
    <ModalContainer nullValue={setServiceModal}>
      <div className="service_popup_informations w-full h-auto clear-both float-left flex flex-col overflow-y-auto max-h-[80vh]">
        <div className="main_title font-psych">
          <h3 className="text-center font-psych">{serviceModal.name || ''}</h3>
        </div>
        <div className="descriptions font-bagnard text-black w-full float-left text-center">
          {(serviceModal.text || []).map((text, i) => (
            <p
              className={serviceModal.text?.length - 1 == i ? '' : 'mb-[15px]'}
              key={i}
            >
              {text || ''}
            </p>
          ))}
        </div>
      </div>
    </ModalContainer>
  );
};
export default ServiceModal;
