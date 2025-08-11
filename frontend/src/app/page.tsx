import Link from "next/link";

export default function Home() {
  return (
    <div
      className="relative min-h-[80vh] flex items-center justify-center p-6"
      style={{ background: 'linear-gradient(135deg, #BFD8EB 0%, #CFE4F3 100%)' }}
    >
      {/* Formas decorativas sutis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
        <div
          style={{
            position: 'absolute',
            top: -60,
            left: -60,
            width: 320,
            height: 320,
            borderRadius: 9999,
            background: 'radial-gradient(circle at 30% 30%, rgba(191,216,235,0.6), rgba(207,228,243,0.3))',
            filter: 'blur(10px)'
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: -80,
            right: -80,
            width: 380,
            height: 380,
            borderRadius: 9999,
            background: 'radial-gradient(circle at 70% 70%, rgba(207,228,243,0.6), rgba(191,216,235,0.3))',
            filter: 'blur(12px)'
          }}
        />
      </div>

      <section className="relative w-full max-w-3xl fade-in">
        <div
          className="w-full text-center space-y-6"
          style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: 16,
            padding: 48,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #9BB3C9'
          }}
        >
          <div className="mx-auto flex items-center justify-center gap-3">
            {/* Ícone minimalista */}
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 7.5C20 10.5376 15.5 14 12 17.5C8.5 14 4 10.5376 4 7.5C4 5.01472 6.01472 3 8.5 3C10.044 3 11.4071 3.7829 12 5C12.5929 3.7829 13.956 3 15.5 3C17.9853 3 20 5.01472 20 7.5Z" fill="#4B4B4B" fillOpacity="0.85"/>
            </svg>
            <h1 className="text-5xl font-bold" style={{ color: '#4B4B4B' }}>TerapIA</h1>
          </div>

          <p className="mx-auto max-w-2xl leading-relaxed" style={{ color: '#4B4B4B' }}>
            Acolhimento e apoio baseados em TCC. Comece pela triagem para personalizar sua experiência e siga para o chat com a terapeuta IA.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/triagem"
              className="px-6 py-3 rounded-[12px] font-semibold transition-colors duration-300 hover:bg-[#FFD966]"
              style={{ background: '#FFE58F', color: '#4B4B4B' }}
            >
              Começar triagem
            </Link>
            <Link
              href="/chat"
              className="px-6 py-3 rounded-[12px] font-semibold transition-colors duration-300 hover:bg-[#E6F0F8]"
              style={{ background: '#FFFFFF', color: '#4B4B4B', border: '2px solid #9BB3C9' }}
            >
              Ir para o chat
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
