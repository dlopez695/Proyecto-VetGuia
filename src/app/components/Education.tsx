import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, BookOpen } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface EducationProps {
  onSelectArticle: (articleId: string) => void;
}

const articles = [
  {
    id: '1',
    title: 'Prevención de Golpes de Calor en Verano',
    excerpt:
      'Aprende a proteger a tu mascota durante los días calurosos y reconocer los primeros signos de sobrecalentamiento.',
    readTime: '5 min',
    category: 'Prevención',
    image: 'https://images.unsplash.com/photo-1569808051202-83331a985f55?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3QlMjBkb2clMjBzdW1tZXJ8ZW58MXx8fHwxNzYyMDI5MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    bgColor: 'from-orange-400 to-red-400',
  },
  {
    id: '2',
    title: 'Alimentos Tóxicos para Mascotas',
    excerpt:
      'Lista completa de alimentos comunes que pueden ser peligrosos o mortales para perros y gatos.',
    readTime: '8 min',
    category: 'Seguridad',
    image: 'https://images.unsplash.com/photo-1612160869377-f8f118f42fff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjB0b3hpYyUyMHBldHN8ZW58MXx8fHwxNzYyMDI5MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    bgColor: 'from-amber-400 to-yellow-400',
  },
  {
    id: '3',
    title: 'Cómo Revisar los Signos Vitales de tu Mascota',
    excerpt:
      'Guía paso a paso para medir pulso, temperatura y frecuencia respiratoria en casa.',
    readTime: '10 min',
    category: 'Cuidados Básicos',
    image: 'https://images.unsplash.com/photo-1725409796872-8b41e8eca929?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2hlY2t1cHxlbnwxfHx8fDE3NjIwMjkxODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bgColor: 'from-emerald-400 to-teal-400',
  },
  {
    id: '4',
    title: 'Preparación para Emergencias Naturales',
    excerpt:
      'Crea un plan de evacuación que incluya a tus mascotas y prepara un kit de emergencia.',
    readTime: '7 min',
    category: 'Prevención',
    image: 'https://images.unsplash.com/photo-1669897965746-b2758d6ee3db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBlbWVyZ2VuY3klMjBraXR8ZW58MXx8fHwxNzYyMDI5MTgzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    bgColor: 'from-blue-400 to-cyan-400',
  },
  {
    id: '5',
    title: 'Plantas Tóxicas Comunes en el Hogar',
    excerpt:
      'Identifica plantas decorativas que pueden ser peligrosas para tus mascotas y alternativas seguras.',
    readTime: '6 min',
    category: 'Seguridad',
    image: 'https://images.unsplash.com/photo-1607454317525-b0e50c920c5e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3VzZXBsYW50cyUyMGluZG9vcnxlbnwxfHx8fDE3NjIwMjkxODN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bgColor: 'from-lime-400 to-green-400',
  },
  {
    id: '6',
    title: 'Comportamiento de Dolor en Mascotas',
    excerpt:
      'Las mascotas ocultan el dolor. Aprende a reconocer las señales sutiles de malestar o lesión.',
    readTime: '9 min',
    category: 'Cuidados Básicos',
    image: 'https://images.unsplash.com/photo-1640694760335-123095ce93f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWQlMjBkb2clMjBwYWlufGVufDF8fHx8MTc2MjAyOTE4NHww&ixlib=rb-4.1.0&q=80&w=1080',
    bgColor: 'from-indigo-400 to-purple-400',
  },
  {
    id: '7',
    title: 'Primeros Auxilios para Heridas Leves',
    excerpt:
      'Cómo limpiar y vendar cortes menores, raspaduras y abrasiones de forma segura.',
    readTime: '12 min',
    category: 'Cuidados Básicos',
    image: 'https://images.unsplash.com/photo-1650532092996-05eaf4a5381d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjB3b3VuZCUyMGJhbmRhZ2V8ZW58MXx8fHwxNzYyMDI5MTg0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bgColor: 'from-rose-400 to-pink-400',
  },
  {
    id: '8',
    title: 'Seguridad en el Automóvil para Mascotas',
    excerpt:
      'Consejos para viajar de forma segura con tu mascota y prevenir accidentes durante el transporte.',
    readTime: '5 min',
    category: 'Seguridad',
    image: 'https://images.unsplash.com/photo-1655320761065-5e1fa982075e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBjYXIlMjB0cmF2ZWx8ZW58MXx8fHwxNzYyMDI5MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    bgColor: 'from-fuchsia-400 to-violet-400',
  },
];

const categoryColors: Record<string, string> = {
  'Prevención': 'bg-blue-500 text-white border-blue-600',
  'Seguridad': 'bg-orange-500 text-white border-orange-600',
  'Cuidados Básicos': 'bg-emerald-500 text-white border-emerald-600',
};

export function Education({ onSelectArticle }: EducationProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 pb-24 relative">
      <AnimatedBackground />
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-300 to-indigo-300 p-6 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <BookOpen className="size-8 text-purple-900" />
          <h1 className="text-purple-900">Consejos y Educación</h1>
        </div>
        <p className="text-purple-800">
          Aprende a prevenir emergencias y cuidar mejor a tu mascota
        </p>
      </div>

      <div className="px-6 py-6">
        {/* Información */}
        <Card className="bg-emerald-100 border-emerald-300 mb-6">
          <div className="p-4">
            <p className="text-emerald-800">
              <strong>📚 Educación Preventiva:</strong> La prevención es la mejor medicina. 
              Estos artículos contienen información verídica sobre primeros auxilios veterinarios 
              y te ayudarán a mantener a tu mascota segura y saludable. Léelos con calma para 
              estar preparado ante cualquier emergencia.
            </p>
          </div>
        </Card>

        {/* Lista de artículos */}
        <div className="space-y-4">
          {articles.map((article) => (
            <Card
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="bg-white border-slate-200 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm overflow-hidden"
            >
              <div className="relative">
                {/* Imagen de fondo con gradiente */}
                <div className="relative h-40 overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${article.bgColor} opacity-60`} />
                  <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                    <Badge
                      variant="outline"
                      className={categoryColors[article.category]}
                    >
                      {article.category}
                    </Badge>
                    <div className="flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full text-slate-700">
                      <Clock className="size-3" />
                      <span className="text-xs">{article.readTime}</span>
                    </div>
                  </div>
                </div>
                {/* Contenido */}
                <div className="p-5">
                  <h3 className="text-slate-800 mb-2">{article.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
