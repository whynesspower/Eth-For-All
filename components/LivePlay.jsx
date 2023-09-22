import useSuperFluid from '@/hooks/useSuperFluid';

import { useMemo, useState, useEffect } from 'react';
import useLivePeer from '@/hooks/useLivePeer';
import { FiCopy } from 'react-icons/fi';
import ReactPlayer from 'react-player';
import { useAuth } from '@arcana/auth-react';
import {
  ControlsContainer,
  PictureInPictureButton,
  PlayButton,
  Player,
  Poster,
  Progress,
  TimeDisplay,
  Title,
  Volume,
} from "@livepeer/react";

export default function LivePlay() {
  const [streamName, setStreamName] = useState('');
  const [playbackIds, setPlaybackIds] = useState([]);
  const livePeer = useLivePeer();
  const superFluid = useSuperFluid();
  const auth = useAuth();
  const [walletAddress, setWalletAddress] = useState('');
  const {createFlow} = useSuperFluid();
  const [flowLoading, setFlowLoading] = useState(false);

  useEffect(() => {
    if (auth.isLoggedIn) {
      setWalletAddress(auth.user?.address);
    }
  }, []);


  useEffect(() => {
    const getPlayBackIds = async () => {
      try {
        const response = await livePeer.getAllStreams();
        setPlaybackIds(response);
        console.log("Live stream", response)
      } catch (error) {
        console.error(error);
      }
    }
    getPlayBackIds();
  }, []);


  const startFlow = () => {
    // setFlowLoading(true);
    const res = superFluid.createFlow('1', '0x6D91A519E6bfBA9482e51093b5C3113890b37541');
    // setFlowLoading(false);
    console.log("super",res);
  }


  async function signTransaction() {

    const { sig } = await provider.request({
      method: 'eth_signTransaction',
      params: [
        {
          from, // sender account address
          gasPrice: 0,
          to: '0xE28F01Cf69f27Ee17e552bFDFB7ff301ca07e780', // receiver account address
          value: '0x0de0b6b3a7640000',
        },
      ],
    })
    console.log({ sig })
  }

  return (
    <div className="h-screen z-0 p-10">
      <h1 className="text-3xl font-bold pb-2 mb-4 ">Watch Live Streams</h1>
      <div className="items-start justify-center">
        {
          playbackIds && playbackIds.map(stream => {
            if (stream.playbackId && stream.isActive) {
              return (
                <div key={stream.playbackId}>
                  <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
                    <a href="#">
                      <div className="w-full h-1/3">
                        {/* <Player
                          title={stream.name}
                          playbackId={stream.playbackId}
                          autoPlay
                          muted
                        />
                        <h1>more props</h1> */}
                        <Player title={stream?.name} playbackId={stream?.playbackId}>
                          <Title/>
                          <ControlsContainer
                            middle={<Progress />}
                            left={
                              <>
                                <PlayButton onClick={startFlow()} />
                                <Volume showSlider={false} />
                                <TimeDisplay />
                              </>
                            }
                            right={<PictureInPictureButton />}
                          />
                        </Player>
                      </div>
                    </a>
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

// import useSuperFluid from '@/hooks/useSuperFluid';
// import { useState, useEffect } from 'react';
// import useLivePeer from '@/hooks/useLivePeer';
// import { useAuth } from '@arcana/auth-react';
// import {
//   ControlsContainer,
//   PictureInPictureButton,
//   PlayButton,
//   Player,
//   Progress,
//   TimeDisplay,
//   Title,
//   Volume,
// } from "@livepeer/react";

// export default function LivePlay() {
//   const [streamName, setStreamName] = useState('');
//   const [playbackIds, setPlaybackIds] = useState([]);
//   const [flowStarted, setFlowStarted] = useState(false);
//   const livePeer = useLivePeer();
//   const superFluid = useSuperFluid();
//   const auth = useAuth();
//   const [walletAddress, setWalletAddress] = useState('');
//   const {createFlow} = useSuperFluid();
//   const [flowLoading, setFlowLoading] = useState(false);

//   useEffect(() => {
//     if (auth.isLoggedIn) {
//       setWalletAddress(auth.user?.address);
//     }
//   }, []);

//   useEffect(() => {
//     const getPlayBackIds = async () => {
//       try {
//         const response = await livePeer.getAllStreams();
//         setPlaybackIds(response);
//         console.log("Live stream", response)
//       } catch (error) {
//         console.error(error);
//       }
//     }
//     getPlayBackIds();
//   }, []);


//   const startFlow = async () => {
//     console.log("super");
//     const res = await superFluid.createFlow('1', '0x6D91A519E6bfBA9482e51093b5C3113890b37541');
//     // if(res)
//     //   setFlowStarted(true);
//     console.log("super",res);
//   }

//   return (
//     <div className="h-screen z-0 p-10">
//       <h1 className="text-3xl font-bold pb-2 mb-4 ">Watch Live Streams</h1>
//       <div className=" items-start justify-center">
//         {
//           playbackIds && playbackIds.map(stream => {
//             if (stream.playbackId && stream.isActive) {
//               return (
//                 <div key={stream.playbackId}>
//                   <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
//                       <div className="w-full h-2/3">
//                         {/* <button onClick={startFlow}>Start Flow</button> */}
//                         {/* {flowStarted && (
//                         <Player title={stream?.name} playbackId={stream?.playbackId}>
//                           <Title/>
//                           <ControlsContainer
//                             middle={<Progress />}
//                             left={
//                               <>
//                                 <PlayButton />
//                                 <Volume showSlider={false} />
//                                 <TimeDisplay />
//                               </>
//                             }
//                             right={<PictureInPictureButton />}
//                           />
//                         </Player>
//                         )} */}
//                          <Player title={stream?.name} playbackId={stream?.playbackId}>
//                           <Title/>
//                           <ControlsContainer
//                             middle={<Progress />}
//                             left={
//                               <>
//                                 <PlayButton onClick={startFlow()}/>
//                                 <Volume showSlider={false} />
//                                 <TimeDisplay />
//                               </>
//                             }
//                             right={<PictureInPictureButton />}
//                           />
//                         </Player>
//                       </div>
//                   </div>
                  
//                 </div>

//               )
//             } else {
//               return null;
//             }
//           })
//         }
//       </div>
//     </div>
//   );
// };

