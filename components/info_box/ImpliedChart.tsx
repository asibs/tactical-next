import { svgChart } from "@/utils/Echarts";
import metadata from "@/data/metadata.json";
import Link from "next/link";

const ImpliedChart = ({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) => {
  const svgStr = svgChart(
    constituencyData.impliedPreviousResult.partyVoteResults,
    true,
  );

  return (
    <div>
      <>
        <h3>2019 Results</h3>
        <p>
          Calculated by{" "}
          <Link href={metadata.implied_2019[0].url}>BBC &amp; Sky</Link> using
          new boundaries.
        </p>
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
          dangerouslySetInnerHTML={{ __html: svgStr }}
        />
      </>
    </div>
  );
};

export default ImpliedChart;
