import React from "react";

function GalleryFilterBar({ filter, setFilter }) {
  return (
    <form className="flex flex-wrap gap-4 mb-8 items-end justify-center w-full max-w-2xl mx-auto">
      <div>
        <label className="block text-sm font-medium mb-1">키워드</label>
        <input
          type="text"
          value={filter.keyword}
          onChange={e => setFilter(f => ({ ...f, keyword: e.target.value }))}
          className="border rounded px-3 py-2 w-40"
          placeholder="제목, 설명..."
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">제작자</label>
        <input
          type="text"
          value={filter.creator}
          onChange={e => setFilter(f => ({ ...f, creator: e.target.value }))}
          className="border rounded px-3 py-2 w-32"
          placeholder="이름"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">기술 스택</label>
        <input
          type="text"
          value={filter.tech}
          onChange={e => setFilter(f => ({ ...f, tech: e.target.value }))}
          className="border rounded px-3 py-2 w-32"
          placeholder="React, ..."
        />
      </div>
      <button
        type="button"
        className="ml-2 bg-gray-200 px-4 py-2 rounded text-gray-600 hover:bg-gray-300"
        onClick={() => setFilter({ keyword: "", creator: "", tech: "" })}
      >
        초기화
      </button>
    </form>
  );
}

export default GalleryFilterBar; 