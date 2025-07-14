import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  // Màu sắc theo category
  const categoryColors = {
    'Children': 'bg-global-4', // Xanh nước biển
    'Environment': 'bg-global-4',
    'General': 'bg-global-4'
  };

  // Tính phần trăm tiến độ
  const progressPercentage =
    project.current_amount && project.goal_amount
      ? Math.round((project.current_amount / project.goal_amount) * 100)
      : project.percentage
      ? parseFloat(project.percentage)
      : 0;

  // Format tiền tệ VND
  const formatCurrency = (amount) => {
    if (!amount) return '0';
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

  return (
    <div className="relative w-[240px] h-[360px] bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Ảnh đại diện dự án */}
      <div className="relative w-full h-[150px]">
        <img
          src={project.image_url || project.image || '/images/img_image_18.png'}
          alt={project.title}
          className="w-full h-full object-cover"
          onError={(e) => { e.target.src = '/images/img_image_18.png'; }}
        />

        {/* Badge thể loại */}
        <div
          className={`absolute top-2 right-2 ${categoryColors[project.category] || 'bg-global-4'} px-3 py-1 rounded-full shadow-md`}
        >
          <span className="text-[10px] font-semibold text-white">
            {project.category || 'Khác'}
          </span>
        </div>
      </div>

      {/* Avatar tổ chức */}
      <img
        src={project.charity?.logo_url || project.avatar || '/images/img_ellipse_8.png'}
        alt="Tổ chức"
        className="absolute top-[130px] left-1/2 transform -translate-x-1/2 w-[44px] h-[44px] rounded-full border-2 border-white shadow bg-white object-cover"
        onError={(e) => { e.target.src = '/images/img_ellipse_8.png'; }}
      />

      {/* Nội dung card */}
      <div className="pt-8 px-4 pb-4">
        {/* Tên tổ chức */}
        <h4 className="text-xs font-semibold text-gray-500 text-center mb-1">
          {project.charity?.name || project.organization || 'Tổ chức ẩn danh'}
        </h4>

        {/* Tên dự án */}
        <h3 className="text-[15px] font-bold text-gray-800 text-center mb-2 leading-tight line-clamp-2">
          {project.title}
        </h3>

        {/* Progress */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-gradient-to-r from-pink-500 to-red-500 transition-all duration-500"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>

        {/* Đã góp / phần trăm */}
        <div className="flex justify-between text-[11px] text-gray-600 mb-2">
          <span>Đã góp: {formatCurrency(project.current_amount || project.raised)} VND</span>
          <span>{progressPercentage}%</span>
        </div>

        {/* Mục tiêu */}
        <p className="text-xs text-gray-500 mb-4 text-center">
          Mục tiêu: {formatCurrency(project.goal_amount || project.goal)} VND
        </p>

        {/* Nút chi tiết */}
        <div className="flex justify-center">
          <Link to={`/campaign/${project.campaign_id || project.id}`}>
            <button className="text-sm font-semibold text-blue-600 hover:underline">
              Xem chi tiết →
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
