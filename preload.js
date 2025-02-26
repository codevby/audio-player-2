const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  listenForFiles: () => ipcRenderer.invoke('get-open-files'),
  minimizeWindow: () => ipcRenderer.send('minimize'),
  maximizeWindow: () => ipcRenderer.send('maximize'),
  closeWindow: () => ipcRenderer.send('close')
});
