import React from 'react';

export default function Footer(props) {
  return <div className="custom-footer fixed-bottom d-flex flex-wrap pt-3 pb-2">
          <p className="white-text ms-3 font bold-font">Developed by Rich Trunzo (available for hire!)</p>
          <a><p className="ms-5 white-text font">GitHub</p></a>
          <a><p className="ms-5 white-text font">LinkedIn</p></a>
          <a><p className="ms-5 white-text font">Resume</p></a>
        </div>;
}
