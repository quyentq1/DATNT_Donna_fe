import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import Button from '../../components/ui/Button';
import RatingBar from '../../components/ui/RatingBar';

const CampaignDetail = () => {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('detailed');
  const [reviewText, setReviewText] = useState('');

  const handleDonate = () => {
    alert('Thank you for your interest in donating! Redirecting to payment...');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Supporting students to go to school in 2025',
        text: 'Help support students with disabilities to access education',
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Campaign link copied to clipboard!');
    }
  };

  const handleWriteReview = () => {
    if (reviewText.trim()) {
      alert('Thank you for your review!');
      setReviewText('');
    } else {
      alert('Please write a review before submitting.');
    }
  };

  const handleFacebookShare = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-global-3 shadow-2xl">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <div 
        className="w-full h-[265px] relative bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: `url('/images/img_rectangle_4.png')` }}
      >
        <div className="text-center">
          <h1 className="text-[32px] font-bold leading-[39px] text-center mb-4">
            <span className="text-global-10">Charity</span>
            <span className="text-global-8"> </span>
            <span className="text-global-7">fundraising</span>
            <span className="text-global-8"> </span>
            <span className="text-global-5">campaign</span>
          </h1>
          <p className="text-xl font-bold leading-6 text-center text-global-8">
            Campaign Detail
          </p>
        </div>
      </div>

      {/* Main Content */}
