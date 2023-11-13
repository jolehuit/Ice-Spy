import {ARBISCAN_KEY} from '$env/static/private';
import {ETHERSCAN_KEY} from '$env/static/private';
import type { RequestHandler } from "@sveltejs/kit";

let walletsFound=[];
let apiKey:string="";
let url1:string="";
let url2:string="";
export const POST: RequestHandler = async ({ request }) => {
    try {
        const postData = await request.json();
        const { token1, token2, startBlock1, startBlock2, endBlock1, endBlock2, blockchain } = postData;

    if (blockchain === "Ethereum") {
        apiKey = ETHERSCAN_KEY;
        url1 = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${token1}&startblock=${startBlock1}&endblock=${endBlock1}&sort=asc&apikey=${apiKey}`;
        url2 = `https://api.etherscan.io/api?module=account&action=tokentx&contractaddress=${token2}&startblock=${startBlock2}&endblock=${endBlock2}&sort=asc&apikey=${apiKey}`;
    } else {
        console.log(blockchain);
        apiKey = ARBISCAN_KEY;
        url1 = `https://api.arbiscan.io/api?module=account&action=tokentx&contractaddress=${token1}&startblock=${startBlock1}&endblock=${endBlock1}&sort=asc&apikey=${apiKey}`;
        url2 = `https://api.arbiscan.io/api?module=account&action=tokentx&contractaddress=${token2}&startblock=${startBlock2}&endblock=${endBlock2}&sort=asc&apikey=${apiKey}`;
    }
    const response1 = await fetch(url1);
    const data1 = await response1.json();
    const transfers1 = data1.result;
    const response2 = await fetch(url2);
    const data2 = await response2.json();
    const transfers2 = data2.result;

        const wallets1 = transfers1.map((t) => t.from);
        const wallets2 = transfers2.map((t) => t.from);
        const wallets = wallets1.filter((w) => wallets2.includes(w));
        if (wallets.length > 0) {
            walletsFound = [...new Set(wallets)];
            console.log(
                `${walletsFound.length} Wallet(s) trouvés.`
            );
            return new Response(JSON.stringify({walletsFound}));
        } else {
            console.log("Pas de wallets trouvés.");
            return new Error("Aucun wallet trouvé.");

        }
    } catch (error) {
        // Vous devriez retourner une réponse HTTP avec un code 500 et un message d'erreur
        console.log(error)
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
};