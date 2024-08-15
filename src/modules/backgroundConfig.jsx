import { Row, Col, Input, InputNumber, Button, Select } from "antd";
import { useState, useEffect } from "react";

import { SketchPicker } from "react-color";
import { DownOne, LeftOne } from "@icon-park/react";

function initData(initData) {
  const defaultRgbaConfig = {
    hex: "#ffffff",
    rgb: {
      r: 255,
      g: 255,
      b: 255,
      a: 1,
    },
  };

  const isRgbaRe = /rgba/;
  if (!initData || !initData.match(isRgbaRe)) {
    return defaultRgbaConfig;
  }

  if (initData.match(isRgbaRe)) {
    const rgbRe = /1\d{2}|2[0-4]\d|25[0-5]|[1-9]\d|\d/g;
    const opacityRe = /1|0[.]\d\d|0[.]\d/;
    const rgbArray = initData.match(rgbRe);
    const opacity =
      initData.match(opacityRe) === null ? 0 : initData.match(opacityRe);
    const rgb = {
      r: rgbArray[0],
      g: rgbArray[1],
      b: rgbArray[2],
      a: initData.match(opacityRe) === null ? opacity : opacity[0],
    };
    const hex = TransferRgbaToHex(rgb);

    return {
      hex: hex,
      rgb: rgb,
    };
  }
}

function TransferRgbaToHex(config) {
  const r = config.r;
  const g = config.g;
  const b = config.b;
  const a = config.a;
  const hex =
    TransferEachRgbaToHex((r - (r % 16)) / 16) +
    TransferEachRgbaToHex(r % 16) +
    TransferEachRgbaToHex((g - (g % 16)) / 16) +
    TransferEachRgbaToHex(g % 16) +
    TransferEachRgbaToHex((b - (b % 16)) / 16) +
    TransferEachRgbaToHex(b % 16);
  return hex;
}

function TransferEachRgbaToHex(rgba) {
  switch (rgba) {
    case 0:
      return "0";
    case 1:
      return "1";
    case 2:
      return "2";
    case 3:
      return "3";
    case 4:
      return "4";
    case 5:
      return "5";
    case 6:
      return "6";
    case 7:
      return "7";
    case 8:
      return "8";
    case 9:
      return "9";
    case 10:
      return "a";
    case 11:
      return "b";
    case 12:
      return "c";
    case 13:
      return "d";
    case 14:
      return "e";
    case 15:
      return "f";
    default:
      return "f";
  }
}

function TransferHexToRgba(config, opacity, colorConfig) {
  if (!config) {
    return colorConfig;
  }
  if (config.length === 3) {
    const r = 17 * TransferEachHexToRgba(config.slice(0, 1));
    const g = 17 * TransferEachHexToRgba(config.slice(1, 2));
    const b = 17 * TransferEachHexToRgba(config.slice(2, 3));
    const a = opacity / 100;

    return {
      rgb: {
        r: r,
        g: g,
        b: b,
        a: a,
      },
    };
  } else if (config.length === 6) {
    const r1 = config.slice(0, 1);
    const r2 = config.slice(1, 2);
    const g1 = config.slice(2, 3);
    const g2 = config.slice(3, 4);
    const b1 = config.slice(4, 5);
    const b2 = config.slice(5, 6);
    const a0 = opacity / 100;

    const r0 = TransferEachHexToRgba(r1) * 16 + TransferEachHexToRgba(r2);
    const g0 = TransferEachHexToRgba(g1) * 16 + TransferEachHexToRgba(g2);
    const b0 = TransferEachHexToRgba(b1) * 16 + TransferEachHexToRgba(b2);
    return {
      rgb: {
        r: r0,
        g: g0,
        b: b0,
        a: a0,
      },
    };
  }
}

function TransferEachHexToRgba(hex) {
  switch (hex) {
    case "0":
      return 0;
    case "1":
      return 1;
    case "2":
      return 2;
    case "3":
      return 3;
    case "4":
      return 4;
    case "5":
      return 5;
    case "6":
      return 6;
    case "7":
      return 7;
    case "8":
      return 8;
    case "9":
      return 9;
    case "a":
      return 10;
    case "b":
      return 11;
    case "c":
      return 12;
    case "d":
      return 13;
    case "e":
      return 14;
    case "f":
      return 15;
    default:
      return 15;
  }
}

