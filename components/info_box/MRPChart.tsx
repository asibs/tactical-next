import InfoBox from "./InfoBox";
import { svgChart } from "@/utils/Echarts";

const MRPChart = ({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) => {
  const svgStr = svgChart(constituencyData.pollingResults.partyVoteResults);

  return (
    <InfoBox>
      <>
        <h3 className="fs-5">Constituency Regression Polls</h3>
        <p>Average of last 6 months MRP models:</p>
        <div
          className="d-flex justify-content-center"
          dangerouslySetInnerHTML={{ __html: svgStr }}
        />
      </>
    </InfoBox>
  );
};

export default MRPChart;
