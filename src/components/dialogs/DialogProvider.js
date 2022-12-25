import * as React from 'react';
import ConfirmDialog from './ConfirmDialog';

export const MODAL_TYPES = {
    CONFIRM_MODAL: "CONFIRM_MODAL",
};
    
const MODAL_COMPONENTS = {
     [MODAL_TYPES.CONFIRM_MODAL]: ConfirmDialog,
};

const initalState = {
    showModal: () => {},
    hideModal: () => {},
    store: {},
};

const GlobalModalContext = React.createContext(initalState);
export const useGlobalModalContext = () => React.useContext(GlobalModalContext);

export const GlobalModal = ({ children }) => {
    const [store, setStore] = React.useState();
    const { modalType, modalProps } = store || {};

    const showModal = (modalType, modalProps = {}) => {
        setStore({
            ...store,
            modalType,
            modalProps,
        });
    };

    const hideModal = () => {
        setStore({
            ...store,
            modalType: null,
            modalProps: {},
        });
    };

    const renderComponent = () => {
        const ModalComponent = MODAL_COMPONENTS[modalType];
        if (!modalType || !ModalComponent) {
            return null;
        }
        return <ModalComponent id="global-modal" {...modalProps} />;
    };

    const value = React.useMemo(() =>  ({
        store,
        showModal,
        hideModal
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }), [store]);

    return (
        <GlobalModalContext.Provider value={value}>
            { renderComponent() }
            { children }
        </GlobalModalContext.Provider>
    );
}