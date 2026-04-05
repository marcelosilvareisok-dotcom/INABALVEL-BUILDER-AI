export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center py-20 bg-black text-white text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-600">
        Crie sites e apps com IA em segundos 🚀
      </h1>
      <p className="text-xl text-gray-400 mb-10 max-w-2xl">
        Sem saber programar. Sem complicação. Digite sua ideia e veja a mágica acontecer.
      </p>
      <div className="space-x-4">
        <button className="px-8 py-4 bg-purple-600 rounded-lg text-lg font-semibold hover:bg-purple-500">
          Começar Agora
        </button>
        <button className="px-8 py-4 bg-gray-800 rounded-lg text-lg font-semibold hover:bg-gray-700">
          Ver Exemplos
        </button>
      </div>
    </section>
  );
}
