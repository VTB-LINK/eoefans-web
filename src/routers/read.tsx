import getrealtiveTime from "@utils/time";
export default function ReadPage() {
  const time = getrealtiveTime(1672570020000);
  return (
    <>
      <h1>这里是read路由页面</h1>
      <p>
        <span>1672570020000->{time}</span>
      </p>
    </>
  );
}
