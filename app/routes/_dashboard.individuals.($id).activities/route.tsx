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
  CardContent,
  Chip,
  CardActions,
  IconButton,
  Tooltip,
  CircularProgress,
  Tab,
  Tabs,
  ListItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { Link, useParams, useLocation, useNavigate } from "@remix-run/react";
import { useState } from "react";

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

export default function Activities() {
  const { id: individualId } = useParams();
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
    return <CircularProgress className="w-full" />;

  const pageTitle = `${data?.individual.fullname ?? ""}'s activities`;

  const activities = data.activities.nodes.filter(noNull).map((node) => ({
    id: node.id,
    title: node.title ?? "Pull Request",
    url: node.channelActivityUrl,
    date: new Date(node.date),
    isAnalyzed: node.isAnalyzed,
    cycle: node.cycle?.title ?? "-",
    channelId: node.channelId,
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

  const handle_cycle_change = (event: SelectChangeEvent<string>) => {
    const value = event.target.value ?? "0";
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
                size="small"
                variant="outlined"
                onClick={() => setImportDialogOpen(true)}
              >
                <ArrowDownOnSquareStackIcon
                  strokeWidth={2}
                  className="h-4 w-4"
                />
                Import recent activities...
              </Button>
              <Button
                className="flex items-center gap-3"
                size="small"
                variant="outlined"
              >
                <ArrowDownOnSquareStackIcon
                  strokeWidth={2}
                  className="h-4 w-4"
                />
                Analyze remained activities...
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            {" "}
            <Tabs value={filter} className="w-full md:w-max">
              {TABS.map(({ label, value }) => (
                <Tab
                  key={value}
                  value={value}
                  onClick={() => setFilter(value)}
                  label={label}
                />
              ))}
            </Tabs>
          </div>
        </CardHeader>
        <CardContent className="overflow-scroll px-0">
          <Select
            size="small"
            variant="filled"
            value={selectedCycle.toString()}
            onChange={handle_cycle_change}
          >
            {cycles?.map(({ id, title }) => (
              <ListItem key={id} value={id?.toString()}>
                {title}
              </ListItem>
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
                      variant="body2"
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
                (
                  { title, id, url, isAnalyzed, date, cycle, channelId },
                  index,
                ) => {
                  const isLast = index === activities.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          {channelId == 1 ? (
                            <svg
                              width="24"
                              height="24"
                              aria-hidden="true"
                              viewBox="0 0 16 16"
                              version="1.1"
                              data-view-component="true"
                            >
                              <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z"></path>
                            </svg>
                          ) : (
                            <svg
                              width="24"
                              height="24"
                              data-view-component="true"
                              version="1.1"
                              viewBox="0 0 1792 1792"
                            >
                              <path d="M704 1216q0 40-12.5 82t-43 76-72.5 34-72.5-34-43-76-12.5-82 12.5-82 43-76 72.5-34 72.5 34 43 76 12.5 82zm640 0q0 40-12.5 82t-43 76-72.5 34-72.5-34-43-76-12.5-82 12.5-82 43-76 72.5-34 72.5 34 43 76 12.5 82zm160 0q0-120-69-204t-187-84q-41 0-195 21-71 11-157 11t-157-11q-152-21-195-21-118 0-187 84t-69 204q0 88 32 153.5t81 103 122 60 140 29.5 149 7h168q82 0 149-7t140-29.5 122-60 81-103 32-153.5zm224-176q0 207-61 331-38 77-105.5 133t-141 86-170 47.5-171.5 22-167 4.5q-78 0-142-3t-147.5-12.5-152.5-30-137-51.5-121-81-86-115q-62-123-62-331 0-237 136-396-27-82-27-170 0-116 51-218 108 0 190 39.5T603 419q147-35 309-35 148 0 280 32 105-82 187-121t189-39q51 102 51 218 0 87-27 168 136 160 136 398z"></path>
                            </svg>
                          )}
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
                              variant="body2"
                              className="font-normal italic"
                            >
                              {channelId == 1 ? "Contribution" : "Reviewed"}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="w-max">
                          <Chip
                            variant="outlined"
                            size="small"
                            label={isAnalyzed ? "Yes" : "No"}
                            color={isAnalyzed ? "success" : "default"}
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="body2"
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
                            variant="body2"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {cycle}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Link to={url ?? ""} target="_blank" rel="noreferrer">
                          <Tooltip title="Show PR">
                            <IconButton size="small">
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
        </CardContent>
        <CardActions className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="body2" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="small">
              Previous
            </Button>
            <Button variant="outlined" size="small">
              Next
            </Button>
          </div>
        </CardActions>
      </Card>
    </>
  );
}
