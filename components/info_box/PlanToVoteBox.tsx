import InfoBox from "./InfoBox";
import { rubik } from "@/utils/Fonts";

import {
  FaPenClip,
  FaRegIdCard,
  FaEnvelopeOpenText,
  FaFileImage,
} from "react-icons/fa6";

const PlanToVoteBox = () => {
  return (
    <InfoBox>
      <>
        <h3 className={`${rubik.className} fs-5`}>Your Plan</h3>
        <p>
          <a
            href="https://www.gov.uk/register-to-vote"
            target="_blank"
            rel="noreferrer"
          >
            <FaPenClip className="me-2" style={{ color: "var(--bs-purple)" }} />
            Register to vote, it takes 5 minutes
          </a>
        </p>
        <p>
          <a
            href="https://www.electoralcommission.org.uk/voting-and-elections/voter-id"
            target="_blank"
            rel="noreferrer"
          >
            <FaRegIdCard
              className="me-2"
              style={{ color: "var(--bs-green)" }}
            />
            Don&apos;t forget your photo Voter ID
          </a>
        </p>
        <p>
          <a
            href="https://www.gov.uk/apply-postal-vote"
            target="_blank"
            rel="noreferrer"
          >
            <FaEnvelopeOpenText
              className="me-2"
              style={{ color: "var(--bs-blue)" }}
            />
            Vote in advance, privately, by post from home
          </a>
        </p>
        <p>
          <FaFileImage className="me-2 text-pink-strong" />
          Download and put up some posters
        </p>
      </>
    </InfoBox>
  );
};

export default PlanToVoteBox;
