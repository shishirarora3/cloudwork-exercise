import {workloadSubmission} from "./epics";
import {ActionsObservable, StateObservable} from 'redux-observable';
import {submit} from "./actions";
import {Subject} from "rxjs";
import {RootState} from "../reducer";

it("test workloadSubmission epic", (done) => {
    //expected
    const complexity = 2;
    const expected = {
        "payload": {complexity, "id": 0, "status": "WORKING"},
        "type": "workload/CREATED"
    };
    //action
    const action$ = ActionsObservable.of(
        submit({complexity: 2})
    );
    const stateSubject = new Subject<RootState>();
    const initialState: RootState = {
        workloads: []
    };
    const state$ = new StateObservable<RootState>(stateSubject, initialState);
    workloadSubmission(action$, state$, {})
        .subscribe((actual: any) => {
            expect(actual.type).toEqual(expected.type);
            expect(actual.payload.complexity).toEqual(complexity);
            expect(actual.payload.id).toEqual(expected.payload.id);
            expect(actual.payload.status).toEqual(expected.payload.status);
            done();
        })

});
