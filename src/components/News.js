import { useContext } from "react";
import { TokyoContext } from "../Context";
import SectionContainer from "./SectionContainer";
import SectionTitle from "./SectionTitle";

const news = [
  {
    id: 1,
    title: "Format releases a new tool that enables direct video hosting",
    image: "assets/img/news/1.jpg",
    author: "Alex Watson",
    date: "22 Oct 2022",
  },
  {
    id: 2,
    title: "Sony announced two new full frame cameras with zero fanfare",
    image: "assets/img/news/2.jpg",
    author: "Brook Kennedy",
    date: "15 Oct 2022",
  },
  {
    id: 3,
    title: "Why every photographer should shoot film, even in 2022",
    image: "assets/img/news/3.jpg",
    author: "Paola Atkins",
    date: "07 Oct 2022",
  },
  {
    id: 4,
    title: "Stay creative in lockdown with these fun photo projects",
    image: "assets/img/news/4.jpg",
    author: "Kevin Stone",
    date: "25 Sep 2022",
  },
];

const News = () => {
  const { setNewsModal, modalToggle } = useContext(TokyoContext);
  return (
    <SectionContainer name={"news"}>
      <div className="container">
        <div className="tokyo_tm_news w-full clear-both float-left h-auto pt-[100px] px-0 pb-[45px]">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle pageName={"News"} title={"Latest News"} />
            </div>
          </div>
          <ul className="ml-[-50px] list-none">
            {news.map((item) => (
              <li
                className="mb-[50px] float-left w-1/2 pl-[50px]"
                key={item.id}
              >
                <div className="list_inner w-full clear-both float-left h-auto relative">
                  <div className="image relative overflow-hidden">
                    <img
                      className="min-w-full opacity-0"
                      src="assets/img/thumbs/40-25.jpg"
                      alt="image"
                    />
                    <div
                      className="main absolute inset-0 bg-no-repeat bg-cover bg-center transition-all duration-300"
                      data-img-url={item.image}
                      style={{ backgroundImage: `url(${item.image})` }}
                    />
                    <a
                      className="tokyo_tm_full_link"
                      href="#"
                      onClick={() => {
                        modalToggle(true);
                        setNewsModal(item);
                      }}
                    />
                  </div>
                  <div className="details w-full float-left px-[40px] pt-[30px] pb-[25px] bg-white transition-all duration-300">
                    <div className="extra flex items-center justify-between mb-[25px] relative">
                      <div className="short">
                        <p className="date font-montserrat text-[13px] text-[#767676]">
                          By{" "}
                          <a
                            className="text-[#767676] transition-all duration-300 hover:text-black"
                            href="#"
                            onClick={() => {
                              modalToggle(true);
                              setNewsModal(item);
                            }}
                          >
                            {item.author}
                          </a>{" "}
                          <span className="relative">{item.date}</span>
                        </p>
                      </div>
                    </div>
                    <h3 className="title mb-[10px] leading-[1.4]">
                      <a
                        className="text-black text-[18px] font-semibold inline-block transition-all duration-300 hover:text-black"
                        href="#"
                        onClick={() => {
                          modalToggle(true);
                          setNewsModal(item);
                        }}
                      >
                        {item.title}
                      </a>
                    </h3>
                    <div className="tokyo_tm_read_more">
                      <a
                        href="#"
                        onClick={() => {
                          modalToggle(true);
                          setNewsModal(item);
                        }}
                      >
                        <span>Read More</span>
                      </a>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SectionContainer>
  );
};
export default News;
