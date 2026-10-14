import { useParams, Link, Navigate } from "react-router-dom";
import { Rail, Reveal } from "../components/ui";
import { SYSTEMS } from "../data";

export default function System() {
  const { slug } = useParams();
  const project = SYSTEMS.find((item) => item.slug === slug);
  if (!project) return <Navigate to="/" replace />;
  const next = SYSTEMS[(SYSTEMS.indexOf(project) + 1) % SYSTEMS.length];

  return (
    <div className="lg:flex" style={{ gap: 68 }}>
      <Rail />
      <main style={{ flex: 1, minWidth: 0, paddingBottom: 40 }}>
        <section className="sec" style={{ paddingTop: 64 }}>
          <Reveal>
            <Link to="/" className="mono dimmer">All projects</Link>
            <div className="mono" style={{ color: "var(--mint)", marginTop: 32 }}>{project.kicker}</div>
            <h2 style={{ fontSize: "clamp(1.9rem,3.6vw,2.6rem)", lineHeight: 1.15, letterSpacing: "-.03em", margin: "12px 0" }}>{project.name}</h2>
            <p className="dim" style={{ maxWidth: "60ch" }}>{project.tagline}</p>
            <div className="flex flex-wrap" style={{ gap: 7, marginTop: 22 }}>
              {project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}
            </div>
            {project.github && <a className="btn btn-2" style={{ marginTop: 24 }} href={project.github} target="_blank" rel="noreferrer">View source on GitHub</a>}
          </Reveal>
        </section>
        <section className="sec">
          <Reveal>
            <div className="mono dimmer">Overview</div>
            <p className="dim" style={{ maxWidth: "62ch", marginTop: 12 }}>{project.problem}</p>
            <h2 className="sec-h" style={{ marginTop: 36 }}>What I built</h2>
            {project.highlights.map((highlight, index) => (
              <div className="cap" key={highlight}>
                <span className="mono" style={{ color: "var(--mint)" }}>0{index + 1}</span>
                <p className="dim" style={{ margin: "8px 0 0" }}>{highlight}</p>
              </div>
            ))}
          </Reveal>
          <Reveal style={{ marginTop: 44 }}>
            <Link to={`/systems/${next.slug}`} className="syscard">
              <div className="mono dimmer">Next project</div>
              <div className="flex justify-between items-center" style={{ gap: 16, marginTop: 8 }}>
                <span className="syscard-t">{next.name}</span>
                <span style={{ color: "var(--mint)" }}>&rarr;</span>
              </div>
            </Link>
          </Reveal>
        </section>
      </main>
    </div>
  );
}
