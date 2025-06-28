import React from "react";

function AboutSection() {
  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mt-10">
      <h2 className="text-xl font-bold mb-2 text-blue-700">About</h2>
      <p className="text-gray-700 mb-2">
        <b>학생 웹사이트 전시 갤러리</b>는 학생들이 직접 만든 웹사이트를 자유롭게 등록하고, 다양한 작품을 한눈에 감상할 수 있는 온라인 전시 플랫폼입니다.
      </p>
      <ul className="text-gray-500 text-sm list-disc pl-5 mb-4">
        <li>누구나 <b>작품 등록</b> 가능 (로그인 불필요)</li>
        <li>썸네일, 설명, 기술스택 등 다양한 정보 제공</li>
        <li>키워드, 제작자, 기술스택별 <b>검색/필터</b> 지원</li>
        <li>모바일/PC <b>반응형</b> 지원</li>
        <li>상세 모달에서 외부 사이트 바로가기</li>
      </ul>
      <div className="mb-2">
        <b>사용법</b>
        <ol className="list-decimal pl-5 text-gray-600 text-sm mt-1">
          <li>상단 '등록' 메뉴에서 작품 정보를 입력 후 등록</li>
          <li>갤러리에서 다양한 학생 작품을 탐색</li>
          <li>카드 클릭 시 상세 정보 및 사이트 방문 가능</li>
        </ol>
      </div>
      <div className="mb-2">
        <b>기술 스택</b>: React, Vite, TailwindCSS
      </div>
      <div className="text-xs text-gray-400 mt-4">
        본 프로젝트는 오픈소스이며, 자유롭게 수정·배포할 수 있습니다.<br />
        <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="underline">GitHub 저장소(예시)</a>
      </div>
    </div>
  );
}

export default AboutSection; 