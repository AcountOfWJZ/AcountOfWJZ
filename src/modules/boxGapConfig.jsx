import { Col, Row } from "antd";

import BoxGapDataInput from "../components/boxGap/boxGapDataInput";

const ruleGroupMap = {
  margin: "外边距",
  padding: "内边距",
};

export default function BoxGapConfig(props) {
  const { ruleGroup, config, onChange } = props;

  const handleChange = (val) => {
    onChange(val, ruleGroup);
  };

  return (
    <div className={ruleGroup}>
      <Row>
        <Col span={8}>
          {ruleGroupMap[ruleGroup] === "外边距" ? (
            <div className="outpink">
              <div className="out">{ruleGroupMap[ruleGroup]}</div>
            </div>
          ) : (
            <div className="outborder">
              <div className="in">
                <div className="inpink">{ruleGroupMap[ruleGroup]}</div>
              </div>
            </div>
          )}
        </Col>
        <Col span={8}>
          <BoxGapDataInput
            value={config.top}
            ruleKey="top"
            ruleGroup={ruleGroup}
            onChange={handleChange}
          />
          <BoxGapDataInput
            value={config.left}
            ruleKey="left"
            ruleGroup={ruleGroup}
            onChange={handleChange}
          />
        </Col>
        <Col span={8}>
          <BoxGapDataInput
            value={config.bottom}
            ruleKey="bottom"
            ruleGroup={ruleGroup}
            onChange={handleChange}
          />
          <BoxGapDataInput
            value={config.right}
            ruleKey="right"
            ruleGroup={ruleGroup}
            onChange={handleChange}
          />
        </Col>
      </Row>
    </div>
  );
}
