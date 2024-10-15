import SectionContainer from './containers/SectionContainer';
import SectionTitle from './containers/SectionTitle';
import ContactForm from './contact/ContactForm';
const Contact = () => {
  return (
    <SectionContainer name={'contact'}>
      <div className="container">
        <div className="tokyo_tm_contact w-full float-left clear-both h-auto py-[100px] px-[0px]">
          <div className="tokyo_tm_title w-full h-auto clear-both float-left mb-[62px]">
            <div className="title_flex w-full h-auto clear-both flex justify-between items-end">
              <SectionTitle pageName={'Contact'} title={'Get in Touch'} />
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </SectionContainer>
  );
};
export default Contact;
