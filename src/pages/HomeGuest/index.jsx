import React, { useState } from 'react';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Slider from '../../components/ui/Slider';
import PagerIndicator from '../../components/ui/PagerIndicator';
import Button from '../../components/ui/Button';
import { useAuth } from '../../contexts/AuthContext';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCampaignSlide, setCampaignSlide] = useState(0);
  const { user, isAuthenticated, logout } = useAuth();

  const categories = [
    { icon: '/images/img_logo_24x27.png', label: 'THIÊN TAI' },
    { icon: '/images/img_logo_1.png', label: 'GIÁO DỤC' },
    { icon: '/images/img_logo_27x27.png', label: 'TRẺ EM' },
    { icon: '/images/img_logo_2.png', label: 'NGƯỜI NGHÈO' },
    { icon: '/images/img_logo_3.png', label: 'NGƯỜI CAO TUỔI' },
    { icon: '/images/img_logo_4.png', label: 'NGƯỜI KHUYẾT TẬT' },
    { icon: '/images/img_logo_5.png', label: 'BỆNH HIỂM NGHÈO' },
    { icon: '/images/img_logo_6.png', label: 'VÙNG NÚI' },
    { icon: '/images/img_logo_7.png', label: 'MÔI TRƯỜNG' }
  ];

  const campaigns = [
    {
      id: 1,
      image: '/images/img_image_18.png',
      category: 'TRẺ EM',
      title: 'TIẾP SỨC ĐẾN TRƯỜNG 2025',
      organization: 'Quỹ Vì trẻ em khuyết tật Việt Nam',
      raised: '9.720.000',
      percentage: '32.4%',
      goal: '30,000,000 VND',
      avatar: '/images/img_ellipse_8.png'
    },
    {
      id: 2,
      image: '/images/img_image_18.png',
      category: 'TRẺ EM',
      title: 'MỘT NGÀN CÁNH DIỀU CHO HY VỌNG',
      organization: 'Quỹ Tuổi trẻ Việt Nam',
      raised: '9.720.000',
      percentage: '32.4%',
      goal: '30,000,000 VND',
      avatar: '/images/img_ellipse_8.png'
    },
    {
      id: 3,
      image: '/images/img_image_18.png',
      category: 'MÔI TRƯỜNG',
      title: 'RỪNG XANH LÊN 2025',
      organization: 'Hội môi trường Việt Nam',
      raised: '9.720.000',
      percentage: '32.4%',
      goal: '30,000,000 VND',
      avatar: '/images/img_ellipse_8.png'
    },
    {
      id: 4,
      image: '/images/img_image_18.png',
      category: 'TRẺ EM',
      title: 'GIÚP ĐỠ GIA ĐÌNH EM VÀNG THỊ SANH',
      organization: 'Quỹ Vì trẻ em Việt Nam',
      raised: '9.720.000',
      percentage: '32.4%',
      goal: '30,000,000 VND',
      avatar: '/images/img_ellipse_8.png'
    },
    {
      id: 5,
      image: '/images/img_image_18.png',
      category: 'TRẺ EM',
      title: 'CHIẾN DỊCH GÂY QUỸ 5',
      organization: 'Quỹ Vì trẻ em khuyết tật Việt Nam',
      raised: '9.720.000',
      percentage: '32.4%',
      goal: '30,000,000 VND',
      avatar: '/images/img_ellipse_8.png'
    }
  ];

  const organizations = [
    {
      id: 1,
      name: 'Quỹ Từ thiện Nâng bước\ntuổi thơ',
      amount: '53,482,393 VND',
      image: '/images/img_image_18_160x160.png'
    },
    {
      id: 2,
      name: 'Quỹ vì Trẻ em khuyết tật\nViệt Nam',
      amount: '53,482,393 VND',
      image: '/images/img_image_18_1.png'
    },
    {
      id: 3,
      name: 'Trung tâm Con người và Thiên nhiên',
      amount: '53,482,393 VND',
      image: '/images/img_image_18_2.png'
    }
  ];

  const handleSlideChange = (index) => {
    setCurrentSlide(index);
  };

  const handleCampaignSlideChange = (direction) => {
    if (direction === 'next' && currentCampaignSlide < campaigns.length - 3) {
      setCampaignSlide(currentCampaignSlide + 1);
    } else if (direction === 'prev' && currentCampaignSlide > 0) {
      setCampaignSlide(currentCampaignSlide - 1);
    }
  };

  const handleExploreClick = () => {
    console.log('Explore campaign clicked');
  };

  const handleLearnMoreClick = () => {
    console.log('Learn more about DonaTrust clicked');
  };

  const handleViewAllClick = () => {
    console.log('View all campaigns clicked');
  };

  const handleViewAllOrganizationsClick = () => {
    console.log('View all organizations clicked');
  };

  const handleCampaignDetailClick = (campaignId) => {
    console.log(`Campaign ${campaignId} detail clicked`);
  };

  const handleOrganizationInfoClick = (orgId) => {
    console.log(`Organization ${orgId} info clicked`);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-global-3">
      <Header user={user} isAuthenticated={isAuthenticated} logout={logout} />
      
      {/* Hero Section with Slider */}
      <div className="relative w-full h-[670px]">
        <Slider 
        slides={[
          {
          title:"CHUNG TAY XÂY DỰNG CỘNG ĐỒNG TỐT ĐẸP HƠN!",
          subtitle:"Khám phá và hỗ trợ các dự án từ thiện đáng tin cậy.",
          buttonText:"KHÁM PHÁ CHIẾN DỊCH",
          backgroundImage:"/images/bacground_homepage.jpg",
          },
          {
          title:"CHUNG TAY XÂY DỰNG CỘNG ĐỒNG TỐT ĐẸP HƠN!",
          subtitle:"Khám phá và hỗ trợ các dự án từ thiện đáng tin cậy.",
          buttonText:"KHÁM PHÁ CHIẾN DỊCH",
          backgroundImage:"/images/img_.png"
          }
        ]}
          onButtonClick={handleExploreClick}
        />
        
        {/* Pager Indicator */}
        <div className="absolute bottom-[17px] left-1/2 transform -translate-x-1/2">
          <PagerIndicator 
            totalPages={3}
            currentPage={currentSlide}
            onPageChange={handleSlideChange}
          />
        </div>
      </div>

      {/* Categories Section */}
      <div className="flex flex-row justify-center items-center w-full h-[60px] mt-[35px] px-[134px]">
        <div className="flex flex-row space-x-[33px]">
          {categories.map((category, index) => (
            <div key={index} className="flex flex-col items-center cursor-pointer hover:opacity-80">
              <img 
                src={category.icon} 
                alt={category.label}
                className="w-[30px] h-[30px] mb-[2px]"
              />
              <span className="text-[9px] font-roboto font-medium text-global-1 text-center leading-[11px] max-w-[74px]">
                {category.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Campaigns Section */}
      <div className="flex flex-col items-center w-full mt-[40px]">
        <h2 className="text-[24px] font-roboto font-bold text-global-1 text-center leading-[32px]">
          CHIẾN DỊCH GÂY QUỸ NỔI BẬT
        </h2>
        
        {/* Campaign Slider */}
        <div className="flex flex-row items-center w-full mt-[52px] px-[15%]">
          {/* Previous Button */}
          <button 
            onClick={() => handleCampaignSlideChange('prev')}
            className="mr-[24px] hover:opacity-80"
            disabled={currentCampaignSlide === 0}
          >
            <img 
              src="/images/img_vector_140.svg" 
              alt="Previous"
              className="w-3 h-[28px]"
            />
          </button>
          
          {/* Campaign Cards */}
          <div className="flex flex-row space-x-[60px] overflow-hidden">
            {campaigns.slice(currentCampaignSlide, currentCampaignSlide + 3).map((campaign, index) => (
              <div key={campaign.id} className="flex flex-col w-[280px]">
                {/* Campaign Image with Category Tag */}
                <div className="relative w-[280px] h-[220px] mb-[0px]">
                  <img 
                    src={campaign.image}
                    alt={campaign.title}
                    className="w-full h-full object-cover rounded-sm"
                  />
                  <div className="absolute top-[6px] right-[7px] bg-global-4 px-2 py-1 rounded-sm">
                    <span className="text-[11px] font-inter font-semibold text-global-8 leading-[5px]">
                      {campaign.category}
                    </span>
                  </div>
                  <img 
                    src={campaign.avatar}
                    alt="Organization Avatar"
                    className="absolute bottom-[-14px] left-1/2 transform -translate-x-1/2 w-[60px] h-[60px] rounded-full mb-0"
                  />
                </div>
                
                {/* Campaign Details Card */}
                <div className="bg-global-2 rounded-sm shadow-[5px_5px_5px_#abbed166] p-7 w-[280px] h-[200px]">
                  <p className="text-[12px] font-inter font-semibold text-global-6 text-center leading-[5px] mb-5">
                    {campaign.organization}
                  </p>
                  <h3 className="text-[13px] font-inter font-semibold text-global-3 text-center leading-[18px] mb-3">
                    {campaign.title}
                  </h3>
                  
                  {/* Progress Bar */}
                  <img 
                    src="/images/img_rectangle_1.png"
                    alt="Progress Bar"
                    className="w-[220px] h-[20px] mb-1"
                  />
                  
                  {/* Amount and Percentage */}
                  <div className="flex flex-row justify-between items-center mb-1">
                    <span className="text-[13px] font-inter font-semibold text-global-6 leading-[5px] mb-3">
                      {campaign.raised}
                    </span>
                    <span className="text-[13px] font-inter font-semibold text-global-6 leading-[5px] mb-3">
                      {campaign.percentage}
                    </span>
                  </div>
                  
                  <p className="text-[12px] font-inter font-semibold text-global-6 leading-[5px] mb-4">
                    Mục tiêu chiến dịch {campaign.goal}
                  </p>
                  
                  {/* Detail Button */}
                  <button 
                    onClick={() => handleCampaignDetailClick(campaign.id)}
                    className="flex flex-row items-center hover:opacity-80"
                  >
                    <span className="text-[14px] font-inter font-semibold text-global-5 leading-[9px]">
                      CHI TIẾT
                    </span>
                    <img 
                      src="/images/img_24_arrows_directions_right.svg"
                      alt="Arrow Right"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          {/* Next Button */}
          <button 
            onClick={() => handleCampaignSlideChange('next')}
            className="ml-[25px] hover:opacity-80"
            disabled={currentCampaignSlide >= campaigns.length - 3}
          >
            <img 
              src="/images/img_vector_140.svg" 
              alt="Next"
              className="w-3 h-[40px] transform rotate-180"
            />
          </button>
        </div>
        
        {/* View All Button */}
        <div className="mt-[22px]">
          <Button variant="tertiary" size="md" onClick={handleViewAllClick}>
            Xem tất cả →
          </Button>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="w-full h-[219px] bg-global-2 mt-[37px] px-[15%]">
        <div className="flex flex-row w-full h-full">
          {/* Left Content */}
          <div className="flex flex-col ml-[100px] mt-[67px] w-[284px] h-[83px]">
            <h2 className="text-[25px] font-inter font-semibold text-global-4 leading-[30px]">
              Những con số tự nói lên tất cả.
            </h2>
            <p className="text-[13px] font-inter text-global-2 leading-[14px] mt-[16px]">
              Thống kê nhanh về DonaTrust
            </p>
          </div>
          
          {/* Statistics Grid */}
          <div className="flex flex-col ml-[138px] mt-[44px] w-[379px] h-[130px]">
            {/* First Row */}
            <div className="flex flex-row w-full h-[43px] mb-[28px]">
              <div className="flex flex-row items-center">
                <img 
                  src="/images/img_icon.svg"
                  alt="Supporters Icon"
                  className="w-[33px] h-[33px] mr-[11px]"
                />
                <div className="flex flex-col">
                  <span className="text-[19px] font-inter font-bold text-global-4 leading-6">
                    1,500+
                  </span>
                  <span className="text-[11px] font-inter text-global-6 leading-[14px]">
                    Người ủng hộ
                  </span>
                </div>
              </div>
              
              <div className="flex flex-row items-center ml-[120px]">
                <img 
                  src="/images/img_icon_teal_300.svg"
                  alt="Charity Icon"
                  className="w-[33px] h-[33px] mr-[12px]"
                />
                <div className="flex flex-col">
                  <span className="text-[19px] font-inter font-bold text-global-4 leading-6">
                    200+
                  </span>
                  <span className="text-[11px] font-inter text-global-6 leading-[14px]">
                    Tổ chức gây quỹ
                  </span>
                </div>
              </div>
            </div>
            
            {/* Second Row */}
            <div className="flex flex-row w-full h-[60px]">
              <div className="flex flex-row items-center">
                <img 
                  src="/images/img_icon_teal_300_33x33.svg"
                  alt="Campaign Icon"
                  className="w-[33px] h-[33px] mr-[11px]"
                />
                <div className="flex flex-col">
                  <span className="text-[19px] font-inter font-bold text-global-4 leading-6">
                    328+
                  </span>
                  <span className="text-[11px] font-inter text-global-6 leading-[14px]">
                    Chiến dịch gây quỹ
                  </span>
                </div>
              </div>
              
              <div className="flex flex-row items-center ml-[98px]">
                <img 
                  src="/images/img_icon_33x33.svg"
                  alt="Donation Icon"
                  className="w-[33px] h-[33px] mr-[12px]"
                />
                <div className="flex flex-col">
                  <span className="text-[19px] font-inter font-bold text-global-4 leading-6">
                    132,920,000
                  </span>
                  <span className="text-[11px] font-inter text-global-6 leading-4">
                    Tổng tiền ủng hộ (VND)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About DonaTrust Section */}
      <div className="flex flex-row w-full mt-[34px] px-[15%]">
        <img 
          src="/images/img_frame_6.png"
          alt="DonaTrust Illustration"
          className="w-[350px] h-[215px]"
        />
        
        <div className="flex flex-col ml-[19px] mt-[29px] w-[433px] h-[156px]">
          <h2 className="text-[25px] font-inter font-semibold text-global-4 leading-[31px]">
            DonaTrust là gì?
          </h2>
          <p className="text-xs font-inter text-global-6 leading-[13px] mt-[11px]">
            DonaTrust là hệ thống quản lý các khoản đóng góp từ thiện, là nền tảng trung gian kết nối các tổ chức từ thiện và nhà tài trợ. Mục tiêu chính của hệ thống là tạo ra một môi trường minh bạch, thuận tiện và hiệu quả để kêu gọi và quản lý các hoạt động từ thiện.
          </p>
          <div className="mt-[21px]">
            <Button variant="tertiary" size="lg" onClick={handleLearnMoreClick}>
              Tìm hiểu thêm
            </Button>
          </div>
        </div>
      </div>

      {/* Outstanding Organizations Section */}
      <div className="flex flex-col items-center w-full mt-[34px]">
        <h2 className="text-[25px] font-inter font-semibold text-global-4 leading-[31px] text-center">
          CÁ NHÂN/ TỔ CHỨC GÂY QUỸ NỔI BẬT
        </h2>
        
        <div className="flex flex-row space-x-[29px] mt-[51px] px-[92px]">
          {organizations.map((org, index) => (
            <div key={org.id} className="relative w-[256px] h-[318px]">
              
              {/* Organization Card */}
              <div className="absolute bottom-0 w-full h-[249px] bg-global-1 rounded-[3px]">
                <div className="bg-global-2 rounded-[5px] shadow-[0px_5px_11px_#abbed166] mx-[17px] mt-[97px] p-3 h-[144px]">
                  <h3 className="text-[15px] font-inter font-semibold text-global-3 text-center leading-[19px] mb-[8px]">
                    {org.name}
                  </h3>
                  <p className="text-[13px] font-inter font-semibold text-global-6 text-center leading-[14px] mb-[4px]">
                    Số tiền gây quỹ
                  </p>
                  <p className="text-[14px] font-inter font-semibold text-global-7 text-center leading-[17px] mb-[10px]">
                    {org.amount}
                  </p>
                  
                  {/* Information Button */}
                  <button 
                    onClick={() => handleOrganizationInfoClick(org.id)}
                    className="flex flex-row items-center justify-center w-full hover:opacity-80"
                  >
                    <span className="text-[15px] font-inter font-semibold text-global-5 leading-[17px] mr-2">
                      Thông tin
                    </span>
                    <img 
                      src="/images/img_24_arrows_directions_right.svg"
                      alt="Arrow Right"
                      className="w-4 h-4"
                    />
                  </button>
                </div>
              </div>
              {/* Organization Image */}
              <img 
                src={org.image}
                alt={org.name}
                className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[160px] h-[160px] rounded-[80px]"
              />
            </div>
          ))}
        </div>
        
        {/* View All Organizations Button */}
        <div className="mt-[19px] mb-5">
          <Button variant="tertiary" size="md" onClick={handleViewAllOrganizationsClick}>
            Xem tất cả →
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;