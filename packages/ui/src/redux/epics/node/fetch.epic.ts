import { catchError, from, map, of, switchMap } from 'rxjs'
import { Epic, ofType } from 'redux-observable'
import nodeApi from '@/api/node/nodes.api'
import { fetchNodesTrigger } from '@/redux/slices/nodeSlice'
import { NodeActionTypes, RootState } from '@/redux/types'

const fetchNodesEpic: Epic<any, any, RootState> = (action$: any, state$) =>
  action$.pipe(
    ofType(fetchNodesTrigger.type),
    switchMap(() =>
      state$.value.login.user
        ? from(nodeApi.fetch()).pipe(
            map(nodes => ({ type: NodeActionTypes.FETCH, payload: { nodes } })),
            catchError(() => of({ type: NodeActionTypes.FETCH }))
          )
        : of({ type: NodeActionTypes.FETCH } as any)
    )
  )

export default fetchNodesEpic
