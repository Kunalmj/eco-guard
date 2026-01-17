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

  const [user, setUser] = useState(null);


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {

  setIsLoggedIn(!!user);
}, []);

const handleAuthAction = () => {
  if (isLoggedIn) {
    localStorage.removeItem("user");
    setUser(null);
    setIsLoggedIn(false);
    window.location.href = "/";
  } else {
    window.location.href = "/login";
  }
};

  const [typedTitle, setTypedTitle] = useState("");
  const [typedSubtitle, setTypedSubtitle] = useState("");

  const [currentSlide, setCurrentSlide] = useState(0);

  const [fade, setFade] = useState(true);

  let slides = [
    {
      image: "/image-4.webp",
      title: "Illegal Land Dumping",
      subtitle: "Detecting unregulated industrial in real time",
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
    },
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
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setUser(JSON.parse(storedUser));
    setIsLoggedIn(true);
  } else {
    setUser(null);
    setIsLoggedIn(false);
  }
}, []);

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
      bg: "#18453B",
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Satellite Monitoring",
      desc: "Track land degradation from space",
      bg: "#355E3B",
    },
    {
      icon: <Leaf className="w-6 h-6" />,
      title: "Deforestation Analysis",
      desc: "Monitor vegetation loss impact",
      bg: "#00A86B",
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Landfill",
      desc: "Forecast pollution hotspots",
      bg: "#29AB87",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Citizen Reporting",
      desc: "Community-powered monitoring",
      bg: "#9ACD32",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Authority Alerts",
      desc: "Instant notification system",
      bg: "#18453B",
    },
  ];

  return (
    <div className="min-h-screen bg-'#eee5e9' text-black overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/50 backdrop-blur-md text-black">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Leaf className="w-8 h-8 text-green-400" />
            <span className="text-xl font-bold">EcoGuard AI</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#features" className="hover:text-green-400 transition">
              Features
            </a>
            <a href="#analyze" className="hover:text-green-400 transition">
              Analyze
            </a>
            <a href="#how-it-works" className="hover:text-green-400 transition">
              How It Works
            </a>
            <a href="#impact" className="hover:text-green-400 transition">
              Impact
            </a>
          </div>
          <button
  onClick={handleAuthAction}
  className="bg-green-500 hover:bg-green-600 px-6 py-2 rounded-full font-semibold transition transform hover:scale-105 flex items-center gap-2"
>
  {isLoggedIn ? (
    <>
      <span className="text-sm">Hi, {user?.name + " || " || "User ||"}</span>
      <span className="text-sm font-bold">Logout</span>
    </>
  ) : (
    <span>Login / Sign Up</span>
  )}
</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden text-white"
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
                  <div className="text-3xl font-bold ">{stat.number}</div>
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
                className="text-white group backdrop-blur-sm border border-green-500/20 rounded-2xl p-6 hover:border-green-500/50 transition-all duration-300 hover:transform hover:scale-105"
                style={{
                  backgroundColor: feature.bg,
                  animation: `fadeInUp 0.6s ease-out ${i * 0.1}s both`,
                }}
              >
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-white">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Analysis Selection Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-white-900 to-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Choose Your Analysis
            </h2>
            <p className="text-xl text-gray-400">
              Select the type of environmental monitoring you need
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Deforestation Card */}
            <div className="group relative bg-gradient-to-br from-green-900/40 to-green-800/20 border-2 border-green-500/30 rounded-3xl p-8 hover:border-green-500 transition-all duration-500 hover:transform hover:scale-105 overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition">
                  <Leaf className="w-8 h-8 text-green-400" />
                </div>
                
                <h3 className="text-3xl text-white font-bold mb-4">
                  Deforestation Analysis
                </h3>
                
                <p className="text-gray-300 mb-6 text-lg">
                  Monitor vegetation loss, track forest degradation, and analyze land cover changes over time using satellite imagery and NDVI analysis.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Satellite image comparison",
                    "NDVI vegetation index",
                    "Time-series analysis",
                    "Forest cover mapping"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => window.location.href = '/deforestation'}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-green-500/30 group-hover:shadow-green-500/50"
                >
                  Analyze Deforestation →
                </button>
              </div>
            </div>

            {/* Landfill Detection Card */}
            <div className="group relative bg-gradient-to-br from-orange-900/40 to-red-800/20 border-2 border-orange-500/30 rounded-3xl p-8 hover:border-orange-500 transition-all duration-500 hover:transform hover:scale-105 overflow-hidden">
              {/* Animated background effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/0 to-orange-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-orange-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-orange-500/30 transition">
                  <AlertTriangle className="w-8 h-8 text-orange-400" />
                </div>
                
                <h3 className="text-3xl text-white font-bold mb-4">
                  Landfill Detection
                </h3>
                
                <p className="text-gray-300 mb-6 text-lg">
                  Identify illegal dumping sites, detect industrial waste, monitor soil contamination, and track pollution zones using AI-powered image recognition.
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "AI waste detection",
                    "Illegal dump identification",
                    "Soil contamination zones",
                    "Real-time monitoring"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center text-gray-300">
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button 
                  onClick={() => window.location.href = '/landfill'}
                  className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg shadow-orange-500/30 group-hover:shadow-orange-500/50"
                >
                  Detect Landfills →
                </button>
              </div>
            </div>
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
