import * as React from 'react';
import {
    Snackbar,
    Alert
} from '@mui/material';

const initalState = {
    showSnackbar: () => {},
    hideSnackbar: () => {},
    store: {},
};

const GlobalSnackbarContext = React.createContext(initalState);
export const useSnackbarContext = () => React.useContext(GlobalSnackbarContext);

export const GlobalSnackbar = ({ children }) => {
    const [store, setStore] = React.useState();
    const { snackbarProps } = store || {};

    const showSnackbar = (snackbarProps = {}) => {
        setStore({
            ...store,
            isOpen: true,
            snackbarProps,
        });
    };

    const hideSnackbar = () => {
        setStore({
            ...store,
            isOpen: false,
            snackbarProps: {},
        });
    };

    const renderComponent = () => {
        if (!snackbarProps?.message) {
            return null;
        }

        return (
            <Snackbar
                open={store?.isOpen || false}
                autoHideDuration={snackbarProps?.autoHideDuration || 2000}
                onClose={() => setStore({...store, isOpen: false})}
            >
                <Alert
                    severity={snackbarProps?.type || 'success'}
                    sx={{ width: "100%" }}
                    onClose={() => setStore({...store, isOpen: false})}
                >
                    { snackbarProps.message } 
                </Alert>
            </Snackbar>
        );
    };

    const value = {
        store,
        showSnackbar,
        hideSnackbar
        // eslint-disable-next-line react-hooks/exhaustive-deps
    };

    return (
        <GlobalSnackbarContext.Provider value={value}>
            { renderComponent() }
            { children }
        </GlobalSnackbarContext.Provider>
    );
}