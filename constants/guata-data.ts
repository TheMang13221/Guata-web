export const SETTINGS_DATA = [
  { title: "Perfil de saúde", data: ["Meu histórico de saúde"] },
  {
    title: "Preferências do app",
    data: [
      "Personalizar monitoramento",
      "Lembretes e notificações",
      "Configurações",
      "Guatá Premium",
    ],
  },
  { title: "Recursos", data: ["Orientações de monitoramento", "Suporte"] },
];

export const CONTENT_DATA = [
  {
    title: "Saúde Mental",
    data: [
      {
        id: "1",
        title: "Ansiedade e Procrastinação",
        image: require("@/assets/images/ansiedade_procrastinacao.jpg"),
      },
      {
        id: "2",
        title: "O Mito do Amanhã eu Faço",
        image: require("@/assets/images/mito_amanha.jpg"),
      },
    ],
  },
  {
    title: "Fortalecendo a Autoeficácia",
    data: [
      {
        id: "5",
        title: "Aprendendo a tolerar o tédio",
        image: require("@/assets/images/tolerar_tedio.jpg"),
      },
      {
        id: "6",
        title: "O cérebro imediatista no home Office",
        image: require("@/assets/images/home_office.jpg"),
      },
    ],
  },
];

export const CALENDAR_STRIP = [
  { day: "D", date: 17 },
  { day: "S", date: 18 },
  { day: "T", date: 19 },
  { day: "Q", date: 20 },
  { day: "Q", date: 21 },
  { day: "S", date: 22 },
  { day: "S", date: 23 },
];

export const TRACKING_CATEGORIES = [
  {
    title: "Carga Mental",
    color: "#E53935",
    items: [
      { id: "b1", label: "Leve", icon: "check-circle" },
      { id: "b2", label: "Médio", icon: "minus-circle" },
      { id: "b3", label: "Intenso", icon: "close-circle" },
    ],
  },
  {
    title: "Sentimentos",
    color: "#F57C00",
    items: [
      { id: "f1", label: "Oscilações", icon: "weather-partly-cloudy" },
      { id: "f2", label: "Sem controle", icon: "weather-hurricane" },
      { id: "f3", label: "Bem", icon: "weather-cloudy" },
      { id: "f4", label: "Feliz", icon: "emoticon-outline" },
    ],
  },
  {
    title: "Foco e Produtividade",
    color: "#3949AB",
    items: [
      { id: "p1", label: "Distraído", icon: "cloud" },
      { id: "p2", label: "Alta", icon: "lightning-bolt" },
      { id: "p3", label: "Procrastinando", icon: "alert" },
    ],
  },
];

export const PARTNERS_DATA = [
  {
    id: "1",
    name: "Elo Apoio Social Ambiental",
    role: "ONG",
    description:
      "Programa de Aprendizagem para adolescentes e jovens entre 14 e 24 anos que buscam experiência profissional. Para empresas que querem fazer parte da solução e não apenas cumprir cotas. A Elo conecta quem precisa de uma chance a quem pode oferecê-la.",
    image: require("@/assets/images/elo.jpg"),
  },
  {
    id: "2",
    name: "Camila Ferreira Mendes",
    role: "Psicóloga Clínica",
    description:
      "Sou psicóloga clínica formada pela UFMG e pós-graduanda em Terapias Cognitivo-Comportamentais. Atuo no acompanhamento psicológico de jovens e adultos, oferecendo um espaço acolhedor, ético e humanizado para promover equilíbrio emocional e autoconhecimento.",
    image: require("@/assets/images/camila.jpg"),
  },
  {
    id: "3",
    name: "Gabriel Almeida Rocha",
    role: "Psicólogo Clínico",
    description:
      "Sou psicólogo clínico formado pela PUC-RS e pós-graduando em Terapias Cognitivo-Comportamentais. Meu trabalho é voltado ao acolhimento emocional e ao desenvolvimento da confiança e do equilíbrio mental de cada paciente.",
    image: require("@/assets/images/gabriel.jpg"),
  },
];
