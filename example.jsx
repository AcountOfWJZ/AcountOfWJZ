import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { Drawer, Button } from "antd";

import Display from "./src/modules/display";
import App from "./src/index";

const mockValues = {
  margin: {
    top: "5px",
    left: "5px",
    bottom: "5px",
    right: "5px",
  },
  padding: {
    top: "5px",
    left: "5px",
    bottom: "5px",
    right: "5px",
  },
  background: {
    color: "rgba(204,204,204,1)",
    image: "https://assets.hyperpaas.com/root/texture/4.png",
    repeat: "repeat",
    size: 40,
  },
};

const defaultValues = {
  margin: {
    top: "0px",
    left: "0px",
    bottom: "0px",
    right: "0px",
  },
  padding: {
    top: "0px",
    left: "0px",
    bottom: "0px",
    right: "0px",
  },
  background: {
    color: "rgba(255,255,255,0.6)",
    image: "https://assets.hyperpaas.com/root/texture/4.png",
    repeat: "no-repeat",
    size: 20,
  },
};

export default function RenderDemo(props) {
  const [values, setValues] = useState(
    JSON.stringify(mockValues) === "{}" ? defaultValues : mockValues
  );

  const [isReset, setIsReset] = useState(false);

  const handleChange = (config) => {
    setValues(config);
  };
  //console.log(values);

  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const resetConfig = () => {
    setValues(defaultValues);
    setIsReset(true);
  };

  console.log(values);
  return (
    <div>
      <Drawer placement="right" onClose={onClose} visible={open}>
        <App
          initValue={values}
          //initValue={{}}
          onChange={handleChange}
          isEdit={open}
          isReset={isReset}
          blocks={[
            {
              label: "边距",
              children: [
                {
                  preset: "margin",
                  label: "外边距",
                },
                {
                  preset: "padding",
                  label: "内边距",
                },
              ],
            },
            {
              label: "色彩",
              children: [
                {
                  label: "自定义背景色",
                  preset: "backgroundColor",
                  children: [
                    {
                      label: "Hex",
                      preset: "hex",
                    },
                    {
                      label: "透明度",
                      preset: "opacity",
                    },
                  ],
                },
              ],
            },
          ]}
        />
      </Drawer>
      <Display values={values} />
      <div style={{}}>{JSON.stringify(values)}</div>
      <Button type="primary" onClick={showDrawer}>
        编辑
      </Button>
      <Button onClick={resetConfig}>重置</Button>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  React.createElement(RenderDemo)
);

{
  /* <StyleEditPannel /> */
}
