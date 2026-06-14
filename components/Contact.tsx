export default function Contact() {
  return (
    <section id="contact" className="px-8 py-20 pb-32 max-w-[1100px] mx-auto">
      <div className="border-t border-[#1e2d45] pt-14 text-center">
        <div className="font-mono text-[11px] text-teal-400 tracking-[0.15em] mb-5">CONTACT</div>
        <h2 className="text-[clamp(28px,4vw,42px)] font-bold text-white mb-4 font-[Space_Grotesk]">
          Let's work together
        </h2>
        <p className="text-gray-400 text-base mb-10 max-w-[480px] mx-auto">
          Available for QA automation, manual testing, and full-stack development projects.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          
           <a href="mailto:dj.jovanovic6@gmail.com"
            className="px-7 py-3.5 bg-teal-400 rounded-lg text-[#0A0F1E] text-sm font-semibold no-underline"
          >
            dj.jovanovic6@gmail.com
          </a>
          
          <a href="https://linkedin.com/in/djordje-jovanovic-55b1702a6"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3.5 bg-transparent border border-[#1e2d45] rounded-lg text-white text-sm no-underline hover:border-teal-400 transition-colors"
          >
            LinkedIn ↗
          </a>
          
           <a href="https://github.com/djordjejo"
            target="_blank"
            rel="noreferrer"
            className="px-7 py-3.5 bg-transparent border border-[#1e2d45] rounded-lg text-white text-sm no-underline hover:border-teal-400 transition-colors"
          >
            GitHub ↗
          </a>
        </div>
      </div>
    </section>
  )
}