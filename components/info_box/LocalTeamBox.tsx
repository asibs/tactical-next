import InfoBox from "./InfoBox";
import { rubik } from "@/utils/Fonts";
import { Button } from "react-bootstrap";

import { FaUsers } from "react-icons/fa6";

const LocalTeamBox = () => {
  return (
    <InfoBox>
      <>
        <h3 className={`${rubik.className} fs-5`}>Your Constituency Team</h3>
        <p>People in your local Movement Forward community are coming together to use their voting power.</p>
        <p>
          <Button variant="light" size="lg">
            <FaUsers className="me-2" />
            <span className={`${rubik.className} fw-bold`}>Join and get involved</span>
          </Button>
        </p>
      </>
    </InfoBox>
  );
};

export default LocalTeamBox;