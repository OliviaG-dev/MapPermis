import { useState, useCallback, ReactElement } from "react";
import Alert, { AlertType } from "./Alert";

interface AlertOptions {
  type?: AlertType;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
}

interface AlertHookReturn {
  alert: ReactElement | null;
  showAlert: (options: AlertOptions) => Promise<boolean>;
  showConfirm: (options: AlertOptions) => Promise<boolean>;
}

export function useAlert(): AlertHookReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [alertOptions, setAlertOptions] = useState<
    AlertOptions & { type: AlertType }
  >({
    type: "alert",
    title: "",
    message: "",
  });
  const [resolvePromise, setResolvePromise] = useState<
    ((value: boolean) => void) | null
  >(null);

  const showAlert = useCallback((options: AlertOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setAlertOptions({
        type: options.type || "alert",
        title: options.title,
        message: options.message,
        confirmText: options.confirmText,
        cancelText: options.cancelText,
      });
      setIsOpen(true);
      setResolvePromise(() => resolve);
    });
  }, []);

  const showConfirm = useCallback((options: AlertOptions): Promise<boolean> => {
    return new Promise((resolve) => {
      setAlertOptions({
        type: "confirm",
        title: options.title,
        message: options.message,
        confirmText: options.confirmText || "Confirmer",
        cancelText: options.cancelText || "Annuler",
      });
      setIsOpen(true);
      setResolvePromise(() => resolve);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    setIsOpen(false);
    if (resolvePromise) {
      resolvePromise(true);
      setResolvePromise(null);
    }
  }, [resolvePromise]);

  const handleCancel = useCallback(() => {
    setIsOpen(false);
    if (resolvePromise) {
      resolvePromise(false);
      setResolvePromise(null);
    }
  }, [resolvePromise]);

  const alert = isOpen ? (
    <Alert
      isOpen={isOpen}
      type={alertOptions.type}
      title={alertOptions.title}
      message={alertOptions.message}
      confirmText={alertOptions.confirmText}
      cancelText={alertOptions.cancelText}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  ) : null;

  return {
    alert,
    showAlert,
    showConfirm,
  };
}
