import { useAuth } from "@arcana/auth-react";
import {ethers} from "ethers";

const useSendTip = () => {

    const auth = useAuth();
    const provider = auth.provider;

    async function signTransaction(tipAmount, fromAddress) {

        const { sig } = await provider.request({
            method: 'eth_sendTransaction',
            params: [
                {
                    from: fromAddress,// sender account address
                    to: '0xca0AAC84A57e239A2918E9537BCc3Ee29E24b6cd', // receiver account address
                    value: ethers.utils.parseEther(tipAmount).toHexString(),
                },
            ],
        })
        console.log({ sig })
    }

    return { signTransaction };
}

export default useSendTip;