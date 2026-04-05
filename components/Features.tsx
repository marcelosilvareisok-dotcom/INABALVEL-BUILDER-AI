export default function Features() {
  const features = [
    { title: 'Criação de sites profissionais', icon: '🌐' },
    { title: 'Desenvolvimento de aplicativos', icon: '📱' },
    { title: 'Design moderno e responsivo', icon: '🎨' },
    { title: 'Otimização para vendas', icon: '📈' },
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12">O que oferecemos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="p-8 bg-black rounded-xl border border-gray-800 hover:border-purple-500 transition">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
