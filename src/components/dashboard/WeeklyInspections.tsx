
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight } from "lucide-react";
import { format, startOfWeek, endOfWeek, eachDayOfInterval, addWeeks, subWeeks, isSameDay, parseISO } from "date-fns";

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
    time: "09:00",
    address: "42 Baker Street, London",
    type: "Full Inspection"
  },
  {
    id: "INS-2023-0021",
    title: "Emissions Test - Ford Focus",
    date: new Date(2025, 4, 28), // May 28, 2025 (Wednesday)
    time: "16:14",
    address: "17 Kensington Gardens, London",
    type: "Emissions Test"
  },
  {
    id: "INS-2023-0022",
    title: "Safety Inspection - BMW X5",
    date: new Date(2025, 4, 30), // May 30, 2025 (Friday)
    time: "11:15",
    address: "221B Baker Street, London",
    type: "Safety Check"
  }
];

// Generate time slots from 8:00 to 19:00
const timeSlots = Array.from({ length: 12 }, (_, i) => {
  const hour = i + 8;
  return `${hour.toString().padStart(2, '0')}:00`;
});

export const WeeklyInspections = () => {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const weekStart = startOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekEnd = endOfWeek(currentWeek, { weekStartsOn: 1 });
  const weekDays = eachDayOfInterval({ start: weekStart, end: weekEnd });

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

  const getInspectionForTimeSlot = (day: Date, time: string) => {
    return weeklyInspections.find(inspection => 
      isSameDay(inspection.date, day) && inspection.time.startsWith(time.split(':')[0])
    );
  };

  const goToPreviousWeek = () => {
    setCurrentWeek(subWeeks(currentWeek, 1));
  };

  const goToNextWeek = () => {
    setCurrentWeek(addWeeks(currentWeek, 1));
  };

  const goToToday = () => {
    setCurrentWeek(new Date());
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="flex items-center gap-4">
          <CardTitle>
            {format(weekStart, 'MMM yyyy')}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={goToPreviousWeek}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={goToToday}>
              Today
            </Button>
            <Button variant="outline" size="sm" onClick={goToNextWeek}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
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
        <div className="border rounded-lg overflow-hidden">
          {/* Header with days */}
          <div className="grid grid-cols-8 border-b bg-muted/30">
            <div className="p-2 text-xs font-medium text-muted-foreground border-r">
              {/* Empty cell for time column */}
            </div>
            {weekDays.map((day) => (
              <div key={day.toISOString()} className="p-2 text-center border-r last:border-r-0">
                <div className="text-xs font-medium text-muted-foreground">
                  {format(day, 'EEE')} {format(day, 'd')}
                </div>
              </div>
            ))}
          </div>

          {/* Time slots grid */}
          <div className="max-h-96 overflow-y-auto">
            {timeSlots.map((time) => (
              <div key={time} className="grid grid-cols-8 border-b last:border-b-0 min-h-[60px]">
                {/* Time column */}
                <div className="p-2 text-xs text-muted-foreground border-r bg-muted/10 flex items-start">
                  {time}
                </div>
                
                {/* Day columns */}
                {weekDays.map((day) => {
                  const inspection = getInspectionForTimeSlot(day, time);
                  return (
                    <div key={day.toISOString()} className="p-1 border-r last:border-r-0 relative">
                      {inspection && (
                        <div className="bg-orange-50 border border-orange-100 text-orange-700 text-xs p-1 rounded text-center h-full flex flex-col justify-center">
                          <div className="font-medium truncate">
                            {inspection.title.split(' - ')[0]}
                          </div>
                          <div className="text-orange-500 truncate">
                            {inspection.title.split(' - ')[1]}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
