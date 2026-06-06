import { Card } from './ui/card';
import { Button } from './ui/button';
import { AlertCircle, Flame, Droplets, Bone, Heart, Pill, Zap, Phone, Wind, Activity, Droplet, AlertTriangle, Brain, Eye, Scissors } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';

interface EmergenciesProps {
  onSelectEmergency: (emergencyId: string) => void;
}

const emergencies = [
  {
    id: 'poisoning',
    title: 'Envenenamiento',
    icon: Droplets,
    color: 'bg-red-100',
    iconColor: 'text-red-600',
    description: 'Ingestión de sustancias tóxicas',
    urgency: 'Crítico',
    image: 'https://images.unsplash.com/photo-1642513730687-13d52167b978?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBwb2lzb25pbmclMjB0b3hpYyUyMGVtZXJnZW5jeXxlbnwxfHx8fDE3NjIwMzAzNjB8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'heatstroke',
    title: 'Golpe de Calor',
    icon: Flame,
    color: 'bg-orange-100',
    iconColor: 'text-orange-600',
    description: 'Temperatura corporal elevada',
    urgency: 'Crítico',
    image: 'https://images.unsplash.com/photo-1673132611640-c5cab8ac3600?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBoZWF0c3Ryb2tlJTIwaG90JTIwc3VtbWVyfGVufDF8fHx8MTc2MjAzMDM2MHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'fracture',
    title: 'Fracturas',
    icon: Bone,
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
    description: 'Huesos rotos o lesiones graves',
    urgency: 'Alto',
    image: 'https://images.unsplash.com/photo-1564725075388-cc8338732289?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBmcmFjdHVyZSUyMGluanVyeSUyMGJvbmV8ZW58MXx8fHwxNzYyMDMwMzYwfDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'choking',
    title: 'Asfixia',
    icon: Wind,
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
    description: 'Obstrucción de vías respiratorias',
    urgency: 'Crítico',
    image: 'https://images.unsplash.com/photo-1606998300321-bed8f9179c33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBjaG9raW5nJTIwZW1lcmdlbmN5fGVufDF8fHx8MTc2MjAzMDM2MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'cardiac',
    title: 'Paro Cardíaco',
    icon: Heart,
    color: 'bg-pink-100',
    iconColor: 'text-pink-600',
    description: 'Emergencia cardiovascular',
    urgency: 'Crítico',
    image: 'https://images.unsplash.com/photo-1721114989769-0423619f03d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBDUFIlMjBjYXJkaWFjJTIwZW1lcmdlbmN5fGVufDF8fHx8MTc2MjAzMDM2MXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'overdose',
    title: 'Sobredosis de Medicamento',
    icon: Pill,
    color: 'bg-indigo-100',
    iconColor: 'text-indigo-600',
    description: 'Exceso de medicación',
    urgency: 'Crítico',
    image: 'https://images.unsplash.com/photo-1668440246393-e0b8b19a0bb7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBtZWRpY2F0aW9uJTIwb3ZlcmRvc2UlMjBwaWxsc3xlbnwxfHx8fDE3NjIwMzAzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'seizure',
    title: 'Convulsiones',
    icon: Zap,
    color: 'bg-violet-100',
    iconColor: 'text-violet-600',
    description: 'Episodios convulsivos',
    urgency: 'Alto',
    image: 'https://images.unsplash.com/photo-1548681528-6a5c45b66b42?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBzZWl6dXJlJTIwY29udnVsc2lvbnxlbnwxfHx8fDE3NjIwMzAzNjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'bleeding',
    title: 'Hemorragia Grave',
    icon: Droplet,
    color: 'bg-rose-100',
    iconColor: 'text-rose-600',
    description: 'Sangrado severo externo o interno',
    urgency: 'Crítico',
    image: 'https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBpbmp1cnklMjBibGVlZGluZ3xlbnwxfHx8fDE3NjIwMzAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'shock',
    title: 'Estado de Shock',
    icon: Activity,
    color: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
    description: 'Colapso circulatorio',
    urgency: 'Crítico',
    image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBzaG9jayUyMGVtZXJnZW5jeXxlbnwxfHx8fDE3NjIwMzAzNjN8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'burns',
    title: 'Quemaduras',
    icon: Flame,
    color: 'bg-amber-100',
    iconColor: 'text-amber-700',
    description: 'Quemaduras por calor o químicos',
    urgency: 'Alto',
    image: 'https://images.unsplash.com/photo-1581888227599-779811939961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBidXJuJTIwaW5qdXJ5fGVufDF8fHx8MTc2MjAzMDM2M3ww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'snakebite',
    title: 'Mordedura de Serpiente',
    icon: AlertTriangle,
    color: 'bg-lime-100',
    iconColor: 'text-lime-700',
    description: 'Mordida de reptil venenoso',
    urgency: 'Crítico',
    image: 'https://images.unsplash.com/photo-1560015534-cee980ba7e13?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzbmFrZSUyMGJpdGUlMjBkb2d8ZW58MXx8fHwxNzYyMDMwMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'eyeinjury',
    title: 'Lesión Ocular',
    icon: Eye,
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
    description: 'Trauma o irritación en los ojos',
    urgency: 'Alto',
    image: 'https://images.unsplash.com/photo-1453227588063-bb302b62f50b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBleWUlMjBpbmp1cnl8ZW58MXx8fHwxNzYyMDMwMzY0fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'electrocution',
    title: 'Electrocución',
    icon: Zap,
    color: 'bg-sky-100',
    iconColor: 'text-sky-600',
    description: 'Descarga eléctrica',
    urgency: 'Crítico',
    image: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVjdHJpY2l0eSUyMGRhbmdlcnxlbnwxfHx8fDE3NjIwMzAzNjR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'bloat',
    title: 'Torsión Gástrica',
    icon: AlertCircle,
    color: 'bg-fuchsia-100',
    iconColor: 'text-fuchsia-600',
    description: 'Hinchazón estomacal grave',
    urgency: 'Crítico',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBibG9hdCUyMGVtZXJnZW5jeXxlbnwxfHx8fDE3NjIwMzAzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 'heatexhaustion',
    title: 'Agotamiento por Calor',
    icon: Flame,
    color: 'bg-red-100',
    iconColor: 'text-red-600',
    description: 'Sobrecalentamiento moderado',
    urgency: 'Moderado',
    image: 'https://images.unsplash.com/photo-1505628346881-b72b27e84530?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBob3QlMjB3ZWF0aGVyfGVufDF8fHx8MTc2MjAzMDM2NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function Emergencies({ onSelectEmergency }: EmergenciesProps) {
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmergencies = emergencies.filter(emergency =>
    emergency.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emergency.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50 pb-24 relative">
      <AnimatedBackground />
      {/* Header de alerta */}
      <div className="bg-gradient-to-br from-rose-300 to-orange-300 p-4 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="size-8 text-rose-900" />
          <h1 className="text-rose-900">Emergencias</h1>
        </div>
        <p className="text-rose-800">
          Selecciona la emergencia que está enfrentando tu mascota
        </p>
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Alerta de seguridad */}
        <Card className="bg-amber-100 border-amber-300">
          <div className="p-3">
            <p className="text-amber-800 text-sm">
              <strong>Importante:</strong> Estas son instrucciones de primeros auxilios. 
              Siempre busca atención veterinaria profesional lo antes posible.
            </p>
          </div>
        </Card>

        {/* Buscador */}
        <div className="relative">
          <input
            type="text"
            placeholder="Buscar emergencia..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-300"
          />
        </div>

        {/* Lista de emergencias */}
        <div className="space-y-3">
          {filteredEmergencies.map((emergency) => {
            const Icon = emergency.icon;
            return (
              <Card
                key={emergency.id}
                onClick={() => onSelectEmergency(emergency.id)}
                className="bg-white border-slate-200 cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm overflow-hidden"
              >
                <div className="relative h-28 overflow-hidden">
                  <ImageWithFallback
                    src={emergency.image}
                    alt={emergency.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className={`absolute top-2 right-2 ${emergency.color} p-2 rounded-xl shadow-lg`}>
                    <Icon className={`size-5 ${emergency.iconColor}`} />
                  </div>
                  <div className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-1 rounded-md text-xs">
                    {emergency.urgency}
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-slate-800 mb-1">{emergency.title}</h3>
                  <p className="text-slate-600 text-sm">
                    {emergency.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Botón de llamada de emergencia */}
        <Button 
          onClick={() => setShowEmergencyDialog(true)}
          className="w-full h-14 bg-rose-400 hover:bg-rose-500 text-rose-900"
        >
          <Phone className="size-5 mr-2" />
          Llamar a Asistencia Remota
        </Button>

        {/* Información adicional de seguridad */}
        <Card className="bg-red-100 border-red-300">
          <div className="p-3">
            <p className="text-red-800 text-sm">
              <strong>⚠️ Ante una emergencia grave:</strong> No pierdas tiempo. 
              Llama al veterinario inmediatamente mientras te diriges a la clínica. 
              El tiempo es crítico en situaciones de emergencia.
            </p>
          </div>
        </Card>

        {/* Tips de prevención */}
        <Card className="bg-blue-100 border-blue-300">
          <div className="p-4">
            <h3 className="text-blue-900 mb-2">💡 Consejos de Prevención</h3>
            <ul className="text-blue-800 text-sm space-y-1">
              <li>• Ten siempre a mano el número del veterinario</li>
              <li>• Mantén un botiquín de primeros auxilios</li>
              <li>• Conoce la ubicación de clínicas de emergencia</li>
              <li>• Guarda información de tu mascota (peso, alergias, medicamentos)</li>
            </ul>
          </div>
        </Card>
      </div>

      {/* Dialog de emergencia */}
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="bg-white max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Contacto de Emergencia Veterinaria</DialogTitle>
            <DialogDescription className="text-slate-600 text-sm">
              Números de contacto para asistencia inmediata
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <Button className="w-full h-12 bg-rose-400 hover:bg-rose-500 text-rose-900 text-sm">
              <Phone className="size-4 mr-2" />
              Línea de Emergencias 24/7: +5757 (601601) 234-56784-5678
            </Button>
            <Button className="w-full h-12 bg-orange-300 hover:bg-orange-400 text-orange-900 text-sm">
              <Phone className="size-4 mr-2" />
              Hospital Veterinario: +5757 (310310) 456-7890-7890
            </Button>
            <Button className="w-full h-12 bg-amber-200 hover:bg-amber-300 text-amber-900 text-sm">
              <Phone className="size-4 mr-2" />
              Centro de Toxicología: +5757 (31315) 789-0123-0123
            </Button>
            <Card className="bg-blue-100 border-blue-300">
              <div className="p-3">
                <p className="text-blue-800 text-xs">
                  <strong>Consejo:</strong> Antes de llamar, ten lista la siguiente información:
                  nombre de tu mascota, peso aproximado, descripción de la emergencia y 
                  qué ha ocurrido en los últimos 30 minutos.
                </p>
              </div>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}