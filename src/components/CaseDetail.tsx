
import React, { useState } from "react";
import { Case } from "@/lib/data";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  List,
  FileText,
  Clipboard,
  FileBarChart,
  Car,
  Wrench,
  User,
  Calendar,
  Briefcase,
  Key,
  Shield
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface CaseDetailProps {
  caseItem: Case;
}

export const CaseDetail: React.FC<CaseDetailProps> = ({ caseItem }) => {
  return (
    <div className="space-y-6">
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
        <Tabs defaultValue="overview" className="mt-6">
          <div className="border-b border-gray-200 w-full">
            <TabsList className="flex h-auto p-0 bg-transparent space-x-8 mb-0 justify-start">
              <TabsTrigger 
                value="overview" 
                className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-medium"
              >
                Overview
              </TabsTrigger>
              <TabsTrigger 
                value="details" 
                className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-medium"
              >
                Case details
              </TabsTrigger>
              <TabsTrigger 
                value="activity" 
                className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-medium"
              >
                Activity
              </TabsTrigger>
              <TabsTrigger 
                value="reports" 
                className="px-0 py-4 h-auto rounded-none border-b-2 border-transparent data-[state=active]:border-orange-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none text-gray-600 data-[state=active]:text-gray-900 font-medium"
              >
                Reports
              </TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="overview" className="pt-6">
            <Card>
              <CardContent className="p-6 text-center text-gray-500">
                Overview information will appear here
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="details" className="pt-6">
            {/* Add inner category tabs for filtering case details */}
            <Tabs defaultValue="case" className="mb-6">
              <TabsList className="inline-flex h-10 bg-gray-50 mb-4">
                <TabsTrigger value="case">
                  Case Details
                </TabsTrigger>
                <TabsTrigger value="job">
                  Job Details
                </TabsTrigger>
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
                            <span className="font-medium">Case Information</span>
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
                  {caseItem.customer && (
                    <div className="mb-4">
                      <Accordion type="single" defaultValue="customer-details" collapsible className="w-full">
                        <AccordionItem value="customer-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Customer Details</span>
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
                    </div>
                  )}
                  
                  {/* Access Arrangements */}
                  {caseItem.access && (
                    <div className="mb-4">
                      <Accordion type="single" defaultValue="access-details" collapsible className="w-full">
                        <AccordionItem value="access-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Access Arrangements</span>
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
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Job Details Tab */}
              <TabsContent value="job" className="mt-4">
                <div className="grid grid-cols-2 gap-4 border-0">
                  {/* Job Details */}
                  {caseItem.job && (
                    <div className="mb-4">
                      <Accordion type="single" defaultValue="job-details" collapsible className="w-full">
                        <AccordionItem value="job-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Job Details</span>
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
                              <li className="flex items-start">
                                <span className="text-gray-500">Required Parts:</span>
                                <ul className="mt-1 list-disc list-inside ml-4">
                                  {caseItem.job.parts.map((part, index) => (
                                    <li key={index}>{part}</li>
                                  ))}
                                </ul>
                              </li>
                            </ul>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  )}

                  {/* Appointment Details */}
                  {caseItem.appointment && (
                    <div className="mb-4">
                      <Accordion type="single" defaultValue="appointment-details" collapsible className="w-full">
                        <AccordionItem value="appointment-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Appointment Details</span>
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
                    </div>
                  )}

                  {/* Mechanic Details */}
                  {caseItem.mechanic && (
                    <div className="mb-4">
                      <Accordion type="single" defaultValue="mechanic-details" collapsible className="w-full">
                        <AccordionItem value="mechanic-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Mechanic Details</span>
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
                    </div>
                  )}
                </div>
              </TabsContent>

              {/* Vehicle Insights Tab */}
              <TabsContent value="vehicle" className="mt-4">
                <div className="grid grid-cols-2 gap-4 border-0">
                  {/* Vehicle Details */}
                  {caseItem.vehicle && (
                    <div className="mb-4">
                      <Accordion type="single" defaultValue="vehicle-details" collapsible className="w-full">
                        <AccordionItem value="vehicle-details" className="border rounded-lg px-4">
                          <div className="flex justify-between items-center">
                            <AccordionTrigger className="py-4 hover:no-underline [&[data-state=open]>svg]:hidden">
                              <span className="font-medium">Vehicle Details</span>
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
                    </div>
                  )}
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
                          <h3 className="text-lg font-medium">Risk Assessment</h3>
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
    </div>
  );
};

