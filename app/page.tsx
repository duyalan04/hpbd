"use client";

import { useCallback, useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

const SparkleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" className={className}>
    <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z" fill="currentColor" />
  </svg>
);

export default function BirthdaySurprise() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isOpenLetter, setIsOpenLetter] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = useCallback(async () => {
    if (!audioRef.current || !audioRef.current.paused) return;
    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch {
      // Browsers may block autoplay until a user interaction occurs.
    }
  }, []);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    const updateViewport = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    const updateMousePosition = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });

    updateViewport();
    window.addEventListener("resize", updateViewport);
    window.addEventListener("mousemove", updateMousePosition);

    const timeout = setTimeout(() => setShowConfetti(false), 12000);
    audioRef.current = new Audio("/George_Micheal_-_Careless_Whisper_(mp3.pm).mp3"); // Cần có file music.mp3 trong thư mục public
    audioRef.current.loop = true;

    void startMusic();

    const handleFirstInteraction = () => {
      void startMusic();
    };

    window.addEventListener("pointerdown", handleFirstInteraction, { once: true });
    window.addEventListener("keydown", handleFirstInteraction, { once: true });

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", updateViewport);
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("pointerdown", handleFirstInteraction);
      window.removeEventListener("keydown", handleFirstInteraction);
      if (audioRef.current) audioRef.current.pause();
    };
  }, [startMusic]);

  const toggleMusic = async () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      await startMusic();
    }
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  // Hiệu ứng xuất hiện từng từ cho tiêu đề
  const titleText = "Happy Birthday, Em Yêu! ❤️".split(" ");

  const titleVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 50, rotateX: -90 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: { duration: 0.8, type: "spring" as const, bounce: 0.4 } // <--- Thêm "as const" vào đây
    }
  };

  // Dữ liệu Demo
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
    <div className="min-h-screen bg-[#fff5f6] text-gray-800 font-sans selection:bg-rose-200 relative overflow-hidden cursor-none md:cursor-auto">

      {/* THANH SCROLL PROGRESS */}
      <motion.div className="fixed top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 via-pink-500 to-amber-400 origin-left z-[100]" style={{ scaleX }} />

      {/* CUSTOM CURSOR (Chỉ hiện trên màn hình lớn) */}
      <motion.div
        animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16 }}
        transition={{ type: "tween", ease: "backOut", duration: 0.15 }}
        className="hidden md:block fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-rose-500 pointer-events-none z-[100] mix-blend-multiply backdrop-blur-sm bg-rose-200/20"
      />

      {/* MUSIC TOGGLE (Đĩa than lơ lửng) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={toggleMusic}
        className="fixed bottom-6 right-6 z-[90] w-14 h-14 bg-white/80 backdrop-blur-md border-2 border-rose-200 rounded-full shadow-xl flex items-center justify-center overflow-hidden"
      >
        <motion.div animate={{ rotate: isPlaying ? 360 : 0 }} transition={{ repeat: Infinity, duration: 3, ease: "linear" }} className="text-2xl">
          💿
        </motion.div>
        {/* Nốt nhạc bay ra khi đang phát */}
        {isPlaying && (
          <motion.div animate={{ y: [-10, -30], opacity: [1, 0], x: [0, 10] }} transition={{ repeat: Infinity, duration: 1 }} className="absolute text-rose-500 text-sm -top-2">
            🎵
          </motion.div>
        )}
      </motion.button>

      {/* NỀN PARALLAX ĐỘNG */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 opacity-40 pointer-events-none">
        <div className="absolute top-10 left-[10%] text-rose-200 text-6xl animate-float">❤️</div>
        <div className="absolute top-1/3 right-[5%] text-rose-100 text-8xl animate-float [animation-delay:2s]">💖</div>
        <div className="absolute bottom-[20%] left-[5%] text-rose-200 text-7xl animate-float [animation-delay:4s]">💗</div>
        <div className="absolute top-[60%] right-[20%] text-rose-200 text-5xl animate-float [animation-delay:1s]">💕</div>
      </motion.div>

      {showConfetti && <Confetti width={viewport.width} height={viewport.height} numberOfPieces={300} gravity={0.15} colors={['#f43f5e', '#fecdd3', '#fff', '#fb923c']} />}

      {/* SECTION 1: HERO */}
      <section className="h-screen flex flex-col items-center justify-center p-6 text-center relative z-10 overflow-hidden">
        <motion.div
          style={{ opacity: opacityHero }}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-white/60 backdrop-blur-xl p-10 md:p-16 rounded-[40px] shadow-[0_20px_50px_rgba(244,63,94,0.1)] max-w-2xl border border-white/50"
        >
          <motion.span animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ repeat: Infinity, duration: 2, repeatDelay: 1 }} className="text-7xl mb-8 block drop-shadow-xl">
            🎂
          </motion.span>

          {/* HIỆU ỨNG CHỮ STAGGER */}
          <motion.h1
            variants={titleVariants} initial="hidden" animate="visible"
            className="text-5xl md:text-7xl font-bold mb-6 font-title tracking-wide flex flex-wrap justify-center gap-x-4"
          >
            {titleText.map((word, i) => (
              <motion.span key={i} variants={wordVariants} className="bg-gradient-to-r from-rose-600 to-pink-500 bg-clip-text text-transparent inline-block">
                {word}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="text-gray-700 text-xl mb-10 leading-relaxed font-light">
            Hôm nay là một ngày đặc biệt, ngày mà thế giới này chào đón một thiên thần dễ thương nhất.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(244,63,94,0.4)" }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              scrollToSection("memories");
              // Nếu nhạc chưa bật thì tự động bật luôn
              if (!isPlaying) {
                toggleMusic();
              }
            }}
            className="relative overflow-hidden group bg-gradient-to-r from-rose-500 to-pink-500 text-white px-10 py-4 rounded-full font-semibold shadow-lg text-lg transition-all"
          >
            <span className="relative z-10">Khám phá món quà 🎁</span>
            {/* Hiệu ứng lướt sáng bên trong nút */}
            <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
          </motion.button>
        </motion.div>

        <motion.div animate={{ y: [0, 15, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} onClick={() => scrollToSection("memories")} className="absolute bottom-10 text-rose-400 text-4xl cursor-pointer hover:text-rose-600 transition-colors">
          👇
        </motion.div>
      </section>

      {/* SECTION 2: GALLERY */}
      <section id="memories" className="py-24 px-6 max-w-6xl mx-auto relative z-10">
        <motion.h2 initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-center text-rose-600 mb-16 font-title">
          📸 Khoảnh Khắc Của Chúng Mình
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.url}
              initial={{ opacity: 0, rotateY: 90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8, type: "spring" }}
              viewport={{ once: true, margin: "-50px" }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border-4 border-white group relative aspect-[3/4]"
            >
              <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-125 group-hover:rotate-3" />
              <div className="absolute inset-0 bg-gradient-to-t from-rose-900/90 via-black/20 to-transparent flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="font-title text-3xl text-white italic drop-shadow-md">&quot;{photo.caption}&quot;</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SECTION 3: TIMELINE */}
      <section className="py-28 bg-white/40 backdrop-blur-sm px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <motion.h2 initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold text-center text-rose-600 mb-20 font-title">
            ⏳ Hành Trình Yêu Thương
          </motion.h2>

          <div className="relative">
            {/* ĐƯỜNG KẺ DỌC CHẠY THEO SCROLL */}
            <motion.div style={{ scaleY: scrollYProgress, originY: 0 }} className="absolute left-5 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-300 to-pink-500 md:-translate-x-1/2 z-10 rounded-full" />

            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} className={`mb-12 md:mb-20 flex justify-between items-center w-full relative z-20 ${isEven ? 'md:flex-row-reverse' : ''}`}>

                  {/* DẤU CHẤM MỐC THỜI GIAN */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }} whileInView={{ scale: 1, rotate: 0 }} viewport={{ once: true }} transition={{ type: "spring", duration: 1 }}
                    className="absolute left-5 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border-4 border-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)] z-30 flex items-center justify-center"
                  >
                    <div className="w-3 h-3 bg-rose-500 rounded-full animate-ping" />
                  </motion.div>

                  {/* KHÔNG GIAN BÙ TRỪ GIÚP ĐẨY KHUNG TEXT SANG 2 BÊN TRÊN DESKTOP */}
                  <div className="hidden md:block w-5/12"></div>

                  {/* THẺ NỘI DUNG (Tránh xa dấu chấm) */}
                  <div className="w-full pl-16 md:pl-0 md:w-5/12">
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? -50 : 50, scale: 0.9 }}
                      whileInView={{ opacity: 1, x: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                      whileHover={{ scale: 1.05, rotate: isEven ? -2 : 2 }}
                      className="bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl border border-rose-100 w-full hover:shadow-rose-200/50 transition-all"
                    >
                      <span className="inline-block px-4 py-1.5 bg-rose-100 text-rose-600 rounded-full text-sm font-bold mb-4">{item.date}</span>
                      <h3 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-2">{item.title} <span>{item.icon}</span></h3>
                      <p className="text-gray-600 font-light leading-relaxed">{item.desc}</p>
                    </motion.div>
                  </div>

                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: CALL TO ACTION */}
      <section className="py-32 text-center px-6 relative z-10">
        {/* Floating background hearts */}
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} animate={{ y: [0, -200], opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5] }} transition={{ repeat: Infinity, duration: 3 + i, delay: i * 0.5 }} className="absolute text-rose-300 text-2xl" style={{ left: `${20 + i * 15}%`, bottom: "0" }}>
            💖
          </motion.div>
        ))}

        <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} className="max-w-xl mx-auto relative z-20">
          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 mb-10 leading-tight">Và cuối cùng... <br /> Điều quan trọng nhất anh muốn nói</h2>
          <motion.button
            whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpenLetter(true)}
            className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 bg-[length:200%_auto] animate-[gradient_3s_linear_infinite] text-white font-bold px-12 py-5 rounded-full shadow-[0_10px_40px_rgba(244,63,94,0.5)] text-xl transition-all"
          >
            Mở thư tay bí mật ✉️
          </motion.button>
        </motion.div>
      </section>

      {/* SECTION 5: MODAL THƯ TAY (Hiệu ứng đập nhịp tim) */}
      <AnimatePresence>
        {isOpenLetter && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 z-[200] flex items-center justify-center p-4 backdrop-blur-md"
            onClick={() => setIsOpenLetter(false)}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 100 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: -100 }}
              transition={{ type: "spring", damping: 15 }}
              className="bg-[#fdfbf7] text-[#4a3b32] p-10 md:p-14 rounded-[40px] max-w-2xl w-full shadow-[0_0_100px_rgba(244,63,94,0.3)] border border-[#e6dcd3] relative font-serif overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute top-0 left-0 w-full h-4 bg-rose-400 opacity-20" />
              <button onClick={() => setIsOpenLetter(false)} className="absolute top-6 right-6 text-3xl text-rose-300 hover:text-rose-600 transition-transform hover:rotate-90 z-10">✕</button>

              <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 1.5 }} className="text-5xl text-center mb-6 text-rose-500">
                💌
              </motion.div>

              <h3 className="text-3xl md:text-4xl font-bold text-center text-rose-600 mb-8 border-b-2 pb-6 border-rose-100 font-title tracking-wide">
                Gửi cục cưng của anh,
              </h3>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 1 }} className="space-y-6 text-xl leading-relaxed overflow-y-auto max-h-[50vh] pr-4 font-light italic">
                <p>Gặp được em là điều may mắn nhất trong cuộc đời anh. Cảm ơn em đã luôn bao dung, lo lắng và ở bên cạnh anh những lúc vui buồn.</p>
                <p>Tuổi mới, anh chúc em luôn xinh đẹp, rạng rỡ, đạt được mọi ước mơ của mình. Đừng lo lắng gì cả vì lúc nào cũng có anh ở phía sau làm chỗ dựa cho em.</p>
                <p>Mãi yêu em như ngày đầu! 💕</p>
                <p className="text-right font-semibold mt-10 text-2xl text-rose-500 font-title">- Chàng trai của em -</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tailwind Animations (Thêm vào tailwind.config.ts nếu cần mượt hơn) */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes gradient { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
      `}} />
    </div>
  );
}