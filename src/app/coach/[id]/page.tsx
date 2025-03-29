"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MessageCircle, MapPin, Clock } from "lucide-react";

// Mock data for initial development
const coach = {
  id: 1,
  name: "John Smith",
  experience: "5 years",
  specialty: "Powerlifting",
  priceRange: "HIGH",
  location: "New York, NY",
  image: "https://via.placeholder.com/150",
  bio: "Experienced powerlifting coach specializing in strength development and competition preparation. Certified by the National Strength and Conditioning Association (NSCA).",
  certifications: [
    "NSCA Certified Strength and Conditioning Specialist",
    "USA Weightlifting Level 2 Coach",
    "CrossFit Level 3 Trainer",
  ],
  coachingStyle: [
    "Strength Development",
    "Competition Preparation",
    "Technique Optimization",
    "Nutrition Planning",
  ],
  availability: "FULL_TIME",
  testimonials: [
    {
      id: 1,
      author: "Alice Johnson",
      content: "John helped me increase my total by 50kg in 6 months!",
      rating: 5,
    },
    {
      id: 2,
      author: "Bob Wilson",
      content: "Great coach, very knowledgeable and supportive.",
      rating: 5,
    },
  ],
};

export default function CoachProfile() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column - Profile Info */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-start gap-6">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <img
                    src={coach.image}
                    alt={coach.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div>
                  <CardTitle className="text-2xl mb-2">{coach.name}</CardTitle>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <Badge variant="secondary">{coach.specialty}</Badge>
                    <Badge variant="outline">{coach.experience}</Badge>
                    <Badge variant="outline">{coach.priceRange}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {coach.location}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {coach.availability}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <Button
                  variant={activeTab === "about" ? "default" : "outline"}
                  onClick={() => setActiveTab("about")}
                >
                  About
                </Button>
                <Button
                  variant={activeTab === "testimonials" ? "default" : "outline"}
                  onClick={() => setActiveTab("testimonials")}
                >
                  Testimonials
                </Button>
              </div>

              {activeTab === "about" ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Bio</h3>
                    <p className="text-gray-600">{coach.bio}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Certifications
                    </h3>
                    <ul className="list-disc list-inside text-gray-600">
                      {coach.certifications.map((cert) => (
                        <li key={cert}>{cert}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Coaching Style
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {coach.coachingStyle.map((style) => (
                        <Badge key={style} variant="secondary">
                          {style}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {coach.testimonials.map((testimonial) => (
                    <Card key={testimonial.id}>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-2 mb-2">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star
                              key={i}
                              className="w-4 h-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>
                        <p className="text-gray-600 mb-2">
                          {testimonial.content}
                        </p>
                        <p className="text-sm font-medium">
                          {testimonial.author}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Contact Card */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Contact Coach</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Button className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="w-full">
                  Schedule Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
