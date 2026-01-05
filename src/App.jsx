import React, { useState, useEffect } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, Download, ExternalLink, X, Database, Server, Code, GraduationCap, 
  Award, BookOpen, Cpu, Phone, MapPin, Send, Briefcase, Lock, ZoomIn,
  Brain, Layers, BarChart
} from 'lucide-react';

const personalInfo = {
  name: "Liviru Weerasinghe",
  about: "Final-year Computer Science undergraduate at UCSC with practical experience as a Software Engineer Intern at WSO2. Strong in Java and backend development, with a growing interest in Machine Learning.",
  email: "liviruweera@gmail.com",
  phone: "+94 71 691 8856",
  location: "Colombo, Sri Lanka",
  github: "https://github.com/Eranda2001",
  linkedin: "https://www.linkedin.com/in/liviru-weerasinghe/",
  linkedinCerts: "https://www.linkedin.com/in/liviru-weerasinghe/details/certifications/",
  cvLink: "/Liviru_Weerasinghe_CV.pdf", 
  profileImage: "/profile.jpg" 
};

const aiStack = {
  domain: ["BioInformatics", "Natural Language Processing (NLP)", "Reinforcement Learning (RL)", "Data Analysis", "Predictive Modeling"],
  tech: ["Python", "PyTorch", "TensorFlow", "Pandas", "NumPy", "Scikit-learn", "Jupyter", "Bio-Python"]
};

const coreConcepts = [
  "Object Oriented Programming (OOP)",
  "Software Design Patterns",
  "MVC Architecture",
  "Middleware Architectures",
  "RESTful API Design",
  "Microservices",
  "CI/CD Pipelines",
  "Clean Architecture"
];

