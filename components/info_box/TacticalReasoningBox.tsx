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
  const partyTargetSeat = (partySlug: string) => {
    return constituencyData.otherVoteData.targetSeatData.find(
      (target) => target.partySlug === partySlug,
    );
  };

  const recommendedParty = constituencyData.recommendation.partySlug;
  const recommendedPartyName = partyNameFromSlug(recommendedParty);

  const previousWinner = constituencyData.impliedPreviousResult.winningParty;
  const previousBiggestProgressive =
    constituencyData.impliedPreviousResult.biggestProgressiveParty;

  const pollingWinner = constituencyData.pollingResults.winningParty;
  const pollingBiggestProgressive =
    constituencyData.pollingResults.biggestProgressiveParty;

  const recommendedPartyTargetSeat =
    partyTargetSeat(recommendedParty)?.likelyTarget === "YES";

  const closeSeat = !constituencyData.otherVoteData.conservativeWinUnlikely;

  return (
    <div className="rounded-box info-area">
      <>
        {/* Always show previous general election winner */}
        <p>
          <FaUser className={`me-2 ${partyCssClassFromSlug(previousWinner)}`} />
          <strong>{partyNameFromSlug(previousWinner)}</strong> won in 2019
        </p>

        {/* Show previous biggest progressive if it matches our recommendation AND they weren't the winner */}
        {recommendedParty === previousBiggestProgressive &&
          recommendedParty !== previousWinner && (
            <p>
              <FaChartSimple
                className="me-2"
                style={{ color: "var(--bs-green)" }}
              />
              <strong>{recommendedPartyName}</strong> were closest in 2019
            </p>
          )}

        {/* If we're not recommending the biggest 2019 progressive party, check if it's NOT a target seat for them */}
        {recommendedParty !== previousBiggestProgressive &&
          partyTargetSeat(previousBiggestProgressive)?.likelyTarget ===
            "NO" && (
            <p>
              <FaChartSimple
                className="me-2"
                style={{ color: "var(--bs-green)" }}
              />
              {partyNameFromSlug(previousBiggestProgressive)} received the most
              progressive votes here in 2019, but they&apos;re not targetting
              this seat in 2024
            </p>
          )}

        {/* Show polling biggest progressive if it matches our recommendation */}
        {recommendedParty === pollingBiggestProgressive && (
          <p>
            <FaChartLine
              className="me-2"
              style={{ color: "var(--bs-green)" }}
            />
            Polls favour <strong>{recommendedPartyName}</strong> here
          </p>
        )}

        {/* If this is a target seat for our recommended party, show this */}
        {recommendedPartyTargetSeat && (
          <p>
            <FaBullseye className="me-2" style={{ color: "var(--bs-red)" }} />
            Likely a <strong>{recommendedPartyName}</strong> target seat
          </p>
        )}

        {/* 
        TODO motivational text based on whats required to get tories out
        Check if this is a close seat 
        {closeSeat && (
          <p>
            <FaTriangleExclamation
              className="me-2"
              style={{ color: "var(--bs-red)" }}
            />
            This is a close seat, tactical voting can work very well here.
          </p>
        )}*/}
      </>
    </div>
  );
};

export default TacticalReasoningBox;
