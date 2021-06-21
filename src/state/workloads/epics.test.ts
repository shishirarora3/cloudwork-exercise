import {workloadSubmission} from "./epics";
import { ActionsObservable, StateObservable } from 'redux-observable';
import {submit} from "./actions";
import { Subject } from "rxjs";
import {RootState} from "../reducer";

it("test epics", (done)=>{
    const expected = {};
    const action$ = ActionsObservable.of(
        submit({complexity: 2})
    );
    const stateSubject = new Subject<RootState>();
    const initialState: RootState = {
        workloads: []
    };
    const state$ = new StateObservable<RootState>(stateSubject, initialState );
    workloadSubmission(action$, state$, {})
            .subscribe((actual: any)=>{
                expect(actual).toEqual(expected);
                done();
            })

});
