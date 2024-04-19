import { useAnalyzeActivityWithMinimumResultMutation } from "@app-types/graphql";
import { BoltIcon } from "@heroicons/react/24/solid";

import { default as material } from "@material-tailwind/react";

const { Tooltip, IconButton, Spinner } = material;
import { useState } from "react";

export function FetchContentButton({ visionId }: { visionId: string }) {
  const [isSaving, setIsSaving] = useState(false);
  const [analyzeActivityMethod] = useAnalyzeActivityWithMinimumResultMutation();

  const onAnalyzeAndSave = function () {
    setIsSaving(true);
    analyzeActivityMethod({
      variables: {
        input: {
          id: visionId,
        },
      },
      onError: (error) => {
        setIsSaving(false);
        alert(error.message);
      },
      onCompleted: (data) => {
        setIsSaving(false);
      },
    });
  };

  return (
    <Tooltip content="Fetch content!">
      <IconButton variant="text" onClick={onAnalyzeAndSave}>
        {isSaving ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <BoltIcon strokeWidth={2} className="h-4 w-4" />
        )}
      </IconButton>
    </Tooltip>
  );
}
