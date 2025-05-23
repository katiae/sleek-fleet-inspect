
import React from "react";
import { useParams } from "react-router-dom";
import { CaseManager } from "@/components/CaseManager";
import { CaseDetail } from "@/components/CaseDetail";
import { cases } from "@/lib/data";

const CaseDetailPage = () => {
  const { id } = useParams();
  const caseItem = cases.find((c) => c.id === id);

  // Force console log the case details to help with debugging
  console.log("Looking for case ID:", id);
  console.log("Found case:", caseItem);
  console.log("Case address:", caseItem?.address);
  console.log("Case date:", caseItem?.appointment?.date);

  // If no case is found, show a not found message
  if (!caseItem) {
    return (
      <CaseManager>
        <div className="text-center py-8">
          <h1 className="text-2xl font-semibold text-gray-800">Case not found</h1>
          <p className="text-gray-500 mt-2">The case with ID "{id}" could not be found.</p>
        </div>
      </CaseManager>
    );
  }

  return (
    <CaseManager>
      <CaseDetail caseItem={caseItem} />
    </CaseManager>
  );
};

export default CaseDetailPage;
