import InfoBox from "./InfoBox";
import { partyCssClassFromSlug, partyNameFromSlug } from "@/utils/Party";

import {
  FaUser,
  FaChartSimple,
  FaChartLine,
  FaBullseye,
  FaTriangleExclamation,
} from "react-icons/fa6";

const TacticalReasoningBox = ({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) => {
  const recommendedParty = constituencyData.recommendation.partySlug;
  const recommendedPartyName = partyNameFromSlug(recommendedParty);

  const previousWinner = constituencyData.impliedPreviousResult.winningParty;
  const previousBiggestProgressive =
    constituencyData.impliedPreviousResult.biggestProgressiveParty;

  const pollingWinner = constituencyData.pollingResults.winningParty;
  const pollingBiggestProgressive =
    constituencyData.pollingResults.biggestProgressiveParty;

  const recommendedPartyTargetSeat =
    constituencyData.otherVoteData.targetSeatData.some(
      (target) =>
        target.partySlug == recommendedParty && target.likelyTarget == "YES",
    );

  const conCantWin = !constituencyData.otherVoteData.conservativeWinUnlikely;

  return (
    <InfoBox>
      <>
        <h3 className="fs-5">Why?</h3>

        {/* Always show previous general election winner */}
        <p>
          <FaUser className={`me-2 ${partyCssClassFromSlug(previousWinner)}`} />
          {partyNameFromSlug(previousWinner)} won here in 2019
        </p>

        {/* Show previous biggest progressive if it matches our recommendation AND they weren't the winner */}
        {recommendedParty == previousBiggestProgressive &&
          recommendedParty != previousWinner && (
            <p>
              <FaChartSimple
                className="me-2"
                style={{ color: "var(--bs-green)" }}
              />
              {recommendedPartyName} received the most progressive votes here in
              2019
            </p>
          )}

        {/* Show polling biggest progressive if it matches our recommendation */}
        {recommendedParty == pollingBiggestProgressive && (
          <p>
            <FaChartLine
              className="me-2"
              style={{ color: "var(--bs-green)" }}
            />
            Polling indicates that {recommendedPartyName} have the best chance
            of beating the Tory party here at the next election
          </p>
        )}

        {/* If this is a target seat for our recommended party, show this */}
        {recommendedPartyTargetSeat && (
          <p>
            <FaBullseye className="me-2" style={{ color: "var(--bs-red)" }} />
            This is a likely target seat for {recommendedPartyName}
          </p>
        )}

        {/* Check if this is a close seat */}
        {conCantWin && (
          <p>
            <FaTriangleExclamation
              className="me-2"
              style={{ color: "var(--bs-red)" }}
            />
            This is a close seat, tactical voting can work very well here.
          </p>
        )}
        {/* <p>
          <img src="../assets/img/clipboard-image.png" style="width:100%;">
        </p> */}
      </>
    </InfoBox>
  );
};

export default TacticalReasoningBox;
