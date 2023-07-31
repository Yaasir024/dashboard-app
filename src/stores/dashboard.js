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

export const useDashboardStore = defineStore("dashboard", () => {
  const route = useRoute();

  const workspaceMetadata = ref(null)
  const getWorkspaceData = async (id) => {
    const docRef = doc(
      firestoreDb,
      "users",
      "oZ7B7t7lX4OLk2psA0BievhJ7O43",
      "workspaces",
      "all"
    );
    await getDoc(docRef).then((doc) => {
        workspaceMetadata.value = doc.data()
      console.log(doc.data());
    });
  };

  return { route, workspaceMetadata, getWorkspaceData };
});
