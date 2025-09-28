import { createContext, useState, useContext, ReactNode } from "react";

interface UiContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  modal: ReactNode | null;
  openModal: (content: ReactNode) => void;
  closeModal: () => void;
}

const UiContext = createContext<UiContextType | undefined>(undefined);

export const UiProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState<ReactNode | null>(null);

  const openModal = (content: ReactNode) => setModal(content);
  const closeModal = () => setModal(null);

  return (
    <UiContext.Provider value={{ loading, setLoading, modal, openModal, closeModal }}>
      {children}
      {modal}
      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center text-white text-lg">
          Loading...
        </div>
      )}
    </UiContext.Provider>
  );
};

export const useUiContext = () => {
  const ctx = useContext(UiContext);
  if (!ctx) throw new Error("useUiContext must be used inside UiProvider");
  return ctx;
};
