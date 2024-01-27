import { useGenerateCycleAdviceMutation } from "@app-types/graphql";
import { LightBulbIcon } from "@heroicons/react/24/outline";
import { Spinner, Button } from "@material-tailwind/react";

import { useState } from "react";

interface GenerateCycleSummaryButtonProps {
  cycleId: number;
  individualId: number;
  onSaving?: (isSaving: boolean) => void;
}

export function GenerateCycleSummaryButton({
  cycleId,
  individualId,
  onSaving,
}: GenerateCycleSummaryButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [generateCycleAdviceMethod] = useGenerateCycleAdviceMutation();

  const changeIsSaving = (isSaving: boolean) => {
    setIsSaving(isSaving);
    onSaving?.(isSaving);
  };

  var onGenerateCycleSummary = function () {
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
        changeIsSaving(false);
        alert("Advice Is ready!");
      },
    });
  };

  return (
    <Button
      size="sm"
      variant="text"
      className="flex items-center gap-2"
      onClick={onGenerateCycleSummary}
    >
      {isSaving ? (
        <Spinner className="h-4 w-4" />
      ) : (
        <>
          <LightBulbIcon className="h-5 w-5 text-inherit" />
          Analyze and coach...
        </>
      )}
    </Button>
  );
}
