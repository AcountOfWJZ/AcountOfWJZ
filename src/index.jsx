import "@/assets/style/index.less";

import { useState, useEffect } from "react";
import { Row, Col, Collapse } from "antd";

import { LeftOne, DownOne } from "@icon-park/react";

import BoxGapConfig from "./modules/boxGapConfig";
import BackgroundColorConfig from "./modules/backgroundConfig";

const defaultConfig = {
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
    color: "rgba(255,255,255,1)",
    image: "https://assets.hyperpaas.com/root/texture/4.png",
    repeat: "no-repeat",
    size: 20,
  },
};

const { Panel } = Collapse;

export default function App(props) {
  const { initValue, onChange, isEdit } = props;

  const allConfig =
    JSON.stringify(initValue) === "{}" ? defaultConfig : initValue;

  const [marginConfig, setMarginConfig] = useState(allConfig.margin);
  const [paddingConfig, setPaddingConfig] = useState(allConfig.padding);
  const [backgroundConfig, setbackgroundConfig] = useState(
    allConfig.background
  );

  const handleMarginChange = (config, ruleGroup) => {
    const newMarginConfig = { ...marginConfig };
    newMarginConfig[config.ruleKey] = config.value;
    setMarginConfig(newMarginConfig);
    const outValue = { ...allConfig };
    outValue[ruleGroup][config.ruleKey] = config.value;
    onChange(outValue);
  };

  const handlePaddingChange = (config, ruleGroup) => {
    const newPaddingConfig = { ...paddingConfig };
    newPaddingConfig[config.ruleKey] = config.value;
    setPaddingConfig(newPaddingConfig);
    const outValue = { ...allConfig };
    outValue[ruleGroup][config.ruleKey] = config.value;
    onChange(outValue);
  };

  const handlebackgroundChange = (config, ruleGroup, ruleKey) => {
    const newbackgroundConfig = { ...backgroundConfig };
    newbackgroundConfig[ruleKey] = config;
    setbackgroundConfig(newbackgroundConfig);

    const outValue = { ...allConfig };
    outValue[ruleGroup][ruleKey] = config;
    onChange(outValue);
  };

  const [isGapCollapsed, setIsGapCollapsed] = useState(false);
  const [isBackgroundCollapsed, setIsBackgroundCollapsed] = useState(false);

  const handleGapClick = () => {
    setIsGapCollapsed(!isGapCollapsed);
  };

  const handleBackgroundClick = () => {
    setIsBackgroundCollapsed(!isBackgroundCollapsed);
  };

  useEffect(() => {
    setMarginConfig(allConfig.margin);
    setPaddingConfig(allConfig.padding);
    setbackgroundConfig(allConfig.background);
  }, [allConfig]);

  return (
    <div className="main">
      <Collapse
        bordered={false}
        expandIconPosition="end"
        ghost
        defaultActiveKey={1}
        onChange={handleGapClick}
      >
        <Panel
          header={
            <div
              style={{
                marginLeft: "8px",
                padding: 0,
                width: "285px",
                fontSize: "14px",
                color: "#666666",
              }}
            >
              边距
            </div>
          }
          extra={
            <div
              style={{
                background: "#f2f3f5",
                height: "34px",
                width: "28px",
                border: "none",
              }}
            >
              {isGapCollapsed ? (
                <LeftOne theme="filled" fill="#A5AFBC" />
              ) : (
                <DownOne theme="filled" fill="#A5AFBC" />
              )}
            </div>
          }
          showArrow={false}
          key="1"
        >
          <Row>
            <BoxGapConfig
              config={marginConfig}
              ruleGroup="margin"
              onChange={handleMarginChange}
            />
            <BoxGapConfig
              config={paddingConfig}
              ruleGroup="padding"
              onChange={handlePaddingChange}
            />
          </Row>
        </Panel>
      </Collapse>
      <Collapse
        bordered={false}
        expandIconPosition="end"
        ghost
        defaultActiveKey={1}
        onChange={handleBackgroundClick}
      >
        <Panel
          header={
            <div
              style={{
                marginLeft: "8px",
                padding: 0,
                width: "285px",
                fontSize: "14px",
                color: "#666666",
              }}
            >
              背景
            </div>
          }
          extra={
            <div
              style={{
                background: "#f2f3f5",
                height: "34px",
                width: "28px",
                border: "none",
              }}
            >
              {isBackgroundCollapsed ? (
                <LeftOne theme="filled" fill="#A5AFBC" />
              ) : (
                <DownOne theme="filled" fill="#A5AFBC" />
              )}
            </div>
          }
          showArrow={false}
          key="1"
        >
          <Row>
            <Col className="headline" span={24}>
              <div className="detail">自定义背景色</div>
            </Col>
            <BackgroundColorConfig
              config={backgroundConfig}
              isEdit={isEdit}
              ruleGroup="background"
              onChange={handlebackgroundChange}
            />
          </Row>
        </Panel>
      </Collapse>
    </div>
  );
}
