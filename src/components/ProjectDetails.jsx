import React, { useState } from 'react';
import AccordionItem from './AccordianItem';

const ProjectDetails = ({ overview, features, challenges, outcome }) => {

  return (
    <div className="prose prose-lg max-w-3xl flex flex-col gap-y-10" style={{ padding: "16px 0px" }}>


      <section>
        <h3 className="font-semibold text-2xl font-[outfit]" style={{ marginBottom: "12px" }}>🔍 Overview</h3>
        <p>{overview}</p>
      </section>



      <section>
        <h3 className="font-semibold text-2xl font-[outfit]" style={{ marginBottom: "12px" }}>🌟 Key Features </h3>
        {console.log(features)}
        <AccordionItem features={features} />
      </section>




      {challenges && (
        <section>
          <h3 className="font-semibold mt-4">Challenges</h3>
          <p>{challenges}</p>
        </section>
      )}

      {outcome && (
        <section>
          <h3 className="font-semibold mt-4">Outcome</h3>
          <p>{outcome}</p>
        </section>
      )}
    </div>
  );
};

export default ProjectDetails;
