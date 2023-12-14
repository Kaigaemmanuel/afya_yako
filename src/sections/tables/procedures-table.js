import React, { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { format } from "date-fns";
import { SeverityPill } from 'src/components/severity-pill';
import { toast } from "react-hot-toast";
import procedureService from "src/services/procedureService"; // Replace with actual path

const statusMap = {
  pending: "warning",
  approved: "success",
  // refunded: 'error'
};

export const ProceduresTable = (props) => {
  const { sx } = props;
  const [procedures, setProcedures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch procedures when component mounts
    procedureService
      .listProcedures()
      .then((data) => {
        setProcedures(data);
      })
      .catch((error) => {
        toast.error(`Error: ${error.message}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    // Show loading spinner while procedures are being fetched
    return <CircularProgress />;
  }

  if (procedures.length === 0) {
    // Show empty image if there are no procedures
    return (
      <Box textAlign="center" sx={sx}>
        <Typography variant="body2" color="textSecondary">
          No procedures found.
        </Typography>
        <img
          src="https://www.sketchappsources.com/resources/source-image/google-no-results-monster-fishing.png"
          alt="Empty state"
          style={{ width: "100%", height: "auto", maxWidth: "400px" }}
        />
      </Box>
    );
  }

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Procedure Id</TableCell>
          <TableCell>Type</TableCell>
          <TableCell>Personnel</TableCell>
          <TableCell>Patient</TableCell>
          <TableCell>Room</TableCell>
          <TableCell sortDirection="desc">Date</TableCell>
          <TableCell>Status</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {procedures.map((procedure) => {
          const createAtDate = new Date(procedure.createdAt);
          // Get the user's timezone using Intl.DateTimeFormat
          const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          // Format the date in the user's timezone with the desired format
          const formattedDate = createAtDate.toLocaleDateString("en-US", {
            timeZone: userTimeZone,
            day: "numeric",
            month: "numeric",
            year: "numeric",
          });

          return (
            <TableRow hover key={procedure.id}>
              <TableCell>{procedure.id}</TableCell>
              <TableCell>{procedure.procedureType}</TableCell>
              <TableCell>{procedure.personnel}</TableCell>
              <TableCell>
                {procedure.patient.firstName} {procedure.patient.lastName}
              </TableCell>
              <TableCell>{procedure.room}</TableCell>
              <TableCell>{formattedDate}</TableCell>
              <TableCell>
                <SeverityPill color={statusMap[procedure.status]}>{procedure.status}</SeverityPill>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

ProceduresTable.prototype = {
  sx: PropTypes.object,
};
