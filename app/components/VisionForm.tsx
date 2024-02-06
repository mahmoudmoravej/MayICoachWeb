import { Form } from "@remix-run/react";
import {
  Input,
  Button,
  Typography,
  Textarea,
  Select,
  Option,
  Switch,
} from "@material-tailwind/react";

import { VisionUpdate } from "@app-types/graphql";
import DatePickerInput from "./DatePickerInput";

export type VisionFormData = VisionUpdate;

export interface VisionFormProps<T extends VisionFormData> {
  id?: string;
  data: T;
  visionTypes: { id: number; title: string }[];
  cycles: { id: number; title: string; from: Date; to: Date }[];
  updateData: (data: T) => void;
  onSubmit: () => void;
}

export function VisionForm<T extends VisionFormData>({
  id,
  data: vision,
  visionTypes,
  cycles,
  updateData,
  onSubmit,
}: VisionFormProps<T>) {
  return (
    <div className="flex">
      <div className="w-1/2">
        <Form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Content Type
            </Typography>
            <Select
              size="lg"
              label=""
              value={vision.visionTypeId.toString()}
              onChange={(selectedValue) => {
                updateData({
                  ...vision,
                  visionTypeId: parseInt(selectedValue!),
                });
              }}
            >
              {visionTypes?.map(({ id, title }) => (
                <Option key={id} value={id?.toString()}>
                  {title}
                </Option>
              ))}
            </Select>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Description
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
              value={vision.description ?? ""}
              onChange={({ target }) => {
                updateData({ ...vision, description: target.value });
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Document Url
            </Typography>
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                size="lg"
                className=" !border-t-blue-gray-200 pr-20 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                crossOrigin={undefined}
                value={vision.documentUrl ?? ""}
                onChange={({ target }) => {
                  updateData({ ...vision, documentUrl: target.value });
                }}
              />
              <Button
                size="sm"
                color={vision.documentUrl ? "gray" : "blue-gray"}
                disabled={!vision.documentUrl}
                className="!absolute right-1 top-1 rounded"
              >
                Fetch!
              </Button>
            </div>
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Content{" "}
              {vision.documentUrl != null && vision.documentUrl?.trim() !== ""
                ? "(Read Only)"
                : ""}
            </Typography>
            <Textarea
              size="lg"
              className=" h-48 !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              value={vision.content ?? ""}
              disabled={
                vision.documentUrl != null && vision.documentUrl?.trim() !== ""
              }
              onChange={({ target }) => {
                updateData({ ...vision, content: target.value });
              }}
            />

            <Switch
              label={"Cycle bounded"}
              crossOrigin={undefined}
              defaultChecked
              checked={vision.cycleId != null}
              onChange={(target) => {
                const firstCycle = cycles[0];
                const periodFields =
                  vision.cycleId != null
                    ? {
                        cycleId: null,
                      }
                    : {
                        cycleId: firstCycle.id,
                        validFrom: firstCycle.from,
                        validTo: firstCycle.to,
                      };
                updateData({
                  ...vision,
                  ...periodFields,
                });
              }}
            />
            {vision.cycleId != null && (
              <>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Cycle
                </Typography>
                <Select
                  size="lg"
                  label=""
                  value={vision.cycleId.toString()}
                  hidden={vision.cycleId == null}
                  onChange={(selectedValue) => {
                    const cycle = cycles.find(
                      (o) => o.id?.toString() == selectedValue,
                    );
                    updateData({
                      ...vision,
                      cycleId: cycle?.id,
                      validFrom: cycle?.from,
                      validTo: cycle?.to,
                    });
                  }}
                >
                  {cycles?.map(({ id, title }) => (
                    <Option key={id} value={id?.toString()}>
                      {title}
                    </Option>
                  ))}
                </Select>
              </>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              From Date
            </Typography>
            <DatePickerInput
              size="lg"
              value={vision.validFrom ?? ""}
              disabled={vision.cycleId != null}
              onChange={(value) => {
                updateData({ ...vision, validFrom: value });
              }}
            />

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              To Date
            </Typography>
            <DatePickerInput
              size="lg"
              value={vision.validTo ?? ""}
              disabled={vision.cycleId != null}
              onChange={(value) => {
                updateData({ ...vision, validTo: value });
              }}
            />
          </div>

          <Button className="mt-6" fullWidth onClick={onSubmit}>
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
}
