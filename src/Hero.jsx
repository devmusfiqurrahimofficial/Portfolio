import { useEffect, useRef } from "react";
import img from "./IMG_2690.jpeg";
import gsap from "gsap";

export default function Hero() {
  const heroRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline();

      timeline
        .from(".hero-label", {
          y: 20,
          opacity: 0,
          duration: 0.6,
        })
        .from(
          ".hero-title",
          {
            y: 60,
            opacity: 0,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.2"
        )
        .from(
          ".hero-description, .hero-buttons",
          {
            y: 20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
          },
          "-=0.4"
        )
        .from(
          ".hero-portrait",
          {
            opacity: 0,
            scale: 0.85,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.8"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="hero">
      <div className="hero-content">
        <p className="hero-label">Hi, I'm</p>

        <h1 className="hero-title">
          Musfiqur <span>Rahim</span>
        </h1>

        <p className="hero-description">
          Frontend Developer building modern
          digital experiences.
        </p>

        <div className="hero-buttons">
          <a href="#projects">View My Projects →</a>
          <a href="#contact">Contact Me →</a>
        </div>
      </div>

      <div className="hero-portrait">
        <img src={img} alt="Musfiqur Rahim" />
      </div>
    </section>
  );
}