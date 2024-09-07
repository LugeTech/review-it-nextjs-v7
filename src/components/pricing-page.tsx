"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckIcon, HelpCircleIcon } from "lucide-react"

export function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "For individuals and small teams just getting started.",
      features: ["5 reviews per month", "Basic analytics", "Email support"],
    },
    {
      name: "Lite",
      price: "$29",
      description: "For growing businesses looking to expand their online presence.",
      features: ["50 reviews per month", "Advanced analytics", "Priority email support", "Custom branding"],
    },
    {
      name: "Pro",
      price: "$99",
      description: "For established businesses requiring comprehensive solutions.",
      features: [
        "Unlimited reviews",
        "Real-time analytics",
        "24/7 phone & email support",
        "API access",
        "Advanced integrations",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "Tailored solutions for large-scale organizations.",
      features: [
        "All Pro features",
        "Dedicated account manager",
        "Custom API solutions",
        "On-site training",
        "Service level agreement (SLA)",
      ],
    },
  ]

  const allFeatures = [
    "Reviews per month",
    "Analytics",
    "Support",
    "Custom branding",
    "API access",
    "Integrations",
    "Dedicated account manager",
    "Custom API solutions",
    "On-site training",
    "Service level agreement (SLA)",
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-4">The right plan for your business</h1>
      <p className="text-xl text-center text-gray-500 mb-12 dark:text-gray-400">
        Choose the perfect plan to elevate your online reputation
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {plans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-4xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500 mr-2" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full text-white bg-myTheme-accent">{plan.name === "Enterprise" ? "Contact Sales" : "Get Started"}</Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">Compare Plans</h2>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="p-2 md:p-4 text-left text-sm md:text-base">Feature</th>
              {plans.map((plan) => (
                <th key={plan.name} className="p-2 md:p-4 text-center text-sm md:text-base">
                  {plan.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {allFeatures.map((feature, index) => (
              <tr key={feature} className={index % 2 === 0 ? "bg-white dark:bg-gray-950" : "bg-gray-100/50 dark:bg-gray-800/50"}>
                <td className="p-2 md:p-4 flex items-center text-sm md:text-base">
                  {feature}
                  <HelpCircleIcon className="h-4 w-4 text-gray-500 ml-2 dark:text-gray-400" />
                </td>
                {plans.map((plan) => (
                  <td key={`${plan.name}-${feature}`} className="p-2 md:p-4 text-center text-sm md:text-base">
                    {plan.features.includes(feature) || plan.name === "Enterprise" ? (
                      <CheckIcon className="h-5 w-5 text-green-500 mx-auto" />
                    ) : (
                      "-"
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
