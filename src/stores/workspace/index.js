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

export const useWorkspaceStore = defineStore("workspace", () => {
  const useAuth = useAuthStore();
  const route = useRoute();
  const workspaceid = route.params.workspaceid;

  const showBranchModal = ref(false);

  const branchData = ref({
    name: "",
    type: "",
    uid: "",
    linkedDb: null,
  });
  const pushToBranch = (uid) => {
    router.push({ path: `/workspace/${workspaceid}/${uid}` });
  };

  const branchesMetadata = ref({
    data: null,
    status: false,
  });

  const branchesMetadataRef = doc(
    firestoreDb,
    "users",
    useAuth.userId.uid,
    "workspaces",
    route.params.workspaceid
  );
  onSnapshot(branchesMetadataRef, (doc) => {
    console.log(doc.data());
    branchesMetadata.value.data = doc.data();
    branchesMetadata.value.status = true;
  });

  const addBranch = async () => {
    // const full
    const docRef = doc(
      firestoreDb,
      "users",
      useAuth.userId.uid,
      "workspaces",
      workspaceid
    );
    await setDoc(
      docRef,
      {
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    )
      .then(async () => {
        await updateDoc(docRef, {
          branches: arrayUnion(branchData.value),
        });
        return;
      })
      .then(() => {
        // router.push({
        //   path: `/workspace/${newDashboardData.value.uid}/overview`,
        // });
        console.log("done");
        showBranchModal.value = false
        branchData.value = {
          name: "",
          type: "",
          uid: "",
        };
      });
  };

  return {
    route,
    showBranchModal,
    branchData,
    workspaceid,
    pushToBranch,
    branchesMetadata,
    addBranch,
  };
});
