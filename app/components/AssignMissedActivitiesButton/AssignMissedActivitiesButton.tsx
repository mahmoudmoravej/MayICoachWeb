import { useAssignActivitiesMutation } from "@app-types/graphql";
import { BoltIcon } from "@heroicons/react/24/solid";

import * as material from "@material-tailwind/react";
const { Tooltip, IconButton, Spinner, Button } = material;

import { useState } from "react";

interface AssignMissedActivitiesButtonProps {
  cycleId: number;
  mode?: "column" | "button";
}

export function AssignMissedActivitiesButton({
  cycleId,
  mode = "column",
}: AssignMissedActivitiesButtonProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [assignMissedActivitiesMethod] = useAssignActivitiesMutation();

  const onAssign = function () {
    setIsSaving(true);
    assignMissedActivitiesMethod({
      variables: {
        input: {
          cycleId: cycleId,
        },
      },
      onError: (error) => {
        setIsSaving(false);
        alert(error.message);
      },
      onCompleted: (data) => {
        setIsSaving(false);
        alert(
          !data.assignMissedCycleActivities?.totalCount
            ? "No missed activities. It is updated already!"
            : `Successfully assigned ${data.assignMissedCycleActivities?.totalCount} activities!`,
        );
      },
    });
  };

  return mode == "column" ? (
    <Tooltip content="Assign missed activities to this cycle">
      <IconButton variant="text" onClick={onAssign}>
        {isSaving ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <BoltIcon strokeWidth={2} className="h-4 w-4" />
        )}
      </IconButton>
    </Tooltip>
  ) : (
    <Button
      size="sm"
      variant="text"
      className="flex items-center gap-2"
      onClick={onAssign}
    >
      {isSaving ? <Spinner className="h-4 w-4" /> : "Assign missed activities"}
    </Button>
  );
}
