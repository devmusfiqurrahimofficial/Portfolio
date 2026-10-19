import { useEffect, useRef } from "react"
import gsap from "gsap"
import * as THREE from "three"
import img from "./IMG_0713.png"

export function Hero() {
  const heroRef = useRef(null)
  const canvasRef = useRef(null)

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

  // 3D Canvas Scene
  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    )
    camera.position.z = 2.5

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    // Particle Cloud Matrix Creation
    const particleCount = 1800
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const scales = new Float32Array(particleCount)

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 5
      positions[i + 1] = (Math.random() - 0.5) * 5
      positions[i + 2] = (Math.random() - 0.5) * 3
      scales[i / 3] = Math.random() * 0.02 + 0.005
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const material = new THREE.PointsMaterial({
      color: 0xc8f169,
      size: 0.02,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Mouse Pointer Interaction
    let mouseX = 0
    let mouseY = 0
    let targetX = 0
    let targetY = 0

    const handleMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2
    }

    window.addEventListener("pointermove", handleMouseMove)

    // Resize Handler
    const handleResize = () => {
      if (!canvasRef.current) return
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Render Animation Loop
    let animationFrameId
    const clock = new THREE.Clock()

    const animate = () => {
      const elapsedTime = clock.getElapsedTime()

      targetX += (mouseX - targetX) * 0.05
      targetY += (mouseY - targetY) * 0.05

      particles.rotation.y = elapsedTime * 0.08 + targetX * 0.5
      particles.rotation.x = -targetY * 0.5

      const pos = geometry.attributes.position.array
      for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3
        pos[i3 + 1] += Math.sin(elapsedTime + pos[i3]) * 0.001
      }
      geometry.attributes.position.needsUpdate = true

      renderer.render(scene, camera)
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("pointermove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
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
        <canvas ref={canvasRef} className="hero-3d-canvas" />
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
