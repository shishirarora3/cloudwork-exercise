import {combineEpics, Epic} from 'redux-observable';
import {
    filter,
    map,
    mergeMap,
    takeWhile
} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';
import {WorkloadService} from './services';
import {RootAction, RootState} from '../reducer';
import * as workloadsActions from './actions';
import {updateStatus, created} from "./actions";
import {from, timer} from "rxjs";

const workloadService = new WorkloadService();
type AppEpic = Epic<RootAction, RootAction, RootState>;

export const workloadSubmission: AppEpic = (action$) => (
    action$.pipe(
        filter(isActionOf(workloadsActions.submit)),
        mergeMap(submittedAction => from(workloadService.create({complexity: submittedAction.payload.complexity}))
            .pipe(
                map(wl => created(wl))
            )
        )
    )
);

const workloadCompletion: AppEpic = (action$) => (
    action$.pipe(
        filter(isActionOf(workloadsActions.created)),
        mergeMap(createdAction => timer(createdAction.payload.completeDate.getTime() - new Date().getTime() + 1000)
            .pipe(
                mergeMap(() => from(workloadService.checkStatus({id: createdAction.payload.id}))
                    .pipe(
                        map(wl => updateStatus(wl))
                    )))
        )
    )
);

const workloadCancellation: AppEpic = (action$) => (
    action$.pipe(
        filter(isActionOf(workloadsActions.cancel)),
        mergeMap(cancelledAction => from(workloadService.cancel({id: cancelledAction.payload.id}))
            .pipe(
                mergeMap((cancelledAction) => from(workloadService.checkStatus({id: cancelledAction.id}))
                    .pipe(
                        map(wl => updateStatus(wl))
                    ))
            )
        )
    )
);
export const epics = combineEpics(
    workloadSubmission,
    workloadCompletion,
    workloadCancellation
);

export default epics;
