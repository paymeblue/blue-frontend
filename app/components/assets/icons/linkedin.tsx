import Icon from "@ant-design/icons";
import type { CustomIconComponentProps } from "@ant-design/icons/lib/components/Icon";
import LinkedinSvg from "@components/assets/svg/linkedin";

const LinkedinOutlined = (props: Partial<CustomIconComponentProps>) => (
  <Icon component={LinkedinSvg} {...props} />
);

export default LinkedinOutlined;
