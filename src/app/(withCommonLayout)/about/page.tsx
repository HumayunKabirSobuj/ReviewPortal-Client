/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Building2,
  Clock,
  Globe,
  Heart,
  Users,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="relative w-full min-h-screen bg-white overflow-hidden px-4 md:px-8 lg:px-16 py-8 md:py-12">
      {/* Hero section */}
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-black mb-8">
          <Link href="/" className="hover:text-purple-600 transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-purple-600">About Us</span>
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-12 lg:gap-16">
          {/* Left column - Text content */}
          <div className="w-full lg:w-1/2 space-y-6">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-black leading-tight">
              About <span className="text-purple-600">ReviewHub</span>
            </h1>
            <p className="text-black">
              ReviewHub was founded in 2020 with a simple mission: to create a
              trusted platform where consumers can find honest, reliable reviews
              to make informed purchasing decisions.
            </p>
            <p className="text-black">
              What started as a small community of passionate reviewers has
              grown into a thriving ecosystem of consumers, reviewers, and
              experts dedicated to transparency and authenticity in product
              reviews.
            </p>
          </div>

          {/* Right column - Image */}
          <div className="w-full lg:w-1/2 relative h-64 md:h-80 lg:h-96">
            <Image
              src="/images/admin-illustration.png"
              alt="Person working at desk"
              fill
              priority
              className="mx-auto h-auto w-full"
            />
          </div>
        </div>
      </div>

      {/* Our Mission section */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          {/* Left side - Image */}
          <div className="w-full md:w-2/5 relative h-64 md:h-80">
            <Image
              src="/images/mission.png"
              alt="Our Mission"
              fill
              className="object-contain rounded-lg"
            />
          </div>

          {/* Right side - Text content */}
          <div className="w-full md:w-3/5 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Our Mission
            </h2>
            <div className="border-l-4 border-purple-600 pl-4 py-1">
              <p className="text-black">
                To empower consumers with honest, transparent, and reliable
                product information, enabling them to make confident purchasing
                decisions.
              </p>
            </div>
            <p className="text-black">
              We believe that every consumer deserves access to authentic
              reviews that reflect real experiences. Our platform is designed to
              eliminate bias and promote transparency, ensuring that the
              information you receive is trustworthy and valuable.
            </p>
            <p className="text-black">
              By fostering a community of honest reviewers and implementing
              rigorous verification processes, we're creating a more transparent
              marketplace for everyone.
            </p>
          </div>
        </div>
      </div>

      {/* Our Values section */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
            Our Core Values
          </h2>
          <p className="text-black max-w-3xl mx-auto">
            These principles guide everything we do at ReviewHub, from how we
            build our platform to how we interact with our community.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Value 1 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200 hover:border-purple-600 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-black">Integrity</h3>
            <p className="text-black">
              We uphold the highest standards of honesty and ethical conduct in
              all our operations, ensuring that our platform remains trustworthy
              and reliable.
            </p>
          </div>

          {/* Value 2 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200 hover:border-purple-600 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-black">Community</h3>
            <p className="text-black">
              We foster a supportive environment where reviewers and consumers
              can connect, share experiences, and help each other make informed
              decisions.
            </p>
          </div>

          {/* Value 3 */}
          <div className="bg-white p-6 rounded-lg shadow-sm border border-purple-200 hover:border-purple-600 hover:shadow-md transition-all">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <Heart className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-lg mb-2 text-black">Authenticity</h3>
            <p className="text-black">
              We prioritize genuine user experiences and implement verification
              processes to ensure that reviews reflect real interactions with
              products.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story section */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-24">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-black">
          Our Story
        </h2>

        <div className="space-y-12">
          {/* Timeline item 1 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="md:w-1/4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-black">2020</span>
              </div>
              <h3 className="font-bold text-lg mt-2 text-black">
                The Beginning
              </h3>
            </div>
            <div className="md:w-3/4 bg-white p-6 rounded-lg border border-purple-200">
              <p className="text-black">
                ReviewHub was founded by a group of tech enthusiasts who were
                frustrated with the lack of reliable product reviews online.
                They envisioned a platform where consumers could find honest,
                unbiased reviews to guide their purchasing decisions.
              </p>
            </div>
          </div>

          {/* Timeline item 2 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="md:w-1/4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-black">2021</span>
              </div>
              <h3 className="font-bold text-lg mt-2 text-black">
                Growing Community
              </h3>
            </div>
            <div className="md:w-3/4 bg-white p-6 rounded-lg border border-purple-200">
              <p className="text-black">
                Within a year, our community grew to over 5,000 active users. We
                introduced our verification system to ensure the authenticity of
                reviews and launched our first mobile app to make reviews
                accessible on the go.
              </p>
            </div>
          </div>

          {/* Timeline item 3 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="md:w-1/4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-black">2022</span>
              </div>
              <h3 className="font-bold text-lg mt-2 text-black">
                Premium Reviews
              </h3>
            </div>
            <div className="md:w-3/4 bg-white p-6 rounded-lg border border-purple-200">
              <p className="text-black">
                We introduced our Premium Reviews feature, partnering with
                industry experts to provide in-depth analysis of products. This
                addition helped users gain even more comprehensive insights
                before making purchasing decisions.
              </p>
            </div>
          </div>

          {/* Timeline item 4 */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8">
            <div className="md:w-1/4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-purple-600" />
                <span className="font-bold text-black">Today</span>
              </div>
              <h3 className="font-bold text-lg mt-2 text-black">
                Global Impact
              </h3>
            </div>
            <div className="md:w-3/4 bg-white p-6 rounded-lg border border-purple-200">
              <p className="text-black">
                Today, ReviewHub serves over 10,000 users worldwide, with
                reviews spanning more than 50 product categories. We continue to
                innovate and improve our platform, always guided by our mission
                to provide honest, reliable reviews to consumers everywhere.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team section */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-24">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
            Meet Our Team
          </h2>
          <p className="text-black max-w-3xl mx-auto">
            The passionate individuals behind ReviewHub who work tirelessly to
            create the best review platform for our community.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Team Member 1 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-purple-200 hover:border-purple-600 hover:shadow-md transition-all">
            <div className="relative h-64">
              <Image
                src="/images/person4.png"
                alt="Team Member"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-black">Sarah Johnson</h3>
              <p className="text-purple-600 text-sm mb-2">Co-Founder & CEO</p>
              <p className="text-black text-sm">
                Tech enthusiast with a passion for consumer advocacy and
                transparency.
              </p>
            </div>
          </div>

          {/* Team Member 4 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-purple-200 hover:border-purple-600 hover:shadow-md transition-all">
            <div className="relative h-64">
              <Image
                src="/images/person6.png"
                alt="Team Member"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-black">Aisha Patel</h3>
              <p className="text-purple-600 text-sm mb-2">Community Manager</p>
              <p className="text-black text-sm">
                Community building expert dedicated to fostering meaningful
                connections.
              </p>
            </div>
          </div>

          {/* Team Member 3 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-purple-200 hover:border-purple-600 hover:shadow-md transition-all">
            <div className="relative h-64">
              <Image
                src="/images/person2.png"
                alt="Team Member"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-black">David Rodriguez</h3>
              <p className="text-purple-600 text-sm mb-2">Head of Content</p>
              <p className="text-black text-sm">
                Former journalist with expertise in product research and
                analysis.
              </p>
            </div>
          </div>

          {/* Team Member 2 */}
          <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-purple-200 hover:border-purple-600 hover:shadow-md transition-all">
            <div className="relative h-64">
              <Image
                src="/images/person3.png"
                alt="Team Member"
                fill
                className="object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg text-black">Michael Chen</h3>
              <p className="text-purple-600 text-sm mb-2">Co-Founder & CTO</p>
              <p className="text-black text-sm">
                Software engineer focused on creating intuitive, user-friendly
                platforms.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Global Presence section */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-24">
        <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
          {/* Left side - Text content */}
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-2xl md:text-3xl font-bold text-black">
              Our Global Presence
            </h2>
            <p className="text-black">
              ReviewHub has grown from a local initiative to a global platform,
              serving users across multiple countries and continents. Our
              diverse community brings together perspectives from around the
              world, enriching our review ecosystem.
            </p>

            <div className="space-y-4">
              {/* Stat 1 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Globe className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-xl text-black">25+ Countries</p>
                  <p className="text-black text-sm">Active user presence</p>
                </div>
              </div>

              {/* Stat 2 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-xl text-black">3 Offices</p>
                  <p className="text-black text-sm">
                    Located in major tech hubs
                  </p>
                </div>
              </div>

              {/* Stat 3 */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-bold text-xl text-black">
                    50+ Team Members
                  </p>
                  <p className="text-black text-sm">
                    Working remotely worldwide
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="w-full md:w-1/2 relative h-64 md:h-80">
            <Image
              src="/images/map.png"
              alt="Global Map"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="max-w-7xl mx-auto mt-16 md:mt-24 mb-8 border-2 border-purple-500 rounded-4xl">
        <div className=" rounded-xl p-8 md:p-12 text-black">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-4 text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold">
                Join Our Community Today
              </h2>
              <p className="max-w-md">
                Become part of our growing community of reviewers and consumers.
                Share your experiences, discover new products, and help others
                make informed decisions.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-purple-600 hover:bg-gray-100 px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors">
                <span>Sign Up Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-3 rounded-full flex items-center justify-center gap-2 transition-colors">
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
