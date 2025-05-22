import { Activity, ArrowRight, BookOpen, Building, FileText, Star, Users } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const ServicesSection = () => {
    return (
        <div>
            {/* Services section */}
        <div className="container mx-auto px-4 py-16 max-w-6xl">
          {/* Header section */}
          <div className="text-center mb-12">
            <p className="text-primary font-medium mb-2">Our Services</p>
            <h1 className="text-2xl md:text-3xl font-bold mb-4 text-black">
              Premium Features for Our Community
            </h1>
            <p className="text-black max-w-3xl mx-auto mb-2">
              Our comprehensive suite of features helps you discover, review,
              and connect with products and services that matter to you.
            </p>
            <p className="text-black max-w-3xl mx-auto">
              These tools are designed to enhance your experience and help you
              make informed purchasing decisions.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200 hover:border-primary hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Star className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                Product Reviews
              </h3>
              <p className="text-black mb-4">
                Read and write detailed reviews on a wide range of products
                across multiple categories.
              </p>
              <Link
                href="/"
                className="text-primary flex items-center text-sm font-medium"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Service 2 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200 hover:border-primary hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                Community Engagement
              </h3>
              <p className="text-black mb-4">
                Connect with other users, vote on reviews, and participate in
                discussions about products.
              </p>
              <Link
                href="/"
                className="text-primary flex items-center text-sm font-medium"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Service 3 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200 hover:border-primary hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Activity className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                Premium Content
              </h3>
              <p className="text-black mb-4">
                Access in-depth expert reviews and exclusive content with our
                premium subscription.
              </p>
              <Link
                href="/"
                className="text-primary flex items-center text-sm font-medium"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Service 4 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200 hover:border-primary hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                Category Exploration
              </h3>
              <p className="text-black mb-4">
                Browse reviews by categories like Gadgets, Clothing, Books, and
                more to find exactly what you`&apos;`re looking for.
              </p>
              <Link
                href="/"
                className="text-primary flex items-center text-sm font-medium"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Service 5 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200 hover:border-primary hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Building className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                Verified Purchases
              </h3>
              <p className="text-black mb-4">
                Identify reviews from verified purchasers to ensure you`&apos;`re
                getting authentic feedback.
              </p>
              <Link
                href="/"
                className="text-primary flex items-center text-sm font-medium"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>

            {/* Service 6 */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200 hover:border-primary hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-bold text-lg mb-2 text-black">
                Review Analytics
              </h3>
              <p className="text-black mb-4">
                Track the performance of your reviews and see how they`&apos;`re
                helping others make decisions.
              </p>
              <Link
                href="/"
                className="text-primary flex items-center text-sm font-medium"
              >
                Learn More <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
        </div>
    );
};

export default ServicesSection;