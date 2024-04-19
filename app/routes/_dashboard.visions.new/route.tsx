import { useNavigate, useParams } from "@remix-run/react";
import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import {
  useCreateVisionMutation,
  useGetVisionTypesAndCyclesQuery,
} from "@app-types/graphql";
import { VisionForm, VisionFormData } from "~/components/VisionForm";
import { noNull } from "~/utils";

type VisionCreateFormData = VisionFormData;

export default function VisionCreate() {
  const { id: individualId } = useParams();
  const isPersonal = individualId != null;

  const { data, loading, error } = useGetVisionTypesAndCyclesQuery({
    variables: {
      individualId: isPersonal ? individualId.toString() : "",
      isPersonal: isPersonal,
    },
    fetchPolicy: "network-only",
  });

  const [vision, setVision] = useState<VisionCreateFormData>({
    visionTypeId: 1,
    isOrganizational: !isPersonal,
    individualId: isPersonal ? parseInt(individualId) : null,
  });

  const [createMethod] = useCreateVisionMutation();
  const nav = useNavigate();

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

  const onSubmit = function () {
    const validityRange =
      vision.cycleId != null ? { validFrom: null, validTo: null } : {};
    createMethod({
      variables: {
        input: {
          visionInput: { ...vision, ...validityRange },
        },
      },
      onError: (error) => {
        alert(error.message);
      },
      onCompleted: (data) => {
        nav(`/visions/${data.visionCreate?.vision.id}/edit`);
      },
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        New{" "}
        {vision.isOrganizational
          ? "Organizational"
          : data.individual?.fullname + "'s"}{" "}
        Vision: {getPartOfDescription(vision.description, 20)}
      </Typography>
      <VisionForm
        data={vision}
        updateData={setVision}
        onSubmit={onSubmit}
        visionTypes={visionTypes}
        cycles={cycles}
      />
    </Card>
  );
}

function getPartOfDescription(
  description: string | null | undefined,
  length: number,
) {
  return description && description.length > length
    ? description.substring(0, length) + "..."
    : description;
}
