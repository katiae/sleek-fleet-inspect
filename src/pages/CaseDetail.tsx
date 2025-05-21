
import React from "react";
import { useParams } from "react-router-dom";
import { CaseManager } from "@/components/CaseManager";
import { CaseDetail } from "@/components/CaseDetail";
import { cases } from "@/lib/data";

const CaseDetailPage = () => {
  const { id } = useParams();
  const caseItem = cases.find((c) => c.id === id) || cases[0]; // Fallback to first case if not found

  // Force console log the address to help with debugging
  console.log("Case address:", caseItem.address);
  console.log("Case date:", caseItem.appointment?.date);

  return (
    <CaseManager>
      <CaseDetail caseItem={caseItem} />
    </CaseManager>
  );
};

export default CaseDetailPage;
