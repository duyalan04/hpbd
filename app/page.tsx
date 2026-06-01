"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function BirthdaySurprise() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [isOpenLetter, setIsOpenLetter] = useState(false);

  useEffect(() => {
    const updateViewport = () => {
      setViewport({ width: window.innerWidth, height: window.innerHeight });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    // Keep confetti visible for 8 seconds.
    const timeout = setTimeout(() => setShowConfetti(false), 8000);

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
    {
      date: "26/06/2024",
      title: "Trú mưa cùng nhau",
      desc: "Cơn mưa hôm ấy làm hai đứa mình gần nhau hơn.",
    },
    {
      date: "30/05/2025",
      title: "Chính thức yêu nhau",
      desc: "Khoảnh khắc em gật đầu là điều ngọt ngào nhất với anh.",
    },
    {
      date: "30/06/2026",
      title: "Kỉ niệm 2 năm yêu nhau",
      desc: "Hai năm bên nhau, càng ngày anh càng thương em nhiều hơn.",
    },
  ];

  const photos = [
    {
      url: "z7890081776442_dd7205e09121bda20a7074bd9476c823.jpg",
      caption: "Nụ cười làm tim anh tan chảy",
    },
    {
      url: "z7890082708692_fa8698add0b6d33dc9101999e56fc127.jpg",
      caption: "Lúc nào cũng tinh nghịch như thế này nhé",
    },
    {
      url: "z7890083049499_639af1f56654cfa18585ecf2078fd327.jpg",
      caption: "Công chúa nhỏ của anh",
    },
  ];

  return (
    <div className="min-h-screen bg-rose-50 text-gray-800 font-sans selection:bg-rose-200">
      {showConfetti && (
        <Confetti width={viewport.width} height={viewport.height} />
      )}

      <section className="h-screen flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="bg-white/80 backdrop-blur-md p-10 rounded-3xl shadow-2xl max-w-xl border border-rose-100 z-10"
        >
          <span className="text-6xl mb-4 block animate-bounce">🎂</span>
          <h1 className="text-4xl md:text-5xl font-bold text-rose-500 mb-4 tracking-wide">
            Happy Birthday, Em Yêu! ❤️
          </h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Hôm nay là một ngày đặc biệt, ngày mà thế giới này chào đón một
            thiên thần dễ thương nhất. Anh có một bất ngờ nhỏ dành tặng riêng
            cho em...
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => scrollToSection("memories")}
            className="bg-rose-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:bg-rose-600 transition-colors"
          >
            Khám phá món quà 🎁
          </motion.button>
        </motion.div>

        <div className="absolute top-10 left-10 text-rose-200 text-4xl opacity-50 animate-pulse">
          ❤️
        </div>
        <div className="absolute bottom-10 right-10 text-rose-200 text-6xl opacity-50 animate-pulse">
          💖
        </div>
      </section>

      <section id="memories" className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-rose-600 mb-12">
          📸 Khoảnh Khắc Của Chúng Mình
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.url}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-rose-100 group"
            >
              <div className="h-64 overflow-hidden relative">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 text-center">
                <p className="font-medium text-gray-700 italic">
                  &quot;{photo.caption}&quot;
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-white/60 backdrop-blur-sm px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-rose-600 mb-16">
            ⏳ Hành Trình Yêu Thương
          </h2>

          <div className="relative border-l-2 border-rose-300 ml-4 md:ml-32">
            {timeline.map((item, index) => (
              <motion.div
                key={`${item.date}-${item.title}`}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="mb-10 ml-6 relative"
              >
                <span className="absolute -left-[31px] top-1 bg-rose-400 w-4 h-4 rounded-full border-4 border-white shadow shadow-rose-300"></span>
                <span className="text-sm font-bold text-rose-400 block mb-1">
                  {item.date}
                </span>
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600 mt-1">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 text-center px-6">
        <h2 className="text-2xl font-medium text-gray-700 mb-6">
          Và cuối cùng... Điều quan trọng nhất anh muốn nói
        </h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpenLetter(true)}
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold px-10 py-4 rounded-full shadow-xl text-lg animate-pulse"
        >
          Mở thư tay bí mật ✉️
        </motion.button>
      </section>

      <AnimatePresence>
        {isOpenLetter && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-[#fcf8f2] text-[#4a3b32] p-8 md:p-12 rounded-2xl max-w-xl w-full shadow-2xl border-2 border-[#e6dcd3] relative"
            >
              <button
                onClick={() => setIsOpenLetter(false)}
                className="absolute top-4 right-4 text-2xl hover:text-rose-500 transition-colors"
              >
                ✕
              </button>

              <h3 className="text-2xl font-bold text-center text-rose-600 mb-6 border-b pb-4 border-rose-200">
                Gửi cục cưng của anh,
              </h3>

              <div className="space-y-4 text-lg leading-relaxed overflow-y-auto max-h-[60vh] pr-2">
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
                <p>Yêu em nhiều hơn ngày hôm qua! 💕</p>
                <p className="text-right font-semibold mt-6 italic">
                  - Chàng trai của em -
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
