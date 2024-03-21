import { svgChart } from "@/utils/Echarts";
import metadata from "@/data/metadata.json";
import Link from "next/link";

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
            <>
              <Link href={datum.url}>Poll {idx + 1}</Link>{" "}
            </>
          ))}{" "}
        </p>
        <div
          style={{ width: "100%" }}
          className="d-flex justify-content-center"
          dangerouslySetInnerHTML={{ __html: svgStr }}
        />
      </>
    </div>
  );
};

export default MRPChart;
