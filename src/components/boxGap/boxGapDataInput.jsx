import { InputNumber, Select } from "antd";
import { useEffect, useState } from "react";

import { DownOne, LeftOne } from "@icon-park/react";

const ruleKeyMap = {
  top: "上",
  left: "左",
  bottom: "下",
  right: "右",
};

const marginOption = [
  {
    value: "px",
    label: "px",
  },
  {
    value: "em",
    label: "em",
  },
  {
    value: "auto",
    label: "auto",
  },
];

const paddingOption = [
  {
    value: "px",
    label: "px",
  },
  {
    value: "em",
    label: "em",
  },
];

function formatingData(data) {
  const formatData = {
    value: 0,
    unit: "px",
  };
  if (data !== "") {
    if (data.includes("px")) {
      formatData.value = Number(data.replace("px", ""));
      formatData.unit = "px";
    } else if (data.includes("em")) {
      formatData.value = Number(data.replace("em", ""));
      formatData.unit = "em";
    }
    if (data.includes("auto")) {
      formatData.value = null;
      formatData.unit = "auto";
    }
  }
  return formatData;
}

export default function BoxGapDataInput(props) {
  const { onChange, value, ruleKey, ruleGroup } = props;

  const [gapConfig, setGapConfig] = useState(value);

  const formatedData = formatingData(gapConfig);

  const [gapData, setGapData] = useState(formatedData.value);
  const [unit, setUnit] = useState(formatedData.unit);

  const [isShow, setIsShow] = useState(false);

  const handleValueChange = (value) => {
    setGapData(value);
    onChange({ ruleKey: ruleKey, value: value + unit });
  };

  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    if (newUnit === "auto") {
      setGapData();
      onChange({ ruleKey: ruleKey, value: newUnit });
    } else {
      if (unit === "auto") {
        setGapData(0);
        onChange({
          ruleKey: ruleKey,
          value: 0 + newUnit,
        });
      } else {
        onChange({
          ruleKey: ruleKey,
          value: gapData + newUnit,
        });
      }
    }
  };

  const handleClick = () => {
    const newIsShow = !isShow;
    setIsShow(newIsShow);
  };

  useEffect(() => {
    setGapConfig(value);
  }, [value]);

  useEffect(() => {
    setGapData(formatedData.value);
    setUnit(formatedData.unit);
  }, [formatedData]);

  return (
    <div
      style={{ marginBottom: ruleKey === "top" || ruleKey == "bottom" ? 8 : 0 }}
    >
      <div style={{ display: "inline-block", marginRight: 4 }}>
        {ruleKeyMap[ruleKey]}
      </div>

      {unit !== "auto" ? (
        <span>
          <InputNumber
            value={gapData}
            style={{ width: 40 }}
            size="small"
            onChange={(value) => handleValueChange(value)}
          ></InputNumber>

          <Select
            value={unit}
            size="small"
            suffixIcon={
              isShow ? (
                <DownOne theme="filled" fill="#A5AFBC" />
              ) : (
                <LeftOne theme="filled" fill="#A5AFBC" />
              )
            }
            style={{
              width: 45,
            }}
            onChange={(newUnit) => handleUnitChange(newUnit)}
            onDropdownVisibleChange={handleClick}
            options={ruleGroup === "margin" ? marginOption : paddingOption}
          />
        </span>
      ) : (
        <Select
          value={unit}
          size="small"
          suffixIcon={
            isShow ? (
              <DownOne theme="filled" fill="#A5AFBC" />
            ) : (
              <LeftOne theme="filled" fill="#A5AFBC" />
            )
          }
          style={{
            width: 85,
            textAlign: "center",
          }}
          onChange={handleUnitChange}
          onDropdownVisibleChange={handleClick}
          options={ruleGroup === "margin" ? marginOption : paddingOption}
        />
      )}
    </div>
  );
}
