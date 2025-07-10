import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router

const FormModal = (props) => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  // Yup validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    phone: Yup.string()
      .required("Phone is required")
      .matches(/^\d{10}$/, "Phone number must be 10 digits long"),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("Name", values.name);
      formData.append("Phone", values.phone);

      const crmData = {
        name: values.name,
        phone: values.phone,
        listId: "68578e1ae7cfbf2d47b7d334", // Add your listId for CRM
        redirect: "", // Add your redirect URL for CRM
      };

      try {
        setIsSubmitted(true);

        const googleResponse = await fetch(
          "https://script.google.com/macros/s/AKfycbyHTkyuEubDgvaIcNJyny-FvS9CBJSb1302TO6aBY-b7stUW4o1eBkW0H39v9vqfWflCw/exec",
          {
            method: "POST",
            body: formData,
          }
        );

        // Send data to CRM API
        const crmResponse = await fetch(
          "https://enterprise.godial.cc/meta/api/externals/contact/add?access_token=nLWC3eZkuDXNbcElB7wXENJZCMM15hmG7GnDJKs6Zdcxqbh4AHq7o24nAiD43K0e",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(crmData),
          }
        );

        //
        if (googleResponse.ok && crmResponse.ok) {
          console.log("Data sent successfully to both Google Sheets and CRM.");

          // Reset form and close modal
          formik.resetForm({ name: "", phone: ""});
          props.onClose();
          navigate("/thank-you");
        } else {
          setIsSubmitted(false);
          formik.resetForm({ name: "", phone: ""});
          props.onClose();
          console.error("Failed to send data to one or both destinations.");
        }
      } catch (error) {
        setFormError(true);
        console.error("Error:", error);
      }
    },
  });

  useEffect(() => {
    if (props.open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [props.open]);

  // console.log("Formik", formik.values);

  return (
    <div
      onClick={props.onClose}
      className={`
      fixed inset-0 z-50 flex items-center justify-center transition-colors 
      ${props.open ? "visible bg-black/70" : "invisible"}
    `}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`
        fixed inset-0 z-50 flex items-center justify-center
        ${props.open ? "scale-100 opacity-100" : "scale-125 opacity-0"}
      `}
        style={{ overflowY: "auto", padding: "100px 20px 0" }}
      >
        <div
          className="relative flex flex-col md:flex-row w-full max-w-2xl mx-auto max-h-[80vh] rounded-md bg-white p-6 px-12 shadow-lg transition-all"
          style={{ border: "1px solid #888", overflowY: "auto" }}
        >
          <button
            onClick={props.onClose}
            className="absolute right-2 top-2 rounded-lg bg-white p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-600"
          >
            <img
              className="cross-img"
              src="images/cross-img-removebg-preview.png"
              width="25px"
              height="30px"
              alt="cross"
            />
          </button>

          <div className="md:w-2/3 flex flex-col items-start">
            <h2 className="text-start text-xl font-bold text-black md:text-2xl">
              {props.formTitle}
            </h2>
            {!isSubmitted ? (
              <p className="max-w-sm text-start text-medium sm:text-base sm:font-medium my-3">
                {props.formSubTitle}
              </p>
            ) : (
              ""
            )}

            <div className="w-full text-center flex items-center justify-center lg:h-screen">
              {/* Form Wrapper */}
              {isSubmitted && !formError ? (
                <div className="text-center bg-[#278f47] text-[#ffff00] mx-4 p-4 border-1 border-[#520808]">
                  <h4 className="text-2xl">Successfully Submitted</h4>
                  <h3 className="text-xl">
                    Thank you! We will contact you soon.
                  </h3>
                </div>
              ) : formError ? (
                <div className="text-center bg-[#ffff00] text-[#E72744] mx-4 p-4 border-1 border-[#520808]">
                  <p className="text-2xl">
                    Something went wrong. Please try again.
                  </p>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <div className="my-3 flex flex-col justify-center gap-4">
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-lg text-start font-medium text-gray-600"
                        htmlFor="inputName"
                      >
                        Name
                      </label>
                      <input
                        id="inputName"
                        className="border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                        type="text"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.name && formik.errors.name && (
                        <span className="text-red-500 text-sm">
                          {formik.errors.name}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        className="text-lg text-start font-medium text-gray-600"
                        htmlFor="inputPhone"
                      >
                        Number
                      </label>
                      <input
                        id="inputPhone"
                        className="border-b border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
                        type="text"
                        name="phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      {formik.touched.phone && formik.errors.phone && (
                        <span className="text-red-500 text-sm">
                          {formik.errors.phone}
                        </span>
                      )}
                    </div>

                    <button className="relative w-full sm:w-4/5 h-[50px] sm:h-[45px] lg:h-[50px] border-none outline-none text-white bg-[#05335f] cursor-pointer z-0 rounded-lg m-2 mt-3 text-sm sm:text-base lg:text-lg font-bold transition duration-300 hover:text-[#05335f] glow-on-hover">
                      {props.buttonTitle}
                    </button>
                  </div>
                </form>
              )}

              {/* End of Form Wrapper */}
            </div>
          </div>

          {/* Images Section */}
          <div className="md:w-1/3 hidden md:flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <img
                src="images/free-pickup3-removebg-preview.png"
                alt="free-pickup"
                className="w-24 h-auto rounded-md"
              />
              <p className="svg-p">Free Site Assistance</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="images/instant-callback-removebg-preview.png"
                alt="instant-callback"
                className="w-24 h-auto rounded-md"
              />
              <p className="svg-p">Instant Call Back</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src="images/best.png"
                alt="best offers"
                className="w-24 h-auto rounded-md"
              />
              <p className="svg-p">Best-Offers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormModal;
