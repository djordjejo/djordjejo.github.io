import Navbar from '../components/Navbar'
import Terminal from '../components/Terminal'
import SkillsSection from '../components/SkillsSection'
import Contact from '../components/Contact'
import CaseStudy, { TestTable, BugReport } from '../components/CaseStudy'
import type { Section } from '../components/CaseStudy'

const jobAlertSections: Section[] = [
  {
    label: 'OVERVIEW',
    content: (
      <p className="text-gray-400 text-sm leading-7">
        JobAlert is a C# Selenium-based web scraper that aggregates job listings from Serbian job boards Joberty and HelloWorld.
        The testing strategy covered functional correctness, edge case handling, retry logic, and data integrity of the CSV export pipeline.
      </p>
    )
  },
  {
    label: 'TEST CASES',
    content: (
      <TestTable cases={[
        { id: 'TC-001', desc: 'Joberty page loads successfully', expected: 'HTTP 200, DOM ready < 3s', status: 'PASS' },
        { id: 'TC-002', desc: 'Job listings render with required fields', expected: 'Title, company, location present', status: 'PASS' },
        { id: 'TC-003', desc: 'Location filter returns valid results', expected: 'All results match filter criteria', status: 'PASS' },
        { id: 'TC-004', desc: 'HelloWorld API rate limit handling', expected: '429 triggers retry after backoff', status: 'WARN' },
        { id: 'TC-005', desc: 'Retry logic recovers from 429', expected: 'Request succeeds on retry', status: 'PASS' },
        { id: 'TC-006', desc: 'CSV export contains all required fields', expected: 'Title, URL, date, source in every row', status: 'PASS' },
        { id: 'TC-007', desc: 'Duplicate job entries are filtered', expected: 'No duplicate URLs in output', status: 'PASS' },
      ]} />
    )
  },
  {
    label: 'BUG REPORT',
    content: (
      <BugReport bug={{
        'BUG-001': '',
        'Title': 'HelloWorld scraper fails silently on rate limit without retry',
        'Severity': 'High',
        'Steps': '1. Run scraper with > 50 requests/min  2. Observe HelloWorld requests',
        'Expected': 'Scraper detects 429, waits, retries automatically',
        'Actual': 'Scraper silently skips listings, no error logged, incomplete CSV output',
        'Fix': 'Implemented exponential backoff with max 3 retries and structured error logging',
        'Status': 'Resolved',
      }} />
    )
  }
]

const emsSections: Section[] = [
  {
    label: 'OVERVIEW',
    content: (
      <p className="text-gray-400 text-sm leading-7">
        Employee Management System is an Azure Functions (.NET 8) API built with Clean Architecture, CQRS/MediatR, and EF Core.
        Testing covered REST API endpoints, business rule validation, duplicate prevention logic, and integration with Azure infrastructure.
      </p>
    )
  },
  {
    label: 'TEST CASES',
    content: (
      <TestTable cases={[
        { id: 'TC-001', desc: 'POST /employees creates valid employee', expected: '201 Created, correct response body', status: 'PASS' },
        { id: 'TC-002', desc: 'POST with duplicate email rejected', expected: '409 Conflict returned', status: 'PASS' },
        { id: 'TC-003', desc: 'POST with duplicate JMBG rejected', expected: '409 Conflict returned', status: 'PASS' },
        { id: 'TC-004', desc: 'GET /employees returns paginated list', expected: '200 OK, correct pagination metadata', status: 'PASS' },
        { id: 'TC-005', desc: 'PUT /employees updates existing record', expected: '200 OK, updated fields in response', status: 'PASS' },
        { id: 'TC-006', desc: 'DELETE non-existent employee', expected: '404 Not Found', status: 'PASS' },
        { id: 'TC-007', desc: 'FluentValidation rejects empty name field', expected: '400 Bad Request with field errors', status: 'PASS' },
        { id: 'TC-008', desc: 'CQRS handler isolation — no cross-handler state', expected: 'Handlers process independently', status: 'PASS' },
      ]} />
    )
  },
  {
    label: 'BUG REPORT',
    content: (
      <BugReport bug={{
        'BUG-001': '',
        'Title': 'Duplicate check does not account for soft-deleted records',
        'Severity': 'Medium',
        'Steps': '1. Create employee  2. Soft-delete employee  3. Create new employee with same email',
        'Expected': 'New employee created successfully (deleted record should not block)',
        'Actual': '409 Conflict thrown — soft-deleted record treated as active',
        'Fix': 'Updated duplicate check query to filter out IsDeleted = true records',
        'Status': 'Resolved',
      }} />
    )
  }
]

