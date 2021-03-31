import React from 'react';

export default function Footer(props) {
  return <div className="custom-footer fixed-bottom d-flex flex-wrap pt-3 pb-2">
          <p className="white-text ms-3 font bold-font">Developed by Rich Trunzo (available for hire!)</p>
          <a href="https://github.com/richtrunzo"><p className="ms-5 underline white-text font">GitHub</p></a>
          <a href="https://www.linkedin.com/in/richardtrunzo/"><p className="ms-5 underline white-text font">LinkedIn</p></a>
          <a href="https://drive.google.com/file/d/1wnwxHDPUUkVlSbNS4LkfLaV9EKuYORLu/view"><p className="ms-5 underline white-text font">Resume</p></a>
        </div>;
}
