export declare type ConnectionOptions = {
    signallingServer?: string;
    roomName?: string;
    rtcOpts?: Object;
    channelName?: string;
    channelOpts?: Object;
    debugMode?: boolean;
};
export default class Connection {
    options: ConnectionOptions;
    debug: (msg: string) => void;
    socket: SocketIoClient;
    myId: number;
    pcMap: Object;
    dataChannels: Array<DataChannel>;
    room: string;
    _callbacks: Object;
    constructor(opts?: ConnectionOptions);
    configureSocketIO: () => void;
    createConnection: (id: number, create: boolean) => any;
    createDataChannel: (peerconnection: PeerConnection) => void;
    callPeer: (pc: PeerConnection) => void;
    onOffer: (description: PeerDescription, pc: PeerConnection) => void;
    onAnswer: (description: PeerDescription, pc: PeerConnection) => void;
    setLocalDescription: (description: PeerDescription, pc: PeerConnection) => void;
    handleIceCandidate: (event: RTCDataChannel, pc: PeerConnection) => void;
    onCandidate: (candidate: RTCIceCandidate, pc: PeerConnection) => void;
    setDataChannelCallbacks: (dataChannel: DataChannel) => void;
    handleDataChannelState: (dataChannel: DataChannel) => void;
    onDataChannel: (event: RTCDataChannel, pc: PeerConnection) => void;
    onMessage: (event: RTCDataChannel, dc: DataChannel) => void;
    on: (event: string, callback: (...args: any[]) => void) => void;
    sendMessage: (message: string) => void;
    close: () => void;
}
