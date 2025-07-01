import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const AccordionItem = ({ features }) => {
  return (
    <div>
      {features.map((feature, index) => (
        <Accordion key={index} className='font-[outfit]'>
          <AccordionSummary
            expandIcon={<ChevronDownIcon className="h-5 w-5 text-gray-500" />}
            aria-controls={`panel${index}-content`}
            id={`panel${index}-header`}
          >
            <Typography fontWeight="bold">{feature.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{feature.description}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default AccordionItem;
