import db from "../db.server";

export const getPointLogs = async () => {
  try {
    const pointLogs = await db.pointLog.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return pointLogs;
    
  } catch (error) {
    console.log('[Error]: ', error);
    return {
        success: false,
        message: 'Point Logs not found'
    }
  }
};
