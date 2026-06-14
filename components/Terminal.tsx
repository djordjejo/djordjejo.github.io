import { useState, useEffect, useRef } from 'react'

const terminalLines = [
  { text: '$ running test suite: JobAlert.Selenium.Tests', delay: 0, color: 'text-gray-400' },
  { text: '', delay: 400, color: '' },
  { text: '[PASS] TC-001 — Joberty page loads within 3s', delay: 800, color: 'text-teal-400' },
  { text: '[PASS] TC-002 — Job listings render correctly', delay: 1300, color: 'text-teal-400' },
  { text: '[PASS] TC-003 — Filter by location returns valid results', delay: 1800, color: 'text-teal-400' },
  { text: '[WARN] TC-004 — HelloWorld API rate limit triggered', delay: 2300, color: 'text-yellow-400' },
  { text: '[PASS] TC-005 — Retry logic handles 429 gracefully', delay: 2900, color: 'text-teal-400' },
  { text: '[PASS] TC-006 — CSV export contains all required fields', delay: 3400, color: 'text-teal-400' },
  { text: '[PASS] TC-007 — Duplicate jobs filtered before export', delay: 3900, color: 'text-teal-400' },
  { text: '', delay: 4400, color: '' },
  { text: '7 tests run · 6 passed · 1 warning · 0 failed', delay: 4600, color: 'text-white' },
  { text: '✓ All critical paths verified', delay: 5100, color: 'text-teal-400' },
]

export default function Terminal() {
  const [visibleCount, setVisibleCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    terminalLines.forEach((line, i) => {
      setTimeout(() => setVisibleCount(c => Math.max(c, i + 1)), line.delay)
    })
  }, [started])

  return (
    <div ref={ref} className="rounded-xl overflow-hidden border border-[#1e2d45] shadow-[0_0_60px_rgba(0,212,180,0.08)] max-w-[580px] mx-auto bg-[#060C18]">
      {/* Window chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[#1e2d45] bg-[#0d1526]">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
        <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840]" />
        <span className="ml-2 font-mono text-xs text-gray-400">test-runner — bash</span>
      </div>
      {/* Body */}
      <div className="p-6 min-h-[280px]">
        {terminalLines.map((line, i) => (
          i < visibleCount && (
            <div key={i} className={`font-mono text-[13px] leading-7 min-h-[24px] ${line.color}`}>
              {line.text}
            </div>
          )
        ))}
        {visibleCount < terminalLines.length && started && (
          <span className="inline-block w-2 h-4 bg-teal-400 animate-pulse align-middle" />
        )}
      </div>
    </div>
  )
}