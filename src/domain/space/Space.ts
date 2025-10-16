import type { Campus } from "../campus/Campus";
import type { SpaceResource } from "../spaceresource/SpaceResource";
import type { SpaceStatus } from "../spacestatus/SpaceStatus";
import type { SpaceType } from "../spacetype/SpaceType";

export interface Space {
    id: number;
    name: string;
    capacity: number;
    campus: Campus;
    type: SpaceType;
    status: SpaceStatus;
    resources: SpaceResource[];
    createdAt: Date
}