import React, { useState } from "react";
import { FaBell, FaSlidersH } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import clsx from "clsx";
import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';

const notificationsData = [
  { id: 1, title: "You have been approved as a charity organization!", desc: "You can now create your first campaign.", time: "2 hours ago", read: false, type: "system" },
  { id: 2, title: "You donated to the campaign ‘Hearts for Kids’ successfully.", desc: "", time: "5 days ago", read: false, type: "fundraising" },
  { id: 3, title: "You donated to the campaign ‘Hearts for Kids’ successfully.", desc: "", time: "1 week ago", read: false, type: "fundraising" },
  { id: 4, title: "Welcome to DonaTrust!", desc: "Remember to update your information.", time: "2 weeks ago", read: true, type: "system" },
  { id: 5, title: "Your campaign 'Hope For Tomorrow' has been approved!", desc: "", time: "3 weeks ago", read: false, type: "system" },
  { id: 6, title: "New supporter joined your campaign.", desc: "", time: "1 month ago", read: true, type: "system" },
  { id: 7, title: "You received a new donation.", desc: "", time: "1 month ago", read: false, type: "fundraising" },
  { id: 8, title: "Monthly report is available.", desc: "", time: "2 months ago", read: true, type: "system" },
  { id: 9, title: "Fundraising goal reached!", desc: "", time: "2 months ago", read: false, type: "fundraising" },
  { id: 10, title: "Settings updated successfully.", desc: "", time: "3 months ago", read: true, type: "system" }
];

const tabs = [
  { key: "all", label: "All" },
  { key: "unread", label: "Unread" },
  { key: "fundraising", label: "Fundraising" }
];

const PAGE_SIZE = 5;

const NotificationPage = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [search, setSearch] = useState("");
  const [settings, setSettings] = useState({
    system: true,
    email: false,
    campaigns: true
  });
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredNotifications = notificationsData.filter(n => {
    if (selectedTab === "unread" && n.read) return false;
    if (selectedTab === "fundraising" && n.type !== "fundraising") return false;
    if (search && !n.title.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const visibleNotifications = filteredNotifications.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE);
  };

  const handleCollapse = () => {
    setVisibleCount(PAGE_SIZE);
    // Scroll lên đầu danh sách nếu muốn UX tốt hơn
    const listSection = document.getElementById("notification-list-section");
    if (listSection) listSection.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Hiển thị nút Load more nếu còn ẩn, Collapse nếu đã hiện hết và có nhiều hơn PAGE_SIZE cái
  const showLoadMore = visibleCount < filteredNotifications.length;
  const showCollapse = visibleCount >= filteredNotifications.length && filteredNotifications.length > PAGE_SIZE;

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <div className="bg-gray-50 min-h-screen flex justify-center py-10">
        <section className="bg-white rounded-2xl shadow-xl max-w-3xl w-full px-6 py-8 flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
            <h2 className="text-2xl font-bold text-gray-900 flex-1">Notification Center</h2>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 border border-gray-200 w-full sm:w-56">
                <FiSearch className="text-gray-400 mr-2" size={18} />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={search}
                  onChange={e => {
                    setSearch(e.target.value);
                    setVisibleCount(PAGE_SIZE);
                  }}
                  className="bg-transparent border-none outline-none w-full text-sm"
                />
              </div>
              <div className="flex items-center gap-2 text-gray-500 font-medium cursor-pointer whitespace-nowrap">
                <FaSlidersH size={18} />
                <span className="hidden sm:inline">Notification Settings</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3">
            {tabs.map(tab => (
              <button
                key={tab.key}
                className={clsx(
                  "px-5 py-2 rounded-full text-sm font-medium transition focus:outline-none",
                  selectedTab === tab.key
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                )}
                onClick={() => {
                  setSelectedTab(tab.key);
                  setVisibleCount(PAGE_SIZE);
                }}
                type="button"
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div id="notification-list-section" className="flex-1 flex flex-col gap-4">
              {visibleNotifications.length === 0 && (
                <div className="text-gray-400 text-center py-8 text-base">
                  No notifications found.
                </div>
              )}
              {visibleNotifications.map(n => (
                <div
                  key={n.id}
                  className={clsx(
                    "flex bg-gray-50 rounded-xl px-4 py-4 gap-4 items-start shadow-sm border transition",
                    !n.read
                      ? "border-gray-900 bg-white shadow-lg"
                      : "border-transparent"
                  )}
                >
                  <div className="text-red-400 mt-1">
                    <FaBell size={22} />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-gray-900 text-base">{n.title}</span>
                      {!n.read && (
                        <button
                          className="text-blue-600 text-sm font-medium ml-3 hover:underline focus:outline-none"
                          type="button"
                        >
                          Mark read
                        </button>
                      )}
                    </div>
                    {n.desc && (
                      <div className="text-gray-500 text-sm">{n.desc}</div>
                    )}
                    <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                      <span>{n.time}</span>
                      <span className={clsx(n.read ? "text-blue-500" : "text-red-400 font-medium")}>
                        {n.read ? "Read" : "Unread"}
                      </span>
                    </div>
                  </div>
                  {!n.read && (
                    <div className="self-center text-gray-300 font-bold text-lg ml-2">{">"}</div>
                  )}
                </div>
              ))}
            </div>
            <div className="min-w-[240px] md:w-[260px] bg-gray-100 rounded-xl p-5 shadow-sm flex flex-col gap-4 border border-gray-200">
              <div className="font-medium text-gray-800 mb-1">Notification Settings</div>
              <div className="flex flex-col gap-3 text-sm">
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={settings.system}
                    onChange={e => setSettings({ ...settings, system: e.target.checked })}
                    className="accent-gray-900 w-4 h-4"
                  />
                  Receive system notifications
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={settings.email}
                    onChange={e => setSettings({ ...settings, email: e.target.checked })}
                    className="accent-gray-900 w-4 h-4"
                  />
                  Receive email updates
                </label>
                <label className="flex items-center gap-2 cursor-pointer font-medium">
                  <input
                    type="checkbox"
                    checked={settings.campaigns}
                    onChange={e => setSettings({ ...settings, campaigns: e.target.checked })}
                    className="accent-gray-900 w-4 h-4"
                  />
                  Receive notifications for campaigns followed
                </label>
              </div>
            </div>
          </div>
          {(showLoadMore || showCollapse) && (
            <div className="flex justify-center mt-2">
              {showLoadMore && (
                <button
                  className="bg-gray-900 text-white text-sm px-8 py-2 rounded-full font-semibold shadow hover:bg-gray-800 transition focus:outline-none"
                  type="button"
                  onClick={handleLoadMore}
                >
                  Load more
                </button>
              )}
              {showCollapse && (
                <button
                  className="bg-gray-300 text-gray-900 text-sm px-8 py-2 rounded-full font-semibold shadow hover:bg-gray-400 transition focus:outline-none"
                  type="button"
                  onClick={handleCollapse}
                >
                  Collapse
                </button>
              )}
            </div>
          )}
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default NotificationPage;