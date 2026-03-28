/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  Briefcase, 
  BookOpen, 
  CheckCircle2, 
  Mail, 
  MapPin,
  ArrowRight,
  X,
  Send,
  Target,
  Users,
  TrendingUp,
  Lock
} from "lucide-react";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const services = [
    {
      title: "Accounting & Advisory",
      icon: <BookOpen className="w-8 h-8 text-blue-500" />,
      description: "Navigate your business journey with data-driven insights. From daily bookkeeping to Virtual CFO services, we provide the financial clarity you need to make informed strategic decisions.",
      items: ["Accounting & Bookkeeping", "Virtual CFO", "Budgeting & Forecasting", "Internal Audit"]
    },
    {
      title: "Taxation",
      icon: <ShieldCheck className="w-8 h-8 text-blue-500" />,
      description: "Stay ahead of the curve with seamless tax management. We handle everything from GST returns to ITR filings, ensuring absolute compliance while optimizing your tax position.",
      items: ["ITR Filing", "GST Registration & Returns", "TDS Compliance", "PAN & TAN Application"]
    },
    {
      title: "Corporate Compliance",
      icon: <Briefcase className="w-8 h-8 text-blue-500" />,
      description: "Build your business on a solid legal foundation. We simplify company registrations and ROC filings, letting you focus on innovation while we handle the red tape.",
      items: ["Company & LLP Registration", "ROC Compliance", "Legal Documentation", "Statutory Filings"]
    }
  ];

  const coreValues = [
    {
      title: "Accuracy You Can Rely On",
      text: "We stay ahead of regulatory changes so your filings are always accurate, timely, and penalty-free.",
      icon: <Target className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Genuinely Approachable",
      text: "No complicated legalese. We explain everything clearly so you feel confident in every decision.",
      icon: <Users className="w-6 h-6 text-blue-500" />
    },
    {
      title: "Growth-Oriented Thinking",
      text: "We don't just look back at your books — we look forward, helping you plan smarter and scale faster.",
      icon: <TrendingUp className="w-6 h-6 text-blue-500" />
    },
    {
      title: "100% Confidential",
      text: "Your financial data is handled with the highest levels of security and professional discretion.",
      icon: <Lock className="w-6 h-6 text-blue-500" />
    }
  ];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setIsModalOpen(false);
          setFormData({ name: "", email: "", phone: "", message: "" });
        }, 3000);
      } else {
        const data = await response.json();
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to connect to the server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const Logo = () => (
    <div className="flex items-center gap-3 group cursor-pointer">
      <div className="relative w-12 h-12">
        <div className={`absolute inset-0 rounded-xl rotate-6 group-hover:rotate-12 transition-transform ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}></div>
        <div className={`absolute inset-0 border rounded-xl flex items-center justify-center shadow-lg ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
          <div className="relative">
            <span className="text-blue-600 font-black text-2xl tracking-tighter">FE</span>
            <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
          </div>
        </div>
      </div>
      <div className="flex flex-col leading-none">
        <span className={`text-xl font-black tracking-tight uppercase ${darkMode ? 'text-white' : 'text-slate-900'}`}>FinEdge</span>
        <span className="text-[10px] font-bold tracking-[0.3em] text-blue-600 uppercase mt-1">Advisory</span>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen font-sans selection:bg-blue-500/30 selection:text-blue-200 transition-colors duration-300 ${darkMode ? 'bg-[#0a0f1a] text-slate-300' : 'bg-slate-50 text-slate-900'}`}>
      {/* Navigation */}
      <nav className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${darkMode ? 'bg-[#0a0f1a]/80 border-white/5' : 'bg-white/80 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-24 items-center">
            <Logo />
            <div className="hidden md:flex items-center space-x-8 text-sm font-bold uppercase tracking-widest">
              <a href="#about" className={`${darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'} transition-colors`}>About</a>
              <a href="#services" className={`${darkMode ? 'text-slate-400 hover:text-blue-400' : 'text-slate-600 hover:text-blue-600'} transition-colors`}>Services</a>
              
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-lg transition-all ${darkMode ? 'bg-white/5 text-yellow-400 hover:bg-white/10' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                aria-label="Toggle Dark Mode"
              >
                {darkMode ? <TrendingUp className="w-5 h-5 rotate-180" /> : <TrendingUp className="w-5 h-5" />}
              </button>

              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition-all shadow-lg active:scale-95"
              >
                Free Consultation
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-40 overflow-hidden">
        {/* Background Accents */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 pointer-events-none">
          <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] ${darkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'}`}></div>
          <div className={`absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] ${darkMode ? 'bg-indigo-500/10' : 'bg-indigo-500/5'}`}></div>
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className={`inline-flex items-center gap-2 px-4 py-2 mb-8 text-[10px] font-black tracking-[0.2em] uppercase border rounded-full ${darkMode ? 'text-blue-400 bg-blue-500/5 border-blue-500/20' : 'text-blue-600 bg-blue-50/50 border-blue-200'}`}>
              <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
              Strategic Financial Excellence
            </div>
            <h1 className={`text-6xl md:text-8xl font-black tracking-tighter mb-10 leading-[0.9] ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              Precision in Finance. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600">Power in Growth.</span>
            </h1>
            <p className={`max-w-3xl mx-auto text-xl mb-12 leading-relaxed font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
              FinEdge Advisory is your premier partner for accounting, taxation, and corporate compliance in India. We eliminate complexity, allowing you to focus on scaling your vision.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest hover:bg-blue-500 transition-all shadow-[0_10px_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 group active:scale-95"
              >
                Book Free Consultation
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a href="#services" className={`w-full sm:w-auto px-10 py-5 border rounded-xl font-black uppercase tracking-widest transition-all text-center active:scale-95 ${darkMode ? 'bg-white/5 text-white border-white/10 hover:bg-white/10' : 'bg-slate-100 text-slate-900 border-slate-200 hover:bg-slate-200'}`}>
                Explore Services
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className={`py-32 border-y transition-colors duration-300 ${darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {coreValues.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex flex-col items-start"
              >
                <div className={`mb-6 p-4 rounded-2xl border transition-colors ${darkMode ? 'bg-blue-500/10 border-blue-500/20' : 'bg-blue-50 border-blue-100'}`}>
                  {value.icon}
                </div>
                <h3 className={`text-lg font-black mb-3 uppercase tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value.title}</h3>
                <p className={`text-sm leading-relaxed font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {value.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section id="about" className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`text-4xl md:text-6xl font-black mb-10 tracking-tighter leading-none ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Bridging the gap between <br />
                <span className="text-blue-600">Compliance</span> and <span className="text-indigo-600">Growth</span>.
              </h2>
              <div className={`space-y-8 text-xl leading-relaxed font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                <p>
                  At FinEdge Advisory, we understand that for Indian startups and SMEs, regulatory compliance isn't just a requirement—it's a foundation for trust and scalability. 
                </p>
                <p>
                  With a team of seasoned professionals, we provide end-to-end financial solutions that ensure your business remains compliant while scaling efficiently. Our commitment is to transparency, accuracy, and your long-term success.
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-8 mt-16 max-w-2xl mx-auto">
                <div className={`p-8 rounded-[2rem] border backdrop-blur-sm transition-colors ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`text-4xl font-black mb-2 tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>500+</div>
                  <div className="text-xs text-blue-600 uppercase tracking-[0.2em] font-black">Clients Served</div>
                </div>
                <div className={`p-8 rounded-[2rem] border backdrop-blur-sm transition-colors ${darkMode ? 'bg-white/5 border-white/10' : 'bg-white border-slate-200 shadow-sm'}`}>
                  <div className={`text-4xl font-black mb-2 tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>15+</div>
                  <div className="text-xs text-blue-600 uppercase tracking-[0.2em] font-black">Expert Advisors</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className={`py-32 border-y transition-colors duration-300 ${darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <h2 className={`text-4xl md:text-6xl font-black mb-6 tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>Specialized Solutions</h2>
            <p className={`max-w-2xl mx-auto text-lg font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Comprehensive financial architecture tailored for the modern Indian business landscape.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`p-10 rounded-[2.5rem] border transition-all group relative overflow-hidden ${darkMode ? 'bg-white/5 border-white/10 hover:border-blue-500/30' : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm'}`}
              >
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl -mr-16 -mt-16 transition-colors ${darkMode ? 'bg-blue-500/5 group-hover:bg-blue-500/10' : 'bg-blue-500/5'}`}></div>
                <div className={`mb-8 p-5 rounded-2xl inline-block group-hover:scale-110 transition-transform ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
                  {service.icon}
                </div>
                <h3 className={`text-2xl font-black mb-6 uppercase tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>{service.title}</h3>
                <p className={`mb-8 leading-relaxed text-sm font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {service.description}
                </p>
                <ul className="space-y-4">
                  {service.items.map((item, i) => (
                    <li key={i} className={`flex items-center gap-4 text-sm font-bold ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_20px_60px_rgba(37,99,235,0.3)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -mr-48 -mt-48"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-[100px] -ml-48 -mb-48"></div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative z-10"
            >
              <h2 className="text-4xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-none">Ready to scale <br /> with confidence?</h2>
              <p className="text-white/80 text-xl mb-12 max-w-2xl mx-auto font-bold">
                Join hundreds of successful businesses that trust FinEdge Advisory for their financial excellence. Let's build your future together.
              </p>
              <button 
                onClick={() => setIsModalOpen(true)}
                className="px-12 py-6 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-[0.2em] text-lg hover:bg-blue-50 transition-all shadow-2xl active:scale-95"
              >
                Book Free Consultation
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <footer id="contact" className={`pt-32 pb-16 border-t transition-colors duration-300 ${darkMode ? 'bg-white/[0.02] border-white/5' : 'bg-white border-slate-200'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-20 mb-24">
            <div className="col-span-2">
              <Logo />
              <p className={`max-w-sm mt-8 mb-10 text-lg font-medium leading-relaxed ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                Your premier partner for accounting, taxation, and corporate compliance in India. Empowering startups and SMEs with financial precision.
              </p>
              <div className="space-y-6">
                <div className={`flex items-center gap-4 group ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <div className={`p-3 rounded-xl border transition-colors ${darkMode ? 'bg-white/5 border-white/10 group-hover:border-blue-500/50' : 'bg-blue-50 border-blue-100 group-hover:border-blue-300'}`}>
                    <Mail className="w-6 h-6 text-blue-600" />
                  </div>
                  <a href="mailto:finedgeadvisory.co@gmail.com" className="text-lg font-bold hover:text-blue-600 transition-colors">finedgeadvisory.co@gmail.com</a>
                </div>
                <div className={`flex items-start gap-4 group ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  <div className={`p-3 rounded-xl border transition-colors ${darkMode ? 'bg-white/5 border-white/10 group-hover:border-blue-500/50' : 'bg-blue-50 border-blue-100 group-hover:border-blue-300'}`}>
                    <MapPin className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-lg font-bold leading-tight">Shop No - 204, Rockmount, <br /> Khadakpada, Kalyan West 421301</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className={`font-black mb-8 uppercase tracking-[0.2em] text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>Navigation</h4>
              <ul className={`space-y-5 font-bold ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Home</a></li>
                <li><a href="#about" className="hover:text-blue-600 transition-colors">About Us</a></li>
                <li><a href="#services" className="hover:text-blue-600 transition-colors">Services</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Testimonials</a></li>
              </ul>
            </div>
            <div>
              <h4 className={`font-black mb-8 uppercase tracking-[0.2em] text-xs ${darkMode ? 'text-white' : 'text-slate-900'}`}>Compliance</h4>
              <ul className={`space-y-5 font-bold ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                <li><a href="#" className="hover:text-blue-600 transition-colors">GST Compliance</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">ROC Filings</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Tax Advisory</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className={`pt-16 border-t flex flex-col md:flex-row justify-between items-center gap-8 ${darkMode ? 'border-white/5' : 'border-slate-200'}`}>
            <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">© 2026 FinEdge Advisory Services. All rights reserved.</p>
            <div className="flex gap-8 text-slate-500">
              <a href="#" className="hover:text-blue-600 transition-colors"><span className="sr-only">LinkedIn</span><svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
              <a href="#" className="hover:text-blue-600 transition-colors"><span className="sr-only">Twitter</span><svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Consultation Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className={`relative w-full max-w-lg rounded-[3rem] shadow-2xl border overflow-hidden transition-colors ${darkMode ? 'bg-[#0f172a] border-white/10' : 'bg-white border-slate-200'}`}
            >
              <button 
                onClick={() => setIsModalOpen(false)}
                className={`absolute top-8 right-8 p-3 rounded-full transition-all ${darkMode ? 'text-slate-500 hover:text-white hover:bg-white/5' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'}`}
              >
                <X className="w-6 h-6" />
              </button>

              <div className="p-10 sm:p-16">
                {isSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 border transition-colors ${darkMode ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                      <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h3 className={`text-3xl font-black mb-4 tracking-tighter ${darkMode ? 'text-white' : 'text-slate-900'}`}>Request Received!</h3>
                    <p className={`text-lg font-medium ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                      Thank you for reaching out. We've logged your details and our advisory team will contact you shortly.
                    </p>
                  </motion.div>
                ) : (
                  <>
                    <h3 className={`text-3xl font-black mb-3 tracking-tighter uppercase ${darkMode ? 'text-white' : 'text-slate-900'}`}>Free Consultation</h3>
                    <p className={`mb-10 font-medium ${darkMode ? 'text-slate-500' : 'text-slate-600'}`}>Share your details and our experts will get in touch with you shortly.</p>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label className={`block text-xs font-black mb-2 uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Full Name</label>
                        <input 
                          required
                          type="text"
                          placeholder="John Doe"
                          className={`w-full px-6 py-4 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-bold ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500/20 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-blue-500/10 focus:border-blue-500'}`}
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label className={`block text-xs font-black mb-2 uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Email</label>
                          <input 
                            required
                            type="email"
                            placeholder="john@example.com"
                            className={`w-full px-6 py-4 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-bold ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500/20 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-blue-500/10 focus:border-blue-500'}`}
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                          />
                        </div>
                        <div>
                          <label className={`block text-xs font-black mb-2 uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Phone</label>
                          <input 
                            required
                            type="tel"
                            placeholder="+91 00000 00000"
                            className={`w-full px-6 py-4 border rounded-2xl focus:outline-none focus:ring-2 transition-all font-bold ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500/20 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-blue-500/10 focus:border-blue-500'}`}
                            value={formData.phone}
                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          />
                        </div>
                      </div>
                      <div>
                        <label className={`block text-xs font-black mb-2 uppercase tracking-widest ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Business Needs</label>
                        <textarea 
                          rows={3}
                          placeholder="How can we help?"
                          className={`w-full px-6 py-4 border rounded-2xl focus:outline-none focus:ring-2 transition-all resize-none font-bold ${darkMode ? 'bg-white/5 border-white/10 text-white placeholder:text-slate-600 focus:ring-blue-500/20 focus:border-blue-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:ring-blue-500/10 focus:border-blue-500'}`}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                        ></textarea>
                      </div>
                      <button 
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-xl flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isSubmitting ? 'Submitting...' : 'Submit Request'}
                        {!isSubmitting && <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
