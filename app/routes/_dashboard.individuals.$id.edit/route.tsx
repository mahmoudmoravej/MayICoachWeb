import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

import {
  FindIndividualQuery,
  IndividualUpdate,
  UpdateIndividualMutation,
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
    getEditData(data),
  );
  const [updateMethod] = useUpdateIndividualMutation();

  useEffect(() => {
    setIndividual(getEditData(data));
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
    updateMethod({
      variables: {
        input: {
          id: id,
          individualInput: getSubmitData(individual),
        },
      },
      onError: (error) => {
        alert(error.message);
      },

      onCompleted: (data) => {
        setIndividual(getEditData(data.individualUpdate));
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
        id={id}
        data={individual}
        updateData={setIndividual}
        managers={managers}
        onSubmit={onSubmit}
      />
    </Card>
  );
}

function getEditData(
  data:
    | FindIndividualQuery
    | UpdateIndividualMutation["individualUpdate"]
    | null
    | undefined,
): IndividualEditFormData | null {
  if (!data) {
    return null;
  }

  return getPureObject(data?.individual);
}

function getSubmitData(
  individual: Exclude<IndividualEditFormData, null | undefined>,
): IndividualUpdate {
  const { id: _, ...input } = individual;

  return input;
}
