import db from "../db.server";

export const getAccessTokenByShop = async (shop: any) => {
    try {
        const session = await db.session.findFirst({
            where: {
                shop: shop
            }
        })
        return session;
    } catch (error) {
        console.log('[ERROR]: ', error);
    }
}