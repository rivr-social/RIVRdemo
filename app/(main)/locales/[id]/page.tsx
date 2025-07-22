// app/(main)/locales/[id]/page.tsx
"use client"
import { useParams } from "next/navigation"
import { chapters as locales, basins } from "@/lib/mock-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MapPin, Users, Calendar, Star, Globe, Heart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LocalePage() {
  const params = useParams();
  const locale = locales.find(l => l.id === params.id);
  const basin = locale ? basins.find(b => b.id === locale.basinId) : null;

  if (!locale) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-2">Locale not found</h1>
          <p className="text-muted-foreground mb-4">The locale you're looking for doesn't exist.</p>
          <Link href="/locales">
            <Button>Browse All Locales</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (locale.isCommons) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          {locale.image && (
            <div className="h-48 rounded-lg overflow-hidden mb-4">
              <Image
                src={locale.image}
                alt={locale.name}
                width={800}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-3xl font-bold">{locale.name}</h1>
                <Star className="h-6 w-6 text-yellow-400 fill-yellow-400" />
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {locale.location}
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {locale.memberCount} members
                </div>
                <div className="flex items-center gap-1">
                  <Globe className="h-4 w-4" />
                  {basin?.name}
                </div>
              </div>
            </div>
            <Button>
              <Heart className="h-4 w-4 mr-2" />
              Join Commons
            </Button>
          </div>
        </div>

        <Tabs defaultValue="about" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="governance">Governance</TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="treasury">Treasury</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>About {locale.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{locale.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Location</h4>
                    <p className="text-sm text-muted-foreground">{locale.location}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">River Basin</h4>
                    <p className="text-sm text-muted-foreground">{basin?.name}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Members</h4>
                    <p className="text-sm text-muted-foreground">{locale.memberCount} active members</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Status</h4>
                    <p className="text-sm text-muted-foreground">Active Commons</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="governance">
            <Card>
              <CardHeader>
                <CardTitle>Governance Structure</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Decision Making</h4>
                    <p className="text-sm text-muted-foreground">
                      {locale.name} operates on a consensus-based decision making model with 70% voting thresholds.
                      Members can delegate their votes or participate directly in governance decisions.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Board Members</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 rounded-lg border">
                        <Avatar>
                          <AvatarImage src="/cameron-profile.png" />
                          <AvatarFallback>CM</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">Cameron Murdock</p>
                          <p className="text-sm text-muted-foreground">Chair</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Community Members</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Member directory and community connections will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Community Projects</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Active and completed community projects will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="treasury">
            <Card>
              <CardHeader>
                <CardTitle>Commons Treasury</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Financial information and budget transparency will be displayed here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        {locale.image && (
          <div className="h-48 rounded-lg overflow-hidden mb-4">
            <Image
              src={locale.image}
              alt={locale.name}
              width={800}
              height={300}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">{locale.name}</h1>
            <div className="flex items-center gap-4 text-muted-foreground">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {locale.location}
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                {locale.memberCount} members
              </div>
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                {basin?.name}
              </div>
            </div>
          </div>
          <Button>
            <Heart className="h-4 w-4 mr-2" />
            Join Locale
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>About {locale.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">{locale.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Location</h4>
              <p className="text-sm text-muted-foreground">{locale.location}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">River Basin</h4>
              <p className="text-sm text-muted-foreground">{basin?.name}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Members</h4>
              <p className="text-sm text-muted-foreground">{locale.memberCount} community members</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Status</h4>
              <p className="text-sm text-muted-foreground">Standard Locale</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-muted">
            <h4 className="font-semibold mb-2">Ready to Activate?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              This locale can be activated as a Commons when the community is ready to establish cooperative governance and shared resources.
            </p>
            <Button variant="outline">
              Learn About Becoming a Commons
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}