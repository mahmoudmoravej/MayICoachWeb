import { Form, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { ManagerInput, useCreateManagerMutation } from "@app-types/graphql";

export default function ManagerEdit() {
  const [manager, setManager] = useState<ManagerInput>({ Name: "", Id: 0 });
  const [createMethod] = useCreateManagerMutation();
  const nav = useNavigate();

  var onSubmit = function () {
    createMethod({
      variables: {
        name: manager.Name,
        id: manager.Id,
      },
    }).then((res) => {
      if (res.data?.managerCreate?.manager) {
        setManager(res.data.managerCreate.manager);
        nav("/managers");
      }
    });
  };

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray">
        New Manager: {manager.Name}
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
            onChange={({ target }) => {
              setManager({ ...manager, Id: parseInt(target.value) });
            }}
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
      </Form>
    </Card>
  );
}
