import { useState } from 'react';
import { Card } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { AnimatedBackground } from './AnimatedBackground';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Info, AlertCircle } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface KitItem {
  id: string;
  name: string;
  essential: boolean;
  image: string;
  description: string;
  usage: string;
  warnings?: string;
  quantity: string;
}

const kitItems: {
  id: string;
  category: string;
  items: KitItem[];
}[] = [
  {
    id: '1',
    category: 'Esenciales Básicos',
    items: [
      {
        id: 'gauze',
        name: 'Gasas estériles',
        essential: true,
        image: 'https://images.unsplash.com/photo-1648224394432-8830fec15349?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZ2F1emUlMjBwYWRzfGVufDF8fHx8MTc2MjAzMTg0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Compresas de gasa estéril para limpiar heridas y aplicar presión sobre hemorragias.',
        usage: 'Usa para: limpiar heridas, aplicar presión directa en sangrados, cubrir quemaduras, hacer apósitos. Siempre usa gasa estéril para evitar infecciones. No reutilices.',
        warnings: 'NO remuevas gasa que esté pegada a una herida sangrando - añade más encima. NO uses algodón directamente en heridas (deja fibras).',
        quantity: 'Al menos 20-30 piezas de diferentes tamaños (5x5cm y 10x10cm)'
      },
      {
        id: 'bandages',
        name: 'Vendas elásticas',
        essential: true,
        image: 'https://images.unsplash.com/photo-1685423559016-66ea629b3909?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGFzdGljJTIwYmFuZGFnZSUyMHZldGVyaW5hcnl8ZW58MXx8fHwxNzYyMDMxODQ2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Vendas autoadhesivas tipo "vet wrap" que se pegan a sí mismas pero no al pelo.',
        usage: 'Perfectas para asegurar gasas, proteger heridas, dar soporte a extremidades. Envuelve con presión moderada - debe permitir meter un dedo debajo. Empieza desde abajo hacia arriba con superposición del 50%.',
        warnings: 'NO envuelvas demasiado apretado - puede cortar circulación. Verifica dedos cada 30 minutos: deben estar tibios y rosados. Si están fríos o azulados, afloja INMEDIATAMENTE.',
        quantity: '3-4 rollos de diferentes anchos (2.5cm, 5cm, 7.5cm)'
      },
      {
        id: 'tape',
        name: 'Cinta adhesiva médica',
        essential: true,
        image: 'https://images.unsplash.com/photo-1603735198065-27159af4730c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwYWRoZXNpdmUlMjB0YXBlfGVufDF8fHx8MTc2MjAzMTg0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Cinta hipoalergénica que no irrita la piel. Se usa para fijar apósitos y vendajes.',
        usage: 'Usa para asegurar gasas, fijar vendajes, marcar márgenes de hinchazón. Aplica sin estirar demasiado. Si no tienes venda elástica, puede servir temporalmente.',
        warnings: 'NO apliques directamente sobre pelo (muy doloroso de remover). Retira lentamente para evitar daño en piel.',
        quantity: '2-3 rollos (cinta de papel o microporo)'
      },
      {
        id: 'scissors',
        name: 'Tijeras de punta roma',
        essential: true,
        image: 'https://images.unsplash.com/photo-1625249306438-f425af43ef59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc2Npc3NvcnMlMjB0d2VlemVyc3xlbnwxfHx8fDE3NjIwMzAzNjV8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Tijeras con puntas redondeadas para cortar vendas y pelo sin lastimar.',
        usage: 'Usa para: cortar vendas, recortar pelo alrededor de heridas, cortar cinta. Las puntas romas previenen cortes accidentales en piel.',
        warnings: 'Mantén limpias y desinfectadas. NO uses tijeras normales cerca de heridas.',
        quantity: '1 tijera de buena calidad'
      },
      {
        id: 'tweezers',
        name: 'Pinzas',
        essential: true,
        image: 'https://images.unsplash.com/photo-1623867821208-c4d8025f8194?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXJnaWNhbCUyMGZvcmNlcHMlMjB0d2VlemVyc3xlbnwxfHx8fDE3NjIwMzE4NDd8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Pinzas de punta fina para remover astillas, espinas, garrapatas y objetos pequeños.',
        usage: 'Para remover garrapatas: agarra cerca de la piel, tira suave y constantemente hacia arriba sin girar. Para astillas: desinfecta antes y después. Trabaja con buena luz.',
        warnings: 'NO aprietes garrapatas (libera toxinas). NO uses para objetos profundamente clavados - pueden empeorar.',
        quantity: '1 pinza de punta fina'
      },
      {
        id: 'gloves',
        name: 'Guantes desechables',
        essential: true,
        image: 'https://images.unsplash.com/photo-1588160546938-8001045695ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwZ2xvdmVzJTIwbGF0ZXh8ZW58MXx8fHwxNzYyMDMwMzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Guantes de nitrilo o látex para protegerte de fluidos corporales y prevenir contaminación.',
        usage: 'USA SIEMPRE cuando manejes heridas, sangre, vómito, diarrea. Protege a tu mascota de bacterias de tus manos y te protege a ti.',
        warnings: 'Si eres alérgico al látex, usa nitrilo. Cambia entre pacientes. Desecha después de usar.',
        quantity: 'Caja de 20-50 guantes (talla apropiada para ti)'
      },
    ],
  },
  {
    id: '2',
    category: 'Medicamentos y Soluciones',
    items: [
      {
        id: 'antiseptic',
        name: 'Solución antiséptica (Clorhexidina)',
        essential: true,
        image: 'https://images.unsplash.com/photo-1676286168358-9b4ce60384d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxpbmUlMjBiYWclMjBob3NwaXRhbHxlbnwxfHx8fDE3NjIwMzE4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Clorhexidina al 0.05-0.2% - antiséptico suave que mata bacterias sin dañar tejidos.',
        usage: 'Limpia heridas antes de vendar. Diluye si es concentrado (sigue instrucciones). Aplica con gasa estéril. Deja actuar 30 segundos antes de secar.',
        warnings: 'NO uses en ojos, oídos internos o membranas mucosas. NO mezcles con jabón (se inactiva). Preferible a peróxido de hidrógeno que daña tejido.',
        quantity: '250-500ml de solución'
      },
      {
        id: 'saline',
        name: 'Solución salina estéril',
        essential: true,
        image: 'https://images.unsplash.com/photo-1676286168358-9b4ce60384d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYWxpbmUlMjBiYWclMjBob3NwaXRhbHxlbnwxfHx8fDE3NjIwMzE4NDh8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Solución de agua con sal al 0.9% - igual a los fluidos corporales. Suave y segura.',
        usage: 'Enjuaga heridas, lava ojos, humedece membranas mucosas, limpia antes de aplicar antiséptico. Segura para todo el cuerpo. Puedes hacer casera: 1 cucharadita de sal en 1 litro de agua hervida.',
        warnings: 'Usa solo solución estéril para ojos y heridas profundas. Desecha después de abrir si no está sellada.',
        quantity: '500ml-1L o varios envases de 100ml tipo gotas'
      },
      {
        id: 'hydrogen',
        name: 'Agua oxigenada (Peróxido de hidrógeno 3%)',
        essential: false,
        image: 'https://images.unsplash.com/photo-1621331462282-0c890b7c933b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpc2VwdGljJTIwc29sdXRpb24lMjBib3R0bGV8ZW58MXx8fHwxNzYyMDMwMzY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'SOLO para inducir vómito cuando lo indique un veterinario. NO para limpiar heridas.',
        usage: 'ÚNICAMENTE bajo instrucción veterinaria para inducir vómito en casos de envenenamiento. Dosis: 1 cucharadita por cada 5kg de peso (máximo 3 cucharadas). Funciona en 10-15 minutos.',
        warnings: 'NO usar para limpiar heridas (daña tejido). NO inducir vómito sin autorización veterinaria. NO funciona en gatos. NO usar si la mascota está inconsciente, convulsionando, o tragó ácidos/álcalis.',
        quantity: '1 botella de 250ml (reemplazar cada 6 meses)'
      },
      {
        id: 'antibiotic',
        name: 'Pomada antibiótica triple',
        essential: true,
        image: 'https://images.unsplash.com/photo-1562411054-261f857a7c62?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhbnRpYmlvdGljJTIwb2ludG1lbnQlMjB0dWJlfGVufDF8fHx8MTc2MjAzMTg0OHww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Pomada con neomicina, polimixina B y bacitracina para prevenir infección en heridas superficiales.',
        usage: 'Aplica capa delgada en heridas limpias y secas 2-3 veces al día. Limpia la herida primero con solución salina.',
        warnings: 'NO uses si tu mascota se la puede lamer (puede causar malestar estomacal). NO uses en heridas profundas sin consultar. Algunas mascotas son alérgicas.',
        quantity: '1-2 tubos pequeños'
      },
      {
        id: 'eyewash',
        name: 'Lavado ocular estéril',
        essential: true,
        image: 'https://images.unsplash.com/photo-1579165466741-7f35e4755660?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxleWUlMjB3YXNoJTIwZHJvcHN8ZW58MXx8fHwxNzYyMDMwMzY2fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Solución salina estéril en botella con pico especial para enjuagar ojos.',
        usage: 'Usa para quitar irritantes, polvo, químicos de los ojos. Enjuaga abundantemente durante 15-20 minutos si hay químico. Mantén la cabeza inclinada para que el líquido drene del ojo interno hacia afuera.',
        warnings: 'NO uses agua de grifo en ojos. NO toques el ojo con la botella. Si hay objeto penetrante, NO enjuagues - ve al veterinario.',
        quantity: '1-2 botellas de 120ml o solución salina estéril'
      },
      {
        id: 'activated_charcoal',
        name: 'Carbón activado',
        essential: false,
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyY29hbCUyMHBvd2RlciUyMGJvdHRsZXxlbnwxfHx8fDE3NjIwMzAzNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Absorbe toxinas en el estómago. SOLO bajo instrucción veterinaria.',
        usage: 'Dosis típica: 1 gramo por kg de peso corporal, mezclado con agua. Solo si el veterinario lo indica. Más efectivo dentro de la primera hora de ingestión.',
        warnings: 'NO des sin consultar al veterinario. NO funciona para todos los venenos (ej: metales, ácidos). NO des si está inconsciente.',
        quantity: '1 frasco de polvo o tabletas'
      },
    ],
  },
  {
    id: '3',
    category: 'Instrumentos Diagnósticos',
    items: [
      {
        id: 'thermometer',
        name: 'Termómetro digital rectal',
        essential: true,
        image: 'https://images.unsplash.com/photo-1685660375082-7b9b12260031?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWdpdGFsJTIwdGhlcm1vbWV0ZXIlMjBtZWRpY2FsfGVufDF8fHx8MTc2MjAzMDM2Nnww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Termómetro digital para medir temperatura rectal (la más precisa en mascotas).',
        usage: 'Lubrica con vaselina, inserta suavemente 2-3cm, espera el pitido. Normal: perros 38-39°C, gatos 38-39.2°C. >40°C es fiebre, <37.5°C es hipotermia.',
        warnings: 'NUNCA uses termómetros de oído o frente en mascotas (imprecisos). NO fuerces si hay resistencia. Limpia con alcohol después.',
        quantity: '1 termómetro etiquetado "uso veterinario"'
      },
      {
        id: 'syringe',
        name: 'Jeringas sin aguja',
        essential: true,
        image: 'https://images.unsplash.com/photo-1592997372445-38551157310f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwc3lyaW5nZXxlbnwxfHx8fDE3NjIwMzAzNjZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Jeringas de 3ml, 5ml, 10ml para administrar medicamentos líquidos orales o irrigar heridas.',
        usage: 'Administra medicamentos orales: coloca la jeringa en el lado de la boca (entre mejilla y dientes), no directamente en garganta. Da lentamente. Para irrigar: aplica presión suave para limpiar heridas.',
        warnings: 'NO administres directamente en garganta (riesgo de asfixia). Nunca reutilices jeringas entre mascotas sin esterilizar.',
        quantity: 'Set de 6-10 jeringas de diferentes tamaños'
      },
      {
        id: 'flashlight',
        name: 'Linterna pequeña o penlight',
        essential: true,
        image: 'https://images.unsplash.com/photo-1574624181793-06124e5c258d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmbGFzaGxpZ2h0JTIwZW1lcmdlbmN5JTIwbGlnaHR8ZW58MXx8fHwxNzYyMDMwMzcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Luz pequeña para examinar ojos, boca, oídos y heridas en lugares oscuros.',
        usage: 'Examina pupilas (deben contraerse con luz), revisa color de encías, busca objetos en boca, inspecciona heridas. Útil en emergencias nocturnas.',
        warnings: 'NO apuntes directamente a los ojos por tiempo prolongado. Mantén baterías cargadas.',
        quantity: '1 linterna pequeña + baterías de repuesto'
      },
      {
        id: 'stethoscope',
        name: 'Estetoscopio básico',
        essential: false,
        image: 'https://images.unsplash.com/photo-1584362917165-526a968579e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGV0aG9zY29wZSUyMG1lZGljYWx8ZW58MXx8fHwxNzYyMDMwMzY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Para escuchar corazón y pulmones. Útil si sabes interpretarlo.',
        usage: 'Coloca en lado izquierdo del pecho detrás del codo para corazón. Normal: 60-160 latidos/min (varía por tamaño). Para pulmones: escucha ambos lados del pecho.',
        warnings: 'Requiere práctica para interpretar. NO reemplaza evaluación veterinaria.',
        quantity: '1 estetoscopio básico'
      },
    ],
  },
  {
    id: '4',
    category: 'Equipo de Restricción y Transporte',
    items: [
      {
        id: 'muzzle',
        name: 'Bozal de emergencia o material para hacerlo',
        essential: false,
        image: 'https://images.unsplash.com/photo-1518517560115-018e8de868b5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBtdXp6bGV8ZW58MXx8fHwxNzYyMDMxODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Incluso mascotas amables pueden morder cuando tienen dolor. Un bozal protege a todos.',
        usage: 'Para bozal improvisado: usa venda/tira de tela larga. Haz un lazo alrededor del hocico (arriba), cruza debajo, ata detrás de las orejas. Debe permitir jadeo ligero.',
        warnings: 'NUNCA uses bozal si: vomita, tiene dificultad respiratoria, está inconsciente, tiene trauma facial, o es braquicefálico (cara chata). NO dejes puesto más de 15-20 minutos.',
        quantity: '1 bozal ajustable o vendas largas para hacer uno'
      },
      {
        id: 'elizabethan',
        name: 'Collar isabelino (cono)',
        essential: true,
        image: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBjb25lJTIwY29sbGFyfGVufDF8fHx8MTc2MjAzMDM2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Previene que tu mascota lama o rasque heridas, ojos o vendajes.',
        usage: 'Ajusta para que quede cómodo pero no se quite. Debe extenderse más allá de la nariz. Permite comer y beber. Supervisa al principio hasta que se acostumbre.',
        warnings: 'Supervisa al comer/beber inicialmente. Quita para alimentar si tiene dificultad. Algunos animales necesitan platos elevados.',
        quantity: '1 collar de talla apropiada (o ajustable)'
      },
      {
        id: 'carrier',
        name: 'Transportadora rígida o correa',
        essential: true,
        image: 'https://images.unsplash.com/photo-1678937083731-2f567fa94ad3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2clMjBsZWFzaCUyMHdhbGtpbmd8ZW58MXx8fHwxNzYxOTM2NTkyfDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Para transportar de forma segura a tu mascota al veterinario.',
        usage: 'Gatos/animales pequeños: usa transportadora rígida (más segura). Perros: correa resistente y collar bien ajustado. Para trauma: usa tabla o manta como camilla improvisada.',
        warnings: 'NO uses transportadoras de tela para emergencias (pueden escapar). Asegura bien en el auto.',
        quantity: '1 transportadora (gatos/pequeños) o correa resistente + collar de respaldo'
      },
      {
        id: 'towels',
        name: 'Toallas limpias',
        essential: true,
        image: 'https://images.unsplash.com/photo-1737065183310-aef762bd011c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjbGVhbiUyMHRvd2VscyUyMG1lZGljYWx8ZW58MXx8fHwxNzYyMDMwMzcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Multiuso: controlar sangrado, envolver mascotas, limpiar, secar, calentar.',
        usage: 'Controla hemorragias aplicando presión. Envuelve mascotas en shock para mantener calor. Seca mascotas mojadas. Usa como camilla improvisada. Cubre superficies en emergencias.',
        warnings: 'Mantén limpias y secas. Lava después de usar con agua caliente. Guarda varias en el botiquín.',
        quantity: '4-6 toallas medianas limpias'
      },
      {
        id: 'blanket',
        name: 'Manta térmica de emergencia',
        essential: false,
        image: 'https://images.unsplash.com/photo-1545155085-77999e613b95?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb2xkZWQlMjBibGFua2V0fGVufDF8fHx8MTc2MjAzMTg0OXww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Manta plateada de emergencia que refleja calor corporal. Previene hipotermia.',
        usage: 'Usa en: shock, hipotermia, después de mojarse, pérdida de sangre. Envuelve a tu mascota dejando la cara libre. Combina con toallas para mayor efectividad.',
        warnings: 'NO uses en golpe de calor. NO cubras la cara. Supervisa para prevenir asfixia.',
        quantity: '2 mantas de emergencia (son económicas y pequeñas)'
      },
      {
        id: 'stretcher',
        name: 'Camilla improvisada o tabla rígida',
        essential: false,
        image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b29kZW4lMjBwbGFuayUyMGJvYXJkfGVufDF8fHx8MTc2MjAzMDM2N3ww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Superficie rígida para mover mascotas con trauma espinal o fracturas.',
        usage: 'Para mover mascotas con sospecha de fractura espinal o trauma mayor. Usa tabla, puerta, cartón grueso. Desliza con cuidado debajo del animal. Mueve como unidad rígida.',
        warnings: 'Minimiza movimiento al máximo. Requiere 2+ personas. Llama al veterinario para instrucciones.',
        quantity: 'Una tabla rígida o conocimiento de cómo improvisar'
      },
    ],
  },
  {
    id: '5',
    category: 'Información y Documentos',
    items: [
      {
        id: 'contacts',
        name: 'Lista de contactos de emergencia',
        essential: true,
        image: 'https://images.unsplash.com/photo-1643446950085-d5cfdba8cfdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbWVyZ2VuY3klMjBjb250YWN0JTIwbGlzdHxlbnwxfHx8fDE3NjIwMzE4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Lista impresa y plastificada con números de emergencia veterinaria.',
        usage: 'Incluye: veterinario regular (nombre, dirección, teléfono), clínica de emergencias 24/7, centro de toxicología veterinaria, números de familiares, veterinarios de respaldo.',
        warnings: 'Actualiza anualmente. Ten una copia en tu teléfono y otra impresa en el botiquín. Guarda también en tu auto.',
        quantity: '2-3 copias laminadas'
      },
      {
        id: 'records',
        name: 'Copia de registros médicos',
        essential: true,
        image: 'https://images.unsplash.com/photo-1542387740-67856d836e59?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwcmVjb3JkcyUyMGZvbGRlcnxlbnwxfHx8fDE3NjIwMzE4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Información médica crucial de tu mascota en una carpeta sellada.',
        usage: 'Incluye: vacunas actualizadas, alergias conocidas, medicamentos actuales, condiciones crónicas, cirugías previas, peso actual, contacto del veterinario regular.',
        warnings: 'Actualiza cada 6 meses o después de visitas veterinarias importantes. Protege en bolsa impermeable.',
        quantity: '1 carpeta con info completa de cada mascota'
      },
      {
        id: 'photos',
        name: 'Fotos recientes de tu mascota',
        essential: true,
        image: 'https://images.unsplash.com/photo-1606828263854-79e1c8d8c531?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBwaG90byUyMHBvcnRyYWl0fGVufDF8fHx8MTc2MjAzMDM2OHww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Fotos claras de tu mascota desde diferentes ángulos. Crítico si se pierde durante emergencia.',
        usage: 'Ten fotos claras mostrando: cara frontal, perfil, marcas distintivas, tamaño completo. Actualiza cada 3-6 meses especialmente en cachorros/gatitos (cambian rápido).',
        warnings: 'Guarda digitalmente en tu teléfono Y imprime copias.',
        quantity: '4-6 fotos recientes y claras'
      },
      {
        id: 'instructions',
        name: 'Guía rápida de primeros auxilios',
        essential: true,
        image: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbnN0cnVjdGlvbiUyMG1hbnVhbCUyMGJvb2t8ZW58MXx8fHwxNzYyMDMwMzY4fDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Tarjetas laminadas con instrucciones paso a paso para emergencias comunes.',
        usage: 'Incluye instrucciones para: RCP, maniobra de Heimlich, control de hemorragias, inducción de vómito (dosis), envenenamiento, golpe de calor. Fácil de leer bajo estrés.',
        warnings: 'Revisa y familiarízate ANTES de una emergencia. No esperes a la crisis para leer por primera vez.',
        quantity: 'Set de tarjetas laminadas o manual impreso'
      },
    ],
  },
  {
    id: '6',
    category: 'Medicamentos Específicos (Consultar Veterinario)',
    items: [
      {
        id: 'diphenhydramine',
        name: 'Difenhidramina (Benadryl)',
        essential: false,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaWxscyUyMG1lZGljaW5lJTIwYm90dGxlfGVufDF8fHx8MTc2MjAzMDM2OHww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Antihistamínico para reacciones alérgicas leves. SOLO bajo aprobación veterinaria.',
        usage: 'Dosis típica: 1mg por cada 0.5kg de peso, cada 8-12 horas. Para: picaduras de insectos, reacciones alérgicas leves, urticaria. NO es sustituto de epinefrina en anafilaxia.',
        warnings: 'CONSULTA con tu veterinario sobre dosis específica ANTES de emergencia. NO uses fórmulas con descongestionantes o acetaminofén (tóxicos). NO des si tiene glaucoma, problemas cardíacos, o está en tratamiento.',
        quantity: 'Tabletas de 25mg (pregunta a tu veterinario)'
      },
      {
        id: 'prescription',
        name: 'Medicamentos prescritos de tu mascota',
        essential: true,
        image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcmVzY3JpcHRpb24lMjBtZWRpY2luZSUyMGJvdHRsZXxlbnwxfHx8fDE3NjIwMzAzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Si tu mascota toma medicamentos regulares, guarda suministro de emergencia de 3-7 días.',
        usage: 'Para emergencias que te impidan acceder a la farmacia veterinaria. Etiqueta claramente con: nombre del medicamento, dosis, frecuencia, fecha de caducidad.',
        warnings: 'Rota stock (usa primero los más antiguos). Algunos medicamentos requieren refrigeración. Consulta con veterinario qué medicamentos son críticos tener de reserva.',
        quantity: 'Suministro de 3-7 días de cada medicamento'
      },
    ],
  },
  {
    id: '7',
    category: 'Extras Recomendados',
    items: [
      {
        id: 'glucose',
        name: 'Miel o jarabe de glucosa',
        essential: false,
        image: 'https://images.unsplash.com/photo-1587049352846-4a222e784422?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25leSUyMGphciUyMGJvdHRsZXxlbnwxfHx8fDE3NjIwMzAzNjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Para emergencias de hipoglucemia (azúcar baja en sangre) en diabéticos.',
        usage: 'Si tu mascota diabética tiene convulsiones o está débil (hipoglucemia): frota miel en encías. Funciona en minutos. Luego ofrece comida si puede tragar.',
        warnings: 'SOLO si está consciente. NO des si está inconsciente (riesgo de asfixia). Llama al veterinario inmediatamente después de estabilizar.',
        quantity: '1 frasco pequeño de miel'
      },
      {
        id: 'petroleum_jelly',
        name: 'Vaselina',
        essential: false,
        image: 'https://images.unsplash.com/photo-1628016876762-e8970f49f0ad?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2YXNlbGluZSUyMGphciUyMGplbGx5fGVufDF8fHx8MTc2MjAzMDM2OXww&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Lubricante multiuso para termómetros, piel seca, proteger heridas.',
        usage: 'Lubrica termómetros, protege almohadillas agrietadas, cubre nariz seca. Segura si lamen pequeñas cantidades.',
        warnings: 'NO uses en heridas abiertas profundas. NO es sustituto de pomada antibiótica.',
        quantity: '1 frasco pequeño'
      },
      {
        id: 'instant_cold_pack',
        name: 'Compresa fría instantánea',
        essential: false,
        image: 'https://images.unsplash.com/photo-1599893723162-67e931bd6a87?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xkJTIwcGFjayUyMGljZSUyMGJhZ3xlbnwxfHx8fDE3NjIwMzAzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Se activa al apretar - no requiere congelador. Para reducir hinchazón y dolor.',
        usage: 'Aplica en: torceduras, picaduras de insectos, contusiones. Envuelve en toalla (no directo en piel). Aplica 10 minutos, descansa 10, repite.',
        warnings: 'NUNCA apliques directamente en piel. NO uses en heridas abiertas. NO uses en sospecha de fractura sin consultar.',
        quantity: '2-3 compresas (duran 1-2 años)'
      },
      {
        id: 'nail_clippers',
        name: 'Cortauñas y polvo hemostático',
        essential: false,
        image: 'https://images.unsplash.com/photo-1619971082804-115cac359d0c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXQlMjBuYWlsJTIwY2xpcHBlcnxlbnwxfHx8fDE3NjIwMzAzNzB8MA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Para uñas rotas o si cortas el vaso sanguíneo accidentalmente.',
        usage: 'Polvo hemostático (o maicena): aplica presión sobre uña sangrando con polvo. Detiene sangrado en minutos. Para uñas rotas: limpia, aplica polvo, venda temporalmente.',
        warnings: 'Uñas rotas son dolorosas - pueden necesitar bozal. Si sangra mucho o la uña está colgando, ve al veterinario.',
        quantity: 'Cortauñas apropiados + 1 frasco de polvo hemostático'
      },
      {
        id: 'tick_remover',
        name: 'Removedor de garrapatas',
        essential: false,
        image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aWNrJTIwcmVtb3ZlciUyMHRvb2x8ZW58MXx8fHwxNzYyMDMwMzcwfDA&ixlib=rb-4.1.0&q=80&w=1080',
        description: 'Herramienta especializada con forma de gancho para remover garrapatas correctamente.',
        usage: 'Desliza el gancho bajo la garrapata lo más cerca posible de la piel. Gira suavemente varias veces y tira hacia arriba constantemente. Desinfecta el área después.',
        warnings: 'NO uses dedos, fósforos, alcohol o vaselina. Estos métodos hacen que la garrapata regurgite (aumenta riesgo de enfermedad). Guarda la garrapata en alcohol por si desarrolla síntomas.',
        quantity: '1-2 removedores de garrapatas'
      },
    ],
  },
];

