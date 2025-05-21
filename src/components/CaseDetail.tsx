import React, { useState } from "react";
import { Case } from "@/lib/data";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, List, FileText, Clipboard, FileBarChart, Car, Wrench, User, Calendar, Briefcase, Key, Shield, Activity, FileText as FileTextIcon, Users } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
interface CaseDetailProps {
  caseItem: Case;
}
export const CaseDetail: React.FC<CaseDetailProps> = ({
  caseItem
}) => {
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
        <Tabs defaultValue="overview" className="mt-6">
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
            {/* Tasks Section - Updated with increased padding and grey background container */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-medium">
                  Upcoming Tasks
                </h2>
                <Button variant="link" size="sm" className="text-sm text-orange-500">
                  See all tasks
                </Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 shadow-sm">
                <div className="space-y-3">
                  <div className="border rounded-md p-4 px-5 shadow-sm bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-sm">Order required parts</span>
                      </div>
                      <Button variant="secondary" size="sm" className="text-xs">Order parts</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 px-5 shadow-sm bg-white hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium text-sm">Contact customer to confirm appointment</span>
                      </div>
                      <Button variant="secondary" size="sm" className="text-xs">Contact</Button>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4 px-5 shadow-sm bg-white hover:bg-gray-50 transition-colors">
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

            {/* Key Information Summary */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Key Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-1">Status</h3>
                    <div><CaseStatusBadge status={caseItem.status} /></div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-1">Case Type</h3>
                    <div>{caseItem.type}</div>
                  </div>
                  <div>
                    <h3 className="font-medium text-sm text-gray-500 mb-1">Last Inspected</h3>
                    <div>{caseItem.lastInspected}</div>
                  </div>
                  {caseItem.appointment && <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Next Appointment</h3>
                      <div>{caseItem.appointment.date}, {caseItem.appointment.time}</div>
                    </div>}
                  {caseItem.job && <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Job Type</h3>
                      <div>{caseItem.job.type}</div>
                    </div>}
                  {caseItem.vehicle && <div>
                      <h3 className="font-medium text-sm text-gray-500 mb-1">Vehicle</h3>
                      <div>{caseItem.vehicle.year} {caseItem.vehicle.make} {caseItem.vehicle.model}</div>
                    </div>}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Section */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
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