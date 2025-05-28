
import React from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Navbar } from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Calendar, Users, FileText, CheckSquare } from "lucide-react";

const Dashboard = () => {
  // Sample data for charts
  const caseData = [
    { month: 'Jan', cases: 12 },
    { month: 'Feb', cases: 19 },
    { month: 'Mar', cases: 15 },
    { month: 'Apr', cases: 22 },
    { month: 'May', cases: 18 },
    { month: 'Jun', cases: 25 },
  ];

  const statusData = [
    { name: 'Active', value: 45, color: '#f97316' },
    { name: 'Pending', value: 23, color: '#eab308' },
    { name: 'Completed', value: 32, color: '#22c55e' },
  ];

  const stats = [
    {
      title: "Total Cases",
      value: "156",
      icon: FileText,
      change: "+12%",
      changeType: "positive" as const
    },
    {
      title: "Active Inspections",
      value: "45",
      icon: CheckSquare,
      change: "+8%",
      changeType: "positive" as const
    },
    {
      title: "Scheduled Today",
      value: "8",
      icon: Calendar,
      change: "-2%",
      changeType: "negative" as const
    },
    {
      title: "Total Inspectors",
      value: "24",
      icon: Users,
      change: "+1",
      changeType: "positive" as const
    }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <Navbar />
          <div className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600 mt-1">Welcome back! Here's an overview of your inspection activities.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className={`text-sm ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                          {stat.change} from last month
                        </p>
                      </div>
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                        <stat.icon className="w-6 h-6 text-orange-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cases Over Time Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Cases Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={caseData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cases" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Case Status Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle>Case Status Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="flex justify-center space-x-4 mt-4">
                    {statusData.map((entry, index) => (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: entry.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{entry.name}: {entry.value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: "New case assigned", case: "123 Main St", time: "2 hours ago", status: "pending" },
                    { action: "Inspection completed", case: "456 Oak Ave", time: "4 hours ago", status: "completed" },
                    { action: "Report generated", case: "789 Pine Rd", time: "6 hours ago", status: "active" },
                    { action: "Case updated", case: "321 Elm St", time: "1 day ago", status: "pending" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-b-0">
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.case}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">{activity.time}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          activity.status === 'completed' ? 'bg-green-100 text-green-800' :
                          activity.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Dashboard;
