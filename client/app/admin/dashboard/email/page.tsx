"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Send,
  FileText,
  History,
  Plus,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const emailTemplates = [
  {
    id: 1,
    name: "Welcome",
    subject: "Welcome to our waitlist!",
    body:
      "Hi there,\n\nThank you for joining our waitlist. We're excited to have you on board!\n\nBest regards,\nThe Team",
  },
  {
    id: 2,
    name: "Product Update",
    subject: "Exciting updates coming soon!",
    body:
      "Hello,\n\nWe wanted to share some exciting updates about our product launch.\n\nStay tuned!\nThe Team",
  },
];

const sentEmails = [
  {
    id: 1,
    subject: "Welcome to the waitlist",
    content:
      "Hi there,\n\nThank you for joining our waitlist. We're excited to have you on board! We'll keep you updated on our progress and notify you as soon as we launch.\n\nBest regards,\nThe Team",
    sentAt: "2024-03-10",
    recipients: 150,
    openRate: "65%",
  },
  {
    id: 2,
    subject: "Product launch update",
    content:
      "Hello everyone,\n\nWe're making great progress on our product and wanted to share some exciting updates about the upcoming launch. We've been working hard to ensure everything is perfect for you.\n\nStay tuned for more updates!\n\nBest regards,\nThe Team",
    sentAt: "2024-03-08",
    recipients: 145,
    openRate: "72%",
  },
];

const fromEmails = [
  { value: "team", label: "The Team <theteam@example.com>" },
  { value: "updates", label: "Product Updates <updates@example.com>" },
  { value: "noreply", label: "No Reply <noreply@example.com>" },
];

