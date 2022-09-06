import { auth } from "../../../config/firebase";
import styles from "../../styles/Header.module.css";

export function Header({ data }) {
  function handleLogout() {
    auth.signOut().then(() => {
      window.location.reload();
    });
  }

  return (
    <div className={styles.container}>
      <div className={styles.userArea}>
        {data?.photoURL && <img src={data?.photoURL} alt="user" />}
        <h1>{data?.displayName}</h1>
        <h2>{data?.email}</h2>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}