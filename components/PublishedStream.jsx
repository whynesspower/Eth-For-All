import { useState, useEffect } from 'react';
import useLivePeer from '@/hooks/useLivePeer';
import ReactPlayer from 'react-player';
import SendTip from './SendTip';

export default function PublishedStream() {
    const [playbackIds, setPlaybackIds] = useState([]);
    const livePeer = useLivePeer();
    const [tipModal, setTipModal] = useState(false);

    const handleSendTip = () => {
        setTipModal(true);
    }

    useEffect(() => {
        const getPlayBackIds = async () => {
            try {
                const response = await livePeer.getAllSessions();
                console.log("Recording URL", response);
                setPlaybackIds(response);
            } catch (error) {
                console.error(error);
            }
        }
        getPlayBackIds();
    }, []);

    return (
        <div className="h-screen mt-4">
            <div className="grid grid-cols-3 items-start gap-2">
                {
                    playbackIds && playbackIds.map(stream => {
                        if (stream.playbackId && stream.recordingStatus === "ready") {
                            return (
                                <div key={stream.playbackId}>
                                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                                        <a href="#">
                                            <div className="w-full">
                                                <ReactPlayer
                                                    controls
                                                    width="100%"
                                                    height="90%"
                                                    url={stream.recordingUrl} />
                                            </div>
                                        </a>
                                        <div class="p-5 ml-20">
                                            <button
                                                onClick={handleSendTip}
                                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gradient-to-r from-emerald-500 to-sky-600 rounded-lg">
                                                Send Tip
                                            </button>
                                            <SendTip
                                                isOpen={tipModal}
                                                setIsOpen={setTipModal}
                                            />
                                        </div>
                                    </div>
                                </div>

                            )
                        } else {
                            return null;
                        }
                    })
                }
            </div>
        </div>
    );
};
