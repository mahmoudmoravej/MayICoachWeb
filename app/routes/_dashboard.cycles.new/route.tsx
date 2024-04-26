import { useNavigate } from "@remix-run/react";
import { useState } from "react";
import * as material from "@material-tailwind/react";
const { Card, Typography } = material;

import { useCreateCycleMutation } from "@app-types/graphql";
import { CycleForm, CycleFormData } from "~/components/CycleForm";

type CycleCreateFormData = CycleFormData;

export default function CycleCreate() {
  const [cycle, setCycle] = useState<CycleCreateFormData>({
    title: "",
    from: "",
    to: "",
  });

  const [createMethod] = useCreateCycleMutation();
  const nav = useNavigate();

  const onSubmit = function () {
    createMethod({
      variables: {
        input: {
          cycleInput: cycle,
        },
      },
      onError: (error) => {
        alert(error.message);
      },
      onCompleted: (data) => {
        nav(`/cycles/${data.cycleCreate?.cycle.id}/edit`);
      },
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        New cycle: {cycle.title}
      </Typography>
      <CycleForm data={cycle} updateData={setCycle} onSubmit={onSubmit} />
    </Card>
  );
}
