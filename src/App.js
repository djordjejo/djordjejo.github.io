import { useState, useEffect, useRef } from "react";

const TEAL = "#00D4B4";
const NAVY = "#0A0F1E";
const NAVY2 = "#111827";
const NAVY3 = "#1a2235";
const WHITE = "#F0F4FF";
const GRAY = "#8892A4";
const BORDER = "#1e2d45";

const terminalLines = [
  { text: "$ running test suite: JobAlert.Selenium.Tests", delay: 0, color: GRAY },
  { text: "", delay: 400 },
  { text: "[PASS] TC-001 — Joberty page loads within 3s", delay: 800, color: TEAL },
  { text: "[PASS] TC-002 — Job listings render correctly", delay: 1300, color: TEAL },
  { text: "[PASS] TC-003 — Filter by location returns valid results", delay: 1800, color: TEAL },
  { text: "[WARN] TC-004 — HelloWorld API rate limit triggered", delay: 2300, color: "#F59E0B" },
  { text: "[PASS] TC-005 — Retry logic handles 429 gracefully", delay: 2900, color: TEAL },
  { text: "[PASS] TC-006 — CSV export contains all required fields", delay: 3400, color: TEAL },
  { text: "[PASS] TC-007 — Duplicate jobs filtered before export", delay: 3900, color: TEAL },
  { text: "", delay: 4400 },
  { text: "7 tests run · 6 passed · 1 warning · 0 failed", delay: 4600, color: WHITE },
  { text: `✓ All critical paths verified`, delay: 5100, color: TEAL },
];

function TerminalLine({ line, visible }) {
  if (!visible) return null;
  return (
    <div style={{
      fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
      fontSize: "13px",
      lineHeight: "1.8",
      color: line.color || GRAY,
      minHeight: "24px",
    }}>
      {line.text}
    </div>
  );
}

function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    terminalLines.forEach((line, i) => {
      setTimeout(() => setVisibleCount(c => Math.max(c, i + 1)), line.delay);
    });
  }, [started]);

  return (
    <div ref={ref} style={{
      background: "#060C18",
      border: `1px solid ${BORDER}`,
      borderRadius: "12px",
      overflow: "hidden",
      maxWidth: "580px",
      margin: "0 auto",
      boxShadow: `0 0 60px rgba(0,212,180,0.08)`,
    }}>
      {/* Window chrome */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "8px",
        padding: "12px 16px",
        borderBottom: `1px solid ${BORDER}`,
        background: "#0d1526",
      }}>
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FF5F57" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#FFBD2E" }} />
        <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28C840" }} />
        <span style={{ marginLeft: 8, fontFamily: "monospace", fontSize: 12, color: GRAY }}>
          test-runner — bash
        </span>
      </div>
      {/* Terminal body */}
      <div style={{ padding: "20px 24px", minHeight: "280px" }}>
        {terminalLines.map((line, i) => (
          <TerminalLine key={i} line={line} visible={i < visibleCount} />
        ))}
        {visibleCount < terminalLines.length && started && (
          <span style={{
            display: "inline-block",
            width: 8,
            height: 16,
            background: TEAL,
            animation: "blink 1s step-end infinite",
            verticalAlign: "middle",
          }} />
        )}
      </div>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "4px 12px",
      borderRadius: "999px",
      border: `1px solid ${BORDER}`,
      fontSize: "12px",
      color: GRAY,
      fontFamily: "'JetBrains Mono', monospace",
      letterSpacing: "0.02em",
    }}>
      {children}
    </span>
  );
}

function SkillPill({ children }) {
  return (
    <span style={{
      display: "inline-block",
      padding: "6px 14px",
      borderRadius: "6px",
      background: NAVY3,
      border: `1px solid ${BORDER}`,
      fontSize: "13px",
      color: WHITE,
      margin: "4px",
      fontFamily: "'Inter', sans-serif",
    }}>
      {children}
    </span>
  );
}

