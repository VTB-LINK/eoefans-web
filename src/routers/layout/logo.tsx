import { Link } from "@mui/material";

export default function LOGO() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Link href='/' underline='none' color='inherit'>
        <span>EOEfans</span>
      </Link>
    </div>
  );
}
