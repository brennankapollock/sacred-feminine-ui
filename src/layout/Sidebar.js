import { useContext } from 'react';
import { TokyoContext } from '../Context';

const Sidebar = () => {
  const { navChange, nav, menus } = useContext(TokyoContext);
  return (
    <div className="leftpart w-[450px] h-[100vh] fixed flex items-center z-[12] px-[100px] py-[0px] bg-desert_sand-400">
      <div className="leftpart_inner w-full h-auto">
        <div className="logo" data-type="text">
          {' '}
          {/* You can use image or text as logo. data-type values are: "image" and "text" */}
          <a href="#">
            <img
              className="max-w-[150px]"
              src="assets/img/logo/logo.png"
              alt="image"
            />
            <h3 className="font-psych font-black text-[31px]">
              Sacred Feminine
            </h3>
          </a>
        </div>
        <div className="menu px-[0px] py-[50px] w-full float-left">
          <ul className="transition_link m-0 list-none">
            {menus.map((menu) => (
              <li
                className={`m-0 w-full float-left ${
                  menu.href == nav ? 'active' : ''
                }`}
                key={menu.id}
              >
                <a
                  className="text-[20px] capitalize inline-block font-psych transition-all duration-300"
                  href={`#${menu.href}`}
                  onClick={() => navChange(menu.href)}
                >
                  {menu.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="copyright w-full float-left">
          <p className="text-[15px] text-[#999] font-montserrat leading-[25px]">
            © {new Date().getFullYear()} Sacred Feminine
            <br />
            made by{' '}
            <a
              className="text-[#787878] font-medium transition-all duration-300 hover:text-black"
              href="https://themeforest.net/user/Codeefly"
              target="_blank"
            >
              brennan k.a. pollock
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