export default function BackgroundColorConfig(props) {
  const { config, onChange, ruleGroup, isEdit } = props;

  const [isShow, setIsShow] = useState(!isEdit);

  const [isRepeatShow, setIsRepeatShow] = useState(false);

  const [image, setImage] = useState(config.image);

  const [repeat, setRepeat] = useState(config.repeat);

  const [size, setSize] = useState(config.size);

  const [colorConfig, setColorConfig] = useState(initData(config.color));

  const handleClick = () => {
    setIsShow(!isShow);
  };

  const handleColorConfigChange = (e, colorConfig) => {
    const newHex = e.target.value;
    const newColorHexConfig = { ...colorConfig };
    newColorHexConfig.hex = "#" + newHex;
    setColorConfig(newColorHexConfig);

    const isValidate =
      newHex.length === 0 || newHex.length === 3 || newHex.length === 6;

    if (!isValidate) {
      return;
    }

    const rgbaData = TransferHexToRgba(
      newHex,
      colorConfig.rgb.a * 100,
      colorConfig
    );
    const outValue =
      "rgba(" +
      rgbaData.rgb.r +
      "," +
      rgbaData.rgb.g +
      "," +
      rgbaData.rgb.b +
      "," +
      rgbaData.rgb.a +
      ")";

    newColorHexConfig.rgb = rgbaData.rgb;
    setColorConfig(newColorHexConfig);

    onChange(outValue, ruleGroup, "color");
  };

  const handleOpacityChange = (newOpacity, colorConfig) => {
    const newConfig =
      "rgba(" +
      colorConfig.rgb.r +
      "," +
      colorConfig.rgb.g +
      "," +
      colorConfig.rgb.b +
      "," +
      newOpacity / 100 +
      ")";
    const newColorOpacityConfig = { ...colorConfig };
    newColorOpacityConfig.rgb.a = newOpacity / 100;
    setColorConfig(newColorOpacityConfig);

    onChange(newConfig, ruleGroup, "color");
  };

  const handlePickerChange = (color) => {
    setColorConfig(color);

    onChange(
      "rgba(" +
        color.rgb.r +
        "," +
        color.rgb.g +
        "," +
        color.rgb.b +
        "," +
        color.rgb.a +
        ")",
      ruleGroup,
      "color"
    );
  };

  const handleImageChange = (e) => {
    const newImage = e.target.value;
    setImage(newImage);

    onChange(newImage, ruleGroup, "image");
  };

  const handleReapeatChange = (newRepeat) => {
    setRepeat(newRepeat);

    onChange(newRepeat, ruleGroup, "repeat");
  };

  const handleRepeatClick = () => {
    setIsRepeatShow(!isRepeatShow);
  };

  const handleSizeChange = (newSize) => {
    setSize(newSize);

    onChange(newSize, ruleGroup, "size");
  };

  useEffect(() => {
    setIsShow(!isEdit);
  }, [isEdit]);

  return (
    <div className="backgroundColor">
      <Row>
        <Col span={8}>
          <div
            className="showBox"
            style={{
              backgroundColor:
                "rgba(" +
                colorConfig.rgb.r +
                "," +
                colorConfig.rgb.g +
                "," +
                colorConfig.rgb.b +
                "," +
                colorConfig.rgb.a +
                ")",
            }}
          ></div>

          <div className="button">
            <Button
              onClick={handleClick}
              icon={
                isShow ? (
                  <DownOne theme="filled" fill="#A5AFBC" />
                ) : (
                  <LeftOne theme="filled" fill="#A5AFBC" />
                )
              }
              style={{
                height: "26px",
                width: "28px",
                border: "none",
              }}
            ></Button>
          </div>
        </Col>
        <Col span={8}>
          <div className="hex">
            <div className="hexSign">Hex</div>
            <Input
              // value={showedHexData}
              value={colorConfig.hex.replace("#", "")}
              size="small"
              prefix={"#"}
              style={{ width: 82, height: 28, fontSize: 12 }}
              onChange={(val) => handleColorConfigChange(val, colorConfig)}
            />
          </div>
        </Col>
        <Col span={8}>
          <div className="opacity">
            <div className="opacitySign">透明度</div>
            <InputNumber
              value={colorConfig.rgb.a * 100}
              max={100}
              min={0}
              size="small"
              addonAfter={<span style={{ fontSize: 12 }}>%</span>}
              style={{
                width: 52,
                height: 28,
                fontSize: 12,
              }}
              onChange={(val) => handleOpacityChange(val, colorConfig)}
            ></InputNumber>
          </div>
        </Col>
        <Col span={24}>
          <div className="image">
            <div className="imageSign">image</div>
            <Input
              value={image}
              style={{
                width: "290px",
              }}
              onChange={handleImageChange}
            ></Input>
          </div>
        </Col>
        <Col span={12}>
          <div className="repeat">
            <div className="repeatSign"> repeat</div>
            <Select
              value={repeat}
              style={{
                width: "112px",
              }}
              options={[
                {
                  value: "repeat",
                  label: "repeat",
                },
                {
                  value: "repeat-x",
                  label: "repeat-x",
                },
                {
                  value: "repeat-y",
                  label: "repeat-y",
                },
                {
                  value: "no-repeat",
                  label: "no-repeat",
                },
                {
                  value: "space",
                  label: "space",
                },
                {
                  value: "round",
                  label: "round",
                },
              ]}
              suffixIcon={
                isRepeatShow ? (
                  <DownOne theme="filled" fill="#A5AFBC" />
                ) : (
                  <LeftOne theme="filled" fill="#A5AFBC" />
                )
              }
              onChange={handleReapeatChange}
              onDropdownVisibleChange={handleRepeatClick}
            ></Select>
          </div>
        </Col>
        <Col span={12}>
          <div className="size">
            <div className="sizeSign">size</div>
            <InputNumber
              value={size}
              style={{
                width: "130px",
              }}
              onChange={handleSizeChange}
            ></InputNumber>
          </div>
        </Col>
      </Row>
      <div>
        {isShow ? (
          <SketchPicker
            color={colorConfig}
            onChange={(val) => handlePickerChange(val)}
          />
        ) : null}
      </div>
    </div>
  );
}
