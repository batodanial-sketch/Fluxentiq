import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import FluxentraLogo from "./FluxentraLogo";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Results", href: "#results" },
  { label: "Contact", href: "#contact" },
];


export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem("theme");
    if (saved) return saved === "dark";
    return document.documentElement.classList.contains("dark");
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNav = (href) => {
    setMobileOpen(false);

    if (location.pathname !== "/") {
      navigate("/" + href);
      return;
    }

    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "py-3" : "py-5"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div
            className={`flex items-center justify-between rounded-2xl px-6 py-3 transition-all duration-300 ${scrolled ? "bg-background/80 backdrop-blur-md border border-border/50 shadow-lg" : "bg-transparent"}`}
          >
            {/* Clean Logo without duplication */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <FluxentraLogo size={32} animated={false} />
              <span className="font-heading font-black text-xl tracking-tight text-foreground">
                FLUXENTIQ
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="px-4 py-2 text-sm font-heading font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-secondary/60"
                >
                  {link.label}
                </button>
              ))}

              <button
                onClick={() => handleNav("#contact")}
                className="ml-3 px-5 py-2.5 bg-primary text-primary-foreground text-sm font-heading font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-sm"
              >
                Start Audit
              </button>

              <motion.button
                onClick={() => setIsDark(!isDark)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 p-2.5 rounded-xl border border-border bg-secondary/40 text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Toggle dark mode"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isDark ? "sun" : "moon"}
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    {isDark ? <Sun size={18} /> : <Moon size={18} />}
                  </motion.div>
                </AnimatePresence>
              </motion.button>
            </nav>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                onClick={() => setIsDark(!isDark)}
                className="p-2.5 rounded-xl border border-border bg-secondary/40 text-muted-foreground"
                aria-label="Toggle dark mode"
              >
                {isDark ? <Sun size={18} /> : <Moon size={18} />}
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="p-2 text-foreground"
                aria-label="Toggle navigation menu"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-2xl pt-28 px-6"
          >
            <div className="flex flex-col items-center gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="w-full text-center py-4 text-lg font-heading font-medium text-foreground border-b border-border/50"
                >
                  {link.label}
                </button>
              ))}
              <button
                onClick={() => handleNav("#contact")}
                className="mt-6 w-full py-4 bg-primary text-primary-foreground font-heading font-semibold rounded-xl text-base shadow-lg"
              >
                Start Automation Audit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}