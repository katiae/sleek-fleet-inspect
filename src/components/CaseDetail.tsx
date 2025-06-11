

import React, { useState } from "react";
import { Case } from "@/lib/data";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { TasksSection } from "./case-detail/TasksSection";
import { ActivitySection } from "./case-detail/ActivitySection";
import { SummarySection } from "./case-detail/SummarySection";
import { ContactsSection } from "./case-detail/ContactsSection";
import { CaseDetailsTab } from "./case-detail/CaseDetailsTab";

interface CaseDetailProps {
  caseItem: Case;
}

export const CaseDetail: React.FC<CaseDetailProps> = ({ caseItem }) => {
  const [activeTab, setActiveTab] = useState("overview");

  const navigateToTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  const openInGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(caseItem.address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  const downloadICSFile = () => {
    try {
      if (!caseItem.appointment?.date) {
        console.error("No appointment date available");
        return;
      }

      const date = new Date(caseItem.appointment.date);
      const startDate = date.toISOString().replace(/-|:|\.\d+/g, "");
      const endDate = new Date(date.getTime() + (caseItem.appointment.duration ? parseInt(caseItem.appointment.duration) * 60000 : 60 * 60000)).toISOString().replace(/-|:|\.\d+/g, "");
      const description = caseItem.access ? `Access Contact: ${caseItem.access.contactPerson || 'Not specified'}\nContact Phone: ${caseItem.access.contactPhone || 'Not specified'}` : 'No access information provided';
      const eventTitle = caseItem.job?.type || `${caseItem.type} Inspection`;

      const icsContent = ["BEGIN:VCALENDAR", "VERSION:2.0", "CALSCALE:GREGORIAN", "PRODID:-//Inspection Calendar//EN", "BEGIN:VEVENT", `UID:${Date.now()}@inspection.calendar`, `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, "")}`, `DTSTART:${startDate}`, `DTEND:${endDate}`, `SUMMARY:${eventTitle}`, `DESCRIPTION:${description.replace(/\n/g, '\\n')}`, `LOCATION:${caseItem.address}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");

      const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8"
      });

      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${caseItem.id}_inspection.ics`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating ICS file:", error);
    }
  };

  const getDateInfo = () => {
    if (!caseItem.appointment?.date) return {
      day: "",
      weekday: "",
      month: ""
    };

    console.log("Date string:", caseItem.appointment.date);
    try {
      const date = new Date(caseItem.appointment.date);
      const day = date.getDate().toString();
      const weekday = date.toLocaleDateString('en-US', {
        weekday: 'long'
      });
      const month = date.toLocaleDateString('en-US', {
        month: 'long'
      });
      console.log("Extracted date info:", {
        day,
        weekday,
        month
      });
      return {
        day,
        weekday,
        month
      };
    } catch (error) {
      console.error("Error parsing date:", error);
      return {
        day: "",
        weekday: "",
        month: ""
      };
    }
  };

  const dateInfo = getDateInfo();

  return (
    <div className="space-y-11">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">{caseItem.address}</h1>
          <div className="flex items-center gap-3 mt-2">
            <CaseStatusBadge status={caseItem.status} />
            <span className="text-gray-500">ID: {caseItem.id}</span>
          </div>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="actions-button">
              Actions <ChevronDown className="ml-2 h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Schedule Inspection</DropdownMenuItem>
            <DropdownMenuItem>Assign Inspector</DropdownMenuItem>
            <DropdownMenuItem>Change Status</DropdownMenuItem>
            <DropdownMenuItem>Mark as Complete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="w-full">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <div className="border-b border-gray-200 w-full">
            <TabsList className="flex h-auto p-0 bg-transparent space-x-8 mb-0 justify-start">
              <TabsTrigger value="overview" className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-normal text-center">
                Overview
              </TabsTrigger>
              <TabsTrigger value="details" className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-normal">
                Case details
              </TabsTrigger>
              <TabsTrigger value="tasks" className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-normal">
                Tasks
              </TabsTrigger>
              <TabsTrigger value="activity" className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-normal">
                Activity
              </TabsTrigger>
              <TabsTrigger value="reports" className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-normal">
                Reports
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="pt-6 space-y-11">
            <div className="grid grid-cols-4 gap-6">
              <div className="col-span-3 space-y-11">
                <TasksSection caseItem={caseItem} />
                <SummarySection 
                  caseItem={caseItem} 
                  onNavigateToTab={navigateToTab}
                  onDownloadICS={downloadICSFile}
                  onOpenInGoogleMaps={openInGoogleMaps}
                  dateInfo={dateInfo}
                />
              </div>
              <div className="col-span-1 space-y-11">
                <ActivitySection caseItem={caseItem} onNavigateToTab={navigateToTab} />
                <ContactsSection caseItem={caseItem} />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="details" className="pt-6">
            <CaseDetailsTab caseItem={caseItem} />
          </TabsContent>
          
          <TabsContent value="tasks" className="pt-6">
            <div className="space-y-6">
              <TasksSection caseItem={caseItem} />
            </div>
          </TabsContent>
          
          <TabsContent value="activity" className="pt-6">
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Activity information will appear here
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="pt-6">
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Reports for this case will appear here
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

