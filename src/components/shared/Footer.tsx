import {
  ArrowUp,
  Facebook,
  Twitter,
  Instagram,
  Star,
  Github,
  Linkedin,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white py-12 px-4 border-t border-purple-100">
      <div className="max-w-6xl mx-auto">
        {/* Footer main content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Contact Info Column */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-sm text-black mb-4">CONTACT US</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-primary">📞</span>
                <span className="text-black text-sm">+8801747477746</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary">✉️</span>
                <span className="text-black text-sm">
                  support@reviewportal.com
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-primary mt-1">📍</span>
                <span className="text-black text-sm">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Company Column */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-sm text-black mb-4">COMPANY</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  Our Team
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  Press & Media
                </Link>
              </li>
            </ul>
          </div>

          {/* Review Resources Column */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-sm text-black mb-4">
              REVIEW RESOURCES
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  Review Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  Content Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-1">
            <h3 className="font-bold text-sm text-black mb-4">QUICK LINKS</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  Premium Reviews
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  FAQ
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-black text-sm hover:text-primary"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Logo Column */}
          <div className="lg:col-span-1 flex justify-start lg:justify-end">
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Star className="mr-2 h-6 w-6 text-primary" />

                <span className="text-xl font-semibold text-black">
                  Review Portal
                </span>
              </Link>
              <p className="text-black text-xs mt-2 max-w-[200px]">
                Your trusted source for honest and reliable product reviews
              </p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-12 pt-6 border-t border-purple-100">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <h3 className="font-bold text-sm text-black mb-2">
                SUBSCRIBE TO OUR NEWSLETTER
              </h3>
              <p className="text-black text-xs">
                Get the latest reviews and updates delivered to your inbox
              </p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2 border border-purple-200 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full md:w-64 text-black"
              />
              <button className="bg-primary hover:bg-purple-600 text-white px-4 py-2 rounded-r-md transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Footer bottom */}
        <div className="mt-6 pt-6 border-t border-purple-100 flex flex-col md:flex-row justify-between items-center">
          <div className="text-black text-xs mb-4 md:mb-0">
            Copyright © {new Date().getFullYear()} ReviewHub. All rights
            reserved
          </div>

          {/* Social Media Icons */}
          <div className="flex gap-3 mb-4 md:mb-0">
            <Link
              href="#"
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
              aria-label="Facebook"
            >
              <Facebook size={16} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
              aria-label="Twitter"
            >
              <Twitter size={16} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
              aria-label="Instagram"
            >
              <Instagram size={16} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
              aria-label="GitHub"
            >
              <Github size={16} />
            </Link>
            <Link
              href="#"
              className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white hover:bg-purple-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={16} />
            </Link>
          </div>

          {/* Back to Top */}
          <Link
            href="#"
            className="flex items-center gap-1 text-black text-xs hover:text-primary transition-colors"
            aria-label="Back to top"
          >
            <span>Back to Top</span>
            <ArrowUp size={12} />
          </Link>
        </div>
      </div>
    </footer>
  );
}
