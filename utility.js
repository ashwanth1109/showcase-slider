// ------------------------------------------------------------
// utility function to extract urls and username from unsplash API response
// ------------------------------------------------------------
export const extractURL = (arr, numOfItems, urls = []) => {
    // console.log(arr);
    for (const item of arr) {
        const image = {
            url: item.urls.small,
            user: item.user.name
        };
        urls.push(image);
    }
    return urls.slice(0, numOfItems);
};
// ------------------------------------------------------------
// utility function to get unsplash url to search for photos
// with client id and query parameter
// ------------------------------------------------------------
export const getUnsplashURL = query => {
    // query params
    const queryParams = [
        `client_id=${process.env.ACCESS_KEY}`,
        `query=${query}`
    ];
    // return constructed url
    return "https://api.unsplash.com/search/photos/?" + queryParams.join("&");
};
