import React, { useState } from "react";
import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";

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
    title: "Chung tay đưa học sinh đến trường năm 2025",
    org: "Quỹ Vì trẻ em khuyết tật Việt Nam",
    category: "Trẻ em",
    objective: 30000000,
    achieved: 9720000,
    daysLeft: 87,
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
    alert("Cảm ơn bạn đã quyên góp!");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans">
      <Header />

      <section
        className="w-full h-[300px] bg-cover bg-center flex flex-col items-center justify-center text-center"
        style={{ backgroundImage: `url('/images/img_.png')` }}
      >
        <h1 className="text-4xl font-bold text-cyan-400 drop-shadow">
          GÂY QUỸ TỪ THIỆN
        </h1>
        <p className="text-xl text-white mt-2 drop-shadow">Ủng hộ chiến dịch</p>
      </section>

      <main className="w-full px-[15%] flex flex-col md:flex-row gap-8 my-10">
        {/* Thông tin chiến dịch */}
        <div className="flex-1 relative">
          <div className="relative flex items-start">
            <img
              src={campaign.image}
              alt={campaign.title}
              className="w-[275px] h-[140px] object-cover rounded-lg shadow-lg border-4 border-white"
            />
            <span className="absolute left-2 top-2 z-20 bg-pink-500 text-white text-xs font-bold px-3 py-1 rounded-md shadow">
              {campaign.category}
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-md border mt-4 px-6 py-5 min-h-[275px]">
            <p className="text-sm text-gray-600 mb-1">
              Bạn đang quyên góp cho chiến dịch:
            </p>
            <p className="text-blue-700 font-semibold text-sm mb-0.5">
              {campaign.org}
            </p>
            <h2 className="font-bold text-lg text-gray-900 mb-4 leading-tight">
              {campaign.title}
            </h2>
            <div className="bg-gray-100 rounded-lg px-4 py-3">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-sm">Mục tiêu</span>
                <span className="font-semibold text-gray-900 text-sm">
                  {campaign.objective.toLocaleString()} VND
                </span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-sm">Đã đạt được</span>
                <span className="font-semibold text-pink-600 text-base">
                  {campaign.achieved.toLocaleString()} VND
                </span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600 text-sm">Tiến độ</span>
                <span className="text-gray-800 text-sm">{percent}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600 text-sm">Còn lại</span>
                <span className="font-semibold text-red-500 text-sm">
                  {campaign.daysLeft} ngày
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Form quyên góp */}
        <div className="flex-1 bg-[#e8f6fa] rounded-xl shadow-lg border p-7">
          <form onSubmit={handleSubmit} autoComplete="off">
            <h3 className="text-xl font-bold mb-5 text-gray-700 text-center uppercase">
              Thông tin quyên góp
            </h3>

            <label className="block text-sm text-gray-700 mb-1 font-medium">
              Số tiền quyên góp<span className="text-red-500">*</span>
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

            <label className="block text-sm text-gray-700 mb-1 font-medium">
              Lời chúc (tùy chọn)
            </label>
            <input
              type="text"
              value={blessing}
              onChange={(e) => setBlessing(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-4 bg-white"
              placeholder="Nhập lời chúc yêu thương..."
            />

            <div className="font-bold mb-2 mt-3 text-gray-700 uppercase text-sm">
              Thông tin người quyên góp
            </div>

            <label className="block text-sm text-gray-700 mb-1 font-medium">
              Họ và tên
            </label>
            <input
              type="text"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3 bg-white"
              placeholder="Nhập họ tên"
              required={!anonymous}
            />

            <label className="block text-sm text-gray-700 mb-1 font-medium">
              Số điện thoại
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3 bg-white"
              placeholder="Nhập số điện thoại"
              required={!anonymous}
            />

            <label className="block text-sm text-gray-700 mb-1 font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border rounded px-3 py-2 mb-3 bg-white"
              placeholder="Nhập email"
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
                Tôi muốn ẩn danh khi quyên góp
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2.5 rounded-xl text-lg transition uppercase"
            >
              Quyên góp
            </button>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default DonationPage;
