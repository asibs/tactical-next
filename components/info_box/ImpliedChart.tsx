import InfoBox from "./InfoBox";
import { rubik } from "@/utils/Fonts";
import { svgChart } from "@/utils/Echarts";

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
    <InfoBox>
      <>
        <h3 className={`${rubik.className} fs-5`}>
          2019 Election Results (Implied)
        </h3>
        <p>The 2019 implied results from your constituency:</p>
        <div
          className="d-flex justify-content-center"
          dangerouslySetInnerHTML={{ __html: svgStr }}
        />
      </>
    </InfoBox>
  );
};

export default ImpliedChart;
