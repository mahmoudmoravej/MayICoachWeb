import { useCyclesQuery } from "@app-types/graphql";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";

import * as material from "@material-tailwind/react";
const {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Spinner,
} = material;

import { Link } from "@remix-run/react";
import { noNull } from "~/utils";
import { AssignMissedActivitiesButton } from "~/components/AssignMissedActivitiesButton";

const TABLE_HEAD = ["Title", "From", "To", ""];

export default function Cycles() {
  const pageTitle = "Cycles";
  const pageSubTitle = "";

  const { data, loading, error } = useCyclesQuery({
    fetchPolicy: "network-only",
  });

  if (error) return <p>{JSON.stringify(error)}</p>;
  if (loading || data?.cycles?.nodes == null)
    return <Spinner className="w-full" />;

  const cycles = data.cycles.nodes.filter(noNull).map((node) => ({
    id: node.id,
    title: node.title,
    from: new Date(node.from),
    to: new Date(node.to),
  }));

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              {pageTitle}
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              {pageSubTitle}
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
              <Link to="/cycles/new">Add cycle</Link>
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="w-full md:w-72">
            <Input
              label="Search"
              icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-scroll px-0">
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
            {cycles.map(({ id, title, from, to }, index) => {
              const isLast = index === cycles.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <Link
                          to={`/cycles/${id}/edit`}
                          className="flex items-center gap-1 hover:underline"
                        >
                          {title}
                        </Link>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {from?.toLocaleString("en-CA", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal opacity-70"
                      >
                        {to?.toLocaleString("en-CA", {
                          year: "numeric",
                          month: "numeric",
                          day: "numeric",
                        })}
                      </Typography>
                    </div>
                  </td>

                  <td className={classes}>
                    <AssignMissedActivitiesButton cycleId={id} />
                  </td>
                </tr>
              );
            })}
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
  );
}
