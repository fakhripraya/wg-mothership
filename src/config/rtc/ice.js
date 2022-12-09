export const iceConfig = {
    iceServers: [
        {
            urls: "stun:stun.stunprotocol.org"
        },
        {
            urls: 'turn:numb.viagenie.ca',
            credential: 'muazkh',
            username: 'webrtc@live.com'
        },
    ]
}