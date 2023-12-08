import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

import {
  useFindIndividualQuery,
  useUpdateIndividualMutation,
} from "@app-types/graphql";
import {
  IndividualForm,
  IndividualFormData,
} from "~/components/IndividualForm";
import { getPureObject } from "~/utils";

type IndividualEditFormData =
  | (IndividualFormData & { id?: number | null })
  | null
  | undefined;

export default function IndividualEdit() {
  const { id } = useParams();
  if (id == null) throw new Error("id is null");

  const { data, loading, error } = useFindIndividualQuery({
    variables: { id: id },
    fetchPolicy: "network-only",
  });

  const [individual, setIndividual] = useState<IndividualEditFormData>(
    getPureObject(data?.individual),
  );
  const [updateMethod] = useUpdateIndividualMutation();

  useEffect(() => {
    setIndividual(getPureObject(data?.individual));
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  if (!individual || !data || !data.managers.nodes) return <p>No data</p>;

  const managers = data.managers.nodes
    .filter((m) => m?.id.toString() != id)

    .map((m) => ({
      id: m?.id.toString(),
      fullname: m?.fullname,
    }));

  var onSubmit = function () {
    const { id: _, ...input } = { ...individual };
    updateMethod({
      variables: {
        input: {
          id: id,
          individualInput: { ...input },
        },
      },
      onError: (error) => {
        alert(error.message);
      },

      onCompleted: (data) => {
        setIndividual(data.individualUpdate?.individual);
        alert("Saved!");
      },
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Modifying {individual.fullname}
      </Typography>
      <IndividualForm
        data={individual}
        updateData={setIndividual}
        managers={managers}
        onSubmit={onSubmit}
      />
    </Card>
  );
}