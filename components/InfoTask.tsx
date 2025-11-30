"use client";

import DialogCreateTask from "./DialogCreateTask";
import StatusTotalMenu from "./StatusTotalMenu";

// import CardActivity from "./CardActivity";
// import StatusTotalMenu from "./StatusTotalMenu";

const InfoTask = () => {
  return (
    <section className="hidden sm:block p-4 max-w-7xl ">
      <div className="flex flex-col justify-between h-[18rem] ">
        <StatusTotalMenu />
        <DialogCreateTask btn={false} />
      </div>
    </section>
  );
};
export default InfoTask;
