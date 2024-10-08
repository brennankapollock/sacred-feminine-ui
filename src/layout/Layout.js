import { TokyoContext } from '@/src/Context';
import DetailsModal from '@/src/components/popup/DetailsModal';
import Cursor from '@/src/layout/Cursor';
import Mobile from '@/src/layout/Mobile';
import Sidebar from '@/src/layout/Sidebar';
import { tokyo } from '@/src/utils';
import ImageView from 'components/popup/ImageView';
import MediaPopup from 'components/popup/MediaPopup';
import NewsModal from 'components/popup/NewsModal';
import ServiceModal from 'components/popup/ServiceModal';
import dynamic from 'next/dynamic';
import { Fragment, useContext, useEffect } from 'react';
const Resources = dynamic(() => import('components/Resources'), {
  ssr: false,
});
const Layout = ({ children }) => {
  useEffect(() => {
    tokyo.dataImage();
    tokyo.imageToSvg();
    tokyo.customCursor();
  }, []);
  const { modal, serviceModal, newsModal, portfolioDetailsModal } =
    useContext(TokyoContext);
  return (
    <Fragment>
      <MediaPopup />
      <ImageView />
      {modal && serviceModal && <ServiceModal />}
      {modal && newsModal && <NewsModal />}
      {modal && portfolioDetailsModal && <DetailsModal />}
      {/* WRAPPER ALL */}
      <div className="tokyo_tm_all_wrap">
        <Mobile />
        {/* LEFTPART */}
        <Sidebar />
        {/* /LEFTPART */}
        {/* RIGHTPART */}
        <div className="rightpart w-full min-h-[100vh] float-left relative bg-[#f8f8f8] pl-[450px]">
          <div className="rightpart_in relative w-full float-left clear-both border-solid border-[#ebebeb] border-l min-h-[100vh]">
            {children}
          </div>
        </div>
        {/* /RIGHTPART */}
        {/* CURSOR */}
        {/* /CURSOR */}
      </div>
    </Fragment>
  );
};
export default Layout;
