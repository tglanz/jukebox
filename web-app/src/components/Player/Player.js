import React from 'react'

import kurentoUtils from 'kurento-utils';

const onIceCandidate = ws => candidate => {
    console.group('onIceCandidate');

    const message = {
        id: 'onIceCandidate',
        candidate,
    };

    console.log('message', message);
    ws.sendMessage(JSON.stringify(message));
    
    console.groupEnd();
};


const onOffer = ws => (error, offerSdp) => {
	if (error){
        return console.error('Error generating the offer');
    }

    console.group('onOffer');

	var message = {
		id : 'start',
		sdpOffer : offerSdp,
		videourl : "http://files.openvidu.io/video/format/sintel.webm"
    }
    
    console.log('message', message);

    ws.sendMessage(JSON.stringify(message));
    
    console.groupEnd();
}


const createWs = ({ open, close, error, message }) => {
    // TODO: host
    const ws = new WebSocket('ws://localhost:8080/audio/websocket');
    ws.addEventListener('open', open);
    ws.addEventListener('close', close);
    ws.addEventListener('error', error);
    ws.addEventListener('message', message);
    return ws;

}

export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.videoRef = React.createRef();
    }

    componentWillMount(){
        this.ws = createWs({
            open: this.onWsOpen,
            close: this.onWsClose,
            error: this.onWsError,
            message: this.onWsMessage,
        });
    }

    componentWillUnmount(){
        this.ws.close();
    }

    onWsError(x){
        console.group("Player::onWsError");
        console.log('asd');
        console.groupEnd();
    }

    onWsOpen(){
        console.group("Player::onWsOpen");
        console.groupEnd();
    }

    onWsClose(){
        console.group("Player::onWsClose");
        console.groupEnd();
    }

    onWsMessage(){
        console.group("Player::onWsMessage");
        console.groupEnd();
    }

    onStart(){
        console.group("Player::onStart");
        
        const userMediaConstraints = {
            audio : true,
            video : true,
        };

        console.log('userMediaConstraints', userMediaConstraints);

        const options = {
            remoteVideo : this.videoRef.current,
            mediaConstraints : userMediaConstraints,
            onicecandidate : onIceCandidate(this.ws)
        };

        console.log('options', options);

        this.webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, error => {
            if (error) {
                return console.error(error);
            }
            this.webRtcPeer.generateOffer(onOffer);
        });

        console.groupEnd();
    }
    
    render(){
        return (
            <div className="Player">
                <p>Player</p>
                <video ref={this.videoRef} />
                <button
                    onClick={this.onStart.bind(this)}>Start</button>
            </div>
        )
    }
}