import React from "react";
import { GalleryProvider } from "./GalleryContext";
import GalleryGrid from "./GalleryGrid";
import WebsiteSubmitForm from "./WebsiteSubmitForm";
import AboutSection from "./AboutSection";

function App() {
  return (
    <GalleryProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-700">학생 웹사이트 전시 갤러리</h1>
          {/* Navigation */}
          <nav>
            <ul className="flex gap-6 text-lg">
              <li><a href="#submit" className="hover:text-blue-500">등록</a></li>
              <li><a href="#gallery" className="hover:text-blue-500">갤러리</a></li>
              <li><a href="#about" className="hover:text-blue-500">About</a></li>
            </ul>
          </nav>
        </header>
        {/* Main Content */}
        <main className="flex-1 p-6 space-y-16">
          <section id="submit">
            <WebsiteSubmitForm />
          </section>
          <section id="gallery">
            <GalleryGrid />
          </section>
          <section id="about">
            <AboutSection />
          </section>
        </main>
        {/* Footer */}
        <footer className="bg-white border-t p-4 text-center text-gray-400 text-sm">
          © 2024 학생 웹사이트 전시 갤러리
        </footer>
      </div>
    </GalleryProvider>
  );
}

export default App;
