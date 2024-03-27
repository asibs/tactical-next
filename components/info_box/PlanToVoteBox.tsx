import {
  FaPenClip,
  FaIdCard,
  FaEnvelopeOpenText,
  FaFileImage,
  FaHand,
  FaCheckToSlot,
  FaTriangleExclamation,
} from "react-icons/fa6";

import Link from "next/link";

const PlanToVoteBox = () => {
  return (
    <>
      <div className="rounded-box action-area">
        <>
          <h3>Get your voting plan</h3>
          <p>
            <FaHand
              className="me-2"
              style={{ color: "var(--mf-pink-strong)" }}
            />
            Be counted! (get this plan and reminders)
          </p>
          <p>
            <a
              href="https://www.gov.uk/register-to-vote"
              target="_blank"
              rel="noreferrer"
            >
              <FaPenClip
                className="me-2"
                style={{ color: "var(--bs-purple)" }}
              />
              Register to vote, takes 5 mins
            </a>
          </p>
          <p>
            <a
              href="https://www.electoralcommission.org.uk/voting-and-elections/voter-id"
              target="_blank"
              rel="noreferrer"
            >
              <FaIdCard className="me-2" style={{ color: "var(--bs-green)" }} />
              Get your photo Voter ID
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
              Optionally vote from home by post
            </a>
          </p>
          <p>
            <Link href="/posters">
              <FaFileImage
                className="me-2"
                style={{ color: "var(--bs-black)" }}
              />
              Print posters and flyers
            </Link>
          </p>
          <p>
            <FaCheckToSlot
              className="me-2"
              style={{ color: "var(--mf-pink-strong)" }}
            />
            Vote Tactically!
          </p>
          <p>
            <FaTriangleExclamation
              className="me-2"
              style={{ color: "var(--bs-red)" }}
            />
            Remind your new MP why you showed up
          </p>
        </>
      </div>
      <p className="text-end small">
        <Link href="/join">Join up</Link> and we&apos;ll take you through this
        plan.
      </p>
    </>
  );
};

export default PlanToVoteBox;
