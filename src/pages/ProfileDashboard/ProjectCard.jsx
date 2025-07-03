import React from 'react';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project, index }) => {
  const categoryColors = {
    'Children': 'bg-global-4',
    'Environment': 'bg-global-4'
  };

  return (
    <div className="relative w-[240px] h-[340px] bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Ảnh đại diện dự án */}
      <div className="relative w-full h-[160px]">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover"
        />

        {/* Badge thể loại */}
        <div
          className={`absolute top-2 right-2 ${categoryColors[project.category] || 'bg-global-4'} px-3 py-1 rounded-full`}
        >
          <span className="text-[10px] font-semibold text-white">
            {project.category}
          </span>
        </div>
      </div>

      {/* Nội dung card */}
      <div className="p-4">
        {/* Tên tổ chức */}
        <h4 className="text-sm font-semibold text-gray-600 text-center mb-2">
          {project.organization}
        </h4>

        {/* Tên dự án */}
        <h3 className="text-base font-bold text-gray-800 text-center mb-2">
          {project.title}
        </h3>

        {/* Progress */}
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
          <div
            className="h-full bg-green-500"
            style={{ width: project.percentage }}
          />
        </div>

        {/* Raised / Percent */}
        <div className="flex justify-between text-xs text-gray-600 mb-2">
          <span>{project.raised} VND</span>
          <span>{project.percentage}</span>
        </div>

        {/* Goal */}
        <p className="text-xs text-gray-500 mb-3 text-center">
          with the goal of {project.goal}
        </p>

        {/* Nút Detail */}
        <div className="text-center">
          <Link to={`/campaign/${project.id}`}>
            <span className="text-sm font-semibold text-blue-600 hover:underline">
              Detail →
            </span>
          </Link>
        </div>
      </div>

      {/* Avatar tổ chức */}
      <img
        src={project.avatar}
        alt={`${project.organization} Avatar`}
        className="absolute top-[140px] left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full border-2 border-white"
      />
    </div>
  );
};

export default ProjectCard;
