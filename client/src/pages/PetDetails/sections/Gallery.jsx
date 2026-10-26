import { useState } from "react";
import { FaHeart, FaExpand, FaStar } from "react-icons/fa";

function Gallery({ images = [], isAIPick = false }) {
  const [mainImage, setMainImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const displayImages =
    images.length > 0
      ? images
      : [
          "https://images.unsplash.com/photo-1601979031925-424e53b6caaa?w=800&q=80",
        ];

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div
        className="relative rounded-3xl overflow-hidden shadow-xl group cursor-zoom-in"
        style={{ aspectRatio: "4/3" }}
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
      >
        <img
          src={displayImages[mainImage]}
          alt="Pet main"
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isZoomed ? "scale-110" : "scale-100"
          }`}
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Favorite Button */}
        <button
          onClick={() => setIsFavorited(!isFavorited)}
          className={`absolute top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 ${
            isFavorited
              ? "bg-red-500 text-white"
              : "bg-white/90 backdrop-blur-sm text-gray-400 hover:text-red-500"
          }`}
        >
          <FaHeart className="text-lg" />
        </button>

        {/* AI Pick Badge */}
        {isAIPick && (
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-gradient-to-r from-orange-500 to-amber-400 text-white text-xs px-3.5 py-1.5 rounded-full font-semibold shadow-lg">
            <FaStar className="text-yellow-200" />
            AI Pick
          </div>
        )}

        {/* Image counter */}
        <div className="absolute bottom-4 right-4 bg-black/50 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full">
          {mainImage + 1} / {displayImages.length}
        </div>

        {/* Expand hint */}
        <div className="absolute bottom-4 left-4 bg-black/40 backdrop-blur-sm text-white text-xs px-2.5 py-1 rounded-full flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <FaExpand className="text-xs" />
          Hover to zoom
        </div>
      </div>

      {/* Thumbnails */}
      <div className="grid grid-cols-5 gap-2.5">
        {displayImages.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setMainImage(idx)}
            className={`relative rounded-xl overflow-hidden aspect-square transition-all duration-200 ${
              mainImage === idx
                ? "ring-2 ring-orange-500 ring-offset-2 shadow-md scale-105"
                : "opacity-70 hover:opacity-100 hover:scale-105"
            }`}
          >
            <img
              src={img}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
            />
            {mainImage === idx && (
              <div className="absolute inset-0 bg-orange-500/10" />
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Gallery;