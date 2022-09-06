import { useState } from "react";
import { Forms } from "../components/Forms";
import styles from "../styles/Modal.module.css";

export function CreatePost({ collection }) {
  const [showModal, setShowModal] = useState(false);

  if(!collection) return <h1>404</h1>

  if(showModal) {
      return (
          <div className={styles.modal}>
              <div className={styles.modalContent}>
                  <div className={styles.modalHeader}>
                      <button onClick={() => setShowModal(false)}>X</button>
                  </div>
                  <Forms collection={collection} />
              </div>
          </div>
      )
  }

  return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400 }}>
          <button onClick={() => setShowModal(true)}>Criar Novo</button>
      </div>
  );
}