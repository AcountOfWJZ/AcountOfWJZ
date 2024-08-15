import { useState } from "react";
import { Button, Drawer } from "antd";

import ProBanner from "@hyperpaas-biz-modules/pro-banner";
import App from "../index";

// less 中引入样式文件
// @import "node_modules/@hyperpaas-biz-modules/pro-banner/src/index.less";
import "../../node_modules/@hyperpaas-biz-modules/pro-banner/src/index.less";

const demoBlocks = [
  {
    content: {
      type: "text",
      value: "HYPERPaaS",
    },
    position: {
      left: 0,
      right: 0,
      textAlign: "center",
      bottom: 330,
    },
    style: {
      fontSize: 32,
      fontWeight: 200,
    },
  },
  {
    content: {
      type: "text",
      value: "采购协同解决方案",
    },
    position: {
      left: 0,
      right: 0,
      bottom: 250,
      textAlign: "center",
    },
    style: {
      fontSize: 48,
      fontWeight: 600,
    },
  },
  {
    content: {
      type: "text",
      value: "最终解释权归HYPERPaaS所有",
    },
    position: {
      right: 0,
      bottom: 10,
    },
    style: {
      fontSize: 10,
      fontWeight: 200,
    },
  },
];

export default function Display(props) {
  const { values } = props;

  return (
    <div>
      <ProBanner
        height={580}
        wrapperConfig={{
          background: {
            image:
              "https://lf3-static.bytednsdoc.com/obj/eden-cn/hjeh7pldnulm/SemiDocs/bg-1.png",
          },
        }}
        viewportWidth={"70%"}
        viewportConfig={{
          background: {
            image: values.background.image,
            repeat: values.background.repeat,
            size: values.background.size,
            // todo
            //color: "#ccc",
            color: values.background.color,
            // todo end
          },
        }}
        blocks={demoBlocks}
      />
    </div>
  );
}
