import { useEffect, useRef } from "react"
import gsap from "gsap"
import img from "./IMG_0713.png"

export function Hero({ startAnimation = true }) {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)
  const portraitImageRef = useRef(null)

  // GSAP Animations
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

  useEffect(() => {
    if (!startAnimation || !canvasRef.current) return

    const canvas = canvasRef.current
    const hero = heroRef.current
    const context = canvas.getContext("2d")
    if (!context) {
      console.error("Unable to create a 2D canvas context for the hero portrait.")
      hero.classList.add("portrait-fallback")
      return () => hero.classList.remove("portrait-fallback")
    }

    const image = new Image()
    let animationFrameId
    let disposed = false
    let particles = []
    let canvasWidth = 0
    let canvasHeight = 0
    let pixelRatio = 1
    let pixelSize = 2
    let startedAt = 0
    const sampleStep = 1
    const silhouette = [
      [0.43, 0.32],
      [0.59, 0.32],
      [0.63, 0.38],
      [0.66, 0.46],
      [0.69, 0.53],
      [0.72, 0.7],
      [0.67, 0.77],
      [0.65, 0.78],
      [0.35, 0.78],
      [0.32, 0.77],
      [0.29, 0.68],
      [0.33, 0.55],
      [0.34, 0.48],
      [0.39, 0.41],
    ]

    const isInsideSilhouette = (x, y) => {
      let inside = false
      for (let i = 0, j = silhouette.length - 1; i < silhouette.length; j = i++) {
        const [xi, yi] = silhouette[i]
        const [xj, yj] = silhouette[j]
        const crossesEdge = (yi > y) !== (yj > y)
        if (crossesEdge && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
          inside = !inside
        }
      }
      return inside
    }

    const resizeCanvas = () => {
      const bounds = hero.getBoundingClientRect()
      pixelRatio = Math.min(window.devicePixelRatio || 1, 4)
      canvasWidth = bounds.width
      canvasHeight = bounds.height
      canvas.width = Math.round(canvasWidth * pixelRatio)
      canvas.height = Math.round(canvasHeight * pixelRatio)
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0)
    }

    const createParticles = () => {
      const sampleCanvas = document.createElement("canvas")
      sampleCanvas.width = image.naturalWidth
      sampleCanvas.height = image.naturalHeight
      const sampleContext = sampleCanvas.getContext("2d", { willReadFrequently: true })
      if (!sampleContext) {
        console.error("Unable to sample the hero portrait image.")
        hero.classList.add("portrait-fallback")
        return
      }

      sampleContext.drawImage(image, 0, 0)
      const { data, width, height } = sampleContext.getImageData(
        0,
        0,
        sampleCanvas.width,
        sampleCanvas.height
      )
      const heroBounds = hero.getBoundingClientRect()
      const portraitBounds = portraitImageRef.current.getBoundingClientRect()
      const imageWidth = portraitBounds.width
      const imageHeight = portraitBounds.height
      const imageLeft = portraitBounds.left - heroBounds.left
      const imageTop = portraitBounds.top - heroBounds.top
      const scale = imageWidth / width
      pixelSize = Math.max(1.25, Math.min(2.2, scale * 1.15))
      const nextParticles = []

      for (let y = 0; y < height; y += sampleStep) {
        for (let x = 0; x < width; x += sampleStep) {
          const normalizedX = x / width
          const normalizedY = y / height
          if (!isInsideSilhouette(normalizedX, normalizedY)) continue

          const index = (y * width + x) * 4
          const alpha = data[index + 3] / 255
          const luminance =
            (data[index] * 0.2126 + data[index + 1] * 0.7152 + data[index + 2] * 0.0722) *
            alpha
          if (alpha < 0.1 || luminance < 12) continue

          const red = Math.min(255, Math.round(data[index] * 0.68 + 20))
          const green = Math.min(255, Math.round(data[index + 1] * 0.68 + 45))
          const blue = Math.min(255, Math.round(data[index + 2] * 0.68 + 78))
          const targetX = imageLeft + (x + sampleStep / 2) * scale
          const targetY = imageTop + (y + sampleStep / 2) * scale
          const spread = imageWidth * 0.72

          nextParticles.push({
            x: targetX + (Math.random() - 0.5) * spread,
            y: targetY + (Math.random() - 0.5) * spread,
            targetX,
            targetY,
            color: `rgb(${red}, ${green}, ${blue})`,
            glow: Math.random() < 0.14,
            delay: Math.random() * 1.15,
            duration: 1.05 + Math.random() * 0.7,
            phase: Math.random() * Math.PI * 2,
          })
        }
      }

      particles = nextParticles
      startedAt = performance.now()
    }

    const glow = document.createElement("canvas")
    glow.width = 24
    glow.height = 24
    const glowContext = glow.getContext("2d")
    if (glowContext) {
      const gradient = glowContext.createRadialGradient(12, 12, 0, 12, 12, 12)
      gradient.addColorStop(0, "rgba(82, 220, 255, 0.42)")
      gradient.addColorStop(1, "rgba(82, 220, 255, 0)")
      glowContext.fillStyle = gradient
      glowContext.fillRect(0, 0, 24, 24)
    }

    const animate = (now) => {
      context.clearRect(0, 0, canvasWidth, canvasHeight)
      const elapsed = (now - startedAt) / 1000

      for (const particle of particles) {
        const progress = Math.max(
          0,
          Math.min(1, (elapsed - particle.delay) / particle.duration)
        )
        const eased = 1 - (1 - progress) ** 3
        const x = particle.x + (particle.targetX - particle.x) * eased
        const y = particle.y + (particle.targetY - particle.y) * eased
        const opacity = 0.24 + eased * 0.76
        const pulse = progress === 1 ? 0.92 + Math.sin(elapsed * 2 + particle.phase) * 0.08 : 1
        const drawX = Math.round(x * pixelRatio) / pixelRatio
        const drawY = Math.round(y * pixelRatio) / pixelRatio
        const size = Math.max(
          1 / pixelRatio,
          Math.round(pixelSize * (0.65 + eased * 0.35) * pixelRatio) / pixelRatio
        )

        if (particle.glow) {
          context.globalAlpha = opacity * pulse * 0.55
          context.drawImage(glow, drawX - size * 1.4, drawY - size * 1.4, size * 2.8, size * 2.8)
        }
        context.globalAlpha = opacity * pulse
        context.fillStyle = particle.color
        context.fillRect(drawX - size / 2, drawY - size / 2, size, size)
      }

      context.globalAlpha = 1
      animationFrameId = requestAnimationFrame(animate)
    }

    const handleResize = () => {
      resizeCanvas()
      if (image.complete && image.naturalWidth) createParticles()
    }

    resizeCanvas()
    window.addEventListener("resize", handleResize)
    image.onload = () => {
      if (disposed) return
      createParticles()
      animationFrameId = requestAnimationFrame(animate)
    }
    image.onerror = () => {
      if (disposed) return
      console.error("Unable to load the hero portrait image.")
      hero.classList.add("portrait-fallback")
    }
    image.src = img

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
      image.onload = null
      image.onerror = null
      disposed = true
      hero.classList.remove("portrait-fallback")
    }
  }, [startAnimation])

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
        <canvas ref={canvasRef} className="hero-pixel-canvas" />
        <img ref={portraitImageRef} src={img} alt="Musfiqur Rahim" className="portrait-img" />
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
