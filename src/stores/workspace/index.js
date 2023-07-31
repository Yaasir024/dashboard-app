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

export const useWorkspaceStore = defineStore("workspace", () => {
  const route = useRoute();

  const branchesMetadata = ref({
    data: null,
    status: false,
  });

  const branchesMetadataRef = doc(
    firestoreDb,
    "users",
    "oZ7B7t7lX4OLk2psA0BievhJ7O43",
    "workspaces",
    "oComMQQujv4aDWaewLH4"
  );
  onSnapshot(branchesMetadataRef, (doc) => {
    console.log(doc.data());
    branchesMetadata.value.data = doc.data();
    branchesMetadata.value.status = true;
  });

  return { route, branchesMetadata };
});
