import { KategoriyaHeader } from "./kategoriyaHeader";
import { MaxsulotHeader } from "./maxsulotHeader";
// import { FilialHeader } from "./FilialHeader";
// import { MijozHeader } from "./MijozHeader";

export const headerContent: Record<string, React.ReactNode> = {
  "/maxsulotlar": <MaxsulotHeader />,
  "/kategoriyalar": <KategoriyaHeader />,
  // "/filiallar": <FilialHeader />,
  // "./mijozlar": <MijozHeader />,
};
