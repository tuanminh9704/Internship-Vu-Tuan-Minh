import { getPointConfig } from "app/services/pointConfig.service";

export const loader = async () => {
    const pointConfig = await getPointConfig();
    return pointConfig;
}

export default function pointConfig () {
    return (
        <div>
            Cấu hình Point
        </div>
    )
}