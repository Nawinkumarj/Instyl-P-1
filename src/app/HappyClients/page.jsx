"use client";
import { useRouter } from "next/navigation";

export default function HappyClients() {
  const router = useRouter();

  const sections = [
    [
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-8rcnXGXwyWJ8VqJOKChpf.webp",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-Tnyx2a3sC4gFYDo3M56eb.webp",
        video: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    [
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-uXoR2am8GLjT2zVydBc9t.webp",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-8rcnXGXwyWJ8VqJOKChpf.webp",
        video: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    [
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-Tnyx2a3sC4gFYDo3M56eb.webp",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-uXoR2am8GLjT2zVydBc9t.webp",
        video: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    [
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-8rcnXGXwyWJ8VqJOKChpf.webp",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-Tnyx2a3sC4gFYDo3M56eb.webp",
        video: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
    [
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-uXoR2am8GLjT2zVydBc9t.webp",
        video: "https://www.w3schools.com/html/mov_bbb.mp4",
      },
      {
        img: "https://static.getimg.ai/media/getimg_ai_img-8rcnXGXwyWJ8VqJOKChpf.webp",
        video: "https://www.w3schools.com/html/movie.mp4",
      },
    ],
  ];

  return (
    <div className="clientpage-container">
      <div className="clientpage-main">
        {sections.map((clients, sectionIndex) => (
          <div
            key={sectionIndex}
            className={`clientpage-section clientpage-section${
              sectionIndex + 1
            }`}
          >
            {clients.map((client, index) => (
              <div
                key={index}
                className="client-card"
                onMouseEnter={(e) => {
                  const video = e.currentTarget.querySelector("video");
                  video.play();
                }}
                onMouseLeave={(e) => {
                  const video = e.currentTarget.querySelector("video");
                  video.pause();
                  video.currentTime = 0;
                }}
              >
                <img
                  className="thumbnail"
                  src={client.img}
                  alt={`Client ${sectionIndex}-${index}`}
                />
                <video
                  className="hover-video"
                  src={client.video}
                  muted
                  loop
                  playsInline
                  preload="none"
                ></video>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="see-more-container">
        <button
          onClick={() => router.push("/happyclients")}
          className="see-more-btn"
        >
          See More
        </button>
      </div>
    </div>
  );
}
