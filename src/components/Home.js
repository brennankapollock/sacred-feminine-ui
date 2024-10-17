import { useState, useContext } from 'react';
import SectionContainer from './containers/SectionContainer';
import { TokyoContext } from '../Context';
import MailchimpModal from './MailChimpModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { navChange, nav, menus } = useContext(TokyoContext);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <SectionContainer name={'home'}>
      <div className="container">
        <div className="tokyo_tm_home w-full min-h-[100vh] clear-both flex items-center justify-center relative">
          <div className="home_content flex items-center ">
            <div
              className="avatar min-w-[300px] min-h-[300px] relative rounded-full"
              data-type="circle"
            >
              <div
                className="image absolute inset-0 bg-no-repeat bg-center bg-cover"
                data-img-url="assets/img/logo/logo.png"
              />
            </div>
            <div className="details ml-[80px]">
              <p className="job text-black text-center font-bagnard max-w-[450px] mb-[25px]">
                The way of the sacred feminine is about joining things that were
                never meant to be apart: the mind and body, our power and our
                vulnerability, the self and the other, our sense of the realness
                of right here, and the vastness and mystery of the unknown.
              </p>
              <div className="tokyo_tm_button flex items-center justify-evenly rounded-lg">
                <Button
                  className="text-black font-psych"
                  onClick={handleOpenModal}
                >
                  Stay in the Loop!
                </Button>
                <Button
                  className="text-black font-psych"
                  onClick={() => navChange('retreat')}
                >
                  Temecula Retreat
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Subscribe to Our Newsletter</DialogTitle>
            <DialogDescription>
              Stay updated with our upcoming retreats and events.
            </DialogDescription>
          </DialogHeader>
          <MailchimpModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </SectionContainer>
  );
};

export default Home;
