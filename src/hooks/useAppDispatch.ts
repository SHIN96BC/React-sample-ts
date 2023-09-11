import {AppDispatch} from '../store';
import {useDispatch} from 'react-redux';

/**
 * useDispatch의 type을 매번 지정하기 번거로워서 만든 custom hook입니다.
 */
const useAppDispatch: () => AppDispatch = useDispatch;

export default useAppDispatch;
