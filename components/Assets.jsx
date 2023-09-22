import { useState, useEffect } from 'react';
import useLivePeer from '@/hooks/useLivePeer';
import ReactPlayer from 'react-player';
import SendTip from './SendTip';

export default function Assets() {
    const [playbackIds, setPlaybackIds] = useState([]);
    const livePeer = useLivePeer();
    const [tipModal, setTipModal] = useState(false);

    useEffect(() => {
        const getPlayBackIds = async () => {
            try {
                const response = await livePeer.getAllAssets();
                setPlaybackIds(response);
                console.log(response)
            } catch (error) {
                console.error(error);
            }
        }
        getPlayBackIds();
    }, []);

    const handleSendTip = () => {
        setTipModal(true);
    }

    return (
        <div className="h-screen mt-4">
            <div className=" grid grid-cols-3 items-start justify-center gap-2">
                {
                    playbackIds && playbackIds.map(stream => {
                        if (stream.playbackId && stream.status.phase !== 'waiting' && stream.source.type === "directUpload") {
                            return (
                                <div key={stream.playbackId}>
                                    <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                                        <a href="#">
                                            <div className="w-full h-1/3">
                                                <ReactPlayer
                                                    controls
                                                    width="100%"
                                                    height="200px"
                                                    url={stream.downloadUrl}
                                                    playing={false}
                                                    style={{ width: "50%", height: "100%" }} />
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
