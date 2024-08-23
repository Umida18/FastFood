import { KategoriyaHeader } from "./kategoriyaHeader";
import { MaxsulotHeader } from "./maxsulotHeader";

export const headerContent: Record<string, React.ReactNode> = {
  "/maxsulotlar": <MaxsulotHeader />,
  "/kategoriyalar": <KategoriyaHeader />,
};
