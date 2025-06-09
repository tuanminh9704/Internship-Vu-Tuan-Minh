import { getPointLogs } from "app/services/pointLog.service"

export const loader = async () => {
    const pointLogs = await getPointLogs();
    return pointLogs;
}

export default function pointLog () {
    return (
        <div>
            Lịch sử giao dịch điểm
        </div>
    )
}