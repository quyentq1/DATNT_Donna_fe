import React from 'react';
import { FaMapMarkerAlt, FaRegStar } from 'react-icons/fa';

const CampaignDetail = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Banner image */}
      <div className="w-full h-[250px] bg-cover bg-center"  >
        <img src="/images/cham-pending.png" alt="Campaign Banner" className="w-full h-full object-cover" />
      </div>
        
      {/* Main content */}
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md mt-[-60px] relative z-10 rounded-lg">
        {/* Header info */}
        <div className="text-center">
          <p className="text-sm text-gray-500">Charity Fundraising</p>
          <h2 className="text-blue-600 font-semibold text-lg mt-1">Quỹ Vì trẻ em khuyết tật Việt Nam</h2>
          <h1 className="text-2xl font-bold text-blue-700 mt-3">
            Please help Chang Thi Ha cure her serious illness.
          </h1>
        </div>

        {/* Content Section */}
        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Left: Description */}
          <div className="lg:w-2/3">
            <button className="mb-4 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
              Detailed content
            </button>
            <p className="text-sm text-gray-700 leading-relaxed">
              Every child has dreams and desires to study, to integrate and have companionship. But Ha has been deprived
              of that since birth. Ha is suffering from a rare disease that makes it difficult for her to move, talk, and
              live normally. Every day, her family struggles to earn money to cover treatment, medicine, and basic needs.
              <br /><br />
              With the support from the community, Ha is undergoing treatment at the Central Pediatrics Hospital. However,
              the costs have exceeded what the family can handle. This campaign aims to raise 200,000,000 VND to cover
              medical fees, surgery costs, and rehabilitation.
              <br /><br />
              Every vote of yours helps validate the authenticity of this campaign and accelerates the approval process.
            </p>
          </div>

          {/* Right: Voting & Comments */}
          <div className="lg:w-1/3 border border-gray-300 rounded-md p-4 bg-gray-50">
            <p className="text-sm text-gray-600">Time left to vote: <span className="font-semibold text-black">7 days</span></p>
            <p className="text-sm text-gray-600 mt-1">Voting Progress</p>

            <div className="mt-3">
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-green-500 w-[70%]"></div>
              </div>
              <div className="flex justify-between text-sm mt-2">
                <span className="text-green-600 font-semibold">Agree 70%</span>
                <span className="text-red-500 font-semibold">Disagree 30%</span>
              </div>
              <p className="text-xs mt-1 text-gray-500">✓ 7 votes to approve<br />✗ 3 votes to disagree</p>
            </div>

            <div className="mt-5">
              <h4 className="font-semibold mb-2 text-sm">Comments</h4>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="mb-3">
                  <textarea
                    rows={2}
                    placeholder="Comment..."
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm resize-none"
                  ></textarea>
                  <div className="flex mt-1 space-x-1">
                    {[...Array(5)].map((_, j) => (
                      <FaRegStar key={j} className="text-yellow-400" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between mt-4">
              <button className="bg-green-600 hover:bg-green-700 text-white text-sm px-4 py-1 rounded">AGREE</button>
              <button className="bg-red-600 hover:bg-red-700 text-white text-sm px-4 py-1 rounded">DISAGREE</button>
            </div>

            <p className="text-right text-xs mt-2 text-gray-400 cursor-pointer hover:underline">Flag / Report scam</p>
          </div>
        </div>

        {/* User Input */}
        <div className="mt-8 border-t pt-6">
          <p className="text-sm mb-2 font-semibold">What do you know about this fundraising campaign?</p>
          <textarea
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2 text-sm resize-none"
            placeholder="Share your insights, stories, or concerns..."
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default CampaignDetail; 