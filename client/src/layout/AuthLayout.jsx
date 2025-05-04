import logo from "../assets/logo.png"
export default function AuthLayout({ children }) {
    
  return <>
    <header className="flex justify-center items-center  py-4 h-20 shadow-md bg-white">
      <img src={logo} alt="logo" width={180} height={60}/>
    </header>
    <>
      {children}
    </>
  </>;
}