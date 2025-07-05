import { Logo } from "@/components/common/logo";

export function AuthGradient() {
  return (
    <div className="flex-1 relative overflow-hidden hidden lg:block">
      {/* Enhanced Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 via-blue-500"></div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, white 2px, transparent 2px),
                           radial-gradient(circle at 75% 75%, white 2px, transparent 2px)`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>

      <div className="relative z-10 flex flex-col justify-center items-start h-full px-12 py-16 text-white">
        {/* Main Content */}
        <div className="max-w-lg space-y-8">
          {/* Hero Title */}
          <div className="space-y-4">
            <h1 className="text-[40px] xl:text-5xl font-bold leading-tight">
              Haz tus trámites
              <span className="block text-cyan-200">sin salir de casa</span>
            </h1>
            <div className="w-24 h-1 bg-cyan-300 rounded-full"></div>
          </div>

          {/* Description */}
          <p className="text-xl text-blue-100 leading-relaxed font-light">
            Gestiona tus trámites desde casa. Conecta con entidades y recibe
            respuestas claras y oportunas,
            <span className="text-white font-medium"> sin complicaciones</span>.
          </p>

          {/* Features List */}
          <div className="space-y-4 mt-12">
            <div className="flex items-center gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-6 h-6 text-cyan-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Proceso 100% Digital
                </h3>
                <p className="text-blue-200 text-sm">
                  Sin papeleos ni filas interminables
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 group">
              <div className="flex-shrink-0 w-12 h-12 bg-white/15 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:bg-white/20 transition-colors">
                <svg
                  className="w-6 h-6 text-cyan-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Seguro y Confiable
                </h3>
                <p className="text-blue-200 text-sm">
                  Tus datos protegidos con la mejor tecnología
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className="absolute bottom-8 left-12 right-12">
          <div className="flex justify-between items-center opacity-30">
            <div className="w-8 h-8 border-2 border-white rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-4"></div>
            <div className="w-6 h-6 bg-white rounded-full"></div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white to-transparent mx-4"></div>
            <div className="w-4 h-4 border border-white rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
