import React from 'react'
import kurentoUtils from 'kurento-utils';
import './Player.css';

const onIceCandidate = ws => candidate => {
    console.groupCollapsed('onIceCandidate');

    const message = {
        id: 'onIceCandidate',
        candidate,
    };

    console.log('message', message);
    ws.send(JSON.stringify(message));

    console.groupEnd();
};

const onOffer = ws => (error, offerSdp) => {
	if (error){
        return console.error('Error generating the offer', error);
    }

    console.groupCollapsed('onOffer');

	var message = {
		id : 'start',
		sdpOffer : offerSdp,
		videourl : "http://files.openvidu.io/video/format/sintel.webm"
    }
    
    console.log('message', JSON.stringify(message));
    ws.send(JSON.stringify(message));

    console.groupEnd();
};


const createWs = ({ open, close, error, message }) => {
    // TODO: host
    const ws = new WebSocket('wss://localhost:8443/audio/websocket');
    ws.addEventListener('open', open);
    ws.addEventListener('close', close);
    ws.addEventListener('error', error);
    ws.addEventListener('message', message);
    return ws;
};

export default class Player extends React.Component {

    constructor(props) {
        super(props);
        this.mediaRef = React.createRef();
    }

    componentWillMount(){
        this.ws = createWs({
            open: this.onWsOpen.bind(this),
            close: this.onWsClose.bind(this),
            error: this.onWsError.bind(this),
            message: this.onWsMessage.bind(this),
        });

        window.addEventListener('beforeunload', () => this.ws.close());
    }

    onWsError(error){
        console.groupCollapsed("Player::onWsError");
        console.error(error);
        console.groupEnd();
    }

    onWsOpen(){
        console.groupCollapsed("Player::onWsOpen");
        console.groupEnd();
    }

    onWsClose(){
        console.groupCollapsed("Player::onWsClose");
        console.groupEnd();
    }

    onWsMessage(message){

        const data = JSON.parse(message.data);
        
        switch (data.id){
            case 'startResponse':
                console.log('SDP answer received from server. Processing ...');
                this.webRtcPeer.processAnswer(data.sdpAnswer, function(error) {
                    if (error) {
                        return console.error('Error process message: ' + error);
                    }
                });
                break;
            case 'iceCandidate':
                this.webRtcPeer.addIceCandidate(data.candidate, function(error) {
                    if (error) {
                        return console.error('Error adding candidate: ' + error);
                    }
                });
                break;
        }
    }

    onStart(){
        console.groupCollapsed("Player::onStart");
        
        const userMediaConstraints = {
            audio : true,
            video : true,
        };

        const options = {
            remoteVideo : this.mediaRef.current,
            mediaConstraints : userMediaConstraints,
            onicecandidate: onIceCandidate(this.ws),
        };

        this.webRtcPeer = new kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options, error => {
            if (error) {
                return console.error(error);
            }
            
            this.webRtcPeer.generateOffer(onOffer(this.ws));
        });

        console.groupEnd();
    }
    
    render(){
        return (
            <div className="Player">
                <p>Player</p>
                <video id="video" autoPlay width="200px" height="200px" ref={this.mediaRef}></video>
                <button
                    onClick={this.onStart.bind(this)}>Start</button>
            </div>
        )
    }
}