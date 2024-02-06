import { VisionFilterLevel, useVisionsQuery } from "@app-types/graphql";
import {
  ArrowTopRightOnSquareIcon,
  DocumentChartBarIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  IconButton,
  Tooltip,
  Spinner,
  Tab,
  Tabs,
  TabsHeader,
  Select,
  Option,
} from "@material-tailwind/react";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useParams, useLocation, useNavigate } from "@remix-run/react";
import { useState } from "react";
import { authenticator } from "~/services/auth.server";
import { FetchContentButton } from "./components";
import { noNull } from "~/utils";

type FilterType = "all" | "personal" | "organizational";
const TABS: { label: string; value: FilterType }[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Personal",
    value: "personal",
  },
  {
    label: "Organizational",
    value: "organizational",
  },
];
const TABLE_HEAD_PERSONAL = [
  "Title",
  "Level",
  "Period",
  "Content Loaded?",
  "Content Url",
];

const ORG_TABLE_HEAD_ORGANIZATIONAL = [
  "Title",
  "Period",
  "Content Loaded?",
  "Content Url",
];

export let loader: LoaderFunction = async ({ request }) => {
  //we should completely change the following appraoch
  let user = await authenticator.isAuthenticated(request);
  if (!user) return redirect("/login");
  return null;
};

export default function Visions() {
  let { id: individualId } = useParams();

  const [filter, setFilter] = useState<FilterType>("all");

  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const [selectedCycle, setSelectedCycle] = useState<number>(
    Number(queryParams.get("cycleid") ?? 0),
  );

  const isPersonal = individualId != null;

  const { data, loading, error } = useVisionsQuery({
    variables: {
      fetchIndividualDetails: isPersonal,
      fetchIndividualId: individualId ?? "NoteUsed",
      individualId: individualId,
      cycleId: selectedCycle === 0 ? undefined : selectedCycle?.toString(),
      level:
        filter === "personal"
          ? VisionFilterLevel.PersonalOnly
          : filter === "organizational"
          ? VisionFilterLevel.OrganizationalOnly
          : undefined,
    },
    fetchPolicy: "network-only",
  });

  if (error) return <p>{JSON.stringify(error)}</p>;
  if (loading || data?.visions?.nodes == null)
    return <Spinner className="w-full" />;

  const pageTitle = data?.individual
    ? `${data?.individual.fullname ?? ""}'s visions`
    : "Organization's visions";

  const visions = data.visions.nodes.filter(noNull).map((node) => ({
    id: node.id,
    title: node.description ?? node.visionType.title,
    visionType: node.visionType?.title ?? "-",
    url: node.documentUrl,
    date: new Date(node.date),
    valid_from: new Date(node.cycle ? node.cycle.from : node.validFrom),
    valid_to: new Date(node.cycle ? node.cycle.to : node.validTo),
    hasContent: node.hasContent,
    cycleTitle: node.cycle?.title,
    isPersonalVision: node.organizationId ? false : true,
  }));

  const cycles = data.cycles?.nodes?.filter(noNull).map((node) => ({
    id: node.id,
    title: node.title,
  }));

  cycles?.unshift({ id: 0, title: "All Cycles" });

  const handle_cycle_change = (value: string | undefined) => {
    value = value ?? "0";
    setSelectedCycle(parseInt(value));

    if (value == "0") queryParams.delete("cycleid");
    else queryParams.set("cycleid", value);

    navigate({
      search: queryParams.toString(),
    });
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                {pageTitle}
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button className="flex items-center gap-3" size="sm">
                <DocumentChartBarIcon strokeWidth={2} className="h-4 w-4" />
                <Link to={"new"}>Add Vision</Link>
              </Button>
            </div>
          </div>
          {isPersonal ? (
            <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
              {" "}
              <Tabs value={filter} className="w-full md:w-max">
                <TabsHeader>
                  {TABS.map(({ label, value }) => (
                    <Tab
                      key={value}
                      value={value}
                      onClick={() => setFilter(value)}
                    >
                      &nbsp;&nbsp;{label}&nbsp;&nbsp;
                    </Tab>
                  ))}
                </TabsHeader>
              </Tabs>
            </div>
          ) : null}
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <Select
            size="lg"
            variant="static"
            value={selectedCycle.toString()}
            onChange={handle_cycle_change}
          >
            {cycles?.map(({ id, title }) => (
              <Option key={id} value={id?.toString()}>
                {title}
              </Option>
            ))}
          </Select>
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {(isPersonal
                  ? TABLE_HEAD_PERSONAL
                  : ORG_TABLE_HEAD_ORGANIZATIONAL
                ).map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {visions.map(
                (
                  {
                    title,
                    visionType,
                    id,
                    url,
                    hasContent,
                    valid_from,
                    valid_to,
                    cycleTitle,
                    isPersonalVision,
                  },
                  index,
                ) => {
                  const isLast = index === visions.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <img
                            src="/images/google-docs-icon.svg"
                            width="32"
                            alt="google doc"
                          />
                          <div className="flex flex-col">
                            <Link
                              to={`/visions/${id}/edit`}
                              className="flex items-center gap-1 hover:underline"
                            >
                              <Typography
                                color="blue-gray"
                                className="font-normal"
                              >
                                {title}
                              </Typography>
                            </Link>
                            <Typography
                              variant="small"
                              className="font-normal italic"
                            >
                              {visionType}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      {isPersonal ? (
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              variant="ghost"
                              size="sm"
                              value={
                                isPersonalVision ? "Personal" : "Organizational"
                              }
                              color={isPersonalVision ? "blue" : "gray"}
                            />
                          </div>
                        </td>
                      ) : null}
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {cycleTitle ? (
                              cycleTitle
                            ) : (
                              <>
                                {valid_from.toLocaleString("en-CA", {
                                  year: "numeric",
                                  month: "numeric",
                                  day: "numeric",
                                }) + " "}
                                to
                                {" " +
                                  valid_to.toLocaleString("en-CA", {
                                    year: "numeric",
                                    month: "numeric",
                                    day: "numeric",
                                  })}
                              </>
                            )}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={hasContent ? "Yes" : "No"}
                            color={hasContent ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <Link to={url!} target="_blank" rel="noreferrer">
                          <Tooltip content="Show document">
                            <IconButton variant="text">
                              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <FetchContentButton visionId={id?.toString()} />
                      </td>
                    </tr>
                  );
                },
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
