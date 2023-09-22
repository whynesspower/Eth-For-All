import { useRef, useState, useEffect } from "react";
import { BsCameraVideoFill } from "react-icons/bs";
import { useCreateAsset } from '@livepeer/react';
import { useMemo } from 'react';
import { IPFS } from './IPFS';
import { useAuth } from '@arcana/auth-react'
import { ethers } from 'ethers'

declare var window: any;

const Upload = () => {
    const [video, setVideo] = useState<File | undefined>(undefined);
    const [video2, setVideo2] = useState<File | undefined>();
    const videoRef = useRef<HTMLInputElement>();

    const auth = useAuth();
    const [walletAddress, setWalletAddress] = useState('');


    const handleVideoChange = (e: any) => {
        // @ts-ignore
        const file = videoRef.current.files[0];
        console.log(file);

        if (file.type != 'video/mp4') {
            console.log("Please upload a mp4 video");
            return;
        }

        const reader = new FileReader();
        if (file) {
            reader.readAsDataURL(file);
        }

        reader.onload = (readerEvent) => {
            // @ts-ignore
            setVideo(readerEvent.target.result.toString());
        };
    };

    const {
        mutate: createAsset,
        data: assets,
        status,
        progress,
        error,
    } = useCreateAsset(
        video2
            ? {
                sources: [{ name: video2.name, file: video2 }],
            }
            : null,
    );


    useEffect(() => {
        const f = async () => {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log("metamask", signer.getAddress());
        }
        f();
    }, [])


    useEffect(() => {
        console.log("ye hai assets", assets);
    }, [assets]);

    useEffect(() => {
        console.log("loading", status);
    }, [status])


    const isLoading = useMemo(() => status === 'loading', [status]);

    // @ts-ignore
    const isAssetCreated = useMemo(() => assets?.length > 0, [assets]);

    return (
        <div className="h-screen z-0 p-10" >
            <h1 className="text-3xl font-bold pb-2 mb-2">Upload Video</h1>
            <h1 className="text-gray-500 text-xl font-semibold">Mint video NFT and upload to <span className="text-primary">StreamHub</span></h1>
            <div
                className=" flex flex-col-reverse lg:flex-row"
            >
                <div className="flex flex-col">
                    <div className="border-2 relative h-52 overflow-hidden border-dashed text-slate-400 border-gray-600 my-4 rounded-xl aspect-video flex items-center justify-center">
                        <input
                            type="file"
                            // @ts-ignore
                            ref={videoRef}
                            multiple={false}
                            hidden
                            accept="video/*"
                            onChange={(e) => {
                                if (e.target.files) {
                                    setVideo2(e.target.files[0]);
                                }
                                handleVideoChange(e)
                            }}
                        />
                        {!video && (
                            <button
                                // @ts-ignore
                                onClick={() => videoRef.current.click()}
                                className="bg-gray-800 font-normal text-sm px-4 py-2 text-slate-300 hover:text-slate-100 hover:bg-slate-600 rounded-xl"
                            >
                                <div className="flex gap-1"><BsCameraVideoFill size={20} /> Click to upload video</div>
                            </button>
                        )}

                        {video &&
                            // @ts-ignore
                            <video src={video} controls className="h-full w-full " />}

                    </div>
                    {!isAssetCreated && !isLoading &&
                        (<button
                            disabled={status === 'loading' || !createAsset}
                            onClick={() => {
                                console.log("video", video2);
                                createAsset?.();
                            }}
                            className="px-2 py-2 text-white text-xl font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-sky-600"
                        >
                            Create Asset
                        </button>)}

                    {isLoading && (
                        <div className="text-xl font-bold pb-2 mt-4 mb-4 text-primary">Creating Asset...</div>
                    )}


                    {isAssetCreated &&
                        assets?.map((asset) => (
                            <div key={asset.id}>
                                {/* <div>
                                    <div>Asset Id: {asset?.id}</div>
                                    <div>Asset Name: {asset?.name}</div>
                                    <div>Playback URL: {asset?.playbackUrl}</div>
                                    <div>IPFS CID: {asset?.storage?.ipfs?.cid ?? 'None'}</div>
                                </div> */}
                                <IPFS assetId={asset?.id} />
                            </div>
                        ))}

                    {error && <div>{error.message}</div>}
                </div>

            </div>
        </div>
    );
};

export default Upload;
