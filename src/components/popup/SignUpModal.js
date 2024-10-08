import { useContext } from 'react';
import { TokyoContext } from '@/src/Context';
import ModalContainer from './ModalContainer';

const SignUpModal = () => {
  const { setSignUpModal } = useContext(TokyoContext);

  return (
    <ModalContainer nullValue={setSignUpModal}>
      <div className="signup_modal_content">
        <h2>Sign Up</h2>
        <form>
          <input type="text" placeholder="Name" required />
          <input type="email" placeholder="Email" required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </ModalContainer>
  );
};

export default SignUpModal;
