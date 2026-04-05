'use client';

import { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import Link from 'next/link';
import { LayoutDashboard, FolderKanban, Settings, LogOut, Sparkles, Code, MonitorPlay, Globe, Plus } from 'lucide-react';

export default function Dashboard() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGeneratedCode('');

    try {
      // Inicializa o cliente do Gemini usando a chave de API pública
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3.1-pro-preview',
        contents: `Crie um site de página única (Landing Page) para o seguinte pedido: "${prompt}". 
        Retorne APENAS o código HTML completo. Use Tailwind CSS via CDN (<script src="https://cdn.tailwindcss.com"></script>) no <head>. 
        O design deve ser moderno, responsivo, bonito e persuasivo. Inclua seções como Hero, Sobre, Benefícios e Rodapé.
        Não inclua marcações markdown como \`\`\`html, apenas o código puro.`,
      });

      let code = response.text || '';
      
      // Limpeza de markdown caso a IA ainda retorne com formatação
      if (code.startsWith('```html')) {
        code = code.replace(/```html\n?/, '').replace(/```$/, '');
      } else if (code.startsWith('```')) {
        code = code.replace(/```\n?/, '').replace(/```$/, '');
      }

      setGeneratedCode(code.trim());
    } catch (error) {
      console.error('Erro ao gerar:', error);
      alert('Erro ao gerar o projeto. Verifique o console.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-800 p-6 hidden md:flex flex-col">
        <div className="text-xl font-bold text-purple-500 mb-10 flex items-center gap-2">
          <Sparkles className="w-6 h-6" /> INABALÁVEL 💔
        </div>
        <nav className="space-y-2 flex-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 bg-purple-600/10 text-purple-400 rounded-lg font-semibold">
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition">
            <FolderKanban className="w-5 h-5" /> Meus Projetos
          </Link>
          <Link href="#" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition">
            <Settings className="w-5 h-5" /> Configurações
          </Link>
        </nav>
        <Link href="/" className="flex items-center gap-3 px-4 py-3 text-gray-400 hover:text-red-400 hover:bg-gray-900 rounded-lg transition mt-auto">
          <LogOut className="w-5 h-5" /> Sair
        </Link>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="p-6 border-b border-gray-800 flex justify-between items-center bg-black/50 backdrop-blur-md z-10">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            Novo Projeto
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-400 bg-gray-900 px-4 py-2 rounded-full border border-gray-800">
              Plano: <span className="text-purple-400 font-bold">FREE</span>
            </div>
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-blue-600 rounded-full border-2 border-black"></div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6 flex flex-col relative">
          {!generatedCode && !isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center max-w-3xl mx-auto w-full animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-purple-600/20 rounded-full flex items-center justify-center mb-6 border border-purple-500/30">
                <Sparkles className="w-10 h-10 text-purple-400" />
              </div>
              <h2 className="text-4xl font-bold mb-4 text-center">O que vamos construir hoje?</h2>
              <p className="text-gray-400 mb-8 text-center text-lg">
                Descreva sua ideia e a IA fará o resto. <br/>
                <span className="text-gray-500 text-sm">Ex: "Quero um site para barbearia com agendamento online e tema escuro"</span>
              </p>
              
              <div className="w-full relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                <div className="relative w-full">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Descreva seu site ou app aqui..."
                    className="w-full bg-gray-900 border border-gray-700 rounded-xl p-6 text-white focus:outline-none focus:border-purple-500 resize-none h-40 text-lg shadow-2xl"
                  />
                  <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim()}
                    className="absolute bottom-4 right-4 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-lg font-semibold disabled:opacity-50 transition flex items-center gap-2 shadow-lg"
                  >
                    <Sparkles className="w-5 h-5" /> Gerar Projeto
                  </button>
                </div>
              </div>
            </div>
          ) : isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center animate-in fade-in duration-300">
              <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-purple-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-purple-500 rounded-full border-t-transparent animate-spin"></div>
                <Sparkles className="absolute inset-0 m-auto w-8 h-8 text-purple-400 animate-pulse" />
              </div>
              <h3 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 animate-pulse">
                A IA está criando seu projeto...
              </h3>
              <p className="text-gray-400 mt-4 text-lg">Escrevendo código, aplicando estilos e configurando o layout.</p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col h-full animate-in slide-in-from-bottom-4 duration-500">
              <div className="flex justify-between items-center mb-4 bg-gray-900 p-2 rounded-xl border border-gray-800">
                <div className="flex space-x-1">
                  <button 
                    onClick={() => setActiveTab('preview')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'preview' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                  >
                    <MonitorPlay className="w-4 h-4" /> Preview
                  </button>
                  <button 
                    onClick={() => setActiveTab('code')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-medium transition ${activeTab === 'code' ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-gray-800'}`}
                  >
                    <Code className="w-4 h-4" /> Código
                  </button>
                </div>
                <div className="flex space-x-3 pr-2">
                  <button 
                    onClick={() => { setGeneratedCode(''); setPrompt(''); }} 
                    className="flex items-center gap-2 px-4 py-2 text-gray-300 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                  >
                    <Plus className="w-4 h-4" /> Novo
                  </button>
                  <button className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-400 hover:to-emerald-500 transition shadow-lg shadow-green-500/20 font-semibold">
                    <Globe className="w-4 h-4" /> Publicar
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-white rounded-xl overflow-hidden border border-gray-700 shadow-2xl relative">
                {activeTab === 'preview' ? (
                  <iframe 
                    srcDoc={generatedCode} 
                    className="w-full h-full border-none bg-white"
                    title="Preview do Projeto"
                    sandbox="allow-scripts allow-same-origin"
                  />
                ) : (
                  <pre className="w-full h-full p-6 overflow-auto bg-[#0d1117] text-[#e6edf3] font-mono text-sm leading-relaxed">
                    <code>{generatedCode}</code>
                  </pre>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
