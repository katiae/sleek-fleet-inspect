import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { MoreHorizontal } from "lucide-react";
import { CaseStatusBadge } from "@/components/CaseStatusBadge";
import { Case } from "@/lib/data";

interface CaseDetailsTabProps {
  caseItem: Case;
}

export const CaseDetailsTab: React.FC<CaseDetailsTabProps> = ({ caseItem }) => {
  return (
    <Tabs defaultValue="case" className="mb-6">
      <TabsList className="inline-flex h-10 bg-gray-50 mb-4">
        <TabsTrigger value="case">Instruction</TabsTrigger>
        <TabsTrigger value="job">Job Details</TabsTrigger>
        <TabsTrigger value="vehicle">Vehicle Insights</TabsTrigger>
        <TabsTrigger value="risks">Risks</TabsTrigger>
      </TabsList>

      <TabsContent value="case" className="mt-4">
        <div className="grid grid-cols-2 gap-4 border-0">
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
          
          {caseItem.customer && (
            <div className="mb-4">
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
            </div>
          )}
          
          {caseItem.mechanic && (
            <div className="mb-4">
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
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="job" className="mt-4">
        <div className="grid grid-cols-2 gap-4 border-0">
          {caseItem.job && (
            <div className="mb-4">
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
                            {caseItem.job.parts.map((part, index) => (
                              <li key={index} className="text-right">
                                {part}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          )}

          {caseItem.appointment && (
            <div className="mb-4">
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
            </div>
          )}

          {caseItem.access && (
            <div className="mb-4">
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
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="vehicle" className="mt-4">
        <div className="grid grid-cols-2 gap-4 border-0">
          {caseItem.vehicle && (
            <div className="mb-4">
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
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="risks" className="mt-4">
        <div className="grid grid-cols-2 gap-4 border-0">
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
  );
};
