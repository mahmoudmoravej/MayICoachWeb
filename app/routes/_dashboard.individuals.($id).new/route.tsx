import { useNavigate, useParams } from "@remix-run/react";
import { useState } from "react";
import { Card, Typography } from "@material-tailwind/react";
import {
  useCreateIndividualMutation,
  useGetManagersQuery,
} from "@app-types/graphql";
import {
  IndividualForm,
  IndividualFormData,
} from "~/components/IndividualForm";

type IndividualCreateFormData = IndividualFormData & {
  isActive: boolean;
  isManager: boolean;
};

export default function IndividualCreate() {
  const { id: managerId } = useParams();
  const [individual, setIndividual] = useState<IndividualCreateFormData>({
    managerId: managerId ? parseInt(managerId) : null,
    isActive: true,
    isManager: false,
  });

  const { data, loading, error } = useGetManagersQuery({
    fetchPolicy: "network-only",
  });

  const [createMethod] = useCreateIndividualMutation();
  const nav = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  if (!individual || !data || !data.managers.nodes) return <p>No data</p>;

  const managers = data.managers.nodes.map((manager) => ({
    id: manager?.id.toString(),
    fullname: manager?.fullname,
  }));

  var onSubmit = function () {
    createMethod({
      variables: {
        input: {
          individualInput: individual,
        },
      },
      onError: (error) => {
        alert(error.message);
      },
      onCompleted: (data) => {
        nav(`/individuals/${data.individualCreate?.individual.id}/edit`);
      },
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        New buddy {individual.fullname}
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
