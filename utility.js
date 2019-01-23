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
