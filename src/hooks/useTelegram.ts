declare global {
    interface Window {
        Telegram: any;
    }
}

const tg = window.Telegram.WebApp;
export const useTelegram = () => {
    const onClose = () => {
        tg.close();
    }

    const onToggleButton = () => {
        if(tg.MainButton.isVisible) {
            tg.MainButton.hide();
        } else {
            tg.MainButton.show();
        }
    }

    return {
        onClose,
        onToggleButton,
        tg,
    }
}