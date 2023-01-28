import message from "@components/message";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div
      style={{
        display: "inline-block",
        position: "relative",
        left: "50%",
        transform: "translate(-50%,50%)",
        padding: "0 20px",
      }}
    >
      <h1
        style={{
          textAlign: "center",
        }}
      >
        🤯🤯🤯有什么出错了
      </h1>
      <p>
        当您看到这个页面时，表示您进入了一个不存在的页面，网站目前仅开放
        <Link to={"/"}>
          <Button>首页</Button>
        </Link>
        、
        <Link to={"/video"}>
          <Button>视频页</Button>
        </Link>
        和
        <Link to={"/photo"}>
          <Button>图片页</Button>
        </Link>
        。
      </p>
      <p>
        请尝试点击链接
        <Link to={"/"}>
          <Button>首页</Button>
        </Link>
        重新访问该网站。
      </p>
      <p>
        若上述方案仍未奏效，那么可能是本地存储出现错误，请尝试点击快捷按钮
        <Button onClick={deleteAllDataStorage}>重置按钮</Button>
        删除网站本地数据进行重置。
      </p>
    </div>
  );
}

const deleteAllDataStorage = () => {
  localStorage.clear();
  sessionStorage.clear();
  message.info("重置网站数据成功!");
};
