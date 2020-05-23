import { toast, Zoom } from 'react-toastify';

export const ToastSaveSucces = () => {
  toast.success('Les données ont ete enregistrées avec succès', {
    position: 'top-right',
    autoClose: '3000',
    hideProgressBar: false,
    closeOnClick: true,
    transition: Zoom,
    pauseOnHover: true,
    draggable: true,
  });
};

export const ToastDeleteSucces = () => {
  toast.success('Les données ont ete supprimées avec succès', {
    position: 'top-right',
    autoClose: '3000',
    hideProgressBar: false,
    closeOnClick: true,
    transition: Zoom,
    pauseOnHover: true,
    draggable: true
  });
};

export const ToastErrorSave = () => {
  toast.error("Impossible d'enregistrer, une erreur s'est produite. Verifier vos paramètres réseau", {
    position: 'top-right',
    autoClose: '3000',
    hideProgressBar: false,
    closeOnClick: true,
    transition: Zoom,
    pauseOnHover: true,
    draggable: true,
  });
};

export const ToastErrorDelete = () => {
  toast.error('Impossible de supprimer. Verifier vos paramètres réseau', {
    position: 'top-right',
    autoClose: '5000',
    hideProgressBar: false,
    closeOnClick: true,
    transition: Zoom,
    pauseOnHover: true,
    draggable: true,
  });
};
