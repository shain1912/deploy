import React, { useState, useEffect } from "react";
import { useGallery } from "./GalleryContext";
import WebsiteDetailModal from "./WebsiteDetailModal";
import GalleryFilterBar from "./GalleryFilterBar";

function GalleryGrid() {
  const { websites, removeWebsite } = useGallery();
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState({ keyword: "", creator: "", tech: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  // 로딩/에러 시뮬레이션 (실제 API라면 fetch 등으로 대체)
  useEffect(() => {
    setLoading(true);
    setError("");
    const timer = setTimeout(() => {
      // setError("데이터를 불러오지 못했습니다."); // 에러 테스트 시 주석 해제
      setLoading(false);
    }, 700);
    return () => clearTimeout(timer);
  }, [websites]);

  // 필터링 로직
  const filtered = websites.filter(site => {
    const keywordMatch =
      !filter.keyword ||
      site.title.toLowerCase().includes(filter.keyword.toLowerCase()) ||
      site.description.toLowerCase().includes(filter.keyword.toLowerCase());
    const creatorMatch =
      !filter.creator ||
      (site.creator || "").toLowerCase().includes(filter.creator.toLowerCase());
    const techMatch =
      !filter.tech ||
      site.techStack.some(tech => tech.toLowerCase().includes(filter.tech.toLowerCase()));
    return keywordMatch && creatorMatch && techMatch;
  });

  const handleDelete = async (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setDeletingId(id);
      await removeWebsite(id);
      setDeletingId(null);
    }
  };

  if (loading) {
    return <div className="text-center text-blue-400 py-10 animate-pulse">작품 목록을 불러오는 중...</div>;
  }
  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <>
      <GalleryFilterBar filter={filter} setFilter={setFilter} />
      {filtered.length === 0 ? (
        <div className="text-center text-gray-400">조건에 맞는 작품이 없습니다.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filtered.map((site) => (
            <div
              key={site.id}
              className="relative bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden cursor-pointer group"
              onClick={() => setSelected(site)}
            >
              {/* 삭제 버튼 */}
              <button
                className="absolute top-2 right-2 z-10 text-gray-300 hover:text-red-500 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition"
                onClick={e => { e.stopPropagation(); handleDelete(site.id); }}
                title="삭제"
                disabled={deletingId === site.id}
              >
                ×
              </button>
              <img src={site.thumbnail} alt={site.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-lg font-bold text-blue-700 mb-1">{site.title}</h2>
                <div className="text-sm text-gray-500 mb-2">by {site.creator}</div>
                <p className="text-gray-700 text-sm mb-2 line-clamp-2">{site.description}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {site.techStack.map((tech) => (
                    <span key={tech} className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <WebsiteDetailModal open={!!selected} website={selected} onClose={() => setSelected(null)} />
    </>
  );
}

export default GalleryGrid; 