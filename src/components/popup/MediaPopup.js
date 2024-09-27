import { Fragment, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import useClickOutside from "../../useClickOutside";

const VideoPopup = ({ close, videoID }) => {
  let domNode = useClickOutside(() => {
    close(false);
  });
  return (
    <Fragment>
      <div className="mfp-bg mfp-ready" onClick={() => close(false)}></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
        tabIndex={-1}
        style={{ overflow: "hidden auto" }}
      >
        <div className="mfp-container popup-container mfp-s-ready mfp-iframe-holder">
          <div className="mfp-content" ref={domNode}>
            <div className="mfp-iframe-scaler">
              <button
                title="Close (Esc)"
                type="button"
                className="mfp-close"
                onClick={() => close()}
              >
                ×
              </button>
              <ReactPlayer url={videoID} playing={true} />
            </div>
          </div>
          <div className="mfp-preloader">Loading...</div>
        </div>
      </div>
    </Fragment>
  );
};
const AudioPopup = ({ close, audioID }) => {
  let domNode = useClickOutside(() => {
    close(false);
  });
  return (
    <Fragment>
      <div className="mfp-bg mfp-ready" onClick={() => close(false)}></div>
      <div
        className="mfp-wrap mfp-close-btn-in mfp-auto-cursor mfp-ready"
        tabIndex={-1}
        style={{ overflow: "hidden auto" }}
      >
        <div className="mfp-container popup-container mfp-s-ready mfp-iframe-holder">
          <div className="mfp-content" ref={domNode}>
            <div className="mfp-iframe-scaler">
              <button
                title="Close (Esc)"
                type="button"
                className="mfp-close"
                onClick={() => close()}
              >
                ×
              </button>
              <iframe
                src={audioID}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="mfp-preloader">Loading...</div>
        </div>
      </div>
    </Fragment>
  );
};

const MediaPopup = () => {
  const [videoValue, setVideoValue] = useState(null);
  const [audio, setAudio] = useState(false);
  const [toggle, setToggle] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      const a = document.querySelectorAll("a");
      a.forEach((a) => {
        if (
          a.href.includes("www.youtube.com") ||
          a.href.includes("vimeo.com") ||
          a.href.includes("soundcloud.com")
        ) {
          a.addEventListener("click", (e) => {
            e.preventDefault();
            if (a.href.includes("soundcloud")) {
              setAudio(a.href);
              setToggle(true);
            } else {
              setVideoValue(a.href);
              setToggle(true);
            }
          });
        }
      });
    }, 1500);
  }, []);
  return (
    <Fragment>
      {toggle && videoValue && (
        <VideoPopup
          close={() => {
            setToggle(false);
            setVideoValue(null);
          }}
          videoID={videoValue}
        />
      )}
      {toggle && audio && (
        <AudioPopup
          close={() => {
            setToggle(false);
            setAudio(null);
          }}
          audioID={audio}
        />
      )}
    </Fragment>
  );
};

export default MediaPopup;
