
import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Briefcase, FileText, Car, MapPin, User, Phone, ExternalLink } from "lucide-react";
import { Case } from "@/lib/data";

interface SummarySectionProps {
  caseItem: Case;
  onNavigateToTab: (tabValue: string) => void;
  onDownloadICS: () => void;
  onOpenInGoogleMaps: () => void;
  dateInfo: {
    day: string;
    weekday: string;
    month: string;
  };
}

export const SummarySection: React.FC<SummarySectionProps> = ({ 
  caseItem, 
  onNavigateToTab, 
  onDownloadICS, 
  onOpenInGoogleMaps, 
  dateInfo 
}) => {
  const { day, weekday, month } = dateInfo;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">
          Summary
        </h2>
        <Button variant="ghost" size="sm" className="text-orange-500 h-6 px-2 py-0" onClick={() => onNavigateToTab("details")}>
          View all case details
        </Button>
      </div>
        
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {caseItem.appointment && (
          <Card className="h-full">
            <div className="flex py-[14px] px-[14px] h-full">
              <div className="pl-6 mr-12 text-center flex flex-col justify-center">
                <div className="text-lg text-gray-800 font-medium mb-1">
                  {weekday}
                </div>
                <div className="text-[64px] text-blue-500 font-bold leading-none">
                  {day || "N/A"}
                </div>
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
                  <Button variant="ghost" size="sm" className="text-orange-500 h-6 px-2 py-0" onClick={onDownloadICS}>
                    <Calendar className="h-4 w-4 mr-0.5" />
                    Add to Calendar
                  </Button>
                </div>
                
                {caseItem.job && (
                  <div className="space-y-3 mt-4">
                    <div className="flex gap-2 items-start">
                      <Briefcase className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                      <div className="flex-1">{caseItem.job.type}</div>
                    </div>
                    
                    <div className="flex gap-2 items-start">
                      <FileText className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                      <div className="flex-1">{caseItem.job.description}</div>
                    </div>
                    
                    {caseItem.vehicle && (
                      <div className="flex gap-2 items-start">
                        <Car className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                        <div className="flex-1">
                          {caseItem.vehicle.year} {caseItem.vehicle.make} {caseItem.vehicle.model}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Card>
        )}
      
        {caseItem.access && (
          <Card className="h-full">
            <div className="flex py-[14px] px-[14px] h-full">
              <div className="w-1/3">
                <div className="relative w-full h-full overflow-hidden rounded-l-lg bg-[#F2FCE2]" style={{
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0
                }}>
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
                  <Button variant="ghost" size="sm" className="text-orange-500 h-6 px-2 py-0" onClick={onOpenInGoogleMaps}>
                    <ExternalLink className="h-4 w-4 mr-0.5" />
                    Open in Google Maps
                  </Button>
                </div>
                
                <div className="space-y-3 mt-4">
                  <div className="flex gap-2 items-start">
                    <MapPin className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                    <div className="flex-1">{caseItem.address}</div>
                  </div>
                  
                  {caseItem.access.contactPerson && (
                    <div className="flex flex-col gap-1 mt-2">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-gray-500 flex-shrink-0" />
                        <div className="font-normal">James Blackwell</div>
                      </div>
                      <div className="ml-7 text-sm text-gray-600">{caseItem.access.contactPerson}</div>
                    </div>
                  )}
                  
                  {caseItem.access.contactPhone && (
                    <div className="flex gap-2 items-start mt-2">
                      <Phone className="h-5 w-5 mt-0.5 text-gray-500 flex-shrink-0" />
                      <div className="flex-1">{caseItem.access.contactPhone}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>

      <Card>
        <CardHeader className="py-4 pb-0">
          <CardTitle className="text-base font-medium">Case brief</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-3">
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-1">Case Type</h3>
              <div>{caseItem.type}</div>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-1">Estimated Price</h3>
              <div>{caseItem.job ? caseItem.job.estimatedCost : "N/A"}</div>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-1">Duration</h3>
              <div>{caseItem.appointment ? caseItem.appointment.duration : "N/A"}</div>
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
              <h3 className="font-medium text-sm text-gray-500 mb-1">Job Status</h3>
              <div>{caseItem.appointment ? caseItem.appointment.status : "Not Scheduled"}</div>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-1">Owner</h3>
              <div>{caseItem.owner.name}</div>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-1">Last Inspected</h3>
              <div>{caseItem.lastInspected}</div>
            </div>
            <div>
              <h3 className="font-medium text-sm text-gray-500 mb-1">Parts Required</h3>
              <div>{caseItem.job?.parts ? `${caseItem.job.parts.length} items` : "None specified"}</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