export function FirstAidKit() {
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [selectedItem, setSelectedItem] = useState<KitItem | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  const toggleItem = (itemId: string) => {
    const newChecked = new Set(checkedItems);
    if (newChecked.has(itemId)) {
      newChecked.delete(itemId);
    } else {
      newChecked.add(itemId);
    }
    setCheckedItems(newChecked);
  };

  const showItemDetail = (item: KitItem) => {
    setSelectedItem(item);
    setShowDialog(true);
  };

  const totalItems = kitItems.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = checkedItems.size;
  const progress = Math.round((checkedCount / totalItems) * 100);

  const essentialCount = kitItems.reduce(
    (sum, cat) => sum + cat.items.filter(item => item.essential).length,
    0
  );
  const checkedEssentials = kitItems.reduce(
    (sum, cat) =>
      sum + cat.items.filter(item => item.essential && checkedItems.has(item.id)).length,
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 pb-24 relative">
      <AnimatedBackground />
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-300 to-pink-300 p-4 relative z-10">
        <h1 className="text-purple-900 mb-1">Botiquín de Primeros Auxilios</h1>
        <p className="text-purple-800 text-sm">
          Elementos esenciales para emergencias veterinarias
        </p>
      </div>

      <div className="px-4 py-4">
        {/* Progreso */}
        <Card className="bg-white border-slate-200 mb-4 shadow-sm">
          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-slate-800">Tu Progreso</h3>
              <span className="text-emerald-600">{progress}%</span>
            </div>
            <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-300 to-emerald-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <p className="text-slate-600">
                {checkedCount} de {totalItems} elementos
              </p>
              <p className="text-purple-600">
                {checkedEssentials}/{essentialCount} esenciales
              </p>
            </div>
          </div>
        </Card>

        {/* Alerta si faltan esenciales */}
        {checkedEssentials < essentialCount && (
          <Card className="bg-amber-100 border-amber-300 mb-4">
            <div className="p-3">
              <p className="text-amber-800 text-sm">
                <strong>⚠️ Atención:</strong> Todavía te faltan {essentialCount - checkedEssentials} elementos esenciales. 
                Los elementos marcados como "Esenciales" son críticos para emergencias.
              </p>
            </div>
          </Card>
        )}

        {/* Categorías de elementos */}
        <div className="space-y-4">
          {kitItems.map((category) => (
            <div key={category.id}>
              <h2 className="text-slate-800 mb-2">{category.category}</h2>
              <Card className="bg-white border-slate-200 shadow-sm">
                <div className="p-3 space-y-2">
                  {category.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-2 py-2 border-b border-slate-100 last:border-0"
                    >
                      <Checkbox
                        id={item.id}
                        checked={checkedItems.has(item.id)}
                        onCheckedChange={() => toggleItem(item.id)}
                        className="mt-1 data-[state=checked]:bg-emerald-400 data-[state=checked]:border-emerald-400 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <label
                          htmlFor={item.id}
                          className="cursor-pointer block"
                        >
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <span
                              className={`text-slate-800 text-sm ${
                                checkedItems.has(item.id)
                                  ? 'line-through text-slate-400'
                                  : ''
                              }`}
                            >
                              {item.name}
                            </span>
                            {item.essential && (
                              <Badge
                                variant="secondary"
                                className="bg-purple-100 text-purple-700 border-purple-300 text-xs"
                              >
                                Esencial
                              </Badge>
                            )}
                          </div>
                        </label>
                        <button
                          onClick={() => showItemDetail(item)}
                          className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-xs"
                        >
                          <Info className="size-3" />
                          Ver detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>

        {/* Consejos */}
        <Card className="bg-amber-100 border-amber-300 mt-4">
          <div className="p-3">
            <p className="text-amber-800 text-sm">
              <strong>💡 Mantenimiento:</strong> Revisa tu botiquín cada 6 meses. 
              Reemplaza medicamentos vencidos, repón elementos usados. Guarda en lugar 
              fresco, seco y de fácil acceso. Etiqueta claramente "EMERGENCIA VETERINARIA".
            </p>
          </div>
        </Card>

        <Card className="bg-blue-100 border-blue-300 mt-3">
          <div className="p-3">
            <p className="text-blue-800 text-sm">
              <strong>📍 Ubicación:</strong> Guarda el botiquín en un lugar accesible 24/7. 
              Informa a todos en casa dónde está. Considera tener un mini-botiquín en tu auto 
              con: guantes, gasas, vendas, contactos de emergencia, y toallas.
            </p>
          </div>
        </Card>

        <Card className="bg-green-100 border-green-300 mt-3">
          <div className="p-3">
            <p className="text-green-800 text-sm">
              <strong>🎓 Capacitación:</strong> Considera tomar un curso de primeros auxilios 
              veterinarios. Conocer RCP, control de hemorragias, y maniobra de Heimlich puede 
              salvar la vida de tu mascota. ¡La práctica hace al maestro!
            </p>
          </div>
        </Card>
      </div>

      {/* Dialog de detalles */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="bg-white max-w-sm mx-4 max-h-[85vh] overflow-y-auto">
          {selectedItem && (
            <>
              <DialogHeader>
                <DialogTitle className="text-slate-800">{selectedItem.name}</DialogTitle>
                <DialogDescription className="text-slate-600 text-sm">
                  {selectedItem.essential && (
                    <Badge className="bg-purple-100 text-purple-700 border-purple-300 mb-2">
                      Elemento Esencial
                    </Badge>
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-3">
                <div className="relative h-40 rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={selectedItem.image}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div>
                  <h4 className="text-slate-800 mb-1 text-sm">Descripción</h4>
                  <p className="text-slate-600 text-xs">{selectedItem.description}</p>
                </div>

                <div>
                  <h4 className="text-slate-800 mb-1 text-sm">Cómo usar</h4>
                  <p className="text-slate-600 text-xs">{selectedItem.usage}</p>
                </div>

                {selectedItem.warnings && (
                  <Card className="bg-red-50 border-red-200">
                    <div className="p-2 flex items-start gap-2">
                      <AlertCircle className="size-4 text-red-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-red-800 mb-1 text-xs">Advertencias</h4>
                        <p className="text-red-700 text-xs">{selectedItem.warnings}</p>
                      </div>
                    </div>
                  </Card>
                )}

                <div className="bg-purple-50 border border-purple-200 rounded-lg p-2">
                  <h4 className="text-purple-800 mb-1 text-xs">Cantidad recomendada</h4>
                  <p className="text-purple-700 text-xs">{selectedItem.quantity}</p>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
