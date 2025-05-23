
export type CaseStatus = 
  "NEW" | 
  "PENDING" | 
  "APPROVED" | 
  "REJECTED" | 
  "EXPIRED" | 
  "SUSPENDED" | 
  "UNDER REVIEW" | 
  "COMPLETED";

export type Case = {
  id: string;
  address: string;
  status: CaseStatus;
  type: string;
  owner: {
    type: string;
    name: string;
  };
  lastInspected: string;
  vehicle?: {
    make: string;
    model: string;
    year: string;
    vin: string;
    licensePlate: string;
  };
  mechanic?: {
    name: string;
    id: string;
    specialization: string;
    contact: string;
  };
  customer?: {
    name: string;
    phone: string;
    email: string;
    preferredContact: string;
  };
  appointment?: {
    date: string;
    time: string;
    duration: string;
    status: string;
  };
  job?: {
    type: string;
    description: string;
    estimatedCost: string;
    parts: string[];
  };
  access?: {
    instructions: string;
    restrictions: string;
    contactPerson: string;
    contactPhone: string;
  };
};

export const cases: Case[] = [
  {
    id: "INS-2023-0012",
    address: "42 Baker Street, London, NW1 6XE",
    status: "NEW",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago",
    vehicle: {
      make: "Toyota",
      model: "Camry",
      year: "2019",
      vin: "4T1BF1FK5CU123456",
      licensePlate: "ABC-1234"
    },
    mechanic: {
      name: "Mike Johnson",
      id: "MEC-4567",
      specialization: "Engine Diagnostics",
      contact: "mike.j@example.com"
    },
    customer: {
      name: "Jane Smith",
      phone: "(555) 123-4567",
      email: "jane.smith@example.com",
      preferredContact: "Email"
    },
    appointment: {
      date: "2025-05-23",
      time: "10:30 AM",
      duration: "2 hours",
      status: "Confirmed"
    },
    job: {
      type: "Maintenance",
      description: "Regular 50,000 mile maintenance check and oil change",
      estimatedCost: "$350.00",
      parts: ["Oil filter", "Air filter", "Cabin filter"]
    },
    access: {
      instructions: "Park in visitor spot and check in at front desk",
      restrictions: "No access after 5:00 PM",
      contactPerson: "Building Manager",
      contactPhone: "(555) 987-6543"
    }
  },
  {
    id: "INS-2023-0013",
    address: "17 Kensington Gardens, London, W8 4PX",
    status: "PENDING",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago",
    appointment: {
      date: "2025-05-25",
      time: "09:00 AM",
      duration: "1.5 hours",
      status: "Scheduled"
    }
  },
  {
    id: "INS-2023-0014",
    address: "221B Baker Street, London, NW1 6XE",
    status: "APPROVED",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago",
    appointment: {
      date: "2025-05-21",
      time: "14:15 PM",
      duration: "2 hours",
      status: "Completed"
    }
  },
  {
    id: "INS-2023-0015",
    address: "10 Downing Street, London, SW1A 2AA",
    status: "REJECTED",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago",
    appointment: {
      date: "2025-05-20",
      time: "11:30 AM",
      duration: "1 hour",
      status: "Cancelled"
    }
  },
  {
    id: "INS-2023-0016",
    address: "20 Mayfair Avenue, London, W1J 8LT",
    status: "EXPIRED",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago",
    appointment: {
      date: "2025-04-15",
      time: "10:00 AM",
      duration: "2 hours",
      status: "Expired"
    }
  },
  {
    id: "INS-2023-0017",
    address: "15 Notting Hill Gate, London, W11 3JQ",
    status: "SUSPENDED",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago",
    appointment: {
      date: "2025-05-28",
      time: "13:45 PM",
      duration: "2 hours",
      status: "On Hold"
    }
  },
  {
    id: "INS-2023-0018",
    address: "30 St Mary Axe, London, EC3A 8EP",
    status: "UNDER REVIEW",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago",
    appointment: {
      date: "2025-05-26",
      time: "15:00 PM",
      duration: "1.5 hours",
      status: "Under Review"
    }
  },
  {
    id: "INS-2023-0019",
    address: "5 Covent Garden, London, WC2E 8RF",
    status: "COMPLETED",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago",
    appointment: {
      date: "2025-05-18",
      time: "09:30 AM",
      duration: "2 hours",
      status: "Completed"
    }
  }
];
