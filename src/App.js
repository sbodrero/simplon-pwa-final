import React, { useState, useEffect, useCallback } from 'react';
import { Layout, Button } from 'antd';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { logEvent } from "firebase/analytics";
import { PlusOutlined } from '@ant-design/icons';
import Auth from './components/Auth';
import './App.css';
import { db, auth, storage, analytics } from './firebase'
import DogsTable from './components/Table';
import DogsForm from './components/dogs/form';
import withErrorBoundary from './hocs/ErrorBoudary';


const { Header, Content, Footer } = Layout;

function App() {
  const [dogs, setDogs] = useState([]);
  const [dog, setDog] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const dogsCollectionRef = collection(db, "dogs");

  async function getDogs() {
    try {
      const data = await getDocs(dogsCollectionRef);
      const docs = data.docs.map((doc) => ({...doc.data(), id: doc.id}));
      setDogs(docs);
    } catch (e) {
      console.error(e)
    }
  };

  useEffect( () => {
     getDogs();
  }, []);

  const handleAddDog = () => {
    logEvent(analytics,'addDog_enter');
    setDog({});
    setIsEdit(false);
    setShowForm(true);
  }

  const onDogAdd = async (newDog) => {
    logEvent(analytics,'addDog_submit');
    console.log(newDog, 'newdog');
    try {
      await addDoc(dogsCollectionRef, {...newDog, userId: auth?.currentUser?.uid});
      setShowForm(false);
      await getDogs()
    } catch (e) {
      console.error(e)
    }
  }

  const onDogUpdate = async (dogToEdit, id) => {
    try {
      const dogToUpdate = doc(db, "dogs", id);
      await updateDoc(dogToUpdate, {...dogToEdit});
      await getDogs();
    } catch (e) {
      console.error(e)
    }
  }

  const onDogDelete = async (id) => {
    console.log(id, 'id');
    try {
      const dogToDelete = doc(db, "dogs", id);
      console.log(dogToDelete, 'dogToDelete');
      await deleteDoc(dogToDelete);
      await getDogs();
    } catch (e) {
      console.error(e)
    }
  }

  const onAddImage = async (file, id) => { // on a besoin de l'id du chien à rattacher
    if(!file) return console.warn("no file to handle with");
    try {
      const storageRef = ref(storage, `dogsImages/${file.name}`)
      const image = await uploadBytes(storageRef, file); // on stock l'image
      const url = await getDownloadURL(storageRef); // on cherche l'url public de distribution
      // on va ajouter cette url à notre enregistrement
      const dogToUpdate = doc(db, "dogs", id);
      await updateDoc(dogToUpdate, {publicUrl: url});
      await getDogs();
      console.log(image, 'image');
      console.log(url, 'url');
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Layout>
      <Header />
      <Content style={{ padding: '40px' }}>
        <div className="App">
          <Auth isLogged={isLogged} setIsLogged={setIsLogged} />
        </div>
        {auth?.currentUser?.uid && (
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAddDog}>Ajouter un chien</Button>
        )}
        <DogsTable
          dataSource={dogs}
          setIsEdit={setIsEdit}
          setDog={setDog}
          setShowForm={setShowForm}
          onDogDelete={onDogDelete}
          onAddImage={onAddImage}
        />
        {showForm && (
          <DogsForm dog={dog} setShowForm={setShowForm} onDogAdd={onDogAdd} isEdit={isEdit} onDogUpdate={onDogUpdate} />
        )}
      </Content>
      <Footer />
    </Layout>
  );
}

export default withErrorBoundary(App);
