import { useIndividualsQuery } from "@app-types/graphql";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  PencilIcon,
  UserPlusIcon,
  HomeIcon,
  MagnifyingGlassCircleIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Link, useLoaderData, useNavigate, useParams } from "@remix-run/react";
import { User } from "~/models/user";
import { authenticator } from "~/services/auth.server";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Name", "Level", "Role", ""];

export let loader: LoaderFunction = async ({ request }) => {
  //we should completely change the following appraoch
  let user = await authenticator.isAuthenticated(request);
  if (!user) return redirect("/login");
  else return { user };
};

function useUser() {
  const data = useLoaderData<{ user?: User }>();
  return data.user;
}

export default function Individuals() {
  let { id: managerId } = useParams();
  const user = useUser();

  console.log("user?.individual_id", user);
  if (managerId == "myteam" && user?.individual_id != null) {
    managerId = user?.individual_id.toString();
  }

  const { data, loading, error } = useIndividualsQuery({
    variables: {
      managerId: managerId ?? null,
    },
    fetchPolicy: "network-only",
  });
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{JSON.stringify(error)}</p>;
  if (data?.individuals?.nodes == null) return <p>no data</p>;

  const individuals = data.individuals.nodes.map((node) =>
    node == null
      ? {}
      : {
          id: node.id,
          name: node.fullname,
          jobTitle: node.jobTitle,
          jobLevelId: node.jobLevelId,
          isManager: node.isManager,
        },
  );

  return (
    <Card className="h-full w-full">
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-8 flex items-center justify-between gap-8">
          <div>
            <Typography variant="h5" color="blue-gray">
              People
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              See information about all people
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outlined" size="sm">
              view all
            </Button>
            <Button className="flex items-center gap-3" size="sm">
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
              <Link to="/individuals/new">Add member</Link>
            </Button>

            <Button
              className="flex items-center gap-3"
              size="sm"
              onClick={() => {
                navigate("/");
              }}
            >
              <HomeIcon strokeWidth={2} className="h-4 w-4" /> Home
            </Button>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
            <TabsHeader>
              {TABS.map(({ label, value }) => (
                <Tab key={value} value={value}>
                  &nbsp;&nbsp;{label}&nbsp;&nbsp;
                </Tab>
              ))}
            </TabsHeader>
          </Tabs>
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
            {individuals.map(
              ({ name, id, jobTitle, isManager, jobLevelId }, index) => {
                const isLast = index === individuals.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";

                return (
                  <tr key={id}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">
                        <Avatar
                          src="https://i.pravatar.cc/48"
                          alt={name ?? ""}
                          size="sm"
                        />
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {isManager ? (
                              <Link
                                to={`/individuals/${id}`}
                                className="flex items-center gap-1 hover:underline"
                              >
                                {name}
                                <MagnifyingGlassIcon
                                  strokeWidth={2}
                                  className="h-4 w-4"
                                />
                              </Link>
                            ) : (
                              name
                            )}
                          </Typography>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal opacity-70"
                          >
                            {jobTitle}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {jobLevelId}
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal opacity-70"
                        >
                          {jobLevelId}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Chip
                          variant="ghost"
                          size="sm"
                          value={isManager ? "Manager" : "IC"}
                          color={isManager ? "green" : "blue-gray"}
                        />
                      </div>
                    </td>

                    <td className={classes}>
                      <Link to={`/individuals/${id}/edit`}>
                        <Tooltip content="Edit User">
                          <IconButton variant="text">
                            <PencilIcon className="h-4 w-4" />
                          </IconButton>
                        </Tooltip>
                      </Link>
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
  );
}
