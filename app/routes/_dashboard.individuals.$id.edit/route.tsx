import { Form, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import {
  useFindIndividualQuery,
  useUpdateIndividualMutation,
} from "@app-types/graphql";

export default function IndividualEdit() {
  const { id } = useParams();
  if (id == null) throw new Error("id is null");

  const { data, loading, error } = useFindIndividualQuery({
    variables: { id: id },
    fetchPolicy: "network-only",
  });

  const [individual, setIndividual] = useState(
    getInputValues(data?.individual),
  );
  const [updateMethod] = useUpdateIndividualMutation();

  useEffect(() => {
    setIndividual(getInputValues(data?.individual));
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  if (!individual) return <p>No data</p>;

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
        setIndividual(getInputValues(data.individualUpdate?.individual));
        alert("Saved!");
      },
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Modifying {individual.fullname}
      </Typography>
      <Form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
        <div className="mb-1 flex flex-col gap-6">
          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Id
          </Typography>
          <Input
            size="lg"
            placeholder="name@mail.com"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
            value={individual.id?.toString()}
            readOnly
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Fullname
          </Typography>
          <Input
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
            value={individual.fullname ?? ""}
            onChange={({ target }) => {
              setIndividual({ ...individual, fullname: target.value });
            }}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Job Title
          </Typography>
          <Input
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
            value={individual.jobTitle ?? ""}
            onChange={({ target }) => {
              setIndividual({ ...individual, jobTitle: target.value });
            }}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Github Handle
          </Typography>
          <Input
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
            value={individual.handleGithub ?? ""}
            onChange={({ target }) => {
              setIndividual({ ...individual, handleGithub: target.value });
            }}
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Google Handle
          </Typography>
          <Input
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
            value={individual.handleGoogle ?? ""}
            onChange={({ target }) => {
              setIndividual({ ...individual, handleGoogle: target.value });
            }}
          />
        </div>

        <Button className="mt-6" fullWidth onClick={onSubmit}>
          Save
        </Button>
      </Form>
    </Card>
  );
}

function getInputValues(
  individual?:
    | {
        id?: number | null;
        fullname?: string | null;
        handleGithub?: string | null;
        handleGoogle?: string | null;
        jobTitle?: string | null;
        jobLevelId?: string | null;
        managerId?: number | null;
        // userId?: string | null;
      }
    | undefined,
) {
  return {
    id: individual?.id,
    fullname: individual?.fullname,
    handleGithub: individual?.handleGithub,
    handleGoogle: individual?.handleGoogle,
    jobTitle: individual?.jobTitle,
    jobLevelId: individual?.jobLevelId,
    managerId: individual?.managerId,
    // userId: individual?.userId,
  };
}
