import React from "react";
import { Box, Typography, Link } from "@material-ui/core";

const Footer = () => {
  return (
    <Box
      my={4}
      px={4}
      py={2}
      color="bkgs.mainAlt"
      bgcolor="bkgs.contentAlt"
      borderRadius={16}
    >
      <Box my={2}>
        <Typography variant="h5">使用说明</Typography>
        <Typography variant="body1">
          - <b>买入价格</b> 对应你岛上的售卖价格，与你在其它岛上的买入价无关！
          <br />- 价格一天刷新 <b>两次</b>，请及时记录（我们会帮您存储到当前设备）。
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h5">更新日志</Typography>
        <Typography variant="body1">
          1.1: 增加清空数据按键，谨慎使用！<br />
          1.2a: 修复精度
          <br />
          1.3: 修复动画， 感谢{" "}
          <Link
            href="https://github.com/elxris/Turnip-Calculator/pull/2"
            target="_blank"
            rel="noopener"
          >
            @mtaylor76
          </Link>
          提供的新图标！感谢{" "}
          <Link
            href="https://github.com/elxris/Turnip-Calculator/issues/5"
            target="_blank"
            rel="noopener"
          >
            @pudquick
          </Link>
          提供的全新买入价标记 
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h5">关于</Typography>
        <Typography variant="body1">
          没有{" "}
          <Link
            href="https://twitter.com/_Ninji/status/1244818665851289602"
            target="_blank"
            rel="noopener"
          >
            @_Ninji&apos;s
          </Link>{" "}
          的努力就没有这个工具。
          <br />我从{" "}
          <Link
            href="https://mikebryant.github.io/ac-nh-turnip-prices/index.html"
            target="_blank"
            rel="noopener"
          >
            mikebryant&apos;s
          </Link>{" "}
          的作品中得到了启发。 <br />
          最后要提一下我的兄弟在设计方面的帮助. 他是一个游戏开发者，你可以在 twitter 上关注他：{" "}
          <Link
            href="https://twitter.com/Consalv0"
            target="_blank"
            rel="noopener"
          >
            @Consalv0
          </Link>
          。 <br />遇到了问题? 点{" "}
          <Link
            href="https://github.com/elxris/Turnip-Calculator/issues"
            target="_blank"
            rel="noopener"
          >
            这里 
          </Link>
          上报。
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="h5">译者注</Typography>
        <Typography variant="body1">
          此工具算法来自最新作《集合啦！动物森友会》，趋势仅供参考。建议及反馈点{" "}
          <Link
            href="https://docs.qq.com/form/fill/DUVhLSFVkbkNNb1V2?_w_tencentdocx_form=1"
            target="_blank"
            rel="noopener"
          >
            这里 
          </Link>
          。
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
