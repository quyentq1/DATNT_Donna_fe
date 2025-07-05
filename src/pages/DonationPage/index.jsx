import React, { useState } from "react";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const donationAmounts = [50000, 100000, 200000, 500000];

const DonationPage = () => {
  const [amount, setAmount] = useState("");
  const [blessing, setBlessing] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("datnguyentien1009@gmail.com");
  const [anonymous, setAnonymous] = useState(false);

  const campaign = {
    image: "/images/img_image_18_273x359.png",
    title: "Supporting students to go to school in 2025",
    org: "Quỹ Vì trẻ em khuyết tật Việt Nam",
    category: "Children",
    objective: 30000000,
    achieved: 9720000,
    daysLeft: 87
  };
  const percent = ((campaign.achieved / campaign.objective) * 100).toFixed(1);

  const handleAmountInput = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setAmount(value);
  };

  const handleAmountButton = (val) => {
    setAmount(val.toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your donation!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      <section
        className="w-full h-[220px] bg-cover bg-center flex flex-col items-center justify-center"
        style={{ backgroundImage: `url('/images/img_.png')` }}
      >
        <div className="text-3xl md:text-4xl font-bold text-cyan-400 drop-shadow">
          Charity fundraising campaign
        </div>
        <div className="text-2xl text-white font-medium mt-1 drop-shadow">Donation</div>
      </section>

      <main className="max-w-5xl mx-auto flex flex-col md:flex-row gap-8 my-10 px-4">
        <div className="flex-1 relative">
          <div className="relative flex items-start">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-[160px] h-[120px] object-cover rounded-lg shadow-lg border-4 border-white"
            />
            <span className="absolute left-2 top-2 z-20 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
              {campaign.category}
            </span>
          </div>
          <div className="bg-white rounded-lg shadow px-6 py-5 pt-6 mt-4 min-h-[275px]">
            <div className="text-xs text-gray-700 mb-2">You are donating to the campaign</div>
            <div className="text-blue-700 font-medium text-sm mb-0.5">{campaign.org}</div>
            <h2 className="font-bold text-lg text-gray-900 mb-4 leading-tight">{campaign.title}</h2>
            <div className="bg-gray-100 rounded-lg px-4 py-3 mt-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-sm">Campaign Objective</span>
                <span className="font-semibold text-gray-900 text-sm">{campaign.objective.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-sm">Achieved</span>
                <span className="font-semibold text-pink-600 text-base">{campaign.achieved.toLocaleString()} VND</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-sm">Achieved</span>
                <span className="text-gray-800 text-sm">{percent}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Time remaining</span>
                <span className="font-semibold text-red-500 text-sm">{campaign.daysLeft} days</span>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[400px] bg-[#e8f6fa] rounded-xl shadow-lg p-7 border">
          <form onSubmit={handleSubmit} autoComplete="off">
            <h3 className="text-xl font-bold mb-5 text-gray-700 uppercase text-center">Donation Information</h3>
            <label className="block text-sm text-gray-600 mb-1 font-medium">
              Enter donation amount<span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-1 mb-3">
              <input
                type="text"
                value={amount}
                onChange={handleAmountInput}
                className="flex-1 border rounded px-3 py-2 text-right font-bold text-lg bg-white"
                placeholder="0"
                min="0"
                required
              />
              <span className="ml-2 text-lg font-semibold text-blue-500">VND</span>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {donationAmounts.map((v) => (
                <button
                  type="button"
                  key={v}
                  onClick={() => handleAmountButton(v)}
                  className={`px-4 py-1.5 rounded-lg font-semibold border transition min-w-[90px] ${
                    amount === v.toString()
                      ? "bg-blue-500 text-white border-blue-500"
                      : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
                  }`}
                  style={{ flex: "1 0 42%" }}
                >
                  {v.toLocaleString()}
                </button>
              ))}
            </div>
            <label className="block text-sm text-gray-600 mb-1 font-medium">
              Enter blessing
            </label>
            <input
              type="text"
              value={blessing}
              onChange={(e) => setBlessing(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 bg-white"
              placeholder="Enter your love wishes..."
            />
            <div className="font-bold mb-2 mt-3 text-gray-700 uppercase text-sm">Your information</div>
            <label className="block text-sm text-gray-600 mb-1 font-medium">
              Full name
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3 bg-white"
              placeholder="Enter fullname"
              required={!anonymous}
            />
            <label className="block text-sm text-gray-600 mb-1 font-medium">
              Number phone
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3 bg-white"
              placeholder="Enter number phone"
              required={!anonymous}
            />
            <label className="block text-sm text-gray-600 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3 bg-white"
              placeholder="Enter email"
              required
            />
            <div className="flex items-center mb-4 mt-2">
              <input
                id="anonymous"
                type="checkbox"
                checked={anonymous}
                onChange={() => setAnonymous(!anonymous)}
                className="mr-2"
              />
              <label htmlFor="anonymous" className="text-sm text-gray-600 cursor-pointer">
                I want to donate anonymously
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-lg transition uppercase"
            >
              DONATE
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DonationPage;