import { Subject, of } from 'rxjs';
import { scan } from 'rxjs/operators';

import Game from 'data/Game';
import { Action, ActionResult } from './Action';
import { Log } from './actions';

export const events = new Subject<Action>();

export function initializeEventStream(updateFn: (Game) => void): void {
  events.pipe(
    scan(mainReducer, {})
  ).subscribe(
    processResult.bind(null, updateFn),
    processEnd.bind(null),
    processEnd.bind(null)
  );
}

function mainReducer(result: ActionResult, action: Action): ActionResult {
  if (!action.update) {
    return result;
  }

  try {
    const { state, actions } = action.update(result.state, events);

    if (!state) {
      return { state: result.state, actions }
    }

    return {state, actions}
  } catch (error) {
    console.error(error);
    return {
      state: result.state,
      actions: of(new Log(`Error ${error}`))
    };
  }
}

function processResult(updatefn: (Game) => void, result: ActionResult): void {
  try {
    (<any>window).state = result.state;
    updatefn(result.state);
  } catch (error) {
    console.error(error);
    events.next(new Log(`Error ${error}`));
  }

  if (result.actions) {
    result.actions.subscribe(
       // Pipe events from the new stream to the main loop
      (v) => events.next(v),

      // Cannot send an error because it will close the Subject
      (e) => events.next(new Log(`Error ${e}`))
    )
  }
}

function processEnd(error?: Error): void {
  console.error("THE MAIN LOOP HAS STOPPED");
  if (error) {
    console.error(error);
  }
}
