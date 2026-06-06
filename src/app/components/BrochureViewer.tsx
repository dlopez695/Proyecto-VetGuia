import React, { useState } from 'react';
import { X, Download, ChevronLeft, ChevronRight, Share2, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';

interface BrochureViewerProps {
  brochureId: string;
  onClose: () => void;
}

interface BrochurePage {
  pageNumber: number;
  title: string;
  content: string[];
  image?: string;
  tips?: string[];
  warning?: string;
}

const brochureData: Record<string, { title: string; pages: BrochurePage[] }> = {
  '1': {
    title: 'Guía Básica de Salud Veterinaria',
    pages: [
      {
        pageNumber: 1,
        title: 'Introducción a la Salud de tu Mascota',
        content: [
          'Esta guía te ayudará a entender los cuidados básicos que tu mascota necesita para estar saludable.',
          'Aprenderás a identificar señales de alerta y cómo actuar en diferentes situaciones.',
        ],
        image: 'https://images.unsplash.com/photo-1759164955427-14ca448a839d?w=800',
        tips: [
          'Observa a tu mascota diariamente',
          'Mantén un registro de vacunas y desparasitaciones',
          'Lleva a tu mascota al veterinario al menos 2 veces al año',
        ],
      },
      {
        pageNumber: 2,
        title: 'Señales de una Mascota Saludable',
        content: [
          '✓ Ojos brillantes y limpios, sin secreciones',
          '✓ Nariz húmeda y fría (puede variar)',
          '✓ Encías rosadas y dientes limpios',
          '✓ Pelaje brillante sin calvas',
          '✓ Energía normal para su edad',
          '✓ Apetito regular',
          '✓ Buen ánimo y sociable',
        ],
        image: 'https://images.unsplash.com/photo-1661552066736-935e0cad1782?w=800',
      },
      {
        pageNumber: 3,
        title: 'Señales de Alerta - Cuándo Preocuparse',
        content: [
          '⚠️ Vómitos frecuentes o diarrea (más de 2 veces)',
          '⚠️ No come ni toma agua por más de 24 horas',
          '⚠️ Dificultad para respirar o tos persistente',
          '⚠️ Sangrado o heridas que no paran',
          '⚠️ Abdomen hinchado o muy duro',
          '⚠️ Convulsiones o pérdida de consciencia',
          '⚠️ Gemidos constantes o no quiere moverse',
        ],
        warning: '¡URGENTE! Si ves estas señales, lleva a tu mascota al veterinario inmediatamente.',
      },
      {
        pageNumber: 4,
        title: 'Control de Temperatura',
        content: [
          'La temperatura normal de perros y gatos es entre 38°C y 39°C.',
          'Cómo tomar la temperatura:',
          '1. Usa un termómetro digital',
          '2. Aplica un poco de vaselina',
          '3. Insértalo suavemente en el recto (2-3 cm)',
          '4. Espera el pitido (1-2 minutos)',
          '5. Limpia y desinfecta el termómetro',
        ],
        tips: [
          'Temperatura menor a 37°C = Hipotermia → Busca ayuda',
          'Temperatura mayor a 40°C = Fiebre → Busca ayuda',
        ],
      },
    ],
  },
  '2': {
    title: 'Nutrición Adecuada para Mascotas',
    pages: [
      {
        pageNumber: 1,
        title: 'Alimentación Balanceada',
        content: [
          'Una buena alimentación es la base de la salud de tu mascota.',
          'Cada edad y tamaño requiere diferentes nutrientes.',
        ],
        image: 'https://images.unsplash.com/photo-1761764777062-cae8dfd807e1?w=800',
      },
      {
        pageNumber: 2,
        title: 'Cantidad Diaria Recomendada',
        content: [
          'PERROS PEQUEÑOS (hasta 10 kg):',
          '• Cachorros: 3-4 comidas al día',
          '• Adultos: 2 comidas al día (150-250g)',
          '',
          'PERROS MEDIANOS (10-25 kg):',
          '• Cachorros: 3 comidas al día',
          '• Adultos: 2 comidas al día (250-400g)',
          '',
          'PERROS GRANDES (más de 25 kg):',
          '• Cachorros: 3 comidas al día',
          '• Adultos: 2 comidas al día (400-600g)',
        ],
        tips: [
          'Siempre deja agua fresca disponible',
          'No cambies la comida bruscamente',
        ],
      },
      {
        pageNumber: 3,
        title: 'Alimentos PROHIBIDOS',
        content: [
          '🚫 Chocolate - Muy tóxico, puede causar muerte',
          '🚫 Uvas y pasas - Daño a los riñones',
          '🚫 Cebolla y ajo - Daña los glóbulos rojos',
          '🚫 Aguacate - Tóxico para el corazón',
          '🚫 Alcohol - Muy peligroso',
          '🚫 Café y té - Estimulantes peligrosos',
          '🚫 Huesos cocidos - Se astillan y lastiman',
          '🚫 Dulces y chicles - Contienen xilitol tóxico',
        ],
        warning: 'Si tu mascota comió algo de esta lista, llama al veterinario inmediatamente.',
        image: 'https://images.unsplash.com/photo-1694238689915-47662ada9ba5?w=800',
      },
      {
        pageNumber: 4,
        title: 'Señales de Buena Nutrición',
        content: [
          '✓ Peso adecuado (puedes sentir sus costillas pero no verlas)',
          '✓ Pelaje brillante y suave',
          '✓ Buena energía y vitalidad',
          '✓ Heces firmes y consistentes',
          '✓ Buen apetito regular',
        ],
        tips: [
          'Pesa a tu mascota cada mes',
          'Ajusta la comida según su actividad',
          'Los premios no deben ser más del 10% de su dieta',
        ],
      },
    ],
  },
  '3': {
    title: 'Calendario de Vacunación',
    pages: [
      {
        pageNumber: 1,
        title: 'Importancia de las Vacunas',
        content: [
          'Las vacunas protegen a tu mascota de enfermedades graves y mortales.',
          'También protegen a otros animales y a tu familia.',
        ],
        image: 'https://images.unsplash.com/photo-1761203429504-56ece2d6eeb6?w=800',
      },
      {
        pageNumber: 2,
        title: 'Calendario para PERROS',
        content: [
          '6-8 SEMANAS:',
          '• Primera dosis de Parvovirus',
          '• Primera dosis de Moquillo',
          '',
          '10-12 SEMANAS:',
          '• Segunda dosis (refuerzo)',
          '',
          '14-16 SEMANAS:',
          '• Tercera dosis (refuerzo)',
          '• Vacuna contra Rabia',
          '',
          'ANUALMENTE:',
          '• Refuerzo de todas las vacunas',
          '• Vacuna contra Rabia (cada año)',
        ],
        tips: [
          'Guarda el carnet de vacunación',
          'No saques al cachorro hasta completar vacunas',
        ],
      },
      {
        pageNumber: 3,
        title: 'Calendario para GATOS',
        content: [
          '6-8 SEMANAS:',
          '• Primera dosis Triple Felina',
          '',
          '12 SEMANAS:',
          '• Segunda dosis (refuerzo)',
          '',
          '16 SEMANAS:',
          '• Tercera dosis (refuerzo)',
          '• Vacuna contra Rabia',
          '',
          'ANUALMENTE:',
          '• Refuerzo de todas las vacunas',
        ],
        image: 'https://images.unsplash.com/photo-1733376080833-04e3623f8f52?w=800',
      },
      {
        pageNumber: 4,
        title: 'Desparasitación',
        content: [
          'Tan importante como las vacunas.',
          '',
          'CACHORROS (2-12 semanas):',
          '• Desparasitar cada 2 semanas',
          '',
          'JOVENES (3-6 meses):',
          '• Desparasitar cada mes',
          '',
          'ADULTOS:',
          '• Desparasitar cada 3 meses',
          '',
          'Parásitos comunes: lombrices, tenias, pulgas, garrapatas',
        ],
        warning: 'Los parásitos pueden pasar a los humanos. Mantén a tu familia segura.',
      },
    ],
  },
  '4': {
    title: 'Cuidado Dental en Mascotas',
    pages: [
      {
        pageNumber: 1,
        title: '¿Por qué es importante?',
        content: [
          'La salud dental afecta todo el cuerpo de tu mascota.',
          'El 80% de perros y gatos mayores de 3 años tienen problemas dentales.',
          'Puede causar dolor, pérdida de dientes, y enfermedades en órganos.',
        ],
        image: 'https://images.unsplash.com/photo-1694371351705-de61b17774cf?w=800',
      },
      {
        pageNumber: 2,
        title: 'Señales de Problemas Dentales',
        content: [
          '⚠️ Mal aliento fuerte',
          '⚠️ Encías rojas o sangrantes',
          '⚠️ Dientes amarillos o marrones',
          '⚠️ No quiere comer cosas duras',
          '⚠️ Se toca la boca con la pata',
          '⚠️ Babea mucho',
          '⚠️ Dientes flojos o caídos',
        ],
        warning: 'Si ves estas señales, visita al veterinario pronto.',
      },
      {
        pageNumber: 3,
        title: 'Cómo Cepillar los Dientes',
        content: [
          'PASO 1: Acostumbra a tu mascota',
          '• Toca sus labios y dientes suavemente varios días',
          '',
          'PASO 2: Usa pasta dental para mascotas',
          '• NUNCA uses pasta humana (es tóxica)',
          '',
          'PASO 3: Cepilla suavemente',
          '• Movimientos circulares',
          '• Enfócate en la línea de las encías',
          '• 30 segundos por lado',
          '',
          'FRECUENCIA: Ideal diario, mínimo 3 veces/semana',
        ],
        tips: [
          'Empieza de cachorro para que se acostumbre',
          'Usa premios después del cepillado',
        ],
      },
      {
        pageNumber: 4,
        title: 'Alternativas al Cepillado',
        content: [
          '🦴 Juguetes dentales: Ayudan a limpiar al masticar',
          '',
          '🦴 Premios dentales: Diseñados para limpiar dientes',
          '',
          '🦴 Comida dental: Croquetas especiales',
          '',
          '🦴 Enjuagues dentales: Se agregan al agua',
          '',
          '🦴 Limpieza profesional: Cada 1-2 años en el veterinario',
        ],
        image: 'https://images.unsplash.com/photo-1602879535314-3ae6fba01c92?w=800',
      },
    ],
  },
  '5': {
    title: 'Prevención de Parásitos',
    pages: [
      {
        pageNumber: 1,
        title: 'Tipos de Parásitos',
        content: [
          'EXTERNOS (en la piel):',
          '• Pulgas',
          '• Garrapatas',
          '• Ácaros',
          '',
          'INTERNOS (dentro del cuerpo):',
          '• Lombrices intestinales',
          '• Tenias',
          '• Giardia',
        ],
        image: 'https://images.unsplash.com/photo-1716275695521-9402bec08236?w=800',
      },
      {
        pageNumber: 2,
        title: 'PULGAS - Identificación',
        content: [
          'Señales de pulgas:',
          '• Se rasca mucho',
          '• Puntos negros en el pelo (excremento de pulgas)',
          '• Piel irritada o rojiza',
          '• Pérdida de pelo en zonas',
          '',
          'Peligros:',
          '• Causan alergias severas',
          '• Transmiten tenias',
          '• Pueden causar anemia',
        ],
        tips: [
          'Una pulga puede poner 50 huevos al día',
          'El 95% de pulgas están en el ambiente, no en tu mascota',
        ],
      },
      {
        pageNumber: 3,
        title: 'GARRAPATAS - Prevención',
        content: [
          'Dónde se encuentran:',
          '• Pasto alto',
          '• Árboles y arbustos',
          '• Zonas con mucha vegetación',
          '',
          'Cómo removerlas:',
          '1. Usa pinzas especiales o guantes',
          '2. Agarra cerca de la piel',
          '3. Tira firme y recto hacia arriba',
          '4. NO la aplastes',
          '5. Limpia la zona con alcohol',
          '6. Guarda la garrapata en alcohol',
        ],
        warning: 'Las garrapatas transmiten enfermedades graves. Si tu mascota actuó raro después de una garrapata, ve al veterinario.',
      },
      {
        pageNumber: 4,
        title: 'Calendario de Prevención',
        content: [
          'MENSUALMENTE:',
          '• Aplica pipeta o collar antiparasitario',
          '• Revisa a tu mascota buscando pulgas/garrapatas',
          '',
          'CADA 3 MESES:',
          '• Desparasitación interna (pastillas)',
          '',
          'CONSTANTEMENTE:',
          '• Limpia y aspira tu casa',
          '• Lava las camas y cobijas',
          '• Corta el pasto del jardín',
        ],
        tips: [
          'Trata TODOS los animales de la casa',
          'Los parásitos se multiplican rápido',
          'La prevención es más barata que el tratamiento',
        ],
      },
    ],
  },
  '6': {
    title: 'Primeros Auxilios de Emergencia',
    pages: [
      {
        pageNumber: 1,
        title: 'Qué Hacer en una Emergencia',
        content: [
          '1. MANTÉN LA CALMA - Tu mascota siente tu nerviosismo',
          '2. EVALÚA LA SITUACIÓN - ¿Está consciente? ¿Respira?',
          '3. PROTÉGETE - Usa guantes, el animal puede morder',
          '4. CONTACTA AL VETERINARIO - Llama mientras vas en camino',
          '5. TRANSPORTA SEGURO - Usa una caja o tabla rígida',
        ],
        image: 'https://images.unsplash.com/photo-1733376080833-04e3623f8f52?w=800',
        warning: 'Los primeros auxilios NO reemplazan la atención veterinaria. Siempre busca ayuda profesional.',
      },
      {
        pageNumber: 2,
        title: 'Asfixia - Qué Hacer',
        content: [
          'Señales de asfixia:',
          '• Se atraganta o tose violentamente',
          '• Hace ruidos extraños',
          '• Boca azul o morada',
          '• Pánico evidente',
          '',
          'PASO 1: Abre su boca y busca el objeto',
          'PASO 2: Si lo ves, sácalo con tus dedos',
          'PASO 3: Si no sale, usa maniobra de Heimlich:',
          '  - Perros: 5 compresiones en el abdomen',
          '  - Gatos: Sujetalo boca abajo y da palmadas',
        ],
        image: 'https://images.unsplash.com/photo-1704584592242-ea4705cf391d?w=800',
        warning: '¡EMERGENCIA EXTREMA! Ve al veterinario inmediatamente después.',
      },
      {
        pageNumber: 3,
        title: 'Heridas y Sangrado',
        content: [
          'Para sangrado leve:',
          '1. Lava con agua limpia',
          '2. Aplica presión con gasa limpia (5 min)',
          '3. Desinfecta con betadine o clorhexidina',
          '4. Cubre con vendaje limpio',
          '',
          'Para sangrado abundante:',
          '1. Presiona FUERTE con toalla limpia',
          '2. NO quites la toalla aunque se empape',
          '3. Agrega más toallas encima',
          '4. Mantén presión 10-15 minutos',
          '5. VE AL VETERINARIO YA',
        ],
        image: 'https://images.unsplash.com/photo-1602879535314-3ae6fba01c92?w=800',
      },
      {
        pageNumber: 4,
        title: 'Golpe de Calor',
        content: [
          'Señales:',
          '• Jadeo excesivo',
          '• Saliva espesa',
          '• Vómitos',
          '• Debilidad o colapso',
          '',
          'Primeros auxilios:',
          '1. Muévelo a la sombra inmediatamente',
          '2. Moja con agua FRESCA (no helada)',
          '3. Ofrece agua para beber (poco a poco)',
          '4. Ventila o usa aire acondicionado',
          '5. Ve al veterinario aunque mejore',
        ],
        image: 'https://images.unsplash.com/photo-1564406860401-1a35364fb9b9?w=800',
        warning: '¡MORTAL! NUNCA dejes a tu mascota en el carro. En 10 minutos puede morir.',
      },
    ],
  },
};

export default function BrochureViewer({ brochureId, onClose }: BrochureViewerProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [downloadAlert, setDownloadAlert] = useState(false);

  const brochure = brochureData[brochureId];
  
  if (!brochure) {
    return null;
  }

  const totalPages = brochure.pages.length;
  const page = brochure.pages[currentPage];

  const handleDownload = () => {
    setDownloadAlert(true);
    setTimeout(() => setDownloadAlert(false), 3000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: brochure.title,
        text: `Mira este folleto de VetGuia: ${brochure.title}`,
      }).catch(() => {});
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#AEE5C9] to-[#8FD4B3] p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1">
              <h2 className="text-white mb-1">{brochure.title}</h2>
              <Badge className="bg-white/20 text-white border-0">
                Página {page.pageNumber} de {totalPages}
              </Badge>
            </div>
            <Button
              onClick={onClose}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Download Alert */}
        {downloadAlert && (
          <Alert className="m-4 bg-[#AEE5C9] border-[#8FD4B3] text-[#2C5F2D]">
            <Download className="h-4 w-4" />
            <AlertDescription>
              ¡Folleto descargado! Ahora disponible sin internet.
            </AlertDescription>
          </Alert>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <h3 className="text-[#2C5F2D] mb-4">{page.title}</h3>

          {/* Image */}
          {page.image && (
            <div className="rounded-xl overflow-hidden mb-4 bg-[#F6F6F6]">
              <img
                src={page.image}
                alt={page.title}
                className="w-full h-48 object-cover"
              />
            </div>
          )}

          {/* Content */}
          <div className="space-y-3 mb-4">
            {page.content.map((paragraph, index) => (
              <p
                key={index}
                className={`text-gray-700 ${
                  paragraph.startsWith('•') || paragraph.startsWith('✓') || paragraph.startsWith('⚠️') || paragraph.startsWith('🚫') || paragraph.startsWith('🦴')
                    ? 'pl-2'
                    : ''
                } ${paragraph === '' ? 'h-2' : ''}`}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Tips */}
          {page.tips && page.tips.length > 0 && (
            <Card className="bg-[#FFF6E8] border-[#AEE5C9] p-4 mb-4">
              <p className="text-sm mb-2 text-[#2C5F2D]">💡 Consejos importantes:</p>
              <ul className="space-y-2">
                {page.tips.map((tip, index) => (
                  <li key={index} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-[#AEE5C9] mt-0.5">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Warning */}
          {page.warning && (
            <Alert className="bg-red-50 border-red-200 text-red-800">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{page.warning}</AlertDescription>
            </Alert>
          )}
        </div>

        {/* Footer Navigation */}
        <div className="border-t border-gray-200 p-4 bg-[#F6F6F6]">
          <div className="flex justify-between items-center mb-3">
            <Button
              onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              variant="outline"
              className="border-[#AEE5C9] text-[#2C5F2D]"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Anterior
            </Button>

            <span className="text-sm text-gray-600">
              {currentPage + 1} / {totalPages}
            </span>

            <Button
              onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="bg-gradient-to-r from-[#AEE5C9] to-[#8FD4B3] text-white"
            >
              Siguiente
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleDownload}
              className="flex-1 bg-white border-2 border-[#AEE5C9] text-[#2C5F2D] hover:bg-[#F6F6F6]"
            >
              <Download className="w-4 h-4 mr-2" />
              Descargar
            </Button>
            <Button
              onClick={handleShare}
              className="flex-1 bg-gradient-to-r from-[#AEE5C9] to-[#8FD4B3] text-white"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Compartir
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
