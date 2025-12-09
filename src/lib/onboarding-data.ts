
export type OnboardingTaskType = 
  | "aml"
  | "identity_check"
  | "ownership_check"
  | "source_of_funds"
  | "document_upload"
  | "e_signatures"
  | "complete_payment";

export type OnboardingTask = {
  id: OnboardingTaskType;
  name: string;
  description: string;
  documentChecklist?: string[];
};

export type ProductType = 
  | "Sale"
  | "Purchase"
  | "Remortgage"
  | "Transfer of Equity";

export type OnboardingFlow = {
  id: string;
  name: string;
  productType: ProductType;
  tasks: OnboardingTaskType[];
  documentChecklist?: string[];
  createdAt: string;
  status: "Active" | "Draft" | "Archived";
};

export const availableTasks: OnboardingTask[] = [
  {
    id: "aml",
    name: "AML Check",
    description: "Anti-money laundering verification"
  },
  {
    id: "identity_check",
    name: "Identity Check",
    description: "Verify home mover identity documents"
  },
  {
    id: "ownership_check",
    name: "Ownership Check",
    description: "Verify property ownership details"
  },
  {
    id: "source_of_funds",
    name: "Source of Funds",
    description: "Verify the source of funds for the transaction"
  },
  {
    id: "document_upload",
    name: "Document Upload",
    description: "Upload and share required documents"
  },
  {
    id: "e_signatures",
    name: "E-Signatures",
    description: "Collect electronic signatures on documents"
  },
  {
    id: "complete_payment",
    name: "Complete Payment",
    description: "Process transaction payment"
  }
];

export const productTypes: ProductType[] = [
  "Sale",
  "Purchase",
  "Remortgage",
  "Transfer of Equity"
];

export const sampleOnboardingFlows: OnboardingFlow[] = [
  {
    id: "onb-001",
    name: "Standard Purchase Flow",
    productType: "Purchase",
    tasks: ["aml", "identity_check", "source_of_funds", "document_upload", "e_signatures", "complete_payment"],
    documentChecklist: ["Proof of ID", "Proof of Address", "Bank Statements"],
    createdAt: "2025-01-15",
    status: "Active"
  },
  {
    id: "onb-002",
    name: "Sale Onboarding",
    productType: "Sale",
    tasks: ["aml", "identity_check", "ownership_check", "document_upload", "e_signatures"],
    documentChecklist: ["Title Deeds", "Energy Performance Certificate"],
    createdAt: "2025-02-20",
    status: "Active"
  },
  {
    id: "onb-003",
    name: "Remortgage Quick Flow",
    productType: "Remortgage",
    tasks: ["aml", "identity_check", "source_of_funds", "e_signatures"],
    createdAt: "2025-03-10",
    status: "Draft"
  }
];
