import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { firestoreDb } from "@/services/firebase/init";

import router from "@/router";
import { useRoute } from "vue-router";

import { uid } from "@/composables/useGenerateUid";

import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  setDoc,
  collectionGroup,
  onSnapshot,
  Timestamp,
  updateDoc,
  increment,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";

export const useDatabaseStore = defineStore("database", () => {
  const route = useRoute();

  const fields = ref({
    data: [],
    status: false,
  });

  //   Query For all fields
  const fieldsRef = query(
    collection(
      firestoreDb,
      "users",
      "oZ7B7t7lX4OLk2psA0BievhJ7O43",
      "workspaces",
      "oComMQQujv4aDWaewLH4",
      "table-1",
      "fields",
      "data"
    ),
    orderBy("createdAt")
  );

  onSnapshot(fieldsRef, (snapshot) => {
    let docs = [];
    snapshot.docs.forEach((doc) => {
      docs.push(doc.data());
    });
    console.log(docs);
    fields.value.data = docs;
    fields.value.status = true;
    // confirmDraft();
  });

  const showFieldsModal = ref(false);
  const selectedField = ref({
    uid: "",
    name: "",
    type: "",
    createdAt: null,
  });

  const saveField = async () => {
    // /users/oZ7B7t7lX4OLk2psA0BievhJ7O43/workspaces/oComMQQujv4aDWaewLH4/table-1/fields
    selectedField.value.uid = uid(8);
    selectedField.value.createdAt = serverTimestamp();
    const docRef = doc(
      firestoreDb,
      "users",
      "oZ7B7t7lX4OLk2psA0BievhJ7O43",
      "workspaces",
      "oComMQQujv4aDWaewLH4",
      "table-1",
      "fields",
      "data",
      selectedField.value.uid
    );
    await setDoc(docRef, selectedField.value)
      .then(async () => {
        console.log("pushed");
        showFieldsModal.value = false;
        setTimeout(() => {
          selectedField.value = {
            uid: "",
            name: "",
            type: "",
            createdAt: null,
          };
        }, "500");
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const records = ref({
    data: [],
    status: false,
  });

  //   Query For all records
  const recordsRef = query(
    collection(
      firestoreDb,
      "users",
      "oZ7B7t7lX4OLk2psA0BievhJ7O43",
      "workspaces",
      "oComMQQujv4aDWaewLH4",
      "table-1",
      "records",
      "data"
    ),
    orderBy("createdAt")
  );

  onSnapshot(recordsRef, (snapshot) => {
    let docs = [];
    snapshot.docs.forEach((doc) => {
      docs.push(doc.data());
    });
    console.log(docs);
    records.value.data = docs;
    records.value.status = true;
    // confirmDraft();
  });

  const recordData = ref(null);
  const showRecordsModal = ref(false);

  const abstractToObject = (arr) => {
    const result = {};
    arr.forEach((item) => {
      result[item.uid] = "";
    });
    return result;
  };
  const openNewRecord = () => {
    console.log(abstractToObject(fields.value.data));
    recordData.value = abstractToObject(fields.value.data);
    showRecordsModal.value = true;
  };

  const saveRecord = async () => {
    // /users/oZ7B7t7lX4OLk2psA0BievhJ7O43/workspaces/oComMQQujv4aDWaewLH4/table-1/fields
    recordData.value.uid = uid(8);
    if (!recordData.value.createdAt) {
      recordData.value.createdAt = serverTimestamp();
    }
    recordData.value.updatedAt = serverTimestamp();
    const docRef = doc(
      firestoreDb,
      "users",
      "oZ7B7t7lX4OLk2psA0BievhJ7O43",
      "workspaces",
      "oComMQQujv4aDWaewLH4",
      "table-1",
      "records",
      "data",
      recordData.value.uid
    );
    await setDoc(docRef, recordData.value)
      .then(async () => {
        console.log("pushed");
        showRecordsModal.value = false;
        setTimeout(() => {
          recordData.value = {};
        }, "500");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    route,
    fields,
    showFieldsModal,
    selectedField,
    saveField,
    records,
    recordData,
    showRecordsModal,
    openNewRecord,
    saveRecord,
  };
});
