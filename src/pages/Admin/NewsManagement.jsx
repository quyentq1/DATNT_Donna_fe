import React, { useEffect, useState } from 'react';
import api from '../../services/api';
import Button from '../../components/ui/Button';
import EditText from '../../components/ui/EditText';
import { CheckCircle } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/admin';

const categoryMap = {
  announcement: 'Announcement',
  update: 'Update',
  campaign: 'Campaign',
  charity: 'Charity',
  system: 'System',
};

// Helper to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Hàm format ngày dd/mm/yyyy
function formatDate(dateStr) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleDateString('vi-VN');
}

function NewsManagement() {
  const [news, setNews] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [form, setForm] = useState({
    title: '',
    content: '',
  });

  // Fetch categories
  useEffect(() => {
    api.get(`/admin/news/categories`)
      .then(res => setCategories(res.data)).catch(() => {});
  }, []);

  // Fetch news list
  const fetchNews = () => {
    setLoading(true);
    api.get(`/admin/news`, {
      params: {
        page,
        limit,
        category: selectedCategory || undefined,
        search: search || undefined,
      },
    })
      .then(res => {
        setNews(res.data.news || res.data.rows || res.data.data || []);
        setTotal(res.data.pagination?.total || res.data.count || res.data.total || 0);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load news');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNews();
    // eslint-disable-next-line
  }, [page, limit, selectedCategory, search, showForm]);

  // Handlers
  const handleEdit = (item) => {
    setEditingNews(item);
    setForm({
      title: item.title,
      content: item.content,
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this news?')) return;
    await api.delete(`/admin/news/${id}`);
    setShowForm(false);
    setEditingNews(null);
    fetchNews(); // load lại danh sách ngay
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    let payload;
    if (editingNews) {
      // Khi edit, giữ nguyên các trường cũ (nếu cần)
      payload = {
        ...editingNews,
        title: form.title,
        content: form.content,
      };
      await api.put(`/admin/news/${editingNews.news_id}`, payload);
    } else {
      // Khi tạo mới, chỉ gửi 4 trường, category và priority cứng
      payload = {
        title: form.title,
        content: form.content,
        category: 'announcement',
        priority: 'medium',
      };
      await api.post(`/admin/news`, payload);
    }
    setShowForm(false);
    setEditingNews(null);
    setPage(1);
  };

  // API xuất bản bài viết
  const handlePublish = async (id) => {
    try {
      await api.put(`/admin/news/${id}/publish`);
      setShowForm(false);
      setEditingNews(null);
      fetchNews(); // reload lại data ngay lập tức
    } catch (err) {
      alert('Xuất bản thất bại!');
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-800">Quản lý tin tức</h1>
        <Button
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition"
          onClick={() => { setShowForm(true); setEditingNews(null); setForm({ title: '', content: '' }); }}
        >
          + Thêm tin tức
        </Button>
      </div>

      <div className="mb-6 flex gap-3">
        <input
          className="border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200 w-64"
          placeholder="Tìm kiếm tiêu đề..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-10">Đang tải dữ liệu...</div>
      ) : error ? (
        <div className="text-red-500 text-center py-10">{error}</div>
      ) : (
        <div className="rounded-2xl shadow-lg overflow-hidden border border-gray-100 bg-white">
          <table className="w-full text-left font-sans">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-gray-200">
                <th className="py-3 px-4 font-bold text-gray-700 text-base tracking-wide">Tiêu đề</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-base tracking-wide">Chuyên mục</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-base text-center tracking-wide">Hành động</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-base text-center tracking-wide">Trạng thái</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-base tracking-wide">Ngày tạo</th>
                <th className="py-3 px-4 font-bold text-gray-700 text-base tracking-wide">Lượt xem</th>
              </tr>
            </thead>
            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-gray-400 py-12 text-lg bg-blue-50">Chưa có tin tức nào.</td>
                </tr>
              ) : news.map((item, idx) => (
                <tr
                  key={item.news_id}
                  className={
                    `border-b border-gray-100 transition-all duration-150 ` +
                    (idx % 2 === 0 ? 'bg-white' : 'bg-blue-50') +
                    ' hover:shadow-lg hover:z-10 hover:scale-[1.01] hover:bg-green-50/60'
                  }
                >
                  <td className="py-3 px-4 font-medium text-gray-900 max-w-xs truncate">{item.title}</td>
                  <td className="py-3 px-4 text-gray-700">{categoryMap[item.category] || item.category}</td>
                  <td className="py-3 px-4 text-center">
                    {item.status === 'published' ? (
                      <span className="text-green-600 font-semibold">Đã xuất bản</span>
                    ) : (
                      <span className="text-gray-400">Chưa xuất bản</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-gray-700">{formatDate(item.created_at)}</td>
                  <td className="py-3 px-4 text-gray-700">{item.views}</td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex flex-row items-center justify-center gap-[10px]">
                      <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-white rounded px-3 py-1 shadow-sm" onClick={() => handleEdit(item)}>Sửa</Button>
                      <Button size="sm" variant="danger" className="bg-red-500 hover:bg-red-600 text-white rounded px-3 py-1 shadow-sm" onClick={() => handleDelete(item.news_id)}>Xóa</Button>
                      {item.status !== 'published' && (
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700 text-white rounded px-3 py-1 shadow-sm flex items-center gap-1"
                          onClick={async () => { await handlePublish(item.news_id); }}
                          title="Xuất bản bài viết"
                        >
                          <CheckCircle size={16} className="inline-block" />
                          Xuất bản
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="flex gap-2 justify-center mt-6">
        <Button disabled={page === 1} onClick={() => setPage(page - 1)} className="rounded px-4 py-1 bg-gray-200 hover:bg-gray-300">Trước</Button>
        <span className="px-3 py-1 text-gray-700">Trang {page}</span>
        <Button disabled={news.length < limit} onClick={() => setPage(page + 1)} className="rounded px-4 py-1 bg-gray-200 hover:bg-gray-300">Sau</Button>
      </div>

      {/* Form modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <form className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100" onSubmit={handleFormSubmit}>
            <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">{editingNews ? 'Sửa tin tức' : 'Thêm tin tức'}</h2>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">Tiêu đề</label>
              <input className="border border-gray-300 px-3 py-2 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-200" name="title" value={form.title} onChange={handleFormChange} required minLength={5} maxLength={200} />
            </div>
            <div className="mb-4">
              <label className="block mb-1 text-gray-700 font-medium">Nội dung</label>
              <textarea className="border border-gray-300 px-3 py-2 rounded-lg w-full min-h-[120px] focus:outline-none focus:ring-2 focus:ring-blue-200" name="content" value={form.content} onChange={handleFormChange} required />
            </div>
            <div className="flex gap-3 mt-6 justify-center">
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-2 shadow">Lưu</Button>
              <Button type="button" variant="secondary" className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg px-6 py-2" onClick={() => setShowForm(false)}>Hủy</Button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default NewsManagement; 