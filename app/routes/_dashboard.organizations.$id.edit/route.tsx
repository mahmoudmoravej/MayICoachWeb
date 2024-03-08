import { useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Card, Typography } from "@material-tailwind/react";

import {
  FindOrganizationQuery,
  OrganizationUpdate,
  UpdateOrganizationMutation,
  useFindOrganizationQuery,
  useUpdateOrganizationMutation,
} from "@app-types/graphql";
import {
  OrganizationForm,
  OrganizationFormData,
} from "~/components/OrganizationForm";
import { getPureObject, noNull } from "~/utils";

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
    updateMethod({
      variables: {
        input: {
          id: id,
          organizationInput: getSubmitData(organization),
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
        Modifying{" "}
        {organization.isPersonal
          ? "Account"
          : organization.isSystem
            ? "System"
            : "Organization"}{" "}
        Settings
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

  const { owner, aiEngines: detailedAiEngines, ...orgData } = data.organization;

  const aiEngines = detailedAiEngines?.nodes
    ?.filter(noNull)
    .map(({ id, settings, type: { title } }) => ({
      id: id,
      title,
      settings: settings ?? "",
    }));

  return getPureObject({ ...orgData, aiEngines, ownerEmail: owner?.email });
}

function getSubmitData(
  data: Exclude<OrganizationEditFormData, null | undefined>,
): OrganizationUpdate {
  const { id: _, isPersonal: __, isSystem: ___, aiEngines, ...input } = data;

  return {
    ...input,
    aiEngines: aiEngines?.map(({ id, settings }) => ({
      id,
      settings,
    })),
  };
}
