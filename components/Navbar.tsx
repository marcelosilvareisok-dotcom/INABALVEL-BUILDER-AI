import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between p-6 bg-black text-white border-b border-gray-800">
      <div className="text-2xl font-bold text-purple-500">INABALÁVEL 💔</div>
      <div className="space-x-4">
        <Link href="/" className="hover:text-purple-400">Início</Link>
        <Link href="/dashboard" className="hover:text-purple-400">Dashboard</Link>
      </div>
      <div className="space-x-2">
        <button className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">Login</button>
        <button className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500">Criar Conta</button>
      </div>
    </nav>
  );
}
