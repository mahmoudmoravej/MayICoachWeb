import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

import {
  FindActivityQuery,
  UpdateActivityMutation,
  useFindActivityQuery,
  useUpdateActivityMutation,
} from "@app-types/graphql";
import { ActivityForm, ActivityFormData } from "~/components/ActivityForm";

type ActivityEditFormData = ActivityFormData | null | undefined;

export default function ActivityEdit() {
  const { id } = useParams();
  if (id == null) throw new Error("id is null");

  const { data, loading, error } = useFindActivityQuery({
    variables: { id: id },
    fetchPolicy: "network-only",
  });

  const [activity, setActivity] = useState<ActivityEditFormData>(
    getEditData(data),
  );
  const [updateMethod] = useUpdateActivityMutation();

  useEffect(() => {
    setActivity(getEditData(data));
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  if (!activity || !data) return <p>No data</p>;

  const title = data.activity.title;

  var onSubmit = function () {
    const { ...input } = { ...activity };
    updateMethod({
      variables: {
        input: {
          id: id,
          activityInput: { ...input },
        },
      },
      onError: (error) => {
        alert(error.message);
      },

      onCompleted: (data) => {
        setActivity(getEditData(data.activityUpdate));
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
      />
    </Card>
  );
}

function getEditData(
  data:
    | FindActivityQuery
    | UpdateActivityMutation["activityUpdate"]
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
