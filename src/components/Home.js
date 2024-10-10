import { useState } from 'react';
import SectionContainer from './containers/SectionContainer';
import MailChimpModal from './popup/MailChimpModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <SectionContainer name={'home'}>
      <div className="container">
        <div className="tokyo_tm_home w-full min-h-[100vh] clear-both flex items-center justify-center relative bg-lime-500">
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
                  Join The Fun!
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
          <MailChimpModal isOpen={isModalOpen} onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </SectionContainer>
  );
};

export default Home;
