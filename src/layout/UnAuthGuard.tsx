import type { ReactElement } from "react";
import NavUnSign from "../components/Nav/NavUnSign";
// import Footer from "../components/Footer";

interface UnAuthGuardProps {
  component?: ReactElement;
}

const UnAuthGuard = ({ component = <></> }: UnAuthGuardProps) => {
  return (
    <div className="fixed min-h-screen h-full w-full flex flex-col justify-between bg-accent">
      <div className="flex-1">
        <NavUnSign />
        <div className="bg-neutral fixed top-20 left-3 right-3 bottom-0 px-3 py-5 pb-0 rounded-t-3xl overflow-auto">
          {component}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default UnAuthGuard;
