"use client";

import FeaturesSection from "@/components/features";
import InteractiveStats from "@/components/interactive-stats";
import PricingSection from "@/components/pricing";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

import { Authenticated, Unauthenticated } from "convex/react";
// Hero Section Component
const HeroSection = () => {
  const [textVisible, setTextVisible] = useState(false);
  const [demoHovered, setDemoHovered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setTextVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="text-center z-10 px-6">
        <div
          className={`transition-all duration-1000 ${textVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          <h1 className="text-6xl md:text-9xl font-black mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              Create
            </span>
            <br />
            <span className="text-white">Without Limits</span>
          </h1>

          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto leading-relaxed">
            Professional image editing powered by AI. Crop, resize, adjust
            colors, remove backgrounds, and enhance your images with
            cutting-edge technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            {/* <Link href="/dashboard">
              <Button variant="primary" size="xl">
                Start Creating
              </Button>
            </Link> */}
            <Unauthenticated>
            <SignUpButton>
              <Button variant="primary">Get Started</Button>
            </SignUpButton>
          </Unauthenticated>

            <Link href="/demo.mp4">
            <Button variant="glass" size="xl">
              Watch Demo
            </Button>
            </Link>
          </div>
        </div>

        {/* 3D Demo Interface */}
        <div
          className={`relative max-w-4xl mx-auto transition-all duration-1000 ${
            textVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-20"
          } ${demoHovered ? "transform scale-105 rotate-y-6" : ""}`}
          onMouseEnter={() => setDemoHovered(true)}
          onMouseLeave={() => setDemoHovered(false)}
          style={{ perspective: "1000px" }}
        >
          <div className=" bg-white/10 border border-white/20 rounded-3xl p-6 transform-gpu">
            <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-2xl p-8 min-h-96">
              <div className="flex items-center justify-between mb-6">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="text-gray-400 text-sm">Pixeon Pro</div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-6">
                {[
                  { icon: "✂️", label: "Crop" },
                  { icon: "📐", label: "Resize" },
                  { icon: "🎨", label: "Adjust" },
                  { icon: "🤖", label: "AI Tools" },
                ].map((tool, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-lg bg-white/5 rounded-xl p-4 text-center hover:bg-white/10 transition-all cursor-pointer"
                    title={tool.label}
                  >
                    <div className="text-2xl mb-1">{tool.icon}</div>
                    <div className="text-xs text-gray-400">{tool.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-center">
                <div className="w-full h-48 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl shadow-2xl shadow-blue-500/50 flex items-center justify-center">
                  <div className="text-white font-bold">Your Canvas</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="pt-36 h-screen w-full overflow-x-hidden scroll-smooth">
      <HeroSection />
      {/* <InteractiveStats /> */}
      <FeaturesSection />
      <PricingSection />

      {/* Final CTA Section */}
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-5xl font-bold mb-6">
            Ready to{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Create Something Amazing?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of creators who are already using AI to transform
            their images and bring their vision to life.
          </p>
          {/* <Link href="/dashboard">
            <Button variant="primary" size="xl">
              🌟 Start Creating Now
            </Button>
          </Link> */}

          <Unauthenticated>
            <SignUpButton>
              <Button variant="primary">🌟 Start Creating Now</Button>
            </SignUpButton>
          </Unauthenticated>
        </div>
        
      </section>

      {/*create contact section*/}
      <section id="contact" className="py-8 bg-gradient-to-b from-slate-800 to-slate-900">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
              <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Get In Touch
              </span>
            </h2>
            
            {/* Single Contact Card - Row Layout */}
            <div className="backdrop-blur-lg bg-white/5 rounded-3xl p-8 hover:bg-white/10 transition-all duration-300 hover:scale-105 border border-white/10 max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                
                {/* Phone Section */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-xl">📱</span>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-lg font-semibold text-white">Phone</p>
                    <a href="tel:+15551234567" className="text-blue-400 hover:text-blue-300 transition-colors">
                      +1 (555) 123-4567
                    </a>
                  </div>
                </div>

                {/* Email Section */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <span className="text-xl">✉️</span>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-lg font-semibold text-white">Email</p>
                    <a href="mailto:hello@pixeonpro.com" className="text-purple-400 hover:text-purple-300 transition-colors">
                      hello@pixeonpro.com
                    </a>
                  </div>
                </div>

                {/* Address Section */}
                <div className="flex items-center justify-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-xl">📍</span>
                  </div>
                  <div className="text-center md:text-left">
                    <p className="text-lg font-semibold text-white">Address</p>
                    <div className="text-gray-300">
                      <p>123 Innovation Drive</p>
                      <p>Tech Valley, CA 94025</p>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </section>
    </div>
  );
};

export default App;
