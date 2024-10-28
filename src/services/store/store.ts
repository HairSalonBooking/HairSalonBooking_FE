import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authSlice from '../features/auth/authSlice';
import userSlice from '../features/user/userSlice';
import stylistSlice from '../features/stylist/stylistSlice';
import serviceSlice from '../features/service/serviceSlice';
import timeBookingSlice from '../features/timeBooking/timeBookingSlice';
import bookingSlice from '../features/booking/bookingSlice';
import dashboardSlice  from '../features/dashboard/dashboardSlice';

const presistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'users', 'stylists', 'services', 'times', 'bookings', 'dashboards'],
}

// Create a hook for using TypedUseSelectorHook
const rootReducer = combineReducers({
    // Add your reducers here
    auth : authSlice,
    users: userSlice,
    stylists: stylistSlice,
    services: serviceSlice,
    times: timeBookingSlice,
    bookings: bookingSlice,
    dashboards: dashboardSlice,
});

const persistedReducer = persistReducer(presistConfig, rootReducer);


// Combine all reducers
export const store = configureStore({
    reducer: persistedReducer,
});

// Persist the store
export const persistor = persistStore(store);

// Export types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Export hooks for using TypedUseSelectorHook
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
