import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const Terms = () => {
  return (
    <>
      <header>
        <h1 className="font-bold text-2xl mt-6 text-center md:text-3xl lg:text-[40px]">
          Website Terms and conditions of use with
        </h1>
      </header>

      <div className="max-w-full p-10 font-roboto text-justify">
        <ul className="list-disc space-y-4 font-roboto text-[23px] p-[10px] text-black text-justify">
          <li>
            By proceeding to view our sites or any part of it, you acknowledge
            that you have read, understood and accepted our terms and conditions
            these terms which shall constitute the entire binding agreement
            between you and the End 2 End Home Solution.
          </li>
          <li>
            Please read the terms carefully before you start to use our sites.
            If you do not agree to these terms, you must avoid browsing our
            website.{" "}
          </li>
          <li>
            We may revise these terms at any time by improving the user page
            experiences. We request you to Please check our terms and conditions
            page time to time to take the notice of any changes we have made in
            our terms.
          </li>
          <li>
            We may update our sites from time to time, and may change the
            contents at any time. Please note that any of the content may be out
            of date at any given time, and we are under no obligation to update
            it.
          </li>
          <li>
            We do not guarantee that our sites, or their content, will be free
            from errors or omissions. End 2 End Home Solution excludes all
            liability for any errors or omissions in the content to the fullest
            extent permitted by law.
          </li>
          <li>
            The information available on our sites is provided for general
            guidance and for illustrative purposes only. It is not intended to
            amount to advice on which you should rely.
          </li>
          <li>
            Our sites are made available free of charge. If you are provided
            with a user identification code, password or otherwise as part of
            our security procedures, you must treat such information as
            confidential. You must not disclose it to any third party.{" "}
          </li>
          <li>
            We do not guarantee that our sites, or any content on them, will
            always be available or be uninterrupted. Access to our sites is
            permitted on a temporary basis. We may suspend, withdraw,
            discontinue or change all or any part of our site without notice. We
            will not be liable to you if for any reason our site is unavailable
            at any time or for any period.
          </li>
        </ul>
      </div>

      <footer classname="foot_sec">
        <div className="foot_top bg-gray-800 text-white py-8 text-center">
          <div className="container mx-auto px-4">
            <div className="row">
              <div className="col-md-12 mx-auto">
                <div className="foot_left">
                  <h1 className="text-2xl md:text-4xl font-bold">
                    ARIHANT ANAIKA
                  </h1>
                  <p className="mt-4 text-base md:text-lg text-justify">
                    Disclaimer: This website is meant only for information
                    purposes. It should not be considered / claimed as an
                    official site. This website belongs to the authorized
                    channel partner of Arihant Group. The content
                    provided on this website is for information purposes only
                    and does not constitute an offer to avail any service. The
                    prices mentioned are subject to change without prior notice,
                    and the availability of properties mentioned is not
                    guaranteed. The images displayed on the website are for
                    representation purposes only and may not reflect the actual
                    properties accurately. We may share data with Real Estate
                    Regulatory Authority (RERA) registered brokers/companies for
                    further processing as required. We may also send updates and
                    information to the mobile number or email ID registered with
                    us. All rights reserved. The content, design, and
                    information on this website are protected by copyright and
                    other intellectual property rights. Any unauthorized use or
                    reproduction of the content may violate applicable laws.
                  </p>
                </div>
                <h3 className="text-center justify" style={{ color: "#fff" }}>
                  MahaRERA registration number:P52000056420
                  maharera.mahaonline.gov.in
                </h3>

                <h3 className="text-center justify" style={{ color: "#fff" }}>
                  MahaRERA registration number: A52000032416
                  maharera.mahaonline.gov.in
                </h3>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <a
        href="https://api.whatsapp.com/send?phone=9326959938&text=I am interested in ARIHANT ANAIKA, TALOJA project and want more information about this project."
        className="floating-button"
        target="_blank" rel="noreferrer"
      >
        <div className="floating-btn">
          <FaWhatsapp size={30} />
        </div>
      </a>
    </>
  );
};

export default Terms;
