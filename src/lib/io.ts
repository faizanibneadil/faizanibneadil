import { BasePayload, Payload } from 'payload';
import { Server } from 'socket.io'

export type IOServer = Server | null
let io: IOServer = null

export function initSocket(payloadInstance: BasePayload & { io?: typeof io }) {
    if (io === null) {
        io = new Server(3001, {
            cors: {
                origin: process.env.NEXT_PUBLIC_SERVER_URL! || '*'
            }
        })
    }

    // after success
    io.on('connection', ws => {
        payloadInstance.logger.info(`New socket connection is established::${ws.id}`)
        payloadInstance.io = io

        ws.on('ping', (data) => {
            payloadInstance.logger.info(`someone is ping me returning pong message. ${data}`)
            ws.emit('pong', { message: 'pong' })
        })
    })
    return io
}