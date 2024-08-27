import { KategoriyaHeader } from "./kategoriyaHeader";
import { MaxsulotHeader } from "./maxsulotHeader";

interface HeaderProps {
  onSearch?: (value: string) => void;
}

export const headerContent = (
  route: string,
  props: HeaderProps = {}
): React.ReactNode => {
  if (route === "/maxsulotlar") {
    return <MaxsulotHeader onSearch={props.onSearch || (() => {})} />;
  } else if (route === "/kategoriyalar") {
    return <KategoriyaHeader />;
  } else {
    return <div>Default Header Content</div>;
  }
};
