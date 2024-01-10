import { Form, Link } from "@remix-run/react";
import {
  Input,
  Button,
  Typography,
  Card,
  CardBody,
  CardFooter,
  Textarea,
} from "@material-tailwind/react";

import { CycleUpdate } from "@app-types/graphql";
import DatePickerInput from "./DatePickerInput";
import { AssignMissedActivitiesButton } from "./AssignMissedActivitiesButton";

export type CycleFormData = CycleUpdate;

export interface CycleFormProps<T extends CycleFormData> {
  id?: string;
  data: T;
  updateData: (data: T) => void;
  onSubmit: () => void;
}

export function CycleForm<T extends CycleFormData>({
  id,
  data: cycle,
  updateData,
  onSubmit,
}: CycleFormProps<T>) {
  return (
    <div className="flex">
      <div className="w-1/2">
        <Form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Title
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
              value={cycle.title ?? ""}
              onChange={({ target }) => {
                updateData({ ...cycle, title: target.value });
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Textarea
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={cycle.description ?? ""}
              onChange={({ target }) => {
                updateData({ ...cycle, description: target.value });
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              From Date
            </Typography>
            <DatePickerInput
              size="lg"
              value={cycle.from ?? ""}
              onChange={(value) => {
                updateData({ ...cycle, from: value });
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              To Date
            </Typography>
            <DatePickerInput
              size="lg"
              value={cycle.to ?? ""}
              onChange={(value) => {
                updateData({ ...cycle, to: value });
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
          <>
            <Card className="mt-6 w-96">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  Cycle's Activities
                </Typography>
                <Typography>
                  you can see or update all user' activities for this cycle.
                </Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <Link to={`/cycles/${id}/activities`}>
                  <Button
                    size="sm"
                    variant="text"
                    className="flex items-center gap-2"
                  >
                    Show Activities
                  </Button>
                </Link>
                <AssignMissedActivitiesButton
                  cycleId={Number.parseInt(id)}
                  mode="button"
                />
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
