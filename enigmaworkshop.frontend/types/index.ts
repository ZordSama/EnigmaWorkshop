import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type Order = {
  id: string;
  customerName: string;
  address: string;
  status: number;
  total: number;
  data?: {}
};