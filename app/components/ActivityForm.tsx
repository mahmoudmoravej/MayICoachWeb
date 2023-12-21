import { Form } from "@remix-run/react";
import {
  Button,
  Typography,
  Textarea,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { BoltIcon } from "@heroicons/react/24/solid";

import { ActivityUpdate } from "@app-types/graphql";

export type ActivityFormData = ActivityUpdate & { id?: number };

export interface ActivityFormProps<T extends ActivityFormData> {
  data: T;
  updateData: (data: T) => void;
  onSubmit: () => void;
}

export function ActivityForm<T extends ActivityFormData>({
  data: activity,
  updateData,
  onSubmit,
}: ActivityFormProps<T>) {
  return (
    <Form>
      <div className="mb-1 flex flex-row gap-6">
        <div className="flex w-1/2 flex-row items-end gap-2 ">
          <div className="flex-1">
            <Typography variant="h6" color="blue-gray">
              Prompt
            </Typography>
            <Textarea
              size="lg"
              className=" h-48 !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={activity.prompt ?? ""}
              onChange={({ target }) => {
                updateData({ ...activity, prompt: target.value });
              }}
            />
          </div>
          <div>
            <Tooltip content="Analyze activity with AI">
              <IconButton variant="text" className="rounded-full">
                <BoltIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </div>
        </div>
        <div className="w-1/2">
          <Typography variant="h6" color="blue-gray">
            Result
          </Typography>
          <Textarea
            size="lg"
            className="h-48 !border-t-blue-gray-200 focus:!border-t-gray-900"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            value={activity.result ?? ""}
            onChange={({ target }) => {
              updateData({ ...activity, result: target.value });
            }}
          />
        </div>
      </div>
      <Button className="mt-6" fullWidth onClick={onSubmit}>
        Save
      </Button>
    </Form>
  );
}
