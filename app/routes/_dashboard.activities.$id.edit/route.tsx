import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";

import * as material from "@material-tailwind/react";
const { Card, Typography } = material;

import {
  FindActivityQuery,
  UpdateActivityMutation,
  useFindActivityQuery,
  useUpdateActivityMutation,
  useAnalyzeActivityMutation,
  AnalyzeActivityMutation,
  ActivityUpdate,
} from "@app-types/graphql";
import { ActivityForm, ActivityFormData } from "~/components/ActivityForm";
import { DefaultSkeleton } from "~/components/DefaultSkeleton";

type ActivityEditFormData = ActivityFormData | null | undefined;

export default function ActivityEdit() {
  const { id } = useParams();
  if (id == null) throw new Error("id is null");

  const [isSaving, setIsSaving] = useState(false);

  const { data, loading, error } = useFindActivityQuery({
    variables: { id: id },
    fetchPolicy: "network-only",
  });

  const [activity, setActivity] = useState<ActivityEditFormData>(
    getEditData(data),
  );
  const [updateMethod] = useUpdateActivityMutation();
  const [analyzeActivityMethod] = useAnalyzeActivityMutation();

  useEffect(() => {
    setActivity(getEditData(data));
  }, [data]);

  if (isSaving) return <DefaultSkeleton />;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  if (!activity || !data) return <p>No data</p>;

  const title = data.activity.title;

  const onSubmit = function () {
    setIsSaving(true);

    updateMethod({
      variables: {
        input: {
          id: id,
          activityInput: getSubmitData(activity),
        },
      },
      onError: (error) => {
        setIsSaving(false);
        alert(error.message);
      },

      onCompleted: (data) => {
        setIsSaving(false);
        setActivity(getEditData(data.activityUpdate));
        alert("Saved!");
      },
    });
  };

  const onAnalyzeAndSave = function () {
    setIsSaving(true);
    analyzeActivityMethod({
      variables: {
        input: {
          id: id,
        },
      },
      onError: (error) => {
        setIsSaving(false);
        alert(error.message);
      },
      onCompleted: (data) => {
        setIsSaving(false);
        setActivity(getEditData(data.analyzeActivity));
        alert("Saved!");
      },
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Activity: {title}
      </Typography>
      <ActivityForm
        data={activity}
        updateData={setActivity}
        onSubmit={onSubmit}
        onAnalyzeAndSave={onAnalyzeAndSave}
      />
    </Card>
  );
}

function getEditData(
  data:
    | FindActivityQuery
    | UpdateActivityMutation["activityUpdate"]
    | AnalyzeActivityMutation["analyzeActivity"]
    | null
    | undefined,
): ActivityEditFormData | null {
  if (!data) {
    return null;
  }

  const { activity } = data;

  return {
    prompt: activity.prompt,
    result: activity.result,
  };
}

function getSubmitData(
  data: Exclude<ActivityEditFormData, null | undefined>,
): ActivityUpdate {
  const { id: _, ...input } = data;

  return input;
}
