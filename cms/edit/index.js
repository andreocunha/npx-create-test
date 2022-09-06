import { useState } from "react";
import { Forms } from "../components/Forms";
import { deletePost } from "../firebase/database";
import styles from "../styles/Modal.module.css";

export function EditPost({ collection, data }) {
    const [showModal, setShowModal] = useState(false);

    async function handleDelete() {
        // show alert asking if user really wants to delete
        const response = window.confirm("Deseja realmente deletar este post?");
        if (response) {
            // delete post
            const respose = await deletePost(collection?.name, data?.id);
            if (respose === "ok") {
                // reload page
                window.location.reload();
            }
        }
    }

    if(!collection || !data) return <h1>404</h1>

    if(showModal) {
        return (
            <div className={styles.modal}>
                <div className={styles.modalContent}>
                    <div className={styles.modalHeader}>
                        <button onClick={() => setShowModal(false)}>X</button>
                    </div>
                    <Forms collection={collection} data={data} />
                </div>
            </div>
        )
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 400 }}>
            <h1>{data.title}</h1>
            <button onClick={() => setShowModal(true)}>Editar</button>
            <button onClick={handleDelete}>Deletar</button>
        </div>
    );
}