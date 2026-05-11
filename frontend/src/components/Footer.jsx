export default function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white mt-16">

      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-2 text-sm text-slate-500">

        {/* Left */}
        <p>
          © 2026 MedSec
        </p>

        {/* Center */}
        <p className="text-slate-400">
          Secure Health Exchange
        </p>

        {/* Right */}
        <p className="text-slate-400">
          Pune, India
        </p>

      </div>

    </footer>
  );
}