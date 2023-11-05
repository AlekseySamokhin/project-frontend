import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import { rootPersistConfig, rootReducer } from './rootReducer';
import rootSaga from '../saga/rootSaga';

// ----------------------------------------------------------------------

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
      immutableCheck: false,
    }),
    sagaMiddleware,
  ],
});

sagaMiddleware.run(rootSaga);

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector = useAppSelector;

const useDispatch = () => useAppDispatch();

export { store, persistor, dispatch, useSelector, useDispatch };
