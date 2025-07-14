import React, { useState } from "react";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import { Link } from "react-router-dom";

const donors = [
  { name: "Nguyễn Khánh Nam", amount: "50.000đ", time: "21:30:38 - 07/06/2025" },
  { name: "Nhà hảo tâm ẩn danh", amount: "60.000đ", time: "16:08:32 - 06/06/2025" },
  { name: "Trần Lan Anh", amount: "10.000đ", time: "15:42:04 - 06/06/2025" },
  { name: "Đinh Phước Lộc", amount: "20.000đ", time: "23:47:05 - 04/06/2025" },
  { name: "Nguyễn Khánh Nam", amount: "50.000đ", time: "08:58:58 - 04/06/2025" },
  { name: "TRẦN MINH THƯ", amount: "10.000đ", time: "07:54:46 - 03/06/2025" },
  { name: "Lưu Nguyễn Quỳnh Như", amount: "50.000đ", time: "22:17:42 - 01/06/2025" },
  { name: "Lê Trần Khánh Ngọc 2112153110", amount: "50.000đ", time: "23:14:41 - 01/06/2025" },
  { name: "Nguyễn Thị Ngọc Anh", amount: "30.000đ", time: "17:37:55 - 01/06/2025" },
  { name: "Nguyễn Khánh Nam", amount: "50.000đ", time: "10:00:39 - 31/05/2025" },
  // Add 10 more donors for 20 total
  { name: "Phạm Quốc Hùng", amount: "100.000đ", time: "11:25:00 - 29/05/2025" },
  { name: "Nguyễn Văn Tài", amount: "75.000đ", time: "12:00:00 - 27/05/2025" },
  { name: "Lê Thị Hồng", amount: "30.000đ", time: "09:30:20 - 26/05/2025" },
  { name: "Nguyễn Văn Minh", amount: "20.000đ", time: "10:45:15 - 25/05/2025" },
  { name: "Trần Văn Sơn", amount: "50.000đ", time: "16:22:10 - 23/05/2025" },
  { name: "Lê Thị Bích", amount: "60.000đ", time: "18:33:50 - 21/05/2025" },
  { name: "Nguyễn Văn An", amount: "90.000đ", time: "14:12:22 - 20/05/2025" },
  { name: "Lê Hồng Sơn", amount: "70.000đ", time: "20:05:11 - 19/05/2025" },
  { name: "Nguyễn Thị Hoa", amount: "80.000đ", time: "21:41:03 - 17/05/2025" },
  { name: "Đỗ Thị Hạnh", amount: "30.000đ", time: "07:45:23 - 15/05/2025" }
];

const otherCampaigns = [
  {
    img: "/campaign1.jpg",
    category: "Children",
    title: "Đồng Đội Lần Thứ 18",
    desc: "Kỳ nghỉ xanh 2025",
    org: "Quỹ Vì trẻ em khuyết tật Việt Nam",
    achieved: "6,800,000 VND",
    target: "20,000,000 VND"
  },
  {
    img: "/campaign2.jpg",
    category: "Children",
    title: "Supporting students to go to school in 2024",
    desc: "",
    org: "Quỹ Vì trẻ em khuyết tật Việt Nam",
    achieved: "18,500,000 VND",
    target: "30,000,000 VND"
  },
  {
    img: "/campaign3.jpg",
    category: "Children",
    title: "Tiếp sức đến trường 2023",
    desc: "",
    org: "Quỹ Vì trẻ em khuyết tật Việt Nam",
    achieved: "28,000,000 VND",
    target: "30,000,000 VND"
  }
];

const PAGE_SIZE = 10;

