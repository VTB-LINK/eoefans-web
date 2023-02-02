import { Button, Link, Modal, styled } from "@mui/material";
import { FC } from "react";
import styles from "./logo.module.less";

export const Explain: FC<{ open: boolean; handlerClick: () => void }> = (
  props
) => (
  <>
    <Modal open={props.open} onClose={props.handlerClick}>
      <div className={styles["modal"]}>
        <hr className={styles["line_text"]} data-content='QA' />
        <QA />
        <Button
          sx={{
            position: "relative",
            left: "50%",
            transform: "translate(-50%,0)",
          }}
          onClick={props.handlerClick}
        >
          我知道了
        </Button>
      </div>
    </Modal>
  </>
);

export const H1 = styled("h1")(({ theme }) => ({
  fontSize: "24px",
  [theme.breakpoints.down("sm")]: {
    fontSize: "15px",
  },
}));

export const QA = () => (
  <ul>
    <li>
      <p>
        <strong>Q: </strong>
        <span>为什么界面这么丑？</span>
      </p>
      <p>
        <strong>A: </strong>
        <span>web端没有UI捏🙇‍♂️🙇‍♂️🙇‍♂️果咩。</span>
      </p>
    </li>
    <li>
      <p>
        <strong>Q: </strong>
        <span>如何查找我想看的视频类型？</span>
      </p>
      <p>
        <strong>A: </strong>
        <span>
          😩目前只能通过点击下方tag栏进行查询，其中各分区、原创和转载、
          最新发布和最多播放互斥外其他tag皆满足异或查询。
          <br />
          🤔tag排序不是固定的，可以使用鼠标或者触摸按住tag半秒后进行移动。
          <br />
          🤗可以自定义任何你想要的tag栏顺序，下一次访问也有效。
        </span>
      </p>
    </li>
    <li>
      <p>
        <strong>Q: </strong>
        <span>露早tag为什么不是应援色？</span>
      </p>
      <p>
        <strong>A: </strong>
        <span>
          露早GOGO的应援色为
          <span
            style={{
              color: "#3dff9e",
            }}
          >
            #3dff9e
          </span>
          ,tag字面显示不明显，所以更换为黑露早形态的
          <span style={{ color: "#A0191D" }}>#A0191D</span>
        </span>
      </p>
    </li>
    <li>
      <p>
        <strong>Q: </strong>
        <span>如何进行用户反馈？</span>
      </p>
      <p>
        <strong>A: </strong>
        <span>
          请前往
          <Link
            href={`http://eoe.best/appfeedback`}
            target='_blank'
            underline='none'
          >
            eoefans反馈
          </Link>
        </span>
      </p>
    </li>
    <li>
      <p>
        <strong>Q: </strong>
        <span>图片页图片太小了？</span>
      </p>
      <p>
        <strong>A: </strong>
        <span>
          图片页可点击图片进入放大镜模式，支持手势返回和空白处返回；可使用双指放大对图片大小进行调整。
        </span>
      </p>
    </li>
  </ul>
);

export const Yituo: FC<{
  height: number | string;
  width: number | string;
}> = ({ height, width }) => (
  <svg width={width} height={height} viewBox='0 0 524.739 295.223'>
    <title>芝士蛞蝓</title>
    <g id='Component_6_1' data-name='Component 6 – 1'>
      <path
        d='M352.413,1039.154s-18.184-28.564,0-43.279,66.674-109.064,219.936-45.01c0,0,102.175-44.145,120.359-64.919-2.6,0-8.659-33.758-23.379-40.683s-34.636-22.505-32.038-32.892,37.233-3.463,42.429,24.236c3.464,0,34.636,33.758,38.965,34.623.866,0,38.965-16.446,75.333,5.194,0,.866,27.708-22.505,22.513-53.666s25.111-28.564,25.111-28.564,31.172,19.908,0,42.414c0,1.731-27.709,41.548-19.916,56.263s35.5,43.279,32.038,73.575,12.988,7.79,12.988,7.79,7.793,17.312-5.2,16.446-13.854-6.059-13.854-6.059-6.927,105.6-83.991,104.736-34.636-17.312-126.42,0c-77.93,0-174.044-12.118-206.082-19.908.866,2.6-23.379-25.1-53.685-30.3Z'
        transform='translate(-344.331 -794.141)'
        fill='#7cff9d'
      />
      <path
        d='M86.58,144.55S51.015,108.766,5.235,111.19C3.3,108.664-6.308,94.315,6.681,89.986s33.142,8.689,33.142,8.689,38.965,29.43,57.148,33.757,81.394,16.447,124.689-16.446,71.674-51.935,71.674-51.935,58.209-53.665,57.343,12.118c0,1.731-92.373,79.209-116.617,83.537a61.106,61.106,0,0,1-10.015.627C186.415,160.335,86.58,144.55,86.58,144.55ZM109.6,1.992c49.692-10.042,116.6,21.16,116.6,21.16a76.713,76.713,0,0,1-11.248.618C198.487,23.77,163.754,20.816,109.6,1.992Z'
        transform='translate(2.939 133.952)'
        fill='#f2b1d5'
      />
    </g>
    <path
      d='M673.749,901.355l6.638-5.38,12.378,9.146,17.042-19.547,6.458,7.532L695.456,918.57Z'
      transform='translate(-229.019 -754.461)'
    />
    <path
      d='M566.835,813.2c1.893,6.092,15.439,19.573,26.337,18.115,8.773-1.174-7.374-14.731-14.684-20.134a12.446,12.446,0,0,0-3.4-1.592S564.943,807.105,566.835,813.2Z'
      transform='translate(-266.878 -791.232)'
      fill='#c0738c'
    />
    <path
      d='M7.037,8.731h0L0,3.234a4.737,4.737,0,1,1,7.038,5.5Z'
      transform='matrix(0.999, -0.035, 0.035, 0.999, 307.123, 28.724)'
    />
    <ellipse
      cx='14.21'
      cy='14.205'
      rx='14.21'
      ry='14.205'
      transform='translate(477.549 6.915)'
      fill='#bd749f'
    />
    <ellipse
      cx='5.413'
      cy='5.411'
      rx='5.413'
      ry='5.411'
      transform='translate(487.023 17.738)'
    />
  </svg>
);
