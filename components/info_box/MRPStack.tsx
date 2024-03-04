import InfoBox from "./InfoBox";
import { svgStack } from "@/utils/Echarts";

const MRPStack = ({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) => {
  const svgStr = svgStack(constituencyData.pollingResults.partyVoteResults);

  return (
    <InfoBox>
      <>
        <h3 className="fs-5">If we work together now!</h3>
        <div
          className="d-flex justify-content-center"
          dangerouslySetInnerHTML={{ __html: svgStr }}
        />
      </>
    </InfoBox>
  );
};

export default MRPStack;
