import React, { useEffect, useState } from 'react'
import { defaultNodeWidth, defaultNodeHeight, defaultNodeRadius } from '@/automation-engine/utils'
import useDrag from '@/automation-engine/hooks/drag/useDrag'
import { Node as NodeType } from '@/automation-engine/models/node'
import { filter, fromEvent, tap, timestamp, withLatestFrom } from 'rxjs'
import { select } from 'd3'
import NewNode from '../NewNode'
import styles from './node.module.scss'
import NodePopover from './NodePopover'

function Node({ node }: { node: NodeType }) {
  const ref = React.useRef<SVGRectElement>(null)
  const [editMode, setEditMode] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const handleDoubleClick = () => setEditMode(!editMode)
  const handleInputToLabel = () => setEditMode(false)
  const [showPopover, setShowPopover] = useState<boolean>(false)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleInputToLabel()
  }
  useDrag(ref, node.id)

  useEffect(() => {
    const element = select(ref.current)
    if (!element) return undefined
    if (!ref.current) return undefined

    const mousedown$ = fromEvent<MouseEvent>(element.node()!, 'mousedown').pipe(timestamp())
    const mouseup$ = fromEvent<MouseEvent>(element.node()!, 'mouseup').pipe(timestamp())
    const noDragMouseup$ = mouseup$.pipe(
      withLatestFrom(mousedown$),
      filter(([mouseup, mousedown]) => mouseup.timestamp - mousedown.timestamp <= 200),
      tap(() => setShowPopover(!showPopover)),
    )
    const subscribe = noDragMouseup$.subscribe()

    return () => subscribe.unsubscribe()
  }, [showPopover])

  return (
    <>
      <rect
        ref={ref}
        x={node.x}
        y={node.y}
        rx={defaultNodeRadius}
        width={defaultNodeWidth}
        height={defaultNodeHeight}
        fill="rgb(18, 18, 20)"
        className={styles.node}
        onDoubleClick={handleDoubleClick}
      />
      <text
        x={node.x + 7}
        y={node.y - 8}
        textAnchor="start"
        dominantBaseline="central"
        style={{ pointerEvents: 'none', fill: 'darkcyan', fontSize: '0.6em' }}
        className={styles.nonSelectable}
      >
        Action
      </text>
      {editMode
        ? (
          <foreignObject x={node.x} y={node.y} width={defaultNodeWidth} height={defaultNodeHeight}>
            <input
              autoFocus
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={handleInputToLabel}
              onKeyDown={handleKeyDown}
              className={styles.blinkingCursor}
            />
          </foreignObject>
        )
        : (
          <text
            x={node.x + 14}
            y={node.y + 24}
            textAnchor="start"
            dominantBaseline="central"
            style={{ pointerEvents: 'none', fill: '#dadada', fontSize: '0.8em', fontWeight: 'bold' }}
            className={styles.nonSelectable}
          >
            Do something
          </text>
        )}
      <text
        x={node.x + 14}
        y={node.y + 46}
        textAnchor="start"
        dominantBaseline="central"
        style={{ pointerEvents: 'none', fill: 'darkgray', fontSize: '0.7em' }}
        className={styles.nonSelectable}
      >
        Description of do something...
      </text>

      <NewNode parentNode={node} />
      {showPopover && <NodePopover node={node} />}
    </>
  )
}

export default Node
