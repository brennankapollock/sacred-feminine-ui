import { TokyoContext } from '@/src/Context';
import { useContext } from 'react';
import ModalContainer from './ModalContainer';
const NewsModal = () => {
  const { newsModal, setNewsModal } = useContext(TokyoContext);
  return (
    <ModalContainer nullValue={setNewsModal}>
      <div className="image relative overflow-hidden">
        <img
          className="min-w-full opacity-0"
          src="assets/img/thumbs/40-25.jpg"
          alt="image"
        />
        <div
          className="main absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
          data-img-url={newsModal.image}
          style={{ backgroundImage: `url(${newsModal.image})` }}
        />
        <a className="tokyo_tm_full_link" href="#" />
      </div>
      <div className="details w-full float-left px-[40px] pt-[30px] pb-[25px] bg-white transition-all duration-300">
        <h3 className="title mb-[10px] leading-[1.4]">{newsModal.title}</h3>
      </div>
      {/* News Popup Start */}
      <div className="main_content w-full float-left">
        <div className="descriptions w-full float-left">
          <div className="quotebox w-full clear-both float-left h-auto relative pl-[70px] mb-[24px]">
            <div className="icon absolute left-0 top-[5px]">
              <i className="icon-quote-left text-[40px] text-black" />
            </div>
            <p className="text-[20px]">{newsModal.description}</p>
          </div>
        </div>
      </div>
      {/* /News Popup End */}
    </ModalContainer>
  );
};
export default NewsModal;
