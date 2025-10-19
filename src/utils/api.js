// this file keeps all the API calls in one place
// respect the separation of concerns: components focus on rendering, this handles networking

// pick the URL from the back end 
const API_BASE = "http://localhost:8080";


// basic client side validation (common gene names are uppercase letters)
// this is not security it is UX + reducing bad requests. Server must still validate

const GENE_SYMBOL_ALLOWED_LIST = /^[A-Za-z0-9_.-]{1,20}$/; // max 20 chars

// normalize user input to a typical symbol format (trim + uppercase)
export function normalizeGeneSymbol(geneSymbol){
    return String(geneSymbol || "").trim().toUpperCase();
}

// export a function that fetches the full genes list from the back end
// 'async' means it returns a Promise, callers can await it.
export async function fetchGenes(){
    // build the URL (API_BASE + path)
    const url = `${API_BASE}/genes`;

    // do the HTTP GET
    const res = await fetch(url);

    // if not 2xx, throw so the caller can handle it
    if (!res.ok) {
        throw new Error(`Failed to fetch genes: HTTP ${res.status}`);
    }

    // parse JSON body and return (Promise resolves to an array)
    return res.json();
}

// export a function to fetch a single gene by its symbol
export async function fetchGeneBySymbol(rawSymbol){

    // normalize (trim/uppercase) for consistent look ups
    const geneSymbol = normalizeGeneSymbol(rawSymbol);

    // quick client validation to avoid absurd requests
    if (!GENE_SYMBOL_ALLOWED_LIST.test(geneSymbol)){
        throw new Error("Invalid gene symbol format");
    }

    // build a safe URL segment. encodeURIComponent escapes special chars.
    // example: "BRCA 1" -> "BRCA%201"
    const url = `${API_BASE}/genes/${encodeURIComponent(geneSymbol)}`;

    // do the HTTP GET
    const result = await fetch(url);

    // if the back end returns not found, return null instead of throwing ui errors
    if(result.status === 404){
        return null
    }

    // any other non-2xx -> throw error 
    if(!result.ok){
        throw new Error (`Failed to fetch gene ${geneSymbol}: HTTP ${result.status}`);
    }

    // Parse JSON and return the object (e.g., { symbol, name, ... })
    return result.json();

}