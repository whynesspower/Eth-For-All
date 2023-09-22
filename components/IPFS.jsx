import { useAsset, useUpdateAsset } from '@livepeer/react';
import { useEffect, useState } from 'react';
import { useAuth } from "@arcana/auth-react";
import { Contract, ethers } from 'ethers';
import { abi } from '@/utils/config';

export const IPFS = ({ assetId }) => {
    const auth = useAuth();
    const [walletAddress, setWalletAddress] = useState('');

    useEffect(() => {
        if (auth.isLoggedIn) {
            // @ts-ignore
            setWalletAddress(auth.user?.address);
        }
    }, [walletAddress]);


    const { mutate: updateAsset, status: updateStatus } = useUpdateAsset({
        assetId,
        storage: {
            ipfs: true,
            // metadata overrides can be added here
            // see the source code behind this example
        },
    });

    const { data: asset } = useAsset({
        assetId,
        refetchInterval: 10000,
    });

    const [ipfsCid, setIpfsCid] = useState('');
    const [uri, setUri] = useState('');
    const [nftMinted, setNftMinted] = useState(false);
    const [minting, setMinting] = useState(false);

    useEffect(() => {
        if (asset) {
            setIpfsCid(asset?.storage?.ipfs?.cid);
            setUri(asset?.storage?.ipfs?.nftMetadata?.url);
            console.log("Metadata", asset?.storage?.ipfs?.nftMetadata?.url)
        }
    }, [asset]);

    async function mintNft(uri) {
        const contractAddress = '0x66e47A27241F38b8482C0Ae95E55A535324f9f54';
        const contractABI = abi;
        // @ts-ignore
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const chainId = await window.ethereum.request({ method: "eth_chainId" });
        const signer = provider.getSigner();
        const signerAddress = await signer.getAddress();
        const peer = new Contract(
            contractAddress,
            contractABI,
            signer
        );
        console.log("Minting NFT")
        const txn = await peer.safeMint(signerAddress, uri);
        setMinting(true);
        await txn.wait();
        setMinting(false);
        setNftMinted(true);
        console.log("mined", txn.hash);
    }

    return (
        <div>
            {assetId && (
                <>
                    {updateStatus !== 'loading' && updateStatus !== 'success' && <button
                        onClick={() => {
                            updateAsset?.();
                        }}
                        className="px-6 py-2 text-white text-xl font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-sky-600"

                    >
                        Upload to IPFS
                    </button>}
                    {updateStatus === 'loading' && (
                        <div className="text-xl font-bold pb-2 mt-4 mb-4 text-primary">Uploading to IPFS...</div>
                    )}
                    {updateStatus === 'success' && !minting && !nftMinted &&
                        (<>
                            <button
                                onClick={() => mintNft(uri)}
                                className="px-6 py-2 text-white text-xl font-semibold rounded-lg bg-gradient-to-r from-emerald-500 to-sky-600"
                            >
                                Mint asset
                            </button>
                        </>)
                    }
                    {minting && <div className="text-xl font-bold pb-2 mt-4 mb-4 text-primary">Minting NFT...</div>}
                    {nftMinted && <div className="text-xl font-bold pb-2 mt-4 mb-4 text-sky-600">NFT Minted Successfully!!!</div>}
                </>
            )}
        </div>
    );
};