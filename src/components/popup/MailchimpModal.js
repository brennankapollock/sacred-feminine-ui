import { useEffect } from 'react';

const MailchimpModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div id="mc_embed_signup">
          <form
            action="https://sacredfeminineretreats.us19.list-manage.com/subscribe/post?u=1c626d0a1b41d23def1efb5c8&amp;id=749f2b97d8&amp;f_id=00b46fe7f0"
            method="post"
            id="mc-embedded-subscribe-form"
            name="mc-embedded-subscribe-form"
            className="validate"
            target="_blank"
          >
            <div id="mc_embed_signup_scroll">
              <h2>Subscribe</h2>
              <div className="indicates-required">
                <span className="asterisk">*</span> indicates required
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-FNAME">
                  First Name <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="FNAME"
                  className="required text"
                  id="mce-FNAME"
                  required
                />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-LNAME">
                  Last Name <span className="asterisk">*</span>
                </label>
                <input
                  type="text"
                  name="LNAME"
                  className="required text"
                  id="mce-LNAME"
                  required
                />
              </div>
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">
                  Email Address <span className="asterisk">*</span>
                </label>
                <input
                  type="email"
                  name="EMAIL"
                  className="required email"
                  id="mce-EMAIL"
                  required
                />
              </div>
              <div id="mce-responses" className="clear">
                <div
                  className="response"
                  id="mce-error-response"
                  style={{ display: 'none' }}
                ></div>
                <div
                  className="response"
                  id="mce-success-response"
                  style={{ display: 'none' }}
                ></div>
              </div>
              <div
                aria-hidden="true"
                style={{ position: 'absolute', left: '-5000px' }}
              >
                <input
                  type="text"
                  name="b_1c626d0a1b41d23def1efb5c8_749f2b97d8"
                  tabIndex="-1"
                />
              </div>
              <div className="clear">
                <input
                  type="submit"
                  name="subscribe"
                  id="mc-embedded-subscribe"
                  className="button"
                  value="Subscribe"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MailchimpModal;
