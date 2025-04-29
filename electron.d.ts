interface ElectronAPI {
  handleOpenFiles: (callback: (filePaths: string[]) => void) => void;
  minimizeWindow: () => void;
  maximizeWindow: () => void;
  closeWindow: () => void;
}

interface Window {
  electron: ElectronAPI;
}