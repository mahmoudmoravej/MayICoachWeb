import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

import {
  FindOrganizationQuery,
  UpdateOrganizationMutation,
  useFindOrganizationQuery,
  useUpdateOrganizationMutation,
} from "@app-types/graphql";
import {
  OrganizationForm,
  OrganizationFormData,
} from "~/components/OrganizationForm";
import { getPureObject } from "~/utils";

type OrganizationEditFormData =
  | (OrganizationFormData & { id?: number | null })
  | null
  | undefined;

export default function OrganizationEdit() {
  const { id } = useParams();
  if (id == null) throw new Error("id is null");

  const { data, loading, error } = useFindOrganizationQuery({
    variables: { id: id },
    fetchPolicy: "network-only",
  });

  const [organization, setOrganization] = useState<OrganizationEditFormData>(
    getEditData(data),
  );
  const [updateMethod] = useUpdateOrganizationMutation();

  useEffect(() => {
    setOrganization(getEditData(data));
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  if (!organization || !data) return <p>No data</p>;

  var onSubmit = function () {
    const { id: _, ...input } = { ...organization };
    updateMethod({
      variables: {
        input: {
          id: id,
          organizationInput: { ...input },
        },
      },
      onError: (error) => {
        alert(error.message);
      },
      onCompleted: (data) => {
        setOrganization(getEditData(data.organizationUpdate));
        alert("Saved!");
      },
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Modifying {organization.name}
      </Typography>
      <OrganizationForm
        id={id}
        data={organization}
        updateData={setOrganization}
        onSubmit={onSubmit}
      />
    </Card>
  );
}

function getEditData(
  data:
    | FindOrganizationQuery
    | UpdateOrganizationMutation["organizationUpdate"]
    | null
    | undefined,
): OrganizationEditFormData | null {
  if (!data) {
    return null;
  }

  return getPureObject(data?.organization);
}
