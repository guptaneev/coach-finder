"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { FilterDialog } from "@/components/filter-dialog";
import Link from "next/link";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    specialty: "",
    experience: "",
    priceRange: "",
    location: "",
  });

  // Mock data for initial development
  const coaches = [
    {
      id: 1,
      name: "John Smith",
      experience: "5 years",
      specialty: "Powerlifting",
      priceRange: "HIGH",
      location: "New York, NY",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      experience: "3 years",
      specialty: "Strength",
      priceRange: "MEDIUM",
      location: "Los Angeles, CA",
      image: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      name: "Mike Wilson",
      experience: "8 years",
      specialty: "Hybrid",
      priceRange: "LOW",
      location: "Chicago, IL",
      image: "https://via.placeholder.com/150",
    },
  ];

  const filteredCoaches = coaches.filter((coach) => {
    const matchesSearch = coach.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesSpecialty =
      !filters.specialty ||
      coach.specialty.toLowerCase() === filters.specialty.toLowerCase();
    const matchesPriceRange =
      !filters.priceRange || coach.priceRange === filters.priceRange;
    return matchesSearch && matchesSpecialty && matchesPriceRange;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">Find Your Perfect Coach</h1>
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search coaches..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <FilterDialog onApplyFilters={setFilters} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCoaches.map((coach) => (
          <motion.div
            key={coach.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="overflow-hidden">
              <div className="aspect-square relative">
                <img
                  src={coach.image}
                  alt={coach.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{coach.name}</h2>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary">{coach.specialty}</Badge>
                  <Badge variant="outline">{coach.experience}</Badge>
                  <Badge variant="outline">{coach.priceRange}</Badge>
                </div>
                <p className="text-sm text-gray-600">{coach.location}</p>
                <Link href={`/coach/${coach.id}`}>
                  <Button className="w-full mt-4">View Profile</Button>
                </Link>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
