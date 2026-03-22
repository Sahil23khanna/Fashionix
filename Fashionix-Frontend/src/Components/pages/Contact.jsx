import PageTitle from "../layouts/PageTitle";
import { useState } from "react";
import Swal from "sweetalert2";


export default function Contact() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake submit (console only)
    console.log("Contact Form Data:", formData);

    Swal.fire({
      icon: "success",
      title: "Message Sent!",
      text: "Thanks for contacting us. We'll get back to you soon.",
    });

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <>

      <PageTitle>Contact</PageTitle>

      {/* Contact Start */}
      <div className="container-fluid contact py-5">
        <div className="container py-5">
          <div className="p-5 bg-light rounded">
            <div className="row g-4">
              <div className="col-12">
                <div className="text-center mx-auto" style={{ maxWidth: 700 }}>
                  <h1 style={{color:"#d19c97"}}>Get in touch</h1>
                  <p className="mb-4">
                    Have a question, feedback, or suggestion?
                    Feel free to reach out using the form below.
                    This demo form is for UI showcase purposes only.{" "}
                  </p>
                </div>
              </div>

              <div className="col-lg-12">
                <div className="h-100 rounded">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6654.065132917962!2d75.54798538363167!3d31.316574069193987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a5ac3a0faaba5%3A0x6939c87e7e0e4d51!2sGobind%20Nagar%2C%20Jalandhar%2C%20Punjab%20144002!5e1!3m2!1sen!2sin!4v1769346727998!5m2!1sen!2sin"
                    style={{ border: 0, height: 400 }}
                    className="w-100 rounded"
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade">
                    </iframe>
                </div>
              </div>

              <div className="col-lg-7">
                <form action="" className="" onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="email"
                    className="w-100 form-control border-0 py-3 mb-4"
                    placeholder="Enter Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <textarea
                    className="w-100 form-control border-0 mb-4"
                    rows={5}
                    cols={10}
                    placeholder="Your Message"
                    /*  defaultValue={""} */
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />
                  <button
                    className="w-100 btn form-control borderishere py-3 bg-white  "
                    type="submit"
                  >
                    Submit
                  </button>
                </form>
              </div>

              <div className="col-lg-5">
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-map-marker-alt fa-2x  me-4" style={{color:"#d19c97"}}/>
                  <div>
                    <h4>Address</h4>
                    <p className="mb-2">W.R-96 Basti Sheikh, Jalandhar, Punjab, India</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded mb-4 bg-white">
                  <i className="fas fa-envelope fa-2x  me-4" style={{color:"#d19c97"}}/>
                  <div>
                    <h4>Mail Us</h4>
                    <p className="mb-2">sahilkhanna2330@gmail.com</p>
                  </div>
                </div>
                <div className="d-flex p-4 rounded bg-white">
                  <i className="fa fa-phone-alt fa-2x  me-4" style={{color:"#d19c97"}}/>
                  <div>
                    <h4>Telephone</h4>
                    <p className="mb-2">(+91) 9517806970</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Contact End */}


    </>
  )
}