const nexusChatSections: Section[] = [
  {
    label: 'OVERVIEW',
    content: (
      <p className="text-gray-400 text-sm leading-7">
        NexusChat is a real-time chat application built with ASP.NET Core, SignalR, Clean Architecture, and React.
        Testing covered WebSocket connection lifecycle, real-time message delivery, online presence tracking,
        typing indicators, JWT authentication flows, and cross-tab session consistency.
      </p>
    )
  },
  {
    label: 'TEST CASES',
    content: (
      <TestTable cases={[
        { id: 'TC-001', desc: 'SignalR connection establishes on login', expected: 'Hub connected within 2s', status: 'PASS' },
        { id: 'TC-002', desc: 'Message delivered in real-time to all group members', expected: 'All recipients receive message < 500ms', status: 'PASS' },
        { id: 'TC-003', desc: 'Online presence updates on connect/disconnect', expected: 'User list reflects current state', status: 'PASS' },
        { id: 'TC-004', desc: 'Typing indicator appears and disappears correctly', expected: 'Indicator shows after keypress, hides after 2s', status: 'PASS' },
        { id: 'TC-005', desc: 'JWT expiry forces re-authentication', expected: 'User redirected to login on token expiry', status: 'PASS' },
        { id: 'TC-006', desc: 'Cross-tab logout syncs via localStorage event', expected: 'All tabs log out simultaneously', status: 'PASS' },
        { id: 'TC-007', desc: 'Unread message counter increments correctly', expected: 'Counter updates without page refresh', status: 'PASS' },
        { id: 'TC-008', desc: 'Delete message returns 404 for non-existent ID', expected: '404 Not Found with error body', status: 'PASS' },
      ]} />
    )
  },
  {
    label: 'BUG REPORT',
    content: (
      <BugReport bug={{
        'BUG-001': '',
        'Title': 'Cross-tab logout not triggered — auth state desync between tabs',
        'Severity': 'High',
        'Steps': '1. Open app in two tabs  2. Log out in tab 1  3. Observe tab 2',
        'Expected': 'Tab 2 redirects to login automatically',
        'Actual': 'Tab 2 remains logged in with stale JWT, API calls start failing with 401',
        'Fix': 'Added window.addEventListener storage to detect localStorage auth changes and trigger logout across all tabs',
        'Status': 'Resolved',
      }} />
    )
  }
]

