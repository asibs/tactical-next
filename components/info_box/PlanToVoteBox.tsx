import {
  FaPenClip,
  FaIdCard,
  FaEnvelopeOpenText,
  FaFileImage,
  FaHand,
  FaCheckToSlot,
  FaTriangleExclamation,
} from "react-icons/fa6";

const PlanToVoteBox = () => {
  return (
    <>
      <div className="rounded-box action-area">
        <>
          <h3>Get your voting plan</h3>
          <p>
            <FaHand style={{ color: "var(--mf-pink-strong)" }} /> Be counted!
            (get this plan and reminders)
          </p>
          <p>
            <a
              href="https://www.gov.uk/register-to-vote"
              target="_blank"
              rel="noreferrer"
            >
              <FaPenClip style={{ color: "var(--bs-purple)" }} /> Register to
              vote, it takes 5 minutes
            </a>
          </p>
          <p>
            <a
              href="https://www.electoralcommission.org.uk/voting-and-elections/voter-id"
              target="_blank"
              rel="noreferrer"
            >
              <FaIdCard style={{ color: "var(--bs-green)" }} /> Get your photo
              Voter ID
            </a>
          </p>
          <p>
            <a
              href="https://www.gov.uk/apply-postal-vote"
              target="_blank"
              rel="noreferrer"
            >
              <FaEnvelopeOpenText style={{ color: "var(--bs-blue)" }} />{" "}
              Optionally vote from home by post
            </a>
          </p>
          <p>
            <FaFileImage style={{ color: "var(--bs-blue)" }} /> Print posters
            and flyers
          </p>
          <p>
            <FaCheckToSlot style={{ color: "var(--mf-pink-strong)" }} /> Vote
            Tactically!
          </p>
          <p>
            <FaTriangleExclamation style={{ color: "var(--bs-red)" }} /> Remind
            your new MP why you showed up
          </p>
        </>
      </div>
      <p className="text-end small">
        Join up and we&apos;ll take you through this plan.
      </p>
    </>
  );
};

export default PlanToVoteBox;
