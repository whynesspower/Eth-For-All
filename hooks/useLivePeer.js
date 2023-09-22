import axios from 'axios';

const useLivePeer = () => {
    const httpClient = axios.create({
        baseURL: 'https://livepeer.studio/api',
    });

    httpClient.interceptors.request.use(
        (req) => {
            req.headers['Authorization'] = `Bearer d5a4af1d-f1b5-4d78-a7d0-b80192d8a086`
            return req
        }
    );

    const headers = {
        headers: {
            'content-type': 'application/json',
            authorization: `Bearer fcd783b5-749d-41f5-b0ed-149949e3de6c`
        }
    }

    const getAllStreams = async () => {
        try {
            const response = await httpClient.get('/stream');
            console.log("recording", response.data);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    const getAllSessions = async () => {
        try {
            const response = await httpClient.get('/session');
            console.log("sessions", response.data);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    const getAllAssets = async () => {
        try {
            const response = await httpClient.get('/asset');
            console.log("assets", response.data);
            return response.data;
        } catch (err) {
            console.error(err);
        }
    }

    return { getAllSessions, getAllStreams, getAllAssets };

}

export default useLivePeer;

9424910827  
