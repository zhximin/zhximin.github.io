import Sockjs from "sockjs-client/dist/sockjs";
import Stomp from "stompjs";
import { merge } from "lodash";
class Socket {
	constructor(options) {
		this.options = merge(
			{
				url: "http://10.111.32.74:18080/pif-smart-office/websocket",
				subscribe: "/topic", // 订阅
				attestation: {},
			},
			options
		);
		this.socket = null;
		this.stompClient = null;
	}
	connect(callback) {
		this.socket = new Sockjs(this.options.url);
		this.stompClient = Stomp.over(this.socket);
		this.stompClient.connect(this.options.attestation, (frame) => {
			// 连接成功
			if (typeof this.options.subscribe === "string") {
				this.stompClient.subscribe(this.options.subscribe, (res) => {
					callback && callback(JSON.parse(res.body));
				});
			}
			// else if (Array.isArray(this.options.subscribe)) {
			//     this.options.subscribe.forEach((_, i) => {
			//       this.stompClient.subscribe(this.options.subscribe, (res) => {
			//         resolve({
			//           subscribe: _,
			//           data: JSON.parse(res.body)
			//         });
			//       });
			//     });
			//   }
		});
	}

	send(message) {
		this.stompClient.send(this.options.subscribe, this.options.attestation, JSON.stringify(message));
	}

	close(callback) {
		this.stompClient.disconnect(function () {
			callback && callback();
		});
	}
}

export default Socket;