const CampaignDetail = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(donors.length / PAGE_SIZE);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pagedDonors = donors.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="min-h-screen flex flex-col bg-global-3">
      <Header />
      <div
        className="w-full h-[349px] bg-cover bg-center relative"
        style={{ backgroundImage: `url('/images/img_.png')` }}
      >
        <div className="absolute top-[316px] right-[40px]">
          <img
            src="/images/img_24_user_interface_image.svg"
            alt="Image Icon"
            className="w-6 h-6 rounded-[5px]"
          />
        </div>
      </div>
      <div className="bg-[#F5F7F9]">
        {/* Banner */}
        {/* Campaign Info Section */}
        <div className="max-w-5xl mx-auto mt-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Campaign Image */}
            <img
              src="/images/img_image_18_273x359.png"
              alt="Supporting students to go to school in 2025"
              className="w-full md:w-72 h-48 object-cover rounded-lg"
            />
            {/* Campaign Details */}
            <div className="flex-1 flex flex-col gap-4 bg-white rounded-lg p-4 shadow border">
              <h2 className="text-lg md:text-xl font-semibold text-blue-700">
                Supporting students to go to school in 2025
              </h2>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>
                  <i className="fa fa-university mr-1 text-blue-500"></i>
                  Quỹ Vì trẻ em khuyết tật Việt Nam
                </span>
              </div>
              <div className="bg-gray-100 rounded p-3 flex flex-wrap gap-6 text-sm">
                <div>
                  <div className="text-xs text-gray-500">Campaign Objective</div>
                  <div className="font-semibold text-gray-900">30,000,000 VND</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">85 donations</div>
                  <div className="text-xs text-green-600">Achieved</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Time remaining</div>
                  <div className="text-xs text-red-600">87 days</div>
                </div>
              </div>
              <div className="flex items-end gap-4 mt-2">
                <div className="text-2xl text-pink-500 font-bold">9.720.000 VND</div>
                <Link to="/donationinfor">
                <button className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded font-semibold">
                  DONATE NOW
                  </button>
                  </Link>
                <button className="bg-blue-100 text-blue-700 px-4 py-2 rounded font-semibold border border-blue-500">
                  SHARE
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mt-8 border-b">
            <Link to="/campaign/1">
            <button className="px-4 py-2 font-medium text-gray-500 hover:text-blue-700">
              Detailed content
            </button>
            </Link>
            <button className="px-4 py-2 font-medium text-blue-700 border-b-2 border-blue-700">
              Donation List
            </button>
          </div>

          {/* Search Donor */}
          <div className="mt-3">
            <input
              type="text"
              className="w-full border px-3 py-2 rounded text-sm"
              placeholder="Enter donor name..."
              // Nếu muốn search, thêm value và onChange
            />
          </div>

          {/* Donor Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-sm border border-gray-200">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-3 text-left font-semibold">Donor</th>
                  <th className="py-2 px-3 text-left font-semibold">Amount</th>
                  <th className="py-2 px-3 text-left font-semibold">Time</th>
                </tr>
              </thead>
              <tbody>
                {pagedDonors.map((d, idx) => (
                  <tr key={idx} className="border-t hover:bg-gray-50">
                    <td className="py-2 px-3">{d.name}</td>
                    <td className="py-2 px-3">{d.amount}</td>
                    <td className="py-2 px-3">{d.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              className="px-3 h-8 rounded border text-gray-500 border-gray-300 bg-white"
              onClick={handlePrevPage}
              disabled={currentPage === 1}
            >
              &lt;
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`w-8 h-8 rounded border font-bold ${
                  currentPage === i + 1
                    ? "text-pink-600 border-pink-500 bg-pink-100"
                    : "text-gray-700 border-gray-300 bg-white"
                }`}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </button>
            ))}
            <button
              className="px-3 h-8 rounded border text-gray-500 border-gray-300 bg-white"
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
            >
              Next &gt;
            </button>
          </div>
        </div>

        {/* Other campaigns */}
        <div className="max-w-5xl mx-auto mt-12 rounded-lg bg-blue-50 pb-12 pt-6">
          <h3 className="text-xl font-bold text-center mb-6">Other campaigns</h3>
          <div className="flex flex-wrap gap-6 justify-center">
            {otherCampaigns.map((c, idx) => (
              <div
                key={idx}
                className="w-72 bg-white rounded-lg shadow border hover:shadow-lg transition p-3 flex flex-col"
              >
                <img
                  src={c.img}
                  alt={c.title}
                  className="h-36 w-full object-cover rounded"
                />
                <span className="text-xs text-blue-500 mt-2">{c.category}</span>
                <div className="font-semibold mt-1">{c.title}</div>
                <div className="text-xs text-gray-500">{c.desc}</div>
                <div className="text-xs mt-2 text-gray-700">
                  <i className="fa fa-university mr-1 text-blue-500"></i>
                  {c.org}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-green-600 font-bold">{c.achieved}</span>
                  <span className="text-gray-500 text-xs">/ {c.target}</span>
                </div>
                <button className="mt-3 bg-pink-500 text-white w-full py-2 rounded font-bold hover:bg-pink-600">
                  View Campaign
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CampaignDetail;