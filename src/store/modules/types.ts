import { RouteRecordName } from "vue-router";

export type cacheType = {
  mode: string;
  name?: RouteRecordName;
};

export type positionType = {
  startIndex?: number;
  length?: number;
};

export type appType = {
  sidebar: {
    opened: boolean;
    withoutAnimation: boolean;
    // 判断是否手动点击Collapse
    isClickCollapse: boolean;
  };
  layout: string;
  device: string;
};

export type multiType = {
  path: string;
  parentPath: string;
  name: string;
  meta: any;
  query?: object;
  params?: object;
};

export type setType = {
  title: string;
  fixedHeader: boolean;
  hiddenSideBar: boolean;
};

export type userType = {
  username?: string;
  roles?: Array<string>;
};

export type cateType = {
  categories: Array<object>;
};

export type imageType = {
  imageTypes: Array<object>;
};

export type imageItemType = {
  id: number;
  name: string;
  type: number;
  time: string;
  src: string;
};

export type articleType = {
  id: number;
  name: string;
  type: number;
  time: string;
  content: string;
};
