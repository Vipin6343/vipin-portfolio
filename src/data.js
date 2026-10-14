// Portfolio content based on Vipin Yadav's resume.

export const PROFILE = {
  "name": "Vipin Yadav",
  "role": "Full Stack AI Developer",
  "location": "Chandigarh, India",
  "availability": "Chandigarh, India",
  "email": "vipin16127@gmail.com",
  "phone": "+91 9519058216",
  "whatsapp": null,
  "linkedin": "https://www.linkedin.com/in/vipin-yadav-b89766227/",
  "linkedinLabel": "/in/vipin-yadav-b89766227",
  "github": "https://github.com/Vipin6343",
  "resume": "/Vipin_Yadav_Resume.pdf",
  "leetcode": "https://leetcode.com/u/vipin_yadav900/",
  "gfg": "https://www.geeksforgeeks.org/user/vipin1ig1h/"
};

export const NAV = [
  {
    "id": "overview",
    "label": "Overview"
  },
  {
    "id": "systems",
    "label": "Projects"
  },
  {
    "id": "experience",
    "label": "Experience"
  },
  {
    "id": "stack",
    "label": "Skills"
  },
  {
    "id": "contact",
    "label": "Contact"
  }
];

export const STATS = [
  {
    "value": "4",
    "label": "AI projects"
  },
  {
    "value": "2025",
    "label": "B.Tech graduate"
  },
  {
    "value": "Full stack",
    "label": "AI development"
  }
];

export const CAPABILITIES = [
  {
    "title": "Conversational AI & agents",
    "body": "Multi-turn conversations and modular task workflows using LangChain and LangGraph, with retrieval-augmented generation and LLM APIs."
  },
  {
    "title": "Backend APIs & automation",
    "body": "FastAPI services, MongoDB workflows, product listing automation, and data pipelines for e-commerce applications."
  },
  {
    "title": "Interfaces & analytics",
    "body": "Responsive React interfaces, analytics dashboards, and internal management tools that make data and AI workflows usable."
  }
];

export const SYSTEMS = [
  {
    "slug": "resume-analyzer",
    "name": "AI Resume Analyzer + Job Matcher",
    "kicker": "Semantic matching",
    "tagline": "LLM-based resume analysis and job-description matching with semantic retrieval.",
    "tags": [
      "Python",
      "FastAPI",
      "React",
      "LangChain",
      "FAISS"
    ],
    "problem": "Compare a resume with a job description and present match scores and improvement suggestions in a React interface.",
    "highlights": [
      "Built resume analysis and job-description matching with LangChain and FAISS for semantic retrieval.",
      "Implemented FastAPI services for PDF parsing and analysis.",
      "Built a React interface for resume uploads, match scores, and improvement suggestions."
    ],
    "github": "https://github.com/Vipin6343/ai-resume-analyzer"
  },
  {
    "slug": "chat-with-documents",
    "name": "Chat with Documents",
    "kicker": "Retrieval-augmented generation",
    "tagline": "A RAG-based system for context-aware answers across uploaded documents.",
    "tags": [
      "LangChain",
      "FAISS",
      "FastAPI",
      "Embeddings",
      "RAG"
    ],
    "problem": "Make uploaded documents searchable through natural-language questions, with answers grounded in retrieved source content.",
    "highlights": [
      "Implemented document chunking, embeddings, and semantic retrieval using LangChain and FAISS.",
      "Built streaming FastAPI endpoints for context-aware answers.",
      "Supported multi-document uploads and source-based answer retrieval."
    ],
    "github": "https://github.com/Vipin6343/Chat-with-Documents-RAG-based-System-"
  },
  {
    "slug": "msc-iq",
    "name": "MSC IQ Intelligent E-Commerce Chatbot",
    "kicker": "Conversational commerce",
    "tagline": "An e-commerce AI assistant with multi-turn conversations, retrieval, and voice interaction.",
    "tags": [
      "LangGraph",
      "FastAPI",
      "MongoDB",
      "RAG",
      "Voice interaction"
    ],
    "problem": "Help users resolve e-commerce queries through conversational search, data retrieval, and spoken analytical responses.",
    "highlights": [
      "Developed an AI assistant for e-commerce query resolution using LangGraph-based multi-turn conversations.",
      "Integrated retrieval-augmented generation and voice interaction with spoken analytical responses.",
      "Built FastAPI services with MongoDB for data search and retrieval."
    ]
  },
  {
    "slug": "multi-agent-system",
    "name": "Multi-Agent AI System",
    "kicker": "Agent workflows",
    "tagline": "Modular LangGraph workflows for task planning, decomposition, tool usage, and response generation.",
    "tags": [
      "LangGraph",
      "LLMs",
      "External APIs",
      "Workflow automation"
    ],
    "problem": "Break tasks into modular agent workflows that can use tools and external APIs to automate work.",
    "highlights": [
      "Designed modular LangGraph workflows for planning, task decomposition, tool usage, and response generation.",
      "Integrated LLMs with external APIs to automate workflows.",
      "Built extensible agent components."
    ]
  }
];

