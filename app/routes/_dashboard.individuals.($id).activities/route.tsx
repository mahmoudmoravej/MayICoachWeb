import { useIndividualActivitiesQuery } from "@app-types/graphql";
import {
  ArrowTopRightOnSquareIcon,
  ArrowDownOnSquareStackIcon,
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
import { AnalyzeButton, ImportModal } from "./components";
import { noNull } from "~/utils";

type FilterType = "all" | "analyzed" | "not-analyzed";
const TABS: { label: string; value: FilterType }[] = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Analyzed",
    value: "analyzed",
  },
  {
    label: "Raw",
    value: "not-analyzed",
  },
];
const TABLE_HEAD = ["Activity", "Analyzed?", "Date", "Cycle", ""];

export let loader: LoaderFunction = async ({ request }) => {
  //we should completely change the following appraoch
  let user = await authenticator.isAuthenticated(request);
  if (!user) return redirect("/login");
  return null;
};

export default function Activities() {
  let { id: individualId } = useParams();
  if (individualId == null) throw new Error("id is null");

  const [filter, setFilter] = useState<FilterType>("all");
  const [importDialogOpen, setImportDialogOpen] = useState(false);

  const { search } = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(search);
  const [selectedCycle, setSelectedCycle] = useState<number>(
    Number(queryParams.get("cycleid") ?? 0),
  );

  const { data, loading, error, refetch } = useIndividualActivitiesQuery({
    variables: {
      individualId: individualId,
      isAnalyzed: filter == "all" ? undefined : filter === "analyzed",
      cycleId: selectedCycle === 0 ? undefined : selectedCycle?.toString(),
    },
    fetchPolicy: "network-only",
  });

  if (error) return <p>{JSON.stringify(error)}</p>;
  if (loading || data?.activities?.nodes == null)
    return <Spinner className="w-full" />;

  const pageTitle = `${data?.individual.fullname ?? ""}'s activities`;

  const activities = data.activities.nodes.filter(noNull).map((node) => ({
    id: node.id,
    title: node.title ?? "Pull Request",
    url: node.channelActivityUrl,
    date: new Date(node.date),
    isAnalyzed: node.isAnalyzed,
    cycle: node.cycle?.title ?? "-",
  }));

  const cycles = data.cycles?.nodes?.filter(noNull).map((node) => ({
    id: node.id,
    title: node.title,
  }));

  cycles?.unshift({ id: 0, title: "All Cycles" });

  const handleImportModalClose = (imported: boolean) => {
    setImportDialogOpen(false);
    if (imported) {
      refetch();
    }
  };

  const importDialog = (
    <ImportModal
      individualId={parseInt(individualId)}
      open={importDialogOpen}
      handleClose={handleImportModalClose}
    />
  );

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
      {importDialog}
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                {pageTitle}
              </Typography>
            </div>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button
                className="flex items-center gap-3"
                size="sm"
                variant="outlined"
                onClick={() => setImportDialogOpen(true)}
              >
                <ArrowDownOnSquareStackIcon
                  strokeWidth={2}
                  className="h-4 w-4"
                />
                Import recent activities...
              </Button>
            </div>
          </div>
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
                {TABLE_HEAD.map((head) => (
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
              {activities.map(
                ({ title, id, url, isAnalyzed, date, cycle }, index) => {
                  const isLast = index === activities.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <svg
                            height="32"
                            aria-hidden="true"
                            viewBox="0 0 16 16"
                            version="1.1"
                            width="32"
                            data-view-component="true"
                          >
                            <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                          </svg>
                          <div className="flex flex-col">
                            <Link
                              to={`/activities/${id}/edit`}
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
                              Pull Request Contribution
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="ghost"
                            size="sm"
                            value={isAnalyzed ? "Yes" : "No"}
                            color={isAnalyzed ? "green" : "blue-gray"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {date?.toLocaleString("en-CA", {
                              year: "numeric",
                              month: "numeric",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "numeric",
                              hour12: false,
                            })}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {cycle}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Link to={url!} target="_blank" rel="noreferrer">
                          <Tooltip content="Show PR">
                            <IconButton variant="text">
                              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                            </IconButton>
                          </Tooltip>
                        </Link>
                        <AnalyzeButton
                          activityId={id?.toString()}
                          isAnalyzed={isAnalyzed}
                        />
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
