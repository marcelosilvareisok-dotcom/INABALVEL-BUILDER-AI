import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 bg-black/50 backdrop-blur-md text-white border-b border-gray-800 fixed w-full z-50 top-0">
      <div className="text-2xl font-bold text-purple-500 flex items-center gap-2">
        <Sparkles className="w-6 h-6" /> INABALÁVEL 💔
      </div>
      <div className="space-x-6 hidden md:block">
        <Link href="/" className="hover:text-purple-400 transition font-medium">Início</Link>
        <Link href="#servicos" className="hover:text-purple-400 transition font-medium">Serviços</Link>
        <Link href="#portfolio" className="hover:text-purple-400 transition font-medium">Portfólio</Link>
      </div>
      <div className="space-x-3 flex items-center">
        <Link href="/dashboard" className="px-5 py-2.5 bg-gray-800 rounded-lg hover:bg-gray-700 transition font-medium hidden sm:block">
          Login
        </Link>
        <Link href="/dashboard" className="px-5 py-2.5 bg-purple-600 rounded-lg hover:bg-purple-500 transition font-semibold shadow-lg shadow-purple-500/20">
          Acessar Dashboard
        </Link>
      </div>
    </nav>
  );
}