export default function EmailPage() {
  const [activeTab, setActiveTab] = useState("compose");
  const [emailContent, setEmailContent] = useState({ subject: "", body: "" });
  const [isSending, setIsSending] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [fromEmail, setFromEmail] = useState("team");
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    body: "",
  });
  const [isAddingTemplate, setIsAddingTemplate] = useState(false);

  // History dialog state
  const [isHistoryDialogOpen, setIsHistoryDialogOpen] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<typeof sentEmails[0] | null>(
    null
  );

  const handleSendEmail = async () => {
    setIsSending(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success("Emails sent successfully!");
      setEmailContent({ subject: "", body: "" });
      setSelectedTemplate(null);
    } catch {
      toast.error("Failed to send emails. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const loadTemplate = (templateId: number) => {
    const template = emailTemplates.find((t) => t.id === templateId);
    if (template) {
      setEmailContent({ subject: template.subject, body: template.body });
      setSelectedTemplate(templateId);
    }
  };

  const handleDeleteTemplate = (templateId: number) => {
    toast.success("Template deleted successfully!");
    if (selectedTemplate === templateId) {
      setSelectedTemplate(null);
      setEmailContent({ subject: "", body: "" });
    }
  };

  const handleSaveNewTemplate = () => {
    if (!newTemplate.name || !newTemplate.subject || !newTemplate.body) {
      toast.error("Please fill in all template fields");
      return;
    }
    toast.success("Template saved successfully!");
    setNewTemplate({ name: "", subject: "", body: "" });
    setIsAddingTemplate(false);
  };

  const openHistoryDialog = (emailId: number) => {
    const email = sentEmails.find((e) => e.id === emailId) || null;
    setSelectedEmail(email);
    setIsHistoryDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="compose" className="flex items-center">
            <FileText className="h-4 w-4 mr-2" />
            Compose
          </TabsTrigger>
          <TabsTrigger value="templates" className="flex items-center">
            <Plus className="h-4 w-4 mr-2" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center">
            <History className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
        </TabsList>

        {/* Compose Tab */}
        <TabsContent value="compose">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50">
            <CardHeader>
              <CardTitle>Compose Email</CardTitle>
              <CardDescription>
                Send an email to all active subscribers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* From & Subject */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">From</label>
                  <Select value={fromEmail} onValueChange={setFromEmail}>
                    <SelectTrigger className="bg-secondary/50 border-0">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {fromEmails.map((email) => (
                        <SelectItem key={email.value} value={email.value}>
                          {email.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <Input
                  placeholder="Email subject"
                  value={emailContent.subject}
                  onChange={(e) =>
                    setEmailContent((prev) => ({
                      ...prev,
                      subject: e.target.value,
                    }))
                  }
                  className="bg-secondary/50 border-0"
                />
              </div>

              {/* Body */}
              <textarea
                placeholder="Email content... (Markdown supported)"
                value={emailContent.body}
                onChange={(e) =>
                  setEmailContent((prev) => ({
                    ...prev,
                    body: e.target.value,
                  }))
                }
                className="w-full h-64 p-4 rounded-lg bg-secondary/50 border-0 focus:ring-2 focus:ring-ring focus:outline-none font-mono text-sm"
              />

              {/* Send Button */}
              <div className="flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Will be sent to 150 subscribers
                </p>
                <Button
                  onClick={handleSendEmail}
                  disabled={
                    isSending || !emailContent.subject || !emailContent.body
                  }
                  className="flex items-center"
                >
                  {isSending ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-t-transparent mr-2" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Email
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {emailTemplates.map((template) => (
              <Card
                key={template.id}
                className={`bg-card/50 backdrop-blur-xl border-border/50 transition-colors hover:bg-card/70 ${
                  selectedTemplate === template.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                      <CardDescription>{template.subject}</CardDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteTemplate(template.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {template.body}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full"
                    onClick={() => loadTemplate(template.id)}
                  >
                    Use Template
                  </Button>
                </CardFooter>
              </Card>
            ))}

            {/* Add New Template */}
            <Card
              onClick={() => setIsAddingTemplate(true)}
              className="bg-card/50 backdrop-blur-xl border-border/50 border-dashed cursor-pointer hover:bg-card/70 flex flex-col items-center justify-center h-40"
            >
              <Plus className="h-8 w-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">Add New Template</span>
            </Card>

            {/* New Template Dialog */}
            <Dialog open={isAddingTemplate} onOpenChange={setIsAddingTemplate}>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>New Email Template</DialogTitle>
                  <DialogDescription>
                    Create a new email template for your campaigns
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Template Name</label>
                    <Input
                      placeholder="e.g., Welcome Email"
                      value={newTemplate.name}
                      onChange={(e) =>
                        setNewTemplate((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Subject Line</label>
                    <Input
                      placeholder="Email subject"
                      value={newTemplate.subject}
                      onChange={(e) =>
                        setNewTemplate((prev) => ({
                          ...prev,
                          subject: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email Content</label>
                    <textarea
                      placeholder="Write your email content here..."
                      value={newTemplate.body}
                      onChange={(e) =>
                        setNewTemplate((prev) => ({
                          ...prev,
                          body: e.target.value,
                        }))
                      }
                      className="w-full h-48 p-3 rounded-md border bg-background resize-none focus:ring-2 focus:ring-ring focus:outline-none"
                    />
                    <p className="text-xs text-muted-foreground">
                      You can use markdown formatting and variables like {"{{name}}"}
                    </p>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingTemplate(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveNewTemplate}>Save Template</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history">
          <Card className="bg-card/50 backdrop-blur-xl border-border/50">
            <CardContent className="pt-6">
              <div className="rounded-lg overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border/40">
                      <th className="text-left p-4 text-muted-foreground font-medium">
                        Subject
                      </th>
                      <th className="text-left p-4 text-muted-foreground font-medium">
                        Sent Date
                      </th>
                      <th className="text-left p-4 text-muted-foreground font-medium">
                        Recipients
                      </th>
                      <th className="text-left p-4 text-muted-foreground font-medium">
                        Open Rate
                      </th>
                      <th className="text-left p-4 text-muted-foreground font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sentEmails.map((email) => (
                      <tr key={email.id} className="border-b border-border/40">
                        <td className="p-4 max-w-[300px] truncate">{email.subject}</td>
                        <td className="p-4">{email.sentAt}</td>
                        <td className="p-4">{email.recipients}</td>
                        <td className="p-4">
                          <Badge className="bg-green-500/20 text-green-500">
                            {email.openRate}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openHistoryDialog(email.id)}
                          >
                            View Content
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* History Content Dialog */}
          <Dialog
            open={isHistoryDialogOpen}
            onOpenChange={setIsHistoryDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{selectedEmail?.subject}</DialogTitle>
                <DialogDescription>
                  Sent on {selectedEmail?.sentAt} to {selectedEmail?.recipients}{" "}
                  recipients
                </DialogDescription>
              </DialogHeader>
              <div className="whitespace-pre-wrap py-4">
                {selectedEmail?.content}
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setIsHistoryDialogOpen(false)}>
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
}