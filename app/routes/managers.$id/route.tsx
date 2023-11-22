import { Form, useNavigate, useParams } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import {
  useFindManagerQuery,
  useUpdateManagerMutation,
} from "@app-types/graphql";

export default function ManagerEdit() {
  const { id } = useParams();
  const { data, loading, error } = useFindManagerQuery({
    variables: { id: id ?? "0" },
    fetchPolicy: "network-only",
  });
  const [manager, setManager] = useState(data?.manager);
  const [updateMethod] = useUpdateManagerMutation();
  const nav = useNavigate();

  useEffect(() => {
    setManager(data?.manager);
  }, [data]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  if (!manager) return <p>No data</p>;

  var onSubmit = function () {
    updateMethod({
      variables: {
        id: manager.Id.toString(),
        name: manager.Name,
        newId: manager.Id,
      },

      onCompleted: (data) => {
        setManager(data.managerUpdate?.manager);
      },
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        Modifying {manager.Name}
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
            value={manager.Id}
            readOnly
          />

          <Typography variant="h6" color="blue-gray" className="-mb-3">
            Name
          </Typography>
          <Input
            size="lg"
            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            crossOrigin={undefined}
            value={manager.Name}
            onChange={({ target }) => {
              setManager({ ...manager, Name: target.value });
            }}
          />
        </div>

        <Button className="mt-6" fullWidth onClick={onSubmit}>
          Save
        </Button>
        <Button
          className="mt-6"
          fullWidth
          onClick={() => {
            nav("/managers");
          }}
        >
          Goto Managers
        </Button>
      </Form>
    </Card>
  );
}
