import { useState } from 'react'

type TestCase = {
  id: string
  desc: string
  expected: string
  status: 'PASS' | 'WARN' | 'FAIL'
}

type BugData = Record<string, string>

type Section = {
  label: string
  content: React.ReactNode
}

type CaseStudyProps = {
  number: string
  title: string
  subtitle: string
  tags: string[]
  sections: Section[]
}

function Badge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3 py-1 rounded-full border border-[#1e2d45] text-xs text-gray-400 font-mono tracking-wide">
      {children}
    </span>
  )
}

function TestTable({ cases }: { cases: TestCase[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[13px]">
        <thead>
          <tr className="border-b border-[#1e2d45]">
            {['ID', 'Description', 'Expected', 'Status'].map(h => (
              <th key={h} className="px-3 py-2 text-left text-gray-400 font-medium whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {cases.map((c, i) => (
            <tr key={i} className="border-b border-[#1e2d45]">
              <td className="px-3 py-2 font-mono text-xs text-teal-400">{c.id}</td>
              <td className="px-3 py-2 text-white">{c.desc}</td>
              <td className="px-3 py-2 text-gray-400">{c.expected}</td>
              <td className="px-3 py-2">
                <span className={`px-2 py-0.5 rounded-full text-[11px] font-mono border ${
                  c.status === 'PASS'
                    ? 'bg-teal-400/10 text-teal-400 border-teal-400/30'
                    : c.status === 'WARN'
                    ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/30'
                    : 'bg-red-500/10 text-red-400 border-red-500/30'
                }`}>
                  {c.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function BugReport({ bug }: { bug: BugData }) {
  return (
    <div className="bg-[#0A0F1E] border border-red-500/20 rounded-lg p-4">
      {Object.entries(bug).map(([k, v]) => (
        <div key={k} className="flex gap-4 mb-2 text-[13px]">
          <span className="text-gray-400 font-mono text-[11px] min-w-[120px] shrink-0 pt-0.5">{k}</span>
          <span className="text-white">{v}</span>
        </div>
      ))}
    </div>
  )
}

export { TestTable, BugReport }
export type { TestCase, BugData, Section }

export default function CaseStudy({ number, title, subtitle, tags, sections }: CaseStudyProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className={`border rounded-xl overflow-hidden mb-6 bg-[#111827] transition-colors duration-200 ${open ? 'border-teal-400' : 'border-[#1e2d45] hover:border-teal-400'}`}>
      <div className="p-7">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="font-mono text-xs text-teal-400 mb-2 tracking-widest">CASE STUDY {number}</div>
            <h3 className="text-[22px] font-bold text-white mb-1.5 font-[Space_Grotesk]">{title}</h3>
            <p className="text-sm text-gray-400 mb-4">{subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {tags.map(t => <Badge key={t}>{t}</Badge>)}
            </div>
          </div>
          <button
            onClick={() => setOpen(o => !o)}
            className="px-5 py-2.5 bg-transparent border border-teal-400 rounded-lg text-teal-400 text-[13px] cursor-pointer whitespace-nowrap shrink-0 hover:bg-teal-400/5 transition-colors"
          >
            {open ? 'Hide details ↑' : 'View details ↓'}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-[#1e2d45] p-7 bg-[#0d1526]">
          {sections.map((s, i) => (
            <div key={i} className={i < sections.length - 1 ? 'mb-7' : ''}>
              <div className="text-[11px] font-mono text-teal-400 tracking-widest mb-2.5">{s.label}</div>
              {s.content}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}