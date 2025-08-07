// "use client";
import { notFound } from "next/navigation";

const kidsImages = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/seed/kid${i}/500/500`
);
const adultsImages = Array.from(
  { length: 10 },
  (_, i) => `https://picsum.photos/seed/adult${i}/500/500`
);

const frameSizes = [
  "size-4x6",
  "size-5x5",
  "size-5x7",
  "size-8x10",
  "size-12x12",
];

function shuffleAndBuild(images, totalCount = 50) {
  const result = [];
  let idx = 0;
  for (let i = 0; i < totalCount; i++) {
    const size = frameSizes[Math.floor(Math.random() * frameSizes.length)];
    const img = images[idx % images.length];
    result.push({ src: img, sizeClass: size, key: `${size}-${i}` });
    idx++;
  }
  return result.sort(() => 0.5 - Math.random());
}

export default function CategoryPage({ params }) {
  const { category } = params;
  const images =
    category === "kids"
      ? kidsImages
      : category === "adults"
      ? adultsImages
      : null;

  if (!images) return notFound();

  const shuffledImages = shuffleAndBuild(images, 50);

  return (
    <div className="masonry-container">
      {shuffledImages.map(({ src, sizeClass, key }) => (
        <div className={`masonry-item ${sizeClass}`} key={key}>
          <img src={src} alt={category} />
        </div>
      ))}
    </div>
  );
}
