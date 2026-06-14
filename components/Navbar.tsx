export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur border-b border-teal-900">
      <span className="font-mono text-teal-400 font-bold tracking-widest">DJ</span>
      <ul className="flex gap-8 font-mono text-sm text-gray-400">
        <li><a href="#about" className="hover:text-teal-400 transition-colors">about</a></li>
        <li><a href="#skills" className="hover:text-teal-400 transition-colors">skills</a></li>
        <li><a href="#work" className="hover:text-teal-400 transition-colors">work</a></li>
        <li><a href="#contact" className="hover:text-teal-400 transition-colors">contact</a></li>
      </ul>
    </nav>
  );
}
