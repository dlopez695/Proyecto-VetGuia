import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Download, FileText, Check } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { AnimatedBackground } from './AnimatedBackground';

interface GuidesProps {
  onSelectGuide: (guideId: string) => void;
}

const guides = [
  {
    id: '1',
    title: 'Guía Completa de Primeros Auxilios',
    description: 'Manual completo con procedimientos básicos de emergencia',
    pages: 24,
    offline: true,
  },
  {
    id: '2',
    title: 'Reconocimiento de Síntomas Críticos',
    description: 'Aprende a identificar signos de emergencia en tu mascota',
    pages: 12,
    offline: true,
  },
  {
    id: '3',
    title: 'Técnicas de RCP para Mascotas',
    description: 'Instrucciones detalladas de reanimación cardiopulmonar',
    pages: 8,
    offline: true,
  },
  {
    id: '4',
    title: 'Manejo de Heridas y Sangrado',
    description: 'Cómo tratar cortes, heridas y hemorragias',
    pages: 10,
    offline: false,
  },
  {
    id: '5',
    title: 'Intoxicaciones Comunes',
    description: 'Lista de sustancias tóxicas y cómo actuar',
    pages: 16,
    offline: true,
  },
  {
    id: '6',
    title: 'Emergencias en Cachorros y Gatitos',
    description: 'Cuidados especiales para animales jóvenes',
    pages: 14,
    offline: false,
  },
];

export function Guides({ onSelectGuide }: GuidesProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-blue-50 pb-24 relative">
      <AnimatedBackground />
      {/* Header con imagen */}
      <div className="relative h-48 overflow-hidden z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1759863742702-41316e3db192?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBoZWFsdGglMjB3ZWxsbmVzc3xlbnwxfHx8fDE3NjExNjk4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Salud de mascotas"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-emerald-50" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h1 className="text-slate-800 mb-2">Folletería</h1>
          <p className="text-slate-700">
            Guías de primeros auxilios veterinarios
          </p>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Indicador de contenido offline */}
        <Card className="bg-emerald-100 border-emerald-300 mb-6">
          <div className="p-4 flex items-center gap-3">
            <Check className="size-5 text-emerald-700" />
            <p className="text-emerald-800">
              Las guías marcadas están disponibles sin conexión
            </p>
          </div>
        </Card>

        {/* Lista de guías */}
        <div className="space-y-4">
          {guides.map((guide) => (
            <Card
              key={guide.id}
              onClick={() => onSelectGuide(guide.id)}
              className="bg-white border-slate-200 cursor-pointer hover:bg-slate-50 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            >
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-slate-800 mb-2">{guide.title}</h3>
                    <p className="text-slate-600 mb-3">
                      {guide.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-slate-100 text-slate-700 border-slate-300"
                      >
                        <FileText className="size-3 mr-1" />
                        {guide.pages} páginas
                      </Badge>
                      {guide.offline && (
                        <Badge className="bg-emerald-100 text-emerald-700 border-emerald-300">
                          <Download className="size-3 mr-1" />
                          Disponible offline
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}