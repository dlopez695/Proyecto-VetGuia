import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { AlertCircle, Phone, ChevronRight, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import { AnimatedBackground } from './AnimatedBackground';

interface EmergencyDetailProps {
  emergencyId: string;
}

const emergencyData: Record<string, {
  title: string;
  timeWindow: string;
  symptoms: string[];
  steps: { step: number; title: string; description: string; warning?: string }[];
  doNots: string[];
}> = {
  poisoning: {
    title: 'Envenenamiento',
    timeWindow: 'Actúa inmediatamente - cada minuto cuenta',
    symptoms: ['Vómitos súbitos', 'Salivación excesiva', 'Temblores', 'Dificultad para respirar', 'Convulsiones', 'Letargo extremo'],
    steps: [
      {
        step: 1,
        title: 'Mantén la calma y actúa rápido',
        description:
          'Aleja a tu mascota de la fuente del veneno inmediatamente. Si es posible, identifica qué sustancia ingirió: alimentos (chocolate, uvas, cebolla), plantas tóxicas, medicamentos humanos, productos de limpieza, o raticidas.',
        warning: 'No permitas que ingiera más de la sustancia'
      },
      {
        step: 2,
        title: 'NO induzcas el vómito sin consultar',
        description:
          'Algunos venenos causanmás daño al vomitar (ácidos, álcalis, derivados del petróleo). Llama PRIMERO a un veterinario o centro de toxicología veterinaria antes de tomar acción. Ellos te indicarán si es seguro inducir el vómito.',
      },
      {
        step: 3,
        title: 'Reúne información crucial',
        description:
          'Anota: nombre exacto de la sustancia, cantidad estimada ingerida, hora aproximada del incidente, peso de tu mascota. Si es posible, toma una foto del envase o planta. Esta información es vital para el tratamiento.',
      },
      {
        step: 4,
        title: 'Prepara para el transporte',
        description:
          'Mantén a tu mascota tranquila y cálida. Si está vomitando, colócala de lado para evitar asfixia. Lleva el envase del veneno o muestra de la planta al veterinario.',
      },
      {
        step: 5,
        title: 'Busca atención veterinaria inmediata',
        description:
          'Transporta a tu mascota al veterinario más cercano SIN DEMORA. Si está a más de 30 minutos, contacta al veterinario mientras viajas. El tratamiento temprano puede salvar su vida.',
      },
    ],
    doNots: [
      'NO induzcas el vómito sin autorización veterinaria',
      'NO des leche (mito común - puede empeorar)',
      'NO esperes a ver síntomas para actuar',
      'NO pierdas tiempo buscando en internet'
    ],
  },
  heatstroke: {
    title: 'Golpe de Calor',
    timeWindow: 'Crítico - actúa en los primeros 10 minutos',
    symptoms: ['Jadeo excesivo', 'Salivación abundante', 'Temperatura > 40°C', 'Encías rojas oscuras', 'Debilidad', 'Vómitos', 'Colapso'],
    steps: [
      {
        step: 1,
        title: 'Mueve a tu mascota a un lugar fresco INMEDIATAMENTE',
        description:
          'Sácala del calor sin demora. Llévala a un lugar con sombra o preferiblemente con aire acondicionado. Si estás al aire libre, busca el lugar más fresco disponible (bajo un árbol, cerca de agua).',
      },
      {
        step: 2,
        title: 'Enfría gradualmente - NO rápidamente',
        description:
          'Aplica toallas húmedas con agua TIBIA (no fría ni helada) en el cuello, axilas, ingles y almohadillas de las patas. Cambia las toallas cada 5 minutos. NUNCA uses hielo directamente ni agua helada - puede causar shock.',
        warning: 'El enfriamiento rápido puede ser peligroso'
      },
      {
        step: 3,
        title: 'Ofrece agua fresca en pequeñas cantidades',
        description:
          'Permite que beba pequeñas cantidades de agua fresca (NO fría). No fuerces la ingesta. Si no puede beber por sí misma, humedece su lengua y encías con agua.',
      },
      {
        step: 4,
        title: 'Mide la temperatura si es posible',
        description:
          'Si tienes termómetro rectal, mide su temperatura cada 5 minutos. Detén el enfriamiento cuando alcance 39.4°C para evitar hipotermia. La temperatura normal es 38-39°C.',
      },
      {
        step: 5,
        title: 'Contacta al veterinario URGENTE',
        description:
          'El golpe de calor puede causar daño orgánico irreversible (cerebro, riñones, hígado) incluso si parece recuperarse. Requiere evaluación veterinaria INMEDIATA, análisis de sangre y tratamiento de soporte.',
      },
    ],
    doNots: [
      'NO uses agua helada o hielo directo',
      'NO fuerces agua si no puede tragar',
      'NO asumas que está bien si mejora - ve al veterinario igual',
      'NO dejes sin supervisión después del incidente'
    ],
  },
  fracture: {
    title: 'Fracturas',
    timeWindow: 'Actúa con precaución - evita empeorar la lesión',
    symptoms: ['Cojera severa o incapacidad de apoyar la extremidad', 'Deformidad visible', 'Hinchazón', 'Dolor al tacto', 'Hueso expuesto (fractura abierta)', 'Llanto o gemidos'],
    steps: [
      {
        step: 1,
        title: 'Mantén a tu mascota completamente quieta',
        description:
          'Limita todo movimiento para evitar más daño. Habla con voz calmada y tranquilizadora. Si es necesario, coloca una toalla sobre ella para mantenerla tranquila. El movimiento puede convertir una fractura simple en compuesta.',
      },
      {
        step: 2,
        title: 'Evalúa la gravedad SIN manipular',
        description:
          'Observa si hay: hueso expuesto (fractura abierta), sangrado, deformidad obvia, o incapacidad total de movimiento. NO toques, manipules ni intentes "arreglar" la extremidad.',
        warning: 'Las fracturas abiertas son emergencias críticas'
      },
      {
        step: 3,
        title: 'NO intentes entablillar sin entrenamiento',
        description:
          'La inmovilización incorrecta puede causar más daño, cortar circulación, o aumentar el dolor. Solo profesionales veterinarios deben inmovilizar fracturas. Tu rol es minimizar el movimiento.',
      },
      {
        step: 4,
        title: 'Maneja con extremo cuidado para transportar',
        description:
          'Si debes mover a tu mascota, usa una superficie rígida como tabla, puerta removida, o manta estirada firmemente entre dos personas. Mantén la extremidad afectada lo más estable posible. Para animales pequeños, usa una caja con toallas.',
      },
      {
        step: 5,
        title: 'Control de hemorragia si hay fractura abierta',
        description:
          'Si hay sangrado activo, aplica presión directa con gasa limpia o tela sobre la herida. NO remuevas el primer apósito si se empapa - añade más encima. Aplica presión continua durante el transporte.',
      },
      {
        step: 6,
        title: 'Transporte de emergencia al veterinario',
        description:
          'Las fracturas requieren radiografías, analgesia, y frecuentemente cirugía. Conduce suavemente evitando frenadas bruscas y curvas cerradas. Llama avisando que llegas con una fractura para que preparen.',
      },
    ],
    doNots: [
      'NO intentes colocar el hueso en su lugar',
      'NO apliques entablillado casero',
      'NO des medicamentos humanos para el dolor',
      'NO permitas que camine o se mueva'
    ],
  },
  choking: {
    title: 'Asfixia',
    timeWindow: 'CRÍTICO - actúa en 3-4 minutos',
    symptoms: ['Dificultad respiratoria severa', 'Pánico', 'Garras en la boca', 'Encías azuladas', 'Tos violenta o incapacidad de toser', 'Colapso', 'Pérdida de consciencia'],
    steps: [
      {
        step: 1,
        title: 'Evalúa rápidamente la severidad',
        description:
          'Si tu mascota PUEDE toser o hacer ruidos, significa que hay paso parcial de aire. Permite que intente expulsar el objeto tosiendo. NO interfieras aún - la tos es el mecanismo natural más efectivo. Si NO puede toser, respirar o está colapsando, actúa INMEDIATAMENTE.',
        warning: 'La obstrucción completa es una emergencia de vida o muerte'
      },
      {
        step: 2,
        title: 'Revisa la boca solo si es seguro',
        description:
          'Si está consciente y tranquila, abre suavemente su boca. Usa una linterna para visualizar. Si ves un objeto CLARAMENTE accesible, retíralo con cuidado usando pinzas o dedos. CUIDADO: animales asustados pueden morder. Si el objeto está profundo o no visible, NO metas la mano - puedes empujarlo más adentro.',
      },
      {
        step: 3,
        title: 'Maniobra de Heimlich para PERROS',
        description:
          'Coloca al perro de pie. Párate detrás. Encuentra el punto blando justo debajo de la caja torácica. Cierra tu puño y colócalo ahí. Con la otra mano, da 5 compresiones firmes hacia arriba y adelante (como un movimiento de "J"). Verifica la boca después de cada serie. Para perros pequeños, sostenlos contra tu pecho.',
      },
      {
        step: 4,
        title: 'Técnica para GATOS',
        description:
          'Para gatos, NO uses la maniobra de Heimlich. En su lugar, sostén al gato firmemente y da 5 golpes firmes entre los omóplatos con la palma de tu mano. Luego verifica la boca. Si no funciona, repite.',
      },
      {
        step: 5,
        title: 'Si pierde la consciencia',
        description:
          'Colócala de lado. Abre la boca - a veces la relajación muscular hace visible el objeto. Retíralo si es posible. Si no respira, inicia RCP: 30 compresiones torácicas, 2 respiraciones. Continúa mientras alguien llama al veterinario o durante el traslado.',
        warning: 'RCP es crítico si no hay respiración'
      },
      {
        step: 6,
        title: 'Busca ayuda veterinaria INMEDIATA',
        description:
          'Incluso si expulsó el objeto y parece recuperarse, DEBE ver un veterinario. Puede haber: daño en tráquea o esófago, inflamación secundaria, o fragmentos restantes. Llama mientras viajas para que preparen oxígeno.',
      },
    ],
    doNots: [
      'NO metas ciegamente la mano en la garganta',
      'NO uses pinzas profundamente - puedes lastimar',
      'NO des agua para "empujar" el objeto',
      'NO asumas que está bien después - siempre al veterinario'
    ],
  },
  cardiac: {
    title: 'Paro Cardíaco',
    timeWindow: 'CRÍTICO - inicia RCP en menos de 1 minuto',
    symptoms: ['Sin respiración', 'Sin pulso', 'Encías blancas o azules', 'Pupilas dilatadas', 'Pérdida total de consciencia', 'No responde a estímulos'],
    steps: [
      {
        step: 1,
        title: 'Verifica signos vitales RÁPIDAMENTE',
        description:
          'Respiración: mira, escucha y siente movimiento del pecho (10 segundos). Pulso: coloca dedos en la parte interna del muslo trasero, cerca de la ingle. Si NO hay pulso ni respiración, inicia RCP INMEDIATAMENTE. Cada segundo cuenta.',
        warning: 'No pierdas tiempo - si dudas, inicia RCP'
      },
      {
        step: 2,
        title: 'Posiciona correctamente para RCP',
        description:
          'Coloca a tu mascota sobre su lado DERECHO en una superficie firme (suelo, mesa). Extiende el cuello para abrir la vía aérea. Verifica que no haya obstrucciones en boca/garganta. Retira collar si lo tiene.',
      },
      {
        step: 3,
        title: 'Compresiones torácicas - técnica correcta',
        description:
          'Para perros medianos-grandes: Coloca manos sobre la parte más ancha del pecho. Comprime 1/3 a 1/2 del ancho del pecho. Ritmo: 100-120 compresiones por minuto (al ritmo de "Stayin\' Alive"). Para perros pequeños/gatos: usa una mano o pulgar e índice.',
      },
      {
        step: 4,
        title: 'Respiraciones de rescate',
        description:
          'Después de 30 compresiones, da 2 respiraciones: Cierra el hocico con tu mano. Cubre su nariz con tu boca. Sopla hasta ver que el pecho se eleva ligeramente (no infles demasiado). Cada respiración dura 1 segundo. Inmediatamente vuelve a compresiones.',
        warning: 'No te detengas más de 10 segundos'
      },
      {
        step: 5,
        title: 'Continúa el ciclo: 30:2',
        description:
          'Repite el ciclo: 30 compresiones + 2 respiraciones. Verifica pulso cada 2 minutos (toma solo 5-10 segundos). Si estás solo, haz esto mientras te mueves hacia el teléfono o auto. NO detengas RCP por más de 10 segundos a la vez.',
      },
      {
        step: 6,
        title: 'Pide ayuda de emergencia mientras continúas',
        description:
          'Si hay alguien más, que llame inmediatamente al veterinario de emergencia mientras TÚ continúas RCP sin interrupción. Si estás solo, realiza RCP por 2 minutos, luego llama brevemente, y regresa a RCP. Continúa hasta llegar al veterinario o hasta que recupere pulso.',
        warning: 'No te detengas hasta que un veterinario tome el control'
      },
    ],
    doNots: [
      'NO te rindas antes de 20 minutos de RCP',
      'NO hagas pausas largas para verificar pulso',
      'NO comprimas demasiado fuerte en animales pequeños',
      'NO olvides las respiraciones - ambas son críticas'
    ],
  },
  overdose: {
    title: 'Sobredosis de Medicamento',
    timeWindow: 'Actúa dentro de la primera hora',
    symptoms: ['Vómitos', 'Diarrea', 'Temblores', 'Convulsiones', 'Letargo extremo', 'Cambios en frecuencia cardíaca', 'Sangrado (algunos anticoagulantes)'],
    steps: [
      {
        step: 1,
        title: 'Identifica el medicamento exacto',
        description:
          'Determina: nombre del medicamento (genérico y comercial), concentración (mg/ml), cantidad ingerida (cuenta las píldoras faltantes), peso de tu mascota, hora aproximada de ingesta. Fotografía el envase si es posible.',
      },
      {
        step: 2,
        title: 'Llama al veterinario o toxicología INMEDIATAMENTE',
        description:
          'NO esperes síntomas. Contacta a tu veterinario o línea de toxicología veterinaria 24/7. Ten lista toda la información. Ellos calcularán si la dosis es tóxica y darán instrucciones específicas. La línea de toxicología de ASPCA: (888) 426-4435.',
        warning: 'Algunos medicamentos son fatales incluso en dosis pequeñas'
      },
      {
        step: 3,
        title: 'Sigue instrucciones profesionales al pie de la letra',
        description:
          'El veterinario puede indicarte: inducir el vómito (con peróxido de hidrógeno 3% - dosis específica), dar carbón activado, o ir inmediatamente sin hacer nada. NUNCA actúes sin consultar - algunas acciones pueden empeorar.',
      },
      {
        step: 4,
        title: 'Monitorea síntomas continuamente',
        description:
          'Observa y anota: nivel de consciencia, vómitos, diarrea, temblores, convulsiones, cambios en respiración, color de encías, temperatura. Toma video si es posible - ayudará al veterinario. Mantén a tu mascota tranquila y en observación constante.',
      },
      {
        step: 5,
        title: 'Prepara para el transporte',
        description:
          'Reúne: el envase del medicamento, cualquier vómito en una bolsa (puede ser analizado), tus notas sobre síntomas, historial médico de tu mascota si lo tienes. Mantén a tu mascota abrigada.',
      },
      {
        step: 6,
        title: 'Transporte de emergencia con el envase',
        description:
          'Lleva a tu mascota al veterinario con el envase del medicamento. El tiempo es crítico - muchos medicamentos humanos requieren antídotos o tratamiento específico (ej: acetaminofén necesita N-acetilcisteína). El tratamiento temprano mejora drásticamente el pronóstico.',
      },
    ],
    doNots: [
      'NO induzcas vómito sin autorización veterinaria',
      'NO des leche (mito - no es antídoto)',
      'NO esperes a ver síntomas para actuar',
      'NO intentes buscar "remedios caseros" en internet'
    ],
  },
  seizure: {
    title: 'Convulsiones',
    timeWindow: 'Protege durante el episodio - busca ayuda si dura > 5 minutos',
    symptoms: ['Contracciones musculares violentas', 'Pérdida de consciencia', 'Salivación excesiva', 'Movimientos de pedaleo', 'Pérdida de control de esfínteres', 'Rigidez'],
    steps: [
      {
        step: 1,
        title: 'Mantén la calma y cronometra',
        description:
          'Usa tu teléfono para cronometrar la duración exacta de la convulsión. Nota la hora de inicio. Una convulsión típica dura 30 segundos a 2 minutos. Si dura más de 5 minutos, es una emergencia crítica (estatus epiléptico).',
        warning: 'Convulsiones > 5 minutos pueden causar daño cerebral'
      },
      {
        step: 2,
        title: 'Protege a tu mascota de lesiones',
        description:
          'Aleja objetos duros o afilados. NO muevas a tu mascota a menos que esté en peligro inmediato (escaleras, piscina). Si es necesario mover, hazlo jalando suavemente por las patas traseras. Coloca almohadas alrededor de su cabeza si es posible.',
      },
      {
        step: 3,
        title: 'NO intentes contener o poner nada en su boca',
        description:
          'NUNCA pongas tus dedos, una cuchara o cualquier objeto en su boca. NO PUEDEN "tragarse la lengua" - eso es un mito. Intentar abrir su boca puede resultar en mordeduras graves para ti o lesiones en su mandíbula.',
      },
      {
        step: 4,
        title: 'Mantén el ambiente tranquilo',
        description:
          'Apaga luces brillantes, reduce ruidos, pide a otros que se alejen. Habla con voz suave y calmada. No toques ni acaricies durante la convulsión - pueden morder involuntariamente.',
      },
      {
        step: 5,
        title: 'Observa y documenta',
        description:
          'Si puedes hacerlo de forma segura, graba en video (muy útil para el veterinario). Nota: duración exacta, tipo de movimientos, si comenzó en un lado, si hubo pérdida de consciencia, color de encías, si se repitió.',
      },
      {
        step: 6,
        title: 'Fase post-ictal (después de la convulsión)',
        description:
          'Tu mascota puede estar desorientada, confundida, ciega temporalmente, o muy cansada. Mantenla en un lugar tranquilo, oscuro y seguro. Puede tomar minutos u horas recuperarse. Ofrece agua después de que esté completamente consciente.',
      },
      {
        step: 7,
        title: 'Cuándo buscar ayuda veterinaria',
        description:
          'INMEDIATAMENTE si: convulsión dura > 5 minutos, tiene múltiples convulsiones en 24 horas (clusters), es su primera convulsión, es un cachorro/gatito, tiene enfermedades previas. PRONTO (mismo día) si: tiene una convulsión pero luego se recupera normalmente y tiene historial de epilepsia.',
      },
    ],
    doNots: [
      'NO pongas nada en su boca',
      'NO contengas físicamente',
      'NO des medicamentos orales durante la convulsión',
      'NO asumas que "es normal" si tiene epilepsia - siempre documenta'
    ],
  },
  bleeding: {
    title: 'Hemorragia Grave',
    timeWindow: 'Control inmediato - actúa en minutos',
    symptoms: ['Sangrado activo profuso', 'Sangre arterial (roja brillante, pulsátil)', 'Palidez en encías', 'Debilidad rápida', 'Respiración acelerada', 'Colapso'],
    steps: [
      {
        step: 1,
        title: 'Aplica presión directa INMEDIATAMENTE',
        description:
          'Usa gasa estéril, toalla limpia o cualquier tela disponible. Aplica presión FIRME directamente sobre la herida. Usa ambas manos si es necesario. Mantén presión constante sin soltar. Este es el paso MÁS importante.',
        warning: 'La presión directa controla el 90% de las hemorragias'
      },
      {
        step: 2,
        title: 'NO remuevas el primer apósito',
        description:
          'Si la primera gasa se empapa de sangre, NO la retires. Añade más gasa encima y continúa presionando. Remover el primer apósito interrumpe la formación del coágulo y reinicia el sangrado.',
      },
      {
        step: 3,
        title: 'Eleva la extremidad si es posible',
        description:
          'Si la herida está en una pata, elévala por encima del nivel del corazón mientras mantienes presión. Esto reduce el flujo sanguíneo a la herida. Solo hazlo si no hay sospecha de fractura.',
      },
      {
        step: 4,
        title: 'Punto de presión arterial (si falla presión directa)',
        description:
          'Para extremidades: si la presión directa no controla el sangrado, aplica presión en el punto de presión arterial (parte interna del muslo para patas traseras, axila para delanteras). Usa dedos firmes. Esto reduce flujo sanguíneo a la extremidad.',
      },
      {
        step: 5,
        title: 'Torniquete SOLO como último recurso',
        description:
          'Usa torniquete SOLO si: el sangrado de una extremidad es masivo y no se controla con presión, hay amputación traumática, o riesgo inminente de muerte por pérdida de sangre. Usa un cinturón o tira de tela 5-8cm por encima de la herida. Aprieta hasta que detenga el sangrado. Nota la hora exacta. ADVERTENCIA: Riesgo de pérdida de la extremidad.',
        warning: 'Torniquetes pueden causar daño permanente - solo emergencias extremas'
      },
      {
        step: 6,
        title: 'Mantén a tu mascota tranquila y caliente',
        description:
          'La pérdida de sangre causa hipotermia y shock. Cúbrela con mantas. Habla calmadamente. Mantén presión sobre la herida. Si está consciente, mantenla acostada.',
      },
      {
        step: 7,
        title: 'Transporte de emergencia',
        description:
          'Una persona mantiene presión sobre la herida durante todo el trayecto. Otra conduce. Llama antes para avisar que llegas con hemorragia activa. La pérdida de sangre significativa requiere fluidos IV, transfusión, y posiblemente cirugía. Minutos son críticos.',
      },
    ],
    doNots: [
      'NO remuevas el primer apósito/gasa',
      'NO uses torniquete a menos que sea absolutamente necesario',
      'NO pierdas tiempo limpiando la herida',
      'NO des medicamentos o agua si hay sangrado interno sospechado'
    ],
  },
  shock: {
    title: 'Estado de Shock',
    timeWindow: 'Emergencia médica - actúa inmediatamente',
    symptoms: ['Encías pálidas o blancas', 'Extremidades frías', 'Pulso débil y rápido', 'Respiración rápida y superficial', 'Debilidad extrema', 'Consciencia alterada'],
    steps: [
      {
        step: 1,
        title: 'Identifica las causas posibles del shock',
        description:
          'El shock puede ser causado por: traumatismo severo, hemorragia, deshidratación extrema, infección grave (shock séptico), reacción alérgica grave (shock anafiláctico), o golpe de calor. Identifica la causa si es obvia.',
      },
      {
        step: 2,
        title: 'Coloca en posición de shock',
        description:
          'Acuesta a tu mascota de lado con la cabeza ligeramente más baja que el cuerpo (eleva las patas traseras 15-20cm con una toalla enrollada). Esto mejora el flujo sanguíneo al cerebro. Extiende su cuello para facilitar la respiración.',
        warning: 'NO uses esta posición si hay trauma en cabeza/cuello'
      },
      {
        step: 3,
        title: 'Mantén la temperatura corporal',
        description:
          'Cubre a tu mascota con mantas pero NO uses calor directo (bolsas de agua caliente pueden quemar). El shock causa hipotermia. Mantén el ambiente cálido si es posible.',
      },
      {
        step: 4,
        title: 'Control de hemorragias si las hay',
        description:
          'Si el shock es por sangrado visible, aplica presión directa sobre las heridas. Controlar la hemorragia es prioritario.',
      },
      {
        step: 5,
        title: 'NO des alimentos ni agua',
        description:
          'Aunque tu mascota tenga sed, NO des nada por boca. En shock, los órganos no funcionan bien y puede vomitar, aspirar, o complicarse. Solo el veterinario puede dar fluidos IV.',
      },
      {
        step: 6,
        title: 'Monitorea signos vitales',
        description:
          'Verifica pulso y respiración cada 2-3 minutos. Pulso: parte interna del muslo trasero. Normal: perros grandes 60-100/min, pequeños 100-140/min, gatos 120-140/min. Nota cualquier cambio.',
      },
      {
        step: 7,
        title: 'Transporte de emergencia',
        description:
          'Llama avisando que traes un paciente en shock. El shock es una emergencia que progresa rápidamente y puede ser fatal. Requiere fluidos IV, oxígeno, medicamentos, y tratamiento de la causa subyacente. Mantén a tu mascota estable durante el transporte.',
      },
    ],
    doNots: [
      'NO des agua o alimentos',
      'NO uses calor directo',
      'NO muevas innecesariamente',
      'NO esperes a ver si mejora sola'
    ],
  },
  burns: {
    title: 'Quemaduras',
    timeWindow: 'Enfría inmediatamente - primeros 20 minutos son críticos',
    symptoms: ['Piel enrojecida', 'Ampollas', 'Piel ennegrecida o blanca', 'Dolor intenso', 'Pérdida de pelo', 'Olor a quemado'],
    steps: [
      {
        step: 1,
        title: 'Detén el proceso de quemadura',
        description:
          'Quemadura térmica: aleja de la fuente de calor inmediatamente. Quemadura química: retira collar si tiene residuos, usa guantes. Quemadura eléctrica: desconecta la fuente eléctrica sin tocarlo - usa un palo de madera.',
        warning: 'En quemaduras químicas, tiempo es crítico'
      },
      {
        step: 2,
        title: 'Enfriamiento inmediato (quemaduras térmicas)',
        description:
          'Aplica agua fresca (NO fría ni helada) sobre el área quemada durante 10-20 minutos. Usa agua corriente o toallas empapadas. Esto detiene el daño continuo a tejidos profundos. NO uses hielo - puede causar más daño.',
      },
      {
        step: 3,
        title: 'Quemaduras químicas: enjuague extenso',
        description:
          'Enjuaga con abundante agua fresca durante 15-20 minutos mínimo. Si conoces la sustancia química, consulta la etiqueta para instrucciones específicas. Usa guantes para protegerte. NO intentes neutralizar - solo enjuaga.',
      },
      {
        step: 4,
        title: 'Evalúa la gravedad',
        description:
          'Grado 1 (superficial): enrojecimiento, dolor. Grado 2 (espesor parcial): ampollas, muy dolorosa. Grado 3 (espesor total): piel blanca/negra, menos dolor (nervios dañados). Cualquier quemadura > 5% del cuerpo o grado 2-3 es emergencia.',
      },
      {
        step: 5,
        title: 'Cubre con apósito estéril',
        description:
          'Después de enfriar, cubre suavemente con gasa estéril húmeda o tela limpia. NO uses algodón (se adhiere). NO apliques: mantequilla, aceite, pasta de dientes o remedios caseros - empeoran.',
      },
      {
        step: 6,
        title: 'Manejo del dolor y shock',
        description:
          'Las quemaduras son extremadamente dolorosas. Mantén a tu mascota tranquila y cálida (el resto del cuerpo puede tener frío). Cubre con manta. NO des medicamentos para dolor sin consultar al veterinario.',
      },
      {
        step: 7,
        title: 'Transporte al veterinario',
        description:
          'Todas las quemaduras excepto las más superficiales requieren atención veterinaria. Necesitan: evaluación de profundidad, manejo de dolor, fluidos IV (las quemaduras causan deshidratación), antibióticos, y posiblemente cirugía. Las quemaduras pueden ser más graves de lo que parecen inicialmente.',
      },
    ],
    doNots: [
      'NO uses hielo',
      'NO revientes ampollas',
      'NO apliques mantequilla, aceites o remedios caseros',
      'NO uses algodón directamente en la quemadura'
    ],
  },
  snakebite: {
    title: 'Mordedura de Serpiente',
    timeWindow: 'Emergencia - actúa en minutos, pero mantén calma',
    symptoms: ['Marcas de colmillos (2 puntos)', 'Hinchazón rápida', 'Dolor intenso', 'Hematomas', 'Debilidad', 'Temblores', 'Dificultad respiratoria', 'Colapso'],
    steps: [
      {
        step: 1,
        title: 'Aleja a tu mascota de la serpiente',
        description:
          'Retira inmediatamente del área sin acercarte tú a la serpiente. Las serpientes pueden morder repetidamente. Si es seguro y puedes hacerlo sin acercarte, toma una foto de la serpiente desde lejos - ayuda a identificar si es venenosa.',
        warning: 'No intentes capturar o matar a la serpiente'
      },
      {
        step: 2,
        title: 'Identifica el tipo de mordida',
        description:
          'Venenosa: 2 marcas de colmillos, hinchazón rápida, dolor severo. No venenosa: múltiples marcas pequeñas, hinchazón menor. En caso de duda, trata como venenosa. Las serpientes venenosas comunes incluyen: víboras de cascabel, mocasín, coralillo.',
      },
      {
        step: 3,
        title: 'Mantén a tu mascota COMPLETAMENTE tranquila',
        description:
          'Limita todo movimiento. Llévala en brazos si es pequeña, o camina muy lentamente si es grande. El movimiento acelera la circulación y distribuye el veneno más rápido. Habla con voz calmada. Mantén el área mordida por debajo del nivel del corazón si es posible.',
        warning: 'El movimiento acelera la diseminación del veneno'
      },
      {
        step: 4,
        title: 'NO hagas nada de los "tratamientos" populares',
        description:
          'NO: hagas un corte en la herida, succiones el veneno, apliques hielo, apliques torniquete, des electricidad, o des medicamentos. Todos estos métodos son inefectivos y pueden causar más daño.',
      },
      {
        step: 5,
        title: 'Identifica el sitio de la mordida',
        description:
          'Ubica las marcas de colmillos si es posible. Puedes cortar el pelo alrededor para visualizar mejor. NO laves la herida - el veneno residual puede ayudar a identificar la especie de serpiente.',
      },
      {
        step: 6,
        title: 'Monitorea signos vitales',
        description:
          'Observa: hinchazón (marca con bolígrafo el borde cada 15 min), color de encías, respiración, nivel de consciencia. Los síntomas pueden desarrollarse rápidamente. Anota la hora de la mordida.',
      },
      {
        step: 7,
        title: 'Transporte de emergencia',
        description:
          'Llama avisando que vienes con mordida de serpiente. Muchas clínicas veterinarias no tienen antiveneno - pueden necesitar transferirte. Lleva a tu mascota al veterinario INMEDIATAMENTE (idealmente en 30 min). El antiveneno es más efectivo en las primeras 4-6 horas. Mantén tranquila durante todo el traslado.',
      },
    ],
    doNots: [
      'NO succiones el veneno',
      'NO hagas cortes en la herida',
      'NO apliques torniquete',
      'NO des hielo',
      'NO intentes capturar la serpiente'
    ],
  },
  eyeinjury: {
    title: 'Lesión Ocular',
    timeWindow: 'Urgente - actúa con cuidado para prevenir daño permanente',
    symptoms: ['Ojo cerrado/entrecerrado', 'Lagrimeo excesivo', 'Enrojecimiento', 'Nubosidad', 'Sangre visible', 'Protrusión del ojo', 'Rascar el ojo'],
    steps: [
      {
        step: 1,
        title: 'NO permitas que se frote el ojo',
        description:
          'Frotarse puede empeorar dramáticamente la lesión. Usa un collar isabelino (cono) si tienes disponible. Si no, sostén suavemente sus patas delanteras o supervisa constantemente. El frotamiento puede convertir una lesión menor en pérdida del ojo.',
        warning: 'Frotarse puede causar ruptura del globo ocular'
      },
      {
        step: 2,
        title: 'Evalúa el tipo de lesión',
        description:
          'Objeto extraño visible: astilla, espina. Trauma contundente: golpe, patada. Quemadura química: sustancias irritantes. Proptosis (ojo fuera de órbita): emergencia extrema. Laceración: corte en ojo o párpado. NO toques el ojo directamente.',
      },
      {
        step: 3,
        title: 'Enjuague solo para químicos o irritantes',
        description:
          'Si la lesión es por químico o sustancia irritante, enjuaga con abundante solución salina estéril o agua limpia durante 15-20 minutos. Deja que el agua fluya desde el ángulo interno (nariz) hacia afuera. Para otras lesiones, NO enjuagues a menos que te lo indique el veterinario.',
      },
      {
        step: 4,
        title: 'NO intentes remover objetos penetrantes',
        description:
          'Si hay un objeto clavado o penetrante en el ojo (astilla, espina penetrada), NO lo remuevas. Puede estar sellando una perforación. Deja que el veterinario lo remueva con anestesia y equipamiento apropiado.',
      },
      {
        step: 5,
        title: 'Protrusión ocular (proptosis) - EMERGENCIA EXTREMA',
        description:
          'Si el ojo está fuera de la órbita (común en razas braquicéfalas tras trauma): Humedece el ojo constantemente con solución salina estéril o agua limpia en gasa. Cubre con gasa húmeda. NO intentes empujarlo de vuelta. Trasládate INMEDIATAMENTE al veterinario - hay ventana de 1-2 horas para salvar el ojo.',
        warning: 'Proptosis es emergencia extrema - cada minuto cuenta'
      },
      {
        step: 6,
        title: 'Cubre el ojo si hay laceración',
        description:
          'Para laceraciones en párpado o cerca del ojo: Cubre suavemente con gasa estéril húmeda. NO apliques presión. Asegura con venda alrededor de la cabeza sin apretar. Esto previene contaminación.',
      },
      {
        step: 7,
        title: 'Transporte cuidadoso al veterinario',
        description:
          'Mantén a tu mascota tranquila y con collar isabelino si es posible. Las lesiones oculares pueden empeorar rápidamente. Muchas requieren: examen con equipo especializado, medición de presión ocular, tinción de fluoresceína para detectar úlceras, y posiblemente cirugía. El tratamiento temprano previene pérdida visual.',
      },
    ],
    doNots: [
      'NO permitas que se frote el ojo',
      'NO intentes remover objetos penetrantes',
      'NO apliques medicamentos humanos',
      'NO subestimes - las lesiones oculares empeoran rápido'
    ],
  },
  electrocution: {
    title: 'Electrocución',
    timeWindow: 'Desconecta fuente eléctrica - luego evalúa',
    symptoms: ['Quemaduras en boca', 'Colapso', 'Sin consciencia', 'Convulsiones', 'Dificultad respiratoria', 'Paro cardíaco', 'Espasmos musculares'],
    steps: [
      {
        step: 1,
        title: 'NUNCA toques sin desconectar electricidad',
        description:
          'PRIMERO: Desconecta el aparato de la corriente o apaga el interruptor principal. Si no puedes, usa un palo de madera seco, escoba o cualquier material no conductor para separar a tu mascota del cable. NO LA TOQUES mientras esté en contacto con electricidad - tú también recibirás descarga.',
        warning: 'Tu seguridad primero - no puedes ayudar si tú también te electrocutas'
      },
      {
        step: 2,
        title: 'Evalúa consciencia y signos vitales',
        description:
          'Verifica si está consciente, respira, y tiene pulso. La electricidad puede causar paro cardíaco. Si no respira o no tiene pulso, inicia RCP INMEDIATAMENTE (ver protocolo de Paro Cardíaco).',
      },
      {
        step: 3,
        title: 'Revisa quemaduras en boca',
        description:
          'La mayoría de electrocuciones en mascotas ocurren al morder cables. Busca quemaduras en labios, lengua, paladar. Pueden ser profundas aunque no se vean severaspor fuera. Estas quemaduras pueden sangrar horas o días después.',
      },
      {
        step: 4,
        title: 'Busca quemaduras de entrada y salida',
        description:
          'La corriente entra por un punto (usualmente boca) y sale por otro (usualmente patas que tocan el suelo). Busca marcas de quemadura. El daño interno puede ser extenso incluso si las marcas externas son pequeñas.',
      },
      {
        step: 5,
        title: 'Evalúa respiración',
        description:
          'La electricidad puede causar espasmo de músculos respiratorios o daño en centro respiratorio del cerebro. Si la respiración es dificultosa, asegura que la vía aérea esté despejada. Extiende el cuello. Si no respira, da respiración de rescate.',
      },
      {
        step: 6,
        title: 'Monitorea para ritmos cardíacos anormales',
        description:
          'La electricidad puede causar arritmias (ritmos anormales) que aparecen horas después. Observa: debilidad, colapso, encías pálidas, respiración rápida. El corazón necesita monitoreo veterinario con ECG.',
      },
      {
        step: 7,
        title: 'Transporte urgente al veterinario',
        description:
          'TODAS las electrocuciones requieren evaluación veterinaria, incluso si parece estar bien. Necesita: ECG para detectar arritmias, radiografías de tórax (edema pulmonar puede desarrollarse), evaluación de quemaduras, fluidos IV, monitoreo. Muchas complicaciones aparecen horas después. Avisa que llegas con electrocución.',
      },
    ],
    doNots: [
      'NO toques mientras esté conectada a electricidad',
      'NO asumas que está bien si se recupera rápido',
      'NO ignores quemaduras aparentemente pequeñas',
      'NO dejes sin supervisión veterinaria - complicaciones tardías son comunes'
    ],
  },
  bloat: {
    title: 'Torsión Gástrica (Hinchazón)',
    timeWindow: 'CRÍTICO - minutos a horas para actuar',
    symptoms: ['Abdomen distendido y duro', 'Arcadas sin vómito', 'Salivación excesiva', 'Inquietud', 'Dificultad para respirar', 'Encías pálidas', 'Colapso'],
    steps: [
      {
        step: 1,
        title: 'Reconoce los signos tempranos',
        description:
          'Típicamente ocurre en perros grandes y de pecho profundo. Signos: intenta vomitar sin éxito (arcadas improductivas), abdomen que se hincha visiblemente, inquietud, se para y se acuesta repetidamente, saliva excesivamente, parece incómodo. Estos signos EMPEORAN rápidamente.',
        warning: 'Esta es una emergencia que progresa en minutos'
      },
      {
        step: 2,
        title: 'Evalúa el abdomen',
        description:
          'Observa desde arriba y de lado. El abdomen se verá distendido, especialmente en el lado izquierdo detrás de las costillas. Al tocarlo, está tenso como un tambor. Si tocas y suena "hueco" como un tambor, es un signo crítico.',
      },
      {
        step: 3,
        title: 'NO esperes - esto ES una emergencia absoluta',
        description:
          'La torsión gástrica (GDV - dilatación y vólvulo gástrico) es FATAL sin cirugía inmediata. El estómago se tuerce sobre sí mismo, cortando el flujo sanguíneo. Esto causa: muerte de tejido estomacal, shock, y paro cardíaco. La ventana de supervivencia es de 1-2 horas sin tratamiento.',
        warning: 'Sin cirugía inmediata, la tasa de mortalidad es del 100%'
      },
      {
        step: 4,
        title: 'NO intentes descomprimir en casa',
        description:
          'NO intentes hacer vomitar, dar medicamentos, masajear el abdomen, o cualquier intervención casera. Estas acciones son inútiles y pierdes tiempo crítico. La única solución es descompresión veterinaria y cirugía.',
      },
      {
        step: 5,
        title: 'Mantén tranquilo y trasládate INMEDIATAMENTE',
        description:
          'Limita el movimiento. El pánico y la actividad empeoran el shock. Si está de pie y puede caminar, deja que lo haga lentamente. Si está acostado, muévelo con cuidado. Cada minuto cuenta - no pierdas tiempo.',
      },
      {
        step: 6,
        title: 'Llama durante el traslado',
        description:
          'Pide a alguien que llame a la clínica de emergencia veterinaria más cercana mientras conduces. Usa el altavoz. Avisa que vienes con sospecha de GDV. Ellos prepararán: fluidos IV, descompresión gástrica, equipo de cirugía, anestesia. Pregunta si tienen capacidad quirúrgica - si no, pregunta dónde ir.',
      },
      {
        step: 7,
        title: 'Prepárate para cirugía de emergencia',
        description:
          'El tratamiento incluye: estabilización con fluidos IV, descompresión del estómago (tubo o aguja), radiografías para confirmar torsión, cirugía inmediata para "destripar" el estómago y fijar a la pared abdominal (gastropexia). Sin gastropexia, el 75% tienen recurrencia. El costo es alto pero es la única opción.',
      },
    ],
    doNots: [
      'NO esperes a ver si mejora',
      'NO intentes remedios caseros',
      'NO des agua o comida',
      'NO subestimes la urgencia - es SIEMPRE emergencia extrema'
    ],
  },
  heatexhaustion: {
    title: 'Agotamiento por Calor',
    timeWindow: 'Actúa pronto para prevenir progresión a golpe de calor',
    symptoms: ['Jadeo excesivo', 'Salivación', 'Letargo', 'Temperatura levemente elevada (39-40°C)', 'Sed intensa', 'Debilidad leve'],
    steps: [
      {
        step: 1,
        title: 'Diferencia entre agotamiento y golpe de calor',
        description:
          'Agotamiento por calor: temperatura 39-40°C, jadeo pesado pero controlado, aún responde, puede caminar. Golpe de calor: temperatura >40°C, jadeo excesivo o respiración dificultosa, encías rojo oscuro/moradas, confusión, colapso. Si hay duda, trata como golpe de calor (más grave).',
      },
      {
        step: 2,
        title: 'Mueve a lugar fresco inmediatamente',
        description:
          'Lleva a un lugar con sombra o aire acondicionado. Detén toda actividad física. Si estás lejos de casa, busca tiendas con aire acondicionado, áreas con sombra, o cualquier lugar fresco.',
      },
      {
        step: 3,
        title: 'Ofrece agua fresca en cantidades moderadas',
        description:
          'Permite que beba agua fresca (no fría) libremente, pero en cantidades moderadas (previene vómito). Añade una pizca de sal o Pedialyte si tienes disponible (reemplaza electrolitos). Si no puede/quiere beber, humedece lengua y encías.',
      },
      {
        step: 4,
        title: 'Enfriamiento suave',
        description:
          'Humedece con agua fresca (no helada): patas, abdomen, axilas. Usa ventilador si tienes disponible. Toallas húmedas en cuello e ingles. El objetivo es bajar la temperatura GRADUALMENTE. Para agotamiento (vs golpe de calor), el enfriamiento puede ser más lento.',
      },
      {
        step: 5,
        title: 'Monitorea la respuesta',
        description:
          'En 15-30 minutos, debería mostrar mejoría: jadeo disminuye, más alerta, quiere moverse. Si empeora, progresa a golpe de calor - lleva al veterinario inmediatamente.',
      },
      {
        step: 6,
        title: 'Permite descanso prolongado',
        description:
          'Mantén en ambiente fresco por varias horas. NO permitas ejercicio ese día. Ofrece agua constantemente. Monitorea por 24 horas por signos de complicaciones: vómitos, diarrea, letargo persistente.',
      },
      {
        step: 7,
        title: 'Cuándo ver al veterinario',
        description:
          'Busca atención veterinaria si: no mejora en 30 minutos, temperatura no baja, desarrolla vómitos/diarrea, tiene letargo persistente después de enfriar, tiene condiciones preexistentes (cardiacas, respiratorias), es braquicefálico (cara chata), es cachorro/senior, o si tienes cualquier preocupación.',
      },
    ],
    doNots: [
      'NO uses agua helada (puede causar vasoconstricción)',
      'NO fuerces ejercicio después',
      'NO asumas que está bien porque mejoró - monitorea 24 horas',
      'NO dejes en el auto - nunca'
    ],
  },
};

export function EmergencyDetail({ emergencyId }: EmergencyDetailProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showAllSteps, setShowAllSteps] = useState(false);
  const emergency = emergencyData[emergencyId];

  if (!emergency) {
    return <div className="p-4 text-slate-800">Emergencia no encontrada</div>;
  }

  const step = emergency.steps[currentStep];
  const isLastStep = currentStep === emergency.steps.length - 1;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-orange-50 pb-24 relative">
      <AnimatedBackground />
      {/* Header */}
      <div className="bg-gradient-to-br from-rose-300 to-orange-300 p-4 relative z-10">
        <div className="flex items-center gap-3 mb-2">
          <AlertCircle className="size-7 text-rose-900" />
          <h1 className="text-rose-900">{emergency.title}</h1>
        </div>
        <div className="flex items-center gap-2 text-rose-800 text-sm">
          <Clock className="size-4" />
          <p>{emergency.timeWindow}</p>
        </div>
      </div>

      <div className="px-4 py-4">
        {/* Síntomas */}
        <Card className="bg-amber-100 border-amber-300 mb-4">
          <div className="p-3">
            <h3 className="text-amber-900 mb-2">⚠️ Síntomas Comunes</h3>
            <ul className="text-amber-800 text-sm space-y-1">
              {emergency.symptoms.map((symptom, index) => (
                <li key={index}>• {symptom}</li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Indicador de progreso */}
        {!showAllSteps && (
          <div className="flex gap-1 mb-4">
            {emergency.steps.map((_, index) => (
              <div
                key={index}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  index <= currentStep ? 'bg-emerald-400' : 'bg-slate-200'
                }`}
              />
            ))}
          </div>
        )}

        {!showAllSteps ? (
          <>
            {/* Paso actual */}
            <Card className="bg-white border-slate-200 mb-4 shadow-sm">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-emerald-300 text-emerald-900 rounded-full size-12 flex items-center justify-center flex-shrink-0">
                    <span className="text-lg">{step.step}</span>
                  </div>
                  <h2 className="text-slate-800 flex-1">{step.title}</h2>
                </div>
                <p className="text-slate-700 text-sm leading-relaxed mb-3">
                  {step.description}
                </p>
                {step.warning && (
                  <div className="bg-red-100 border border-red-300 rounded-lg p-2 flex items-start gap-2">
                    <AlertTriangle className="size-4 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-red-800 text-xs">{step.warning}</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Botones de navegación */}
            <div className="space-y-2">
              {!isLastStep ? (
                <Button
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="w-full h-12 bg-emerald-300 hover:bg-emerald-400 text-emerald-900"
                >
                  Siguiente Paso ({currentStep + 2}/{emergency.steps.length})
                  <ChevronRight className="size-5 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => setShowAllSteps(true)}
                  className="w-full h-12 bg-emerald-300 hover:bg-emerald-400 text-emerald-900"
                >
                  <CheckCircle className="size-5 mr-2" />
                  Ver Resumen Completo
                </Button>
              )}

              {currentStep > 0 && (
                <Button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  variant="outline"
                  className="w-full h-10 border-slate-300 text-slate-700 hover:bg-slate-100 text-sm"
                >
                  Paso Anterior
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            {/* Vista de todos los pasos */}
            <div className="space-y-3 mb-4">
              {emergency.steps.map((s, index) => (
                <Card key={index} className="bg-white border-slate-200 shadow-sm">
                  <div className="p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-emerald-300 text-emerald-900 rounded-full size-8 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm">{s.step}</span>
                      </div>
                      <h3 className="text-slate-800">{s.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm">{s.description}</p>
                    {s.warning && (
                      <div className="bg-red-100 border border-red-300 rounded-lg p-2 flex items-start gap-2 mt-2">
                        <AlertTriangle className="size-3 text-red-600 flex-shrink-0 mt-0.5" />
                        <p className="text-red-800 text-xs">{s.warning}</p>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
            </div>
            <Button
              onClick={() => {
                setShowAllSteps(false);
                setCurrentStep(0);
              }}
              variant="outline"
              className="w-full h-10 border-slate-300 text-slate-700 hover:bg-slate-100 text-sm mb-4"
            >
              Volver al Modo Paso a Paso
            </Button>
          </>
        )}

        {/* Qué NO hacer */}
        <Card className="bg-red-100 border-red-300 mb-4">
          <div className="p-3">
            <h3 className="text-red-900 mb-2">🚫 Qué NO Hacer</h3>
            <ul className="text-red-800 text-sm space-y-1">
              {emergency.doNots.map((dont, index) => (
                <li key={index}>• {dont}</li>
              ))}
            </ul>
          </div>
        </Card>

        {/* Botón de llamada flotante */}
        <Button className="w-full h-12 bg-rose-400 hover:bg-rose-500 text-rose-900 mb-4">
          <Phone className="size-4 mr-2" />
          Llamar a Asistencia Remota
        </Button>

        {/* Advertencia */}
        <Card className="bg-blue-100 border-blue-300">
          <div className="p-3">
            <p className="text-blue-800 text-sm">
              <strong>Recordatorio:</strong> Estos pasos son primeros auxilios basados en medicina veterinaria. 
              La atención veterinaria profesional es ESENCIAL. Estas guías no reemplazan el diagnóstico y tratamiento veterinario.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
