import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

const HowItWorksSection = () => {
    return (
        <div>
             {/* How it works section */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Top section - CTA */}
          <div className="bg-white p-6 rounded-lg mb-12 border border-primary">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-black">
                  Enhance your shopping experience with{" "}
                  <span className="text-primary">honest reviews</span>
                </h2>
                <p className="text-sm text-black">
                  Join thousands of users who make better purchasing decisions
                  with our community-driven reviews.
                  <br />
                  Start today and never regret a purchase again.
                </p>
              </div>
              <button className="bg-primary hover:bg-purple-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-colors">
                <span>Get Started Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Main section - How it works */}
          <div className="mt-8">
            <h3 className="text-primary uppercase text-sm font-medium mb-2">
              Our Process
            </h3>
            <h2 className="text-2xl font-bold mb-8 text-black">
              How Our Review Platform Works!
            </h2>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Left side - Illustration */}
              <div className="w-full md:w-2/5">
                <div className="relative h-64 md:h-80">
                  <Image
                    src="/images/review.png"
                    alt="Product review illustration"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Right side - Text content */}
              <div className="w-full md:w-3/5 space-y-4">
                <div className="border-l-4 border-primary pl-4 py-1">
                  <p className="text-sm text-black">
                    Our platform connects consumers with honest, detailed
                    reviews to help them make informed decisions.
                    <br />
                    Here`&apos;`s how it works.
                  </p>
                </div>

                <p className="text-black text-sm leading-relaxed">
                  Our review platform allows users to create accounts and share
                  their experiences with products across various categories.
                  Users can rate products on a scale of 1-5 stars, provide
                  detailed reviews, and even include information about where
                  they purchased the item. The community can then vote on these
                  reviews and engage in discussions through comments.
                </p>

                <p className="text-black text-sm leading-relaxed">
                  For those looking for more in-depth analysis, we offer premium
                  reviews created by experts and experienced users. These
                  premium reviews provide comprehensive insights and are
                  available for a small fee. All content is moderated by our
                  admin team to ensure it meets our community guidelines,
                  providing you with a trustworthy platform for all your product
                  research needs.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white py-12 lg:px-4 mt-16 rounded-lg border border-purple-200">
            <div className="lg:max-w-3xl w-full mx-auto">
              {/* FAQ Header */}
              <h2 className="text-2xl font-bold text-center mb-8 text-black">
                Frequently Asked Questions
              </h2>

              {/* FAQ Accordion */}
              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-1"
                  className="bg-white rounded-lg shadow-sm border border-purple-200"
                >
                  <AccordionTrigger className="p-4 hover:no-underline">
                    <h3 className="font-medium text-left text-black">
                      How do I create an account and start writing reviews?
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-0">
                    <p className="text-black text-sm">
                      Creating an account is simple! Click the Sign Up button
                      in the top right corner, fill out the registration form
                      with your email and password, and verify your email
                      address. Once registered, you can navigate to any product
                      page and click Write a Review to share your experience.
                      Your review will be submitted for moderation and published
                      once approved.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="bg-white rounded-lg shadow-sm border border-purple-200"
                >
                  <AccordionTrigger className="p-4 hover:no-underline">
                    <h3 className="font-medium text-left text-black">
                      What are premium reviews and how can I access them?
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-0">
                    <p className="text-black text-sm">
                      Premium reviews are in-depth analyses written by our
                      expert team or verified power users. They include detailed
                      pros and cons, performance metrics, and long-term usage
                      insights. To access premium reviews, you need to subscribe
                      to our Premium plan. Visit your account settings and
                      select Upgrade to Premium to see our subscription
                      options.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="bg-white rounded-lg shadow-sm border border-purple-200"
                >
                  <AccordionTrigger className="p-4 hover:no-underline">
                    <h3 className="font-medium text-left text-black">
                      How does the voting system work for reviews?
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-0">
                    <p className="text-black text-sm">
                      Our voting system allows users to rate the helpfulness of
                      reviews. Each review has upvote and downvote buttons.
                      Upvoting indicates you found the review helpful, while
                      downvoting suggests it was not useful. Reviews with more
                      upvotes appear higher in the listings. You must be logged
                      in to vote, and you can only vote once per review.
                    </p>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="bg-white rounded-lg shadow-sm border border-purple-200"
                >
                  <AccordionTrigger className="p-4 hover:no-underline">
                    <h3 className="font-medium text-left text-black">
                      How can I become an admin or moderator on the platform?
                    </h3>
                  </AccordionTrigger>
                  <AccordionContent className="px-4 pb-4 pt-0">
                    <p className="text-black text-sm">
                      We select moderators from our most active and trusted
                      community members. To be considered, maintain a
                      high-quality contribution record with at least 50 approved
                      reviews and a positive reputation score. Admin positions
                      are typically filled internally. If you are interested in
                      becoming a moderator, you can apply through the Moderator
                      Application form in your profile settings after meeting
                      the eligibility requirements.
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              {/* Statistics Section */}
              <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Statistic 1 */}
                <div className="text-center">
                  <p className="text-primary text-2xl font-bold">10,000+</p>
                  <p className="text-sm text-black">Active Users</p>
                </div>

                {/* Statistic 2 */}
                <div className="text-center">
                  <p className="text-primary text-2xl font-bold">25,000+</p>
                  <p className="text-sm text-black">Product Reviews</p>
                </div>

                {/* Statistic 3 */}
                <div className="text-center">
                  <p className="text-primary text-2xl font-bold">500+</p>
                  <p className="text-sm text-black">Premium Reviews</p>
                </div>

                {/* Statistic 4 */}
                <div className="text-center">
                  <p className="text-primary text-2xl font-bold">50+</p>
                  <p className="text-sm text-black">Product Categories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="max-w-6xl mx-auto px-4 py-16">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
              {/* Left Column - Text and Illustration */}
              <div className="w-full md:w-1/2 space-y-6">
                <div>
                  <p className="text-primary text-sm mb-2">Contact Us</p>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 text-black">
                    Get in Touch With
                    <br />
                    Our Team!
                  </h2>
                  <p className="text-black text-sm leading-relaxed">
                    Have questions about our platform or need assistance with
                    your account?
                    <br />
                    Want to discuss potential partnerships or advertising
                    opportunities?
                    <br />
                    Use the form below to reach out to us.
                  </p>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="w-full md:w-1/2">
                <div className="bg-white rounded-lg shadow-md p-6 border border-purple-200">
                  {/* Top border */}
                  <div className="flex h-1 mb-6">
                    <div className="w-full bg-primary"></div>
                  </div>

                  <form className="space-y-4">
                    {/* Name Input */}
                    <div>
                      <div className="flex items-center border border-purple-200 rounded-md px-3 py-2 focus-within:border-primary">
                        <span className="text-primary mr-2">👤</span>
                        <input
                          type="text"
                          placeholder="Your Name"
                          className="w-full outline-none text-sm text-black"
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div>
                      <div className="flex items-center border border-purple-200 rounded-md px-3 py-2 focus-within:border-primary">
                        <span className="text-primary mr-2">✉️</span>
                        <input
                          type="email"
                          placeholder="Your Email"
                          className="w-full outline-none text-sm text-black"
                        />
                      </div>
                    </div>

                    {/* Message Input */}
                    <div>
                      <div className="flex items-start border border-purple-200 rounded-md px-3 py-2 focus-within:border-primary">
                        <span className="text-primary mr-2 mt-1">💬</span>
                        <textarea
                          placeholder="Your Message"
                          rows={5}
                          className="w-full outline-none text-sm resize-none text-black"
                        ></textarea>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full bg-primary hover:bg-purple-600 text-white py-3 rounded-md flex items-center justify-center gap-2 transition-colors"
                    >
                      <span>Send Message</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
};

export default HowItWorksSection;