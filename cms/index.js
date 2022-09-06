import styles from './styles/Home.module.css';
import { useEffect, useState } from 'react';
import { EditPost } from './edit';
import { CreatePost } from './create';
import { handleSubmitLoginGoogle } from './firebase/auth';
import { getAllCollectionData } from './firebase/database';
import collections from '../config/collections';
import { auth } from '../config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Header } from './components/Header';

export default function AdminCMS() {
    const [user, setUser] = useState(null);
    const [data, setData] = useState();
    const [dataSelected, setDataSelected] = useState({});

    useEffect(() => {
        async function getData() {
            const allData = await getAllCollectionData();
            setData(allData);
        }
        async function verfifyUser() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    setUser({
                        displayName: user.displayName,
                        email: user.email,
                        photoURL: user.photoURL,
                    });
                    getData();
                }
            });
        }
        verfifyUser();
    }, [])
    
    return (
        <div className={styles.container}>
            {user && <Header data={user} />}
            <main className={styles.main}>
                {user==null ? 
                <button onClick={() => handleSubmitLoginGoogle(auth)}>Login com o Google</button>
                :
                <>
                    <div className={styles.menu}>
                        <h2>Menus</h2>
                        {data?.map((collection, index) => (
                            <button onClick={() => setDataSelected(collection)} key={index}>{collection.collection}</button>
                        ))}
                    </div>

                    {dataSelected?.data && 
                    <div style={{ border: '1px solid #ccc', padding: '5px', margin: '10px 0' }}>

                        <h1>{dataSelected.collection}</h1>

                        <CreatePost
                            collection={collections?.find((collection) => collection?.name === dataSelected?.collection)}
                        />

                        {dataSelected?.data && dataSelected.data.map((item, index) => (
                            <div className={styles.card} key={index}>
                                <EditPost
                                    collection={collections?.find((collection) => collection?.name === dataSelected?.collection)}
                                    data={item}
                                />
                            </div>
                        ))}
                    </div>}
                </>
                }
            </main>
        </div>
    )
}