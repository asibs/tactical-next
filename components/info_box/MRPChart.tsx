import React from "react";
import Link from "next/link";

import { svgChart } from "@/utils/Echarts";
import metadata from "@/data/metadata.json";

const MRPChart = ({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) => {
  const svgStr = svgChart(constituencyData.pollingResults.partyVoteResults);

  return (
    <div>
      <>
        <h3>Local MRP polling</h3>
        <p>
          Aggregate average of:{" "}
          {metadata.mrp_poll.map((datum, idx) => (
            // React.Fragment is just the explicit version of "<></>" - so we can add a key attribute to it
            <React.Fragment key={datum.url}>
              <Link href={datum.url}>Poll {idx + 1}</Link>{" "}
            </React.Fragment>
          ))}{" "}
        </p>
        <div
          style={{ width: "100%" }}
          dangerouslySetInnerHTML={{ __html: svgStr }}
        />
      </>
    </div>
  );
};

export default MRPChart;
