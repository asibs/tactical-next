import InfoBox from "./InfoBox";
import { svgStack } from "@/utils/Echarts";

const ImpliedStack = ({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) => {
  const svgStr = svgStack(
    constituencyData.impliedPreviousResult.partyVoteResults,
    true,
  );

  return (
    <InfoBox>
      <>
        <h3 className="fs-5">If we&apos; worked together in 2019</h3>
        <p>This seat didn&apos;t vote for the Tories!</p>
        <div
          className="d-flex justify-content-center"
          dangerouslySetInnerHTML={{ __html: svgStr }}
        />
      </>
    </InfoBox>
  );
};

export default ImpliedStack;