function CaseStudy({ number, title, subtitle, tags, sections }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{
      border: `1px solid ${BORDER}`,
      borderRadius: "12px",
      overflow: "hidden",
      marginBottom: "24px",
      background: NAVY2,
      transition: "border-color 0.2s",
    }}
      onMouseEnter={e => e.currentTarget.style.borderColor = TEAL}
      onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}
    >
      <div style={{ padding: "28px 32px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TEAL, marginBottom: 8, letterSpacing: "0.1em" }}>
              CASE STUDY {number}
            </div>
            <h3 style={{ fontSize: "22px", fontWeight: 700, color: WHITE, margin: "0 0 6px", fontFamily: "'Space Grotesk', sans-serif" }}>
              {title}
            </h3>
            <p style={{ fontSize: "14px", color: GRAY, margin: "0 0 16px", fontFamily: "'Inter', sans-serif" }}>
              {subtitle}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {tags.map(t => <Badge key={t}>{t}</Badge>)}
            </div>
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            style={{
              padding: "10px 20px",
              background: "transparent",
              border: `1px solid ${TEAL}`,
              borderRadius: "8px",
              color: TEAL,
              fontSize: "13px",
              cursor: "pointer",
              fontFamily: "'Inter', sans-serif",
              whiteSpace: "nowrap",
              flexShrink: 0,
            }}
          >
            {open ? "Hide details ↑" : "View details ↓"}
          </button>
        </div>
      </div>

      {open && (
        <div style={{ borderTop: `1px solid ${BORDER}`, padding: "28px 32px", background: "#0d1526" }}>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: i < sections.length - 1 ? 28 : 0 }}>
              <div style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: TEAL, letterSpacing: "0.1em", marginBottom: 10 }}>
                {s.label}
              </div>
              {s.content}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TestTable({ cases }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "13px", fontFamily: "'Inter', sans-serif" }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${BORDER}` }}>
            {["ID", "Description", "Expected", "Status"].map(h => (
              <th key={h} style={{ padding: "8px 12px", textAlign: "left", color: GRAY, fontWeight: 500, whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map((c, i) => (
            <tr key={i} style={{ borderBottom: `1px solid ${BORDER}` }}>
              <td style={{ padding: "10px 12px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TEAL }}>{c.id}</td>
              <td style={{ padding: "10px 12px", color: WHITE }}>{c.desc}</td>
              <td style={{ padding: "10px 12px", color: GRAY }}>{c.expected}</td>
              <td style={{ padding: "10px 12px" }}>
                <span style={{
                  padding: "2px 10px",
                  borderRadius: "999px",
                  fontSize: 11,
                  fontFamily: "'JetBrains Mono', monospace",
                  background: c.status === "PASS" ? "rgba(0,212,180,0.1)" : c.status === "WARN" ? "rgba(245,158,11,0.1)" : "rgba(239,68,68,0.1)",
                  color: c.status === "PASS" ? TEAL : c.status === "WARN" ? "#F59E0B" : "#EF4444",
                  border: `1px solid ${c.status === "PASS" ? "rgba(0,212,180,0.3)" : c.status === "WARN" ? "rgba(245,158,11,0.3)" : "rgba(239,68,68,0.3)"}`,
                }}>
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BugReport({ bug }) {
  return (
    <div style={{ background: "#0A0F1E", border: `1px solid rgba(239,68,68,0.2)`, borderRadius: 8, padding: "16px 20px" }}>
      {Object.entries(bug).map(([k, v]) => (
        <div key={k} style={{ display: "flex", gap: 16, marginBottom: 8, fontSize: 13, fontFamily: "'Inter', sans-serif" }}>
          <span style={{ color: GRAY, minWidth: 120, flexShrink: 0, fontFamily: "'JetBrains Mono', monospace", fontSize: 11 }}>{k}</span>
          <span style={{ color: WHITE }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

const jobAlertSections = [
  {
    label: "OVERVIEW",
    content: (
      <p style={{ color: GRAY, fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: "'Inter', sans-serif" }}>
        JobAlert is a C# Selenium-based web scraper that aggregates job listings from Serbian job boards Joberty and HelloWorld.
        The testing strategy covered functional correctness, edge case handling, retry logic, and data integrity of the CSV export pipeline.
      </p>
    )
  },
  {
    label: "TEST CASES",
    content: (
      <TestTable cases={[
        { id: "TC-001", desc: "Joberty page loads successfully", expected: "HTTP 200, DOM ready < 3s", status: "PASS" },
        { id: "TC-002", desc: "Job listings render with required fields", expected: "Title, company, location present", status: "PASS" },
        { id: "TC-003", desc: "Location filter returns valid results", expected: "All results match filter criteria", status: "PASS" },
        { id: "TC-004", desc: "HelloWorld API rate limit handling", expected: "429 triggers retry after backoff", status: "WARN" },
        { id: "TC-005", desc: "Retry logic recovers from 429", expected: "Request succeeds on retry", status: "PASS" },
        { id: "TC-006", desc: "CSV export contains all required fields", expected: "Title, URL, date, source in every row", status: "PASS" },
        { id: "TC-007", desc: "Duplicate job entries are filtered", expected: "No duplicate URLs in output", status: "PASS" },
      ]} />
    )
  },
  {
    label: "BUG REPORT",
    content: (
      <BugReport bug={{
        "BUG-001": "",
        "Title": "HelloWorld scraper fails silently on rate limit without retry",
        "Severity": "High",
        "Steps": "1. Run scraper with > 50 requests/min  2. Observe HelloWorld requests",
        "Expected": "Scraper detects 429, waits, retries automatically",
        "Actual": "Scraper silently skips listings, no error logged, incomplete CSV output",
        "Fix": "Implemented exponential backoff with max 3 retries and structured error logging",
        "Status": "Resolved",
      }} />
    )
  }
];

const emsSections = [
  {
    label: "OVERVIEW",
    content: (
      <p style={{ color: GRAY, fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: "'Inter', sans-serif" }}>
        Employee Management System is an Azure Functions (.NET 8) API built with Clean Architecture, CQRS/MediatR, and EF Core.
        Testing covered REST API endpoints, business rule validation, duplicate prevention logic, and integration with Azure infrastructure.
      </p>
    )
  },
  {
    label: "TEST CASES",
    content: (
      <TestTable cases={[
        { id: "TC-001", desc: "POST /employees creates valid employee", expected: "201 Created, correct response body", status: "PASS" },
        { id: "TC-002", desc: "POST with duplicate email rejected", expected: "409 Conflict returned", status: "PASS" },
        { id: "TC-003", desc: "POST with duplicate JMBG rejected", expected: "409 Conflict returned", status: "PASS" },
        { id: "TC-004", desc: "GET /employees returns paginated list", expected: "200 OK, correct pagination metadata", status: "PASS" },
        { id: "TC-005", desc: "PUT /employees updates existing record", expected: "200 OK, updated fields in response", status: "PASS" },
        { id: "TC-006", desc: "DELETE non-existent employee", expected: "404 Not Found", status: "PASS" },
        { id: "TC-007", desc: "FluentValidation rejects empty name field", expected: "400 Bad Request with field errors", status: "PASS" },
        { id: "TC-008", desc: "CQRS handler isolation — no cross-handler state", expected: "Handlers process independently", status: "PASS" },
      ]} />
    )
  },
  {
    label: "BUG REPORT",
    content: (
      <BugReport bug={{
        "BUG-001": "",
        "Title": "Duplicate check doesn't account for soft-deleted records",
        "Severity": "Medium",
        "Steps": "1. Create employee  2. Soft-delete employee  3. Create new employee with same email",
        "Expected": "New employee created successfully (deleted record should not block)",
        "Actual": "409 Conflict thrown — soft-deleted record treated as active",
        "Fix": "Updated duplicate check query to filter out IsDeleted = true records",
        "Status": "Resolved",
      }} />
    )
  }
];

const nexusChatSections = [
  {
    label: "OVERVIEW",
    content: (
      <p style={{ color: GRAY, fontSize: 14, lineHeight: 1.7, margin: 0, fontFamily: "'Inter', sans-serif" }}>
        NexusChat is a real-time chat application built with ASP.NET Core, SignalR, Clean Architecture, and React.
        Testing covered WebSocket connection lifecycle, real-time message delivery, online presence tracking,
        typing indicators, JWT authentication flows, and cross-tab session consistency.
      </p>
    )
  },
  {
    label: "TEST CASES",
    content: (
      <TestTable cases={[
        { id: "TC-001", desc: "SignalR connection establishes on login", expected: "Hub connected within 2s", status: "PASS" },
        { id: "TC-002", desc: "Message delivered in real-time to all group members", expected: "All recipients receive message < 500ms", status: "PASS" },
        { id: "TC-003", desc: "Online presence updates on connect/disconnect", expected: "User list reflects current state", status: "PASS" },
        { id: "TC-004", desc: "Typing indicator appears and disappears correctly", expected: "Indicator shows after keypress, hides after 2s", status: "PASS" },
        { id: "TC-005", desc: "JWT expiry forces re-authentication", expected: "User redirected to login on token expiry", status: "PASS" },
        { id: "TC-006", desc: "Cross-tab logout syncs via localStorage event", expected: "All tabs log out simultaneously", status: "PASS" },
        { id: "TC-007", desc: "Unread message counter increments correctly", expected: "Counter updates without page refresh", status: "PASS" },
        { id: "TC-008", desc: "Delete message returns 404 for non-existent ID", expected: "404 Not Found with error body", status: "PASS" },
      ]} />
    )
  },
  {
    label: "BUG REPORT",
    content: (
      <BugReport bug={{
        "BUG-001": "",
        "Title": "Cross-tab logout not triggered — auth state desync between tabs",
        "Severity": "High",
        "Steps": "1. Open app in two tabs  2. Log out in tab 1  3. Observe tab 2",
        "Expected": "Tab 2 redirects to login automatically",
        "Actual": "Tab 2 remains logged in with stale JWT, API calls start failing with 401",
        "Fix": "Added window.addEventListener('storage') to detect localStorage auth changes and trigger logout across all tabs",
        "Status": "Resolved",
      }} />
    )
  }
];

const skills = {
  "Automation": ["Selenium WebDriver", "C# xUnit", "Page Object Model", "NUnit"],
  "API Testing": ["Postman", "REST Assured", "HTTP status validation", "Payload inspection"],
  "Manual Testing": ["Test case design", "Exploratory testing", "Bug reporting", "Regression testing"],
  "Dev Stack": ["C# / .NET 8", "ASP.NET Core", "React", "SQL Server", "EF Core"],
  "Tools": ["JIRA", "Git / GitHub", "Azure Functions", "Visual Studio"],
};

export default function QAPortfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: NAVY, minHeight: "100vh", color: WHITE, fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${NAVY}; }
        ::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 3px; }
        a { color: ${TEAL}; text-decoration: none; }
        a:hover { text-decoration: underline; }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: "rgba(10,15,30,0.92)", backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${BORDER}`,
        padding: "0 32px", height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: TEAL }}>
          djordje.qa
        </span>
        <div style={{ display: "flex", gap: 28 }}>
          {["about", "work", "skills", "contact"].map(s => (
            <button key={s} onClick={() => scrollTo(s)} style={{
              background: "none", border: "none", color: GRAY, fontSize: 13,
              cursor: "pointer", fontFamily: "'Inter', sans-serif",
              letterSpacing: "0.05em", textTransform: "uppercase",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = WHITE}
              onMouseLeave={e => e.target.style.color = GRAY}
            >
              {s}
            </button>
          ))}
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        padding: "100px 32px 60px", maxWidth: 1100, margin: "0 auto",
        gap: 60, flexWrap: "wrap",
      }}>
        <div style={{ flex: "1 1 340px", animation: "fadeUp 0.8s ease both" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "6px 14px", borderRadius: 999,
            border: `1px solid rgba(0,212,180,0.3)`,
            background: "rgba(0,212,180,0.05)",
            marginBottom: 24,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: TEAL, display: "inline-block" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: TEAL }}>
              Available for work
            </span>
          </div>

          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontWeight: 700, lineHeight: 1.1,
            color: WHITE, marginBottom: 20,
          }}>
            Djordje<br />
            <span style={{ color: TEAL }}>Jovanovic</span>
          </h1>

          <p style={{
            fontSize: 16, color: GRAY, lineHeight: 1.7, marginBottom: 32,
            maxWidth: 420,
          }}>
            QA Engineer & Full-Stack Developer. I build software and break it on purpose —
            so your users don't have to find the bugs first.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => scrollTo("work")} style={{
              padding: "12px 24px", background: TEAL, border: "none",
              borderRadius: 8, color: NAVY, fontSize: 14, fontWeight: 600,
              cursor: "pointer", fontFamily: "'Inter', sans-serif",
            }}>
              View case studies
            </button>
            <a href="https://github.com/djordjejo" target="_blank" rel="noreferrer" style={{
              padding: "12px 24px", background: "transparent",
              border: `1px solid ${BORDER}`, borderRadius: 8,
              color: WHITE, fontSize: 14, textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
              display: "inline-flex", alignItems: "center", gap: 8,
            }}>
              GitHub ↗
            </a>
          </div>
        </div>

        <div style={{ flex: "1 1 400px", animation: "fadeUp 0.8s 0.2s ease both", opacity: 0, animationFillMode: "forwards" }}>
          <Terminal />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" style={{ padding: "80px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 60 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEAL, letterSpacing: "0.15em", marginBottom: 20 }}>
            ABOUT
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 48 }}>
            <div>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, color: WHITE, marginBottom: 16 }}>
                I find the bugs<br />before your users do.
              </h2>
              <p style={{ color: GRAY, lineHeight: 1.8, fontSize: 15 }}>
                Final-year student at VISER Belgrade with hands-on experience in QA automation and full-stack development.
                My background in both building and testing software means I understand why bugs happen — not just that they do.
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { label: "Automation", value: "Selenium C# · Page Object Model" },
                { label: "Testing", value: "Manual · Exploratory · API · Regression" },
                { label: "Dev Stack", value: ".NET 8 · React · SQL Server · Azure" },
                { label: "Location", value: "Belgrade, Serbia · Available remote" },
              ].map(item => (
                <div key={item.label} style={{
                  display: "flex", gap: 16, alignItems: "flex-start",
                  padding: "14px 0", borderBottom: `1px solid ${BORDER}`,
                }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEAL, minWidth: 90, paddingTop: 2 }}>
                    {item.label.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 14, color: WHITE }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" style={{ padding: "80px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 60 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEAL, letterSpacing: "0.15em", marginBottom: 12 }}>
            CASE STUDIES
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, color: WHITE, marginBottom: 40 }}>
            Real projects. Real tests.
          </h2>
          <CaseStudy
            number="01"
            title="JobAlert — Selenium Automation"
            subtitle="C# web scraper with automated test suite covering scraping, retry logic, and data export"
            tags={["Selenium", "C#", "xUnit", "Automation"]}
            sections={jobAlertSections}
          />
          <CaseStudy
            number="02"
            title="Employee Management System — API Testing"
            subtitle="Azure Functions REST API tested end-to-end: CRUD, validation, duplicate prevention, error handling"
            tags={["REST API", "Manual Testing", "Postman", ".NET 8", "Azure"]}
            sections={emsSections}
          />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={{ padding: "80px 32px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 60 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEAL, letterSpacing: "0.15em", marginBottom: 12 }}>
            SKILLS
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 32, fontWeight: 700, color: WHITE, marginBottom: 40 }}>
            Stack & tooling
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {Object.entries(skills).map(([category, items]) => (
              <div key={category} style={{
                background: NAVY2, border: `1px solid ${BORDER}`,
                borderRadius: 12, padding: "20px 24px",
              }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEAL, letterSpacing: "0.1em", marginBottom: 14 }}>
                  {category.toUpperCase()}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {items.map(s => <SkillPill key={s}>{s}</SkillPill>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "80px 32px 120px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 60, textAlign: "center" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 11, color: TEAL, letterSpacing: "0.15em", marginBottom: 20 }}>
            CONTACT
          </div>
          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(28px, 4vw, 42px)", fontWeight: 700, color: WHITE, marginBottom: 16 }}>
            Let's work together
          </h2>
          <p style={{ color: GRAY, fontSize: 16, marginBottom: 40, maxWidth: 480, margin: "0 auto 40px" }}>
            Available for QA automation, manual testing, and full-stack development projects.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <a href="mailto:dj.jovanovic6@gmail.com" style={{
              padding: "14px 28px", background: TEAL, borderRadius: 8,
              color: NAVY, fontSize: 14, fontWeight: 600, textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
            }}>
              dj.jovanovic6@gmail.com
            </a>
            <a href="https://linkedin.com/in/djordje-jovanovic-55b1702a6" target="_blank" rel="noreferrer" style={{
              padding: "14px 28px", background: "transparent",
              border: `1px solid ${BORDER}`, borderRadius: 8,
              color: WHITE, fontSize: 14, textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
            }}>
              LinkedIn ↗
            </a>
            <a href="https://github.com/djordjejo" target="_blank" rel="noreferrer" style={{
              padding: "14px 28px", background: "transparent",
              border: `1px solid ${BORDER}`, borderRadius: 8,
              color: WHITE, fontSize: 14, textDecoration: "none",
              fontFamily: "'Inter', sans-serif",
            }}>
              GitHub ↗
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        borderTop: `1px solid ${BORDER}`,
        padding: "20px 32px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 12,
      }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: GRAY }}>
          djordje.qa
        </span>
        <span style={{ fontSize: 12, color: GRAY }}>
          Belgrade, Serbia · {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
