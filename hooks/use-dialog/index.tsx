import { Dialog } from '@/components';
import { useModal } from '@/hooks/use-modal';

import { IDialogData } from './use-dialog.types';

export const useDialog = () => {
  const { setModal, handleClose } = useModal();

  return {
    handleClose,
    dialog: {
      promise: async (
        promise: Promise<void>,
        {
          loading,
          success,
          error,
        }: Record<'loading' | 'success', () => IDialogData> & {
          error: (e: unknown) => IDialogData;
        }
      ): Promise<void> => {
        try {
          setModal(<Dialog status="loading" {...loading()} />, {
            isOpen: true,
            custom: true,
            onClose: handleClose,
          });
          await promise;
          setModal(<Dialog status="success" {...success()} />, {
            isOpen: true,
            custom: true,
            onClose: handleClose,
          });
        } catch (e) {
          setModal(<Dialog status="error" {...error(e)} />, {
            isOpen: true,
            custom: true,
            onClose: handleClose,
          });
        }
      },
    },
  };
};
