import spiner from "../../../public/images/loading.svg";
import Image from "next/image";

export default function Loading() {
  const styles = {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    userSelect: "none",
    zIndex: "1000",
  };

  return (
    <div className="loader" style={styles}>
      <Image src={spiner} width={80} height={80} alt="لودینگ" />
    </div>
  );
}