<div className="w-full max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8">
        {/* Campaign Info Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Left Column - Campaign Image and Details */}
          <div className="flex-1">
            <div className="relative mb-6">
              <img 
                src="/images/img_image_18_273x359.png" 
                alt="Campaign" 
                className="w-full h-[273px] object-cover rounded-lg"
              />
              <div className="absolute top-4 right-4 bg-global-7 text-global-8 px-3 py-1 rounded text-sm font-semibold">
                Children
              </div>
            </div>
          </div>

          {/* Right Column - Campaign Details */}
          <div className="flex-1">
            <div className="bg-global-2 rounded-sm p-6 shadow-sm">
              <h2 className="text-2xl font-semibold text-global-3 mb-4">
                Supporting students to go to school in 2025
              </h2>
              
              {/* Organization Info */}
              <div className="flex items-center mb-4">
                <img 
                  src="/images/img_ellipse_8_39x39.png" 
                  alt="Organization" 
                  className="w-[39px] h-[39px] rounded-full mr-3"
                />
                <span className="text-base font-semibold text-global-6">
                  Quỹ Vì trẻ em khuyết tật Việt Nam
                </span>
              </div>

              {/* Campaign Objective */}
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-semibold text-global-6">Campaign Objective</span>
                <span className="text-xs font-semibold text-global-6">30,000,000 VND</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-[22px] mb-4">
                <img 
                  src="/images/img_rectangle_1.png" 
                  alt="Progress" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Donation Stats */}
              <div className="flex justify-between items-center mb-6">
                <div>
                  <div className="flex items-center mb-2">
                    <img 
                      src="/images/img_icon_green_50.svg" 
                      alt="Donations" 
                      className="w-[21px] h-[18px] mr-2"
                    />
                    <span className="text-xs font-semibold text-global-6">85 donations</span>
                  </div>
                  <span className="text-sm font-semibold text-global-6">Achieved</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-semibold text-global-21">9.720.000 VND</span>
                </div>
              </div>

              {/* Time Remaining and Action Buttons */}
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <img 
                    src="/images/img__28x20.png" 
                    alt="Time" 
                    className="w-[20px] h-[28px] mr-3"
                  />
                  <div>
                    <p className="text-xs font-semibold text-global-6">Time remaining</p>
                    <p className="text-sm font-semibold text-global-6">87 days</p>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button 
                    onClick={handleDonate}
                    variant="secondary"
                    className="h-9 px-6 bg-global-7 text-global-8 rounded-sm"
                  >
                    DONATE NOW
                  </Button>
                  <Button 
                    onClick={handleShare}
                    variant="primary"
                    className="h-9 px-6 bg-global-12 text-global-8 rounded-sm"
                  >
                    SHARE
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex mb-6">
          <Button
            onClick={() => setActiveTab('detailed')}
            variant={activeTab === 'detailed' ? 'tabActive' : 'tab'}
            className="h-9 px-8 rounded-none rounded-tl-[18px] border-b-0"
          >
            Detailed content
          </Button>
          <Button
            onClick={() => setActiveTab('donations')}
            variant={activeTab === 'donations' ? 'tabActive' : 'tab'}
            className="h-9 px-8 rounded-none rounded-tr-[18px] border-l border-global-8 text-global-11"
          >
            Donation List
          </Button>
        </div>

        {/* Tab Content */}
        <div className="border-t border-global-8 pt-6">
          {activeTab === 'detailed' && (
            <div className="flex gap-8">
              {/* Main Content */}
              <div className="flex-1">
                <div className="text-xs font-medium leading-4 text-global-18 mb-6">
                  <p className="mb-4">
                    Bất cứ trẻ em nào cũng có những ước mơ, khao khát được học tập, được hòa nhập và có những 
                    người bạn đồng hành trên hành trình trưởng thành. Nhưng không phải em nào cũng có cơ hội ấy, 
                    đặc biệt là trẻ khuyết tật. Nếu không được đến trường, các em không chỉ mất đi cơ hội tiếp cận 
                    tri thức, mà còn đánh mất cả những cơ hội quý giá để kết bạn, để cảm nhận sự kết nối với thế giới 
                    xung quanh. Sự cô đơn, sự e dè và những rào cản vô hình có thể giữ các em lại trong thế giới của 
                    riêng mình, trong khi chỉ cần một cơ hội, một cánh cửa mở ra, tương lai và cuộc đời các em có thể thay đổi.
                  </p>
                  <p className="mb-4">
                    Trong năm 2025, Quỹ tiếp tục phối hợp Đoàn TNCS Bộ Ngoại giao triển khai chương trình ý nghĩa này 
                    với mục tiêu trao tặng 1.200 học bổng, mỗi học bổng trị giá 4.000.000 VND. Chúng tôi kêu gọi gây quỹ 
                    200 triệu đồng trên nền tảng DonaTrust, tương đương 50 suất học bổng, và sẽ mở rộng kêu gọi trên các 
                    nền tảng khác nhằm lan tỏa hỗ trợ tới nhiều trẻ em khuyết tật hơn.
                  </p>
                  <p className="mb-4">
                    Chương trình "Tiếp sức tới trường" của Quỹ Vì trẻ em khuyết tật không chỉ mang đến sự hỗ trợ về vật chất 
                    và các điều kiện học tập cho trẻ khuyết tật, mà chính là trao cho các em cơ hội – cơ hội được học tập, 
                    được kết bạn, được hòa nhập và phát triển bình đẳng. Giáo dục không chỉ là con chữ, mà còn là cầu nối 
                    của những ước mơ và xây dựng giá trị của mỗi cá nhân.
                  </p>
                  <p className="mb-4">
                    Quỹ dự kiến sẽ trao tặng học bổng vào tháng 8 năm 2025 ngay trước thềm khai giảng năm học mới, với hy vọng 
                    những phần quà này sẽ giúp các em thêm vững tin trên con đường chinh phục tri thức và ước mơ. Mỗi hành động 
                    tiếp sức của quý vị là sẽ có thêm nhiều trẻ em khuyết tật được mở cánh cửa đến với một thế giới đầy tình 
                    yêu thương và cơ hội.
                  </p>
                  <p>Trân trọng và biết ơn sự đóng góp của Quý vị.</p>
                </div>

                {/* Important Note */}
                <div className="bg-global-15 p-4 rounded">
                  <p className="text-xs font-medium leading-4 text-global-18">
                    *Toàn bộ số tiền quyên góp từ cộng đồng sẽ tự động chuyển thẳng tới Quỹ vì trẻ em khuyết tật Việt Nam 
                    (không qua DonaTrust) để triển khai dự án Tiếp sức đến trường 2025. Thông tin cập nhật về chương trình 
                    sẽ được cập nhật tại mục Báo cáo của dự án này.
                  </p>
                </div>
              </div>

              {/* Sidebar - Charity Information */}
              <div className="w-[281px]">
                <div className="bg-global-2 rounded-sm p-4 shadow-sm">
                  <h3 className="text-xs font-semibold text-global-6 mb-4">
                    Charity Fundraising Information
                  </h3>
                  
                  {/* Organization Profile */}
                  <div className="flex items-center mb-6">
                    <img 
                      src="/images/img_ellipse_8_36x36.png" 
                      alt="Organization" 
                      className="w-9 h-9 rounded-full mr-3"
                    />
                    <span className="text-[15px] font-semibold leading-[17px] text-global-20">
                      Quỹ Vì trẻ em khuyết tật Việt Nam
                    </span>
                  </div>

                  {/* Organization Description */}
                  <div className="relative mb-6">
                    <p className="text-xs font-medium leading-4 text-global-18 mb-4">
                      "Quỹ Vì trẻ em khuyết tật Việt Nam là một tổ chức phi lợi nhuận, hoạt động trong lĩnh vực từ thiện, 
                      nhân đạo. Quỹ ra đời với mục đích làm cầu nối giữa các tổ chức, nhà hảo tâm với những trẻ em không may 
                      bị khuyết tật, di chứng chất độc da cam, nhằm chăm sóc, bảo vệ, giúp đỡ cuộc sống của các em, tạo điều 
                      kiện cho các em phát triển tối đa tiềm năng bản thân để có thể hòa nhập với cộng đồng."
                    </p>
                    
                    {/* Location */}
                    <div className="flex items-start mb-4">
                      <img 
                        src="/images/img_24_user_interface_location.svg" 
                        alt="Location" 
                        className="w-6 h-6 mr-2 mt-1"
                      />
                      <div>
                        <p className="text-xs font-medium leading-4 text-global-16">
                          Số 25 Vũ Trọng Phụng, phường Thanh Xuân Trung, quận Thanh Xuân, Hà Nội
                        </p>
                        <p className="text-xs font-medium leading-[14px] text-global-16 mt-2">
                          0865019639
                        </p>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="flex items-center">
                      <img 
                        src="/images/img_24_user_interface_send.svg" 
                        alt="Email" 
                        className="w-6 h-6 mr-2"
                      />
                      <div className="flex items-center">
                        <img 
                          src="/images/img_mail.svg" 
                          alt="Mail" 
                          className="w-4 h-4 mr-2"
                        />
                        <span className="text-xs font-medium leading-[14px] text-global-16">
                          quyvitreemkhuyettat@gmail.com
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'donations' && (
            <div className="text-center py-8">
              <p className="text-global-6">Donation list will be displayed here.</p>
            </div>
          )}
        </div>

        {/* Share Campaign */}
        <div className="mt-8 mb-6">
          <h3 className="text-sm font-semibold text-global-19 mb-4">Share the campaign</h3>
          <button onClick={handleFacebookShare}>
            <img 
              src="/images/img_rectangle_158.png" 
              alt="Share on Facebook" 
              className="w-[70px] h-[26px]"
            />
          </button>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-global-19 mb-2">Review & Feedback</h3>
            <p className="text-sm font-semibold text-global-15 mb-4">User rating</p>
            
            {/* Rating Display */}
            <div className="flex items-center space-x-4 mb-6">
              <RatingBar rating={4} maxRating={5} size="medium" />
              <span className="text-sm font-semibold text-global-15">4.2 out of 5</span>
            </div>
          </div>

          {/* Sample Review */}
          <div className="bg-global-9 border border-global-9 rounded-md p-6 mb-6 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="/images/img_avatar.png" 
                  alt="User Avatar" 
                  className="w-6 h-6 rounded-full mr-3"
                />
                <span className="text-sm font-medium text-global-11">KaiB</span>
                <div className="w-1 h-1 bg-global-11 rounded-full mx-2"></div>
                <span className="text-sm font-normal text-global-11">22 Jul</span>
                <div className="ml-4 bg-global-14 text-global-11 px-3 py-1 rounded text-sm">
                  Donated
                </div>
              </div>
              <RatingBar rating={5} maxRating={5} size="small" />
            </div>
          </div>

          {/* Write Review Button */}
          <div className="flex justify-end">
            <Button
              onClick={handleWriteReview}
              variant="outline"
              className="h-8 px-6 border border-button-2 text-button-2 rounded-md"
            >
              Write a review
            </Button>
          </div>
        </div>

        {/* Other Campaigns Section */}
        <div className="mt-12 bg-global-13 py-8">
          <h2 className="text-2xl font-bold text-center text-global-1 mb-8">Other campaigns</h2>
          
          <div className="flex justify-center space-x-8">
            {/* Campaign 1 */}
            <div className="w-[137px]">
              <div className="relative mb-4">
                <img 
                  src="/images/img_image_18_4.png" 
                  alt="Campaign 1" 
                  className="w-full h-[104px] object-cover rounded-sm"
                />
                <div className="absolute top-1 right-1 bg-global-7 text-global-8 px-1 py-0.5 rounded text-xs font-semibold">
                  Children
                </div>
              </div>
              <div className="bg-global-2 rounded-sm p-2 shadow-sm">
                <p className="text-xs font-semibold text-center underline text-global-6 mb-1">
                  Quỹ Từ tâm Đắk Lắk
                </p>
                <p className="text-sm font-semibold text-center text-global-3 mb-2">
                  Oh, who saves my face?
                </p>
                <img 
                  src="/images/img_rectangle_1.png" 
                  alt="Progress" 
                  className="w-full h-3 mb-1"
                />
                <div className="flex justify-between text-xs font-semibold text-global-6 mb-1">
                  <span>9.720.000</span>
                  <span>32.4%</span>
                </div>
                <p className="text-xs font-semibold text-global-6 mb-2">
                  with the goal of 30,000,000 VND
                </p>
                <div className="flex items-center justify-center">
                  <span className="text-xs font-semibold text-global-5 mr-1">Detail</span>
                  <img 
                    src="/images/img_24_arrows_directions_right.svg" 
                    alt="Arrow" 
                    className="w-2 h-2"
                  />
                </div>
              </div>
              <img 
                src="/images/img_ellipse_8_2.png" 
                alt="Organization" 
                className="w-5 h-5 rounded-full mx-auto mt-2"
              />
            </div>

            {/* Campaign 2 */}
            <div className="w-[137px]">
              <div className="relative mb-4">
                <img 
                  src="/images/img_image_18_3.png" 
                  alt="Campaign 2" 
                  className="w-full h-[104px] object-cover rounded-sm"
                />
                <div className="absolute top-1 right-1 bg-global-7 text-global-8 px-1 py-0.5 rounded text-xs font-semibold">
                  Environment
                </div>
              </div>
              <div className="bg-global-2 rounded-sm p-2 shadow-sm">
                <p className="text-xs font-semibold text-center underline text-global-6 mb-1">
                  Trung tâm Con người và Thiên nhiên
                </p>
                <p className="text-sm font-semibold text-center text-global-3 mb-2">
                  Green Forest Up 2025
                </p>
                <img 
                  src="/images/img_rectangle_1.png" 
                  alt="Progress" 
                  className="w-full h-3 mb-1"
                />
                <div className="flex justify-between text-xs font-semibold text-global-6 mb-1">
                  <span>9.720.000</span>
                  <span>32.4%</span>
                </div>
                <p className="text-xs font-semibold text-global-6 mb-2">
                  with the goal of 30,000,000 VND
                </p>
                <div className="flex items-center justify-center">
                  <span className="text-xs font-semibold text-global-5 mr-1">Detail</span>
                  <img 
                    src="/images/img_24_arrows_directions_right.svg" 
                    alt="Arrow" 
                    className="w-2 h-2"
                  />
                </div>
              </div>
              <img 
                src="/images/img_ellipse_8_1.png" 
                alt="Organization" 
                className="w-5 h-5 rounded-full mx-auto mt-2"
              />
            </div>

            {/* Campaign 3 */}
            <div className="w-[137px]">
              <div className="relative mb-4">
                <img 
                  src="/images/img_image_18_5.png" 
                  alt="Campaign 3" 
                  className="w-full h-[104px] object-cover rounded-sm"
                />
                <div className="absolute top-1 right-1 bg-global-7 text-global-8 px-1 py-0.5 rounded text-xs font-semibold">
                  Children
                </div>
              </div>
              <div className="bg-global-2 rounded-sm p-2 shadow-sm">
                <p className="text-xs font-semibold text-center text-global-6 mb-1">
                  Quỹ Vì trẻ em khuyết tật Việt Nam
                </p>
                <p className="text-sm font-semibold text-center text-global-3 mb-2">
                  Please help Chang Thi Ha cure her serious illness.
                </p>
                <img 
                  src="/images/img_rectangle_1.png" 
                  alt="Progress" 
                  className="w-full h-3 mb-1"
                />
                <div className="flex justify-between text-xs font-semibold text-global-6 mb-1">
                  <span>9.720.000</span>
                  <span>32.4%</span>
                </div>
                <p className="text-xs font-semibold text-global-6 mb-2">
                  with the goal of 30,000,000 VND
                </p>
                <div className="flex items-center justify-center">
                  <span className="text-xs font-semibold text-global-5 mr-1">Detail</span>
                  <img 
                    src="/images/img_24_arrows_directions_right.svg" 
                    alt="Arrow" 
                    className="w-2 h-2"
                  />
                </div>
              </div>
              <img 
                src="/images/img_ellipse_8_3.png" 
                alt="Organization" 
                className="w-5 h-5 rounded-full mx-auto mt-2"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default CampaignDetail;