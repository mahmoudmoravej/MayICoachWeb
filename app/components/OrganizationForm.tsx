import { Form } from "@remix-run/react";
import {
  Input,
  Button,
  Typography,
  Radio,
  Card,
  List,
  ListItem,
} from "@material-tailwind/react";

import { OrganizationUpdate } from "@app-types/graphql";
import { ChangeEventHandler } from "react";

export type OrganizationFormData = OrganizationUpdate;

export interface OrganizationFormProps<T extends OrganizationFormData> {
  id?: string;
  data: T;
  updateData: (data: T) => void;
  onSubmit: () => void;
}

export function OrganizationForm<T extends OrganizationFormData>({
  id,
  data: organization,
  updateData,
  onSubmit,
}: OrganizationFormProps<T>) {
  const onUseSystemDefaultGithubToken: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    updateData({
      ...organization,
      useSystemGithubToken: target.value === "true",
    });
  };

  const onUseSystemAiEngine: ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    updateData({
      ...organization,
      useSystemAiEngine: target.value === "true",
    });
  };
  return (
    <div className="flex">
      <div className="w-1/2">
        <Form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
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
              value={organization.name ?? ""}
              onChange={({ target }) => {
                updateData({ ...organization, name: target.value });
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Owner
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
              value={organization.ownerUserId ?? ""}
              onChange={({ target }) => {
                updateData({ ...organization, ownerUserId: target.value });
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Github Organizations (comma separated)
            </Typography>
            <Input
              size="lg"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              crossOrigin={undefined}
              value={organization.githubOrgs ?? ""}
              onChange={({ target }) => {
                updateData({ ...organization, githubOrgs: target.value });
              }}
            />
            <Card>
              <List>
                <ListItem className="p-0">
                  <Radio
                    name="github_token"
                    label="Use system Default Github API key"
                    crossOrigin={undefined}
                    value={true.toString()}
                    defaultChecked={organization.useSystemGithubToken}
                    onChange={onUseSystemDefaultGithubToken}
                  />
                </ListItem>
                <ListItem className="p-0">
                  <Radio
                    name="github_token"
                    label="Use My Github API Key"
                    crossOrigin={undefined}
                    value={false.toString()}
                    defaultChecked={!organization.useSystemGithubToken}
                    onChange={onUseSystemDefaultGithubToken}
                  />
                </ListItem>
              </List>
            </Card>
            {!organization.useSystemGithubToken && (
              <>
                <Typography variant="h6" color="blue-gray" className="-mb-3">
                  Github API Key
                </Typography>
                <Input
                  size="lg"
                  className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                  labelProps={{
                    className: "before:content-none after:content-none",
                  }}
                  crossOrigin={undefined}
                  value={
                    organization.useSystemGithubToken
                      ? ""
                      : organization.githubToken ?? ""
                  }
                  disabled={organization.useSystemGithubToken}
                  onChange={({ target }) => {
                    updateData({
                      ...organization,
                      githubToken: target.value,
                    });
                  }}
                />
              </>
            )}

            <Card>
              <List>
                <ListItem className="p-0">
                  <Radio
                    name="ai_engine"
                    label="Use system Default AI Engine"
                    crossOrigin={undefined}
                    value={true.toString()}
                    defaultChecked={organization.useSystemAiEngine}
                    onChange={onUseSystemAiEngine}
                  />
                </ListItem>
                <ListItem className="p-0">
                  <Radio
                    name="ai_engine"
                    label="Use My AI Engine"
                    crossOrigin={undefined}
                    value={false.toString()}
                    defaultChecked={!organization.useSystemAiEngine}
                    onChange={onUseSystemAiEngine}
                  />
                </ListItem>
              </List>
            </Card>
          </div>

          <Button className="mt-6" fullWidth onClick={onSubmit}>
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
}
