import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

import {
  FindVisionQuery,
  UpdateVisionMutation,
  useFindVisionQuery,
  useUpdateVisionMutation,
} from "@app-types/graphql";
import { VisionForm, VisionFormData } from "~/components/VisionForm";
import { getPureObject, noNull } from "~/utils";

type VisionEditFormData =
  | (VisionFormData & { id?: number | null })
  | null
  | undefined;

export default function VisionEdit() {
  const { id } = useParams();
  if (id == null) throw new Error("id is null");

  const { data, loading, error } = useFindVisionQuery({
    variables: {
      id: id,
    },
    fetchPolicy: "network-only",
  });

  const [vision, setVision] = useState<VisionEditFormData>(getEditData(data));
  const [updateMethod] = useUpdateVisionMutation();

  useEffect(() => {
    setVision(getEditData(data));
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  if (!vision || !data || !data.visionTypes.nodes || !data.cycles.nodes)
    return <p>No data</p>;

  const visionTypes = data.visionTypes.nodes
    .filter(noNull)
    .map((visionType) => ({
      id: visionType.id,
      title: visionType.title,
    }));

  const cycles = data.cycles.nodes.filter(noNull).map((cycle) => ({
    id: cycle.id,
    title: cycle.title,
    from: new Date(cycle.from),
    to: new Date(cycle.to),
  }));

  var onSubmit = function () {
    const { id: _, ...input } = { ...vision };
    const validityRange =
      vision.cycleId != null ? { validFrom: null, validTo: null } : {};
    updateMethod({
      variables: {
        input: {
          id: id,
          visionInput: { ...input, ...validityRange },
        },
      },
      onError: (error) => {
        alert(error.message);
      },

      onCompleted: (data) => {
        setVision(getEditData(data.visionUpdate));
        alert("Saved!");
      },
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Modifying{" "}
        {vision.isOrganizational
          ? "Organizational"
          : data.vision.individual?.fullname + "'s"}{" "}
        Vision: {getPartOfDescription(vision.description, 20)}
      </Typography>
      <VisionForm
        id={id}
        data={vision}
        updateData={setVision}
        onSubmit={onSubmit}
        visionTypes={visionTypes}
        cycles={cycles}
      />
    </Card>
  );
}

function getEditData(
  data:
    | FindVisionQuery
    | UpdateVisionMutation["visionUpdate"]
    | null
    | undefined,
): VisionEditFormData | null {
  if (!data) {
    return null;
  }

  const { visionType: _, individual: __, ...visionData } = data?.vision;
  return getPureObject(visionData);
}

function getPartOfDescription(
  description: string | null | undefined,
  length: number,
) {
  return description && description.length > length
    ? description.substring(0, length) + "..."
    : description;
}
