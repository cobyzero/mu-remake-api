import { MessageBody, SubscribeMessage, WebSocketGateway } from "@nestjs/websockets";
import { Socket } from "dgram";

@WebSocketGateway({
    port: 3000,
})
export class AppGateway {
    server: Socket;

    afterInit(server: Socket) {
        this.server = server;
    }


    @SubscribeMessage('message')
    handleMessage(@MessageBody() data: string): string {
        console.log(data);
        this.server.emit('data', "llego la data");

        return data;
    }
}
