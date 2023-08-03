import { ref, computed } from "vue";
import { defineStore } from "pinia";

import { useAuthStore } from "@/stores/auth";

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
  const useAuth = useAuthStore();
  const route = useRoute();

  const workspaceid = route.params.workspaceid;
  const branch = route.params.branch;

  const fields = ref({
    data: [],
    status: false,
  });

  //   Query For all fields
  const fieldsRef = query(
    collection(
      firestoreDb,
      "users",
      useAuth.userId.uid,
      "workspaces",
      workspaceid,
      branch,
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
  const showFieldSettingModal = ref(false);
  const selectedField = ref({
    uid: "",
    name: "",
    type: "",
    createdAt: null,
  });

  const saveField = async () => {
    if (!selectedField.value.uid) {
      selectedField.value.uid = uid(8);
    }
    if(!selectedField.value.createdAt) {
      selectedField.value.createdAt = serverTimestamp();
    }
    const docRef = doc(
      firestoreDb,
      "users",
      useAuth.userId.uid,
      "workspaces",
      workspaceid,
      branch,
      "fields",
      "data",
      selectedField.value.uid
    );
    await setDoc(docRef, selectedField.value)
      .then(async () => {
        console.log("pushed");
        showFieldsModal.value = false;
        showFieldSettingModal.value = false;
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
  const deleteField = async () => {
    const docRef = doc(
      firestoreDb,
      "users",
      useAuth.userId.uid,
      "workspaces",
      workspaceid,
      branch,
      "fields",
      "data",
      selectedField.value.uid
    );
    await deleteDoc(docRef)
      .then(async () => {
        console.log("deleted");
        showFieldsModal.value = false;
        showFieldSettingModal.value = false;
        setTimeout(() => {
          selectedField.value = {
            uid: "",
            name: "",
            type: "",
            createdAt: null,
          };
        }, "200");
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
      useAuth.userId.uid,
      "workspaces",
      workspaceid,
      branch,
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
  const modalType = ref("");

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
    modalType.value = "new";
    showRecordsModal.value = true;
  };
  const openExistingRecord = (record) => {
    let newRecord = { ...record };
    // Add uids from array that are not already in the main object
    fields.value.data.forEach((item) => {
      const uid = item.uid;
      if (!(uid in newRecord)) {
        newRecord[uid] = "";
      }
    });

    // Remove uids from main object that are not in the array
    for (const key in newRecord) {
      if (
        !fields.value.data.some((item) => item.uid === key) &&
        key !== "createdAt" &&
        key !== "updatedAt" &&
        key !== "uid"
      ) {
        delete newRecord[key];
      }
    }
    recordData.value = newRecord;
    modalType.value = "edit";
    showRecordsModal.value = true;
  };

  const saveRecord = async () => {
    if (!recordData.value.uid) {
      recordData.value.uid = uid(8);
    }
    if (!recordData.value.createdAt) {
      recordData.value.createdAt = serverTimestamp();
    }
    recordData.value.updatedAt = serverTimestamp();
    const docRef = doc(
      firestoreDb,
      "users",
      useAuth.userId.uid,
      "workspaces",
      workspaceid,
      branch,
      "records",
      "data",
      recordData.value.uid
    );
    await setDoc(docRef, recordData.value)
      .then(async () => {
        showRecordsModal.value = false;
        console.log("pushed");
        setTimeout(() => {
          recordData.value = {};
        }, "500");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const deleteRecord = async () => {
    console.log("del");
    const docRef = doc(
      firestoreDb,
      "users",
      useAuth.userId.uid,
      "workspaces",
      workspaceid,
      branch,
      "records",
      "data",
      recordData.value.uid
    );
    await deleteDoc(docRef)
      .then(async () => {
        showRecordsModal.value = false;
        console.log("deleted");
        setTimeout(() => {
          recordData.value = {};
        }, "200");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return {
    route,
    fields,
    showFieldsModal,
    showFieldSettingModal,
    selectedField,
    saveField,
    deleteField,
    records,
    recordData,
    showRecordsModal,
    modalType,
    openNewRecord,
    openExistingRecord,
    saveRecord,
    deleteRecord,
  };
});
