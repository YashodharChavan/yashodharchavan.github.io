import React, { useState } from 'react';
import AccordionItem from './AccordianItem';

const ProjectDetails = ({ overview, features, challenges, outcome, teamwork }) => {

  return (
    <div className="prose prose-lg max-w-3xl flex flex-col gap-y-10" style={{ padding: "16px 0px" }}>


      <section>
        <h3 className="font-semibold text-2xl font-[outfit]" style={{ marginBottom: "12px" }}>🔍 Overview</h3>
        <p>{overview}</p>
      </section>



      <section>
        <h3 className="font-semibold text-2xl font-[outfit]" style={{ marginBottom: "12px" }}>🌟 Key Features </h3>
        <AccordionItem features={features} />
      </section>



      {challenges && (
        <section>
          <h3 className="font-semibold text-2xl font-[outfit]" >🎯 Challenges Faced </h3>
          {challenges.map((challenge, index) => {
            return (
              <div key={index}>
                <h3 className="font-semibold text-xl font-[outfit] cursor-pointer" style={{ marginTop: "12px" }}>{challenge.title}</h3>
                <p>{challenge.description}</p>
              </div>
            )
          })}
        </section>
      )}

      {teamwork && (
        <section>
          <h3 className="font-semibold text-2xl font-[outfit]" >👥 Team Work </h3>
          <p>{teamwork.information}</p>
          <p className="font-semibold text-lg font-[outfit]">The Team Members included:</p>
          <ul className='list-disc' style={{padding: "0px 20px"}}>
            {teamwork.team.map((member, index) => {
              return (
                <li key={index}>
                  <p>{member}</p>
                </li>
              )
            })}
          </ul>
        </section>
      )}

      {outcome && (
        <section>
          <h3 className="font-semibold text-2xl font-[outfit]" >🚀 Outcome </h3>
          <p>{outcome}</p>
        </section>
      )}
    </div>
  );
};

export default React.memo(ProjectDetails);
