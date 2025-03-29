"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";

export default function ProfileSetup() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    bio: "",
    experience: "",
    certifications: [] as string[],
    coachingStyle: [] as string[],
    priceRange: "",
    availability: "",
    location: "",
  });
  const [newCertification, setNewCertification] = useState("");
  const [newStyle, setNewStyle] = useState("");

  const handleAddCertification = () => {
    if (
      newCertification &&
      !profile.certifications.includes(newCertification)
    ) {
      setProfile({
        ...profile,
        certifications: [...profile.certifications, newCertification],
      });
      setNewCertification("");
    }
  };

  const handleRemoveCertification = (cert: string) => {
    setProfile({
      ...profile,
      certifications: profile.certifications.filter((c) => c !== cert),
    });
  };

  const handleAddStyle = () => {
    if (newStyle && !profile.coachingStyle.includes(newStyle)) {
      setProfile({
        ...profile,
        coachingStyle: [...profile.coachingStyle, newStyle],
      });
      setNewStyle("");
    }
  };

  const handleRemoveStyle = (style: string) => {
    setProfile({
      ...profile,
      coachingStyle: profile.coachingStyle.filter((s) => s !== style),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement profile update logic
    console.log("Profile data:", profile);
  };

  if (!session) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Please sign in to continue</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Coach Profile Setup</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4">
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={profile.bio}
                  onChange={(e) =>
                    setProfile({ ...profile, bio: e.target.value })
                  }
                  placeholder="Tell us about your coaching experience and philosophy..."
                  className="min-h-[100px]"
                />
              </div>

              <div>
                <Label htmlFor="experience">Experience</Label>
                <Input
                  id="experience"
                  value={profile.experience}
                  onChange={(e) =>
                    setProfile({ ...profile, experience: e.target.value })
                  }
                  placeholder="e.g., 5 years of coaching experience"
                />
              </div>

              <div>
                <Label htmlFor="certifications">Certifications</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="certifications"
                    value={newCertification}
                    onChange={(e) => setNewCertification(e.target.value)}
                    placeholder="Add a certification"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddCertification}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.certifications.map((cert) => (
                    <Badge key={cert} variant="secondary">
                      {cert}
                      <button
                        type="button"
                        onClick={() => handleRemoveCertification(cert)}
                        className="ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="coachingStyle">Coaching Style</Label>
                <div className="flex gap-2 mb-2">
                  <Input
                    id="coachingStyle"
                    value={newStyle}
                    onChange={(e) => setNewStyle(e.target.value)}
                    placeholder="Add a coaching style"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleAddStyle}
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {profile.coachingStyle.map((style) => (
                    <Badge key={style} variant="secondary">
                      {style}
                      <button
                        type="button"
                        onClick={() => handleRemoveStyle(style)}
                        className="ml-1"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="priceRange">Price Range</Label>
                <Select
                  value={profile.priceRange}
                  onValueChange={(value) =>
                    setProfile({ ...profile, priceRange: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select price range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Low</SelectItem>
                    <SelectItem value="MEDIUM">Medium</SelectItem>
                    <SelectItem value="HIGH">High</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="availability">Availability</Label>
                <Select
                  value={profile.availability}
                  onValueChange={(value) =>
                    setProfile({ ...profile, availability: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FULL_TIME">Full Time</SelectItem>
                    <SelectItem value="PART_TIME">Part Time</SelectItem>
                    <SelectItem value="LIMITED">Limited</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  value={profile.location}
                  onChange={(e) =>
                    setProfile({ ...profile, location: e.target.value })
                  }
                  placeholder="e.g., New York, NY"
                />
              </div>
            </div>

            <Button type="submit" className="w-full">
              Save Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