export default function Home() {
  return (
    <div className="bg-[#0A0F1E] min-h-screen text-white font-sans">
      <style>{`
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .fade-up { animation: fadeUp 0.8s ease both; }
        .fade-up-delay { animation: fadeUp 0.8s 0.2s ease both; opacity: 0; animation-fill-mode: forwards; }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section className="min-h-screen flex items-center px-8 pt-24 pb-16 max-w-[1100px] mx-auto gap-16 flex-wrap">
        <div className="flex-1 basis-[340px] fade-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-teal-400/30 bg-teal-400/5 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400 inline-block" />
            <span className="font-mono text-xs text-teal-400">Available for work</span>
          </div>

          <h1 className="text-[clamp(36px,5vw,56px)] font-bold leading-[1.1] text-white mb-5 font-[Space_Grotesk]">
            Djordje<br />
            <span className="text-teal-400">Jovanovic</span>
          </h1>

          <p className="text-base text-gray-400 leading-7 mb-8 max-w-[420px]">
            QA Engineer & Full-Stack Developer. I build software and break it on purpose —
            so your users don't have to find the bugs first.
          </p>

          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-6 py-3 bg-teal-400 border-none rounded-lg text-[#0A0F1E] text-sm font-semibold cursor-pointer"
            >
              View case studies
            </button>
            
              <a href="https://github.com/djordjejo"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 bg-transparent border border-[#1e2d45] rounded-lg text-white text-sm no-underline inline-flex items-center gap-2 hover:border-teal-400 transition-colors"
            >
              GitHub ↗
            </a>
          </div>
        </div>

        <div className="flex-1 basis-[400px] fade-up-delay">
          <Terminal />
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="px-8 py-20 max-w-[1100px] mx-auto">
        <div className="border-t border-[#1e2d45] pt-14">
          <div className="font-mono text-[11px] text-teal-400 tracking-[0.15em] mb-5">ABOUT</div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-12">
            <div>
              <h2 className="text-[32px] font-bold text-white mb-4 font-[Space_Grotesk]">
                I find the bugs<br />before your users do.
              </h2>
              <p className="text-gray-400 leading-[1.8] text-[15px]">
                Final-year student at VISER Belgrade with hands-on experience in QA automation and full-stack development.
                My background in both building and testing software means I understand why bugs happen — not just that they do.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Automation', value: 'Selenium C# · Page Object Model' },
                { label: 'Testing', value: 'Manual · Exploratory · API · Regression' },
                { label: 'Dev Stack', value: '.NET 8 · React · SQL Server · Azure' },
                { label: 'Location', value: 'Belgrade, Serbia · Available remote' },
              ].map(item => (
                <div key={item.label} className="flex gap-4 items-start py-3.5 border-b border-[#1e2d45]">
                  <span className="font-mono text-[11px] text-teal-400 min-w-[90px] pt-0.5">
                    {item.label.toUpperCase()}
                  </span>
                  <span className="text-sm text-white">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CASE STUDIES */}
      <section id="work" className="px-8 py-20 max-w-[1100px] mx-auto">
        <div className="border-t border-[#1e2d45] pt-14">
          <div className="font-mono text-[11px] text-teal-400 tracking-[0.15em] mb-3">CASE STUDIES</div>
          <h2 className="text-[32px] font-bold text-white mb-10 font-[Space_Grotesk]">Real projects. Real tests.</h2>
          <CaseStudy number="01" title="JobAlert — Selenium Automation" subtitle="C# web scraper with automated test suite covering scraping, retry logic, and data export" tags={['Selenium', 'C#', 'xUnit', 'Automation']} sections={jobAlertSections} />
          <CaseStudy number="02" title="Employee Management System — API Testing" subtitle="Azure Functions REST API tested end-to-end: CRUD, validation, duplicate prevention, error handling" tags={['REST API', 'Manual Testing', 'Postman', '.NET 8', 'Azure']} sections={emsSections} />
          <CaseStudy number="03" title="NexusChat — Real-time Chat Application" subtitle="ASP.NET Core and SignalR application with comprehensive test coverage for real-time features" tags={['SignalR', 'ASP.NET Core', 'React', 'Testing']} sections={nexusChatSections} />
        </div>
      </section>

      <SkillsSection />

      {/* UPWORK CTA */}
      <section className="px-8 pb-20 max-w-[1100px] mx-auto">
        <div className="bg-gradient-to-br from-[#0d1526] to-[#111827] border border-teal-400/25 rounded-2xl p-12 flex items-center justify-between flex-wrap gap-8 shadow-[0_0_60px_rgba(0,212,180,0.05)]">
          <div>
            <div className="font-mono text-[11px] text-teal-400 tracking-[0.15em] mb-3">AVAILABLE ON UPWORK</div>
            <h2 className="text-[clamp(22px,3vw,32px)] font-bold text-white mb-3 font-[Space_Grotesk]">
              Looking for a QA Engineer<br />or Full-Stack Developer?
            </h2>
            <p className="text-gray-400 text-[15px] leading-7 max-w-[480px]">
              I'm actively taking projects on Upwork — automation testing, manual QA, API testing, and .NET development.
              Fast communication, clean deliverables, no excuses.
            </p>
          </div>
          <div className="flex flex-col gap-3 shrink-0">
            
             <a href="https://www.upwork.com/freelancers/~yourprofileid"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3.5 bg-teal-400 rounded-lg text-[#0A0F1E] text-[15px] font-bold no-underline text-center whitespace-nowrap"
            >
              Hire me on Upwork ↗
            </a>
            <div className="flex gap-4 justify-center">
              {['QA Automation', 'Manual Testing', '.NET / React'].map(tag => (
                <span key={tag} className="text-[11px] font-mono text-gray-400">✓ {tag}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Contact />

      {/* FOOTER */}
      <footer className="border-t border-[#1e2d45] px-8 py-5 flex justify-between items-center flex-wrap gap-3">
        <span className="font-mono text-xs text-gray-400">djordje.qa</span>
        <span className="text-xs text-gray-400">Belgrade, Serbia · {new Date().getFullYear()}</span>
      </footer>
    </div>
  )
}