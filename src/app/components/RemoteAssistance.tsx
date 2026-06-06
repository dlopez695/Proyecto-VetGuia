import { Card } from './ui/card';
import { Button } from './ui/button';
import { Phone, MessageCircle, MapPin, Clock, Mail, Video, Send, X, Bot, User as UserIcon, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { AnimatedBackground } from './AnimatedBackground';
import { toast } from 'sonner';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const clinics = [
  {
    id: '1',
    name: 'Clínica Veterinaria Emergencias 24h',
    distance: '2.3 km',
    phone: '+5757 (601601) 234-56784-5678',
    emergency: true,
    address: 'CarreCarrera 7 #7 #123-45-45, Chapihapineero, Bogotá, Bogotá',
    email: 'emergencias@vetclinic24.com',
    hours: 'Abierto 24/7',
    services: ['Emergencias', 'Cirugía', 'Hospitalización', 'Laboratorio'],
    image: 'https://images.unsplash.com/photo-1621762953856-9e794a33634f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwY2xpbmljJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzYyMDI5MTg1fDA&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '2',
    name: 'Hospital Veterinario Central',
    distance: '5.1 km',
    phone: '+5757 (310310) 456-7890-7890',
    emergency: true,
    address: 'Calle 100100 #1#15-20-20, UsUsaquén,quén, BBogogotáá',
    email: 'info@hospitalvetcentral.com',
    hours: 'Abierto 24/7',
    services: ['Emergencias', 'UCI', 'Imagenología', 'Especialistas'],
    image: 'https://images.unsplash.com/photo-1711702321421-7e65e5333805?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbmltYWwlMjBob3NwaXRhbCUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjAyOTE4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '3',
    name: 'Centro Veterinario Mascotas Felices',
    distance: '7.8 km',
    phone: '+5757 (320320) 789-0123-0123',
    emergency: false,
    address: 'Avenidenida EEl D Doradoado #6#68--900, Engativá, BogotáEngativá, Bogotá',
    email: 'contacto@mascotasfelices.com',
    hours: 'Lun-Vie: 8am-8pm, Sáb: 9am-6pm',
    services: ['Consultas', 'Vacunación', 'Peluquería', 'Tienda'],
    image: 'https://images.unsplash.com/photo-1724632824319-4b43e74e000c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwb2ZmaWNlfGVufDF8fHx8MTc2MjAyOTE4NXww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: '4',
    name: 'Clínica Especializada Animales Exóticos',
    distance: '9.2 km',
    phone: '+5757 (31315) 321-4567-4567',
    emergency: false,
    address: 'Calle 8585 #12-#12-34, Chicó4, Chicó, BogoBogotáá',
    email: 'exoticos@vetcare.com',
    hours: 'Lun-Sáb: 9am-7pm',
    services: ['Aves', 'Reptiles', 'Roedores', 'Peces'],
    image: 'https://images.unsplash.com/photo-1530126483408-aa533e55bdb2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwYmlyZCUyMGV4b3RpY3xlbnwxfHx8fDE3NjIwMjkxODV8MA&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

// Respuestas automatizadas del bot
const botResponses = {
  greeting: [
    '¡Hola! Soy el asistente virtual de VetGuia. ¿En qué puedo ayudarte hoy?',
    'Bienvenido al chat de emergencias veterinarias. ¿Cuál es tu emergencia?',
  ],
  emergency: [
    'Entiendo que es una emergencia. Por favor, describe los síntomas principales de tu mascota.',
    'Para ayudarte mejor, necesito saber: ¿Qué tipo de mascota es? ¿Qué síntomas presenta?',
  ],
  poisoning: [
    '🚨 ENVENENAMIENTO ES EMERGENCIA CRÍTICA. NO induzcas vómito sin consultar. Llama AHORA al centro de toxicología: +5757 (31315) 789-0123-0123 o acude inmediatamente a una clínica de emergencias. ¿Sabes qué sustancia ingirió?',
  ],
  choking: [
    '🚨 ASFIXIA - ACTÚA YA: Si puede toser, déjala hacerlo. Si NO puede toser: Perros - maniobra de Heimlich. Gatos - 5 golpes entre omóplatos. Llama mientras actúas al: +5757 (601601) 234-56784-5678',
  ],
  heatstroke: [
    'Golpe de calor es crítico. AHORA: 1) Mueve a lugar fresco, 2) Aplica toallas húmedas (agua tibia), 3) Ofrece agua fresca, 4) Llama a emergencias: +577 (6(601) ) 234-56784-5678. NO uses hielo.',
  ],
  bleeding: [
    'Para hemorragia: Aplica PRESIÓN DIRECTA con gasa/tela limpia. NO remuevas el primer apósito. Mantén presión constante. Llama mientras aplicas presión: +5757 (601601) 234-56784-5678',
  ],
  general: [
    'Basado en tu descripción, te recomiendo contactar a un veterinario. ¿Quieres que te muestre clínicas cercanas?',
    'Esa condición requiere evaluación profesional. Puedo ayudarte a encontrar un veterinario cerca o conectarte con la línea de emergencias.',
  ],
  thanks: [
    'De nada. Recuerda que este chat es orientativo. Siempre consulta con un veterinario para diagnóstico preciso.',
    'Me alegra poder ayudarte. Para emergencias serias, no dudes en llamar directamente a una clínica. ¡Cuídate y cuida a tu mascota!',
  ],
};

export function RemoteAssistance() {
  const [showCallDialog, setShowCallDialog] = useState(false);
  const [showChatDialog, setShowChatDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: botResponses.greeting[0],
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  const [emergencyDescription, setEmergencyDescription] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('');
  const [urgencyLevel, setUrgencyLevel] = useState('');
  const [selectedClinic, setSelectedClinic] = useState<typeof clinics[0] | null>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Palabras clave para envenenamiento
    if (lowerMessage.includes('veneno') || lowerMessage.includes('tóxico') || 
        lowerMessage.includes('chocolate') || lowerMessage.includes('uva') ||
        lowerMessage.includes('intoxicación') || lowerMessage.includes('ingirió')) {
      return botResponses.poisoning[0];
    }
    
    // Palabras clave para asfixia
    if (lowerMessage.includes('asfixia') || lowerMessage.includes('ahoga') ||
        lowerMessage.includes('atraganta') || lowerMessage.includes('no respira')) {
      return botResponses.choking[0];
    }
    
    // Palabras clave para golpe de calor
    if (lowerMessage.includes('calor') || lowerMessage.includes('jadeo') ||
        lowerMessage.includes('temperatura') || lowerMessage.includes('hipertermia')) {
      return botResponses.heatstroke[0];
    }
    
    // Palabras clave para sangrado
    if (lowerMessage.includes('sangr') || lowerMessage.includes('hemorragia') ||
        lowerMessage.includes('herida')) {
      return botResponses.bleeding[0];
    }
    
    // Palabras clave de emergencia general
    if (lowerMessage.includes('emergencia') || lowerMessage.includes('urgente') ||
        lowerMessage.includes('grave') || lowerMessage.includes('crítico')) {
      return botResponses.emergency[1];
    }
    
    // Agradecimientos
    if (lowerMessage.includes('gracias') || lowerMessage.includes('thank')) {
      return botResponses.thanks[0];
    }
    
    // Respuesta general
    return botResponses.general[0];
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    // Añadir mensaje del usuario
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: currentMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Simular tiempo de respuesta del bot
    setTimeout(() => {
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(currentMessage),
        sender: 'bot',
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleEmergencyCall = () => {
    setShowCallDialog(true);
  };

  const handleStartChat = () => {
    setShowChatDialog(true);
  };

  const handleVideoConsultation = () => {
    setShowVideoDialog(true);
  };

  const handleEmailConsultation = () => {
    setShowEmailDialog(true);
  };

  const handleClinicCall = (clinic: typeof clinics[0]) => {
    setSelectedClinic(clinic);
    toast.success(`Llamando a ${clinic.name}...`, {
      description: `Tel: ${clinic.phone}`,
    });
  };

  const handleGetDirections = (clinic: typeof clinics[0]) => {
    toast.success(`Abriendo mapa para ${clinic.name}`, {
      description: clinic.address,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50 pb-24 relative">
      <AnimatedBackground />
      {/* Header con imagen */}
      <div className="relative h-40 overflow-hidden z-10">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1700665537604-412e89a285c3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2ZXRlcmluYXJ5JTIwZW1lcmdlbmN5JTIwY2FyZXxlbnwxfHx8fDE3NjExNjk4MDh8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Cuidado veterinario de emergencia"
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h1 className="text-slate-800 mb-1">Asistencia Remota</h1>
          <p className="text-slate-700 text-sm">
            Contacta ayuda profesional inmediatamente
          </p>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Opciones de contacto rápido */}
        <div className="space-y-3 mb-6">
          <Card className="bg-gradient-to-br from-rose-300 to-orange-300 border-0 shadow-md">
            <Button 
              onClick={handleEmergencyCall}
              className="w-full h-auto p-0 bg-transparent hover:bg-white/10 border-0"
            >
              <div className="p-4 w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-white/40 p-3 rounded-full">
                    <Phone className="size-6 text-rose-900" />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-rose-900 mb-0.5">Llamada de Emergencia</h3>
                    <p className="text-rose-800 text-sm">
                      Línea directa veterinaria 24/7
                    </p>
                  </div>
                </div>
              </div>
            </Button>
          </Card>

          <Card className="bg-white border-slate-200 shadow-sm">
            <Button 
              onClick={handleStartChat}
              className="w-full h-auto p-0 bg-transparent hover:bg-slate-50 border-0 text-left"
            >
              <div className="p-3 w-full">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <MessageCircle className="size-5 text-blue-700" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-800 mb-0.5 text-sm">Chat en Vivo</h3>
                    <p className="text-slate-600 text-xs">
                      Consulta con IA veterinaria
                    </p>
                  </div>
                </div>
              </div>
            </Button>
          </Card>

          <div className="grid grid-cols-2 gap-3">
            <Card className="bg-white border-slate-200 shadow-sm">
              <Button 
                onClick={handleVideoConsultation}
                className="w-full h-auto p-0 bg-transparent hover:bg-slate-50 border-0 text-left"
              >
                <div className="p-3 w-full">
                  <div className="bg-purple-100 p-2 rounded-lg mb-2 w-fit">
                    <Video className="size-5 text-purple-700" />
                  </div>
                  <h3 className="text-slate-800 mb-0.5 text-sm">Video Consulta</h3>
                  <p className="text-slate-600 text-xs">
                    Evaluación visual
                  </p>
                </div>
              </Button>
            </Card>

            <Card className="bg-white border-slate-200 shadow-sm">
              <Button 
                onClick={handleEmailConsultation}
                className="w-full h-auto p-0 bg-transparent hover:bg-slate-50 border-0 text-left"
              >
                <div className="p-3 w-full">
                  <div className="bg-green-100 p-2 rounded-lg mb-2 w-fit">
                    <Mail className="size-5 text-green-700" />
                  </div>
                  <h3 className="text-slate-800 mb-0.5 text-sm">Email</h3>
                  <p className="text-slate-600 text-xs">
                    Consulta escrita
                  </p>
                </div>
              </Button>
            </Card>
          </div>
        </div>

        {/* Clínicas cercanas */}
        <div className="mb-3">
          <h2 className="text-slate-800">Clínicas Cercanas</h2>
        </div>

        <div className="space-y-3">
          {clinics.map((clinic) => (
            <Card
              key={clinic.id}
              className="bg-white border-slate-200 shadow-sm overflow-hidden"
            >
              {/* Imagen de la clínica */}
              <div className="relative h-32 overflow-hidden">
                <ImageWithFallback
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {clinic.emergency && (
                  <div className="absolute top-2 right-2 bg-emerald-500 text-white px-2 py-1 rounded-full flex items-center gap-1 text-xs">
                    <Clock className="size-3" />
                    <span>24h</span>
                  </div>
                )}
              </div>
              
              <div className="p-3">
                <h3 className="text-slate-800 mb-2">{clinic.name}</h3>
                <div className="space-y-1 text-slate-600 mb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <MapPin className="size-3" />
                    <span>{clinic.distance} - {clinic.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="size-3" />
                    <span>{clinic.hours}</span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {clinic.services.map((service, idx) => (
                      <span key={idx} className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs">
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2">
                  <Button 
                    onClick={() => handleClinicCall(clinic)}
                    className="w-full h-10 bg-emerald-300 hover:bg-emerald-400 text-emerald-900 text-sm"
                  >
                    <Phone className="size-4 mr-2" />
                    Llamar: {clinic.phone}
                  </Button>
                  <Button 
                    onClick={() => handleGetDirections(clinic)}
                    variant="outline"
                    className="w-full h-10 border-slate-300 text-slate-700 hover:bg-slate-100 text-sm"
                  >
                    <MapPin className="size-4 mr-2" />
                    Cómo llegar
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Información adicional */}
        <Card className="bg-blue-100 border-blue-300 mt-4">
          <div className="p-3">
            <p className="text-blue-800 text-sm">
              <strong>💾 Consejo:</strong> Guarda estos números en tu teléfono 
              para acceso rápido en caso de emergencia.
            </p>
          </div>
        </Card>

        <Card className="bg-purple-100 border-purple-300 mt-3">
          <div className="p-3">
            <p className="text-purple-800 text-sm">
              <strong>🕐 Disponibilidad:</strong> Las clínicas marcadas con "24h" 
              atienden emergencias las 24 horas. Llama antes de ir para confirmar disponibilidad.
            </p>
          </div>
        </Card>
      </div>

      {/* Dialog de llamada de emergencia */}
      <Dialog open={showCallDialog} onOpenChange={setShowCallDialog}>
        <DialogContent className="bg-white max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Llamada de Emergencia</DialogTitle>
            <DialogDescription className="text-slate-600 text-sm">
              Conecta con veterinario de emergencia 24/7
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="space-y-2">
              <Label htmlFor="pet-name" className="text-slate-700 text-sm">Nombre de tu mascota</Label>
              <Input
                id="pet-name"
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                placeholder="Ej: Luna"
                className="bg-white border-slate-300 text-slate-800 h-10 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="pet-type" className="text-slate-700 text-sm">Tipo de mascota</Label>
              <Input
                id="pet-type"
                value={petType}
                onChange={(e) => setPetType(e.target.value)}
                placeholder="Ej: Perro, Gato, etc."
                className="bg-white border-slate-300 text-slate-800 h-10 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency" className="text-slate-700 text-sm">Nivel de urgencia</Label>
              <select
                id="urgency"
                value={urgencyLevel}
                onChange={(e) => setUrgencyLevel(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-slate-300 bg-white text-slate-800 text-sm h-10"
              >
                <option value="">Selecciona</option>
                <option value="critical">🔴 Crítica - Vida en riesgo</option>
                <option value="urgent">🟠 Urgente - Atención inmediata</option>
                <option value="moderate">🟡 Moderada - Dentro de 24 hrs</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergency-desc" className="text-slate-700 text-sm">
                Describe la emergencia
              </Label>
              <Textarea
                id="emergency-desc"
                value={emergencyDescription}
                onChange={(e) => setEmergencyDescription(e.target.value)}
                placeholder="Ej: Mi perro ingirió chocolate hace 30 minutos..."
                rows={3}
                className="bg-white border-slate-300 text-slate-800 text-sm"
              />
            </div>
            <Button 
              onClick={() => {
                if (!petName || !emergencyDescription) {
                  toast.error('Por favor completa todos los campos');
                  return;
                }
                toast.success('Conectando con emergencias...', {
                  description: `Para ${petName}`,
                });
                setShowCallDialog(false);
                setPetName('');
                setEmergencyDescription('');
                setUrgencyLevel('');
                setPetType('');
              }}
              className="w-full h-10 bg-rose-400 hover:bg-rose-500 text-rose-900 text-sm"
            >
              <Phone className="size-4 mr-2" />
              Iniciar Llamada de Emergencia
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de chat */}
      <Dialog open={showChatDialog} onOpenChange={setShowChatDialog}>
        <DialogContent className="bg-white max-w-sm mx-4 h-[80vh] flex flex-col p-0">
          <DialogHeader className="p-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <div>
                <DialogTitle className="text-slate-800 flex items-center gap-2">
                  <Bot className="size-5 text-blue-600" />
                  Asistente Virtual VetGuia
                </DialogTitle>
                <DialogDescription className="text-slate-600 text-xs">
                  Respuestas automáticas basadas en emergencias comunes
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowChatDialog(false)}
                className="h-8 w-8 p-0"
              >
                <X className="size-4" />
              </Button>
            </div>
          </DialogHeader>
          
          {/* Área de mensajes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {chatMessages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex gap-2 max-w-[85%] ${message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 size-7 rounded-full flex items-center justify-center ${
                    message.sender === 'user' ? 'bg-blue-500' : 'bg-emerald-500'
                  }`}>
                    {message.sender === 'user' ? (
                      <UserIcon className="size-4 text-white" />
                    ) : (
                      <Bot className="size-4 text-white" />
                    )}
                  </div>
                  <div>
                    <div className={`rounded-2xl px-3 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-slate-100 text-slate-800'
                    }`}>
                      <p className="text-sm">{message.text}</p>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 px-2">
                      {message.timestamp.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="flex gap-2 max-w-[85%]">
                  <div className="flex-shrink-0 size-7 rounded-full bg-emerald-500 flex items-center justify-center">
                    <Bot className="size-4 text-white" />
                  </div>
                  <div className="bg-slate-100 rounded-2xl px-3 py-2">
                    <div className="flex gap-1">
                      <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="size-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input de mensaje */}
          <div className="p-3 border-t border-slate-200">
            <div className="flex gap-2">
              <Input
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Escribe tu consulta..."
                className="flex-1 bg-white border-slate-300 text-slate-800 h-10 text-sm"
              />
              <Button 
                onClick={handleSendMessage}
                disabled={!currentMessage.trim() || isTyping}
                className="h-10 w-10 p-0 bg-blue-500 hover:bg-blue-600 text-white"
              >
                <Send className="size-4" />
              </Button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              💡 Escribe palabras clave: "envenenamiento", "asfixia", "sangrado", etc.
            </p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de video consulta */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent className="bg-white max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Video Consulta</DialogTitle>
            <DialogDescription className="text-slate-600 text-sm">
              Evaluación visual en tiempo real
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <Card className="bg-purple-50 border-purple-200">
              <div className="p-3">
                <h4 className="text-purple-900 mb-2 text-sm">Beneficios:</h4>
                <ul className="text-purple-800 text-xs space-y-1 ml-3">
                  <li>• El veterinario ve a tu mascota en vivo</li>
                  <li>• Evaluación visual de síntomas</li>
                  <li>• Instrucciones paso a paso en tiempo real</li>
                  <li>• Decisión sobre necesidad de visita presencial</li>
                </ul>
              </div>
            </Card>
            
            <div className="space-y-2">
              <Label className="text-slate-700 text-sm">Información de la consulta</Label>
              <Input
                placeholder="Nombre de tu mascota"
                className="bg-white border-slate-300 text-slate-800 h-10 text-sm"
              />
              <Textarea
                placeholder="Describe los síntomas o motivo de consulta..."
                rows={3}
                className="bg-white border-slate-300 text-slate-800 text-sm"
              />
            </div>

            <Card className="bg-amber-50 border-amber-200">
              <div className="p-3">
                <p className="text-amber-800 text-xs flex items-start gap-2">
                  <AlertCircle className="size-4 flex-shrink-0 mt-0.5" />
                  En una app real, esto iniciaría una videollamada con un veterinario disponible.
                </p>
              </div>
            </Card>

            <Button 
              onClick={() => {
                toast.success('Buscando veterinario disponible...');
                setTimeout(() => {
                  toast.success('Dr. Rodriguez está disponible', {
                    description: 'Iniciando videollamada...',
                  });
                }, 2000);
                setShowVideoDialog(false);
              }}
              className="w-full h-10 bg-purple-300 hover:bg-purple-400 text-purple-900 text-sm"
            >
              <Video className="size-4 mr-2" />
              Iniciar Video Consulta
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de consulta por email */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="bg-white max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle className="text-slate-800">Consulta por Email</DialogTitle>
            <DialogDescription className="text-slate-600 text-sm">
              Recibe respuesta detallada en 24-48 horas
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            <div className="space-y-2">
              <Label className="text-slate-700 text-sm">Tu email</Label>
              <Input
                type="email"
                placeholder="tu@email.com"
                className="bg-white border-slate-300 text-slate-800 h-10 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 text-sm">Nombre de tu mascota</Label>
              <Input
                placeholder="Ej: Max"
                className="bg-white border-slate-300 text-slate-800 h-10 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 text-sm">Especie y edad</Label>
              <Input
                placeholder="Ej: Perro, 5 años"
                className="bg-white border-slate-300 text-slate-800 h-10 text-sm"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-700 text-sm">Consulta detallada</Label>
              <Textarea
                placeholder="Describe los síntomas, cuándo comenzaron, cualquier cambio en comportamiento..."
                rows={4}
                className="bg-white border-slate-300 text-slate-800 text-sm"
              />
            </div>
            <Button 
              onClick={() => {
                toast.success('Consulta enviada exitosamente', {
                  description: 'Recibirás respuesta en 24-48 horas',
                });
                setShowEmailDialog(false);
              }}
              className="w-full h-10 bg-green-300 hover:bg-green-400 text-green-900 text-sm"
            >
              <Send className="size-4 mr-2" />
              Enviar Consulta
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}