import { Outlet } from "react-router-dom";

export default function HomePage() {
  return <div>Home
    {/* Message component */}
    <section><Outlet /></section>
  </div>;
}
