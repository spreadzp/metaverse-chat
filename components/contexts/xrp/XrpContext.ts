import { createContext } from "react";

import { XrpIface } from "../../../shared/XrpAccount";

const XrpContext = createContext<XrpIface>(null);

export default XrpContext;