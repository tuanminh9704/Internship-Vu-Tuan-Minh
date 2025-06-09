import db from '../db.server';

export const getPointConfig = async () => {
    try {
        const pointConfig = await db.pointConfig.findFirst({
            orderBy: {
                updatedAt: 'desc'
            }
        })
        return pointConfig;
    } catch (error) {
        console.log('[ERROR]: ', error);
        return {
            success: false,
            message: 'Point config not found'
        }
    }
}