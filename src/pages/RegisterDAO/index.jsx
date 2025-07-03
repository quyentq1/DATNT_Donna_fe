import React, { useState } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

const AREAS = [
  { label: "Education", value: "education", color: "bg-blue-500" },
  { label: "Medical", value: "medical", color: "bg-red-500" },
  { label: "Children", value: "children", color: "bg-yellow-400" },
  { label: "Environment", value: "environment", color: "bg-green-500" },
  { label: "Natural disaster", value: "natural_disaster", color: "bg-cyan-500" },
  { label: "Disability", value: "disability", color: "bg-purple-500" },
];

const USER_INFO = {
    name: "Dat Nguyen Tien",
    email: "datnguyentien@gmail.com",
  };

const DaoMemberPage = () => {
    const [form, setForm] = useState({
        name: USER_INFO.name,
        email: USER_INFO.email,
        introduce: "",
        areas: [],
        experience: "",
        certificate: "",
        agree: false,
      });
      const [errors, setErrors] = useState({});
      const [showSuccess, setShowSuccess] = useState(false);
    
      const validate = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = "Full name is required.";
        if (!form.email.trim())
          newErrors.email = "Email is required.";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(form.email))
          newErrors.email = "Invalid email address.";
        if (!form.introduce.trim()) newErrors.introduce = "Introduce yourself is required.";
        if (!form.areas.length) newErrors.areas = "Please select at least one area.";
        if (!form.experience.trim()) newErrors.experience = "Experience is required.";
        if (!form.certificate.trim()) newErrors.certificate = "Certificate or proof is required.";
        if (!form.agree) newErrors.agree = "You must agree to DonaTrust’s principles.";
        return newErrors;
      };
    
      const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox" && name === "areas") {
          setForm((f) =>
            f.areas.includes(value)
              ? { ...f, areas: f.areas.filter((a) => a !== value) }
              : { ...f, areas: [...f.areas, value] }
          );
        } else if (type === "checkbox") {
          setForm((f) => ({ ...f, [name]: checked }));
        } else {
          setForm((f) => ({ ...f, [name]: value }));
        }
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        const v = validate();
        setErrors(v);
        if (Object.keys(v).length === 0) {
          setShowSuccess(true);
        }
      };
    
      return (
        <div className="min-h-screen flex flex-col bg-[#66A3DF]">
          <Header />
          <div className="flex-1 w-full flex flex-col relative">
            <div className="w-full h-[170px] md:h-[350px] bg-cover bg-center" style={{backgroundImage: "url('/images/img_rectangle_4.png')"}} />
            <div className="flex justify-center py-8 px-2">
              <form
                className="bg-white rounded-2xl shadow-xl px-6 py-8 w-full max-w-xl flex flex-col gap-5"
                onSubmit={handleSubmit}
                noValidate
              >
                <h2 className="text-center text-2xl font-bold text-gray-900 mb-1">
                  BECOME A DAO MEMBER - DONATRUST
                </h2>
                <p className="text-center text-gray-500 text-sm mb-3">
                  Join the DAO community to promote voice and build a more transparent DonaTrust.
                </p>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm text-gray-700">
                    Full name <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="rounded-md border-gray-300 text-sm px-3 py-2 bg-gray-100 cursor-not-allowed"
                    name="name"
                    value={form.name}
                    disabled
                    readOnly
                    autoComplete="name"
                    tabIndex={-1}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm text-gray-700">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    className="rounded-md border-gray-300 text-sm px-3 py-2 bg-gray-100 cursor-not-allowed"
                    name="email"
                    value={form.email}
                    disabled
                    readOnly
                    autoComplete="email"
                    tabIndex={-1}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm text-gray-700">
                    Introduce yourself <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className={`rounded-md border text-sm px-3 py-2 bg-gray-100 focus:outline-none ${errors.introduce ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                    name="introduce"
                    rows={2}
                    value={form.introduce}
                    onChange={handleChange}
                    placeholder="Why do you want to join the DAO? What do you care about most?"
                  />
                  {errors.introduce && <span className="text-red-500 text-xs">{errors.introduce}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm text-gray-700">
                    Areas of interest <span className="text-red-500">*</span>
                  </label>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {AREAS.map((a) => (
                      <label key={a.value} className="flex items-center gap-1 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          name="areas"
                          value={a.value}
                          checked={form.areas.includes(a.value)}
                          onChange={handleChange}
                          className={`${a.color} accent-current w-4 h-4 rounded`}
                        />
                        <span className="flex items-center gap-1">
                          <span className={`inline-block w-2 h-2 rounded-full ${a.color}`}></span>
                          {a.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.areas && <span className="text-red-500 text-xs">{errors.areas}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm text-gray-700">
                    Experience / understanding of charity <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    className={`rounded-md border text-sm px-3 py-2 bg-gray-100 focus:outline-none ${errors.experience ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                    name="experience"
                    rows={2}
                    value={form.experience}
                    onChange={handleChange}
                    placeholder="Could be past contributions, DAO community knowledge"
                  />
                  {errors.experience && <span className="text-red-500 text-xs">{errors.experience}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm text-gray-700">
                    Certificate, activity photos, proof of volunteering <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={`rounded-md border text-sm px-3 py-2 bg-gray-100 focus:outline-none ${errors.certificate ? 'border-red-400 focus:border-red-500' : 'border-gray-300 focus:border-blue-500'}`}
                    name="certificate"
                    value={form.certificate}
                    onChange={handleChange}
                    placeholder=""
                  />
                  {errors.certificate && <span className="text-red-500 text-xs">{errors.certificate}</span>}
                </div>
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    name="agree"
                    checked={form.agree}
                    onChange={handleChange}
                    className="accent-blue-500 mt-1 w-4 h-4"
                  />
                  <span className="text-sm text-gray-700">
                    I am committed to DonaTrust’s principles of transparency, objectivity, and community service.
                  </span>
                </div>
                {errors.agree && <span className="text-red-500 text-xs">{errors.agree}</span>}
                <button
                  type="submit"
                  className="bg-blue-600 text-white rounded-md font-semibold py-2 mt-2 hover:bg-blue-700 transition"
                >
                  Submit Request
                </button>
              </form>
              {showSuccess && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                  <div className="bg-white rounded-lg shadow-xl px-8 py-7 max-w-md w-full border-2 border-gray-300">
                    <div className="text-center text-lg font-medium mb-5">
                      Thank you for registering. DonaTrust administrators will review and respond to you via email and notification center.
                    </div>
                    <div className="flex justify-center">
                      <a
                        href="/"
                        className="px-6 py-2 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 transition text-sm"
                      >
                        Back to home page
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <Footer />
        </div>
      );
    }


export default DaoMemberPage;