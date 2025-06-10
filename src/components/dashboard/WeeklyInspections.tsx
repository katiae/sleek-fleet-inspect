
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Calendar, ChevronLeft, ChevronRight, Bell } from "lucide-react";
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameDay, addMonths, subMonths, isSameMonth, isToday } from "date-fns";

interface Inspection {
  id: string;
  title: string;
  date: Date;
  time: string;
  address: string;
  type: string;
}

// Sample data for the month
const monthlyInspections: Inspection[] = [
  {
    id: "INS-2023-0020",
    title: "Vehicle Inspection - Toyota Camry",
    date: new Date(2025, 5, 7), // June 7, 2025
    time: "09:00",
    address: "42 Baker Street, London",
    type: "Full Inspection"
  },
  {
    id: "INS-2023-0021",
    title: "Emissions Test - Ford Focus",
    date: new Date(2025, 5, 12), // June 12, 2025
    time: "16:14",
    address: "17 Kensington Gardens, London",
    type: "Emissions Test"
  },
  {
    id: "INS-2023-0022",
    title: "Safety Inspection - BMW X5",
    date: new Date(2025, 5, 16), // June 16, 2025
    time: "11:15",
    address: "221B Baker Street, London",
    type: "Safety Check"
  },
  {
    id: "INS-2023-0023",
    title: "Brake Inspection",
    date: new Date(2025, 5, 16), // June 16, 2025
    time: "14:30",
    address: "456 Main Street, London",
    type: "Brake Check"
  },
  {
    id: "INS-2023-0024",
    title: "Engine Diagnostics",
    date: new Date(2025, 5, 28), // June 28, 2025
    time: "10:00",
    address: "789 Park Avenue, London",
    type: "Diagnostics"
  },
  {
    id: "INS-2023-0025",
    title: "Annual Inspection",
    date: new Date(2025, 5, 28), // June 28, 2025
    time: "15:45",
    address: "321 Oak Street, London",
    type: "Annual Check"
  }
];

const viewTypes = [
  { label: "Schedule", active: false },
  { label: "Day", active: false },
  { label: "Week", active: false },
  { label: "Month", active: true },
  { label: "Year", active: false }
];

export const WeeklyInspections = () => {
  const [currentDate, setCurrentDate] = useState(new Date(2025, 5, 1)); // June 2025

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const calendarStart = startOfWeek(monthStart, { weekStartsOn: 1 });
  const calendarEnd = endOfWeek(monthEnd, { weekStartsOn: 1 });
  const calendarDays = eachDayOfInterval({ start: calendarStart, end: calendarEnd });

  const exportToICS = () => {
    const icsContent = generateICSContent(monthlyInspections);
    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'monthly-inspections.ics';
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
      'PRODID:-//Your Company//Monthly Inspections//EN',
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

  const getInspectionsForDay = (day: Date) => {
    return monthlyInspections.filter(inspection => 
      isSameDay(inspection.date, day)
    );
  };

  const goToPreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-semibold">
              {format(currentDate, 'MMMM yyyy')}
            </h2>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={goToPreviousMonth}
                className="h-8 w-8"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={goToNextMonth}
                className="h-8 w-8"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* View Type Buttons */}
            <div className="flex items-center gap-1">
              {viewTypes.map((view) => (
                <Button
                  key={view.label}
                  variant={view.active ? "default" : "ghost"}
                  size="sm"
                  className={view.active ? "bg-black text-white hover:bg-black/90" : ""}
                >
                  {view.label}
                </Button>
              ))}
            </div>

            {/* Notification Bell */}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Bell className="h-4 w-4" />
            </Button>

            {/* Export ICS Button */}
            <Button
              onClick={exportToICS}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
            >
              <Download className="h-4 w-4" />
              Export ICS
            </Button>
          </div>
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-0 border border-gray-200 rounded-lg overflow-hidden">
          {/* Day Headers */}
          {weekDays.map((day) => (
            <div key={day} className="bg-gray-50 p-3 text-center text-sm font-medium text-gray-600 border-b border-gray-200">
              {day}
            </div>
          ))}

          {/* Calendar Days */}
          {calendarDays.map((day, index) => {
            const dayInspections = getInspectionsForDay(day);
            const isCurrentMonth = isSameMonth(day, currentDate);
            const isDayToday = isToday(day);

            return (
              <div
                key={day.toISOString()}
                className={`min-h-[120px] p-2 border-b border-r border-gray-200 last:border-r-0 ${
                  index >= calendarDays.length - 7 ? 'border-b-0' : ''
                } ${!isCurrentMonth ? 'bg-gray-50' : 'bg-white'}`}
              >
                <div className={`text-sm font-medium mb-2 ${
                  !isCurrentMonth ? 'text-gray-400' : isDayToday ? 'text-blue-600' : 'text-gray-900'
                }`}>
                  {format(day, 'd')}
                </div>
                
                <div className="space-y-1">
                  {dayInspections.slice(0, 2).map((inspection) => (
                    <div
                      key={inspection.id}
                      className="text-xs p-1 rounded bg-purple-100 text-purple-800 truncate"
                    >
                      {inspection.title.split(' - ')[0]}
                    </div>
                  ))}
                  {dayInspections.length > 2 && (
                    <div className="text-xs text-purple-600 cursor-pointer hover:underline">
                      See more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
