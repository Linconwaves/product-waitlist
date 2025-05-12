"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Twitter,
  Instagram,
  Github,
  Linkedin,
  Globe,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const defaultSettings = {
  productName: "Revolutionary Product",
  domain: {
    website: "example.com",
    emailDomain: "example.com",
    fromName: "The Team",
    fromEmails: ["team@example.com"],
    replyTo: "no-reply@example.com",
  },
  hero: {
    title: {
      line1: "Something",
      line2: "extraordinary",
      line3: "is coming.",
    },
    subtitle:
      "Be among the first to experience our revolutionary product. Join thousands already on the waitlist.",
    ctaButton: "Notify me",
    unsubscribeText: "You can unsubscribe at any time.",
    waitlistCount: "100+",
  },
  emailTemplates: {
    welcome: {
      subject: "Welcome to the Product Waitlist!",
      body: `Hi {{name}},

Thank you for joining the Product Waitlist! We're excited to have you on board.

We'll keep you updated on our progress and let you know as soon as we launch.

Best regards,
The Revolutionary Product Team`,
    },
    unsubscribe: {
      subject: "Sorry to see you go - Revolutionary Product",
      body: `Hi {{name}},

We're sorry to see you go. You have been successfully unsubscribed from the Product Waitlist.

If you change your mind, you can always join again through our website.

Best regards,
The Revolutionary Product Team`,
    },
  },
  socialLinks: {
    twitter: "https://twitter.com",
    instagram: "https://instagram.com",
    github: "https://github.com",
    linkedin: "https://linkedin.com",
  },
  launchDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0],
};

