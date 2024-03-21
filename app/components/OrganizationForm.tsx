import { Form } from "@remix-run/react";
import { Radio } from "@material-tailwind/react";

import { OrganizationUpdate } from "@app-types/graphql";
import { ChangeEventHandler } from "react";

import {
  Button,
  TextField as Input,
  TextareaAutosize,
  Card,
  CardContent,
  List,
  ListItem,
  Typography,
  CardHeader,
} from "@mui/material";

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
                <Input
                  label="Name"
                  value={organization.name ?? ""}
                  InputProps={{
                    readOnly: organization.isSystem,
                  }}
                  onChange={({ target }) => {
                    updateData({ ...organization, name: target.value });
                  }}
                />

                <Input
                  label="Owner Email"
                  value={organization.ownerEmail ?? ""}
                  InputProps={{
                    readOnly: organization.isSystem,
                  }}
                  onChange={({ target }) => {
                    updateData({ ...organization, ownerEmail: target.value });
                  }}
                />
              </>
            )}
            {!organization.isSystem && (
              <>
                <Input
                  label="Github Organizations (comma separated)"
                  value={organization.githubOrgs ?? ""}
                  onChange={({ target }) => {
                    updateData({ ...organization, githubOrgs: target.value });
                  }}
                />
              </>
            )}

            <Card variant="outlined">
              <CardHeader subheader="Github API Key" />
              <CardContent>
                <List>
                  {!organization.isSystem && (
                    <ListItem>
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
                  <ListItem>
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
              </CardContent>
            </Card>

            {!organization.isSystem && (
              <Card variant="outlined">
                <CardHeader subheader="AI Engines Settings" />
                <CardContent>
                  <List>
                    <ListItem>
                      <Radio
                        name="ai_engine"
                        label={
                          <div>
                            <Typography
                              color="blue-gray"
                              className="font-medium"
                            >
                              system default
                            </Typography>
                            {!organization.isSystem && (
                              <Typography
                                variant="body2"
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
                    <ListItem>
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
                </CardContent>
              </Card>
            )}
            {!organization.useSystemAiEngine && (
              <>
                {organization?.aiEngines?.map(({ id, title, settings }) => (
                  <div key={id}>
                    <Card variant="outlined">
                      <CardHeader subheader={title} />
                      <CardContent>
                        <TextareaAutosize
                          className=" w-full"
                          maxRows={15}
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
                      </CardContent>
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
