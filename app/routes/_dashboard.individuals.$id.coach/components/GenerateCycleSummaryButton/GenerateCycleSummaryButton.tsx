import {
  AdviceFragmentFragment,
  useGenerateCycleAdviceMutation,
} from "@app-types/graphql";
import { LightBulbIcon } from "@heroicons/react/24/outline";

import { CircularProgress, Button } from "@mui/material";

import { useState } from "react";

interface GenerateCycleSummaryButtonProps {
  cycleId: number;
  individualId: number;
  title: string;
  onSaving?: (
    isSaving: boolean,
    savedAdvice: AdviceFragmentFragment | null,
  ) => void;
}

export function GenerateCycleSummaryButton({
  cycleId,
  individualId,
  title,
  onSaving,
}: GenerateCycleSummaryButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [generateCycleAdviceMethod] = useGenerateCycleAdviceMutation();

  const changeIsSaving = (
    isSaving: boolean,
    generatedAdvice: AdviceFragmentFragment | null = null,
  ) => {
    setIsSaving(isSaving);
    onSaving?.(isSaving, generatedAdvice);
  };

  const onGenerateCycleSummary = function () {
    changeIsSaving(true);
    generateCycleAdviceMethod({
      variables: {
        cycleId: cycleId,
        individualId: individualId,
      },
      onError: (error) => {
        changeIsSaving(false);
        alert(error.message);
      },
      onCompleted: (data) => {
        changeIsSaving(false, data.generateCycleAdvice?.advice);
        alert("Advice Is ready!");
      },
    });
  };

  return (
    <Button
      size="small"
      className="float-right flex items-center gap-2"
      onClick={onGenerateCycleSummary}
    >
      {isSaving ? (
        <CircularProgress className="h-4 w-4" />
      ) : (
        <>
          <LightBulbIcon className="h-5 w-5 text-inherit" />
          {title}
        </>
      )}
    </Button>
  );
}
