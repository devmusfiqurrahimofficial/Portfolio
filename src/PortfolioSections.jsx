'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, Code2, Briefcase, Target, Send, ExternalLink } from 'lucide-react';

export default function PortfolioSections() {
  return (
    <div className="relative w-full overflow-hidden bg-slate-950 text-slate-200">
      {/* Ambient background glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-amber-600/10 rounded-full blur-[120px]" />

      {/* SECTION 1: ABOUT ME */}
      <section id="about" className="relative min-h-screen flex items-center justify-center px-6 py-24 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium"
          >
            <Coffee className="w-4 h-4" />
            <span>Coffee with Code</span>
          </motion.div>

          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-white"
          >
            Turning Caffeine & Logic into <span className="text-amber-400">Digital Solutions</span>
          </motion.h2>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto"
          >
            I convert curiosity and fresh brews into scalable, high-performance web applications. 
            Driven by clean architecture, pixel-perfect UI design, and resilient backend systems, 
            I craft modern digital experiences designed to make an impact.
          </motion.p>
        </div>
      </section>

      {/* SECTION 2: PROJECTS */}
      <section id="projects" className="relative min-h-screen flex flex-col justify-center px-6 py-24 border-t border-slate-800/50">
        <div className="max-w-5xl mx-auto w-full space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
              <Code2 className="text-amber-400 w-8 h-8" />
              Featured Projects
            </h2>
            <p className="text-slate-400">Selected work engineered with precision</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'CloudScale Dashboard',
                desc: 'Real-time telemetry and metrics analytics engine monitoring microservices with sub-second update frequency.',
                tech: ['React', 'Tailwind', 'Node.js', 'WebSockets'],
              },
              {
                title: 'FlowCraft AI',
                desc: 'Prompt-based workflow automation web application integrating LLMs for dynamic task management.',
                tech: ['Next.js', 'Python', 'FastAPI', 'PostgreSQL'],
              },
              {
                title: 'Nexus Commerce',
                desc: 'High-concurrency e-commerce storefront with headless checkout and real-time inventory syncing.',
                tech: ['TypeScript', 'GraphQL', 'Redis', 'Stripe'],
              },
            ].map((proj, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                whileHover={{ y: -6 }}
                className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 hover:border-amber-500/40 transition-all group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white group-hover:text-amber-400 transition-colors">
                      {proj.title}
                    </h3>
                    <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors" />
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed">{proj.desc}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-6">
                  {proj.tech.map((t, i) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPERIENCES */}
      <section id="experiences" className="relative min-h-screen flex flex-col justify-center px-6 py-24 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto w-full space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
              <Briefcase className="text-amber-400 w-8 h-8" />
              Work Experience
            </h2>
            <p className="text-slate-400">Career journey and technical contributions</p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 md:before:left-1/2 before:w-0.5 before:bg-slate-800">
            {[
              {
                role: 'Senior Full-Stack Engineer',
                company: 'TechSphere Solutions',
                period: '2023 – Present',
                points: [
                  'Architected resilient micro-frontend applications serving 100k+ daily active users.',
                  'Reduced backend latency by 40% through redis caching layers and query optimization.',
                ],
              },
              {
                role: 'Frontend Developer',
                company: 'PixelCraft Media',
                period: '2021 – 2023',
                points: [
                  'Built reusable component libraries used across 5 core company applications.',
                  'Collaborated closely with designers to implement smooth 60fps web animations.',
                ],
              },
            ].map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="relative flex flex-col md:flex-row items-start md:items-center group"
              >
                <div className="md:w-1/2 md:pr-12 md:text-right pl-10 md:pl-0 space-y-1">
                  <span className="text-xs font-mono text-amber-400">{exp.period}</span>
                  <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                  <p className="text-slate-400 text-sm">{exp.company}</p>
                </div>
                
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-900 border-2 border-amber-400 group-hover:scale-125 transition-transform" />

                <div className="md:w-1/2 md:pl-12 pl-10 mt-3 md:mt-0">
                  <ul className="space-y-2 text-slate-400 text-sm list-disc list-inside">
                    {exp.points.map((pt, i) => (
                      <li key={i}>{pt}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 4: GOAL */}
      <section id="goal" className="relative min-h-screen flex flex-col justify-center px-6 py-24 border-t border-slate-800/50">
        <div className="max-w-4xl mx-auto w-full space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-bold text-white flex items-center justify-center gap-3">
              <Target className="text-amber-400 w-8 h-8" />
              Future Roadmap
            </h2>
            <p className="text-slate-400">Where I'm channeling my focus next</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: 'Scalable Systems', desc: 'Deepening expertise in distributed systems, event-driven architectures, and high-load backend design.' },
              { title: 'AI & Machine Learning', desc: 'Integrating intelligent LLM agents and predictive models directly into everyday web software workflows.' },
              { title: 'Fluid Creative Web', desc: 'Mastering WebGL, Three.js, and interactive canvas graphics for next-generation browser experiences.' },
            ].map((g, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 bg-slate-900/40 border border-slate-800 rounded-2xl space-y-3 hover:border-amber-500/30 transition-colors"
              >
                <div className="text-amber-400 font-mono text-sm">0{idx + 1}.</div>
                <h3 className="text-lg font-semibold text-white">{g.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{g.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5: CONTACT */}
      <section id="contact" className="relative min-h-screen flex flex-col justify-center px-6 py-24 border-t border-slate-800/50">
        <div className="max-w-3xl mx-auto w-full space-y-10">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-5xl font-bold text-white">Let's Brew Something Together</h2>
            <p className="text-slate-400">Have an idea or want to connect over a virtual coffee? Send a message below.</p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4 bg-slate-900/50 border border-slate-800 p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">NAME</label>
                <input type="text" placeholder="Your Name" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
              <div>
                <label className="block text-xs font-mono text-slate-400 mb-2">EMAIL</label>
                <input type="email" placeholder="you@example.com" className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-2">MESSAGE</label>
              <textarea rows={4} placeholder="Tell me about your project..." className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 resize-none" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-semibold rounded-lg transition-colors flex items-center justify-center gap-2">
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>

          <div className="flex items-center justify-center gap-6 pt-4 text-slate-400">
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-amber-400 transition-colors">GitHub</a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-amber-400 transition-colors">LinkedIn</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter" className="hover:text-amber-400 transition-colors">Twitter</a>
          </div>
        </div>
      </section>
    </div>
  );
}
