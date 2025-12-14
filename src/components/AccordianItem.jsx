import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import './component.css';

const AccordionItem = ({ features }) => {
  return (
    <div className="cursor-pointer">  {/* Optional wrapper fallback */}
      {features.map((feature, index) => (
        <Accordion
          key={index}
          className="font-[outfit]"
          sx={{
            // Base cursor on the whole accordion (for non-summary areas)
            cursor: `url('/cursors/Link Select.cur'), pointer`,
            // Force on all descendants
            '& *': {
              cursor: `url('/cursors/Link Select.cur'), pointer !important`,
            },
          }}
        >
          <AccordionSummary
            expandIcon={
              <ChevronDownIcon
                className="h-5 w-5 text-gray-500"
                sx={{
                  cursor: `url('/cursors/Link Select.cur'), pointer !important`,
                }}
              />
            }
            sx={{
              // Most important: target the summary root and its content
              cursor: `url('/cursors/Link Select.cur'), pointer !important`,
              '& .MuiAccordionSummary-content': {
                cursor: `url('/cursors/Link Select.cur'), pointer !important`,
              },
              '&:hover': {
                cursor: `url('/cursors/Link Select.cur'), pointer !important`,
              },
              // Ensure all children inside summary inherit
              '& *': {
                cursor: `url('/cursors/Link Select.cur'), pointer !important`,
              },
            }}
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

export default React.memo(AccordionItem);