export default function SettingsPage() {
  const [isSaving, setIsSaving] = useState(false);
  const [settings, setSettings] = useState(defaultSettings);

  const handleSaveSettings = async () => {
    setIsSaving(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("site_settings", JSON.stringify(settings));
      toast.success("Settings saved successfully!");
    } catch (error) {
      toast.error("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="general">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="domain">Domain & Email</TabsTrigger>
          <TabsTrigger value="hero">Hero Section</TabsTrigger>
          <TabsTrigger value="templates">Email Templates</TabsTrigger>
          <TabsTrigger value="social">Social Links</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50">
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Basic settings for your waitlist page</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Product Name</label>
                <Input
                  value={settings.productName}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      productName: e.target.value,
                    }))
                  }
                  className="bg-secondary/50 border-0"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Launch Date</label>
                <Input
                  type="date"
                  value={settings.launchDate}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      launchDate: e.target.value,
                    }))
                  }
                  className="bg-secondary/50 border-0"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="domain">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50">
            <CardHeader>
              <CardTitle>Domain & Email Settings</CardTitle>
              <CardDescription>Configure your domain and email settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Website Domain</label>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={settings.domain.website}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          domain: { ...prev.domain, website: e.target.value },
                        }))
                      }
                      className="bg-secondary/50 border-0"
                      placeholder="example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email Domain</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <Input
                      value={settings.domain.emailDomain}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          domain: { ...prev.domain, emailDomain: e.target.value },
                        }))
                      }
                      className="bg-secondary/50 border-0"
                      placeholder="example.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">From Name</label>
                  <Input
                    value={settings.domain.fromName}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        domain: { ...prev.domain, fromName: e.target.value },
                      }))
                    }
                    className="bg-secondary/50 border-0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">From Email Addresses</label>
                  {settings.domain.fromEmails.map((email, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <Input
                        value={email}
                        onChange={(e) => {
                          const newList = [...settings.domain.fromEmails];
                          newList[idx] = e.target.value;
                          setSettings((prev) => ({
                            ...prev,
                            domain: { ...prev.domain, fromEmails: newList },
                          }));
                        }}
                        className="bg-secondary/50 border-0 flex-1"
                        placeholder="team@example.com"
                      />
                      {settings.domain.fromEmails.length > 1 && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            const newList = settings.domain.fromEmails.filter(
                              (_, i) => i !== idx
                            );
                            setSettings((prev) => ({
                              ...prev,
                              domain: { ...prev.domain, fromEmails: newList },
                            }));
                          }}
                        >
                          Remove
                        </Button>
                      )}
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      setSettings((prev) => ({
                        ...prev,
                        domain: {
                          ...prev.domain,
                          fromEmails: [...prev.domain.fromEmails, ""],
                        },
                      }))
                    }
                  >
                    Add another From Email
                  </Button>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Reply-To Email</label>
                  <Input
                    value={settings.domain.replyTo}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        domain: { ...prev.domain, replyTo: e.target.value },
                      }))
                    }
                    className="bg-secondary/50 border-0"
                    placeholder="no-reply@example.com"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hero">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50">
            <CardHeader>
              <CardTitle>Hero Section</CardTitle>
              <CardDescription>
                Customize your landing page hero section
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium block mb-2">Title Lines</label>
                  <div className="space-y-2">
                    <Input
                      placeholder="First line"
                      value={settings.hero.title.line1}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            title: { ...prev.hero.title, line1: e.target.value },
                          },
                        }))
                      }
                      className="bg-secondary/50 border-0"
                    />
                    <Input
                      placeholder="Second line (highlighted)"
                      value={settings.hero.title.line2}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            title: { ...prev.hero.title, line2: e.target.value },
                          },
                        }))
                      }
                      className="bg-secondary/50 border-0"
                    />
                    <Input
                      placeholder="Third line"
                      value={settings.hero.title.line3}
                      onChange={(e) =>
                        setSettings((prev) => ({
                          ...prev,
                          hero: {
                            ...prev.hero,
                            title: { ...prev.hero.title, line3: e.target.value },
                          },
                        }))
                      }
                      className="bg-secondary/50 border-0"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subtitle</label>
                  <Textarea
                    value={settings.hero.subtitle}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, subtitle: e.target.value },
                      }))
                    }
                    className="bg-secondary/50 border-0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">CTA Button Text</label>
                  <Input
                    value={settings.hero.ctaButton}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, ctaButton: e.target.value },
                      }))
                    }
                    className="bg-secondary/50 border-0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Unsubscribe Text</label>
                  <Input
                    value={settings.hero.unsubscribeText}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, unsubscribeText: e.target.value },
                      }))
                    }
                    className="bg-secondary/50 border-0"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Waitlist Count Display</label>
                  <Input
                    value={settings.hero.waitlistCount}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        hero: { ...prev.hero, waitlistCount: e.target.value },
                      }))
                    }
                    className="bg-secondary/50 border-0"
                  />
                  <p className="text-sm text-muted-foreground">
                    Example: "100+" or "1,000+" people on the waitlist
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50">
            <CardHeader>
              <CardTitle>Email Templates</CardTitle>
              <CardDescription>
                Customize your email templates. Use {'{{name}}'} as a variable.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Welcome Email</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        value={settings.emailTemplates.welcome.subject}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            emailTemplates: {
                              ...prev.emailTemplates,
                              welcome: {
                                ...prev.emailTemplates.welcome,
                                subject: e.target.value,
                              },
                            },
                          }))
                        }
                        className="bg-secondary/50 border-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Body</label>
                      <Textarea
                        value={settings.emailTemplates.welcome.body}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            emailTemplates: {
                              ...prev.emailTemplates,
                              welcome: {
                                ...prev.emailTemplates.welcome,
                                body: e.target.value,
                              },
                            },
                          }))
                        }
                        className="bg-secondary/50 border-0 min-h-[200px] font-mono"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Unsubscribe Email</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <Input
                        value={settings.emailTemplates.unsubscribe.subject}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            emailTemplates: {
                              ...prev.emailTemplates,
                              unsubscribe: {
                                ...prev.emailTemplates.unsubscribe,
                                subject: e.target.value,
                              },
                            },
                          }))
                        }
                        className="bg-secondary/50 border-0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email Body</label>
                      <Textarea
                        value={settings.emailTemplates.unsubscribe.body}
                        onChange={(e) =>
                          setSettings((prev) => ({
                            ...prev,
                            emailTemplates: {
                              ...prev.emailTemplates,
                              unsubscribe: {
                                ...prev.emailTemplates.unsubscribe,
                                body: e.target.value,
                              },
                            },
                          }))
                        }
                        className="bg-secondary/50 border-0 min-h-[200px] font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50">
            <CardHeader>
              <CardTitle>Social Links</CardTitle>
              <CardDescription>Configure your social media links</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Twitter className="h-4 w-4" />
                    <span className="text-sm">Twitter</span>
                  </div>
                  <Input
                    value={settings.socialLinks.twitter}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, twitter: e.target.value },
                      }))
                    }
                    className="bg-secondary/50 border-0"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Instagram className="h-4 w-4" />
                    <span className="text-sm">Instagram</span>
                  </div>
                  <Input
                    value={settings.socialLinks.instagram}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, instagram: e.target.value },
                      }))
                    }
                    className="bg-secondary/50 border-0"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Github className="h-4 w-4" />
                    <span className="text-sm">GitHub</span>
                  </div>
                  <Input
                    value={settings.socialLinks.github}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, github: e.target.value },
                      }))
                    }
                    className="bg-secondary/50 border-0"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Linkedin className="h-4 w-4" />
                    <span className="text-sm">LinkedIn</span>
                  </div>
                  <Input
                    value={settings.socialLinks.linkedin}
                    onChange={(e) =>
                      setSettings((prev) => ({
                        ...prev,
                        socialLinks: { ...prev.socialLinks, linkedin: e.target.value },
                      }))
                    }
                    className="bg-secondary/50 border-0"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Button onClick={handleSaveSettings} className="w-full" disabled={isSaving}>
        {isSaving ? (
          <>
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent mr-2" />
            Saving...
          </>
        ) : (
          "Save Settings"
        )}
      </Button>
    </div>
  );
}