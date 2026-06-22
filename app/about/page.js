// app/about/page.js
import React from "react";
import { Leaf, Users, ShieldCheck, Heart, Sparkles, Sprout, Landmark } from "lucide-react";

export const metadata = {
  title: "About Us | EcoStay AI – Preserving Himalayan Culture & Ecology",
  description: "Learn about our mission to keep 100% of tourism revenue in local Chopta villages. Discover our pillars of sustainability, impact statistics, and meet local homestay hosts.",
  keywords: ["about ecostay", "himalayan homestays", "sustainable travel mission", "rural tourism impact", "chopta developers"],
};

export default function AboutPage() {
  const pillars = [
    {
      icon: <Leaf className="h-7 w-7 text-emerald-500" />,
      title: "0% Commission Direct Bookings",
      description: "Unlike commercial aggregators charging 15% to 25%, we connect travelers directly with homestay hosts via automated WhatsApp confirmations. 100% of your booking payment stays in the local village."
    },
    {
      icon: <Sprout className="h-7 w-7 text-emerald-500" />,
      title: "Eco-Friendly Operations",
      description: "Our listed homestays operate off-grid, utilizing solar power for lighting, wood-fire water heaters, and organic waste composting. We promote zero single-use plastic usage in the fragile Chopta alpine zone."
    },
    {
      icon: <Landmark className="h-7 w-7 text-emerald-500" />,
      title: "Preserving Cultural Heritage",
      description: "Travelers live in traditional stone-and-timber Garhwali architecture, eat locally harvested organic millets and legumes, and participate in authentic rural activities supervised by native mountain families."
    }
  ];

  const statistics = [
    { value: "15+", label: "Local Homestays Empowered" },
    { value: "100%", label: "Revenue Retained by Hosts" },
    { value: "12,000+", label: "Plastic Bottles Saved" },
    { value: "1,200+", label: "Trekkers Safely Guided" }
  ];

  const hosts = [
    {
      name: "Devendra Negi",
      location: "Chopta Meadow Lodge",
      quote: "Direct bookings via EcoStay saved my family's business. Now we can afford to install solar-powered water heaters for our winter guests without relying on expensive gas cylinders.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Pushpa Devi",
      location: "Tungnath View Homestay",
      quote: "I love cooking local Mandua (millet) rotis and organic Gahat soup for travelers. The direct connection helps us share our Garhwali culture and fund educational books for our village school.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Sanjay Semwal",
      location: "Sari Eco-Huts & Guiding",
      quote: "By keeping the booking revenue local, we are able to fund weekly clean-up drives around Deoria Tal lake. Sustainable travel is the only way we can preserve these mountains for our children.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <div className="font-sans min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-200">
      
      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-all transform scale-105"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&w=1920&q=80')`,
          }}
        />
        {/* Dark theme overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-950/80 to-slate-950" />
        
        {/* Decorative Floating Alpine Elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mt-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wide uppercase mb-6">
            <Heart className="h-4.5 w-4.5 text-emerald-400 shrink-0" />
            <span>Community First Model</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Preserving Himalayan <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent">
              Culture & Ecology
            </span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            EcoStay AI was founded in the high-altitude forests of Chopta, Uttarakhand, to revolutionize rural tourism and eliminate excessive booking commissions that drain local resources.
          </p>
        </div>
      </section>

      {/* The Core Mission */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-300 text-xs font-bold rounded-full">
              <Sparkles className="h-3.5 w-3.5" />
              <span>THE ECOSTAY PROBLEM-SOLVER</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold font-sans tracking-tight">
              Why Direct Bookings <br />
              <span className="text-emerald-600 dark:text-emerald-400">Save Mountain Villages</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              In remote Himalayan areas like Chopta, small homestays are run by local villagers. Large corporate travel websites list these homestays but take up to 25% of the total booking cost as commission. This pulls valuable capital out of the rural community and forces hosts to raise prices or lower service quality.
            </p>
            <p className="text-slate-600 dark:text-slate-400 font-light leading-relaxed">
              **EcoStay AI** cuts out all middlemen. We provide a premium interface for travelers and directly connect their bookings via automated WhatsApp integration, guaranteeing that **100% of booking revenue** stays directly in the hands of the villagers who host them.
            </p>
            
            <div className="flex gap-4 pt-4">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold">0% Broker Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                  <Users className="h-5 w-5" />
                </div>
                <span className="text-sm font-semibold">100% Local Custody</span>
              </div>
            </div>
          </div>

          {/* Visual Showcase Block */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-2xl border border-white/5">
              <img 
                src="https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=800&q=80" 
                alt="Traditional Himalayan Village Homestay" 
                className="w-full h-[400px] object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent p-6 text-white">
                <p className="text-xs text-emerald-400 font-semibold tracking-widest uppercase mb-1">Authentic Stay</p>
                <h4 className="text-lg font-bold">Traditional stone architecture in Chopta Valley</h4>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Sustainable Statistics Dashboard */}
      <section className="py-16 bg-slate-100 dark:bg-slate-900 border-y border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest mb-10">Our Live Environmental & Economic Impact</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {statistics.map((stat, idx) => (
              <div key={idx} className="p-6 bg-white dark:bg-slate-950/40 rounded-2xl shadow-sm border border-slate-200/40 dark:border-slate-800/40 hover-scale">
                <p className="text-3xl sm:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 mb-2">{stat.value}</p>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold font-sans tracking-tight mb-4">Our Three Pillars of Responsible Travel</h2>
          <p className="text-slate-500 dark:text-slate-400 font-light text-sm sm:text-base">
            We vet every single listing to verify it satisfies strict ecological, social, and commercial criteria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="glass p-8 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm hover-scale flex flex-col items-start text-left">
              <div className="p-4 bg-emerald-500/10 dark:bg-slate-800 rounded-2xl mb-6">
                {pillar.icon}
              </div>
              <h3 className="text-lg font-bold mb-3">{pillar.title}</h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Meet the Hosts Section */}
      <section className="py-20 bg-slate-100/50 dark:bg-slate-900/30 border-t border-slate-200/50 dark:border-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold font-sans tracking-tight mb-4">Meet Your Himalayan Hosts</h2>
            <p className="text-slate-500 dark:text-slate-400 font-light text-sm sm:text-base">
              The heart of EcoStay AI is the hospitality of our local host families. Hear what they have to say.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {hosts.map((host, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-950 p-6 rounded-3xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col justify-between hover-scale text-left">
                <div className="space-y-4">
                  {/* Quote decoration */}
                  <span className="text-5xl text-emerald-500/20 font-serif leading-none block h-4">“</span>
                  <p className="text-xs sm:text-sm italic text-slate-600 dark:text-slate-400 leading-relaxed font-light">
                    {host.quote}
                  </p>
                </div>
                
                <div className="flex items-center gap-3.5 mt-8 pt-6 border-t border-slate-100 dark:border-slate-900">
                  <img 
                    src={host.image} 
                    alt={host.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/25"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">{host.name}</h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">{host.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Incubation Context / Bottom Section */}
      <section className="py-16 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-3xl bg-emerald-500/5 dark:bg-emerald-950/10 border border-emerald-500/20 dark:border-emerald-500/10">
          <h3 className="text-base font-bold text-emerald-700 dark:text-emerald-400 mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5" />
            <span>TBI Technology Demonstration</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-light leading-relaxed">
            EcoStay AI is a frontend prototype project developed for the Technology Business Incubator (TBI) internship evaluation. It demonstrates the intersection of green technologies (off-grid solar, local supply chains) with modern web engineering to empower remote rural populations.
          </p>
        </div>
      </section>

    </div>
  );
}
