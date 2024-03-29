import { partyCssClassFromSlug, partyNameFromSlug } from "@/utils/Party";
import { votePercent } from "@/utils/constituencyData";
import Link from "next/link";
import {
  FaUser,
  FaChartSimple,
  FaChartLine,
  FaTriangleExclamation,
  FaBan,
} from "react-icons/fa6";

const ToryCantWinReasoningBox = ({
  constituencyData,
}: {
  constituencyData: ConstituencyData;
}) => {
  const previousBiggestProgressive =
    constituencyData.impliedPreviousResult.biggestProgressiveParty;

  const pollingBiggestProgressive =
    constituencyData.pollingResults.biggestProgressiveParty;

  const pollingGap = (
    votePercent(constituencyData.pollingResults, pollingBiggestProgressive) -
    votePercent(constituencyData.pollingResults, "Con")
  ).toFixed(1);

  const previousGap = (
    votePercent(
      constituencyData.impliedPreviousResult,
      previousBiggestProgressive,
    ) - votePercent(constituencyData.impliedPreviousResult, "Con")
  ).toFixed(1);

  return (
    <div className="rounded-box info-area">
      <>
        <p>
          <span
            className="me-2"
            style={{
              width: "1em",
              display: "inline-block",
              position: "relative",
              bottom: "-.1em",
            }}
          >
            <FaUser
              textAnchor="middle"
              alignmentBaseline="middle"
              style={{
                fontSize: ".9em",
                position: "absolute",
                left: ".05em",
                bottom: "0.02em",
              }}
              className={`${partyCssClassFromSlug("Con")}`}
            />
            <FaBan
              className={`${partyCssClassFromSlug(pollingBiggestProgressive)}`}
              textAnchor="middle"
              alignmentBaseline="middle"
              style={{
                fontSize: "1.2em",
                position: "absolute",
                left: "-.1em",
                bottom: "-.1em",
              }}
            />
          </span>
          A <strong>Tory</strong> is unlikely to win here this time
        </p>
        <p>
          <FaChartLine className={`me-2 ${partyCssClassFromSlug("Con")}`} />
          Polls give <strong>Tories</strong> only{" "}
          <strong>
            {votePercent(constituencyData.pollingResults, "Con").toFixed(1)}%
          </strong>{" "}
          here
        </p>

        <p>
          <FaChartSimple
            className={`me-2 ${partyCssClassFromSlug(
              pollingBiggestProgressive,
            )}`}
          />
          They were <strong>{previousGap}%</strong> behind{" "}
          <strong>{partyNameFromSlug(previousBiggestProgressive)}</strong> in
          2019
        </p>

        {/* Show polling biggest progressive if it matches our recommendation */}
        <p>
          <FaChartLine className={`me-2 ${partyCssClassFromSlug("Con")}`} />
          They&apos;re now <strong>{pollingGap}%</strong> behind{" "}
          <strong>{partyNameFromSlug(pollingBiggestProgressive)}</strong> in
          polls
        </p>
        <p>
          <FaTriangleExclamation
            className="me-2"
            style={{ color: "var(--bs-red)" }}
          />
          Don&apos;t be ignored <strong>contact your candidate</strong>
        </p>

        {/*
        TODO Link to some non-voting action to get what they want
        <p>
          <Link href="#lobby">
            <FaEnvelope
              className="me-2"
              style={{ color: "var(--mf-pink-strong)" }}
            />
            Make your vote count
          </Link>
        </p>

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

export default ToryCantWinReasoningBox;
