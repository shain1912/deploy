import React, { useState } from "react";
import { useGallery } from "./GalleryContext";

function WebsiteSubmitForm() {
  const { addWebsite } = useGallery();
  const [form, setForm] = useState({
    title: "",
    url: "",
    thumbnail: "",
    description: "",
    creator: "",
    techStack: ""
  });
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.url || !form.thumbnail) {
      setError("필수 항목을 모두 입력해 주세요.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      // setError("등록에 실패했습니다. 다시 시도해 주세요."); // 에러 테스트 시 주석 해제
      addWebsite({
        ...form,
        techStack: form.techStack.split(",").map((t) => t.trim()).filter(Boolean)
      });
      setForm({ title: "", url: "", thumbnail: "", description: "", creator: "", techStack: "" });
      setSuccess(true);
      setLoading(false);
      setTimeout(() => setSuccess(false), 2000);
      document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" });
    }, 700);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white rounded-lg shadow p-6 mb-10">
      <h2 className="text-xl font-bold mb-4 text-blue-700">웹사이트 등록</h2>
      <div className="mb-3">
        <label className="block mb-1 font-medium">제목 *</label>
        <input name="title" value={form.title} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">URL *</label>
        <input name="url" value={form.url} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">썸네일 이미지 URL *</label>
        <input name="thumbnail" value={form.thumbnail} onChange={handleChange} className="w-full border rounded px-3 py-2" required />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">설명</label>
        <textarea name="description" value={form.description} onChange={handleChange} className="w-full border rounded px-3 py-2" rows={2} />
      </div>
      <div className="mb-3">
        <label className="block mb-1 font-medium">제작자</label>
        <input name="creator" value={form.creator} onChange={handleChange} className="w-full border rounded px-3 py-2" />
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">기술 스택 (쉼표로 구분)</label>
        <input name="techStack" value={form.techStack} onChange={handleChange} className="w-full border rounded px-3 py-2" placeholder="React, TailwindCSS" />
      </div>
      <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-bold" disabled={loading}>
        {loading ? "등록 중..." : "등록하기"}
      </button>
      {error && <div className="text-red-500 mt-3 text-center">{error}</div>}
      {success && <div className="text-green-600 mt-3 text-center">등록 완료!</div>}
    </form>
  );
}

export default WebsiteSubmitForm; 