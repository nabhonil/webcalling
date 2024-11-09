#WebCalling

This project is about using Freeswitch as the IP PBX and using webcalling as the mechanism for the users to make calls. 
One end is a zoiper client who has logged in as 1001
and another end is the WebRTC phone 1002. 

UI is created using ReactJs 20, Bootstrap 5 and SIP.js.
IPPBX used is FreeSwitch installed on a windows 11.

The screenshots along with SIP messages are as follows:-
##Login Screen
![image](https://github.com/user-attachments/assets/6e384af2-d028-4155-90cc-65618b690fba)
The moment Initialize Calling button is clicked. It sends the following SIP Messages over websocket connection to FreeSwitch

>sip.Transport | Sending WebSocket message:
>REGISTER sip:10.105.10.116:5060 SIP/2.0
>Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK491249
>To: <sip:1002@10.105.10.116:5060>
>From: "1002" <sip:1002@10.105.10.116:5060>;tag=pfkt19pi9d
>CSeq: 3 REGISTER
>Call-ID: geklegd7iobftuch3i2a
>Max-Forwards: 70
>Authorization: Digest algorithm=MD5, username="1002", realm="10.105.10.116", nonce="7954bbe7-65e1-4777-a33b-0aa03f1ed316", uri="sip:10.105.10.116:5060", response="959fbcd0b92feab202316a1b469155f3", qop=auth, cnonce="2aohihbpvp6q", nc=00000001
>Contact: <sip:8bum4n4l@7bhs9fl1c2ll.invalid;transport=ws>;expires=600
>Allow: ACK,CANCEL,INVITE,MESSAGE,BYE,OPTIONS,INFO,NOTIFY,REFER
>Supported: outbound, path, gruu
>User-Agent: SIP.js/0.21.1
>Content-Length: 0

>sip.Transport | Received WebSocket text message:
>SIP/2.0 200 OK
>Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK491249;received=10.105.10.116;rport=44539
>From: "1002" <sip:1002@10.105.10.116:5060>;tag=pfkt19pi9d
>To: <sip:1002@10.105.10.116:5060>;tag=Zg66rjDajv8cN
>Call-ID: geklegd7iobftuch3i2a
>CSeq: 3 REGISTER
>Contact: <sip:8bum4n4l@7bhs9fl1c2ll.invalid;transport=ws>;expires=600
>Date: Sat, 09 Nov 2024 14:16:35 GMT
>User-Agent: FreeSWITCH-mod_sofia/1.10.12-release~a88d069d6f~64bit
>Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REGISTER, REFER, NOTIFY, PUBLISH, SUBSCRIBE
>Supported: timer, path, replaces
>Content-Length: 0

Once it is registered, FreeSwitch Sends the Notify with more capabilities
>sip.Transport | Received WebSocket text message:
>NOTIFY sip:8bum4n4l@7bhs9fl1c2ll.invalid;transport=ws SIP/2.0
>Via: SIP/2.0/WS 10.105.10.116:5066;branch=z9hG4bKv5mm130UjScvS
>Route: <sip:8bum4n4l@10.105.10.116:44539>;transport=ws
>Max-Forwards: 70
>From: <sip:1002@10.105.10.116>;tag=0SZZtDyDF5yZg
>To: <sip:1002@10.105.10.116>
>Call-ID: 11a73f02-1948-123e-3390-21c4164d317f
>CSeq: 91027105 NOTIFY
>Contact: <sip:mod_sofia@10.105.10.116:5060>
>User-Agent: FreeSWITCH-mod_sofia/1.10.12-release~a88d069d6f~64bit
>Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REGISTER, REFER, NOTIFY, PUBLISH, SUBSCRIBE
>Supported: timer, path, replaces
>Event: message-summary
>Allow-Events: talk, hold, conference, presence, as-feature-event, dialog, line-seize, call-info, sla, include-session-description, presence.winfo, message-summary, refer
>Subscription-State: terminated;reason=noresource
>Content-Type: application/simple-message-summary
>Content-Length: 65
>Messages-Waiting: no
>Message-Account: sip:1002@10.105.10.116

>sip.Transport | Sending WebSocket message:
>SIP/2.0 200 OK
>Via: SIP/2.0/WS 10.105.10.116:5066;branch=z9hG4bKv5mm130UjScvS
>From: <sip:1002@10.105.10.116>;tag=0SZZtDyDF5yZg
>To: <sip:1002@10.105.10.116>;tag=nsgpq566tg
>CSeq: 91027105 NOTIFY
>Call-ID: 11a73f02-1948-123e-3390-21c4164d317f
>Supported: outbound
>User-Agent: SIP.js/0.21.1
>Content-Length: 0

User Idle Screen - Now we get the user IDLE screen.
![image](https://github.com/user-attachments/assets/b3cddf58-0120-484b-a333-8dabbc3f203b)

New Call Screen - Now when we make a new call
![image](https://github.com/user-attachments/assets/102b1eb8-325e-4869-aa98-e63b7f8b008d)
sip.Transport | Sending WebSocket message:

INVITE sip:1001@10.105.10.116:5060 SIP/2.0
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK8808481
To: <sip:1001@10.105.10.116:5060>
From: "1002" <sip:1002@10.105.10.116:5060>;tag=5tl73fih4o
CSeq: 2 INVITE
Call-ID: gekleie1ceg925i9u7qp
Max-Forwards: 70
Proxy-Authorization: Digest algorithm=MD5, username="1002", realm="10.105.10.116", nonce="320582a2-5447-4b6f-99a7-4785b96e4423", uri="sip:1001@10.105.10.116:5060", response="055bed1a12574161753d38d943204c9d", qop=auth, cnonce="311mob7p2543", nc=00000001
Contact: <sip:8bum4n4l@7bhs9fl1c2ll.invalid;transport=ws;ob>
Allow: ACK,CANCEL,INVITE,MESSAGE,BYE,OPTIONS,INFO,NOTIFY,REFER
Supported: outbound
User-Agent: SIP.js/0.21.1
Content-Type: application/sdp
Content-Length: 2696

v=0
o=- 7984168729586991342 2 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0
a=extmap-allow-mixed
a=msid-semantic: WMS 67b12fa8-c181-4f0d-a390-56c19bd07a67
m=audio 49721 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
c=IN IP4 103.148.39.46
a=rtcp:9 IN IP4 0.0.0.0
a=candidate:451435517 1 udp 2122260223 172.27.112.1 49718 typ host generation 0 network-id 2
a=candidate:2999745851 1 udp 2122194687 192.168.56.1 49719 typ host generation 0 network-id 3
a=candidate:77142221 1 udp 2122129151 192.168.137.1 49720 typ host generation 0 network-id 1 network-cost 10
a=candidate:2512953610 1 udp 2122063615 10.105.10.116 49721 typ host generation 0 network-id 4 network-cost 10
a=candidate:1416341261 1 tcp 1518280447 172.27.112.1 9 typ host tcptype active generation 0 network-id 2
a=candidate:4233069003 1 tcp 1518214911 192.168.56.1 9 typ host tcptype active generation 0 network-id 3
a=candidate:1243276349 1 tcp 1518149375 192.168.137.1 9 typ host tcptype active generation 0 network-id 1 network-cost 10
a=candidate:3679149562 1 tcp 1518083839 10.105.10.116 9 typ host tcptype active generation 0 network-id 4 network-cost 10
a=candidate:343975870 1 udp 1685855999 103.148.39.46 49721 typ srflx raddr 10.105.10.116 rport 49721 generation 0 network-id 4 network-cost 10
a=ice-ufrag:VCoG
a=ice-pwd:X78uD0fAvGQ5+WYsY3X8o0AK
a=ice-options:trickle
a=fingerprint:sha-256 3C:76:96:0B:7C:9F:A0:F4:A7:BA:D6:31:34:CB:25:D3:FA:C2:D4:8D:FE:68:02:F1:17:C0:E8:82:AD:4A:99:10
a=setup:actpass
a=mid:0
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
a=extmap:6 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id
a=sendrecv
a=msid:67b12fa8-c181-4f0d-a390-56c19bd07a67 441444ae-0dc1-4306-9bc8-5d5271519062
a=rtcp-mux
a=rtpmap:111 opus/48000/2
a=rtcp-fb:111 transport-cc
a=fmtp:111 minptime=10;useinbandfec=1
a=rtpmap:103 ISAC/16000
a=rtpmap:104 ISAC/32000
a=rtpmap:9 G722/8000
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:106 CN/32000
a=rtpmap:105 CN/16000
a=rtpmap:13 CN/8000
a=rtpmap:110 telephone-event/48000
a=rtpmap:112 telephone-event/32000
a=rtpmap:113 telephone-event/16000
a=rtpmap:126 telephone-event/8000
a=ssrc:108159796 cname:tu3dLth+U1DsgX10
a=ssrc:108159796 msid:67b12fa8-c181-4f0d-a390-56c19bd07a67 441444ae-0dc1-4306-9bc8-5d5271519062
a=ssrc:108159796 mslabel:67b12fa8-c181-4f0d-a390-56c19bd07a67
a=ssrc:108159796 label:441444ae-0dc1-4306-9bc8-5d5271519062

sip.Transport | Received WebSocket text message:
SIP/2.0 100 Trying
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK8808481;received=10.105.10.116;rport=44539
From: "1002" <sip:1002@10.105.10.116:5060>;tag=5tl73fih4o
To: <sip:1001@10.105.10.116:5060>
Call-ID: gekleie1ceg925i9u7qp
CSeq: 2 INVITE
User-Agent: FreeSWITCH-mod_sofia/1.10.12-release~a88d069d6f~64bit
Content-Length: 0

sip.Transport | Received WebSocket text message:
SIP/2.0 183 Session Progress
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK8808481;received=10.105.10.116;rport=44539
From: "1002" <sip:1002@10.105.10.116:5060>;tag=5tl73fih4o
To: <sip:1001@10.105.10.116:5060>;tag=81958549QcHND
Call-ID: gekleie1ceg925i9u7qp
CSeq: 2 INVITE
Contact: <sip:1001@10.105.10.116:5060;transport=udp>
User-Agent: FreeSWITCH-mod_sofia/1.10.12-release~a88d069d6f~64bit
Accept: application/sdp
Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REGISTER, REFER, NOTIFY, PUBLISH, SUBSCRIBE
Supported: timer, path, replaces
Allow-Events: talk, hold, conference, presence, as-feature-event, dialog, line-seize, call-info, sla, include-session-description, presence.winfo, message-summary, refer
Content-Type: application/sdp
Content-Disposition: session
Content-Length: 892
Remote-Party-ID: "1001" <sip:1001@10.105.10.116>;party=calling;privacy=off;screen=no

v=0
o=FreeSWITCH 1731132270 1731132271 IN IP4 10.105.10.116
s=FreeSWITCH
c=IN IP4 10.105.10.116
t=0 0
a=msid-semantic: WMS XGVxbPxo9KKR5XawpNcZrOMAwH0DOR6u
m=audio 29898 UDP/TLS/RTP/SAVPF 111 110
a=rtpmap:111 opus/48000/2
a=fmtp:111 useinbandfec=1; minptime=10
a=rtpmap:110 telephone-event/48000
a=ptime:20
a=fingerprint:sha-256 CC:4B:FA:70:33:BC:80:5F:61:3C:96:5D:C9:C9:ED:5E:E8:A9:96:37:37:62:77:DE:E9:A5:3B:A3:A8:8E:31:8F
a=setup:active
a=rtcp-mux
a=rtcp:29898 IN IP4 10.105.10.116
a=ice-ufrag:663KNsQKxKGKtjIV
a=ice-pwd:GaLo9vOH7Lm0sYiHGxO1k5Yi
a=candidate:9977742373 1 udp 2130706431 10.105.10.116 29898 typ host generation 0
a=end-of-candidates
a=ssrc:1765432789 cname:p85Y0A7Jv9E6dBmH
a=ssrc:1765432789 msid:XGVxbPxo9KKR5XawpNcZrOMAwH0DOR6u a0
a=ssrc:1765432789 mslabel:XGVxbPxo9KKR5XawpNcZrOMAwH0DOR6u
a=ssrc:1765432789 label:XGVxbPxo9KKR5XawpNcZrOMAwH0DOR6ua0

Call in Progress
![image](https://github.com/user-attachments/assets/658baa72-a9c2-4970-abe6-8f7c9ec68376)

Call is Answered
![image](https://github.com/user-attachments/assets/a5105f1b-d814-40fe-8ef0-aff2e5007b28)

sip.Transport | Received WebSocket text message:
SIP/2.0 200 OK
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK8808481;received=10.105.10.116;rport=44539
From: "1002" <sip:1002@10.105.10.116:5060>;tag=5tl73fih4o
To: <sip:1001@10.105.10.116:5060>;tag=81958549QcHND
Call-ID: gekleie1ceg925i9u7qp
CSeq: 2 INVITE
Contact: <sip:1001@10.105.10.116:5060;transport=udp>
User-Agent: FreeSWITCH-mod_sofia/1.10.12-release~a88d069d6f~64bit
Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REGISTER, REFER, NOTIFY, PUBLISH, SUBSCRIBE
Supported: timer, path, replaces
Allow-Events: talk, hold, conference, presence, as-feature-event, dialog, line-seize, call-info, sla, include-session-description, presence.winfo, message-summary, refer
Content-Type: application/sdp
Content-Disposition: session
Content-Length: 892
Remote-Party-ID: "Outbound Call" <sip:1001@10.105.10.116>;party=calling;privacy=off;screen=no

v=0
o=FreeSWITCH 1731132270 1731132271 IN IP4 10.105.10.116
s=FreeSWITCH
c=IN IP4 10.105.10.116
t=0 0
a=msid-semantic: WMS XGVxbPxo9KKR5XawpNcZrOMAwH0DOR6u
m=audio 29898 UDP/TLS/RTP/SAVPF 111 110
a=rtpmap:111 opus/48000/2
a=fmtp:111 useinbandfec=1; minptime=10
a=rtpmap:110 telephone-event/48000
a=ptime:20
a=fingerprint:sha-256 CC:4B:FA:70:33:BC:80:5F:61:3C:96:5D:C9:C9:ED:5E:E8:A9:96:37:37:62:77:DE:E9:A5:3B:A3:A8:8E:31:8F
a=setup:active
a=rtcp-mux
a=rtcp:29898 IN IP4 10.105.10.116
a=ice-ufrag:663KNsQKxKGKtjIV
a=ice-pwd:GaLo9vOH7Lm0sYiHGxO1k5Yi
a=candidate:9977742373 1 udp 2130706431 10.105.10.116 29898 typ host generation 0
a=end-of-candidates
a=ssrc:1765432789 cname:p85Y0A7Jv9E6dBmH
a=ssrc:1765432789 msid:XGVxbPxo9KKR5XawpNcZrOMAwH0DOR6u a0
a=ssrc:1765432789 mslabel:XGVxbPxo9KKR5XawpNcZrOMAwH0DOR6u
a=ssrc:1765432789 label:XGVxbPxo9KKR5XawpNcZrOMAwH0DOR6ua0

Call is put on Hold
![image](https://github.com/user-attachments/assets/a4091d3e-d7ab-4dc3-83f9-6e8228f346a1)

sip.Transport | Sending WebSocket message:
INVITE sip:1001@10.105.10.116:5060;transport=udp SIP/2.0
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK4683819
To: <sip:1001@10.105.10.116:5060>;tag=meSFyaFmNQvNr
From: "1002" <sip:1002@10.105.10.116:5060>;tag=pf8jbtir6h
CSeq: 3 INVITE
Call-ID: gekleigjlti4sjlsh3mm
Max-Forwards: 70
Allow: ACK,BYE,CANCEL,INFO,INVITE,MESSAGE,NOTIFY,OPTIONS,PRACK,REFER,REGISTER,SUBSCRIBE
Contact: <sip:8bum4n4l@7bhs9fl1c2ll.invalid;transport=ws;ob>
Supported: outbound
User-Agent: SIP.js/0.21.1
Content-Type: application/sdp
Content-Length: 2695

v=0
o=- 168263986418482069 3 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0
a=extmap-allow-mixed
a=msid-semantic: WMS a13f7147-955e-49fa-b11b-49c2dd95a354
m=audio 49477 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
c=IN IP4 103.148.39.46
a=rtcp:9 IN IP4 0.0.0.0
a=candidate:451435517 1 udp 2122260223 172.27.112.1 49474 typ host generation 0 network-id 2
a=candidate:2999745851 1 udp 2122194687 192.168.56.1 49475 typ host generation 0 network-id 3
a=candidate:77142221 1 udp 2122129151 192.168.137.1 49476 typ host generation 0 network-id 1 network-cost 10
a=candidate:2512953610 1 udp 2122063615 10.105.10.116 49477 typ host generation 0 network-id 4 network-cost 10
a=candidate:343975870 1 udp 1685855999 103.148.39.46 49477 typ srflx raddr 10.105.10.116 rport 49477 generation 0 network-id 4 network-cost 10
a=candidate:1416341261 1 tcp 1518280447 172.27.112.1 9 typ host tcptype active generation 0 network-id 2
a=candidate:4233069003 1 tcp 1518214911 192.168.56.1 9 typ host tcptype active generation 0 network-id 3
a=candidate:1243276349 1 tcp 1518149375 192.168.137.1 9 typ host tcptype active generation 0 network-id 1 network-cost 10
a=candidate:3679149562 1 tcp 1518083839 10.105.10.116 9 typ host tcptype active generation 0 network-id 4 network-cost 10
a=ice-ufrag:xwQs
a=ice-pwd:hDXe22TKKYHpnCNKTsk0y/IV
a=ice-options:trickle
a=fingerprint:sha-256 E9:82:71:CE:CC:C9:37:5E:33:21:41:AF:4D:7A:BA:6B:A8:F6:D5:FD:14:20:30:6B:F5:62:35:75:91:1B:A6:04
a=setup:actpass
a=mid:0
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
a=extmap:6 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id
a=sendonly
a=msid:a13f7147-955e-49fa-b11b-49c2dd95a354 688e8f60-a748-4635-8e0f-8620e84765a8
a=rtcp-mux
a=rtpmap:111 opus/48000/2
a=rtcp-fb:111 transport-cc
a=fmtp:111 minptime=10;useinbandfec=1
a=rtpmap:103 ISAC/16000
a=rtpmap:104 ISAC/32000
a=rtpmap:9 G722/8000
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:106 CN/32000
a=rtpmap:105 CN/16000
a=rtpmap:13 CN/8000
a=rtpmap:110 telephone-event/48000
a=rtpmap:112 telephone-event/32000
a=rtpmap:113 telephone-event/16000
a=rtpmap:126 telephone-event/8000
a=ssrc:426922351 cname:8dqqSraI1Xmet35Y
a=ssrc:426922351 msid:a13f7147-955e-49fa-b11b-49c2dd95a354 688e8f60-a748-4635-8e0f-8620e84765a8
a=ssrc:426922351 mslabel:a13f7147-955e-49fa-b11b-49c2dd95a354
a=ssrc:426922351 label:688e8f60-a748-4635-8e0f-8620e84765a8

sip.Transport | Received WebSocket text message:
SIP/2.0 100 Trying
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK4683819;received=10.105.10.116;rport=44539
From: "1002" <sip:1002@10.105.10.116:5060>;tag=pf8jbtir6h
To: <sip:1001@10.105.10.116:5060>;tag=meSFyaFmNQvNr
Call-ID: gekleigjlti4sjlsh3mm
CSeq: 3 INVITE
User-Agent: FreeSWITCH-mod_sofia/1.10.12-release~a88d069d6f~64bit
Content-Length: 0

sip.Transport | Received WebSocket text message:

SIP/2.0 200 OK
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK4683819;received=10.105.10.116;rport=44539
From: "1002" <sip:1002@10.105.10.116:5060>;tag=pf8jbtir6h
To: <sip:1001@10.105.10.116:5060>;tag=meSFyaFmNQvNr
Call-ID: gekleigjlti4sjlsh3mm
CSeq: 3 INVITE
Contact: <sip:1001@10.105.10.116:5060;transport=udp>
User-Agent: FreeSWITCH-mod_sofia/1.10.12-release~a88d069d6f~64bit
Accept: application/sdp
Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REGISTER, REFER, NOTIFY, PUBLISH, SUBSCRIBE
Supported: timer, path, replaces
Content-Type: application/sdp
Content-Disposition: session
Content-Length: 904

v=0
o=FreeSWITCH 1731140756 1731140758 IN IP4 10.105.10.116
s=FreeSWITCH
c=IN IP4 10.105.10.116
t=0 0
a=msid-semantic: WMS GmV5Mj4VMynFYdHRWIFQDojvaabXfd5i
m=audio 21868 UDP/TLS/RTP/SAVPF 111 110
a=rtpmap:111 opus/48000/2
a=fmtp:111 useinbandfec=1; minptime=10
a=rtpmap:110 telephone-event/48000
a=recvonly
a=ptime:20
a=fingerprint:sha-256 CC:4B:FA:70:33:BC:80:5F:61:3C:96:5D:C9:C9:ED:5E:E8:A9:96:37:37:62:77:DE:E9:A5:3B:A3:A8:8E:31:8F
a=setup:active
a=rtcp-mux
a=rtcp:21868 IN IP4 10.105.10.116
a=ice-ufrag:XYhqmktktRHGgAsM
a=ice-pwd:E8S5M2Dnil2TV6pB9UuwIiBP
a=candidate:5920585782 1 udp 2130706431 10.105.10.116 21868 typ host generation 0
a=end-of-candidates
a=ssrc:1765302158 cname:MEGPZMdnyrV3dzOR
a=ssrc:1765302158 msid:GmV5Mj4VMynFYdHRWIFQDojvaabXfd5i a0
a=ssrc:1765302158 mslabel:GmV5Mj4VMynFYdHRWIFQDojvaabXfd5i
a=ssrc:1765302158 label:GmV5Mj4VMynFYdHRWIFQDojvaabXfd5ia0

Call is resumed
![image](https://github.com/user-attachments/assets/f7fcbe0b-faac-42fd-9c06-62752913710c)

sip.Transport | Sending WebSocket message:
INVITE sip:1001@10.105.10.116:5060;transport=udp SIP/2.0
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK5174938
To: <sip:1001@10.105.10.116:5060>;tag=meSFyaFmNQvNr
From: "1002" <sip:1002@10.105.10.116:5060>;tag=pf8jbtir6h
CSeq: 4 INVITE
Call-ID: gekleigjlti4sjlsh3mm
Max-Forwards: 70
Allow: ACK,BYE,CANCEL,INFO,INVITE,MESSAGE,NOTIFY,OPTIONS,PRACK,REFER,REGISTER,SUBSCRIBE
Contact: <sip:8bum4n4l@7bhs9fl1c2ll.invalid;transport=ws;ob>
Supported: outbound
User-Agent: SIP.js/0.21.1
Content-Type: application/sdp
Content-Length: 2695

v=0
o=- 168263986418482069 4 IN IP4 127.0.0.1
s=-
t=0 0
a=group:BUNDLE 0
a=extmap-allow-mixed
a=msid-semantic: WMS a13f7147-955e-49fa-b11b-49c2dd95a354
m=audio 49477 UDP/TLS/RTP/SAVPF 111 103 104 9 0 8 106 105 13 110 112 113 126
c=IN IP4 103.148.39.46
a=rtcp:9 IN IP4 0.0.0.0
a=candidate:451435517 1 udp 2122260223 172.27.112.1 49474 typ host generation 0 network-id 2
a=candidate:2999745851 1 udp 2122194687 192.168.56.1 49475 typ host generation 0 network-id 3
a=candidate:77142221 1 udp 2122129151 192.168.137.1 49476 typ host generation 0 network-id 1 network-cost 10
a=candidate:2512953610 1 udp 2122063615 10.105.10.116 49477 typ host generation 0 network-id 4 network-cost 10
a=candidate:343975870 1 udp 1685855999 103.148.39.46 49477 typ srflx raddr 10.105.10.116 rport 49477 generation 0 network-id 4 network-cost 10
a=candidate:1416341261 1 tcp 1518280447 172.27.112.1 9 typ host tcptype active generation 0 network-id 2
a=candidate:4233069003 1 tcp 1518214911 192.168.56.1 9 typ host tcptype active generation 0 network-id 3
a=candidate:1243276349 1 tcp 1518149375 192.168.137.1 9 typ host tcptype active generation 0 network-id 1 network-cost 10
a=candidate:3679149562 1 tcp 1518083839 10.105.10.116 9 typ host tcptype active generation 0 network-id 4 network-cost 10
a=ice-ufrag:xwQs
a=ice-pwd:hDXe22TKKYHpnCNKTsk0y/IV
a=ice-options:trickle
a=fingerprint:sha-256 E9:82:71:CE:CC:C9:37:5E:33:21:41:AF:4D:7A:BA:6B:A8:F6:D5:FD:14:20:30:6B:F5:62:35:75:91:1B:A6:04
a=setup:actpass
a=mid:0
a=extmap:1 urn:ietf:params:rtp-hdrext:ssrc-audio-level
a=extmap:2 http://www.webrtc.org/experiments/rtp-hdrext/abs-send-time
a=extmap:3 http://www.ietf.org/id/draft-holmer-rmcat-transport-wide-cc-extensions-01
a=extmap:4 urn:ietf:params:rtp-hdrext:sdes:mid
a=extmap:5 urn:ietf:params:rtp-hdrext:sdes:rtp-stream-id
a=extmap:6 urn:ietf:params:rtp-hdrext:sdes:repaired-rtp-stream-id
a=sendrecv
a=msid:a13f7147-955e-49fa-b11b-49c2dd95a354 688e8f60-a748-4635-8e0f-8620e84765a8
a=rtcp-mux
a=rtpmap:111 opus/48000/2
a=rtcp-fb:111 transport-cc
a=fmtp:111 minptime=10;useinbandfec=1
a=rtpmap:103 ISAC/16000
a=rtpmap:104 ISAC/32000
a=rtpmap:9 G722/8000
a=rtpmap:0 PCMU/8000
a=rtpmap:8 PCMA/8000
a=rtpmap:106 CN/32000
a=rtpmap:105 CN/16000
a=rtpmap:13 CN/8000
a=rtpmap:110 telephone-event/48000
a=rtpmap:112 telephone-event/32000
a=rtpmap:113 telephone-event/16000
a=rtpmap:126 telephone-event/8000
a=ssrc:426922351 cname:8dqqSraI1Xmet35Y
a=ssrc:426922351 msid:a13f7147-955e-49fa-b11b-49c2dd95a354 688e8f60-a748-4635-8e0f-8620e84765a8
a=ssrc:426922351 mslabel:a13f7147-955e-49fa-b11b-49c2dd95a354
a=ssrc:426922351 label:688e8f60-a748-4635-8e0f-8620e84765a8

sip.Transport | Received WebSocket text message:
SIP/2.0 100 Trying
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK5174938;received=10.105.10.116;rport=44539
From: "1002" <sip:1002@10.105.10.116:5060>;tag=pf8jbtir6h
To: <sip:1001@10.105.10.116:5060>;tag=meSFyaFmNQvNr
Call-ID: gekleigjlti4sjlsh3mm
CSeq: 4 INVITE
User-Agent: FreeSWITCH-mod_sofia/1.10.12-release~a88d069d6f~64bit
Content-Length: 0

sip.Transport | Received WebSocket text message:

SIP/2.0 200 OK
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK5174938;received=10.105.10.116;rport=44539
From: "1002" <sip:1002@10.105.10.116:5060>;tag=pf8jbtir6h
To: <sip:1001@10.105.10.116:5060>;tag=meSFyaFmNQvNr
Call-ID: gekleigjlti4sjlsh3mm
CSeq: 4 INVITE
Contact: <sip:1001@10.105.10.116:5060;transport=udp>
User-Agent: FreeSWITCH-mod_sofia/1.10.12-release~a88d069d6f~64bit
Accept: application/sdp
Allow: INVITE, ACK, BYE, CANCEL, OPTIONS, MESSAGE, INFO, UPDATE, REGISTER, REFER, NOTIFY, PUBLISH, SUBSCRIBE
Supported: timer, path, replaces
Content-Type: application/sdp
Content-Disposition: session
Content-Length: 892

v=0
o=FreeSWITCH 1731140756 1731140759 IN IP4 10.105.10.116
s=FreeSWITCH
c=IN IP4 10.105.10.116
t=0 0
a=msid-semantic: WMS GmV5Mj4VMynFYdHRWIFQDojvaabXfd5i
m=audio 21868 UDP/TLS/RTP/SAVPF 111 110
a=rtpmap:111 opus/48000/2
a=fmtp:111 useinbandfec=1; minptime=10
a=rtpmap:110 telephone-event/48000
a=ptime:20
a=fingerprint:sha-256 CC:4B:FA:70:33:BC:80:5F:61:3C:96:5D:C9:C9:ED:5E:E8:A9:96:37:37:62:77:DE:E9:A5:3B:A3:A8:8E:31:8F
a=setup:active
a=rtcp-mux
a=rtcp:21868 IN IP4 10.105.10.116
a=ice-ufrag:XYhqmktktRHGgAsM
a=ice-pwd:E8S5M2Dnil2TV6pB9UuwIiBP
a=candidate:6986943258 1 udp 2130706431 10.105.10.116 21868 typ host generation 0
a=end-of-candidates
a=ssrc:1765302158 cname:MEGPZMdnyrV3dzOR
a=ssrc:1765302158 msid:GmV5Mj4VMynFYdHRWIFQDojvaabXfd5i a0
a=ssrc:1765302158 mslabel:GmV5Mj4VMynFYdHRWIFQDojvaabXfd5i
a=ssrc:1765302158 label:GmV5Mj4VMynFYdHRWIFQDojvaabXfd5ia0

sip.Transport | Sending WebSocket message:
ACK sip:1001@10.105.10.116:5060;transport=udp SIP/2.0
Via: SIP/2.0/WS 7bhs9fl1c2ll.invalid;branch=z9hG4bK6268568
To: <sip:1001@10.105.10.116:5060>;tag=meSFyaFmNQvNr
From: "1002" <sip:1002@10.105.10.116:5060>;tag=pf8jbtir6h
CSeq: 4 ACK
Call-ID: gekleigjlti4sjlsh3mm
Max-Forwards: 70
Supported: outbound
User-Agent: SIP.js/0.21.1
Content-Length: 0
