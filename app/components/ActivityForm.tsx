import { Form } from "@remix-run/react";

import * as material from "@material-tailwind/react";
const { Button, Typography, Textarea } = material;

import { BoltIcon } from "@heroicons/react/24/solid";

import { ActivityUpdate } from "@app-types/graphql";

export type ActivityFormData = ActivityUpdate & { id?: number };

export interface ActivityFormProps<T extends ActivityFormData> {
  data: T;
  updateData: (data: T) => void;
  onSubmit: () => void;
  onAnalyzeAndSave: () => void;
}

export function ActivityForm<T extends ActivityFormData>({
  data: activity,
  updateData,
  onSubmit,
  onAnalyzeAndSave,
}: ActivityFormProps<T>) {
  return (
    <Form>
      <div className="mb-1 flex flex-row gap-6">
        <div className="w-1/2">
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
      <Button
        className="mt-6 flex items-center justify-center"
        fullWidth
        onClick={onAnalyzeAndSave}
      >
        <BoltIcon strokeWidth={2} className="h-4 w-4" />
        Analyze with AI & Save!
      </Button>
    </Form>
  );
}
