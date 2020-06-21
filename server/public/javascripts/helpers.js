function getUrlVar(key) {
    let result = new RegExp(key + "=([^&]*)", "i").exec(window.location.search);
    return result && unescape(result[1]) || "";
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function getIIIFCollectionUriFromUrl(url) {
    let collectionUriTemplates = [
        /https:\/\/www.harvardartmuseums.org\/profile\/(.*)\/mycollections\/([0-9]*)\/(.*)\/iiif\/top/,
        /https:\/\/www.harvardartmuseums.org\/profile\/(.*)\/mycollections\/([0-9]*)\/(.*)\/public/,
        /https:\/\/www.harvardartmuseums.org\/profile\/(.*)\/mycollections\/([0-9]*)\/(.*)/
    ];

    let collectionUri;

    // Check the url against a list of known uri formats
    if (url.match(collectionUriTemplates[0])) {
        collectionUri = url;
    } else if (url.match(collectionUriTemplates[1])) {
        collectionUri = url.replace("/public", "/iiif/top");
    } else if (url.match(collectionUriTemplates[2])) {
        collectionUri = url + "/iiif/top";
    } else {
        collectionUri = url;
    }

    return collectionUri;
}