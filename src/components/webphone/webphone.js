import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import audio_On from '../../images/audio_on.png';
import audio_Off from '../../images/audio_off.png';
import phone_Off from '../../images/phone_off.png';
import call_off from '../../images/call_off.png';
import call_on from '../../images/call_on.png';
import mic_on from '../../images/mic_on.png';
import mic_off from '../../images/mic_off.png';
import Dialpad from '../dialpad/dialpad';
import { Web } from 'sip.js';

var newCallBtn = null;
var answerCallBtn = null;
var holdResumeBtn = null;
var endCallBtn = null;
var audio = null;
var mic = null;
var statusContent = null;
var phoneStatus = null;
var currentDateTime = null;
var dateTimeInterval = null;
var remoteAudio = null;
var contentPanel = null;
var currentUser = null;
var simpleUser = null;

const WebPhone = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const props = location.state;
    console.log('service_url: ', props.service_url);
    console.log('user_agent : ', props.user_agent);
    const [showDialpad, setShowDialpad] = useState(false);
    const [showHold, setShowHold] = useState(true);
    const server = "ws://" + props.service_url + ":5066";

    useEffect(() => {
        dateTimeInterval = setInterval(updateDateAndTime, 1000);
        newCallBtn = document.getElementById('newCallBtn');
        answerCallBtn = document.getElementById('answerCallBtn');
        holdResumeBtn = document.getElementById('holdResumeBtn');
        endCallBtn = document.getElementById('endCallBtn');
        audio = document.getElementById('audio');
        mic = document.getElementById('mic');
        statusContent = document.getElementById('statusContent');
        phoneStatus = document.getElementById('phoneStatus');
        currentUser = document.getElementById('currentUser');
        contentPanel = document.getElementById('contentPanel');
        audio.src = audio_Off;
        mic.src = mic_off;
        newCallBtn.style.display = 'none';
        endCallBtn.style.display = 'none';
        answerCallBtn.style.display = 'none';
        holdResumeBtn.style.display = 'none';
        initializePhone();
        console.log('WebPhone Component Loaded');
    }, []);

    // Add your component logic here
    function updateDateAndTime() {
        const now = new Date();
        currentDateTime = now.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
        document.getElementById('currentDateTime').innerHTML = currentDateTime.toUpperCase();
    }

    function unRegisterPhone() {
        clearInterval(dateTimeInterval);
        statusContent.innerHTML = 'WebRTC Phone line is Un-Registered';
        phoneStatus.src = call_off;
        //Call the first page
        navigate('/');
    }

    function dialPad(event) {
        event.preventDefault();
        console.log('DialPad Clicked ' + showDialpad);
        setShowDialpad(!showDialpad);
    }

    async function handleMakeNewCall(phoneNumber) {
        if (!phoneNumber) {
            return;
        } else {
            phoneNumber = "sip:" + phoneNumber + "@" + props.service_url + ":5060";
        }
        console.log('Make New Call: ' + phoneNumber);
        setShowDialpad(false);
        contentPanel.innerHTML = 'Calling ' + phoneNumber + '...';
        await simpleUser.call(phoneNumber);
    }

    async function handleAnswerCall() {
        console.log('Answering Call');
        await simpleUser.answer();
    }

    async function handleEndCall(event) {
        event.preventDefault();
        console.log('Ending Call');
        await simpleUser.hangup();
        newCallBtn.style.display = 'inline';
        endCallBtn.style.display = 'none';
        holdResumeBtn.style.display = 'none';
        contentPanel.innerHTML = '';
        setShowDialpad(false);
        setShowHold(true);
    }

    async function handleHoldResume(event) {
        event.preventDefault();
        if (simpleUser.isHeld()) {
            await simpleUser.unhold();
            console.log('Call Resumed:');
            contentPanel.innerHTML = 'Call Resumed';
            setShowHold(true);
        } else {
            await simpleUser.hold();
            console.log('Call Held:');
            contentPanel.innerHTML = 'Call Held';
            setShowHold(false);
        }
    }

    async function initializePhone() {
        statusContent.innerHTML = 'Initializing WebRTC Phone';
        const userAgent = "sip:" + props.user_agent + "@" + props.service_url + ":5060";
        currentUser.innerHTML = userAgent;
        getMediaStreams();
        const options = {
            aor: userAgent,
            media: {
                constraints: {
                  audio: true,
                  video: false // Adjust according to your needs
                }
            },
            userAgentOptions: {
                authorizationUsername: '1002', // SIP username
                authorizationPassword: '1234', // SIP password
                displayName: '1002',
                transportOptions: {
                  server: server, // WebSocket URL for SIP signaling
                  traceSip: true // Optional: Enable SIP tracing for debugging
                }
            }
        }

        simpleUser = new Web.SimpleUser(server, options);

        simpleUser.delegate = {
            onMessageReceived: (message) => console.log('Message received:', message),
            onInvite: (request) => console.log("Incoming Invite:", request),
            onRegistered: () => console.log('Successfully registered with the SIP server'),
            onUnregistered: () => console.log('Successfully unregistered from the SIP server'),
            onRegistrationFailed: (error) => console.error('Registration failed:', error),
            onCallReceived: (call) => {
                console.log('Incoming call:', call);
                contentPanel.innerHTML = 'Incoming Call from';
                newCallBtn.style.display = 'none';
                answerCallBtn.style.display = 'inline';
                holdResumeBtn.style.display = 'none';
                endCallBtn.style.display = 'inline';
            },
            onCallCreated: (call) => {
                console.log('Call Created:', call);
                setShowDialpad(false);
            },
            onCallAnswered: (call) => {
                console.log('Call answered:', call);
                const remoteStream = simpleUser.remoteMediaStream;
                if (remoteStream) {
                    remoteAudio.srcObject = remoteStream;
                    remoteAudio.play().catch(error => console.error('Error playing remote audio: ', error));
                }
                contentPanel.innerHTML = 'Call Answered';
                setShowDialpad(false);
                newCallBtn.style.display = 'none';
                answerCallBtn.style.display = 'none';
                holdResumeBtn.style.display = 'inline';
                endCallBtn.style.display = 'inline';
            },
            onCallHangup: (call) => {
                console.log('Call hung up:', call);
                contentPanel.innerHTML = '';
                setShowDialpad(false);
                newCallBtn.style.display = 'inline';
                answerCallBtn.style.display = 'none';
                holdResumeBtn.style.display = 'none';
                endCallBtn.style.display = 'none';
                remoteAudio.pause();
                remoteAudio.currentTime = 0;
                remoteAudio.src = '';
            },
            onCallEnded: (call) => {
                console.log('Call ended:', call);
                setShowDialpad(false);
                newCallBtn.style.display = 'inline';
                answerCallBtn.style.display = 'none';
                holdResumeBtn.style.display = 'none';
                endCallBtn.style.display = 'none';
                remoteAudio.pause();
                remoteAudio.currentTime = 0;
                remoteAudio.src = '';
            },
            onCallHold: (call) => {
                console.log("Call on hold:", call);
            },
            onCallUnhold: (call) => {
                console.log("Call resumed:", call);
            }
        }

        await simpleUser.connect();
        await simpleUser.register();
    }

    async function getMediaStreams() {
        remoteAudio  = document.getElementById('remoteAudio');
        console.log("AudioStream: ", remoteAudio);
        if (remoteAudio != null) {
            audio.src = audio_On;
            mic.src = mic_on;
            phoneStatus.src = call_on;
            newCallBtn.style.display = 'inline';
            statusContent.innerHTML = "WebRTC Phone line is Registered. Audio On";
        } else {
            audio.src = audio_Off;
            mic.src = mic_off;
            phoneStatus.src = call_off;
            newCallBtn.style.display = 'none';
            answerCallBtn.style.display = 'none';
            endCallBtn.style.display = 'none';
            statusContent.innerHTML = "WebRTC Phone line is Un-Registered. Audio Off";
        }
    }

    async function handleMuteUnmute() {
        if (simpleUser.isMuted()) {
            await simpleUser.unmute();
            mic.src = mic_on;
            console.log("Mic is unmuted");
        } else {
            await simpleUser.mute();
            mic.src = mic_off;
            console.log("Mic is muted");
        }
    }

    return (
        <div className="card webphone border border-secondary">
            <div className="card-header h4">
                WebRTC Phone
            </div>
            <div id="callPanel" className="card-body webphone-screen">
                <div className="container-fluid g-0">
                    <div className="row g-0 pb-1">
                        <div className="col">
                            <button type="button" className="btn btn-link btn-sm p-0 me-1" onClick={handleMuteUnmute}><img id="mic" className="webphone-icon-panel" src={mic_on} alt="Mic On"/></button>
                            <button type="button" className="btn btn-link btn-sm p-0 me-1"><img id="audio" className="webphone-icon-panel" src={audio_Off} alt="Audio Off"/></button>
                            <button type="button" className="btn btn-link btn-sm p-0 me-1"><img id="phoneStatus" className="webphone-icon-panel" src={call_off} alt="Call Off"/></button>
                            <button type="button" className="btn btn-link btn-sm p-0 me-1" onClick={unRegisterPhone}><img className="webphone-icon-panel" src={phone_Off} alt="Phone Off"/></button>
                        </div>
                        <div className="col d-flex flex-column justify-content-center text-end">
                            <span id="currentDateTime" className="webphone-timetext text-end"></span>
                            <span id="currentUser" className="webphone-timetext text-end"></span>
                        </div>
                    </div>
                    <div className="row g-0 webphone-content-panel pb-1">
                        <div className="col">
                            <div id="contentPanel"></div>
                            { showDialpad ? <Dialpad onMakeNewCall={handleMakeNewCall}/> : null }
                        </div>
                    </div>
                    <div className="row g-0 webphone-button-panel">
                        <div className="col">
                            <button id="newCallBtn" type="button" className="btn btn-success btn-sm me-2" onClick={dialPad}>
                                { showDialpad ? 'Cancel Call' : 'New Call' }
                            </button>
                            <button id="answerCallBtn" type="button" className="btn btn-success btn-sm me-2" onClick={handleAnswerCall}>Answer Call</button>
                            <button id="holdResumeBtn" type="button" className="btn btn-primary btn-sm me-2" onClick={handleHoldResume}>
                                { showHold ? 'Hold' : 'Resume' }</button>
                            <button id="endCallBtn" type="button" className="btn btn-danger btn-sm me-2" onClick={handleEndCall}>End Call</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer pb-1 text-muted">
                <div className="row">
                    <div className="card-text small"><label>Status:&nbsp;</label><label id="statusContent">Ready</label></div>
                </div>
                <div className="row">
                    <audio id="remoteAudio" controls>
                        <p className="card-text small">Audio Not Supported.</p>
                    </audio>
                </div>
            </div>
        </div>
    );
};

export default WebPhone;