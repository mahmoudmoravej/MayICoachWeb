import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Spinner,
} from "@material-tailwind/react";
import { useImportActivitiesMutation } from "@app-types/graphql";

export interface ImportModalProps {
  individualId: number;
  open: boolean;
  handleClose: (imported: boolean) => void;
}

export function ImportModal({
  open,
  handleClose,
  individualId,
}: ImportModalProps) {
  const [importing, setImporting] = useState(false);
  const [importMethod] = useImportActivitiesMutation();

  const handleImport = async () => {
    setImporting(true);

    importMethod({
      variables: {
        individualId: individualId,
      },
      onError: (error) => {
        setImporting(false);
        alert(error.message);
      },

      onCompleted: (data) => {
        setImporting(false);
        //
        alert(`Imported ${data.importActivities?.totalCount} activities!`);
        handleClose(true);
      },
    });
  };

  return (
    <>
      <Dialog
        open={open}
        handler={handleClose}
        size="md"
        dismiss={{ enabled: false }}
      >
        <DialogHeader>Import Activities</DialogHeader>
        <DialogBody className="gap-4">
          Activities are getting imported every 5 minutes. But, if you want to
          sync them manually, you can do it here. This will try to import the
          following activities:
          <ul className="m-5 list-disc">
            <li>Github Pull Request Contributions</li>
            <li>Github Reviews</li>
            <li>Github Issue Contributions</li>
            <li>1:1s from Google Calendar and Fellow</li>
            <li>Recorded meetings from Google Meet</li>
            <li>etc...</li>
          </ul>
        </DialogBody>
        <DialogFooter>
          <Button
            variant="text"
            color="red"
            onClick={() => handleClose(false)}
            className="mr-1"
          >
            <span>Cancel</span>
          </Button>
          <Button
            variant="gradient"
            color="green"
            onClick={handleImport}
            disabled={importing}
          >
            {importing ? (
              <Spinner className="h-4 w-4"></Spinner>
            ) : (
              <span>Import</span>
            )}
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
