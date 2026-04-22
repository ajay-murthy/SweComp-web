import { motion, useScroll, useTransform } from "framer-motion";
import { Fingerprint, EyeOff, Radio, Activity, Link2, ArrowRight, Linkedin, ShieldCheck, ScanSearch, Lightbulb, Crosshair, FileCheck } from "lucide-react";
import { Globe } from "@/components/ui/cobe-globe";
import { MachineAnimation } from "@/components/MachineAnimation";
import { Button } from "@/components/ui/button";
import { CarBackground } from "@/components/CarBackground";
import { GooeyText } from "@/components/ui/gooey-text";
import { CricketAnimation } from "@/components/CricketAnimation";
import { useRef } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden font-sans">

      <CarBackground />

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3" data-testid="logo-container">
            <div className="w-7 h-7 bg-foreground flex items-center justify-center">
              <span className="text-background font-bold text-sm">G</span>
            </div>
            <span className="text-base font-semibold tracking-tight font-display">GOISMO</span>
          </div>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#about" className="hover:text-foreground transition-colors">About</a>
            <a href="#services" className="hover:text-foreground transition-colors">Services</a>
            <a href="#products" className="hover:text-foreground transition-colors">Products</a>
            <a href="#automotive" className="hover:text-foreground transition-colors">Automotive</a>
            <a href="#global" className="hover:text-foreground transition-colors">Global</a>
          </nav>
          <a href="mailto:info@goismo.com">
            <Button
              variant="outline"
              className="text-xs border-foreground text-foreground hover:bg-foreground hover:text-background transition-all rounded-none px-5 py-2 h-auto"
              data-testid="button-contact"
            >
              Get in Touch
            </Button>
          </a>
        </div>
      </header>

      {/* 1. Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">

        {/* Giant oversized background word */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
          <span
            className="font-display font-black text-[22vw] leading-none tracking-tighter text-foreground/[0.04] whitespace-nowrap"
            aria-hidden="true"
          >
            SECURITY
          </span>
        </div>

        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 relative z-10 flex items-center min-h-[55vh] sm:min-h-[80vh]">
          <motion.div style={{ y: heroTextY, opacity: heroOpacity }} className="py-10 sm:py-20 max-w-2xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 border border-border text-muted-foreground text-xs uppercase tracking-widest">
                <Activity className="w-3 h-3" /> Est. 2021, Gothenburg, Sweden
              </div>
              <GooeyText
                texts={["Precision.", "Learning.", "Evolution."]}
                morphTime={1.2}
                cooldownTime={2.2}
                className="mb-8"
                textClassName="font-display font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.0] tracking-tight text-foreground"
              />
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed mb-10">
                AI-driven cybersecurity and privacy consulting firm serving enterprises across automotive, finance, healthcare, and critical infrastructure, forging unbreakable digital architectures.
              </p>
              <div className="flex items-center gap-4">
                <a href="mailto:info@goismo.com">
                  <Button
                    className="bg-foreground text-background hover:bg-foreground/90 rounded-none px-8 py-3 h-auto text-sm font-medium"
                    data-testid="button-explore"
                  >
                    Explore Solutions
                  </Button>
                </a>
                <a href="#about" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Learn More <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Stats bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="max-w-screen-xl mx-auto px-4 sm:px-8 pb-10 sm:pb-16 relative z-10 w-full"
        >
          <div className="grid grid-cols-3 divide-x divide-border border border-border">
            {[
              { value: "99.7%", label: "Threat Detection" },
              { value: "<120ms", label: "Response Time" },
              { value: "3", label: "Continents" },
            ].map((stat, i) => (
              <div key={i} className="px-3 sm:px-8 py-4 sm:py-5">
                <div className="text-xl sm:text-2xl font-display font-bold text-foreground">{stat.value}</div>
                <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider mt-1 leading-tight">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 2. About Section */}
      <section id="about" className="py-20 sm:py-32 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">

          {/* Oversized label */}
          <div className="relative overflow-hidden mb-20">
            <span className="absolute font-display font-black text-[12vw] leading-none text-foreground/[0.04] select-none pointer-events-none top-0 left-0 whitespace-nowrap" aria-hidden="true">
              ABOUT
            </span>
            <div className="relative pt-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Who We Are</div>
              <GooeyText
                texts={["Born in Gothenburg.", "Built for the World.", "Trusted Worldwide."]}
                className="max-w-2xl"
                textClassName="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                Founded in 2021, Goismo emerged from the Swedish engineering ethos: precision, reliability, and forward-thinking innovation. Harnessing AI-augmented intelligence, we specialize in enterprise-grade cybersecurity and privacy consulting, industry-agnostic by design, trusted across automotive, finance, healthcare, and critical infrastructure.
              </p>
              <p className="text-base text-muted-foreground leading-relaxed mb-10">
                Our team works across Gothenburg, Bangalore, and Cupertino, delivering end-to-end security strategies that protect the digital infrastructure of today's most demanding industries.
              </p>
              <div className="flex gap-0 border border-border">
                <div className="px-4 sm:px-8 py-5 sm:py-6 border-r border-border">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">2021</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mt-1 leading-tight">Founded</div>
                </div>
                <div className="px-4 sm:px-8 py-5 sm:py-6 border-r border-border">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">3</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mt-1 leading-tight">Global Offices</div>
                </div>
                <div className="px-4 sm:px-8 py-5 sm:py-6">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-foreground">AI</div>
                  <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wide mt-1 leading-tight">Native Security</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
            >
              {[
                { icon: Fingerprint, title: "Cybersecurity Consulting", desc: "AI-augmented threat modeling, penetration testing, and security architecture design for mission-critical systems." },
                { icon: EyeOff, title: "Privacy Engineering", desc: "Privacy-by-design frameworks and GDPR compliance automation built directly into product infrastructure." },
                { icon: Radio, title: "Automotive Security", desc: "Securing V2X communications, in-vehicle networks, and AI-monitored OTA update pipelines for global OEM partners." },
              ].map(({ icon: Icon, title, desc }, i) => (
                <div key={i} className="p-6 border border-border bg-card group hover:border-foreground/30 transition-colors duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 border border-border flex items-center justify-center shrink-0 group-hover:border-foreground/30 transition-colors">
                      <Icon className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">{title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Services Section */}
      <section id="services" className="py-20 sm:py-32 border-t border-border bg-card">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">

          <div className="relative overflow-hidden mb-20">
            <span className="absolute font-display font-black text-[12vw] leading-none text-foreground/[0.04] select-none pointer-events-none top-0 left-0 whitespace-nowrap" aria-hidden="true">
              CDC
            </span>
            <div className="relative pt-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Cyber Defense Center</div>
              <GooeyText
                texts={["Defend. Detect. Respond.", "Always On. Always Ahead.", "Zero Tolerance for Threats."]}
                textClassName="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight"
              />
            </div>
          </div>

          {/* GSOC featured card */}
          <motion.div
            className="border border-border bg-background p-8 sm:p-12 mb-6 relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="absolute top-0 right-0 font-display font-black text-[6rem] sm:text-[9rem] leading-none text-foreground/[0.04] select-none pointer-events-none translate-x-6 -translate-y-4" aria-hidden="true">
              GSOC
            </div>
            <div className="grid lg:grid-cols-2 gap-10 items-start">
              <div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">01 / Global Security Operations Center</div>
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-6">
                  <ShieldCheck className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="font-display font-bold text-3xl sm:text-4xl text-foreground mb-5 leading-tight">
                  24/7 Threat Operations Across Three Continents
                </h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  AI-powered operations spanning Gothenburg, Bangalore, and Cupertino. Continuous coverage with expert-led response times measured in minutes.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-0 border border-border">
                {[
                  { label: "Security Monitoring", desc: "AI-driven event correlation across cloud, endpoint, and network." },
                  { label: "Incident Handling and Response", desc: "Rapid triage, containment, and recovery by certified responders." },
                  { label: "Security Platform Management", desc: "SIEM, SOAR, and XDR deployment, tuning, and optimization." },
                  { label: "Threat Hunting", desc: "Proactive detection of dormant adversaries before alerts fire." },
                ].map(({ label, desc }, i) => (
                  <div key={i} className={`p-5 sm:p-6 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""} border-border`}>
                    <div className="font-semibold text-sm text-foreground mb-2">{label}</div>
                    <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Remaining 4 services */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                num: "02",
                icon: ScanSearch,
                title: "Vulnerability Management",
                desc: "Continuous discovery, risk-prioritized remediation, and verification across cloud, on-premise, and OT environments.",
                tags: [] as string[],
              },
              {
                num: "03",
                icon: Lightbulb,
                title: "Technical Threat Intelligence",
                desc: "Enriched indicators, adversary profiles, and tactical feeds from open and closed sources, integrated into your security controls.",
                tags: [] as string[],
              },
              {
                num: "04",
                icon: Crosshair,
                title: "Penetration Testing",
                desc: "Red team exercises across network, web, cloud, and OT/ICS environments with actionable findings and remediation guidance.",
                tags: [] as string[],
              },
              {
                num: "05",
                icon: FileCheck,
                title: "Compliance",
                desc: "Gap analysis and audit-ready evidence packs to achieve and maintain NIS2 and Cyber Resilience Act certification.",
                tags: ["NIS2", "CRA"],
              },
            ].map(({ num, icon: Icon, title, desc, tags }, i) => (
              <motion.div
                key={num}
                className="group border border-border bg-background p-6 hover:border-foreground/30 transition-colors duration-300 relative overflow-hidden flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.08 }}
              >
                <div className="absolute top-3 right-4 font-display font-black text-[3.5rem] leading-none text-foreground/[0.05] select-none pointer-events-none" aria-hidden="true">
                  {num}
                </div>
                <div className="w-10 h-10 border border-border flex items-center justify-center mb-5 group-hover:border-foreground/30 transition-colors shrink-0">
                  <Icon className="w-4 h-4 text-foreground" />
                </div>
                <h4 className="font-display font-bold text-lg text-foreground mb-3 leading-snug">{title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{desc}</p>
                {tags.length > 0 && (
                  <div className="flex gap-2 mt-5 flex-wrap">
                    {tags.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-widest border border-border px-2 py-1 text-muted-foreground">{t}</span>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Products Section */}
      <section id="products" className="py-20 sm:py-32 border-t border-border bg-background">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">

          <div className="relative overflow-hidden mb-20">
            <span className="absolute font-display font-black text-[12vw] leading-none text-foreground/[0.04] select-none pointer-events-none top-0 left-0 whitespace-nowrap" aria-hidden="true">
              PRODUCTS
            </span>
            <div className="relative pt-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Our Solutions</div>
              <GooeyText
                texts={["Proprietary Security.", "Digital Identity.", "Infrastructure."]}
                textClassName="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* GoSeqr */}
            <motion.div
              className="group border border-border bg-background p-6 sm:p-10 hover:border-foreground/30 transition-colors duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              data-testid="card-goseqr"
            >
              <div className="absolute top-0 right-0 font-display font-black text-[5rem] sm:text-[8rem] leading-none text-foreground/[0.04] select-none pointer-events-none translate-x-4 -translate-y-4" aria-hidden="true">
                GS
              </div>
              <div className="relative">
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-8 group-hover:border-foreground/40 transition-colors">
                  <Fingerprint className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Digital Security</div>
                <h3 className="font-display font-bold text-4xl text-foreground mb-6">GoSeqr</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Our flagship AI-powered digital security platform. Real-time threat detection, autonomous anomaly mitigation, and continuous environmental scanning deployed at the edge.
                </p>
                <ul className="space-y-3 mb-10">
                  {["AI-driven zero-day intelligence", "Decentralized node security", "Autonomous incident response"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-1 h-1 bg-foreground rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.goseqr.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:gap-3 transition-all"
                  data-testid="button-goseqr"
                >
                  Visit GoSeqr <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>

            {/* GoKred */}
            <motion.div
              className="group border border-border bg-background p-6 sm:p-10 hover:border-foreground/30 transition-colors duration-300 relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              data-testid="card-gokred"
            >
              <div className="absolute top-0 right-0 font-display font-black text-[5rem] sm:text-[8rem] leading-none text-foreground/[0.04] select-none pointer-events-none translate-x-4 -translate-y-4" aria-hidden="true">
                GK
              </div>
              <div className="relative">
                <div className="w-12 h-12 border border-border flex items-center justify-center mb-8 group-hover:border-foreground/40 transition-colors">
                  <Link2 className="w-5 h-5 text-foreground" />
                </div>
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-2">Blockchain Accreditation</div>
                <h3 className="font-display font-bold text-4xl text-foreground mb-6">GoKred</h3>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Blockchain-powered enterprise accreditation platform. Immutable on-chain identity verification and AI-verified access management for highly regulated industries.
                </p>
                <ul className="space-y-3 mb-10">
                  {["On-chain identity verification", "Tamper-proof audit trails", "AI-verified compliance automation"].map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground">
                      <div className="w-1 h-1 bg-foreground rounded-full shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="https://www.gokred.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-foreground hover:gap-3 transition-all"
                  data-testid="button-gokred"
                >
                  Visit GoKred <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Automotive Section */}
      <section id="automotive" className="py-20 sm:py-32 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">

          <div className="relative overflow-hidden mb-20">
            <span className="absolute font-display font-black text-[10vw] leading-none text-foreground/[0.04] select-none pointer-events-none top-0 left-0 whitespace-nowrap" aria-hidden="true">
              AUTOMOTIVE
            </span>
            <div className="relative pt-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Industry Focus</div>
              <GooeyText
                texts={["Securing the Vehicles.", "Connected Systems.", "Zero Compromises."]}
                className="max-w-2xl"
                textClassName="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                Modern vehicles are AI-powered data centers on wheels. We partner with the world's leading automotive OEMs to secure internal networks, V2X communications, and over-the-air update pipelines using AI-driven anomaly detection at every layer of the connected vehicle stack.
              </p>
              <div className="grid grid-cols-2 gap-0 border border-border mb-10">
                {[
                  { label: "V2X", sub: "AI-monitored vehicle-to-everything comms" },
                  { label: "OTA", sub: "AI-verified secure firmware delivery" },
                  { label: "IVN", sub: "In-vehicle network anomaly detection" },
                  { label: "PKI", sub: "Intelligent certificate management" },
                ].map((item, i) => (
                  <div key={i} className={`p-4 sm:p-6 ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""} border-border`}>
                    <div className="font-display font-bold text-2xl text-foreground mb-1">{item.label}</div>
                    <div className="text-xs text-muted-foreground">{item.sub}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative aspect-square border border-border bg-card flex items-center justify-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000006_1px,transparent_1px),linear-gradient(to_bottom,#00000006_1px,transparent_1px)] bg-[size:28px_28px]" />

              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 400">
                {/* Concentric radar rings */}
                {[55, 90, 130, 170].map((r, i) => (
                  <motion.circle
                    key={r}
                    cx="200" cy="200" r={r}
                    fill="none"
                    stroke="hsl(220 15% 10%)"
                    strokeOpacity={0.07 - i * 0.01}
                    strokeWidth="1"
                    strokeDasharray={i % 2 === 0 ? "4 8" : "2 10"}
                    style={{ transformOrigin: "200px 200px" }}
                    animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                    transition={{ duration: 30 + i * 8, repeat: Infinity, ease: "linear" }}
                  />
                ))}

                {/* Radar sweep arm */}
                <motion.g
                  style={{ transformOrigin: "200px 200px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                >
                  <line x1="200" y1="200" x2="200" y2="32" stroke="hsl(220 15% 10%)" strokeWidth="1" strokeOpacity="0.18" />
                  <circle cx="200" cy="32" r="3" fill="hsl(220 15% 10%)" fillOpacity="0.25" />
                </motion.g>

                {/* Top-down car silhouette */}
                <g transform="translate(200,200)">
                  {/* Main body */}
                  <rect x="-28" y="-58" width="56" height="116" rx="16" fill="hsl(220 15% 10%)" fillOpacity="0.07" stroke="hsl(220 15% 10%)" strokeWidth="1.3" strokeOpacity="0.35" />
                  {/* Greenhouse */}
                  <rect x="-18" y="-32" width="36" height="64" rx="8" fill="hsl(220 15% 10%)" fillOpacity="0.05" stroke="hsl(220 15% 10%)" strokeWidth="0.7" strokeOpacity="0.2" />
                  {/* Centre spine */}
                  <line x1="0" y1="-50" x2="0" y2="50" stroke="hsl(220 15% 10%)" strokeWidth="0.5" strokeOpacity="0.14" strokeDasharray="4 4" />
                  {/* Wheels */}
                  {[[-38,-44],[28,-44],[-38,24],[28,24]].map(([x,y],i) => (
                    <rect key={i} x={x} y={y} width="10" height="20" rx="3" fill="hsl(220 15% 10%)" fillOpacity="0.18" stroke="hsl(220 15% 10%)" strokeWidth="0.8" strokeOpacity="0.38" />
                  ))}
                  {/* Headlights */}
                  <rect x="-22" y="-61" width="9" height="4" rx="1" fill="hsl(220 15% 10%)" fillOpacity="0.45" />
                  <rect x="13" y="-61" width="9" height="4" rx="1" fill="hsl(220 15% 10%)" fillOpacity="0.45" />
                  {/* Taillights */}
                  <rect x="-22" y="57" width="9" height="4" rx="1" fill="hsl(220 15% 10%)" fillOpacity="0.25" />
                  <rect x="13" y="57" width="9" height="4" rx="1" fill="hsl(220 15% 10%)" fillOpacity="0.25" />
                </g>

                {/* Corner sensor nodes with animated pulse rings */}
                {[
                  { x: 58,  y: 58,  label: "LIDAR" },
                  { x: 342, y: 58,  label: "V2X"   },
                  { x: 58,  y: 342, label: "OTA"   },
                  { x: 342, y: 342, label: "AI"    },
                ].map(({ x, y, label }) => (
                  <g key={label}>
                    {/* Connection line to car */}
                    <line x1={x} y1={y} x2="200" y2="200" stroke="hsl(220 15% 10%)" strokeWidth="0.6" strokeOpacity="0.1" strokeDasharray="4 5" />
                    {/* Animated dot along line, translate from node to centre */}
                    <motion.g
                      style={{ translateX: x - 200, translateY: y - 200 }}
                      animate={{ translateX: 0, translateY: 0, opacity: [0.4, 0] }}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: ({ "LIDAR": 0, "V2X": 0.45, "OTA": 0.9, "AI": 1.35 } as Record<string,number>)[label],
                        ease: "linear",
                      }}
                    >
                      <circle cx={200} cy={200} r="2.5" fill="hsl(220 15% 10%)" />
                    </motion.g>
                    {/* Node */}
                    <circle cx={x} cy={y} r="6" fill="hsl(220 15% 10%)" fillOpacity="0.1" stroke="hsl(220 15% 10%)" strokeWidth="1" strokeOpacity="0.4" />
                    <circle cx={x} cy={y} r="11" fill="none" stroke="hsl(220 15% 10%)" strokeWidth="0.5" strokeOpacity="0.15" />
                    {/* Label */}
                    <text
                      x={x} y={label === "LIDAR" || label === "V2X" ? y - 14 : y + 22}
                      textAnchor="middle"
                      fontSize="8.5"
                      fontFamily="monospace"
                      fill="hsl(220 15% 10%)"
                      fillOpacity="0.45"
                      letterSpacing="0.08em"
                    >
                      {label}
                    </text>
                  </g>
                ))}
              </svg>

              <div className="absolute bottom-6 left-6 border border-border bg-background/90 px-4 py-3 backdrop-blur-sm">
                <div className="text-xs uppercase tracking-widest text-muted-foreground">AI-Powered</div>
                <div className="text-sm font-semibold text-foreground">Threat Detection</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. Global Offices Section */}
      <section id="global" className="py-20 sm:py-32 border-t border-border bg-card">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">

          <div className="relative overflow-hidden mb-20">
            <span className="absolute font-display font-black text-[12vw] leading-none text-foreground/[0.04] select-none pointer-events-none top-0 left-0 whitespace-nowrap" aria-hidden="true">
              GLOBAL
            </span>
            <div className="relative pt-4">
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">Worldwide Presence</div>
              <GooeyText
                texts={["Strategic Presence.", "Around the Clock.", "Gothenburg to Cupertino."]}
                textClassName="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight"
              />
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-12 items-center">
            <div className="lg:col-span-2 space-y-0 border border-border">
              {[
                { city: "Gothenburg", role: "Global Headquarters", coords: "57.7° N, 11.9° E", flag: "SE" },
                { city: "Bangalore", role: "Engineering Hub", coords: "12.9° N, 77.5° E", flag: "IN" },
                { city: "Cupertino", role: "Innovation Center", coords: "37.3° N, 122.0° W", flag: "US" },
              ].map((office, idx) => (
                <div key={idx} className={`p-8 ${idx < 2 ? "border-b border-border" : ""} hover:bg-background transition-colors duration-200`}>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-display font-bold text-xl text-foreground">{office.city}</h4>
                    <span className="text-xs border border-border px-2 py-1 text-muted-foreground">{office.flag}</span>
                  </div>
                  <div className="text-sm text-foreground/70 mb-2">{office.role}</div>
                  <div className="text-xs text-muted-foreground font-mono">{office.coords}</div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-3 relative aspect-square max-w-[560px] mx-auto w-full">
              <Globe
                className="w-full h-full"
                dark={0}
                baseColor={[0.93, 0.93, 0.93]}
                markerColor={[0.08, 0.08, 0.1]}
                arcColor={[0.08, 0.08, 0.1]}
                glowColor={[0.85, 0.85, 0.87]}
                mapBrightness={14}
                markerSize={0.04}
                markers={[
                  { id: "gothenburg", location: [57.7089, 11.9746], label: "Gothenburg" },
                  { id: "bangalore", location: [12.9716, 77.5946], label: "Bangalore" },
                  { id: "cupertino", location: [37.3230, -122.0322], label: "Cupertino" },
                ]}
                arcs={[
                  { id: "arc1", from: [57.7089, 11.9746], to: [12.9716, 77.5946] },
                  { id: "arc2", from: [57.7089, 11.9746], to: [37.3230, -122.0322] },
                  { id: "arc3", from: [12.9716, 77.5946], to: [37.3230, -122.0322] },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Cricket Sponsorship */}
      <section className="py-16 sm:py-24 border-t border-border">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="text-xs uppercase tracking-widest text-muted-foreground mb-4">A Culture of Strategy</div>
              <GooeyText
                texts={["Craft & Strategy.", "Beyond the Screens.", "Play to Win."]}
                className="mb-6"
                textClassName="font-display font-bold text-4xl md:text-5xl text-foreground leading-tight"
              />
              <p className="text-muted-foreground leading-relaxed mb-6">
                Beyond the screens and servers, Goismo is a proud sponsor of{" "}
                <a
                  href="https://vasterasunited.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-2 hover:opacity-70 transition-opacity"
                >
                  Vasteras United Cricket Club
                </a>
                . Just as in cybersecurity, success demands anticipation, flawless execution, and a rock-solid defense. We play to win, on every field.
              </p>
              <a
                href="https://vasterasunited.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:opacity-70 transition-opacity"
              >
                Visit Vasteras United <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="border border-border bg-card p-10 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 font-display font-black text-[8rem] leading-none text-foreground/[0.04] select-none pointer-events-none" aria-hidden="true">
                XI
              </div>
              <div className="relative">
                {/* Cricket animation */}
                <div className="mb-6 opacity-80">
                  <CricketAnimation />
                </div>
                <h3 className="font-display font-bold text-2xl text-foreground mb-3">Official Franchise Sponsors</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                  Strategy, teamwork, and split-second execution. The same principles that make a great cricket team make an elite security firm.
                </p>
                <a
                  href="https://vasterasunited.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors border-b border-border pb-0.5"
                >
                  vasterasunited.com
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 7. Footer / Contact */}
      <footer id="contact" className="border-t border-border bg-foreground text-background">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-8 pt-12 sm:pt-20 pb-10">
          <div className="grid md:grid-cols-2 gap-10 sm:gap-16 mb-10 sm:mb-16">
            <div>
              <div className="flex items-center gap-3 mb-6" data-testid="footer-logo">
                <div className="w-7 h-7 bg-background flex items-center justify-center">
                  <span className="text-foreground font-bold text-sm">G</span>
                </div>
                <span className="text-base font-semibold tracking-tight font-display">GOISMO</span>
              </div>
              <GooeyText
                texts={["Architecting trust.", "Zero-trust world.", "Built to last."]}
                className="mb-6"
                textClassName="font-display font-bold text-3xl md:text-4xl leading-tight text-background"
              />
              <p className="text-background/50 text-sm leading-relaxed max-w-sm mb-8">
                Securing infrastructure. Defending the future of mobility and digital identities across Gothenburg, Bangalore, and Cupertino.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.linkedin.com/company/goismo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-background/20 flex items-center justify-center hover:border-background/60 transition-colors"
                  data-testid="link-linkedin"
                >
                  <Linkedin className="w-4 h-4 text-background/60" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xs uppercase tracking-widest text-background/40 mb-5">Solutions</h4>
                <ul className="space-y-3 text-sm text-background/60">
                  {[
                    { label: "Services", href: "#services" },
                    { label: "GoSeqr", href: "https://www.goseqr.com" },
                    { label: "GoKred", href: "https://www.gokred.com" },
                    { label: "Automotive", href: "#automotive" },
                    { label: "Enterprise", href: "#about" },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <a href={href} className="hover:text-background transition-colors">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs uppercase tracking-widest text-background/40 mb-5">Contact</h4>
                <ul className="space-y-3 text-sm text-background/60 font-mono">
                  <li><a href="mailto:info@goismo.com" className="hover:text-background transition-colors">info@goismo.com</a></li>
                  <li><a href="tel:+46721597573" className="hover:text-background transition-colors">+46 (0)721 597 573</a></li>
                  <li className="mt-4 pt-4 border-t border-background/10">Gothenburg, SE</li>
                  <li>Bangalore, IN</li>
                  <li>Cupertino, US</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-background/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-background/30">
            <div>&copy; {new Date().getFullYear()} Goismo AB. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="hover:text-background/60 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-background/60 transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
