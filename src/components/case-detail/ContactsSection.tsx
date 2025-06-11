
import React from "react";
import { User, Wrench, Key } from "lucide-react";
import { Case } from "@/lib/data";

interface ContactsSectionProps {
  caseItem: Case;
}

export const ContactsSection: React.FC<ContactsSectionProps> = ({ caseItem }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Case Contacts</h2>
      
      <div className="space-y-3">
        {caseItem.customer && (
          <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
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
          </div>
        )}
        
        {caseItem.mechanic && (
          <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
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
          </div>
        )}
        
        {caseItem.access && caseItem.access.contactPerson && (
          <div className="flex items-start gap-4 p-3 rounded-lg border border-gray-200 hover:bg-gray-50">
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
          </div>
        )}
      </div>
    </div>
  );
};