const skills = {
  frontend: ["React.js", "JavaScript", "TypeScript", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap"],
  backend: ["Java", "Spring Boot", "Node.js", "Express.js", "Django", "C++"],
  database: ["MySQL", "MongoDB", "PostgreSQL", "Firebase", "MS SQL Server"],
  tools: ["AWS", "Docker", "Kubernetes", "Git", "Linux", "Jenkins", "Postman", "Swagger", "Selenium", "JUnit"]
};

const experience = [
  {
    company: "WSO2",
    role: "Software Engineer Intern",
    period: "Nov 2024 - Apr 2025",
    logo: "/wso2.png",
    summary: "Contributing to enterprise-level identity and authentication platforms.",
    responsibilities: [
      "Implemented first-class AMR (Authentication Method Reference) support in WSO2 IS and Asgardeo, ensuring RFC-compliant authentication flows.",
      "Designed and architected ACR (Authentication Context Class Reference) support to enforce strict authentication security levels.",
      "Collaborated closely with senior engineers to ensure backward compatibility and system reliability in production environments.",
      "Enabled authenticator-level AMR handling for Phase 1 in production identity platforms."
    ],
    tech: ["Java", "Identity Server", "OAuth 2.0", "OpenID Connect"]
  },
  {
    company: "UCSC",
    role: "Undergraduate Teaching Assistant",
    period: "May 2025 - Nov 2025",
    logo: "/ucsc.png",
    summary: "Academic support role for the Computational Approaches module.",
    responsibilities: [
      "Conducted tutorial sessions and lectures, guiding students through complex problem-solving strategies.",
      "Assisted in explaining computational concepts, grading assignments, and providing constructive feedback to over 100 students.",
      "Facilitated workshop sessions to improve student understanding of core algorithms."
    ],
    tech: ["Teaching", "Public Speaking", "Leadership"]
  }
];

const education = [
  {
    institution: "University of Colombo School of Computing",
    degree: "BSc (Hons) in Computer Science",
    period: "2022 - 2026 (Expected)",
    details: "GPA: 3.50 (Current). Focusing on Software Engineering and AI.",
    icon: GraduationCap
  },
  {
    institution: "CIMA",
    degree: "Certificate in Business Accounting",
    period: "2021",
    details: "Professional qualification in management accounting.",
    icon: Award
  },
  {
    institution: "Royal College, Colombo 07",
    degree: "GCE Advanced Level (Physical Science)",
    period: "2020",
    details: "Z-Score: 1.8222 | Combined Maths (A), Physics (B), Chemistry (B)",
    icon: BookOpen
  }
];

const projects = [
  {
    id: 1,
    title: "Hearing-Aid RL",
    category: "Research - Machine Learning",
    image: "https://images.unsplash.com/photo-1516110833967-0b5716ca1387?auto=format&fit=crop&q=80&w=1000",
    shortDesc: "Reinforcement Learning based solution for Sensorineural Hearing Loss.",
    fullDesc: "Final year research project designing a novel, human-in-the-loop reinforcement learning system for personalized hearing-aid prescriptions. Currently conducting a comprehensive literature review to identify gaps in ML-based hearing-aid optimization. Ongoing work includes real-world clinical testing and validation to assess safety, effectiveness, and patient-specific outcomes.",
    tech: ["Python", "PyTorch", "RL", "Audio Processing", "Data Analysis"],
    repoLink: "https://github.com/Eranda2001"
  },
  {
    id: 2,
    title: "Modurix Labs",
    category: "Logistics",
    image: "https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&q=80&w=1000",
    shortDesc: "Product based Logistic Solution.",
    fullDesc: "Currently developing an end-to-end logistics solution aimed at streamlining delivery operations from order creation to final drop-off with real-time visibility. The platform focuses on enabling customers to track deliveries live, allowing drivers to update trip progress dynamically, and ensuring reliable order handling even during partial failures. This project is being built with a strong emphasis on real-world applicability, scalability, and evolving into a production-ready logistics product.",
    tech: ["Java", "Spring Boot", "Docker", "K8s", "Kafka", "Zookeeper"],
    repoLink: "https://github.com/Eranda2001"
  },
  {
    id: 3,
    title: "Bring First Class Support to AMR",
    category: "Identity & Access Management - WSO2",
    image: "/amr.png",
    shortDesc: "The project done during the internship period at WSO2.",
    fullDesc: "Implemented first-class support for configurable Authentication Method Reference (AMR) values within the Identity Server, enabling organizations to define and manage AMR values per authenticator rather than relying on hardcoded defaults. Introduced AMR as a configurable authenticator property with organization-level control, while ensuring full backward compatibility with existing behavior. Enhanced federated authentication flows to support both consuming AMR values received from external identity providers and overriding them with locally configured values when required. The implementation adheres to the RFC 8176 AMR standard wherever applicable, allowing organizations to align authentication signals with their security policies and downstream resource server requirements.",
    tech: ["Java", "Identity Server", "OAuth 2.0", "OpenID Connect", "TestNG"],
    repoLink: "https://github.com/wso2/carbon-identity-framework/pull/6598"
  },
  {
    id: 4,
    title: "Utility Saga",
    category: "Enterprise / IoT",
    image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000",
    shortDesc: "Proposed Utility Management Solution with novel features in the Sri Lankan context.",
    fullDesc: "Developed a comprehensive utility management solution for Sri Lanka, including billing, consumption tracking, and customer management features. The system integrates IoT-based meter readings for real-time data collection and implements an ML-driven recommendation module for optimized usage insights. The architecture focuses on object-oriented design and relational data modeling to ensure scalability.",
    tech: ["Java", "IoT", "MySQL", "ML"],
    repoLink: "https://github.com/visith1577/Utility-Saga"
  },
  {
    id: 5,
    title: "KindCoin",
    category: "Blockchain / Web3",
    image: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=1000",
    shortDesc: "A novel monetory and goods donation app which incentivze donors using a blockchain approach.",
    fullDesc: "KindCoin is a web-based donation platform enabling users to contribute and track monetary and material donations through a centralized system. It implements a blockchain-based reward mechanism to transparently acknowledge and incentivize donor contributions. The system also integrates text extraction and recommendation features to help users identify relevant donation opportunities efficiently.",
    tech: ["React", "Node.js", "MongoDB", "Blockchain"],
    repoLink: "https://github.com/ruwangakonara/kindcoinserver"
  }
];

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{title}</h2>
    <div className="h-1 w-20 bg-accent rounded-full mb-4"></div>
    {subtitle && <p className="text-slate-400 max-w-2xl">{subtitle}</p>}
  </div>
);

