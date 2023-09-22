import { Player, useCreateStream } from '@livepeer/react';

import { useMemo, useState, useEffect } from 'react';
import useLivePeer from '@/hooks/useLivePeer';
import { FiCopy } from 'react-icons/fi';

export default function StreamNow() {
  const [streamName, setStreamName] = useState('');
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream({ name: streamName, record: true });

  const streamData = [
    {
      name: "Ingest URL",
      data: "rtmp://rtmp.livepeer.com/live/",
    },
    {
      name: "Stream Key",
      data: stream?.streamKey,
    },
    {
      name: "Stream Playback URL",
      data: stream?.playbackUrl,
    }
  ]

  const isLoading = useMemo(() => status === 'loading', [status]);

  useEffect(() => {
    console.log("ye hai stream", stream);
  }, [stream]);


  const Copyable = (props) => {
    const copyToClipboard = () => {
      window.navigator.clipboard.writeText(props.copyText || props.text);
    }

    return (
      <span onClick={copyToClipboard} className='relative max-w-fit  group cursor-pointer  flex items-center gap-2'>

        {props.text}
        <FiCopy size={20} color="#1a3073" />
      </span>
    )
  }

  return (
    <div className="h-screen z-0 p-10" >
      <h1 className="text-3xl font-bold pb-2 mb-4 ">Livestream</h1>
      {!stream && (
        <>
          <div>
            {!isLoading && (
              <>
                <div className="mb-6">
                  <input
                    type="text"
                    id="default-input"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Stream name"
                    onChange={(e) => setStreamName(e.target.value)}
                  />
                </div>
                <button
                  className="px-6 py-2 text-white text-xl font-semibold rounded-md bg-gradient-to-r from-emerald-500 to-sky-600"
                  onClick={() => {
                    createStream?.()
                  }}
                  disabled={!createStream}
                >
                  Create Stream
                </button>
              </>
            )}
            {isLoading && (
              <div className="text-xl font-bold pb-2 mb-4 text-primary">Creating Stream...</div>
            )}
          </div>
        </>
      )}

      {stream?.playbackId && (
        <>
          <div className="pl-36">
            <div className="h-4/6 w-4/6">
              <Player
                title={stream?.name}
                playbackId={stream?.playbackId}
                autoPlay
              />
            </div>
          </div>
          <div className="pl-20">
            <h1 className="font-bold text-lg mt-4"><span className="text-gray-700 ">NOTE: </span><span className="text-red-500">To start a video stream, please use a broadcaster software like OBS/Streamyard</span></h1>
            {streamData.map((item) => {
              return (
                <div key={item.name} className="flex  gap-3 mt-4">
                  <h1 className='text-gray-500 font-semibold'>{item.name} :</h1>
                  <Copyable text={item.data} />
                </div>
              )
            })}
          </div>
        </>
      )}
    </div>
  );
};