export const EXPERIENCE = [
  {
    "company": "KAS Global Commerce Inc.",
    "unit": "MySellerCentral Team - Bilaspur, H.P.",
    "role": "Full Stack AI Developer",
    "period": "Jun 2026 - Present",
    "points": [
      "Develop and maintain AI agent services and backend workflows using FastAPI and MongoDB for e-commerce applications.",
      "Implement multi-turn conversational pipelines and background workflows using LangGraph for task execution and query handling.",
      "Optimize data routing and backend processing to improve response latency across core application workflows."
    ],
    "tags": [
      "FastAPI",
      "MongoDB",
      "LangGraph"
    ]
  },
  {
    "company": "KAS Global Commerce Inc.",
    "unit": "MySellerCentral Team - Bilaspur, H.P.",
    "role": "Full Stack AI Developer Intern",
    "period": "Nov 2025 - May 2026",
    "points": [
      "Developed and optimized product listing pipelines through API automation to reduce manual operational processing.",
      "Built responsive analytics dashboards and internal management tools using React.js.",
      "Improved backend data processing and internal pipelines for e-commerce datasets."
    ],
    "tags": [
      "React.js",
      "API automation",
      "Data pipelines"
    ]
  }
];

export const EDUCATION = [
  {
    "period": "2025",
    "title": "B.Tech - Computer Science and Engineering (IoT)",
    "detail": "Raj Kumar Goel Institute of Technology (AKTU) - Ghaziabad, UP"
  },
  {
    "period": "2021",
    "title": "Intermediate",
    "detail": "RPM Academy - Gorakhpur, UP"
  },
  {
    "period": "2019",
    "title": "Matriculation",
    "detail": "St. Xavier's - Gorakhpur, UP"
  }
];

export const STACK = [
  {
    "label": "Languages",
    "items": [
      "Python",
      "JavaScript",
      "Java",
      "SQL"
    ]
  },
  {
    "label": "Frontend",
    "items": [
      "React.js",
      "Tailwind CSS",
      "Shadcn/ui"
    ]
  },
  {
    "label": "Backend",
    "items": [
      "FastAPI",
      "Node.js",
      "REST APIs"
    ]
  },
  {
    "label": "AI systems",
    "items": [
      "LangChain",
      "LangGraph",
      "RAG",
      "Prompt Engineering",
      "LLMs",
      "OpenAI / Gemini APIs"
    ]
  },
  {
    "label": "Data & retrieval",
    "items": [
      "MongoDB",
      "PostgreSQL (basic)",
      "FAISS"
    ]
  },
  {
    "label": "Tools",
    "items": [
      "Git",
      "Docker (basic)",
      "Postman",
      "VS Code"
    ]
  }
];
