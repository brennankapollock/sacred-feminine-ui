import { TokyoContext } from "@/src/Context";
import { useContext } from "react";
import ModalContainer from "./ModalContainer";
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
        <div className="extra flex items-center justify-between mb-[25px] relative">
          <div className="short">
            <p className="date font-montserrat text-[13px] text-[#767676]">
              By{" "}
              <a
                className="text-[#767676] transition-all duration-300 hover:text-black"
                href="#"
              >
                {newsModal.author}
              </a>{" "}
              <span className="relative">{newsModal.date}</span>
            </p>
          </div>
        </div>
        <h3 className="title mb-[10px] leading-[1.4]">{newsModal.title}</h3>
      </div>
      {/* News Popup Start */}
      <div className="main_content w-full float-left">
        <div className="descriptions w-full float-left">
          <p className="bigger text-[#888] text-[20px] mb-[31px]">
            Just because we can't get out and about like we normally would,
            doesn’t mean we have to stop taking pictures. There’s still plenty
            you can do, provided you're prepared to use some imagination. Here
            are a few ideas to keep you shooting until normal life resumes.
          </p>
          <p className="mb-[22px]">
            Most photographers love to shoot the unusual, and you don’t get much
            more unusual than These Unprecedented Times. Right now everything
            counts as out of the ordinary. There are a number of remarkable
            things about these lockdown days that are worth photographing now so
            we can remember them when it is all over.
          </p>
          <div className="quotebox w-full clear-both float-left h-auto relative pl-[70px] mb-[24px]">
            <div className="icon absolute left-0 top-[5px]">
              <i className="icon-quote-left text-[40px] text-black" />
            </div>
            <p className="text-[20px]">
              Most photographers find it hard to see interesting pictures in
              places in which they are most familiar. A trip somewhere new seems
              always exactly what our photography needed, as shooting away from
              home consistently inspires us to new artistic heights.
            </p>
          </div>
          <p className="mb-[22px]">
            Streets empty that are usually busy are remarkable and can evoke the
            sense of historical pictures from before the invention of the
            motorcar. Other things that are different at the moment will be
            queues to get into stores and the lines marked out on the floor to
            show how far apart we should be.
          </p>
          <p className="mb-[22px]">
            Pretend everything is new and that you haven’t seen it before, and
            then you will be free to notice the leading lines, the places where
            one edge meets another in delightful geometric harmony, and how the
            ordinary things in the kitchen are transformed when the light is on
            or off.
          </p>
          <p>
            The trick here is to look slowly, and then look again. Take the time
            to look in detail and to look at the same thing from different
            angles, with different light, long lenses and wide lenses. Then move
            to the left a bit. You may never feel the need to leave the house
            again.
          </p>
        </div>
      </div>
      {/* /News Popup End */}
    </ModalContainer>
  );
};
export default NewsModal;
