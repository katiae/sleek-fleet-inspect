
import React, { useState } from "react";
import { Case } from "@/lib/data";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, List, FileText, Clipboard, FileBarChart, Car, Wrench, User, Calendar, Briefcase, Key, Shield, Activity, FileTextIcon, Users, MapPin, Phone, ExternalLink } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useIsMobile } from "@/hooks/use-mobile";

// Google Maps API Key
const GOOGLE_MAPS_API_KEY = "AIzaSyBh7z3qRJnwouiI0l30sSaR-3wBhAGglro";
interface CaseDetailProps {
  caseItem: Case;
}
export const CaseDetail: React.FC<CaseDetailProps> = ({
  caseItem
}) => {
  // State for tracking if the map image failed to load
  const [mapLoadError, setMapLoadError] = useState(false);

  // Add a reference to the Tabs component to control tab switching programmatically
  const [activeTab, setActiveTab] = useState("overview");
  
  // Check if the user is on a mobile device
  const isMobile = useIsMobile();

  // Function to navigate to a specific tab
  const navigateToTab = (tabValue: string) => {
    setActiveTab(tabValue);
  };

  // Function to open Google Maps in a new tab
  const openInGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(caseItem.address);
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;
    window.open(googleMapsUrl, '_blank');
  };

  // Function to generate and download ICS file
  const downloadICSFile = () => {
    try {
      if (!caseItem.appointment?.date) {
        console.error("No appointment date available");
        return;
      }

      // Convert the date to a proper format for .ics file (YYYYMMDD)
      const date = new Date(caseItem.appointment.date);

      // Format the date as YYYYMMDDTHHMMSSZ
      const startDate = date.toISOString().replace(/-|:|\.\d+/g, "");

      // Set end date 1 hour after start (or use duration if available)
      const endDate = new Date(date.getTime() + (caseItem.appointment.duration ? parseInt(caseItem.appointment.duration) * 60000 : 60 * 60000)).toISOString().replace(/-|:|\.\d+/g, "");

      // Create event description with access information
      const description = caseItem.access ? `Access Contact: ${caseItem.access.contactPerson || 'Not specified'}\nContact Phone: ${caseItem.access.contactPhone || 'Not specified'}` : 'No access information provided';

      // Create event title using job type or case type
      const eventTitle = caseItem.job?.type || `${caseItem.type} Inspection`;

      // Create the .ics content
      const icsContent = ["BEGIN:VCALENDAR", "VERSION:2.0", "CALSCALE:GREGORIAN", "PRODID:-//Inspection Calendar//EN", "BEGIN:VEVENT", `UID:${Date.now()}@inspection.calendar`, `DTSTAMP:${new Date().toISOString().replace(/-|:|\.\d+/g, "")}`, `DTSTART:${startDate}`, `DTEND:${endDate}`, `SUMMARY:${eventTitle}`, `DESCRIPTION:${description.replace(/\n/g, '\\n')}`, `LOCATION:${caseItem.address}`, "END:VEVENT", "END:VCALENDAR"].join("\r\n");

      // Create a Blob with the .ics content
      const blob = new Blob([icsContent], {
        type: "text/calendar;charset=utf-8"
      });

      // Create a URL for the Blob
      const url = window.URL.createObjectURL(blob);

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = url;
      link.download = `${caseItem.id}_inspection.ics`;

      // Append the link to the document, trigger the click, and remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Release the URL object
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating ICS file:", error);
    }
  };

  // Extract and format date information
  const getDateInfo = () => {
    if (!caseItem.appointment?.date) return {
      day: "",
      weekday: "",
      month: ""
    };

    // Log the date string to verify its format
    console.log("Date string:", caseItem.appointment.date);
    try {
      const date = new Date(caseItem.appointment.date);
      const day = date.getDate().toString();

      // Get weekday name (e.g., Monday, Tuesday)
      const weekday = date.toLocaleDateString('en-US', {
        weekday: 'long'
      });

      // Get month name (e.g., January, February)
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

  // Get the encoded address for Google Maps
  const getEncodedAddress = () => {
    return encodeURIComponent(caseItem.address);
  };
  const {
    day,
    weekday,
    month
  } = getDateInfo();
  return <div className="space-y-6">
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
            <Button variant="outline">
              Actions <MoreHorizontal className="ml-2 h-4 w-4" />
            </Button>
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
              <TabsTrigger value="activity" className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-normal">
                Activity
              </TabsTrigger>
              <TabsTrigger value="reports" className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-normal">
                Reports
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="pt-6 space-y-6">
            {/* Tasks and Activity Section - Modified to use grid for lg screens */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Tasks Section - Grid column 1 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-medium">
                    Upcoming Tasks
                  </h2>
                  <Button variant="link" size="sm" className="text-sm text-orange-500">
                    See all tasks
                  </Button>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <div className="space-y-3">
                    <div className="border rounded-md p-5 px-6 shadow-sm bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-sm">Order required parts</span>
                        </div>
                        <Button variant="secondary" size="sm" className="text-xs">Order parts</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-5 px-6 shadow-sm bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-sm">Contact customer to confirm appointment</span>
                        </div>
                        <Button variant="secondary" size="sm" className="text-xs">Contact</Button>
                      </div>
                    </div>
                    
                    <div className="border rounded-md p-5 px-6 shadow-sm bg-white hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium text-sm">Review inspection report</span>
                        </div>
                        <Button variant="secondary" size="sm" className="text-xs">Review</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Activity Section - Grid column 2 */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-medium">
                    Recent Activity
                  </h2>
                  <Button 
                    variant="link" 
                    size="sm" 
                    className="text-sm text-orange-500" 
                    onClick={() => navigateToTab("activity")}
                  >
                    View all activity
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="border-l-2 border-gray-200 pl-4 pb-1 relative">
                        <div className="absolute w-2 h-2 rounded-full bg-blue-500 top-1.5 -left-[4.5px]"></div>
                        <p className="text-sm">Appointment scheduled for {caseItem.appointment?.date}, {caseItem.appointment?.time}</p>
                        <p className="text-xs text-gray-500">Today, 10:45 AM</p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-4 pb-1 relative">
                        <div className="absolute w-2 h-2 rounded-full bg-orange-500 top-1.5 -left-[4.5px]"></div>
                        <p className="text-sm">Mechanic {caseItem.mechanic?.name} assigned to the case</p>
                        <p className="text-xs text-gray-500">Yesterday, 3:22 PM</p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-4 pb-1 relative">
                        <div className="absolute w-2 h-2 rounded-full bg-green-500 top-1.5 -left-[4.5px]"></div>
                        <p className="text-sm">Customer confirmed availability for inspection</p>
                        <p className="text-xs text-gray-500">Yesterday, 1:15 PM</p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-4 pb-1 relative">
                        <div className="absolute w-2 h-2 rounded-full bg-purple-500 top-1.5 -left-[4.5px]"></div>
                        <p className="text-sm">Initial assessment completed</p>
                        <p className="text-xs text-gray-500">May 20, 2025, 9:30 AM</p>
                      </div>
                      <div className="border-l-2 border-gray-200 pl-4 pb-1 relative">
                        <div className="absolute w-2 h-2 rounded-full bg-gray-500 top-1.5 -left-[4.5px]"></div>
                        <p className="text-sm">Case created</p>
                        <p className="text-xs text-gray-500">May 19, 2025, 4:15 PM</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Summary Section - Restructured to have Summary as section title and separate cards */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium">
                  Summary
                </h2>
                <Button variant="ghost" size="sm" className="text-orange-500 h-6 px-2 py-0" onClick={() => navigateToTab("details")}>
                  View all case details
                </Button>
              </div>
                
              {/* Card layout - Changed to lg breakpoint (1024px) for larger screens like 14-inch and above */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {caseItem.appointment && <Card className="h-full">
                  <div className="flex py-[14px] px-[14px] h-full">
                    <div className="pl-6 mr-12 text-center flex flex-col justify-center">
                      {/* Add weekday name above the day number */}
                      <div className="text-lg text-gray-800 font-medium mb-1">
                        {weekday}
                      </div>
                      {/* Large day number */}
                      <div className="text-[64px] text-blue-500 font-bold leading-none">
                        {day || "N/A"}
                      </div>
                      {/* Add month name below the day number */}
                      <div className="text-sm text-gray-800 font-normal mt-1 mb-0.5">
                        {month}
                      </div>
                      <div className="text-sm text-gray-500">
                        ETA {caseItem.appointment.time}
                      </div>
                    </div>

                    <div className="flex-1 bg-gray-50 p-4 rounded-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-medium">Job details</h3>
                        <Button variant="ghost" size="sm" className="text-orange-500 h-6 px-2 py-0" onClick={downloadICSFile}>
                          <Calendar className="h-4 w-4 mr-0.5" />
                          Add to Calendar
                        </Button>
                      </div>
                      
                      {caseItem.job && <div className="space-y-3 mt-4">
                          <div className="flex gap-2 items-start">
                            <Briefcase className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                            <div className="flex-1">{caseItem.job.type}</div>
                          </div>
                          
                          <div className="flex gap-2 items-start">
                            <FileText className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                            <div className="flex-1">{caseItem.job.description}</div>
                          </div>
                          
                          {caseItem.vehicle && <div className="flex gap-2 items-start">
                              <Car className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                              <div className="flex-1">
                                {caseItem.vehicle.year} {caseItem.vehicle.make} {caseItem.vehicle.model}
                              </div>
                            </div>}
                        </div>}
                    </div>
                  </div>
                </Card>}
              
                {/* Access Arrangements Card */}
                {caseItem.access && <Card className="h-full">
                  <div className="flex py-[14px] px-[14px] h-full">
                    <div className="w-1/3">
                      {/* Green background with pin icon - removed all borders */}
                      <div className="relative w-full h-full overflow-hidden rounded-l-lg bg-[#F2FCE2]" style={{
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0
                    }}>
                        {/* Location pin and placeholder message */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-green-200">
                          <MapPin className="h-8 w-8 text-gray-500 mb-2" />
                          <p className="text-gray-600 text-sm font-medium">
                            Property location
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 bg-gray-50 p-4 rounded-r-lg">
                      <div className="flex justify-between items-start">
                        <h3 className="text-base font-medium">Access details</h3>
                        <Button variant="ghost" size="sm" className="text-orange-500 h-6 px-2 py-0" onClick={openInGoogleMaps}>
                          <ExternalLink className="h-4 w-4 mr-0.5" />
                          Open in Google Maps
                        </Button>
                      </div>
                      
                      <div className="space-y-3 mt-4">
                        <div className="flex gap-2 items-start">
                          <MapPin className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                          <div className="flex-1">{caseItem.address}</div>
                        </div>
                        
                        {caseItem.access.contactPerson && <div className="flex flex-col gap-1 mt-2">
                            <div className="flex items-center gap-2">
                              <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                              <div className="font-normal">James Blackwell</div>
                            </div>
                            <div className="ml-7 text-sm text-gray-600">{caseItem.access.contactPerson}</div>
                          </div>}
                        
                        {/* Updated phone styling to match the data styling above */}
                        {caseItem.access.contactPhone && <div className="flex gap-2 items-start mt-2">
                            <Phone className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                            <div className="flex-1">{caseItem.access.contactPhone}</div>
                          </div>}
                      </div>
                    </div>
                  </div>
                </Card>}
              </div>

              {/* Instruction Details Summary */}
              <Card>
                <CardHeader className="py-4 pb-0">
                  <CardTitle className="text-base font-medium">Case brief</CardTitle>
                </CardHeader>
                <CardContent className="py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Case Type</h3>
                      <div>{caseItem.type}</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Estimated Price</h3>
                      <div>{caseItem.job ? caseItem.job.estimatedCost : "N/A"}</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Vehicle</h3>
                      <div>{caseItem.vehicle ? `${caseItem.vehicle.year} ${caseItem.vehicle.make} ${caseItem.vehicle.model}` : "N/A"}</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Owner Type</h3>
                      <div>{caseItem.owner.type}</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Owner</h3>
                      <div>{caseItem.owner.name}</div>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Last Inspected</h3>
                      <div>{caseItem.lastInspected}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contacts Section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Case Contacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {caseItem.customer && <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <div className="bg-blue-100 text-blue-700 p-2 rounded-full">
                        <User className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{caseItem.customer.name}</h3>
                        <p className="text-sm text-gray-500">Customer</p>
                        <div className="mt-1 text-sm">
                          <div>{caseItem.customer.phone}</div>
                          <div>{caseItem.customer.email}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">Contact</Button>
                    </div>}
                  
                  {caseItem.mechanic && <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <div className="bg-orange-100 text-orange-700 p-2 rounded-full">
                        <Wrench className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{caseItem.mechanic.name}</h3>
                        <p className="text-sm text-gray-500">Mechanic - {caseItem.mechanic.specialization}</p>
                        <div className="mt-1 text-sm">
                          <div>{caseItem.mechanic.contact}</div>
                          <div>ID: {caseItem.mechanic.id}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">Contact</Button>
                    </div>}
                  
                  {caseItem.access && caseItem.access.contactPerson && <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-100 hover:bg-gray-50">
                      <div className="bg-green-100 text-green-700 p-2 rounded-full">
                        <Key className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{caseItem.access.contactPerson}</h3>
                        <p className="text-sm text-gray-500">Access Contact</p>
                        <div className="mt-1 text-sm">
                          <div>{caseItem.access.contactPhone}</div>
                        </div>
                      </div>
                      <Button size="sm" variant="outline" className="text-xs">Contact</Button>
                    </div>}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="pt-6">
            {/* Add inner category tabs for filtering case details */}
            <Tabs defaultValue="case" className="mb-6">
              <TabsList className="inline-flex h-10 bg-gray-50 mb-4">
                <TabsTrigger value="case">Instruction</TabsTrigger>
                <TabsTrigger value="job">Job Details</TabsTrigger>
                <TabsTrigger value="vehicle">
                  Vehicle Insights
                </TabsTrigger>
                <TabsTrigger value="risks">
                  Risks
                </TabsTrigger>
              </TabsList>

              {/* Case Details Tab */}
              <TabsContent value="case" className="mt-4">
                <div className="grid grid-cols-2 gap-4 border-0">
                  {/* Case Information */}
                  <div className="mb-4">
                    <Accordion type="single" defaultValue="case-information" collapsible className="w-full">
                      <AccordionItem value="case-information" className="border rounded-lg px-4">
                        <div className="flex justify-between items-center">
                          <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                            <span className="font-medium">Case information</span>
                          </AccordionTrigger>
                          <DropdownMenu>
                            <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
                              <MoreHorizontal className="h-4 w-4" />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit information</DropdownMenuItem>
                              <DropdownMenuItem>Add note</DropdownMenuItem>
                              <DropdownMenuItem>Export data</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                        <AccordionContent className="pt-2 pb-4">
                          <div className="grid grid-cols-1 gap-4">
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Address:</span>
                                <span className="ml-4 text-right">{caseItem.address}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Case Type:</span>
                                <span className="ml-4 text-right">{caseItem.type}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Status:</span>
                                <span className="ml-4 text-right"><CaseStatusBadge status={caseItem.status} /></span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Last Inspected:</span>
                                <span className="ml-4 text-right">{caseItem.lastInspected}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Owner Name:</span>
                                <span className="ml-4 text-right">{caseItem.owner.name}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Owner Type:</span>
                                <span className="ml-4 text-right">{caseItem.owner.type}</span>
                              </li>
                            </ul>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                  
                  {/* Customer Details */}
                  {caseItem.customer && <div className="mb-4">
                      <Accordion type="single" defaultValue="customer-details" collapsible className="w-full">
                        <AccordionItem value="customer-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Customer details</span>
                            </AccordionTrigger>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
                                <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit customer</DropdownMenuItem>
                                <DropdownMenuItem>Contact customer</DropdownMenuItem>
                                <DropdownMenuItem>View history</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <AccordionContent className="pt-2 pb-4">
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Name:</span>
                                <span className="ml-4 text-right">{caseItem.customer.name}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Phone:</span>
                                <span className="ml-4 text-right">{caseItem.customer.phone}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Email:</span>
                                <span className="ml-4 text-right">{caseItem.customer.email}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Preferred Contact:</span>
                                <span className="ml-4 text-right">{caseItem.customer.preferredContact}</span>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>}
                  
                  {/* Mechanic Details - MOVED FROM JOB DETAILS TO CASE DETAILS */}
                  {caseItem.mechanic && <div className="mb-4">
                      <Accordion type="single" defaultValue="mechanic-details" collapsible className="w-full">
                        <AccordionItem value="mechanic-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Mechanic details</span>
                            </AccordionTrigger>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
                                <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Contact mechanic</DropdownMenuItem>
                                <DropdownMenuItem>Reassign job</DropdownMenuItem>
                                <DropdownMenuItem>View schedule</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <AccordionContent className="pt-2 pb-4">
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Name:</span>
                                <span className="ml-4 text-right">{caseItem.mechanic.name}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">ID:</span>
                                <span className="ml-4 text-right">{caseItem.mechanic.id}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Specialization:</span>
                                <span className="ml-4 text-right">{caseItem.mechanic.specialization}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Contact:</span>
                                <span className="ml-4 text-right">{caseItem.mechanic.contact}</span>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>}
                </div>
              </TabsContent>

              {/* Job Details Tab */}
              <TabsContent value="job" className="mt-4">
                <div className="grid grid-cols-2 gap-4 border-0">
                  {/* Job Details */}
                  {caseItem.job && <div className="mb-4">
                      <Accordion type="single" defaultValue="job-details" collapsible className="w-full">
                        <AccordionItem value="job-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Inspection</span>
                            </AccordionTrigger>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
                                <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Edit job details</DropdownMenuItem>
                                <DropdownMenuItem>Add parts</DropdownMenuItem>
                                <DropdownMenuItem>Update cost</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <AccordionContent className="pt-2 pb-4">
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Type:</span>
                                <span className="ml-4 text-right">{caseItem.job.type}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Description:</span>
                                <span className="ml-4 text-right">{caseItem.job.description}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Estimated Cost:</span>
                                <span className="ml-4 text-right">{caseItem.job.estimatedCost}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Required Parts:</span>
                                <div className="ml-4 text-right">
                                  <ul className="list-disc list-inside text-right mt-1">
                                    {caseItem.job.parts.map((part, index) => <li key={index} className="text-right">{part}</li>)}
                                  </ul>
                                </div>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>}

                  {/* Appointment Details */}
                  {caseItem.appointment && <div className="mb-4">
                      <Accordion type="single" defaultValue="appointment-details" collapsible className="w-full">
                        <AccordionItem value="appointment-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Appointment details</span>
                            </AccordionTrigger>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
                                <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Reschedule</DropdownMenuItem>
                                <DropdownMenuItem>Cancel appointment</DropdownMenuItem>
                                <DropdownMenuItem>Send reminder</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <AccordionContent className="pt-2 pb-4">
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Date:</span>
                                <span className="ml-4 text-right">{caseItem.appointment.date}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Time:</span>
                                <span className="ml-4 text-right">{caseItem.appointment.time}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Duration:</span>
                                <span className="ml-4 text-right">{caseItem.appointment.duration}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Status:</span>
                                <span className="ml-4 text-right">{caseItem.appointment.status}</span>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>}

                  {/* Access Arrangements - MOVED FROM CASE DETAILS TO JOB DETAILS */}
                  {caseItem.access && <div className="mb-4">
                      <Accordion type="single" defaultValue="access-details" collapsible className="w-full">
                        <AccordionItem value="access-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Access arrangements</span>
                            </AccordionTrigger>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
                                <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Update access info</DropdownMenuItem>
                                <DropdownMenuItem>Request access changes</DropdownMenuItem>
                                <DropdownMenuItem>Print instructions</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <AccordionContent className="pt-2 pb-4">
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Instructions:</span>
                                <span className="ml-4 text-right">{caseItem.access.instructions}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Restrictions:</span>
                                <span className="ml-4 text-right">{caseItem.access.restrictions}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Contact Person:</span>
                                <span className="ml-4 text-right">{caseItem.access.contactPerson}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Contact Phone:</span>
                                <span className="ml-4 text-right">{caseItem.access.contactPhone}</span>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>}
                </div>
              </TabsContent>

              {/* Vehicle Insights Tab */}
              <TabsContent value="vehicle" className="mt-4">
                <div className="grid grid-cols-2 gap-4 border-0">
                  {/* Vehicle Details */}
                  {caseItem.vehicle && <div className="mb-4">
                      <Accordion type="single" defaultValue="vehicle-details" collapsible className="w-full">
                        <AccordionItem value="vehicle-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Vehicle details</span>
                            </AccordionTrigger>
                            <DropdownMenu>
                              <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100">
                                <MoreHorizontal className="h-4 w-4" />
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>Update vehicle info</DropdownMenuItem>
                                <DropdownMenuItem>View service history</DropdownMenuItem>
                                <DropdownMenuItem>Check recalls</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          <AccordionContent className="pt-2 pb-4">
                            <ul className="space-y-2 text-sm">
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Make:</span>
                                <span className="ml-4 text-right">{caseItem.vehicle.make}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Model:</span>
                                <span className="ml-4 text-right">{caseItem.vehicle.model}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">Year:</span>
                                <span className="ml-4 text-right">{caseItem.vehicle.year}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">VIN:</span>
                                <span className="ml-4 text-right">{caseItem.vehicle.vin}</span>
                              </li>
                              <li className="flex justify-between items-start">
                                <span className="text-gray-500">License Plate:</span>
                                <span className="ml-4 text-right">{caseItem.vehicle.licensePlate}</span>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>}
                </div>
              </TabsContent>

              {/* Risks Tab */}
              <TabsContent value="risks" className="mt-4">
                <div className="grid grid-cols-2 gap-4 border-0">
                  {/* Placeholder for Risks */}
                  <div className="mb-4">
                    <Card>
                      <CardContent className="p-6">
                        <div className="flex items-center mb-4">
                          <h3 className="text-lg font-medium">Risk assessment</h3>
                        </div>
                        <p className="text-gray-500 text-center my-6">
                          No risk factors have been identified for this case yet.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
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
    </div>;
};

