"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

// Component trang trí ngôi sao lấp lánh nhỏ
const SparkleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="currentColor" />
  </svg>
);

export default function BirthdaySurprise() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isOpenLetter, setIsOpenLetter] = useState(false);
  const containerRef = useRef(null);

  // Hiệu ứng Parallax cho nền
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    // Tắt pháo giấy sau 10 giây
    const timeout = setTimeout(() => setShowConfetti(false), 10000);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateViewport);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const timeline = [
    { date: "26/06/2024", title: "Trú mưa cùng nhau", desc: "Cơn mưa hôm ấy làm hai đứa mình gần nhau hơn.", icon: "☔" },
    { date: "30/05/2025", title: "Chính thức yêu nhau", desc: "Khoảnh khắc em gật đầu là điều ngọt ngào nhất.", icon: "💖" },
    { date: "30/06/2026", title: "Kỉ niệm 2 năm yêu", desc: "Càng ngày anh càng thương em nhiều hơn.", icon: "💑" },
  ];

  const photos = [
    { url: "z7890081776442_dd7205e09121bda20a7074bd9476c823.jpg", caption: "Nụ cười làm tim anh tan chảy" },
    { url: "z7890082708692_fa8698add0b6d33dc9101999e56fc127.jpg", caption: "Lúc nào cũng tinh nghịch nhé" },
    { url: "z7890083049499_639af1f56654cfa18585ecf2078fd327.jpg", caption: "Công chúa nhỏ của anh" },
  ];

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fff5f6] text-gray-800 font-sans selection:bg-rose-100 relative overflow-hidden">
      
      {/* NỀN PARALLAX ĐỘNG */}
      <motion.div 
        style={{ y: backgroundY }}
        className="fixed inset-0 z-0 opacity-30"
      >
        <div className="absolute top-10 left-1/4 text-rose-200 text-6xl animate-float">❤️</div>
        <div className="absolute top-1/3 right-10 text-rose-100 text-9xl animate-float [animation-delay:2s]">💖</div>
        <div className="absolute bottom-1/4 left-10 text-rose-200 text-8xl animate-float [animation-delay:4s]">💗</div>
        <SparkleIcon className="absolute top-1/2 left-1/2 w-10 h-10 text-yellow-300 animate-sparkle" />
        <SparkleIcon className="absolute top-20 right-1/4 w-6 h-6 text-yellow-200 animate-sparkle [animation-delay:1s]" />
      </motion.div>

      {showConfetti && (
        <Confetti width={viewport.width} height={viewport.height} numberOfPieces={200} recycle={false} colors={['#f43f5e', '#fecdd3', '#fff', '#fb923c']} />
      )}

      {/* SECTION 1: HERO (TỐI ƯU HIỆU ỨNG) */}
      <section className="h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 overflow-hidden">
        <motion.div
          style={{ opacity: opacityHero }}
          initial={{ opacity: 0, y: 100, rotateX: 30 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1.2, type: "spring", bounce: 0.3 }}
          className="bg-white/70 backdrop-blur-lg p-10 md:p-16 rounded-[40px] shadow-[0_20px_50px_rgba(244,63,94,0.15)] max-w-2xl border border-rose-100/50"
        >
          <motion.span 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }}
            className="text-7xl mb-6 block"
          >
            🎂
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl font-bold text-rose-600 mb-6 font-title tracking-wide bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent">
            Happy Birthday, Em Yêu! ❤️
          </h1>
          
          <p className="text-gray-700 text-xl mb-10 leading-relaxed font-light">
            Hôm nay là một ngày đặc biệt, ngày mà thế giới này chào đón một
            thiên thần dễ thương nhất. Anh có một bất ngờ nhỏ dành tặng riêng
            cho em...
          </p>
          
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(244,63,94,0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("memories")}
            className="bg-gradient-to-r from-rose-500 to-pink-500 text-white px-10 py-4 rounded-full font-semibold shadow-lg text-lg transition-all"
          >
            Khám phá món quà 🎁
          </motion.button>
        </motion.div>
        
        <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-rose-300 text-3xl cursor-pointer"
            onClick={() => scrollToSection("memories")}
        >
            ↓
        </motion.div>
      </section>

      {/* SECTION 2: GALLERY (HIỆU ỨNG HOVER HOÀN TOÀN MỚI) */}
      <section id="memories" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-4xl md:text-5xl font-bold text-center text-rose-600 mb-16 font-title"
        >
          📸 Khoảnh Khắc Của Chúng Mình
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.url}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-rose-100 group relative aspect-[3/4]"
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              
              {/* Lớp phủ mờ và Caption xuất hiện khi hover */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              >
                <div className="overflow-hidden">
                    <motion.p 
                        initial={{ y: 50 }}
                        whileHover={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="font-title text-3xl text-white italic"
                    >
                        &quot;{photo.caption}&quot;
                    </motion.p>
                </div>
              </motion.div>
              
              {/* Hiệu ứng lấp lánh (Glare) khi hover */}
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 transform -translate-x-full group-hover:translate-x-full rotate-12" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TIMELINE (ĐƯỜNG CHẠY ĐỘNG) */}
      <section className="py-28 bg-white/40 backdrop-blur-sm px-6 relative z-10">
        <div className="max-w-4xl mx-auto overflow-hidden">
          <motion.h2 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center text-rose-600 mb-20 font-title"
          >
            ⏳ Hành Trình Yêu Thương
          </motion.h2>

          <div className="relative">
            {/* ĐƯỜNG KẺ NỀN MỜ */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-100 -translate-x-1/2" />
            
            {/* ĐƯỜNG KẺ CHẠY THEO KHI SCROLL */}
            <motion.div 
                style={{ scaleY: scrollYProgress, originY: 0 }}
                className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-rose-400 -translate-x-1/2 z-10"
            />

            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={`${item.date}-${item.title}`} className="mb-16 flex items-center justify-start md:justify-center w-full relative z-20">
                  
                  {/* Nội dung (trái hoặc phải tùy chỉ số) */}
                  <div className={`flex items-center w-full md:w-1/2 ${isEven ? 'md:justify-end md:pr-12' : 'md:justify-start md:pl-12'} pl-12 md:pl-0`}>
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.7, type: "spring" }}
                      className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100 w-full max-w-sm hover:shadow-rose-100 hover:shadow-2xl transition-shadow"
                    >
                      <span className="text-sm font-bold text-rose-400 block mb-1">
                        {item.date}
                      </span>
                      <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        {item.title} <span className="text-lg">{item.icon}</span>
                      </h3>
                      <p className="text-gray-600 mt-2 font-light">{item.desc}</p>
                    </motion.div>
                  </div>

                  {/* Điểm tròn trên timeline */}
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="absolute left-4 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white border-4 border-rose-400 shadow-xl flex items-center justify-center z-30"
                  >
                     <div className="w-3 h-3 rounded-full bg-rose-400 animate-pulse" />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION (LỚN HƠN) */}
      <section className="py-32 text-center px-6 relative z-10">
        <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto"
        >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-10 leading-tight">
                Và cuối cùng... <br/> Điều quan trọng nhất anh muốn nói
            </h2>
            <motion.button
                whileHover={{ scale: 1.1, rotate: [0, -3, 3, 0] }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpenLetter(true)}
                className="bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-bold px-12 py-5 rounded-full shadow-2xl text-xl animate-pulse transition-all"
            >
                Mở thư tay bí mật ✉️
            </motion.button>
        </motion.div>
      </section>

      {/* SECTION 5: POPUP BỨC THƯ (HIỆU ỨNG 3D FLIP) */}
      <AnimatePresence>
        {isOpenLetter && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-md [perspective:1000px]"
            onClick={() => setIsOpenLetter(false)} // Đóng khi nhấn ra ngoài
          >
            <motion.div
              initial={{ scale: 0.6, opacity: 0, rotateY: 70 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.6, opacity: 0, rotateY: -70 }}
              transition={{ duration: 0.8, type: "spring", bounce: 0.2 }}
              className="bg-[#fcf8f2] text-[#4a3b32] p-8 md:p-14 rounded-3xl max-w-2xl w-full shadow-[0_20px_60px_rgba(0,0,0,0.3)] border-2 border-[#e6dcd3] relative font-serif overflow-hidden"
              onClick={(e) => e.stopPropagation()} // Ngăn đóng khi nhấn vào trong thư
            >
              {/* Trang trí góc thư cũ */}
              <div className="absolute -top-10 -left-10 w-24 h-24 bg-rose-100 rounded-full opacity-50" />
              <div className="absolute -bottom-10 -right-10 w-24 h-24 bg-rose-100 rounded-full opacity-50" />

              <button
                onClick={() => setIsOpenLetter(false)}
                className="absolute top-5 right-5 text-3xl text-gray-400 hover:text-rose-500 transition-colors z-10"
              >
                ✕
              </button>

              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl font-bold text-center text-rose-600 mb-10 border-b-2 pb-6 border-rose-100 font-title tracking-wide"
              >
                Gửi cục cưng của anh,
              </motion.h3>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
                className="space-y-6 text-xl leading-relaxed overflow-y-auto max-h-[60vh] pr-4 font-light italic"
              >
                <p>
                  Gặp được em là điều may mắn nhất trong cuộc đời anh. Cảm ơn
                  em đã luôn bao dung, lo lắng và ở bên cạnh anh những lúc vui
                  buồn.
                </p>
                <p>
                  Tuổi mới, anh chúc em luôn xinh đẹp, rạng rỡ, đạt được mọi
                  ước mơ của mình. Đừng lo lắng gì cả vì lúc nào cũng có anh ở
                  phía sau làm chỗ dựa cho em.
                </p>
                <p>Mãi yêu em như ngày đầu! 💕</p>
                <p className="text-right font-semibold mt-10 text-2xl text-rose-500 font-title">
                  - Chàng trai của em -
                </p>
              </motion.div>
              
              {/* Biểu tượng nhỏ cuối thư */}
              <div className="flex justify-center mt-8 text-rose-200">
                <SparkleIcon className="w-4 h-4 animate-sparkle" />
                <SparkleIcon className="w-4 h-4 animate-sparkle [animation-delay:0.5s]" />
                <SparkleIcon className="w-4 h-4 animate-sparkle" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}