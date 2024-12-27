declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            username: string;
            id: number;
            first_name: string;
            last_name?: string;
            language_code: string;
            is_premium: boolean;
          };
        };
        ready: () => void;
        expand: () => void;
        close: () => void;
      };
    };
  }
}