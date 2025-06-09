export const getMaxAndMinId = (data : any) => {
    let maxId = data[0].id;
    let minId = data[0].id;
    for (const item of data) {
        if(item.id < minId) {
            minId = item.id;
        }
        if(item.id > maxId) {
            maxId = item.id;
        }
    }

    return {
        maxId: maxId,
        minId: maxId
    }
}