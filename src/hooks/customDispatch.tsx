import {
  useDispatch as dispatchHook,
} from 'react-redux';

import { AppDispatch, AppThunk } from "../services/types/types";

export const useDispatch = () => dispatchHook<AppDispatch | AppThunk>(); 