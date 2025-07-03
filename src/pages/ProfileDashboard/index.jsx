import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import ProjectCard from './ProjectCard';

const Profile = () => {
  const supportedProjects = [
    {
      id: 1,
      title: 'Supporting students to go to school in 2025',
      organization: 'Quỹ Vì trẻ em khuyết tật Việt Nam',
      category: 'Children',
      image: '/images/img_image_18.png',
      avatar: '/images/img_ellipse_8_20x21.png',
      raised: '9.720.000',
      percentage: '32.4%',
      goal: '30,000,000 VND'
    },
    {
      id: 2,
      title: 'Supporting students to go to school in 2025',
      organization: 'Quỹ Vì trẻ em khuyết tật Việt Nam',
      category: 'Children',
      image: '/images/img_image_18_104x137.png',
      avatar: '/images/img_ellipse_8_20x21.png',
      raised: '9.720.000',
      percentage: '32.4%',
      goal: '30,000,000 VND'
    },
    {
      id: 3,
      title: 'Green Forest Up 2025',
      organization: 'Trung tâm Con người và Thiên nhiên',
      category: 'Environment',
      image: '/images/img_image_18_3.png',
      avatar: '/images/img_ellipse_8_1.png',
      raised: '9.720.000',
      percentage: '32.4%',
      goal: '30,000,000 VND'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />

      {/* Cover Image */}
      <div className="w-full">
        <img
          src="/images/img__1.png"
          alt="Cover"
          className="w-full h-[300px] object-cover"
        />
      </div>

      {/* Profile Info Section */}
      <div className="w-full bg-white px-10 -mt-12">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          {/* Avatar + Info */}
          <div className="flex items-center gap-6">
            <img
              src="/images/img_ellipse_43.png"
              alt="Avatar"
              className="w-[95px] h-[95px] rounded-full border-4 border-white"
            />
            <div>
              <h1 className="text-xl font-bold text-black">Dat Nguyen Tien</h1>
              <p className="text-sm text-gray-600">@datnguyentien09</p>
              <div className="flex space-x-4 mt-1 text-sm text-gray-600">
                <span>0 followers</span>
                <span>0 article</span>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="flex items-center space-x-2">
<Link to="/profile/edit">
  <Button className="bg-blue-500 text-white text-sm px-4 py-1 rounded">
    Edit information
  </Button>
</Link>

            <img
              src="/images/img_24_user_interface_image.svg"
              alt="Share"
              className="w-6 h-6 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="w-full flex justify-center mt-12 mb-6">
        <div className="flex justify-between w-[600px] text-center border-t border-b py-4">
          <div>
            <p className="text-gray-600 text-sm">Project</p>
            <p className="text-pink-600 text-lg font-bold">3</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Organization</p>
            <p className="text-pink-600 text-lg font-bold">0</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Amount of donation</p>
            <p className="text-pink-600 text-lg font-bold">950,000 VND</p>
          </div>
        </div>
      </div>

      {/* Supported Projects */}
 <div className="text-center mb-20 px-6">
  {/* Tiêu đề lớn hơn */}
  <h2 className="text-[32px] font-bold text-black mb-14">
    The project has supported
  </h2>

  {/* Danh sách các project */}
  <div className="flex justify-center gap-10 flex-wrap mb-16">
    {supportedProjects.map((project, index) => (
      <ProjectCard key={project.id} project={project} index={index} />
    ))}
  </div>

  {/* Nút Explore to hơn */}
  <div className="flex justify-center">
    <Link to="/campaigns">
      <Button className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-8 py-3 rounded-[8px] shadow-md">
        Explore fundraising campaigns
      </Button>
    </Link>
  </div>
</div>

<Footer />

    </div>
  );
};

export default Profile;
