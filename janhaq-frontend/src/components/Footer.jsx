import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Mail, Phone, MapPin, Github, Twitter, Linkedin, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export default function Footer() {
  const { isAuthenticated } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const legalLinks = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "Accessibility", path: "/accessibility" },
  ];

  return (
    <footer className="relative mt-0 overflow-hidden">
      {/* Horizon Line - Transition Effect */}
      <div className="relative h-32 bg-gradient-to-b from-gray-50 via-gray-100 to-gray-200 dark:from-gray-900 dark:via-[#0A192F] dark:to-[#0A192F]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-cyan-500/10 dark:via-[#64FFDA]/5 dark:to-[#64FFDA]/10" />
      </div>

      {/* Main Footer Container - Edge to Edge */}
      <div
        className={`
          relative overflow-hidden
          bg-gradient-to-b from-gray-200 via-gray-100 to-white dark:from-[#0A192F] dark:via-[#0e1d35] dark:to-[#0A192F]
          border-t-2 border-cyan-500/20 dark:border-[#64FFDA]/30
          transition-all duration-1000 ease-out
          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
        `}
      >
        {/* Aurora Background Effects - Full Width */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Light Mode Aurora */}
          <div className="absolute -top-1/2 left-0 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-blue-300/40 via-cyan-200/30 to-transparent blur-[100px] animate-aurora-1 dark:opacity-0" />
          <div className="absolute top-1/4 right-0 w-[700px] h-[700px] rounded-full bg-gradient-to-tl from-teal-300/40 via-blue-200/30 to-transparent blur-[120px] animate-aurora-2 dark:opacity-0" />
          <div className="absolute bottom-0 left-1/3 w-[600px] h-[500px] rounded-full bg-gradient-to-br from-cyan-200/30 via-blue-100/20 to-transparent blur-[100px] animate-aurora-3 dark:opacity-0" />
          
          {/* Dark Mode Aurora - More Electric */}
          <div className="absolute -top-1/2 left-0 w-[900px] h-[700px] rounded-full bg-gradient-to-br from-[#64FFDA]/25 via-cyan-500/15 to-transparent blur-[120px] animate-aurora-1 opacity-0 dark:opacity-100" />
          <div className="absolute top-1/4 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-tl from-cyan-400/20 via-blue-500/15 to-transparent blur-[140px] animate-aurora-2 opacity-0 dark:opacity-100" />
          <div className="absolute bottom-0 left-1/2 w-[700px] h-[600px] rounded-full bg-gradient-to-br from-teal-300/20 via-[#64FFDA]/10 to-transparent blur-[100px] animate-aurora-3 opacity-0 dark:opacity-100" />
          <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-blue-400/15 via-cyan-300/10 to-transparent blur-[90px] animate-aurora-1 opacity-0 dark:opacity-100" style={{ animationDelay: '5s' }} />
          
          {/* Subtle Stars/Particles Effect */}
          <div className="absolute inset-0 opacity-30 dark:opacity-40"
               style={{
                 backgroundImage: `radial-gradient(circle, rgba(100,255,218,0.3) 1px, transparent 1px)`,
                 backgroundSize: '50px 50px',
                 backgroundPosition: '0 0, 25px 25px'
               }} 
          />
        </div>

        {/* Electric Top Border Glow */}
        <div className="absolute top-0 left-0 right-0 h-[3px] overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-transparent via-cyan-400 dark:via-[#64FFDA] to-transparent opacity-60" />
          <div className="absolute inset-0 blur-lg bg-gradient-to-r from-transparent via-cyan-300/70 dark:via-[#64FFDA]/80 to-transparent animate-pulse-slow" />
        </div>

        <div className="relative px-6 sm:px-8 lg:px-16 py-16 lg:py-20 max-w-7xl mx-auto">
          {/* Main Content Grid - 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 mb-16">
            
            {/* Column 1: Brand & Mission */}
            <div
              className={`
                space-y-6
                transition-all duration-700 delay-100
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              {/* Electric Logo */}
              <div className="flex items-center space-x-3 mb-6">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 dark:from-[#64FFDA] dark:to-cyan-500 rounded-2xl blur-xl opacity-60 group-hover:opacity-100 transition-opacity" />
                  <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 dark:from-[#64FFDA] dark:to-cyan-500 flex items-center justify-center shadow-xl">
                    <Sparkles className="w-7 h-7 text-white dark:text-[#0A192F]" strokeWidth={2.5} />
                  </div>
                </div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-teal-600 dark:from-[#64FFDA] dark:via-cyan-400 dark:to-[#64FFDA] bg-clip-text text-transparent">
                  JanHaq
                </h3>
              </div>
              
              <p className="text-base leading-relaxed text-gray-700 dark:text-[#E6F1FF]/80 max-w-md">
                Empowering citizens with legal awareness and simplified access to government schemes. 
                Your rights, simplified and accessible for everyone.
              </p>

              {/* Social Links with Electric Effect */}
              <div className="flex space-x-4 pt-4">
                {[
                  { icon: Github, href: "https://github.com/janhaq", label: "GitHub" },
                  { icon: Twitter, href: "https://twitter.com/janhaq", label: "Twitter" },
                  { icon: Linkedin, href: "https://linkedin.com/company/janhaq", label: "LinkedIn" }
                ].map((social, idx) => (
                  <a 
                    key={idx}
                    href={social.href}
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="relative group w-12 h-12 rounded-xl bg-white/80 dark:bg-[#112240]/80 backdrop-blur-sm border-2 border-gray-300/50 dark:border-[#64FFDA]/20 flex items-center justify-center text-gray-700 dark:text-[#E6F1FF] hover:-translate-y-1 hover:scale-110 transition-all duration-300 overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 dark:from-[#64FFDA]/0 dark:to-cyan-500/0 group-hover:from-cyan-500/30 group-hover:to-blue-500/30 dark:group-hover:from-[#64FFDA]/30 dark:group-hover:to-cyan-500/30 transition-all duration-300" />
                    <social.icon className="w-5 h-5 relative z-10" />
                    <div className="absolute inset-0 border-2 border-cyan-500/0 dark:border-[#64FFDA]/0 group-hover:border-cyan-500/60 dark:group-hover:border-[#64FFDA]/60 rounded-xl transition-all duration-300" />
                  </a>
                ))}
              </div>
            </div>

            {/* Column 2: Legal & Resources */}
            <div
              className={`
                space-y-6
                transition-all duration-700 delay-200
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <h4 className="font-bold text-lg text-gray-900 dark:text-[#64FFDA] uppercase tracking-wider mb-6">
                Resources
              </h4>
              <ul className="space-y-4">
                {[...legalLinks, { name: "System Status", path: "/api/health", external: true }].map((link, index) => (
                  <li key={link.path}>
                    {link.external ? (
                      <a
                        href={link.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center text-base text-gray-700 dark:text-[#E6F1FF]/70 hover:text-cyan-600 dark:hover:text-[#64FFDA] transition-all duration-300"
                      >
                        <span className="absolute -left-4 w-2 h-2 rounded-full bg-cyan-500 dark:bg-[#64FFDA] opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all duration-300" />
                        <span className="group-hover:translate-x-3 transition-transform duration-300">{link.name}</span>
                      </a>
                    ) : (
                      <Link
                        to={link.path}
                        className="group relative inline-flex items-center text-base text-gray-700 dark:text-[#E6F1FF]/70 hover:text-cyan-600 dark:hover:text-[#64FFDA] transition-all duration-300"
                      >
                        <span className="absolute -left-4 w-2 h-2 rounded-full bg-cyan-500 dark:bg-[#64FFDA] opacity-0 group-hover:opacity-100 group-hover:left-0 transition-all duration-300" />
                        <span className="group-hover:translate-x-3 transition-transform duration-300">{link.name}</span>
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Contact Information */}
            <div
              className={`
                space-y-6
                transition-all duration-700 delay-300
                ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <h4 className="font-bold text-lg text-gray-900 dark:text-[#64FFDA] uppercase tracking-wider mb-6">
                Get in Touch
              </h4>
              <ul className="space-y-5">
                {[
                  { icon: Mail, text: "support@janhaq.in", href: "mailto:support@janhaq.in", label: "Email" },
                  { icon: Phone, text: "+91-9876543210", href: "tel:+919876543210", label: "Phone" },
                  { icon: MapPin, text: "Vadodara, Gujarat, IN", href: null, label: "Location" }
                ].map((contact, idx) => (
                  <li key={idx}>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        aria-label={contact.label}
                        className="flex items-center space-x-4 text-base text-gray-700 dark:text-[#E6F1FF]/70 hover:text-cyan-600 dark:hover:text-[#64FFDA] transition-all duration-300 group"
                      >
                        <div className="relative w-11 h-11 rounded-xl bg-white/90 dark:bg-[#112240]/90 backdrop-blur-sm border-2 border-gray-300/50 dark:border-[#64FFDA]/20 flex items-center justify-center group-hover:border-cyan-500/60 dark:group-hover:border-[#64FFDA]/60 transition-all duration-300 overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 dark:from-[#64FFDA]/0 dark:to-cyan-500/0 group-hover:from-cyan-500/20 group-hover:to-blue-500/20 dark:group-hover:from-[#64FFDA]/20 dark:group-hover:to-cyan-500/20 transition-all duration-300" />
                          <contact.icon className="w-5 h-5 relative z-10" />
                        </div>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">{contact.text}</span>
                      </a>
                    ) : (
                      <div className="flex items-center space-x-4 text-base text-gray-700 dark:text-[#E6F1FF]/70">
                        <div className="w-11 h-11 rounded-xl bg-white/90 dark:bg-[#112240]/90 backdrop-blur-sm border-2 border-gray-300/50 dark:border-[#64FFDA]/20 flex items-center justify-center">
                          <contact.icon className="w-5 h-5" />
                        </div>
                        <span>{contact.text}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Electric Divider with Glow */}
          <div className="relative my-12 h-[2px] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 dark:via-[#64FFDA]/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/60 dark:via-[#64FFDA]/70 to-transparent blur-md animate-pulse-slow" />
          </div>

          {/* Bottom Bar */}
          <div
            className={`
              flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0
              transition-all duration-700 delay-400
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
            `}
          >
            <p className="text-sm text-gray-600 dark:text-[#E6F1FF]/60">
              © {new Date().getFullYear()} JanHaq. All rights reserved.
            </p>
            
            <div className="flex items-center space-x-5 text-sm text-gray-500 dark:text-[#E6F1FF]/50">
              <span className="flex items-center">
                Made with <span className="text-red-500 mx-1.5 animate-pulse-slow">❤️</span> in India
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 dark:bg-[#64FFDA]/40" />
              <span>Powered by AI & Community</span>
            </div>
          </div>
        </div>

        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/30 dark:via-[#64FFDA]/40 to-transparent" />
      </div>

      {/* Custom Animations */}
      <style>{`
        @keyframes aurora-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.7; }
          33% { transform: translate(40px, -40px) scale(1.15); opacity: 0.9; }
          66% { transform: translate(-30px, 30px) scale(0.9); opacity: 0.6; }
        }
        @keyframes aurora-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.6; }
          33% { transform: translate(-50px, 40px) scale(1.2); opacity: 0.85; }
          66% { transform: translate(35px, -35px) scale(0.95); opacity: 0.55; }
        }
        @keyframes aurora-3 {
          0%, 100% { transform: translate(0, 0) scale(1) rotate(0deg); opacity: 0.5; }
          50% { transform: translate(30px, 30px) scale(1.25) rotate(5deg); opacity: 0.8; }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-aurora-1 { animation: aurora-1 25s ease-in-out infinite; }
        .animate-aurora-2 { animation: aurora-2 30s ease-in-out infinite; }
        .animate-aurora-3 { animation: aurora-3 35s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
      `}</style>
    </footer>
  );
}