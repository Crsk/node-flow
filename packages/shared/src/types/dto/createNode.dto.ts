import { Node } from 'shared/types/models/Node.interface'

export type CreateNodePayload = Omit<Node, 'createdAt'>
