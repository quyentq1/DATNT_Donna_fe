import React, { useEffect, useState } from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CharityPendingPage = () => {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    api.get('/admin/campaigns/pending')
      .then(res => setCampaigns(res.data))
      .catch(() => setError('Failed to load pending campaigns'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero */}
      <div
        className="w-full h-[250px] bg-cover bg-center flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('images/cham-pending.png')"
        }}
      >
        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-pink-500">
          Charity fundraising campaign
        </h1>
        <p className="text-white text-sm mt-2">
          List of fundraising campaigns pending approval
        </p>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-center">Pending Campaigns</h2>

        {loading && <div className="text-center text-gray-500 py-10">Loading...</div>}
        {error && <div className="text-center text-red-500 py-10">{error}</div>}

        <div className="space-y-6">
          {!loading && !error && campaigns.length === 0 && (
            <div className="text-center text-gray-400 py-10">No pending campaigns.</div>
          )}
          {campaigns.map((c) => (
            <div
              key={c.campaign_id}
              className="bg-white rounded-md shadow-md flex flex-col md:flex-row overflow-hidden"
            >
              <img
                src={c.image_url || '/images/pending-demo.png'}
                alt="Campaign"
                className="w-full md:w-1/3 object-cover"
              />
              <div className="p-4 md:w-2/3">
                <h3
                  className="text-blue-600 font-semibold text-md hover:underline cursor-pointer"
                  onClick={() => navigate(`/charity-pending/${c.campaign_id}`)}
                >
                  {c.title}
                </h3>
                <div className="text-sm text-gray-700 mt-2">
                  <p className="mb-1">Charity: <span className="font-semibold">{c.charity?.name}</span></p>
                  <p className="mb-1">By: <span className="font-semibold">{c.charity?.user?.full_name}</span> ({c.charity?.user?.email})</p>
                  <p className="mb-1">Category: <span className="font-semibold">{c.category}</span></p>
                  <p className="mb-1">Goal: <span className="font-semibold">{Number(c.goal_amount).toLocaleString()} VND</span></p>
                  <p className="mb-1">Status: <span className="font-semibold capitalize">{c.status}</span></p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <FaMapMarkerAlt className="mr-1 text-gray-500" />
                    {c.location || 'N/A'}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Start</p>
                    <p className="font-bold text-md">{c.start_date}</p>
                    <button
                      className="mt-2 px-4 py-1 border text-sm border-gray-400 rounded hover:bg-gray-100"
                      onClick={() => navigate(`/charity-pending/${c.campaign_id}`)}
                    >
                      VIEW DETAILS
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { default as CampaignDetail } from './Detail';
export default CharityPendingPage; 