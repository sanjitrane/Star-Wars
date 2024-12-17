import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "../../app/rootReducer";
import store,{RootState, AppDispatch} from "../../app/store";

describe("Redux Store Configuration",()=>{
  it('should initialise with correct root reducer', ()=>{
    const state = store.getState();
    expect(state).toBeDefined();
    expect(state).toMatchObject(rootReducer(undefined, {type:''}));
  });

  it('should allow dispatching actions',()=>{
    const testAction = {type: 'test/action', payload: 'Test Payload'};
    store.dispatch(testAction);

    const state = store.getState();
    expect(state).toBeDefined();
    expect(state).toMatchObject(rootReducer(undefined, testAction));
  });

  it('should use correct types for RootState and AppDispatch', ()=>{
    type State = RootState;
    type Dispatch = AppDispatch;

    expect(typeof store.dispatch).toBe('function');
    const testDispatch: Dispatch = store.dispatch;
    expect(testDispatch).toBeDefined();
    expect(testDispatch).toEqual(expect.any(Function));
  });

  it('should support accessing state froma sample slice', ()=>{
    const sampleSliceState = store.getState();
    expect(sampleSliceState).toBeDefined();

    if('sample' in sampleSliceState){
      expect(sampleSliceState.sample).toBeDefined();
    }
  })
})