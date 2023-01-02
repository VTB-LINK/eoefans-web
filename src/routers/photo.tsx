import getrealtiveTime from "@utils/time";
export default function PhotoPage() {
  const time = getrealtiveTime(1672570122);
  return (
    <>
      <h1>这里是photographs页面</h1>
      <p>
        <span>{time}</span>
      </p>
    </>
  );
}
