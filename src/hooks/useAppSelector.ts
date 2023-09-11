import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {ReduxState} from '../store';

/**
 * useSelector의 type을 매번 지정하기 번거로워서 만든 custom hook입니다.
 */
const useAppSelector: TypedUseSelectorHook<ReduxState> = useSelector;

export default useAppSelector;
