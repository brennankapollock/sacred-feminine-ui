import { Fragment, useContext, useState } from 'react';
import { TokyoContext } from '../Context';

const Mobile = () => {
  const [toggle, setToggle] = useState(false);
  const { navChange, nav, menus } = useContext(TokyoContext);
  return (
    <Fragment>
      <div className="tokyo_tm_topbar bg-white fixed top-0 left-0 right-0 h-[50px] z-[14] hidden">
        <div className="topbar_inner w-full h-full clear-both flex items-center justify-between py-0 px-[20px]">
          <div className="logo" data-type="text">
            {' '}
            {/* You can use image or text as logo. data-type values are "image" and "text" */}
            <a href="#">
              <img
                className="max-w-[100px] max-h-[40px]"
                src="assets/img/logo/dark.png"
                alt="image"
              />
              <h3 className="font-black font-psych text-[25px] ">
                Sacred Feminine
              </h3>
            </a>
          </div>
          <div className="trigger relative top-[5px]">
            <div
              className={`hamburger hamburger--slider ${
                toggle ? 'is-active' : ''
              }`}
              onClick={() => setToggle(!toggle)}
            >
              <div className="hamburger-box w-[30px]">
                <div className="hamburger-inner" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`tokyo_tm_mobile_menu fixed top-[50px] right-[-200px] h-[100vh] w-[200px] z-[15] bg-white transition-all duration-300 ${
          toggle ? 'opened' : ''
        }`}
      >
        <div className="menu_list  w-full h-auto clear-both float-left text-right px-[20px] pt-[100px] pb-[0px]">
          <ul className="transition_link list-none">
            {menus.map((menu) => (
              <li
                className={`active mb-[7px] ${
                  menu.href == nav ? 'active' : ''
                }`}
                key={menu.id}
              >
                <a
                  className="text-black font-psych"
                  href={`#${menu.href}`}
                  onClick={() => {
                    navChange(menu.href);
                    setToggle(!toggle);
                  }}
                >
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Fragment>
  );
};
export default Mobile;
