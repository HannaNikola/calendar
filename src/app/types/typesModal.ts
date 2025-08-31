
export type ModalType = "event" | "todo";
export type ModalMode = "new" | "update";


export interface ModalState {
  isOpen: boolean;
  type?: ModalType;
  mode?: ModalMode; 
  selectedId: string | null;
  
}
