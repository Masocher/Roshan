import styles from "../../styles/global/Header.module.css";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function BlackBackground({ status, setStatus }) {
    const matches2 = useMediaQuery(1200);

    return (
        <div
            onMouseEnter={() => (matches2 ? null : setStatus(false))}
            onClick={() => (matches2 ? setStatus(false) : null)}
            className={`${styles.black_back} ${status ? styles.show : ""}`}
        ></div>
    );
}
