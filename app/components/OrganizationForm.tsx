import { Form } from "@remix-run/react";
import {
  Input,
  Typography,
  Radio,
  Card,
  List,
  ListItem,
  CardBody,
  Textarea,
} from "@material-tailwind/react";

import { OrganizationUpdate } from "@app-types/graphql";
import { ChangeEventHandler } from "react";
import { Button } from "@mui/material";

export type OrganizationFormData = Omit<OrganizationUpdate, "aiEngines"> & {
  isPersonal: boolean;
  isSystem: boolean;
  systemAiEngineUsedPromptTokens: number;
  systemAiEngineUsedCompletionTokens: number;
  systemAiEngineMaxTokens: number;
} & {
  aiEngines:
    | { id: number; title: string; settings: string }[]
    | null
    | undefined;
};

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
        <Form className="mb-2 mt-8 w-80 max-w-screen-lg sm:w-auto">
          <div className="mb-1 flex flex-col gap-6">
            {!organization.isPersonal && !organization.isSystem && (
              <>
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
                  readOnly={organization.isSystem}
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
                  value={organization.ownerEmail ?? ""}
                  readOnly={organization.isSystem}
                  onChange={({ target }) => {
                    updateData({ ...organization, ownerEmail: target.value });
                  }}
                />
              </>
            )}
            {!organization.isSystem && (
              <>
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
              </>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Github API Key
            </Typography>

            <Card>
              <List>
                {!organization.isSystem && (
                  <ListItem className="p-0">
                    <Radio
                      name="github_token"
                      label="system default"
                      crossOrigin={undefined}
                      value={true.toString()}
                      checked={organization.useSystemGithubToken}
                      onChange={onUseSystemDefaultGithubToken}
                    />
                  </ListItem>
                )}
                <ListItem className="p-0">
                  <Radio
                    name="github_token"
                    label="custom: "
                    labelProps={{
                      className: "text-nowrap",
                    }}
                    crossOrigin={undefined}
                    value={false.toString()}
                    checked={!organization.useSystemGithubToken}
                    onChange={onUseSystemDefaultGithubToken}
                  />
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
                </ListItem>
              </List>
            </Card>

            <Typography variant="h6" color="blue-gray" className="-mb-3">
              AI Engines Settings
            </Typography>
            {!organization.isSystem && (
              <Card>
                <List>
                  <ListItem className="p-0">
                    <Radio
                      name="ai_engine"
                      label={
                        <div>
                          <Typography color="blue-gray" className="font-medium">
                            system default
                          </Typography>
                          {!organization.isSystem && (
                            <Typography
                              variant="small"
                              color="gray"
                              className="font-normal italic"
                            >
                              consumed{" "}
                              {(
                                organization.systemAiEngineUsedCompletionTokens +
                                organization.systemAiEngineUsedPromptTokens
                              ).toLocaleString()}{" "}
                              of{" "}
                              {organization.systemAiEngineMaxTokens.toLocaleString()}{" "}
                              allowed tokens.
                            </Typography>
                          )}
                        </div>
                      }
                      crossOrigin={undefined}
                      value={true.toString()}
                      checked={organization.useSystemAiEngine}
                      onChange={onUseSystemAiEngine}
                    />
                  </ListItem>
                  <ListItem className="p-0">
                    <Radio
                      name="ai_engine"
                      label="custom"
                      crossOrigin={undefined}
                      value={false.toString()}
                      checked={!organization.useSystemAiEngine}
                      onChange={onUseSystemAiEngine}
                    />
                  </ListItem>
                </List>
              </Card>
            )}
            {!organization.useSystemAiEngine && (
              <>
                {organization?.aiEngines?.map(({ id, title, settings }) => (
                  <div key={id}>
                    <Card>
                      <CardBody>
                        <Typography color="blue-gray" variant="h6">
                          {title}
                        </Typography>
                        <Textarea
                          size="lg"
                          className=" h-48 !border-t-blue-gray-200 focus:!border-t-gray-900"
                          resize={true}
                          rows={15}
                          labelProps={{
                            className: "before:content-none after:content-none",
                          }}
                          value={formatJson(settings)}
                          onChange={({ target }) => {
                            const aiEngines = [
                              ...(organization.aiEngines ?? []),
                            ];
                            const currentEngine = aiEngines.find(
                              (o) => o.id == id,
                            );
                            if (currentEngine)
                              currentEngine.settings = target.value;

                            updateData({
                              ...organization,
                              aiEngines,
                            });
                          }}
                        />
                      </CardBody>
                    </Card>
                  </div>
                ))}
              </>
            )}
          </div>
          <Button variant="contained" fullWidth onClick={onSubmit}>
            Save
          </Button>
        </Form>
      </div>
      <div className="mt-6  w-96"></div>
    </div>
  );
}

function formatJson(json?: string | null) {
  if (json == null) return "";
  try {
    return JSON.stringify(JSON.parse(json), null, 2);
  } catch {
    return json;
  }
}
