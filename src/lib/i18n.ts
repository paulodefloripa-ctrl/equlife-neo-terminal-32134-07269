export type Language = 'en' | 'es' | 'fr' | 'it' | 'pt' | 'de' | 'zh';

export const translations = {
  en: {
    console: {
      welcome: "How can I help you today?",
      workstation: "Commander Workstation",
      inputPlaceholder: "Type a command or message...",
      help: "Type 'help' for available commands",
    },
    navigation: {
      console: "Workstation",
      projects: "Projects",
      agents: "Agents",
      settings: "Settings",
    },
    actions: {
      projects: "Projects",
      gmail: "Gmail",
      pdf: "PDF",
      pomodoro: "Pomodoro",
      music: "Music",
      media: "Media",
    },
    status: {
      time: "Time",
      date: "Date",
      location: "Location",
      focus: "FOCUS",
      break: "BREAK",
    },
    commands: {
      help: "Show available commands",
      time: "Show current time",
      gps: "Show GPS location",
      focus: "Start focus timer (25 min)",
      break: "Start break timer (5 min)",
      stop: "Stop timer",
      projects: "Show project list",
    },
    input: {
      placeholder: "How can I help you today?",
      voiceStart: "Start voice input",
      voiceStop: "Stop listening",
      speakStart: "Read text aloud",
      speakStop: "Stop speaking",
      uploadFile: "Upload file",
      send: "Send",
    },
    voice: {
      notSupported: "Voice recognition not supported in this browser",
      speechNotSupported: "Text-to-speech not supported in this browser",
    },
    settings: {
      save: "Save Settings",
    },
    footer: "EquityLabs Nano Console v1.0",
    hero: "At EquityLabs we simplify complexity so your future can be extraordinary.",
    start: "Start",
    onboarding: {
      welcome: "🧠 Welcome to EquityLabs\nFill out this short form to activate your personalized AI experience.",
      objetivo: "What is your main goal with EquityLabs?",
      objetivo_opciones: [
        "Optimize my personal productivity",
        "Automate my business processes",
        "Learn to use Artificial Intelligence",
        "Start a project from scratch",
        "Other (specify)"
      ],
      situacion: "What is your current situation?",
      situacion_opciones: [
        "Student",
        "Entrepreneur",
        "Independent professional",
        "I have a team or company",
        "Looking for opportunities"
      ],
      frecuencia: "How often do you use digital tools to stay organized?",
      frecuencia_opciones: [
        "Every day",
        "A few times a week",
        "Almost never",
        "Never tried"
      ],
      experiencia: "What is your level of experience with Artificial Intelligence?",
      experiencia_opciones: [
        "Expert",
        "Intermediate",
        "Beginner",
        "Never used any AI tool"
      ],
      areas_interes: "Which areas are you interested in exploring with AI?",
      areas_interes_opciones: [
        "Automation of repetitive tasks",
        "Marketing and social media",
        "Personal or business finances",
        "Writing / creative content",
        "Education and learning",
        "Other (specify)"
      ],
      boton_activar: "Activate my personalized experience",
      neo_intro_1: "I'm NEO, your personal AI assistant",
      neo_intro_2: "I'm going to help you activate your personalized experience",
      neo_intro_3: "Let's complete this form to adapt to your needs",
      completion: "Perfect! Activating your personalized experience..."
    }
  },
  es: {
    console: {
      welcome: "¿Cómo puedo ayudarte hoy?",
      workstation: "Estación de Comando",
      inputPlaceholder: "Escribe un comando o mensaje...",
      help: "Escribe 'help' para ver comandos disponibles",
    },
    navigation: {
      console: "Estación",
      projects: "Proyectos",
      agents: "Agentes",
      settings: "Configuración",
    },
    actions: {
      projects: "Proyectos",
      gmail: "Gmail",
      pdf: "PDF",
      pomodoro: "Pomodoro",
      music: "Música",
      media: "Medios",
    },
    status: {
      time: "Hora",
      date: "Fecha",
      location: "Ubicación",
      focus: "CONCENTRACIÓN",
      break: "DESCANSO",
    },
    commands: {
      help: "Mostrar comandos disponibles",
      time: "Mostrar hora actual",
      gps: "Mostrar ubicación GPS",
      focus: "Iniciar temporizador de concentración (25 min)",
      break: "Iniciar temporizador de descanso (5 min)",
      stop: "Detener temporizador",
      projects: "Mostrar lista de proyectos",
    },
    input: {
      placeholder: "¿Cómo puedo ayudarte hoy?",
      voiceStart: "Iniciar entrada de voz",
      voiceStop: "Detener escucha",
      speakStart: "Leer texto en voz alta",
      speakStop: "Detener lectura",
      uploadFile: "Subir archivo",
      send: "Enviar",
    },
    voice: {
      notSupported: "Reconocimiento de voz no soportado en este navegador",
      speechNotSupported: "Texto a voz no soportado en este navegador",
    },
    settings: {
      save: "Guardar Configuración",
    },
    footer: "EquityLabs Nano Console v1.0",
    hero: "En EquityLabs simplificamos lo complejo para que tu futuro sea extraordinario.",
    start: "Comenzar",
    onboarding: {
      welcome: "🧠 Bienvenido a EquityLabs\nCompletá este breve formulario para activar tu experiencia personalizada con IA.",
      objetivo: "¿Cuál es tu principal objetivo con EquityLabs?",
      objetivo_opciones: [
        "Optimizar mi productividad personal",
        "Automatizar procesos de mi negocio",
        "Aprender a usar Inteligencia Artificial",
        "Crear un proyecto desde cero",
        "Otro (especificar)"
      ],
      situacion: "¿Cuál es tu situación actual?",
      situacion_opciones: [
        "Estudiante",
        "Emprendedor/a",
        "Profesional independiente",
        "Tengo un equipo o empresa",
        "En búsqueda de oportunidades"
      ],
      frecuencia: "¿Con qué frecuencia usás herramientas digitales para organizarte?",
      frecuencia_opciones: [
        "Todos los días",
        "Algunas veces por semana",
        "Casi nunca",
        "Nunca probé"
      ],
      experiencia: "¿Qué nivel de experiencia tenés con Inteligencia Artificial?",
      experiencia_opciones: [
        "Experto",
        "Intermedio",
        "Principiante",
        "Nunca usé ninguna herramienta de IA"
      ],
      areas_interes: "¿Qué áreas te interesan explorar con IA?",
      areas_interes_opciones: [
        "Automatización de tareas repetitivas",
        "Marketing y redes sociales",
        "Finanzas personales o del negocio",
        "Escritura / contenido creativo",
        "Educación y aprendizaje",
        "Otro (especificar)"
      ],
      boton_activar: "Activar mi experiencia personalizada",
      neo_intro_1: "Soy NEO, tu asistente de IA personal",
      neo_intro_2: "Voy a ayudarte a activar tu experiencia personalizada",
      neo_intro_3: "Completemos este formulario para adaptarnos a tus necesidades",
      completion: "Perfecto! Activando tu experiencia personalizada..."
    }
  },
  fr: {
    console: {
      welcome: "Comment puis-je vous aider aujourd'hui?",
      workstation: "Station de Commande",
      inputPlaceholder: "Tapez une commande ou un message...",
      help: "Tapez 'help' pour les commandes disponibles",
    },
    navigation: {
      console: "Station",
      projects: "Projets",
      agents: "Agents",
      settings: "Paramètres",
    },
    actions: {
      projects: "Projets",
      gmail: "Gmail",
      pdf: "PDF",
      pomodoro: "Pomodoro",
      music: "Musique",
      media: "Médias",
    },
    status: {
      time: "Heure",
      date: "Date",
      location: "Localisation",
      focus: "CONCENTRATION",
      break: "PAUSE",
    },
    commands: {
      help: "Afficher les commandes disponibles",
      time: "Afficher l'heure actuelle",
      gps: "Afficher la position GPS",
      focus: "Démarrer minuteur de concentration (25 min)",
      break: "Démarrer minuteur de pause (5 min)",
      stop: "Arrêter le minuteur",
      projects: "Afficher la liste des projets",
    },
    input: {
      placeholder: "Comment puis-je vous aider aujourd'hui?",
      voiceStart: "Démarrer entrée vocale",
      voiceStop: "Arrêter l'écoute",
      speakStart: "Lire le texte à voix haute",
      speakStop: "Arrêter la lecture",
      uploadFile: "Télécharger fichier",
      send: "Envoyer",
    },
    voice: {
      notSupported: "Reconnaissance vocale non supportée dans ce navigateur",
      speechNotSupported: "Synthèse vocale non supportée dans ce navigateur",
    },
    settings: {
      save: "Enregistrer les Paramètres",
    },
    footer: "EquityLabs Nano Console v1.0",
    hero: "Chez EquityLabs, nous simplifions la complexité pour rendre votre avenir extraordinaire.",
    start: "Commencer",
    onboarding: {
      welcome: "🧠 Bienvenue chez EquityLabs\nRemplissez ce court formulaire pour activer votre expérience personnalisée avec l'IA.",
      objetivo: "Quel est votre objectif principal avec EquityLabs?",
      objetivo_opciones: [
        "Optimiser ma productivité personnelle",
        "Automatiser les processus de mon entreprise",
        "Apprendre à utiliser l'Intelligence Artificielle",
        "Créer un projet à partir de zéro",
        "Autre (préciser)"
      ],
      situacion: "Quelle est votre situation actuelle?",
      situacion_opciones: [
        "Étudiant(e)",
        "Entrepreneur(se)",
        "Professionnel(le) indépendant(e)",
        "J'ai une équipe ou une entreprise",
        "À la recherche d'opportunités"
      ],
      frecuencia: "À quelle fréquence utilisez-vous des outils numériques pour vous organiser?",
      frecuencia_opciones: [
        "Tous les jours",
        "Quelques fois par semaine",
        "Presque jamais",
        "Jamais essayé"
      ],
      experiencia: "Quel est votre niveau d'expérience avec l'Intelligence Artificielle?",
      experiencia_opciones: [
        "Expert",
        "Intermédiaire",
        "Débutant",
        "Jamais utilisé d'outil d'IA"
      ],
      areas_interes: "Quels domaines vous intéressent pour explorer avec l'IA?",
      areas_interes_opciones: [
        "Automatisation des tâches répétitives",
        "Marketing et réseaux sociaux",
        "Finances personnelles ou d'entreprise",
        "Écriture / contenu créatif",
        "Éducation et apprentissage",
        "Autre (préciser)"
      ],
      boton_activar: "Activer mon expérience personnalisée",
      neo_intro_1: "Je suis NEO, votre assistant IA personnel",
      neo_intro_2: "Je vais vous aider à activer votre expérience personnalisée",
      neo_intro_3: "Complétons ce formulaire pour nous adapter à vos besoins",
      completion: "Parfait! Activation de votre expérience personnalisée..."
    }
  },
  it: {
    console: {
      welcome: "Come posso aiutarti oggi?",
      workstation: "Stazione di Comando",
      inputPlaceholder: "Digita un comando o messaggio...",
      help: "Digita 'help' per i comandi disponibili",
    },
    navigation: {
      console: "Stazione",
      projects: "Progetti",
      agents: "Agenti",
      settings: "Impostazioni",
    },
    actions: {
      projects: "Progetti",
      gmail: "Gmail",
      pdf: "PDF",
      pomodoro: "Pomodoro",
      music: "Musica",
      media: "Media",
    },
    status: {
      time: "Ora",
      date: "Data",
      location: "Posizione",
      focus: "CONCENTRAZIONE",
      break: "PAUSA",
    },
    commands: {
      help: "Mostra comandi disponibili",
      time: "Mostra ora attuale",
      gps: "Mostra posizione GPS",
      focus: "Avvia timer di concentrazione (25 min)",
      break: "Avvia timer di pausa (5 min)",
      stop: "Ferma timer",
      projects: "Mostra elenco progetti",
    },
    input: {
      placeholder: "Come posso aiutarti oggi?",
      voiceStart: "Avvia input vocale",
      voiceStop: "Ferma ascolto",
      speakStart: "Leggi testo ad alta voce",
      speakStop: "Ferma lettura",
      uploadFile: "Carica file",
      send: "Invia",
    },
    voice: {
      notSupported: "Riconoscimento vocale non supportato in questo browser",
      speechNotSupported: "Sintesi vocale non supportata in questo browser",
    },
    settings: {
      save: "Salva Impostazioni",
    },
    footer: "EquityLabs Nano Console v1.0",
    hero: "In EquityLabs semplifichiamo il complesso per rendere straordinario il tuo futuro.",
    start: "Inizia",
    onboarding: {
      welcome: "🧠 Benvenuto in EquityLabs\nCompila questo breve modulo per attivare la tua esperienza personalizzata con l'IA.",
      objetivo: "Qual è il tuo obiettivo principale con EquityLabs?",
      objetivo_opciones: [
        "Ottimizzare la mia produttività personale",
        "Automatizzare i processi della mia attività",
        "Imparare a usare l'Intelligenza Artificiale",
        "Creare un progetto da zero",
        "Altro (specificare)"
      ],
      situacion: "Qual è la tua situazione attuale?",
      situacion_opciones: [
        "Studente",
        "Imprenditore/imprenditrice",
        "Professionista indipendente",
        "Ho un team o un'azienda",
        "Alla ricerca di opportunità"
      ],
      frecuencia: "Con quale frequenza utilizzi strumenti digitali per organizzarti?",
      frecuencia_opciones: [
        "Ogni giorno",
        "Qualche volta a settimana",
        "Quasi mai",
        "Mai provato"
      ],
      experiencia: "Qual è il tuo livello di esperienza con l'Intelligenza Artificiale?",
      experiencia_opciones: [
        "Esperto",
        "Intermedio",
        "Principiante",
        "Mai usato nessuno strumento di IA"
      ],
      areas_interes: "Quali aree ti interessano esplorare con l'IA?",
      areas_interes_opciones: [
        "Automazione di compiti ripetitivi",
        "Marketing e social media",
        "Finanze personali o aziendali",
        "Scrittura / contenuti creativi",
        "Educazione e apprendimento",
        "Altro (specificare)"
      ],
      boton_activar: "Attiva la mia esperienza personalizzata",
      neo_intro_1: "Sono NEO, il tuo assistente IA personale",
      neo_intro_2: "Ti aiuterò ad attivare la tua esperienza personalizzata",
      neo_intro_3: "Completiamo questo modulo per adattarci alle tue esigenze",
      completion: "Perfetto! Attivazione della tua esperienza personalizzata..."
    }
  },
  pt: {
    console: {
      welcome: "Como posso ajudá-lo hoje?",
      workstation: "Estação de Comando",
      inputPlaceholder: "Digite um comando ou mensagem...",
      help: "Digite 'help' para comandos disponíveis",
    },
    navigation: {
      console: "Estação",
      projects: "Projetos",
      agents: "Agentes",
      settings: "Configurações",
    },
    actions: {
      projects: "Projetos",
      gmail: "Gmail",
      pdf: "PDF",
      pomodoro: "Pomodoro",
      music: "Música",
      media: "Mídia",
    },
    status: {
      time: "Hora",
      date: "Data",
      location: "Localização",
      focus: "FOCO",
      break: "INTERVALO",
    },
    commands: {
      help: "Mostrar comandos disponíveis",
      time: "Mostrar hora atual",
      gps: "Mostrar localização GPS",
      focus: "Iniciar temporizador de foco (25 min)",
      break: "Iniciar temporizador de intervalo (5 min)",
      stop: "Parar temporizador",
      projects: "Mostrar lista de projetos",
    },
    input: {
      placeholder: "Como posso ajudá-lo hoje?",
      voiceStart: "Iniciar entrada de voz",
      voiceStop: "Parar escuta",
      speakStart: "Ler texto em voz alta",
      speakStop: "Parar leitura",
      uploadFile: "Enviar arquivo",
      send: "Enviar",
    },
    voice: {
      notSupported: "Reconhecimento de voz não suportado neste navegador",
      speechNotSupported: "Texto para fala não suportado neste navegador",
    },
    settings: {
      save: "Salvar Configurações",
    },
    footer: "EquityLabs Nano Console v1.0",
    hero: "Na EquityLabs simplificamos o complexo para que seu futuro seja extraordinário.",
    start: "Começar",
    onboarding: {
      welcome: "🧠 Bem-vindo ao EquityLabs\nPreencha este breve formulário para ativar sua experiência personalizada com IA.",
      objetivo: "Qual é seu principal objetivo com EquityLabs?",
      objetivo_opciones: [
        "Otimizar minha produtividade pessoal",
        "Automatizar processos do meu negócio",
        "Aprender a usar Inteligência Artificial",
        "Criar um projeto do zero",
        "Outro (especificar)"
      ],
      situacion: "Qual é sua situação atual?",
      situacion_opciones: [
        "Estudante",
        "Empreendedor(a)",
        "Profissional independente",
        "Tenho uma equipe ou empresa",
        "Em busca de oportunidades"
      ],
      frecuencia: "Com que frequência você usa ferramentas digitais para se organizar?",
      frecuencia_opciones: [
        "Todos os dias",
        "Algumas vezes por semana",
        "Quase nunca",
        "Nunca experimentei"
      ],
      experiencia: "Qual é seu nível de experiência com Inteligência Artificial?",
      experiencia_opciones: [
        "Especialista",
        "Intermediário",
        "Iniciante",
        "Nunca usei nenhuma ferramenta de IA"
      ],
      areas_interes: "Quais áreas você tem interesse em explorar com IA?",
      areas_interes_opciones: [
        "Automação de tarefas repetitivas",
        "Marketing e redes sociais",
        "Finanças pessoais ou empresariais",
        "Escrita / conteúdo criativo",
        "Educação e aprendizagem",
        "Outro (especificar)"
      ],
      boton_activar: "Ativar minha experiência personalizada",
      neo_intro_1: "Sou NEO, seu assistente pessoal de IA",
      neo_intro_2: "Vou ajudá-lo a ativar sua experiência personalizada",
      neo_intro_3: "Vamos preencher este formulário para nos adaptarmos às suas necessidades",
      completion: "Perfeito! Ativando sua experiência personalizada..."
    }
  },
  de: {
    console: {
      welcome: "Wie kann ich Ihnen heute helfen?",
      workstation: "Kommandozentrale",
      inputPlaceholder: "Geben Sie einen Befehl oder eine Nachricht ein...",
      help: "Geben Sie 'help' für verfügbare Befehle ein",
    },
    navigation: {
      console: "Konsole",
      projects: "Projekte",
      agents: "Agenten",
      settings: "Einstellungen",
    },
    actions: {
      projects: "Projekte",
      gmail: "Gmail",
      pdf: "PDF",
      pomodoro: "Pomodoro",
      music: "Musik",
      media: "Medien",
    },
    status: {
      time: "Zeit",
      date: "Datum",
      location: "Standort",
      focus: "FOKUS",
      break: "PAUSE",
    },
    commands: {
      help: "Verfügbare Befehle anzeigen",
      time: "Aktuelle Uhrzeit anzeigen",
      gps: "GPS-Standort anzeigen",
      focus: "Fokus-Timer starten (25 Min.)",
      break: "Pausen-Timer starten (5 Min.)",
      stop: "Timer stoppen",
      projects: "Projektliste anzeigen",
    },
    input: {
      placeholder: "Wie kann ich Ihnen heute helfen?",
      voiceStart: "Spracheingabe starten",
      voiceStop: "Zuhören beenden",
      speakStart: "Text vorlesen",
      speakStop: "Vorlesen beenden",
      uploadFile: "Datei hochladen",
      send: "Senden",
    },
    voice: {
      notSupported: "Spracherkennung in diesem Browser nicht unterstützt",
      speechNotSupported: "Text-to-Speech in diesem Browser nicht unterstützt",
    },
    settings: {
      save: "Einstellungen speichern",
    },
    footer: "EquityLabs Nano Console v1.0",
    hero: "Bei EquityLabs vereinfachen wir das Komplizierte, damit Ihre Zukunft außergewöhnlich wird.",
    start: "Starten",
    onboarding: {
      welcome: "🧠 Willkommen bei EquityLabs\nFülle dieses kurze Formular aus, um deine personalisierte KI-Erfahrung zu starten.",
      objetivo: "Was ist dein Hauptziel mit EquityLabs?",
      objetivo_opciones: [
        "Meine persönliche Produktivität optimieren",
        "Geschäftsprozesse automatisieren",
        "Künstliche Intelligenz lernen",
        "Ein Projekt von Grund auf erstellen",
        "Andere (angeben)"
      ],
      situacion: "Was ist deine aktuelle Situation?",
      situacion_opciones: [
        "Student(in)",
        "Unternehmer(in)",
        "Freiberufler(in)",
        "Ich habe ein Team oder Unternehmen",
        "Auf der Suche nach Möglichkeiten"
      ],
      frecuencia: "Wie oft nutzt du digitale Tools zur Organisation?",
      frecuencia_opciones: [
        "Jeden Tag",
        "Ein paar Mal pro Woche",
        "Fast nie",
        "Noch nie ausprobiert"
      ],
      experiencia: "Was ist dein Erfahrungslevel mit Künstlicher Intelligenz?",
      experiencia_opciones: [
        "Experte",
        "Fortgeschritten",
        "Anfänger",
        "Noch nie ein KI-Tool benutzt"
      ],
      areas_interes: "Welche Bereiche möchtest du mit KI erkunden?",
      areas_interes_opciones: [
        "Automatisierung repetitiver Aufgaben",
        "Marketing und soziale Medien",
        "Persönliche oder geschäftliche Finanzen",
        "Schreiben / kreative Inhalte",
        "Bildung und Lernen",
        "Andere (angeben)"
      ],
      boton_activar: "Meine personalisierte Erfahrung aktivieren",
      neo_intro_1: "Ich bin NEO, dein persönlicher KI-Assistent",
      neo_intro_2: "Ich werde dir helfen, deine personalisierte Erfahrung zu aktivieren",
      neo_intro_3: "Lass uns dieses Formular ausfüllen, um uns an deine Bedürfnisse anzupassen",
      completion: "Perfekt! Aktivierung deiner personalisierten Erfahrung..."
    }
  },
  zh: {
    console: {
      welcome: "今天我能帮您什么？",
      workstation: "指挥工作站",
      inputPlaceholder: "输入命令或消息...",
      help: "输入 'help' 查看可用命令",
    },
    navigation: {
      console: "控制台",
      projects: "项目",
      agents: "代理",
      settings: "设置",
    },
    actions: {
      projects: "项目",
      gmail: "Gmail",
      pdf: "PDF",
      pomodoro: "番茄钟",
      music: "音乐",
      media: "媒体",
    },
    status: {
      time: "时间",
      date: "日期",
      location: "位置",
      focus: "专注",
      break: "休息",
    },
    commands: {
      help: "显示可用命令",
      time: "显示当前时间",
      gps: "显示GPS位置",
      focus: "开始专注计时器（25分钟）",
      break: "开始休息计时器（5分钟）",
      stop: "停止计时器",
      projects: "显示项目列表",
    },
    input: {
      placeholder: "今天我能帮您什么？",
      voiceStart: "开始语音输入",
      voiceStop: "停止监听",
      speakStart: "朗读文本",
      speakStop: "停止朗读",
      uploadFile: "上传文件",
      send: "发送",
    },
    voice: {
      notSupported: "此浏览器不支持语音识别",
      speechNotSupported: "此浏览器不支持文本转语音",
    },
    settings: {
      save: "保存设置",
    },
    footer: "EquityLabs Nano Console v1.0",
    hero: "在 EquityLabs，我们简化复杂，让您的未来非凡。",
    start: "开始",
    onboarding: {
      welcome: "🧠 欢迎来到 EquityLabs\n请填写此简短表格以启动您的个性化 AI 体验。",
      objetivo: "您使用 EquityLabs 的主要目标是什么？",
      objetivo_opciones: [
        "优化我的个人生产力",
        "自动化我的业务流程",
        "学习使用人工智能",
        "从头开始创建项目",
        "其他（请说明）"
      ],
      situacion: "您目前的情况是什么？",
      situacion_opciones: [
        "学生",
        "企业家",
        "独立专业人士",
        "我有团队或公司",
        "寻找机会"
      ],
      frecuencia: "您多久使用数字工具来组织自己？",
      frecuencia_opciones: [
        "每天",
        "每周几次",
        "几乎从不",
        "从未尝试过"
      ],
      experiencia: "您在人工智能方面的经验水平如何？",
      experiencia_opciones: [
        "专家",
        "中级",
        "初学者",
        "从未使用过任何 AI 工具"
      ],
      areas_interes: "您有兴趣用 AI 探索哪些领域？",
      areas_interes_opciones: [
        "重复性任务自动化",
        "营销和社交媒体",
        "个人或企业财务",
        "写作/创意内容",
        "教育和学习",
        "其他（请说明）"
      ],
      boton_activar: "激活我的个性化体验",
      neo_intro_1: "我是 NEO，您的个人 AI 助手",
      neo_intro_2: "我将帮助您启动个性化体验",
      neo_intro_3: "让我们完成此表格以适应您的需求",
      completion: "完美！正在启动您的个性化体验..."
    }
  },
};

export const getTranslation = (lang: Language) => translations[lang];
