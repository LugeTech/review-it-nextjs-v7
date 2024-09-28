'use client'

import React, { useEffect, useRef } from 'react'
import { Star, Shield, TrendingUp, Users, MessageSquare, Award, LucideIcon } from 'lucide-react'

interface Benefit {
  icon: React.ReactElement<LucideIcon>;
  title: string;
  description: string;
}

const BenefitsSection: React.FC = () => {
  const benefits: Benefit[] = [
    {
      icon: <Star className="h-6 w-6 text-white" />,
      title: "Authentic Reviews",
      description: "Real feedback from verified customers to help you make informed decisions."
    },
    {
      icon: <Shield className="h-6 w-6 text-white" />,
      title: "Trust & Transparency",
      description: "We ensure all reviews are genuine, fostering a trustworthy environment."
    },
    {
      icon: <TrendingUp className="h-6 w-6 text-white" />,
      title: "Boost Your Business",
      description: "Leverage positive reviews to attract more customers and grow your brand."
    },
    {
      icon: <Users className="h-6 w-6 text-white" />,
      title: "Community Insights",
      description: "Gain valuable insights from a diverse community of consumers."
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-white" />,
      title: "Engage with Customers",
      description: "Respond to reviews and build stronger relationships with your audience."
    },
    {
      icon: <Award className="h-6 w-6 text-white" />,
      title: "Showcase Excellence",
      description: "Display your ratings and reviews to highlight your product or service quality."
    }
  ]

  const sectionRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
          }
        })
      },
      { threshold: 0.1 }
    )

    const benefitElements = sectionRef.current?.querySelectorAll('.benefit-card')
    benefitElements?.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="w-full py-6 md:py-12 lg:py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <h2 className="text-4xl font-bold tracking-tight sm:text-5xl text-center mb-4 text-gray-900">
          Why Choose Reviewit?
        </h2>
        <p className="text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover how Reviewit can transform your business and customer relationships
        </p>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="benefit-card opacity-0 translate-y-4 bg-white rounded-lg shadow-md p-6 transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1"
            >
              <div className="rounded-full bg-blue-600 p-3 mb-4 inline-block">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BenefitsSection
