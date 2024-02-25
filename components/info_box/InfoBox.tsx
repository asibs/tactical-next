const InfoBox = ({ children }: {
  children: React.ReactElement,
}) => {

  return (
    <div
      className="rounded-4 p-3"
      style={{
        background: "linear-gradient(rgb(255, 243, 205), rgb(255, 230, 156))",
        boxShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.075)"
      }}>
      {children}
    </div >
  );
};

export default InfoBox;
