import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Send, 
  Users, 
  FileText, 
  Bell, 
  Upload,
  Shield,
  BarChart3,
  MessageSquare,
  AlertTriangle
} from "lucide-react";

// Mock data
const farmerStats = {
  totalFarmers: 1247,
  activeFarmers: 1089,
  newRegistrations: 23,
  alertsSent: 156
};

const recentReports = [
  {
    id: 1,
    title: "Weekly Crop Advisory",
    sentTo: 1089,
    date: "2024-01-15",
    status: "delivered",
    readRate: "87%"
  },
  {
    id: 2,
    title: "Weather Alert - Rain Warning",
    sentTo: 1247,
    date: "2024-01-14",
    status: "delivered",
    readRate: "95%"
  }
];

export function AuthorityDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const [newReport, setNewReport] = useState({
    title: "",
    content: "",
    type: "advisory",
    urgent: false
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Authority Dashboard</h1>
                <p className="text-sm text-muted-foreground">Agricultural Officer - Bangalore District</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm">
                <Bell className="h-4 w-4 mr-2" />
                Emergency Alerts
              </Button>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Quick Broadcast
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="create" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Create Report
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="farmers" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Farmers
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Total Farmers</p>
                        <p className="text-2xl font-bold text-foreground">{farmerStats.totalFarmers}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                        <Users className="h-6 w-6 text-success" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Active Today</p>
                        <p className="text-2xl font-bold text-foreground">{farmerStats.activeFarmers}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <FileText className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">New Registrations</p>
                        <p className="text-2xl font-bold text-foreground">{farmerStats.newRegistrations}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                        <Bell className="h-6 w-6 text-warning" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Alerts Sent</p>
                        <p className="text-2xl font-bold text-foreground">{farmerStats.alertsSent}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Reports */}
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Recent Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{report.title}</h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                            <span>Sent to {report.sentTo} farmers</span>
                            <span>•</span>
                            <span>{report.date}</span>
                            <span>•</span>
                            <span>Read rate: {report.readRate}</span>
                          </div>
                        </div>
                        <Badge className="bg-success text-success-foreground">
                          {report.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="create">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Create New Report</h2>
              
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-foreground">Report Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Report Title
                    </label>
                    <Input 
                      placeholder="Enter report title..."
                      value={newReport.title}
                      onChange={(e) => setNewReport({...newReport, title: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Report Type
                    </label>
                    <div className="flex gap-2">
                      <Button 
                        variant={newReport.type === 'advisory' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewReport({...newReport, type: 'advisory'})}
                      >
                        Advisory
                      </Button>
                      <Button 
                        variant={newReport.type === 'alert' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewReport({...newReport, type: 'alert'})}
                      >
                        Alert
                      </Button>
                      <Button 
                        variant={newReport.type === 'notification' ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setNewReport({...newReport, type: 'notification'})}
                      >
                        Notification
                      </Button>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Content
                    </label>
                    <Textarea 
                      placeholder="Enter report content..."
                      rows={6}
                      value={newReport.content}
                      onChange={(e) => setNewReport({...newReport, content: e.target.value})}
                      className="bg-background border-border"
                    />
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox" 
                        id="urgent"
                        checked={newReport.urgent}
                        onChange={(e) => setNewReport({...newReport, urgent: e.target.checked})}
                        className="rounded border-border"
                      />
                      <label htmlFor="urgent" className="text-sm text-foreground flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-warning" />
                        Mark as Urgent
                      </label>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-border">
                    <Button variant="outline">
                      <Upload className="h-4 w-4 mr-2" />
                      Attach Files
                    </Button>
                    <Button>
                      <Send className="h-4 w-4 mr-2" />
                      Send to All Farmers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="messages">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Farmer Messages</h2>
              
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No new messages</h3>
                    <p className="text-muted-foreground">
                      When farmers send you queries, they will appear here.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="farmers">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Registered Farmers</h2>
              
              <Card className="border-border/50">
                <CardContent className="p-6">
                  <div className="text-center py-12">
                    <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">Farmer Directory</h3>
                    <p className="text-muted-foreground">
                      View and manage registered farmers in your district.
                    </p>
                    <Button className="mt-4">
                      View All Farmers
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}