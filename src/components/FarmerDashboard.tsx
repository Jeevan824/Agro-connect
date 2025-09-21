import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IoTDashboard } from "./IoTDashboard";
import { apiService, MOCK_DATA } from "@/lib/api";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  MessageSquare, 
  Bell, 
  FileText, 
  Calendar, 
  MapPin, 
  Phone,
  Mail,
  User
} from "lucide-react";

// Component will fetch reports and messages using placeholder API endpoints

export function FarmerDashboard() {
  const [activeTab, setActiveTab] = useState("iot");
  const [reports, setReports] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setLoading(true);
        const [reportData, messageData] = await Promise.all([
          apiService.getReports(),
          apiService.getMessages()
        ]);
        
        // Transform reports data for farmer dashboard
        const formattedReports = reportData.map((report: any) => ({
          ...report,
          authority: "District Agricultural Officer",
          urgent: report.type === 'alert',
          content: report.content || "Content will be loaded from backend"
        }));
        
        // Transform messages data
        const formattedMessages = messageData.map((msg: any) => ({
          id: msg.id,
          from: msg.farmerName || "Agricultural Officer",
          role: "Official",
          message: msg.message || "Message content will be loaded from backend",
          time: "Recently",
          unread: msg.status === 'unread'
        }));
        
        setReports(formattedReports);
        setMessages(formattedMessages);
      } catch (error) {
        console.error('Failed to load farmer dashboard data:', error);
        // Use fallback mock data
        setReports([
          {
            id: 1,
            title: "Crop Advisory - Wheat Season",
            authority: "Agricultural Officer - Bangalore",
            date: "2024-01-15",
            type: "advisory",
            urgent: false,
            content: "Recommended fertilizer application for wheat crop during this season..."
          }
        ]);
        setMessages([
          {
            id: 1,
            from: "Dr. Rajesh Kumar",
            role: "Agricultural Scientist",
            message: "Your soil pH levels seem optimal. Continue with the current fertilizer schedule.",
            time: "2 hours ago",
            unread: true
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  const getTypeColor = (type: string, urgent: boolean) => {
    if (urgent) return "bg-destructive text-destructive-foreground";
    switch (type) {
      case 'advisory': return "bg-primary text-primary-foreground";
      case 'alert': return "bg-warning text-warning-foreground";
      case 'notification': return "bg-accent text-accent-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary-glow rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Farmer Dashboard</h1>
                <p className="text-sm text-muted-foreground">Welcome back, Ravi Kumar</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
              <Button variant="outline" size="sm">
                <Phone className="h-4 w-4 mr-2" />
                Emergency
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="iot" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              IoT Sensors
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Reports
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="iot">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">IoT Sensor Data</h2>
                <Badge variant="outline" className="text-success border-success">
                  All Systems Online
                </Badge>
              </div>
              <IoTDashboard />
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Reports & Advisories</h2>
                <Button variant="outline">
                  <Calendar className="h-4 w-4 mr-2" />
                  Filter by Date
                </Button>
              </div>
              
              <div className="grid gap-4">
                {reports.map((report) => (
                  <Card key={report.id} className="border-border/50 hover:border-primary/50 transition-colors">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-lg text-foreground mb-2">
                            {report.title}
                          </CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                            <span>From: {report.authority}</span>
                            <span>•</span>
                            <span>{report.date}</span>
                          </div>
                        </div>
                        <Badge className={getTypeColor(report.type, report.urgent)}>
                          {report.urgent ? 'URGENT' : report.type.toUpperCase()}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">
                        {report.content}
                      </p>
                      <Button variant="outline" size="sm">
                        Read Full Report
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Messages</h2>
                <Button>
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Message
                </Button>
              </div>

              <div className="grid gap-4">
                {messages.map((message) => (
                  <Card key={message.id} className={`border-border/50 ${message.unread ? 'bg-accent/5 border-accent/30' : ''}`}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-semibold text-foreground">{message.from}</h3>
                            <Badge variant="outline" className="text-xs">
                              {message.role}
                            </Badge>
                            {message.unread && (
                              <Badge className="bg-accent text-accent-foreground text-xs">
                                New
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground mb-2">{message.message}</p>
                          <p className="text-xs text-muted-foreground">{message.time}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Reply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Farmer Profile</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Ravi Kumar</p>
                        <p className="text-sm text-muted-foreground">Farmer ID: FR2024001</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">+91 98765 43210</p>
                        <p className="text-sm text-muted-foreground">Primary Contact</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">ravi.kumar@email.com</p>
                        <p className="text-sm text-muted-foreground">Email Address</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium text-foreground">Village: Kengeri, Karnataka</p>
                        <p className="text-sm text-muted-foreground">PIN: 560074</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="text-foreground">Farm Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground">Land Area: 5.2 Acres</p>
                      <p className="text-sm text-muted-foreground">Survey Number: 123/4A</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Primary Crop: Wheat</p>
                      <p className="text-sm text-muted-foreground">Secondary: Rice, Vegetables</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Irrigation: Drip System</p>
                      <p className="text-sm text-muted-foreground">Water Source: Borewell</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">IoT Sensors: 4 Active</p>
                      <p className="text-sm text-muted-foreground">Last Calibrated: Jan 10, 2024</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}