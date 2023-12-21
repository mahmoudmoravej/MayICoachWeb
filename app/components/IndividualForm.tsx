import { Form, Link } from "@remix-run/react";
import {
  Input,
  Button,
  Typography,
  Switch,
  Select,
  Option,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

import { IndividualUpdate } from "@app-types/graphql";

export type IndividualFormData = IndividualUpdate;

export interface IndividualFormProps<T extends IndividualFormData> {
  id?: string;
  data: T;
  updateData: (data: T) => void;
  managers: { id?: string | null; fullname?: string | null }[];
  onSubmit: () => void;
}

export function IndividualForm<T extends IndividualFormData>({
  id,
  data: individual,
  updateData,
  managers,
  onSubmit,
}: IndividualFormProps<T>) {
  return (
    <div className="flex">
      <div className="w-1/2">
        <Form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
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
                updateData({ ...individual, fullname: target.value });
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
                updateData({ ...individual, jobTitle: target.value });
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Reports to
            </Typography>
            <Select
              size="lg"
              label=""
              value={individual.managerId?.toString()}
              onChange={(selectedValue) => {
                updateData({
                  ...individual,
                  managerId: parseInt(selectedValue!),
                });
              }}
            >
              {managers?.map(({ id, fullname }) => (
                <Option key={id} value={id?.toString()}>
                  {fullname}
                </Option>
              ))}
            </Select>
            <Switch
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              label={
                <Typography variant="h6" color="blue-gray">
                  Manager?
                </Typography>
              }
              color="green"
              crossOrigin={undefined}
              checked={individual.isManager ?? false}
              onChange={({ target }) => {
                updateData({ ...individual, isManager: target.checked });
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
                updateData({ ...individual, handleGithub: target.value });
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
                updateData({ ...individual, handleGoogle: target.value });
              }}
            />
          </div>

          <Button className="mt-6" fullWidth onClick={onSubmit}>
            Save
          </Button>
        </Form>
      </div>
      <div className="w-1/2">
        {id && (
          <Card className="mt-6 w-96">
            <CardBody>
              <Typography variant="h5" color="blue-gray" className="mb-2">
                User Activities
              </Typography>
              <Typography>
                you can see all user activities through channls like Github,
                Meetings, Slack, etc.
              </Typography>
            </CardBody>
            <CardFooter className="pt-0">
              <Link to={`/individuals/${individual.id}/activities`}>
                <Button
                  size="sm"
                  variant="text"
                  className="flex items-center gap-2"
                >
                  Show Activities
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  );
}
