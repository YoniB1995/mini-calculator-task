import React, { useContext } from "react";
import { HistoryContext } from "../../context/HistoryContext";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AppsIcon from "@mui/icons-material/Apps";

export default function SimpleAccordion() {
  const { state } = useContext(HistoryContext);

  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <AppsIcon />
          <Typography>Check Calculator History</Typography>
        </AccordionSummary>
        <AccordionDetails style={{ maxHeight: "8rem", overflow: "auto" }}>
          <Typography style={{ textAlign: "center" }}>
            {state.length > 0 ? (
              <ul style={{ listStyleType: "none" }}>
                {state
                  .filter((history) => typeof history !== "number")
                  .map((history, i) => (
                    <li key={`${history}${i}`}>{history}</li>
                  ))}
              </ul>
            ) : (
              "No History Included"
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
