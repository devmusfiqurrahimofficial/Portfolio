import { useEffect, useRef } from "react"
import gsap from "gsap"
import img from "./IMG_2690.jpeg"

export function Hero() {
  const heroRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()

      tl.fromTo(
        ".hero-kicker",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
      )
        .fromTo(
          ".hero-title .line-inner",
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: "power4.out" },
          "-=0.4"
        )
        .fromTo(
          ".hero-portrait",
          { scale: 0.86, opacity: 0, rotate: 3 },
          { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "power3.out" },
          "-=0.6"
        )
        .fromTo(
          ".hero-bottom, .hero-index",
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
          "-=0.6"
        )
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={heroRef} className="hero section-wrap" id="home">
      <div className="hero-kicker">
        <span className="status-dot" /> AVAILABLE FOR SELECT PROJECTS{" "}
        <span className="hero-location">BASED IN DHAKA, BD</span>
      </div>

      <div className="hero-title">
        <div className="line">
          <span className="line-inner">DIGITAL</span>
        </div>
        <div className="line second-line">
          <span className="line-inner">
            CRAFT<span className="outline-dot">.</span>
          </span>
        </div>
      </div>

      <div className="hero-portrait" aria-label="Portrait of Musfiqur Rahim">
        <div className="portrait-glow" />
        <div className="portrait-grid" />
        <img src={img} alt="Musfiqur Rahim" className="portrait-img" />
        <div className="portrait-label">
          <span>FIG. 001</span>
          <span>HUMAN × DIGITAL</span>
        </div>
        <div className="portrait-cross cross-one">+</div>
        <div className="portrait-cross cross-two">+</div>
      </div>

      <div className="hero-bottom">
        <p>
          DESIGN-MINDED DEVELOPER
          <br />
          BUILDING FOR THE WEB.
        </p>
        <a className="round-link" href="#work" aria-label="Scroll to selected work">
          ↘
        </a>
        <p className="hero-right">
          I TURN COMPLEX IDEAS
          <br />
          INTO DIGITAL EXPERIENCES.
        </p>
      </div>

      <div className="hero-index">
        <span>PORTFOLIO — 2026</span>
        <span>SCROLL TO EXPLORE ↓</span>
      </div>
    </section>
  )
}