const TypewriterText = () => {
  const roles = ["Software Engineer", "Backend Developer", "Researcher"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % roles.length);
    }, 3000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-secondary inline-block min-w-[300px]">
      {roles[index]}
    </span>
  );
};

const SkillColumn = ({ title, items, icon: Icon }) => (
  <div className="bg-surface/50 p-6 rounded-2xl border border-slate-800 hover:border-accent/50 transition-all">
    <div className="flex items-center gap-3 mb-6">
      <div className="p-2 bg-accent/10 rounded-lg text-accent"><Icon size={20} /></div>
      <h3 className="text-xl font-bold text-slate-100">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {items.map(skill => (
        <span key={skill} className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-md border border-slate-700">
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const App = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isImageZoomed, setIsImageZoomed] = useState(false);
  const [state, handleSubmit] = useForm(import.meta.env.VITE_FORM_ID); 

  useEffect(() => {
    if (!selectedProject) {
      setIsImageZoomed(false);
    }
  }, [selectedProject]);

  return (
    <div className="relative min-h-screen bg-primary text-slate-300 font-sans selection:bg-accent selection:text-primary overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-[100px] animate-blob"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40rem] h-[40rem] bg-secondary/20 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
      </div>

      <nav className="fixed w-full z-40 bg-primary/80 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold text-white tracking-tighter">Liviru&nbsp;&nbsp;<span className="text-accent">Weerasinghe</span></span>
          <a href={personalInfo.cvLink} download className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-sm font-medium transition-all border border-slate-700">
            <Download size={16} /> <span>Resume</span>
          </a>
        </div>
      </nav>

      <main className="relative z-10 pt-24 pb-20 px-6 md:px-12 max-w-7xl mx-auto space-y-32">
        
        <section className="flex flex-col-reverse lg:flex-row items-center justify-between min-h-[80vh] gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/2 space-y-8 text-center lg:text-left"
          >
            <div className="inline-block px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-sm">
              Available for Research & Development Roles
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-tight">
              Hi, I'm Liviru. <br />
              <TypewriterText />
            </h1>
            <p className="max-w-xl mx-auto lg:mx-0 text-lg text-slate-400 leading-relaxed">
              {personalInfo.about}
            </p>
            
            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-4">
              <a href="#contact" className="px-6 py-3 bg-accent text-primary font-bold rounded-lg hover:bg-white transition-all shadow-lg shadow-accent/25">
                Contact Me
              </a>
              <a href="#experience" className="px-6 py-3 bg-surface border border-slate-700 text-white font-bold rounded-lg hover:border-accent hover:text-accent transition-all">
                View Experience
              </a>
              <a href={personalInfo.linkedinCerts} target="_blank" rel="noreferrer" className="px-6 py-3 bg-surface border border-slate-700 text-white font-bold rounded-lg hover:border-accent hover:text-accent transition-all flex items-center gap-2">
                <Award size={18} /> Certifications
              </a>
            </div>

            <div className="flex justify-center lg:justify-start gap-32 pt-2">
              <a href={personalInfo.github} target="_blank" className="text-slate-500 hover:text-white transition-colors"><Github size={60}/></a>
               <a href={personalInfo.linkedin} target="_blank" className="text-slate-500 hover:text-white transition-colors"><Linkedin size={60}/></a>
            </div>

          </motion.div>
          <motion.div 
             initial={{ opacity: 0, scale: 0.8 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ duration: 0.8 }}
             className="lg:w-1/2 flex justify-center lg:justify-end relative"
          >
             <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary rounded-full blur-3xl opacity-30 animate-pulse"></div>
             <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full p-1 bg-gradient-to-r from-slate-800 to-slate-700 border border-slate-700 shadow-2xl">
                <img src={personalInfo.profileImage} alt="Profile" className="w-full h-full object-cover rounded-full border-4 border-primary" />
             </div>
          </motion.div>
        </section>

        <section id="experience">
          <SectionTitle title="Work Experience" subtitle="My professional journey and key contributions to the industry." />
          <div className="relative border-l-2 border-slate-800 ml-4 md:ml-6 space-y-12">
            {experience.map((exp, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12">
                <span className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-2 border-accent shadow-[0_0_10px_rgba(56,189,248,0.5)]"></span>
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-surface/50 p-8 rounded-2xl border border-slate-800 hover:border-accent/30 transition-all group"
                >
                  <div className="hidden md:block absolute top-6 right-6 opacity-80 group-hover:opacity-100 transition-opacity">
                    <img 
                      src={exp.logo} 
                      alt={`${exp.company} Logo`} 
                      className="w-32 h-32 object-contain grayscale group-hover:grayscale-0 transition-all duration-300"
                    />
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-accent transition-colors">{exp.role}</h3>
                      <div className="flex items-center gap-2 text-slate-400 mt-1 font-mono text-sm">
                        <Briefcase size={14} />
                        <span>{exp.company}</span>
                        <span className="text-slate-600">•</span>
                        <span>{exp.period}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-slate-300 mb-6 italic border-l-2 border-accent/50 pl-4">{exp.summary}</p>
                  <div className="mb-6">
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Key Responsibilities</h4>
                    <ul className="space-y-2">
                      {exp.responsibilities.map((item, i) => (
                        <li key={i} className="flex items-start text-slate-300 text-sm leading-relaxed">
                          <span className="mt-1.5 mr-3 min-w-[6px] h-1.5 rounded-full bg-accent/50"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {exp.tech.map((t) => (
                      <span key={t} className="px-3 py-1 bg-primary text-accent text-xs font-mono rounded-full border border-slate-700">{t}</span>
                    ))}
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle title="Featured Projects" subtitle="A selection of my recent work in Web Development and ML." />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const isWorkInProgress = project.id === 1 || project.id === 2;
              return (
                <motion.div
                  key={project.id}
                  whileHover={{ y: -8 }}
                  onClick={() => setSelectedProject(project)}
                  className="group cursor-pointer bg-surface rounded-2xl overflow-hidden border border-slate-800 hover:shadow-2xl hover:shadow-accent/10 transition-all relative"
                >
                  {isWorkInProgress && (
                    <div className="absolute top-4 right-4 bg-red-500/90 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg backdrop-blur-sm z-20 border border-red-400/50">
                      In Progress
                    </div>
                  )}
                  <div className="h-48 overflow-hidden relative">
                     <div className="absolute inset-0 bg-primary/40 group-hover:bg-transparent transition-all z-10" />
                     <img src={project.image} alt={project.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-xs font-bold text-accent uppercase tracking-wider">{project.category}</span>
                      <ExternalLink size={16} className="text-slate-500 group-hover:text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-slate-400 text-sm line-clamp-2">{project.shortDesc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        <div className="flex flex-col gap-24">
          
          <section>
            <SectionTitle title="Core Concepts & Architecture" subtitle="Foundational principles guiding my software design." />
            <div className="bg-surface/30 border border-slate-800 rounded-2xl p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {coreConcepts.map((concept, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 bg-primary/50 rounded-lg border border-slate-700/50 hover:border-accent/50 transition-colors">
                    <Layers className="text-accent shrink-0" size={20} />
                    <span className="text-slate-200 font-medium text-sm">{concept}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section>
            <SectionTitle title="AI & Data Science" subtitle="Specialized knowledge in building data-driven intelligent systems." />
            <div className="grid md:grid-cols-2 gap-8">
               <div className="bg-surface/50 p-8 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><Brain size={24}/></div>
                    <h3 className="text-xl font-bold text-white">Research & Domains</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {aiStack.domain.map(item => (
                      <span key={item} className="px-4 py-2 bg-slate-800 text-purple-200 text-sm rounded-lg border border-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
               </div>
               <div className="bg-surface/50 p-8 rounded-2xl border border-slate-800">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-accent/10 rounded-lg text-accent"><BarChart size={24}/></div>
                    <h3 className="text-xl font-bold text-white">Technologies & Libraries</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {aiStack.tech.map(item => (
                      <span key={item} className="px-4 py-2 bg-slate-800 text-accent text-sm rounded-lg border border-slate-700">
                        {item}
                      </span>
                    ))}
                  </div>
               </div>
            </div>
          </section>

          <section>
             <SectionTitle title="Web Development Stack" subtitle="Comprehensive toolkit for full-stack application development." />
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
               <SkillColumn title="Backend" items={skills.backend} icon={Server} />
               <SkillColumn title="Frontend" items={skills.frontend} icon={Code} />
               <SkillColumn title="Database" items={skills.database} icon={Database} />
               <SkillColumn title="DevOps & Tools" items={skills.tools} icon={Cpu} />
             </div>
           </section>

           <section>
             <SectionTitle title="Education" subtitle="Academic background and professional qualifications." />
             <div className="grid md:grid-cols-3 gap-6">
              {education.map((edu, idx) => (
                <div key={idx} className="bg-surface p-6 rounded-xl border border-slate-800 hover:border-slate-600 transition-all flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-slate-800 rounded-lg text-accent">
                      <edu.icon size={24} />
                    </div>
                    <span className="text-xs font-mono text-slate-500 bg-black/20 px-2 py-1 rounded">{edu.period}</span>
                  </div>
                  <h4 className="text-lg font-bold text-slate-100 mb-2">{edu.degree}</h4>
                  <p className="text-accent text-sm mb-4">{edu.institution}</p>
                  <p className="text-sm text-slate-400 mt-auto pt-4 border-t border-slate-800/50">{edu.details}</p>
                </div>
              ))}
            </div>
           </section>

        </div>

        <section id="contact" className="py-20">
          <SectionTitle title="Get In Touch" subtitle="Ready to collaborate on your next project? Let's discuss how I can help." />
          <div className="grid lg:grid-cols-2 gap-12 bg-surface/30 p-8 md:p-12 rounded-3xl border border-slate-800">
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-4">Let's Connect</h3>
                <p className="text-slate-400 leading-relaxed">
                  I'm always excited to hear about interesting real world projects I can contribute as a developer or a researcher.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-primary border border-slate-700 rounded-lg text-accent"><Mail size={20} /></div>
                   <div><h5 className="font-bold text-slate-200">Email</h5><p className="text-slate-400 text-sm">{personalInfo.email}</p></div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-primary border border-slate-700 rounded-lg text-accent"><Phone size={20} /></div>
                   <div><h5 className="font-bold text-slate-200">Phone</h5><p className="text-slate-400 text-sm">{personalInfo.phone}</p></div>
                </div>
                <div className="flex items-start gap-4">
                   <div className="p-3 bg-primary border border-slate-700 rounded-lg text-accent"><MapPin size={20} /></div>
                   <div><h5 className="font-bold text-slate-200">Location</h5><p className="text-slate-400 text-sm">{personalInfo.location}</p></div>
                </div>
              </div>
              <div className="p-6 bg-primary/50 border border-green-500/20 rounded-xl flex items-center gap-4">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <div>
                  <h5 className="font-bold text-green-400 text-sm">Available for Work</h5>
                  <p className="text-slate-500 text-xs mt-1">Currently open to full-time opportunities.</p>
                </div>
              </div>
            </div>

            {state.succeeded ? (
                <div className="flex flex-col items-center justify-center text-center h-full bg-primary/50 rounded-xl p-8 border border-green-500/30">
                    <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center text-green-400 mb-4">
                        <Send size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400">Thanks for reaching out. I'll get back to you shortly.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Name</label>
                      <input id="name" type="text" name="name" placeholder="Your name" required className="w-full p-3 bg-primary border border-slate-700 rounded-lg text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                      <ValidationError prefix="Name" field="name" errors={state.errors} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400">Email</label>
                      <input id="email" type="email" name="email" placeholder="your@email.com" required className="w-full p-3 bg-primary border border-slate-700 rounded-lg text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                      <ValidationError prefix="Email" field="email" errors={state.errors} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Subject</label>
                    <input id="subject" type="text" name="subject" placeholder="Project discussion" required className="w-full p-3 bg-primary border border-slate-700 rounded-lg text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all" />
                    <ValidationError prefix="Subject" field="subject" errors={state.errors} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Message</label>
                    <textarea id="message" name="message" rows="4" placeholder="Tell me about your project..." required className="w-full p-3 bg-primary border border-slate-700 rounded-lg text-white focus:border-accent focus:ring-1 focus:ring-accent outline-none transition-all resize-none"></textarea>
                    <ValidationError prefix="Message" field="message" errors={state.errors} />
                  </div>
                  <button type="submit" disabled={state.submitting} className="w-full py-4 bg-accent hover:bg-sky-400 text-primary font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
                    {state.submitting ? 'Sending...' : <><Send size={18} /> Send Message</>}
                  </button>
                </form>
            )}
          </div>
        </section>

        <footer className="border-t border-slate-800 py-8 text-center text-slate-500 text-sm">
          <p>© 2026 Liviru Weerasinghe. All rights reserved.</p>
        </footer>

      </main>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-surface w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-700 shadow-2xl flex flex-col"
            >
              <button onClick={() => setSelectedProject(null)} className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-accent transition-all z-20"><X size={20} /></button>
              <div 
                className="h-64 md:h-80 overflow-hidden relative cursor-zoom-in group"
                onClick={() => setIsImageZoomed(true)}
              >
                 <img 
                    src={selectedProject.image} 
                    alt={selectedProject.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                 />
                 <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                    <ZoomIn className="text-white drop-shadow-md" size={32} />
                 </div>
              </div>
              <div className="p-8 flex-grow">
                <h3 className="text-3xl font-bold text-white mb-2">{selectedProject.title}</h3>
                <p className="text-slate-300 leading-relaxed mb-6 text-base">{selectedProject.fullDesc}</p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech.map(t => (
                    <span key={t} className="px-3 py-1 bg-primary text-accent text-sm rounded border border-slate-700">{t}</span>
                  ))}
                </div>
              </div>
              <div className="p-6 border-t border-slate-800 flex justify-end">
                {(selectedProject.id === 1 || selectedProject.id === 2) ? (
                  <button 
                    disabled 
                    className="flex items-center gap-2 px-6 py-2.5 bg-slate-800/50 text-slate-500 font-semibold rounded-lg border border-slate-800 cursor-not-allowed"
            >
                    <Lock size={18} /> Private Code
            </button>
                ) : (
                  <a href={selectedProject.repoLink} target="_blank" rel="noreferrer" className="flex items-center gap-2 px-6 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold rounded-lg border border-slate-600 transition-all">
                    <Code size={18} /> View Code
                  </a>
                )}
              </div>
          </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isImageZoomed && selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsImageZoomed(false)}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 md:p-10 cursor-zoom-out backdrop-blur-sm"
          >
            <motion.img 
               initial={{ scale: 0.8 }}
               animate={{ scale: 1 }}
               exit={{ scale: 0.8 }}
               src={selectedProject.image} 
               alt={selectedProject.title}
               className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
               onClick={(e) => e.stopPropagation()} 
            />
            
            <button 
              onClick={() => setIsImageZoomed(false)}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            >
              <X size={32} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;