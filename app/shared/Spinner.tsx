import { LoadingOutlined } from "@ant-design/icons";

const Spinner = () => {
  return (
    <LoadingOutlined
      style={{
        fontSize: 32,
        display: "flex",
        alignItems: "center",
        minHeight: "10rem",
        color: "#4341CD",
      }}
      spin
    />
  );
};

export default Spinner;
