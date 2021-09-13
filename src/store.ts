import React from "react";
import create from "zustand";

type StoreType = {
  loggedUser: null | string;
  setLoggedUser: (param1: string) => void;
};

const useStore = create<StoreType>((set, get) => ({
  loggedUser: null,
  setLoggedUser: user => {
    set({ loggedUser: user });
  },
}));

export default useStore;
