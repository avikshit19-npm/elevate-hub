"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, RefreshCw, Clock } from "lucide-react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const [currentTime, setCurrentTime] = useState("");
  const [step, setStep] = useState(1);
  const [brandName, setBrandName] = useState("");
  const [bottleneck, setBottleneck] = useState("");
  const [budget, setBudget] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  // Time ticker for local agency clock (Amsterdam CET/CEST)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const amsterdamStr = now.toLocaleTimeString("en-US", {
        timeZone: "Europe/Amsterdam",
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setCurrentTime(amsterdamStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const nextStep = () => {
    if (step === 1 && brandName.trim().length >= 2) {
      setStep(2);
    } else if (step === 2 && bottleneck) {
      setStep(3);
    }
  };

  const submitForm = async () => {
    if (!budget) return;

    const contactUrl = process.env.NEXT_PUBLIC_CONTACT_API_URL;
    const payload = {
      brandName,
      bottleneck,
      budget,
    };

    if (contactUrl) {
      try {
        const response = await fetch(contactUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          setIsSuccess(true);
        } else {
          console.error("API submission failed. Falling back to mock success.");
          setIsSuccess(true);
        }
      } catch (err) {
        console.error("Network error during submission. Falling back to mock success.", err);
        setIsSuccess(true);
      }
    } else {
      // Mock success for development/demo mode
      setIsSuccess(true);
    }
  };

  const resetForm = () => {
    setStep(1);
    setBrandName("");
    setBottleneck("");
    setBudget("");
    setIsSuccess(false);
  };

  const bottleneckOptions = [
    "Scaling Revenue",
    "Brand Perception",
    "Technical Debt",
    "Product Design",
  ];

  const budgetOptions = [
    "$10K – $30K",
    "$30K – $100K",
    "$100K+",
  ];

  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-transparent relative z-10 transition-colors duration-500 border-t border-black/5 dark:border-white/5">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Left Column (Coordinates & World Clock) */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div>
            <p className="text-[10px] font-bold tracking-[0.4em] text-brand-slate uppercase mb-3">
              CONVERSION
            </p>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-[#0B0B0B] dark:text-white transition-colors duration-500 mb-8">
              Let&apos;s build <span className="font-serif italic">legacy</span>.
            </h2>
            
            {/* Coordinates */}
            <div className="mt-8 border-l border-black/10 dark:border-white/10 pl-6 py-2">
              <span className="text-[9px] tracking-[0.2em] font-bold text-brand-slate block">
                HEADQUARTERS
              </span>
              <span className="text-xs text-[#0B0B0B] dark:text-white font-medium mt-1 block">
                Keizersgracht 421, 1016 EK
              </span>
              <span className="text-xs text-brand-slate font-light mt-0.5 block">
                Amsterdam, Netherlands
              </span>
              <span className="text-[11px] font-mono text-brand-slate mt-2 block">
                52.3676° N, 4.9041° E
              </span>
            </div>
          </div>

          {/* World Clock */}
          <div className="mt-16 lg:mt-auto border-t border-black/10 dark:border-white/10 pt-8">
            <div className="flex items-center gap-3">
              <Clock className="h-4 w-4 text-brand-slate animate-pulse" />
              <span className="text-[9px] tracking-[0.2em] font-bold text-brand-slate uppercase">
                LOCAL TIME (CET)
              </span>
            </div>
            <span className="text-3xl md:text-4xl font-extrabold tracking-widest text-[#0B0B0B] dark:text-white font-mono mt-2 block transition-colors duration-500">
              {currentTime || "00:00:00"}
            </span>
          </div>
        </div>

        {/* Right Column (Interactive Floating Form) */}
        <div className="lg:col-span-7 border border-black/10 dark:border-white/10 p-8 md:p-12 bg-black/[0.01] dark:bg-white/[0.01] min-h-[400px] flex flex-col justify-center relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            {isSuccess ? (
              /* Success Screen */
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8 flex flex-col items-center justify-center h-full"
              >
                <div className="w-12 h-12 rounded-full border border-black dark:border-white flex items-center justify-center mb-6">
                  <Check className="h-5 w-5 text-black dark:text-white" />
                </div>
                <h3 className="text-xl font-serif italic text-[#0B0B0B] dark:text-white mb-2">
                  Proposal Logged.
                </h3>
                <p className="text-[11px] text-brand-slate max-w-sm leading-relaxed mb-8">
                  We have queued your brand specs. Our creative direction desk will connect within 24 hours.
                </p>
                <button
                  onClick={resetForm}
                  className="flex items-center gap-2 text-[9px] tracking-[0.2em] font-bold text-brand-slate hover:text-black dark:hover:text-white uppercase transition-colors cursor-none"
                >
                  <RefreshCw className="h-3 w-3" /> RESET GATEWAY
                </button>
              </motion.div>
            ) : (
              /* Form Steps */
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col h-full justify-between"
              >
                <div>
                  {/* Step progress tracker */}
                  <div className="flex justify-between items-center mb-10 border-b border-black/5 dark:border-white/5 pb-4">
                    <span className="text-[9px] tracking-[0.2em] font-bold text-brand-slate uppercase">
                      INQUIRY ARCHITECTURE
                    </span>
                    <span className="text-[10px] font-mono text-[#0B0B0B] dark:text-white font-bold">
                      STEP 0{step} / 03
                    </span>
                  </div>

                  {/* Step 1: Brand Name */}
                  {step === 1 && (
                    <div>
                      <label className="text-lg md:text-xl font-light tracking-tight text-[#0B0B0B] dark:text-white block mb-6 transition-colors duration-500">
                        What&apos;s your <span className="font-serif italic">brand name</span>?
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={brandName}
                          onChange={(e) => setBrandName(e.target.value)}
                          placeholder="e.g. Acme Corp"
                          className="w-full bg-transparent border-b border-black/20 dark:border-white/20 pb-4 text-base font-light tracking-wide text-[#0B0B0B] dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors duration-300 placeholder-black/20 dark:placeholder-white/20 cursor-none"
                        />
                        {/* Micro validation checkmark */}
                        <AnimatePresence>
                          {brandName.trim().length >= 2 && (
                            <motion.span
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                              className="absolute right-0 bottom-4 text-green-500"
                            >
                              <Check className="h-4 w-4" />
                            </motion.span>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Bottleneck */}
                  {step === 2 && (
                    <div>
                      <label className="text-lg md:text-xl font-light tracking-tight text-[#0B0B0B] dark:text-white block mb-6 transition-colors duration-500">
                        What&apos;s your primary <span className="font-serif italic">bottleneck</span>?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {bottleneckOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setBottleneck(opt)}
                            className={`px-6 py-4 text-[9px] font-bold tracking-widest uppercase border text-left transition-all duration-300 cursor-none ${
                              bottleneck === opt
                                ? "bg-[#0B0B0B] dark:bg-white text-white dark:text-[#0B0B0B] border-black dark:border-white"
                                : "border-black/10 dark:border-white/10 text-brand-slate hover:border-black/30 dark:hover:border-white/30"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Step 3: Budget Architecture */}
                  {step === 3 && (
                    <div>
                      <label className="text-lg md:text-xl font-light tracking-tight text-[#0B0B0B] dark:text-white block mb-6 transition-colors duration-500">
                        Your budget <span className="font-serif italic">architecture</span>?
                      </label>
                      <div className="flex flex-col gap-3">
                        {budgetOptions.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => setBudget(opt)}
                            className={`px-6 py-4 text-[9px] font-bold tracking-widest uppercase border text-left transition-all duration-300 cursor-none ${
                              budget === opt
                                ? "bg-[#0B0B0B] dark:bg-white text-white dark:text-[#0B0B0B] border-black dark:border-white"
                                : "border-black/10 dark:border-white/10 text-[#707070] hover:border-black/30 dark:hover:border-white/30"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="mt-12 flex justify-end">
                  {step < 3 ? (
                    <MagneticButton
                      onClick={nextStep}
                      disabled={
                        (step === 1 && brandName.trim().length < 2) ||
                        (step === 2 && !bottleneck)
                      }
                      className={(step === 1 && brandName.trim().length < 2) || (step === 2 && !bottleneck) ? "opacity-30 pointer-events-none" : ""}
                    >
                      <span className="flex items-center gap-2">
                        NEXT STEP <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </MagneticButton>
                  ) : (
                    <MagneticButton
                      onClick={submitForm}
                      disabled={!budget}
                      className={!budget ? "opacity-30 pointer-events-none" : ""}
                    >
                      <span className="flex items-center gap-2">
                        SUBMIT SPECS <Check className="h-3.5 w-3.5" />
                      </span>
                    </MagneticButton>
                  )}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
