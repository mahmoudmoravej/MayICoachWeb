import { useAnalyzeActivityWithMinimumResultMutation } from "@app-types/graphql";
import { BoltIcon } from "@heroicons/react/24/solid";
import { Tooltip, IconButton, CircularProgress } from "@mui/material";
import { useState } from "react";

export function AnalyzeButton({
  activityId,
  isAnalyzed,
}: {
  activityId: string;
  isAnalyzed: boolean;
}) {
  const [isSaving, setIsSaving] = useState(false);
  const [analyzeActivityMethod] = useAnalyzeActivityWithMinimumResultMutation();

  const onAnalyzeAndSave = function () {
    setIsSaving(true);
    analyzeActivityMethod({
      variables: {
        input: {
          id: activityId,
        },
      },
      onError: (error) => {
        setIsSaving(false);
        alert(
          error.graphQLErrors && error.graphQLErrors.length > 0
            ? error.graphQLErrors[0].message
            : error.message,
        );
      },
      onCompleted: (data) => {
        setIsSaving(false);
      },
    });
  };

  return isAnalyzed ? (
    ""
  ) : (
    <Tooltip title="Analyze with AI & Save!">
      <IconButton size="small" onClick={onAnalyzeAndSave}>
        {isSaving ? (
          <CircularProgress className="h-4 w-4" />
        ) : (
          <BoltIcon strokeWidth={2} className="h-4 w-4" />
        )}
      </IconButton>
    </Tooltip>
  );
}
