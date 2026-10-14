import { useState, useEffect, useRef, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { PROFILE, NAV, SYSTEMS } from "../data";

/* ---------------- Reveal on scroll ---------------- */

export function Reveal({ children, className = "", style }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`} data-in={seen} style={style}>
      {children}
    </div>
  );
}

/* ---------------- Cursor spotlight ---------------- */

export function Glow() {
  const [pos, setPos] = useState({ x: -600, y: -600 });

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      className="glow"
      aria-hidden="true"
      style={{
        background: `radial-gradient(560px circle at ${pos.x}px ${pos.y}px, rgba(74,222,155,0.055), transparent 72%)`,
      }}
    />
  );
}

/* ---------------- Interactive trace ----------------
   Renders a staged spine. Any stage with `branches: true`
   renders the chip row; the stage with `selected: true`
   renders the currently-selected branch card.
   --------------------------------------------------- */

export function Trace({ stages, branches }) {
  const [key, setKey] = useState(branches?.[0]?.key);
  const selected = branches?.find((b) => b.key === key) || branches?.[0];

  return (
    <div className="trace">
      <div className="spine">
        <div className="pulse" aria-hidden="true" />
        {stages.map((s) => (
          <div key={s.key} className="stage" data-live={!!(s.branches || s.selected)}>
            <div className="stage-l">{s.label}</div>

            {s.detail && (
              <p className="dim" style={{ margin: "5px 0 0", fontSize: ".92rem", maxWidth: "58ch" }}>
                {s.detail}
              </p>
            )}

            {s.branches && branches && (
              <div className="flex flex-wrap" style={{ gap: 7, marginTop: 10 }}>
                {branches.map((b) => (
                  <button
                    key={b.key}
                    className="chip"
                    data-on={b.key === key}
                    aria-pressed={b.key === key}
                    onClick={() => setKey(b.key)}
                  >
                    {b.chip}
                  </button>
                ))}
              </div>
            )}

            {s.selected && selected && (
              <div className="card" style={{ marginTop: 10, maxWidth: 620 }}>
                <div className="card-t">{selected.title}</div>
                <p className="dim" style={{ margin: "8px 0 13px", fontSize: ".92rem" }}>
                  {selected.body}
                </p>
                <div className="flex flex-wrap" style={{ gap: 6 }}>
                  {selected.tags.map((t) => (
                    <span key={t} className="tag tag-mint">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Trace waterfall ---------------- */

export function Waterfall({ spans, total }) {
  return (
    <div className="trace">
      <div
        className="flex justify-between mono dimmer"
        style={{ gap: 12, paddingBottom: 12, borderBottom: "1px solid var(--line)", marginBottom: 6 }}
      >
        <span>Run trace</span>
        <span style={{ color: "var(--mint)" }}>{total}</span>
      </div>

      {spans.map((s) => (
        <div key={s.label} className="wf-row">
          <div className="wf-label">{s.label}</div>
          <div className="wf-track">
            <div
              className="wf-bar"
              data-quiet={s.model === "—"}
              style={{ left: `${s.start}%`, width: `${s.dur}%` }}
            />
          </div>
          <div className="wf-meta">
            {s.tokens} {s.cost !== "—" && <span style={{ color: "var(--mint)" }}>· {s.cost}</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Threshold table ---------------- */

export function ThresholdTable({ rows }) {
  return (
    <div className="trace">
      {rows.map((r) => (
        <div key={r.label} className="thr-row">
          <span className="thr-label">{r.label}</span>
          <span className="thr-trigger">{r.trigger}</span>
          <p className="thr-note">{r.note}</p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Stat grid ---------------- */

export function StatGrid({ items }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))", gap: 10 }}>
      {items.map((c) => (
        <div key={c.label} className="card">
          <div className="card-t" style={{ fontSize: ".95rem" }}>
            {c.label}
          </div>
          <p className="dim" style={{ margin: "6px 0 0", fontSize: ".88rem" }}>
            {c.body}
          </p>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Retrieval pipelines ----------------
   Tabs switch between pipelines; each shows an ingest
   and query phase as numbered step chains.
   --------------------------------------------------- */

function PhaseSteps({ steps }) {
  return (
    <div className="pl-spine">
      {steps.map((s, i) => (
        <div key={s.step} className="pl-step">
          <div className="pl-num">{String(i + 1).padStart(2, "0")}</div>
          <div className="pl-step-name">{s.step}</div>
          <div className="dimmer" style={{ fontSize: ".82rem", marginTop: 2 }}>
            {s.note}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Pipelines({ title, intro, items, contrast }) {
  const [key, setKey] = useState(items?.[0]?.key);
  const active = items?.find((p) => p.key === key) || items?.[0];

  return (
    <div>
      <div className="mono dimmer">{title}</div>
      <p className="dim" style={{ marginTop: 10, maxWidth: "62ch", fontSize: ".94rem" }}>
        {intro}
      </p>

      <div className="flex flex-wrap" style={{ gap: 7, marginTop: 14 }}>
        {items.map((p) => (
          <button
            key={p.key}
            className="chip"
            data-on={p.key === key}
            aria-pressed={p.key === key}
            onClick={() => setKey(p.key)}
          >
            {p.chip}
          </button>
        ))}
      </div>

      {active && (
        <div className="trace" style={{ marginTop: 14 }}>
          <p className="dim" style={{ margin: "0 0 20px", maxWidth: "62ch", fontSize: ".92rem" }}>
            {active.note}
          </p>

          <div className="pl-grid">
            <div>
              <div className="stage-l" style={{ marginBottom: 16 }}>
                Ingest
              </div>
              <PhaseSteps steps={active.ingest} />
            </div>
            <div>
              <div className="stage-l" style={{ marginBottom: 16 }}>
                Query
              </div>
              <PhaseSteps steps={active.query} />
            </div>
          </div>
        </div>
      )}

      {contrast && (
        <div className="tradeoff" style={{ marginTop: 18, maxWidth: "62ch" }}>
          <div className="tradeoff-l">{contrast.label}</div>
          <p className="dim" style={{ margin: "5px 0 0", fontSize: ".9rem" }}>
            {contrast.body}
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------------- WhatsApp floating button ---------------- */

export function WhatsAppButton() {
  const { whatsapp } = PROFILE;
  if (!whatsapp) return null;

  const href = `https://wa.me/${whatsapp.number}?text=${encodeURIComponent(whatsapp.message)}`;

  return (
    <a href={href} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp" className="wa-fab">
      <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true" focusable="false">
        <path
          fill="currentColor"
          d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.82 11.82 0 00-3.48-8.413"
        />
      </svg>
    </a>
  );
}

/* ---------------- Left rail ---------------- */

export function Rail({ activeSection }) {
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  const go = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <header
      className="rail lg:sticky lg:h-screen lg:flex lg:flex-col lg:justify-between"
      style={{ top: 0, flex: "0 0 330px" }}
    >
      <div>
        <h1 className="rail-name">
          {onHome ? (
            <>
              {PROFILE.name.split(" ")[0]}
              <br />
              {PROFILE.name.split(" ").slice(1).join(" ")}
            </>
          ) : (
            <Link to="/">
              {PROFILE.name.split(" ")[0]}
              <br />
              {PROFILE.name.split(" ").slice(1).join(" ")}
            </Link>
          )}
        </h1>

        <p className="dim" style={{ marginTop: 14, maxWidth: "30ch", fontSize: ".96rem" }}>
          {PROFILE.role}
        </p>
        <div className="mono dimmer" style={{ marginTop: 10 }}>
          {PROFILE.availability}
        </div>

        <nav className="hidden lg:block" style={{ marginTop: 36 }}>
          {onHome ? (
            NAV.map((n) => (
              <button key={n.id} className="navitem" data-on={activeSection === n.id} onClick={() => go(n.id)}>
                <i />
                {n.label}
              </button>
            ))
          ) : (
            <>
              <Link to="/" className="navitem">
                <i />
                Back to overview
              </Link>
              <div style={{ height: 14 }} />
              {SYSTEMS.map((s) => (
                <Link
                  key={s.slug}
                  to={`/systems/${s.slug}`}
                  className="navitem"
                  data-on={pathname === `/systems/${s.slug}`}
                >
                  <i />
                  {s.kicker}
                </Link>
              ))}
            </>
          )}
        </nav>

        <div className="flex flex-wrap" style={{ gap: 10, marginTop: 32 }}>
          <a className="btn" href={PROFILE.resume} download>
            Résumé
          </a>
          <a className="btn btn-2" href={`mailto:${PROFILE.email}`}>
            Email
          </a>
        </div>
      </div>

      <div className="flex rail-social" style={{ marginTop: 28 }}>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            />
          </svg>
        </a>
        <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub profile">
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
            />
          </svg>
        </a>
        <a href={`mailto:${PROFILE.email}`} aria-label={`Email ${PROFILE.name}`}>
          <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">
            <path
              fill="currentColor"
              d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
            />
          </svg>
        </a>
      </div>
    </header>
  );
}
