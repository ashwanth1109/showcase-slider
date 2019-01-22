export const extractURL = (arr, urls = []) => {
    // console.log(arr);
    for (const item of arr) {
        const image = {
            url: item.urls.small,
            user: item.user.name
        };
        urls.push(image);
    }
    return urls;
};
