import type { ExternalLink, Project } from "./types";

/**
 * Sources, all read from the repositories:
 * - LumosNet: ../../master/tfm (README, frontend/src/docs/chapters 03 and 08).
 * - InContext: ../datos/back (README, docs/project-brief.md, ADR-0016, ADR-0020) and
 *   ../datos/front (README, src/i18n/es.ts for the name). 8 phases, still in development.
 * - Energy Analyzer: ../aws/README.md (roadmap, 2 of 7 steps ticked).
 * - EV charging IoT: ../traffic/docs/project-brief.md (phase plan: 8 phases, 1–2 done).
 * - Stock app: ../stock-app/README.md and specs/.
 * The first project is the featured one. Previews go in public/projects/<id>.webp.
 */

const CODE_LABEL = { es: "Código", en: "Code" } as const;

function repo(name: string): ExternalLink {
  return { label: CODE_LABEL, href: `https://github.com/JuanAntonioLeonOjeda/${name}` };
}
export const projects: readonly Project[] = [
  {
    id: "lumosnet",
    name: "LumosNet",
    hue: "tfm",
    tag: { es: "IA – Imágenes", en: "AI – Images" },
    tagline: {
      es: "Detección temprana de osteopenia lumbar en radiografías convencionales",
      en: "Early detection of lumbar osteopenia in plain X-rays",
    },
    description: {
      es: "Mi TFM del máster. Una ResNet50 multitarea que, a partir de una radiografía lumbar, clasifica al paciente como sano, con osteopenia o con osteoporosis y estima su densidad mineral ósea. Se sirve con una API y una web donde se sube un DICOM y se ve en qué zonas se fijó el modelo.",
      en: "My master's thesis. A multi-task ResNet50 that takes a lumbar X-ray, classifies the patient as healthy, osteopenic or osteoporotic and estimates their bone mineral density. It is served through an API and a web app where you upload a DICOM and see which areas the model looked at.",
    },
    highlights: [
      {
        es: "Edad, sexo e IMC como covariables clínicas junto a la imagen",
        en: "Age, sex and BMI as clinical covariates next to the image",
      },
      {
        es: "Grad-CAM para explicar cada predicción y un detector YOLO para recortar la región lumbar",
        en: "Grad-CAM to explain each prediction and a YOLO detector to crop the lumbar region",
      },
      {
        es: "Las subidas se procesan solo en memoria: ni se guardan ni se registran",
        en: "Uploads are processed in memory only: never stored or logged",
      },
    ],
    stack: [
      "PyTorch",
      "FastAPI",
      "React",
      "Docker",
      "scikit-learn",
      "OpenCV",
      "pydicom",
      "Ultralytics YOLO",
    ],
    status: {
      kind: "done",
      note: { es: "Trabajo Fin de Máster", en: "Master's thesis" },
    },
    stats: [
      {
        value: { es: "803", en: "803" },
        label: { es: "pacientes del dataset LUMOS", en: "patients in the LUMOS dataset" },
      },
      {
        value: { es: "66,9 %", en: "66.9%" },
        label: { es: "accuracy por paciente", en: "per-patient accuracy" },
      },
      { value: { es: "0,836", en: "0.836" }, label: { es: "AUC macro", en: "macro AUC" } },
      {
        value: { es: "85,3 %", en: "85.3%" },
        label: { es: "sensibilidad a osteoporosis", en: "sensitivity to osteoporosis" },
      },
    ],
    code: [repo("TFM")],
  },
  {
    id: "incontext",
    name: "InContext",
    hue: "context",
    tag: { es: "IA – Texto", en: "AI – Text" },
    tagline: {
      es: "Las noticias políticas de cada comunidad autónoma, con su contexto",
      en: "Political news from each Spanish region, in context",
    },
    description: {
      es: "Un mapa de España: eliges una comunidad autónoma y un sector (educación, sanidad o vivienda) y ves quién gobierna, datos oficiales del INE y las últimas noticias de medios nacionales y regionales, agrupadas por historia.",
      en: "A map of Spain: pick a region and a sector (education, health or housing) and see who governs, official statistics from the INE and the latest news from national and regional outlets, grouped by story.",
    },
    highlights: [
      {
        es: "Clasificación por sector y nivel de gobierno con un modelo propio (SetFit) entrenado con etiquetas hechas a mano, sin LLM",
        en: "Classification by sector and level of government with an own model (SetFit) trained on hand labels, no LLM",
      },
      {
        es: "La misma noticia de distintos medios se agrupa por similitud de embeddings, calculada en PostgreSQL con pgvector",
        en: "The same story from different outlets is grouped by embedding similarity, computed in PostgreSQL with pgvector",
      },
      {
        es: "Neutral por construcción: el mismo código para todos los partidos y medios, y cada dato con su fuente",
        en: "Neutral by construction: the same code path for every party and outlet, and a source for every number",
      },
    ],
    stack: [
      "Python",
      "FastAPI",
      "PostgreSQL",
      "React",
      "pgvector",
      "SetFit",
      "SQLAlchemy",
      "TanStack Query",
      "D3",
      "Docker",
    ],
    status: {
      kind: "ongoing",
      note: { es: "En desarrollo", en: "In development" },
    },
    code: [
      {
        label: { es: "Código del back-end", en: "Back-end code" },
        href: repo("context-back").href,
      },
      {
        label: { es: "Código del front-end", en: "Front-end code" },
        href: repo("context-front").href,
      },
    ],
  },
  {
    id: "energy-analyzer",
    name: "Energy Analyzer",
    hue: "energy",
    tag: { es: "AWS", en: "AWS" },
    tagline: {
      es: "Cuánto te habría costado tu consumo eléctrico con otra tarifa",
      en: "What your electricity use would have cost on another tariff",
    },
    description: {
      es: "Subes el CSV horario de tu distribuidora o de Datadis y ves tus patrones de consumo y lo que habrías pagado con distintas tarifas a precios reales de mercado. Es serverless en AWS, con la infraestructura como código y un coste en reposo casi nulo.",
      en: "Upload the hourly CSV from your distributor or Datadis and see your consumption patterns and what you would have paid on different tariffs at real market prices. Serverless on AWS, with infrastructure as code and a near-zero idle cost.",
    },
    highlights: [
      {
        es: "Subida con URL prefirmada y procesado S3 → SQS → Lambda, con cola de mensajes fallidos y alarma",
        en: "Presigned upload and S3 → SQS → Lambda processing, with a dead-letter queue and an alarm",
      },
      {
        es: "IAM de mínimo privilegio y CI/CD sin claves con OIDC",
        en: "Least-privilege IAM and keyless CI/CD with OIDC",
      },
    ],
    stack: ["AWS CDK", "TypeScript", "Lambda", "S3", "SQS", "DynamoDB", "Jest"],
    status: { kind: "phases", done: 2, total: 7 },
  },
  {
    id: "ev-charging-iot",
    name: "EV charging IoT",
    hue: "ev",
    tag: { es: "MQTT", en: "MQTT" },
    tagline: {
      es: "Monitorización en tiempo real de los puntos de recarga públicos de Finlandia",
      en: "Real-time monitoring of Finland's public EV charging points",
    },
    description: {
      es: "Recoge en tiempo real el estado de los cargadores que publica Digitraffic, lo normaliza y lo vuelve a publicar en un broker MQTT propio. De ahí se guarda como serie temporal, se evalúa contra reglas de alerta y se muestra en un panel.",
      en: "It ingests the real-time status of the chargers published by Digitraffic, normalises it and republishes it to its own MQTT broker. From there it is stored as a time series, checked against alert rules and shown on a dashboard.",
    },
    highlights: [
      {
        es: "Broker Mosquitto con autenticación por dispositivo, ACL y Last Will",
        en: "Mosquitto broker with per-device authentication, ACLs and Last Will",
      },
      {
        es: "Tests de integración contra Mosquitto y TimescaleDB reales en contenedores",
        en: "Integration tests against real Mosquitto and TimescaleDB in containers",
      },
    ],
    stack: ["Node.js", "TypeScript", "MQTT", "TimescaleDB", "Redis", "Zod", "Vitest", "Docker"],
    status: { kind: "phases", done: 2, total: 8 },
  },
  {
    id: "stock-app",
    name: "Stock app",
    hue: "stocks",
    tag: { es: "App móvil", en: "Mobile app" },
    tagline: {
      es: "Una app para aprender a invertir que explica, no recomienda",
      en: "An app to learn investing that explains rather than recommends",
    },
    description: {
      es: "App de iOS y Android: buscas una acción y recibes un diagnóstico con veredicto, nota por bloques, confianza y avisos. Lo calcula un motor determinista, sin IA en tiempo de ejecución, y cada métrica viene con su explicación.",
      en: "An iOS and Android app: search for a stock and get a diagnosis with a verdict, per-block scores, confidence and warnings. A deterministic engine computes it, with no AI at runtime, and every metric comes with its explanation.",
    },
    highlights: [
      {
        es: "Arquitectura hexagonal por features y desarrollo guiado por specs",
        en: "Hexagonal architecture by feature and spec-driven development",
      },
    ],
    stack: ["Flutter", "Dart", "fl_chart"],
    status: {
      kind: "ongoing",
      note: { es: "En desarrollo", en: "In development" },
    },
    code: [repo("app-stock")],
  },
];
