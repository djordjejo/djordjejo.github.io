const skills: Record<string, string[]> = {
  'Automation': ['Selenium WebDriver', 'C# xUnit', 'Page Object Model', 'NUnit'],
  'API Testing': ['Postman', 'REST Assured', 'HTTP status validation', 'Payload inspection'],
  'Manual Testing': ['Test case design', 'Exploratory testing', 'Bug reporting', 'Regression testing'],
  'Dev Stack': ['C# / .NET 8', 'ASP.NET Core', 'React', 'SQL Server', 'EF Core'],
  'Tools': ['JIRA', 'Git / GitHub', 'Azure Functions', 'Visual Studio'],
}

function SkillPill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block px-3.5 py-1.5 rounded-md bg-[#1a2235] border border-[#1e2d45] text-[13px] text-white m-1">
      {children}
    </span>
  )
}

export default function SkillsSection() {
  return (
    <section id="skills" className="px-8 py-20 max-w-[1100px] mx-auto">
      <div className="border-t border-[#1e2d45] pt-14">
        <div className="font-mono text-[11px] text-teal-400 tracking-[0.15em] mb-3">SKILLS</div>
        <h2 className="text-[32px] font-bold text-white mb-10 font-[Space_Grotesk]">Stack & tooling</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-6">
          {Object.entries(skills).map(([category, items]) => (
            <div key={category} className="bg-[#111827] border border-[#1e2d45] rounded-xl p-5">
              <div className="font-mono text-[11px] text-teal-400 tracking-widest mb-3.5">{category.toUpperCase()}</div>
              <div className="flex flex-wrap">
                {items.map(s => <SkillPill key={s}>{s}</SkillPill>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}