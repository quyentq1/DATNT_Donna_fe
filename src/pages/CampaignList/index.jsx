import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import campaignService from '../../services/campaignService';

const CampaignListPage = () => {
  const [searchParams] = useSearchParams();
  const [activeFilter, setActiveFilter] = useState('active');
  const [campaigns, setCampaigns] = useState([]);
  const [visibleCampaigns, setVisibleCampaigns] = useState(8);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCampaigns, setTotalCampaigns] = useState(0);

  // Fetch campaigns on component mount and when filters change
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const searchQuery = searchParams.get('search');
        const filters = {
          search: searchQuery || undefined,
          status: activeFilter === 'completed' ? 'completed' : 'active',
          limit: 50, // Get more campaigns for pagination
        };

        const response = await campaignService.getAllCampaigns(filters);
        console.log('Campaign response:', response);

        setCampaigns(response.campaigns || []);
        setTotalCampaigns(response.total || 0);
        setVisibleCampaigns(8); // Reset visible campaigns when filters change
      } catch (error) {
        console.error('Error fetching campaigns:', error);
        setError('Failed to load campaigns. Please try again later.');
        setCampaigns([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, [searchParams, activeFilter]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
    setVisibleCampaigns(8);
  };

  const handleSeeMore = () => {
    setVisibleCampaigns((prev) => prev + 8);
  };

  const CampaignCard = ({ campaign }) => (
    <div className="relative w-[270px] bg-white rounded shadow-md flex flex-col h-[420px]">
      {/* Campaign Image */}
      <div className="relative h-[160px]">
        <img
          src={campaign.image_url || '/images/img_image_18.png'}
          alt={campaign.title}
          className="w-full h-full object-cover rounded-t"
          onError={(e) => {
            e.target.src = '/images/img_image_18.png'; // Fallback image
          }}
        />
        {/* Category Badge */}
        <div className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded">
          {campaign.category || 'General'}
        </div>
      </div>

      {/* Profile Image */}
      <img
        src={campaign.charity?.logo_url || '/images/img_ellipse_8_20x21.png'}
        alt="Organization"
        className="w-[32px] h-[32px] rounded-full absolute -top-4 left-4 border-2 border-white"
        onError={(e) => {
          e.target.src = '/images/img_ellipse_8_20x21.png'; // Fallback avatar
        }}
      />

      {/* Campaign Info */}
      <div className="flex flex-col flex-1 px-4 py-3">
        <div>
          <p className="text-xs text-gray-500 text-center mb-1">
            {campaign.charity?.name || 'Unknown Organization'}
          </p>
          <h3 className="text-sm font-bold text-center mb-2 line-clamp-2">{campaign.title}</h3>

          {/* Progress Bar */}
          <div className="w-full h-2 bg-gray-200 rounded mb-1">
            <div
              className="h-full bg-pink-500 rounded"
              style={{
                width: `${Math.min((parseFloat(campaign.current_amount) / parseFloat(campaign.goal_amount)) * 100, 100)}%`,
              }}
            />
          </div>

          {/* Funding Info */}
          <div className="flex justify-between text-xs mb-1">
            <span>
              {new Intl.NumberFormat('vi-VN').format(parseFloat(campaign.current_amount))}{' '}
              VND
            </span>
            <span>
              {Math.round((parseFloat(campaign.current_amount) / parseFloat(campaign.goal_amount)) * 100)}%
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-4">
            Goal: {new Intl.NumberFormat('vi-VN').format(parseFloat(campaign.goal_amount))}{' '}
            VND
          </p>
        </div>

        {/* Detail Button */}
        <div className="mt-auto text-center">
          <Link to={`/campaign/${campaign.campaign_id}`}>
            <button className="bg-pink-500 hover:bg-pink-600 text-white text-xs font-semibold px-4 py-2 rounded">
              Detail
            </button>
          </Link>
        </div>
      </div>
    </div>
  );

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-global-3 shadow-2xl">
        <div className="flex-1 flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-global-3 shadow-2xl">
      {/* Hero Section */}
      <div
        className="w-full h-[265px] relative bg-cover bg-center"
        style={{ backgroundImage: `url('/images/img_rectangle_4.png')` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-[32px] font-bold font-inter leading-[39px] text-center mb-2">
              <span className="text-global-10">Charity</span>
              <span className="text-global-8"> </span>
              <span className="text-global-7">fundraising</span>
              <span className="text-global-8"> </span>
              <span className="text-global-5">campaign</span>
            </h1>
            <p className="text-xl font-bold font-inter text-global-8 mb-8">List</p>

            {/* Pending Campaigns Button */}
            <div className="bg-global-12 rounded-[5px] px-4 py-2">
              <p className="text-xs font-bold font-inter text-global-8 text-center">
                List of pending
                <br />
                fundraising campaigns
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex justify-center mt-20 mb-8">
        <div className="flex">
          <Button
            variant={activeFilter === 'active' ? 'pinkOutline' : 'white'}
            className="w-[274px] h-[41px] rounded-l-[10px] rounded-r-none border-r-0"
            onClick={() => handleFilterChange('active')}
          >
            The campaign is raising funds.
          </Button>
          <Button
            variant={activeFilter === 'completed' ? 'pinkOutline' : 'white'}
            className="w-[274px] h-[41px] rounded-r-[10px] rounded-l-none"
            onClick={() => handleFilterChange('completed')}
          >
            Campaign has ended
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-[26px] font-bold font-inter text-global-1 mb-2">
            {activeFilter === 'active'
              ? 'Campaigns currently raising funds'
              : 'Campaigns that have ended'}
          </h2>
          <p className="text-[15px] font-inter text-global-17">
            Choose to fight in the field that interests you most.
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 max-w-md mx-auto">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
        )}

        {/* Campaign Grid */}
        {campaigns.length > 0 ? (
          <>
            <div className="grid grid-cols-4 gap-x-[53px] gap-y-8 justify-items-center mb-12">
              {campaigns.slice(0, visibleCampaigns).map((campaign) => (
                <CampaignCard key={campaign.campaign_id} campaign={campaign} />
              ))}
            </div>

            {/* See More Button */}
            {visibleCampaigns < campaigns.length && (
              <div className="flex justify-center mb-12">
                <Button
                  variant="secondary"
                  className="w-[95px] h-[36px] rounded-sm"
                  onClick={handleSeeMore}
                >
                  See more
                </Button>
              </div>
            )}

            {/* Results Summary */}
            <div className="text-center mb-8">
              <p className="text-sm text-global-17">
                Showing {Math.min(visibleCampaigns, campaigns.length)} of {campaigns.length}{' '}
                campaigns
              </p>
            </div>
          </>
        ) : (
          // Empty state
          <div className="text-center py-16">
            <div className="mb-6">
              <img
                src="/images/img_image_18.png"
                alt="No campaigns"
                className="w-32 h-32 mx-auto opacity-50 grayscale"
              />
            </div>
            <h3 className="text-xl font-semibold text-global-1 mb-2">No campaigns found</h3>
            <p className="text-global-17 mb-6">
              {searchParams.get('search')
                ? `No campaigns match your search for "${searchParams.get('search')}"`
                : `No ${activeFilter} campaigns are available at the moment.`}
            </p>
            <div className="space-x-4">
              {searchParams.get('search') && (
                <Button
                  variant="secondary"
                  onClick={() => {
                    window.location.href = '/campaigns';
                  }}
                >
                  Clear Search
                </Button>
              )}
              <Button
                variant="primary"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default CampaignListPage;
