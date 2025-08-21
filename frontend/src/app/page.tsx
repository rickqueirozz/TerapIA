import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Botão de tema no canto superior direito */}
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        {/* Gradiente de fundo */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-50 via-yellow-100 to-amber-100" />
        
        {/* Formas decorativas fluidas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Círculo grande superior direito */}
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-yellow-200/30 rounded-full blur-3xl animate-pulse" />
          
          {/* Círculo médio inferior esquerdo */}
          <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-amber-200/20 rounded-full blur-2xl animate-pulse delay-1000" />
          
          {/* Círculo pequeno centro */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-yellow-300/20 rounded-full blur-xl animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Coluna da esquerda - Texto */}
            <div className="space-y-8 text-center lg:text-left">
              <div className="space-y-6">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-gray-800 font-poppins animate-fade-in-left">
                  Bem-vindo ao seu{" "}
                  <span className="text-amber-600">espaço de calma</span>
                </h1>
                
                <p className="text-xl lg:text-2xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-inter animate-fade-in-left animate-delay-200">
                  Converse com nossa IA para refletir, relaxar e organizar seus pensamentos de forma segura e confidencial.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/triagem"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-amber-400 to-yellow-500 rounded-2xl shadow-lg hover:from-amber-500 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 hover:shadow-xl font-poppins animate-fade-in-left animate-delay-300"
                >
                  Começar agora
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                
                <Link
                  href="/chat"
                  className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 border-2 border-gray-300 rounded-2xl hover:border-amber-400 hover:text-amber-600 transition-all duration-300 font-poppins animate-fade-in-left animate-delay-400"
                >
                  Ir direto ao chat
                </Link>
              </div>
            </div>

            {/* Coluna da direita - Ilustração */}
            <div className="flex justify-center lg:justify-end animate-fade-in-right">
              <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                {/* Ilustração principal */}
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 to-amber-200 rounded-full shadow-2xl animate-float">
                  <div className="absolute inset-4 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full" />
                </div>
                
                {/* Elementos decorativos */}
                <div className="absolute top-8 left-8 w-16 h-16 bg-yellow-300 rounded-full animate-bounce delay-100" />
                <div className="absolute top-16 right-12 w-12 h-12 bg-amber-300 rounded-full animate-bounce delay-200" />
                <div className="absolute bottom-20 left-12 w-14 h-14 bg-yellow-400 rounded-full animate-bounce delay-300" />
                <div className="absolute bottom-12 right-8 w-10 h-10 bg-amber-400 rounded-full animate-bounce delay-500" />
                
                {/* Símbolo de paz/calma */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-32 h-32 text-amber-600 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4 font-poppins animate-fade-in-up">
              Por que escolher o TerapIA?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-inter animate-fade-in-up animate-delay-200">
              Descubra como nossa plataforma pode transformar sua jornada de autoconhecimento
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-orange-100 animate-fade-in-up animate-delay-300">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Conversa segura e confidencial</h3>
              <p className="text-gray-600 leading-relaxed">
                Suas conversas são privadas e protegidas. Nossa IA oferece um espaço seguro para você se expressar livremente.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group bg-gradient-to-br from-yellow-50 to-amber-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-yellow-100 animate-fade-in-up animate-delay-400">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-amber-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Exercícios de relaxamento guiados</h3>
              <p className="text-gray-600 leading-relaxed">
                Aprenda técnicas de respiração, meditação e relaxamento personalizadas para seu momento atual.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group bg-gradient-to-br from-amber-50 to-orange-50 p-8 rounded-3xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 border border-amber-100 animate-fade-in-up animate-delay-500">
              <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-400 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Dicas e reflexões personalizadas</h3>
              <p className="text-gray-600 leading-relaxed">
                Receba insights e reflexões baseados em TCC, adaptados ao seu perfil e necessidades específicas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA */}
      <section className="py-20 bg-gradient-to-r from-yellow-100 to-amber-100">
        <div className="container mx-auto px-6 text-center">
                      <div className="max-w-4xl mx-auto space-y-8">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 font-poppins animate-fade-in-up">
                Pronto para começar sua jornada?
              </h2>
              <p className="text-xl text-gray-600 font-inter animate-fade-in-up animate-delay-200">
                Junte-se a milhares de pessoas que já descobriram o poder da terapia conversacional com IA
              </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                              <Link
                  href="/triagem"
                  className="inline-flex items-center justify-center px-10 py-4 text-xl font-semibold text-white bg-gradient-to-r from-amber-500 to-yellow-500 rounded-2xl shadow-lg hover:from-amber-600 hover:to-yellow-600 transform hover:scale-105 transition-all duration-300 hover:shadow-xl font-poppins animate-fade-in-up animate-delay-300"
                >
                  Começar minha jornada
                  <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m5-5H6" />
                  </svg>
                </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer simples */}
      <footer className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">
            © 2024 TerapIA. Criado com ❤️ para seu bem-estar mental.
          </p>
        </div>
      </footer>
    </div>
  );
}
