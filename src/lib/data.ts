
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
};

export const cases: Case[] = [
  {
    id: "INS-2023-0012",
    address: "1234 Elm Street, Springfield, IL 62704",
    status: "NEW",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago"
  },
  {
    id: "INS-2023-0012",
    address: "1234 Elm Street, Springfield, IL 62704",
    status: "PENDING",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago"
  },
  {
    id: "INS-2023-0012",
    address: "1234 Elm Street, Springfield, IL 62704",
    status: "APPROVED",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago"
  },
  {
    id: "INS-2023-0012",
    address: "1234 Elm Street, Springfield, IL 62704",
    status: "REJECTED",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago"
  },
  {
    id: "INS-2023-0012",
    address: "1234 Elm Street, Springfield, IL 62704",
    status: "EXPIRED",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago"
  },
  {
    id: "INS-2023-0012",
    address: "1234 Elm Street, Springfield, IL 62704",
    status: "SUSPENDED",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago"
  },
  {
    id: "INS-2023-0012",
    address: "1234 Elm Street, Springfield, IL 62704",
    status: "UNDER REVIEW",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago"
  },
  {
    id: "INS-2023-0012",
    address: "1234 Elm Street, Springfield, IL 62704",
    status: "COMPLETED",
    type: "Full Inspection",
    owner: {
      type: "Private",
      name: "Jane Smith"
    },
    lastInspected: "Today, 5 mins ago"
  }
];
