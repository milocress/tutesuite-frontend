import React from "react";
import ColorTheme from "./ColorTheme";

export default function MyNavBar({ light, children }) {
  return (
    <ColorTheme light>
      <header className="p-3">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="" className="d-flex align-items-center mb-2 mb-lg-0 text-decoration-none mx-3">
              TuteSuite
            </a>

            {/* <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="#" className="nav-link px-2 text-secondary">Home</a></li>
              <li><a href="#" className="nav-link px-2 text-white">Features</a></li>
              <li><a href="#" className="nav-link px-2 text-white">FAQs</a></li>
              <li><a href="#" className="nav-link px-2 text-white">About</a></li>
            </ul> */}

            <div className="text-end">
              <ColorTheme light>
                {children}
              </ColorTheme>
            </div>
          </div>
        </div>
      </header>
    </ColorTheme>
  );
}