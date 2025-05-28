import React, { useState } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { TaskCard } from "@/components/shared/TaskCard";
import { ExpandableTaskCard } from "@/components/shared/ExpandableTaskCard";
import { CheckSquare, FileText, Users, Calendar, Clock, MessageSquare, Send, Sparkles, AlertCircle, TrendingUp, Activity, CirclePlay, CircleDot, Settings } from "lucide-react";

const Dashboard = () => {
  const [aiQuery, setAiQuery] = useState("");
  const [notes, setNotes] = useState("");
  const [userName, setUserName] = useState("John"); // This can be prepopulated from user data
  const [isEmissionsExpanded, setIsEmissionsExpanded] = useState(false);
  const [checkedTasks, setCheckedTasks] = useState({
    exhaust: false,
    obd: false,
    gasCap: false,
    visual: false
  });

  const toggleEmissionsExpanded = () => {
    setIsEmissionsExpanded(!isEmissionsExpanded);
  };
  const handleTaskCheck = (taskId: string, checked: boolean) => {
    setCheckedTasks(prev => ({
      ...prev,
      [taskId]: checked
    }));
  };

  // Sample data for the dashboard - updated to match Case Detail styling
  const upcomingTasks = [{
    id: 1,
    title: "Engine diagnostics check",
    priority: "high" as const,
    badgeText: "In progress",
    badgeVariant: "blue" as const,
    icon: <CirclePlay className="w-6 h-6 text-blue-600" />,
    iconBgColor: "bg-blue-100",
    buttons: <Button variant="outline" size="sm">Continue</Button>
  }, {
    id: 2,
    title: "Brake system inspection",
    priority: "medium" as const,
    badgeText: "Priority",
    badgeVariant: "amber" as const,
    icon: <CircleDot className="w-6 h-6 text-green-600" />,
    iconBgColor: "bg-green-100",
    buttons: <div className="flex gap-2">
          <Button variant="outline" size="sm">Start</Button>
          <Button variant="outline" size="sm">Schedule</Button>
        </div>
  }];

  // Expandable emissions testing task data
  const emissionsTask = {
    id: "emissions",
    title: "Emissions testing",
    badgeText: "Pending",
    badgeVariant: "purple" as const,
    icon: <CheckSquare className="w-6 h-6 text-purple-600" />,
    iconBgColor: "bg-purple-100",
    buttons: <Button variant="outline" size="sm">Schedule</Button>,
    subTasks: [{
      id: "exhaust",
      title: "Exhaust emissions check",
      description: "Check exhaust system for proper emissions levels",
      checked: checkedTasks.exhaust
    }, {
      id: "obd",
      title: "OBD system verification",
      description: "Verify onboard diagnostics system functionality",
      checked: checkedTasks.obd
    }, {
      id: "gasCap",
      title: "Gas cap pressure test",
      description: "Test gas cap seal and pressure retention",
      checked: checkedTasks.gasCap
    }, {
      id: "visual",
      title: "Visual inspection",
      description: "Perform overall visual check of vehicle exterior",
      checked: checkedTasks.visual
    }],
    isExpanded: isEmissionsExpanded,
    onToggleExpand: toggleEmissionsExpanded,
    onTaskCheck: handleTaskCheck
  };
  const casesSummary = [{
    id: 1,
    address: "42 Baker Street, London",
    status: "active",
    tasksCount: 3,
    priority: "high",
    lastUpdate: "2 hours ago"
  }, {
    id: 2,
    address: "156 Oak Avenue, Manchester",
    status: "pending",
    tasksCount: 2,
    priority: "medium",
    lastUpdate: "1 day ago"
  }, {
    id: 3,
    address: "789 Pine Road, Birmingham",
    status: "review",
    tasksCount: 1,
    priority: "low",
    lastUpdate: "3 days ago"
  }];
  const recentActivity = [{
    action: "Completed brake inspection",
    case: "123 Main St",
    time: "1 hour ago"
  }, {
    action: "Updated case notes",
    case: "456 Oak Ave",
    time: "3 hours ago"
  }, {
    action: "Scheduled follow-up",
    case: "789 Pine Rd",
    time: "5 hours ago"
  }];
  const stats = [{
    title: "Today's Tasks",
    value: "8",
    icon: CheckSquare,
    color: "text-blue-600"
  }, {
    title: "Active Cases",
    value: "12",
    icon: FileText,
    color: "text-orange-600"
  }, {
    title: "Completed This Week",
    value: "24",
    icon: TrendingUp,
    color: "text-green-600"
  }, {
    title: "Pending Reviews",
    value: "5",
    icon: AlertCircle,
    color: "text-red-600"
  }];
  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // AI functionality would be implemented here
    console.log("AI Query:", aiQuery);
    setAiQuery("");
  };
  return <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Navbar />
          <div className="px-11 py-6 space-y-6">
            {/* Welcome Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-semibold text-gray-800">Welcome back, {userName}! 👋</h1>
                <p className="text-gray-500 mt-1">Here's what's on your schedule for today</p>
              </div>
              <Button variant="outline" className="gap-2">
                <Settings className="w-4 h-4" />
                Customise view
              </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {stats.map((stat, index) => <Card key={index}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`w-8 h-8 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>)}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full">
              {/* Left Column */}
              <div className="flex flex-col space-y-6">
                {/* Today's Tasks */}
                <Card className="flex-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Today's tasks
                      </h3>
                      <Button variant="outline" size="sm">View all tasks</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      {upcomingTasks.map(task => <TaskCard key={task.id} task={task} />)}
                      
                      {/* Expandable Emissions Testing Task */}
                      <ExpandableTaskCard task={emissionsTask} />
                    </div>
                  </CardContent>
                </Card>

                {/* Cases Summary */}
                <Card className="flex-1">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Active cases
                      </h3>
                      <Button variant="outline" size="sm">View All Cases</Button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-3">
                      {casesSummary.map(caseItem => <div key={caseItem.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div>
                            <p className="font-medium">{caseItem.address}</p>
                            <p className="text-sm text-gray-600">{caseItem.tasksCount} tasks remaining • Updated {caseItem.lastUpdate}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant={caseItem.status === 'active' ? 'default' : caseItem.status === 'pending' ? 'secondary' : 'outline'}>
                              {caseItem.status}
                            </Badge>
                            <Badge variant={caseItem.priority === 'high' ? 'destructive' : caseItem.priority === 'medium' ? 'default' : 'secondary'} className="text-xs">
                              {caseItem.priority}
                            </Badge>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right Column */}
              <div className="flex flex-col space-y-6">
                {/* AI Assistant */}
                <Card className="flex-1">
                  <CardHeader>
                    <h3 className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-purple-600" />
                      AI assistant
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-4 h-full flex flex-col">
                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="text-sm text-purple-800">
                          💡 Based on your schedule, I recommend prioritizing the brake inspection at 156 Oak Avenue due to safety concerns.
                        </p>
                      </div>
                      <form onSubmit={handleAiSubmit} className="space-y-2 mt-auto">
                        <Input placeholder="Ask me anything about your cases..." value={aiQuery} onChange={e => setAiQuery(e.target.value)} />
                        <Button type="submit" size="sm" className="w-full">
                          <Send className="w-4 h-4 mr-2" />
                          Ask AI
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Notes */}
                <Card className="flex-1">
                  <CardHeader>
                    <h3 className="flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      Quick notes
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="h-full flex flex-col">
                      <Textarea placeholder="Jot down quick notes, reminders, or observations..." value={notes} onChange={e => setNotes(e.target.value)} className="flex-1 resize-none" />
                      <Button size="sm" className="mt-2 w-full" variant="outline">
                        Save Notes
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="flex-1">
                  <CardHeader>
                    <h3 className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Recent activity
                    </h3>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-3">
                      {recentActivity.map((activity, index) => <div key={index} className="flex items-start gap-3 text-sm">
                          <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-gray-600">{activity.case}</p>
                            <p className="text-gray-500 text-xs">{activity.time}</p>
                          </div>
                        </div>)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>;
};

export default Dashboard;
