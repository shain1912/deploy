import React, { useState } from "react";

function WebsiteDetailModal({ open, onClose, website }) {
  const [imgError, setImgError] = useState(false);
  if (!open || !website) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
        {imgError ? (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100 text-gray-400 mb-4">이미지를 불러올 수 없습니다.</div>
        ) : (
          <img
            src={website.thumbnail}
            alt={website.title}
            className="w-full h-48 object-cover rounded mb-4"
            onError={() => setImgError(true)}
          />
        )}
        <h2 className="text-2xl font-bold text-blue-700 mb-2">{website.title}</h2>
        <div className="text-sm text-gray-500 mb-2">by {website.creator}</div>
        <p className="text-gray-700 mb-4">{website.description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {website.techStack.map((tech) => (
            <span key={tech} className="bg-blue-100 text-blue-600 px-2 py-0.5 rounded text-xs">{tech}</span>
          ))}
        </div>
        <a
          href={website.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          사이트 방문하기
        </a>
      </div>
    </div>
  );
}

export default WebsiteDetailModal; 