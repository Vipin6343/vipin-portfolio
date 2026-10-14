import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rail, Reveal } from "../components/ui";
import {
  PROFILE,
  NAV,
  STATS,
  CAPABILITIES,
  SYSTEMS,
  EXPERIENCE,
  EDUCATION,
  STACK,
} from "../data";

export default function Home() {
  const [active, setActive] = useState("overview");

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="lg:flex" style={{ gap: 68 }}>
      <Rail activeSection={active} />

      <main style={{ flex: 1, minWidth: 0, paddingBottom: 40 }}>
        {/* ---------- overview ---------- */}
        <section id="overview" className="sec" style={{ paddingTop: 64 }}>
          <Reveal>
            <p className="lead" style={{ margin: 0, maxWidth: "22ch" }}>
              I build <em>AI features</em> and everything they run on.
            </p>
            <p className="dim" style={{ marginTop: 20, maxWidth: "60ch" }}>
              I'm Vipin, a Full Stack AI Developer building e-commerce applications and
              LLM-powered workflows. I work with Python, FastAPI, React, and MongoDB,
              bringing conversational agents, retrieval, and automation into practical applications.
            </p>

            <div className="flex" style={{ gap: 10, marginTop: 28 }}>
              {STATS.map((s) => (
                <div key={s.label} className="statbox">
                  <b>{s.value}</b>
                  <span className="mono dimmer" style={{ fontSize: ".62rem" }}>
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal style={{ marginTop: 44 }}>
            <div className="mono dimmer">What I do</div>
            <p className="dim" style={{ marginTop: 10, maxWidth: "60ch", fontSize: ".95rem" }}>
              My work spans AI agent services, backend APIs, product data pipelines,
              and responsive interfaces for e-commerce workflows.
            </p>
            <div style={{ marginTop: 22 }}>
              {CAPABILITIES.map((c) => (
                <div key={c.title} className="cap">
                  <div className="cap-t">{c.title}</div>
                  <p className="dim" style={{ margin: "6px 0 0", fontSize: ".94rem" }}>
                    {c.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </section>

        {/* ---------- systems ---------- */}
        <section id="systems" className="sec">
          <Reveal>
            <div className="mono dimmer">Projects</div>
            <h2 className="sec-h" style={{ margin: "10px 0 0", maxWidth: "24ch" }}>
              Four projects, from retrieval to agents.
            </h2>
            <p className="dim" style={{ marginTop: 12, maxWidth: "58ch", fontSize: ".95rem" }}>
              Explore the tools, features, and contributions behind each project.
            </p>
          </Reveal>

          <div style={{ marginTop: 26, display: "flex", flexDirection: "column", gap: 12 }}>
            {SYSTEMS.map((s) => (
              <Reveal key={s.slug}>
                <Link to={`/systems/${s.slug}`} className="syscard">
                  <div className="flex justify-between items-start" style={{ gap: 16 }}>
                    <div style={{ minWidth: 0 }}>
                      <div className="mono dimmer">{s.kicker}</div>
                      <div className="syscard-t" style={{ marginTop: 5 }}>
                        {s.name}
                      </div>
                    </div>
                    <span className="syscard-arrow mono" style={{ color: "var(--mint)" }}>
                      →
                    </span>
                  </div>
                  <p className="dim" style={{ margin: "10px 0 14px", fontSize: ".94rem", maxWidth: "62ch" }}>
                    {s.tagline}
                  </p>
                  <div className="flex flex-wrap" style={{ gap: 6 }}>
                    {s.tags.slice(0, 5).map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------- experience ---------- */}
        <section id="experience" className="sec">
          <Reveal>
            <div className="mono dimmer">Experience</div>
            <h2 className="sec-h" style={{ margin: "10px 0 26px" }}>
              From internship to full stack AI development.
            </h2>
          </Reveal>

          {EXPERIENCE.map((j) => (
            <Reveal key={j.role}>
              <article className="job md:flex" style={{ gap: 26, marginBottom: 6 }}>
                <div className="mono dimmer" style={{ flex: "0 0 132px", paddingTop: 5 }}>
                  {j.period}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 className="job-c">{j.company}</h3>
                  {j.unit && (
                    <div className="mono dimmer" style={{ marginTop: 3 }}>
                      {j.unit}
                    </div>
                  )}
                  <div className="job-r" style={{ marginTop: 8 }}>
                    {j.role}
                  </div>
                  {j.note && (
                    <div className="mono dimmer" style={{ marginTop: 3 }}>
                      {j.note}
                    </div>
                  )}

                  <ul className="bul">
                    {j.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap" style={{ gap: 6, marginTop: 12 }}>
                    {j.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}

          <h2 className="sec-h" style={{ marginTop: 36 }}>Education</h2>
          {EDUCATION.map((education) => (
          <Reveal key={education.title}>
            <article className="job md:flex" style={{ gap: 26 }}>
              <div className="mono dimmer" style={{ flex: "0 0 132px", paddingTop: 5 }}>
                {education.period}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3 className="job-c">{education.title}</h3>
                <div className="dim" style={{ marginTop: 6, fontSize: ".94rem" }}>
                  {education.detail}
                </div>
              </div>
            </article>
          </Reveal>
          ))}
        </section>

        {/* ---------- stack ---------- */}
        <section id="stack" className="sec">
          <Reveal>
            <div className="mono dimmer">Stack</div>
            <h2 className="sec-h" style={{ margin: "10px 0 24px" }}>
              What I reach for.
            </h2>
            {STACK.map((g) => (
              <div
                key={g.label}
                className="md:flex"
                style={{ gap: 26, borderTop: "1px solid var(--line)", padding: "16px 0" }}
              >
                <div className="mono dimmer" style={{ flex: "0 0 132px" }}>
                  {g.label}
                </div>
                <div className="flex flex-wrap" style={{ gap: 7, flex: 1 }}>
                  {g.items.map((i) => (
                    <span key={i} className="tag">
                      {i}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ---------- contact ---------- */}
        <section id="contact" className="sec">
          <Reveal>
            <div className="mono dimmer">Contact</div>
            <h2 className="sec-h" style={{ margin: "10px 0 0", maxWidth: "20ch" }}>
              Let's talk about full stack and AI development.
            </h2>
            <p className="dim" style={{ marginTop: 12, maxWidth: "52ch", fontSize: ".95rem" }}>
              Get in touch to discuss my projects, e-commerce workflows, or AI applications.
            </p>

            <div style={{ marginTop: 26 }}>
              <a className="clink" href={`mailto:${PROFILE.email}`}>
                <span className="mono dimmer">Email</span>
                <span className="cval">{PROFILE.email}</span>
              </a>
              <a className="clink" href={`tel:${PROFILE.phone.replace(/\s/g, "")}`}>
                <span className="mono dimmer">Phone</span>
                <span className="cval">{PROFILE.phone}</span>
              </a>
              <a className="clink" href={PROFILE.linkedin} target="_blank" rel="noreferrer">
                <span className="mono dimmer">LinkedIn</span>
                <span className="cval">{PROFILE.linkedinLabel}</span>
              </a>
              {[['GitHub', PROFILE.github, 'Vipin6343'], ['LeetCode', PROFILE.leetcode, 'vipin_yadav900'], ['GeeksforGeeks', PROFILE.gfg, 'Coding profile']].map(([label, href, text]) => (
                <a key={label} className="clink" href={href} target="_blank" rel="noreferrer">
                  <span className="mono dimmer">{label}</span>
                  <span className="cval">{text}</span>
                </a>
              ))}
              <a className="clink" href={PROFILE.resume} download>
                <span className="mono dimmer">Résumé</span>
                <span className="cval">Download CV (PDF)</span>
              </a>
            </div>

            <div
              className="mono dimmer flex flex-wrap justify-between"
              style={{ marginTop: 56, gap: 12, borderTop: "1px solid var(--line)", paddingTop: 18 }}
            >
              <span>Built with React, Tailwind and Vite</span>
              <span>© {new Date().getFullYear()}</span>
            </div>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
