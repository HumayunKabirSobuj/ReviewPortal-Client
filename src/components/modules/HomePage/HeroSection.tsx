import { ArrowRight, Star } from "lucide-react";
import React from "react";

const HeroSection = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="w-full bg-accent ">
        <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-8 md:py-24">
          {/* Tagline */}
          <p className="text-black mb-4 md:mb-6">Discover, Review, Connect</p>

          {/* Main content */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
            {/* Left column - Text content */}
            <div className="w-full lg:w-1/2 space-y-6">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
                ReviewHub - Your trusted <br />
                source for <span className="text-primary">honest reviews.</span>
              </h1>
              <p className="text-black max-w-md">
                Join our community of reviewers and consumers to discover the
                best products, share your experiences, and make informed
                purchasing decisions.
              </p>
              <button className="flex items-center gap-2 bg-primary hover:bg-purple-600 text-white px-6 py-3 rounded-full transition-all">
                <span>Get Started</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            {/* Right column - Cards */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {/* Main card */}
              <div className="bg-white text-black p-6 rounded-xl col-span-1 md:col-span-2 md:max-w-sm border border-primary">
                <div className="flex flex-col gap-4">
                  <div className="bg-primary w-10 h-10 rounded-full flex items-center justify-center">
                    <Star className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-medium">
                    Discover Trusted Reviews
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <p className="text-sm">Verified User Reviews</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                      <p className="text-sm">Premium Content Access</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 1 */}
              <div className="bg-white text-black p-4 rounded-xl border border-primary">
                <div className="flex flex-col gap-2">
                  <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-white">⏱️</span>
                  </div>
                  <h3 className="text-sm font-medium">
                    Timely & Relevant Reviews
                  </h3>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-white text-black p-4 rounded-xl border border-primary">
                <div className="flex flex-col gap-2">
                  <div className="bg-primary w-8 h-8 rounded-full flex items-center justify-center">
                    <span className="text-white">🔒</span>
                  </div>
                  <h3 className="text-sm font-medium">
                    Secure & Trusted Platform
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
