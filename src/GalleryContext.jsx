import React, { createContext, useContext, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_REACT_APP_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_REACT_APP_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const GalleryContext = createContext();

export function useGallery() {
  return useContext(GalleryContext);
}

export function GalleryProvider({ children }) {
  const [websites, setWebsites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProjects() {
      setLoading(true);
      setError("");
      const { data, error } = await supabase.from("project_gallery").select("*");
      if (error) {
        setError("Supabase에서 데이터를 불러오지 못했습니다.");
        setWebsites([]);
      } else if (data) {
        setWebsites(
          data.map((item) => ({
            ...item,
            techStack: Array.isArray(item.tech_stack)
              ? item.tech_stack
              : typeof item.tech_stack === "string"
              ? item.tech_stack.split(",").map((t) => t.trim()).filter(Boolean)
              : []
          }))
        );
      }
      setLoading(false);
    }
    fetchProjects();
  }, []);

  // 새 웹사이트 등록
  const addWebsite = async (website) => {
    const techStackArr = Array.isArray(website.techStack)
      ? website.techStack
      : typeof website.techStack === "string"
      ? website.techStack.split(",").map(t => t.trim()).filter(Boolean)
      : [];
    // techStack 필드를 제거한 새 객체 생성
    const { techStack, ...rest } = website;
    const { data, error } = await supabase.from("project_gallery").insert([
      {
        ...rest,
        tech_stack: techStackArr,
      },
    ]).select();
    if (!error && data && data[0]) {
      setWebsites((prev) => [
        {
          ...data[0],
          techStack: Array.isArray(data[0].tech_stack)
            ? data[0].tech_stack
            : typeof data[0].tech_stack === "string"
            ? data[0].tech_stack.split(",").map((t) => t.trim()).filter(Boolean)
            : []
        },
        ...prev,
      ]);
    } else {
      alert("Supabase에 등록에 실패했습니다.");
    }
  };

  // 웹사이트 삭제
  const removeWebsite = async (id) => {
    // Supabase에서 삭제
    const { error } = await supabase.from("project_gallery").delete().eq("id", id);
    if (!error) {
      setWebsites((prev) => prev.filter((w) => w.id !== id));
    } else {
      alert("Supabase에서 삭제에 실패했습니다.");
    }
  };

  return (
    <GalleryContext.Provider value={{ websites, loading, error, addWebsite, removeWebsite }}>
      {children}
    </GalleryContext.Provider>
  );
} 