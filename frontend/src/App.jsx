import { useEffect, useRef, useState } from "react";
import {
  Leaf,
  MapPin,
  AlertTriangle,
  TrendingUp,
  Users,
  Shield,
} from "lucide-react";

const LandPollutionHero = () => {
  const heroRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);

  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);

  const [fade, setFade] = useState(true);

  let slides = [
    {
      image: "/image-4.webp",
      title: "Illegal Land Dumping",
      subtitle:
        "Detecting unregulated industrial in real time",
    },
    {
      image: "/image-2.webp",
      title: "DDeforestation & Land Degradation",
      subtitle: "Moonitoring vegetation loss and soil damage using AI",
    },
    {
      image: "/image-3.jpeg",
      title: "IIndustrial Soil Pollution",
      subtitle: "Identifying hazardous industrial waste before it spreads",
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false); // start fade out

      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
        setFade(true); // fade in new image
      }, 800); // must match transition duration
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let titleIndex = 0;
    let subtitleIndex = 0;

    setTypedTitle("");
    setTypedSubtitle("");

    const titleText = slides[currentSlide].title;
    const subtitleText = slides[currentSlide].subtitle;

    const titleInterval = setInterval(() => {
      setTypedTitle((prev) => prev + titleText.charAt(titleIndex));
      titleIndex++;

      if (titleIndex === titleText.length) {
        clearInterval(titleInterval);

        const subtitleInterval = setInterval(() => {
          setTypedSubtitle((prev) => prev + subtitleText.charAt(subtitleIndex));
          subtitleIndex++;

          if (subtitleIndex === subtitleText.length) {
            clearInterval(subtitleInterval);
          }
        }, 30); // subtitle typing speed
      }
    }, 50); // title typing speed

    return () => {
      clearInterval(titleInterval);
    };
  }, [currentSlide]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.5;

  const heroHeight = heroRef.current?.offsetHeight || 1;
  const heroScrollProgress = Math.min(scrollY / heroHeight, 1);

  const fadeOpacity = Math.max(1 - heroScrollProgress * 1.2, 0);
  const textTranslate = heroScrollProgress * 80;

  const features = [
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Real-time Detection",
      desc: "AI-powered illegal dumping detection",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Satellite Monitoring",
      desc: "Track land degradation from space",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Deforestation Analysis",
      desc: "Monitor vegetation loss impact",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Predictive Analytics",
      desc: "Forecast pollution hotspots",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Citizen Reporting",
      desc: "Community-powered monitoring",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Authority Alerts",
      desc: "Instant notification system",
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-950 text-white overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-gray-90/80 backdrop-blur-md ">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-400" />
            <span className="text-xl font-bold">EcoGuard AI</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-green-400 transition">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-green-400 transition">
              How It Works
            </a>
            <a href="#impact" className="hover:text-green-400 transition">
              Impact
            </a>
          </div>
          <button className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-semibold transition transform hover:scale-105">
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        {/* Background Image Layer */}
        <div
          className={`absolute inset-0 bg-cover bg-center  `}
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            transform: `translateY(${scrollY * 0.3}px) scale(1.1)`,
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <div
            style={{
              opacity: fadeOpacity,
              transform: `translateY(${textTranslate}px)`,
              transition: "opacity 0.2s linear, transform 0.2s linear",
            }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-green-300 via-green-400 to-blue-400 bg-clip-text leading-tight min-h-[4.5rem]">
              {typedTitle}
              <span className="animate-pulse">|</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto min-h-[3rem]">
              {typedSubtitle}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto ">
              {[
                { number: "95%", label: "Detection Accuracy" },
                { number: "24/7", label: "Monitoring" },
                { number: "Real-time", label: "Alerts" },
                { number: "AI-Powered", label: "Analysis" },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-gray-80/50 backdrop-blur-sm  rounded-xl p-4"
                >
                  <div className="text-3xl font-bold ">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 ">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400">
              Comprehensive AI tools for land pollution monitoring
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="group bg-gray-800/50 backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                }}
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center text-green-400 mb-4 group-hover:bg-green-500/30 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">
              Simple, powerful, and effective
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Upload Images",
                desc: "Drone, satellite, or mobile photos",
              },
              {
                step: "02",
                title: "AI Analysis",
                desc: "CNN model detects pollution",
              },
              {
                step: "03",
                title: "Verification",
                desc: "Smart system validates reports",
              },
              {
                step: "04",
                title: "Alert & Action",
                desc: "Notify authorities instantly",
              },
            ].map((item, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section id="impact" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border border-green-500/30 rounded-3xl p-12 text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Making Real Impact
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Aligned with UN Sustainable Development Goals to protect our
              planet and create a sustainable future for all
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "SDG 11: Sustainable Cities",
                "SDG 13: Climate Action",
                "SDG 15: Life on Land",
              ].map((sdg, i) => (
                <span
                  key={i}
                  className="bg-green-500/20 border border-green-500/50 px-6 py-3 rounded-full font-semibold"
                >
                  {sdg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default LandPollutionHero;
