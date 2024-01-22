import { useParams } from "@remix-run/react";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
  Button,
  Card,
  CardBody,
  CardHeader,
  Spinner,
  Typography,
} from "@material-tailwind/react";

import { useCoachIndividualQuery } from "@app-types/graphql";
import { useState } from "react";
import { noNull } from "~/utils";

export default function IndividualCoach() {
  const { id } = useParams();
  if (id == null) throw new Error("id is null");
  const [open, setOpen] = useState(0);

  const { data, loading, error } = useCoachIndividualQuery({
    variables: { id: id },
    fetchPolicy: "network-only",
  });

  const individual = data?.individual;

  if (loading || data?.individual == null)
    return <Spinner className="w-full" />;

  if (error) return <p>{JSON.stringify(error)}</p>;
  if (!individual || !data) return <p>No data</p>;

  const handleOpen = (value: number) => setOpen(open === value ? 0 : value);

  const cyclesMarkup = individual.activeCycles?.nodes
    ?.filter(noNull)
    .map((node, idx) => (
      <Accordion
        key={idx}
        open={open === idx}
        className="mb-2 rounded-lg border border-blue-gray-100 px-4"
      >
        <AccordionHeader
          onClick={() => handleOpen(idx)}
          className={`border-b-0 transition-colors ${
            open === idx ? "text-blue-500 hover:!text-blue-700" : ""
          }`}
        >
          {node.title}
        </AccordionHeader>
        <AccordionBody className="flex flex-row space-x-4  pt-0 text-base font-normal">
          <Card>
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                Activities Summary
              </Typography>

              <Typography color="gray" className="mb-8 font-normal">
                Like so many organizations these days, Autodesk is a company in
                transition. It was until recently a traditional boxed software
                company selling licenses. Yet its own business model disruption
                is only part of the story
              </Typography>
              <a href="#" className="inline-block">
                <Button variant="text" className="flex items-center gap-2">
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <Typography variant="h6" color="gray" className="mb-4 uppercase">
                Expectations
              </Typography>

              <Typography color="gray" className="mb-8 font-normal">
                Like so many organizations these days, Autodesk is a company in
                transition. It was until recently a traditional boxed software
                company selling licenses. Yet its own business model disruption
                is only part of the story
              </Typography>
              <a href="#" className="inline-block">
                <Button variant="text" className="flex items-center gap-2">
                  Learn More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-4 w-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    />
                  </svg>
                </Button>
              </a>
            </CardBody>
          </Card>
        </AccordionBody>
      </Accordion>
    ));

  return (
    <>
      <Card color="transparent" shadow={false}>
        <Typography variant="h4" color="blue-gray">
          Coach {individual.fullname}!
        </Typography>
      </Card>
      {cyclesMarkup}
    </>
  );
}
