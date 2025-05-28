
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Download } from "lucide-react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";

interface Inspection {
  id: string;
  title: string;
  date: Date;
  time: string;
  address: string;
  type: string;
}

// Sample data for the week
const weeklyInspections: Inspection[] = [
  {
    id: "INS-2023-0020",
    title: "Vehicle Inspection - Toyota Camry",
    date: new Date(2025, 4, 26), // May 26, 2025 (Monday)
    time: "09:00 AM",
    address: "42 Baker Street, London",
    type: "Full Inspection"
  },
  {
    id: "INS-2023-0021",
    title: "Emissions Test - Ford Focus",
    date: new Date(2025, 4, 28), // May 28, 2025 (Wednesday)
    time: "14:30 PM",
    address: "17 Kensington Gardens, London",
    type: "Emissions Test"
  },
  {
    id: "INS-2023-0022",
    title: "Safety Inspection - BMW X5",
    date: new Date(2025, 4, 30), // May 30, 2025 (Friday)
    time: "11:15 AM",
    address: "221B Baker Street, London",
    type: "Safety Check"
  }
];

export const WeeklyInspections = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const exportToICS = () => {
    const icsContent = generateICSContent(weeklyInspections);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'weekly-inspections.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const generateICSContent = (inspections: Inspection[]) => {
    const now = new Date();
    const timestamp = format(now, "yyyyMMdd'T'HHmmss'Z'");
    
    let icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Your Company//Weekly Inspections//EN',
      'CALSCALE:GREGORIAN',
      'METHOD:PUBLISH'
    ].join('\r\n');

    inspections.forEach(inspection => {
      const startDateTime = format(inspection.date, "yyyyMMdd'T'090000");
      const endDateTime = format(inspection.date, "yyyyMMdd'T'100000");
      
      icsContent += '\r\n' + [
        'BEGIN:VEVENT',
        `UID:${inspection.id}@yourcompany.com`,
        `DTSTAMP:${timestamp}`,
        `DTSTART:${startDateTime}`,
        `DTEND:${endDateTime}`,
        `SUMMARY:${inspection.title}`,
        `DESCRIPTION:${inspection.type} at ${inspection.address}`,
        `LOCATION:${inspection.address}`,
        'STATUS:CONFIRMED',
        'END:VEVENT'
      ].join('\r\n');
    });

    icsContent += '\r\nEND:VCALENDAR';
    return icsContent;
  };

  // Get dates that have inspections
  const inspectionDates = weeklyInspections.map(inspection => inspection.date);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle>Weekly Inspections</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={exportToICS}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Export ICS
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            modifiers={{
              inspection: inspectionDates
            }}
            modifiersStyles={{
              inspection: {
                backgroundColor: '#f97316',
                color: 'white',
                borderRadius: '50%'
              }
            }}
            className="rounded-md border w-full"
            weekStartsOn={1}
            showOutsideDays={false}
          />
          
          <div className="space-y-2">
            <h4 className="text-sm font-medium">This Week's Schedule</h4>
            {weeklyInspections.length === 0 ? (
              <p className="text-sm text-muted-foreground">No inspections scheduled</p>
            ) : (
              <div className="space-y-2">
                {weeklyInspections.map(inspection => (
                  <div key={inspection.id} className="flex items-center justify-between p-2 border rounded-md">
                    <div>
                      <p className="text-sm font-medium">{inspection.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {format(inspection.date, 'MMM dd')} at {inspection.time}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {inspection.type}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
