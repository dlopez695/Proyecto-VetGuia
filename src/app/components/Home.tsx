import { Card } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AlertCircle, Book, Phone, Package, GraduationCap, User } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';

interface HomeProps {
  onNavigate: (section: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pb-24 relative">
      <AnimatedBackground />
      {/* Header con imagen de bienvenida */}
      <div className="relative h-64 overflow-hidden z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1506199595715-82342b9198a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBldHMlMjBhbmltYWxzfGVufDF8fHx8MTc2MTE2OTgwOHww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Mascotas felices"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/50 to-blue-50" />
        <div className="absolute bottom-0 left-0 right-0 p-6 text-center">
          <h1 className="text-6xl text-slate-900 mb-3 drop-shadow-lg" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>¡Bienvenido a VetGuia!</h1>
          <p className="text-xl text-slate-800 drop-shadow-md" style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }} style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900 }}>
            Tu guía de confianza para el cuidado de emergencia de tus mascotas
          </p>
        </div>
      </div>

      <div className="px-6 -mt-6 relative z-10">
        {/* Botón de Emergencia Principal - Destacado */}
        <Card
          onClick={() => onNavigate('emergencies')}
          className="bg-gradient-to-br from-rose-300 to-orange-300 border-0 mb-8 cursor-pointer hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="bg-white/40 p-4 rounded-full">
                <AlertCircle className="size-10 text-rose-800" />
              </div>
              <div className="flex-1">
                <h2 className="text-rose-900 mb-1">¡EMERGENCIAS!</h2>
                <p className="text-rose-800">
                  Acceso rápido a primeros auxilios críticos
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Grid de Secciones Principales */}
        <div className="space-y-4">
          <Card
            onClick={() => onNavigate('brochures')}
            className="bg-white border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm"
          >
            <div className="p-5 flex items-center gap-4">
              <div className="bg-emerald-100 p-3 rounded-lg">
                <Book className="size-8 text-emerald-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-800 mb-1">Folletería</h3>
                <p className="text-slate-600">
                  Guías detalladas de salud, nutrición, vacunación y cuidados
                </p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => onNavigate('assistance')}
            className="bg-white border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm"
          >
            <div className="p-5 flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Phone className="size-8 text-blue-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-800 mb-1">Habla con un experto</h3>
                <p className="text-slate-600">
                  Llamadas de emergencia, chat en vivo y video consultas
                </p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => onNavigate('kit')}
            className="bg-white border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm"
          >
            <div className="p-5 flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg">
                <Package className="size-8 text-purple-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-800 mb-1">Botiquín</h3>
                <p className="text-slate-600">
                  Checklist de elementos esenciales
                </p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => onNavigate('education')}
            className="bg-white border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm"
          >
            <div className="p-5 flex items-center gap-4">
              <div className="bg-amber-100 p-3 rounded-lg">
                <GraduationCap className="size-8 text-amber-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-800 mb-1">Consejos y Educación</h3>
                <p className="text-slate-600">
                  Prevención y cuidados básicos
                </p>
              </div>
            </div>
          </Card>

          <Card
            onClick={() => onNavigate('profile')}
            className="bg-white border-slate-200 cursor-pointer hover:bg-slate-50 transition-colors shadow-sm"
          >
            <div className="p-5 flex items-center gap-4">
              <div className="bg-teal-100 p-3 rounded-lg">
                <User className="size-8 text-teal-700" />
              </div>
              <div className="flex-1">
                <h3 className="text-slate-800 mb-1">Mi Perfil</h3>
                <p className="text-slate-600">
                  Información personal y datos de mis mascotas
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}