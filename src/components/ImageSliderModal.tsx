import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function ImageSliderModal({ imgArr, closeModal }) {
  return (
    <div
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      className="
        fixed inset-0
        flex-col
        flex justify-center items-center
        z-50
        p-4
      "
    >
      <CloseImageModal closeModal={closeModal} />
      <RenderImageModal imgArr={imgArr} />
    </div>
  );
}

export default ImageSliderModal;

function RenderImageModal({ imgArr }) {
  const [fullscreenImg, setFullscreenImg] = useState(null);

  return (
    <>
      {/* Normal Modal with Swiper */}
      <div
        style={{ backgroundColor: "rgba(250,250,250,0.96)" }}
        className="
          rounded
          p-6
          w-[900px]
          h-[700px]
          object-contain
          flex
          justify-center
          items-center
          overflow-auto
          shadow-lg
        "
      >
        <Swiper spaceBetween={50} slidesPerView={1}>
          {imgArr?.map((img, index) => {
            //should define the real server domin here first for showing images
            const serverBaseURL = "http://localhost:5000/";
            const imageURL = serverBaseURL + img.replace(/\\/g, "/");
            return (
              <SwiperSlide key={index} className="place-self-center ">
                <img
                  src={imageURL}
                  alt={`Slide ${index + 1}`}
                  onClick={() => setFullscreenImg(imageURL)}
                  className="active:cursor-grab rounded max-w-full max-h-[60vh] mx-auto cursor-zoom-in transition-transform duration-300 hover:scale-105"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>

      {/* Fullscreen Image View */}
      {fullscreenImg && (
        <div
          onClick={() => setFullscreenImg(null)}
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center cursor-zoom-out transition-all duration-300"
        >
          <img
            src={fullscreenImg}
            alt="Fullscreen"
            className="max-w-full max-h-full rounded-lg transition-transform duration-300 scale-100 hover:scale-105"
          />
        </div>
      )}
    </>
  );
}

function CloseImageModal({ closeModal }) {
  return (
    <button
      onClick={closeModal}
      className="place-self-end translate-y-[-50px] translate-x-[-50px] text-2xl cursor-pointer hover:scale-[1.1] transition-all"
    >
      ✖
    </button>
  );
}
